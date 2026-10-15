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

server.listen(8985, '127.0.0.1', async () => {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9354',
    '--user-data-dir=/tmp/chrome_sup_verify_ui',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844'
  ]);
  
  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const listRes = await fetch('http://127.0.0.1:9354/json');
    const targets = await listRes.json();
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
    
    let id = 1;
    const send = (method, params = {}) => new Promise(res => {
      const msgId = id++;
      const handler = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.id === msgId) {
          ws.removeEventListener('message', handler);
          res(d.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    
    const consoleLogs = [];
    const networkErrors = [];
    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: msg.params.type, text: msg.params.args.map(a => a.value || a.description).join(' ') });
      } else if (msg.method === 'Network.loadingFailed') {
        networkErrors.push({ url: msg.params.requestId, errorText: msg.params.errorText });
      }
    });
    
    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true
    });
    
    await send('Page.navigate', { url: 'http://127.0.0.1:8985/index.html' });
    await new Promise(r => setTimeout(r, 1500));
    
    const setupEval = await send('Runtime.evaluate', {
      expression: `(() => {
        const authEl = document.getElementById('auth');
        const setupTitle = authEl ? authEl.querySelector('h1')?.innerText : '';
        const cfgUrlInput = !!document.getElementById('cfg-url');
        const cfgKeyInput = !!document.getElementById('cfg-key');
        return {
          setupTitle,
          hasConfigInputs: cfgUrlInput && cfgKeyInput,
          authOverlayVisible: !!authEl
        };
      })()`,
      returnByValue: true
    });
    
    await send('Runtime.evaluate', {
      expression: `document.getElementById('cfg-guest')?.click()`
    });
    await new Promise(r => setTimeout(r, 1000));
    
    const appEval = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          activeNav: document.querySelector('.nav-item.on, [data-nav].on')?.dataset.nav || '',
          scrollWidth: document.body.scrollWidth,
          clientWidth: document.body.clientWidth,
          hasHOverflow: document.body.scrollWidth > document.body.clientWidth,
          viewLength: document.getElementById('view')?.innerHTML.length || 0
        };
      })()`,
      returnByValue: true
    });
    
    console.log('BROWSER_UPGRADE_VERIFY_START');
    console.log(JSON.stringify({
      setupScreen: setupEval.result.value,
      guestAppExperience: appEval.result.value,
      consoleErrors: consoleLogs.filter(c => c.type === 'error'),
      networkErrors
    }, null, 2));
    console.log('BROWSER_UPGRADE_VERIFY_END');
    
    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chromeProc.kill();
    server.close();
  }
});
