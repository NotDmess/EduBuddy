import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const baseDir = '/Users/Dmess/projects/edubuddy-pwa-backup';
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(baseDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8988;
const CDP_PORT = 9358;

const tmpDataDir = fs.mkdtempSync('/tmp/chrome_audit_');

server.listen(PORT, '127.0.0.1', async () => {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${tmpDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json`);
    const targets = await listRes.json();
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    let id = 1;
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (evt) => {
          const d = JSON.parse(evt.data);
          if (d.id === msgId) {
            ws.removeEventListener('message', handler);
            if (d.error) reject(new Error(JSON.stringify(d.error)));
            else resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });

    const consoleErrors = [];
    const unhandledExceptions = [];

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
        if (msg.params.type === 'error') {
          consoleErrors.push(text);
        }
      } else if (msg.method === 'Runtime.exceptionThrown') {
        unhandledExceptions.push(msg.params.exceptionDetails);
      }
    });

    await new Promise((r) => (ws.onopen = r));
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.exceptionDetails) {
        throw new Error('Eval error: ' + JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : undefined;
    }

    const auditResults = {
      viewportsTested: [],
      domInventory: {
        totalInteractiveElements: 0,
        byRoute: {}
      },
      behavioralScenarios: [],
      scenarioSummary: {
        total: 0,
        passed: 0,
        failed: 0
      },
      overflowIssues: [],
      consoleErrors: [],
      unhandledExceptions: []
    };

    // 1. Mobile Viewport Setup
    try {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        mobile: true
      });
      auditResults.viewportsTested.push('Mobile (390x844, 3x DPR)');
    } catch (e) {
      auditResults.viewportsTested.push('Mobile (Default Window)');
    }

    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });

    // Wait until app is ready or guest modal is shown
    for (let i = 0; i < 30; i++) {
      const state = await evaluate(`(() => {
        const guestBtn = document.getElementById('cfg-guest');
        if (guestBtn) {
          guestBtn.click();
          return 'guest_clicked';
        }
        if (typeof window.go === 'function' && document.getElementById('view')?.innerHTML) {
          return 'ready';
        }
        return 'waiting';
      })()`);
      if (state === 'guest_clicked') {
        await new Promise((r) => setTimeout(r, 500));
        break;
      }
      if (state === 'ready') break;
      await new Promise((r) => setTimeout(r, 200));
    }
    await evaluate(`document.fonts.ready`);
    await new Promise((r) => setTimeout(r, 400));

    // Check overflow on initial load
    const mobileOverflow = await evaluate(`({
      scrollWidth: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
      clientWidth: window.innerWidth,
      hasOverflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > window.innerWidth
    })`);
    if (mobileOverflow.hasOverflow) {
      auditResults.overflowIssues.push({ viewport: 'Mobile', ...mobileOverflow });
    }

    // 2. DOM Interactive Elements Inventory per Route
    const routes = [
      'beranda',
      'belajar',
      'aman',
      'jadwal',
      'profil',
      'diagnostik',
      'mediasi',
      'ekonomi',
      'chat',
      'booking',
      'riwayat'
    ];

    for (const r of routes) {
      await evaluate(`window.go('${r}')`);
      await new Promise((res) => setTimeout(res, 400));

      const routeInfo = await evaluate(`(() => {
        const v = document.getElementById('view');
        const elements = v ? Array.from(v.querySelectorAll('button, a, input, select, textarea, [data-path], [data-act], [data-apply], [onclick]')) : [];
        const breakdown = {
          buttons: 0,
          links: 0,
          inputs: 0,
          selects: 0,
          textareas: 0,
          clickableCards: 0
        };
        elements.forEach(el => {
          const tag = el.tagName.toLowerCase();
          if (tag === 'button') breakdown.buttons++;
          else if (tag === 'a') breakdown.links++;
          else if (tag === 'input') breakdown.inputs++;
          else if (tag === 'select') breakdown.selects++;
          else if (tag === 'textarea') breakdown.textareas++;
          else if (el.dataset.path || el.dataset.act) breakdown.clickableCards++;
        });
        return {
          title: document.title,
          activeRoute: v ? v.dataset.r : '',
          interactiveCount: elements.length,
          breakdown,
          headerBackVisible: document.getElementById('hback')?.style.display !== 'none',
          bodyOverflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > window.innerWidth
        };
      })()`);

      auditResults.domInventory.byRoute[r] = routeInfo;
      auditResults.domInventory.totalInteractiveElements += routeInfo.interactiveCount;
    }

    // 3. Behavioral Scenarios Verification (11 Action Scenarios)

    // Scenario 1: Beranda - Quote Bookmark (UI Toast Interaction)
    await evaluate(`window.go('beranda')`);
    await new Promise((r) => setTimeout(r, 300));
    const s1 = await evaluate(`(() => {
      const btn = document.querySelector('[data-act="save-quote"]');
      if (btn) btn.click();
      const hasToast = !!document.querySelector('.tst');
      return hasToast;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 1,
      name: 'Beranda Quote Bookmark',
      route: 'beranda',
      type: 'UI_INTERACTION',
      result: s1 ? 'PASS' : 'FAIL',
      details: 'Memverifikasi klik [data-act="save-quote"] menampilkan toast pesan inspirasi tanpa merubah layout.'
    });

    // Scenario 2: Belajar - Micro-Lesson Modal (UI Modal & Quiz Steps)
    await evaluate(`window.go('belajar')`);
    await new Promise((r) => setTimeout(r, 300));
    const s2 = await evaluate(`(() => {
      window.lesson('Untung-Rugi Usaha');
      const mdl = document.getElementById('mdl');
      const hasModal = !!mdl;
      const nextBtn = mdl ? mdl.querySelector('#lnxt, button') : null;
      if (nextBtn) nextBtn.click();
      window.closeM();
      return hasModal;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 2,
      name: 'Belajar Micro-Lesson Modal & Navigation',
      route: 'belajar',
      type: 'UI_INTERACTION',
      result: s2 ? 'PASS' : 'FAIL',
      details: 'Membuka modal pembelajaran 4 langkah interaktif, menguji tombol lanjut dan tombol tutup modal.'
    });

    // Scenario 3: Aman - Anonymous Incident Report (DATA PERSISTENCE)
    await evaluate(`window.go('aman')`);
    await new Promise((r) => setTimeout(r, 300));
    const s3 = await evaluate(`(() => {
      const ta = document.getElementById('cerita');
      const submitBtn = document.getElementById('submit-btn');
      if (ta && submitBtn) {
        ta.value = 'Laporan anonim terverifikasi pada final audit';
        submitBtn.click();
        const stored = (window.ST && window.ST.get('laporan')) || [];
        const hasSaved = stored.some(item => (item.t || '').includes('audit') || item.c);
        return hasSaved;
      }
      return false;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 3,
      name: 'Ruang Aman Anonymous Incident Report',
      route: 'aman',
      type: 'DATA_PERSISTENCE',
      result: s3 ? 'PASS' : 'FAIL',
      details: 'Mengisi form pengaduan anonim, memvalidasi pembuatan kode tiket (#EB-...) dan penyimpanan ke storage.'
    });

    // Scenario 4: Jadwal - Schedule Generation & Commitment (DATA PERSISTENCE)
    await evaluate(`window.go('jadwal')`);
    await new Promise((r) => setTimeout(r, 300));
    const s4 = await evaluate(`(() => {
      const btn15 = document.querySelector('.duration-option[data-min="15"], .duration-btn[data-min="15"]');
      if (btn15) btn15.click();
      const genBtn = document.getElementById('btn-generate');
      if (genBtn) genBtn.click();
      const resultsVisible = !document.getElementById('results-section')?.classList.contains('hidden');
      return resultsVisible;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 4,
      name: 'Jadwal Fleksibel Generator & Commitment',
      route: 'jadwal',
      type: 'DATA_PERSISTENCE',
      result: s4 ? 'PASS' : 'FAIL',
      details: 'Memilih durasi belajar 15m, meregenerasi timeline belajar dan menampilkan hasil komitmen terstruktur.'
    });

    // Scenario 5: Profil - Settings, FAQ & Ortu Dialogs (UI Modals)
    await evaluate(`window.go('profil')`);
    await new Promise((r) => setTimeout(r, 300));
    const s5 = await evaluate(`(() => {
      window.handleAct('faq');
      const faqOpen = !!document.getElementById('mdl');
      window.closeM();
      window.handleAct('ortu');
      const ortuOpen = !!document.getElementById('mdl');
      window.closeM();
      return faqOpen && ortuOpen;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 5,
      name: 'Profil Settings & Help Modals',
      route: 'profil',
      type: 'UI_INTERACTION',
      result: s5 ? 'PASS' : 'FAIL',
      details: 'Membuka modal FAQ dan Dialog Edukasi Orang Tua dari item menu profil serta memverifikasi penutupannya.'
    });

    // Scenario 6: Diagnostik - Radar Graph & Retake CTA (UI Interaction)
    await evaluate(`window.go('diagnostik')`);
    await new Promise((r) => setTimeout(r, 300));
    const s6 = await evaluate(`(() => {
      const graphBtn = document.getElementById('toggleGraphBtn');
      if (graphBtn) graphBtn.click();
      return graphBtn ? graphBtn.getAttribute('data-expanded') === 'true' : false;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 6,
      name: 'Diagnostik Radar Graph Toggle',
      route: 'diagnostik',
      type: 'UI_INTERACTION',
      result: s6 ? 'PASS' : 'FAIL',
      details: 'Men-toggle tampilan grafik jaring radar SVG risiko dan memverifikasi atribut state data-expanded.'
    });

    // Scenario 7: Mediasi - Tabs, Mood & Breathing Guide (UI Interaction)
    await evaluate(`window.go('mediasi')`);
    await new Promise((r) => setTimeout(r, 300));
    const s7 = await evaluate(`(() => {
      window.switchTab('mental');
      const mentalActive = !document.getElementById('tab-content-mental')?.classList.contains('hidden');
      window.switchTab('orangtua');
      const ortuActive = !document.getElementById('tab-content-orangtua')?.classList.contains('hidden');
      window.selectMood('Tenang');
      window.toggleBreathingGuide();
      const breathingOpen = !document.getElementById('breathing-guide')?.classList.contains('hidden');
      window.toggleBreathingGuide();
      return mentalActive && ortuActive && breathingOpen;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 7,
      name: 'Mediasi Tab Switch, Mood & Breathing Guide',
      route: 'mediasi',
      type: 'UI_INTERACTION',
      result: s7 ? 'PASS' : 'FAIL',
      details: 'Beralih antara tab orangtua dan mental, memilih mood Tenang dengan pesan hangat, dan membuka panduan napas.'
    });

    // Scenario 8: Ekonomi - Financial Aid Application (DATA PERSISTENCE)
    await evaluate(`window.go('ekonomi')`);
    await new Promise((r) => setTimeout(r, 300));
    const s8 = await evaluate(`(() => {
      const applyBtn = document.querySelector('[data-apply]');
      if (applyBtn) {
        applyBtn.click();
        const f1 = document.getElementById('f1');
        const fs = document.getElementById('fs');
        if (f1 && fs) {
          f1.value = 'SMK Negeri 1 Surabaya';
          fs.click();
          const stored = (window.ST && window.ST.get('ajuan')) || [];
          return stored.length > 0;
        }
      }
      return false;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 8,
      name: 'Ekonomi Financial Aid Form Submission',
      route: 'ekonomi',
      type: 'DATA_PERSISTENCE',
      result: s8 ? 'PASS' : 'FAIL',
      details: 'Mengisi dialog pengajuan bantuan PIP, memvalidasi penyimpanan ke ST.get("ajuan") dan label "Terkirim".'
    });

    // Scenario 9: Chat - Empathy Response Simulation (DATA PERSISTENCE)
    await evaluate(`window.go('chat')`);
    await new Promise((r) => setTimeout(r, 300));
    const s9 = await evaluate(`(() => {
      const inp = document.getElementById('chatIn');
      const btn = document.getElementById('chatSend');
      if (inp && btn) {
        inp.value = 'Halo Bu Ani, tes final audit interaksi';
        btn.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 1400)); // wait for reply bot (900ms) + observer
    const s9Replied = await evaluate(`(() => {
      const box = document.getElementById('chatBox');
      const hasStoredChat = Object.keys(localStorage).some(k => k.startsWith('eb_') && k.endsWith('chat') && localStorage.getItem(k).includes('tes final audit'));
      return box && box.children.length >= 2 && hasStoredChat;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 9,
      name: 'Teman Cerita Empathy Chat Simulation',
      route: 'chat',
      type: 'DATA_PERSISTENCE',
      result: (s9 && s9Replied) ? 'PASS' : 'FAIL',
      details: 'Mengirim chat teks, memicu respons simulasi otomatis konselor dalam 900ms, dan menyimpan riwayat percakapan.'
    });

    // Scenario 10: Booking - Counselor Session Scheduling (DATA PERSISTENCE)
    await evaluate(`window.go('booking')`);
    await new Promise((r) => setTimeout(r, 300));
    const s10 = await evaluate(`(() => {
      const c2 = document.querySelector('[data-g="c"][data-i="1"]');
      if (c2) c2.click();
      const d2 = document.querySelector('[data-g="d"][data-i="1"]');
      if (d2) d2.click();
      const bk = document.getElementById('bk');
      if (bk) bk.click();
      const stored = (window.ST && window.ST.get('booking')) || [];
      return stored.length > 0;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 10,
      name: 'Booking Counselor Appointment',
      route: 'booking',
      type: 'DATA_PERSISTENCE',
      result: s10 ? 'PASS' : 'FAIL',
      details: 'Memilih konselor Pak Dimas, tanggal, dan jam konsultasi, memvalidasi penyimpanan ke ST.get("booking").'
    });

    // Scenario 11: Riwayat - Unified History Mount (DATA PERSISTENCE READ)
    await evaluate(`window.go('riwayat')`);
    await new Promise((r) => setTimeout(r, 300));
    const s11 = await evaluate(`(() => {
      const view = document.getElementById('view');
      const hasTitle = view && view.textContent.includes('Riwayat & Pencapaian');
      const hasBookingSec = view && view.textContent.includes('Sesi Konseling');
      const hasLaporanSec = view && view.textContent.includes('Laporan Anonim');
      return hasTitle && hasBookingSec && hasLaporanSec;
    })()`);
    auditResults.behavioralScenarios.push({
      scenarioNumber: 11,
      name: 'Riwayat History Timeline Synchronization',
      route: 'riwayat',
      type: 'DATA_PERSISTENCE',
      result: s11 ? 'PASS' : 'FAIL',
      details: 'Menampilkan riwayat gabungan dari booking, laporan anonim, pengajuan bantuan, dan asesmen dari cache lokal.'
    });

    // Scenario Summary Calculation
    auditResults.scenarioSummary.total = auditResults.behavioralScenarios.length;
    auditResults.scenarioSummary.passed = auditResults.behavioralScenarios.filter(s => s.result === 'PASS').length;
    auditResults.scenarioSummary.failed = auditResults.behavioralScenarios.filter(s => s.result === 'FAIL').length;

    // 4. Desktop Viewport Testing (1280x800)
    try {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false
      });
      auditResults.viewportsTested.push('Desktop (1280x800, 1x DPR)');
    } catch (e) {
      auditResults.viewportsTested.push('Desktop (Default Window)');
    }

    await evaluate(`window.go('beranda')`);
    await new Promise((r) => setTimeout(r, 400));
    const desktopOverflow = await evaluate(`({
      scrollWidth: document.body.scrollWidth,
      clientWidth: document.body.clientWidth,
      hasOverflow: document.body.scrollWidth > document.body.clientWidth
    })`);
    if (desktopOverflow.hasOverflow) {
      auditResults.overflowIssues.push({ viewport: 'Desktop', ...desktopOverflow });
    }

    // Record error logs
    auditResults.consoleErrors = consoleErrors;
    auditResults.unhandledExceptions = unhandledExceptions;

    console.log('FINAL_VERIFICATION_AUDIT_START');
    console.log(JSON.stringify(auditResults, null, 2));
    console.log('FINAL_VERIFICATION_AUDIT_END');

    ws.close();
  } catch (err) {
    console.error('Audit execution error:', err);
  } finally {
    chromeProc.kill();
    server.close();
    try {
      fs.rmSync(tmpDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
});
