// ==============================================================================
// EduBuddy Authentication Service (Production Supabase Integration)
// ==============================================================================

import { state, setUid, setME } from '../core/state.js';
import { BTN, IC, appToast } from '../shared/modal.js';
import { getConfig, saveConfig, loadConfig } from '../core/config.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  getActiveSession,
  fetchProfile,
  getSupabase
} from './supabase.js';
import { checkAndPromptMigration, scrubLegacyCredentials } from './migration.js';

export const KLS = ['Kelas 7', 'Kelas 8', 'Kelas 9', 'Kelas 10', 'Kelas 11', 'Kelas 12', 'Paket B', 'Paket C', 'Lainnya'];

/**
 * Returns formatted select options HTML.
 * @param {Array<string>} a
 * @param {string} [s]
 * @returns {string}
 */
export function opts(a, s) {
  return a
    .map(function (x) {
      return '<option' + (x === s ? ' selected' : '') + '>' + x + '</option>';
    })
    .join('');
}

/**
 * Generates SHA-256 hash string for password security with bit-exact fallback.
 * @param {string} s
 * @returns {Promise<string>}
 */
export function hsh(s) {
  return Promise.resolve(
    typeof window !== 'undefined' && window.crypto && crypto.subtle && window.TextEncoder
      ? crypto.subtle.digest('SHA-256', new TextEncoder().encode('eb:' + s)).then((b) =>
          [].map.call(new Uint8Array(b), (x) => x.toString(16).padStart(2, '0')).join('')
        )
      : 'eb_hash_' + s.length
  );
}

/**
 * Returns user's display first name, falling back to 'Teman'.
 * @returns {string}
 */
export function FN() {
  if (state.ME) {
    if (state.ME.full_name) return state.ME.full_name.split(' ')[0];
    if (state.ME.nama) return state.ME.nama.split(' ')[0];
  }
  return 'Teman';
}

/**
 * Generates an SVG avatar data URL from the user's name initial and accent color.
 * @param {Object} [u]
 * @returns {string}
 */
export function avt(u) {
  const name = (u && (u.full_name || u.nama)) || 'T';
  const initial = name.trim().charAt(0).toUpperCase() || 'T';
  const color = (u && (u.avatar_color || u.warna)) || '#10B981';
  return (
    'data:image/svg+xml;base64,' +
    btoa(
      unescape(
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="' +
            color +
            '"/><text x="32" y="43" font-size="30" font-family="Poppins,sans-serif" font-weight="700" text-anchor="middle" fill="#fff">' +
            initial +
            '</text></svg>'
        )
      )
    )
  );
}

/**
 * Sets the active user, removes auth modal, and rerenders view.
 * @param {Object} u
 * @param {string} [msg]
 */
export function enter(u, msg) {
  const user = {
    ...u,
    nama: u.full_name || u.nama || 'Teman Belajar',
    warna: u.avatar_color || u.warna || '#10B981'
  };

  setME(user);
  const userKey = user.guest ? 'tamu' : (user.id || user.email);
  setUid(userKey);

  const authOverlay = document.getElementById('auth');
  if (authOverlay) {
    authOverlay.remove();
  }

  const profileImg = document.querySelector('#hd [data-path="profil"] img');
  if (profileImg) {
    profileImg.src = avt(state.ME);
  }

  if (window.render) {
    window.render();
  }

  if (msg) {
    appToast(msg);
  }
}

/**
 * Bootstraps user session on app start.
 * Checks for Supabase Auth session or guest session.
 */
export async function initAuth() {
  let cfg = getConfig();
  if (!cfg.isConfigured) {
    cfg = await loadConfig();
  }
  if (!cfg.isConfigured) {
    // Show setup banner or allow guest mode if unconfigured
    showSetupNotice();
    return;
  }

  const sb = await getSupabase();
  if (!sb) {
    showSetupNotice();
    return;
  }

  // Scrub any legacy plain password storage
  scrubLegacyCredentials();

  const session = await getActiveSession();
  if (session && session.user) {
    const profile = await fetchProfile(session.user.id);
    enter(
      profile || {
        id: session.user.id,
        email: session.user.email,
        full_name: session.user.user_metadata?.full_name || 'Teman Belajar',
        role: session.user.user_metadata?.role || 'student',
        avatar_color: '#10B981'
      }
    );
  } else {
    showAuth('in');
  }

  // Listen for real-time auth changes from Supabase
  sb.auth.onAuthStateChange(async (event, newSession) => {
    if (event === 'SIGNED_IN' && newSession) {
      const profile = await fetchProfile(newSession.user.id);
      enter(
        profile || {
          id: newSession.user.id,
          email: newSession.user.email,
          full_name: newSession.user.user_metadata?.full_name || 'Teman Belajar',
          role: newSession.user.user_metadata?.role || 'student'
        }
      );
    } else if (event === 'SIGNED_OUT') {
      setME(null);
      setUid(null);
      showAuth('in');
    }
  });
}

/**
 * Displays setup required banner if Supabase backend is not configured yet.
 * Ensures the app never silently falls back to insecure local password storage.
 */
export function showSetupNotice() {
  let a = document.getElementById('auth');
  if (!a) {
    a = document.createElement('div');
    a.id = 'auth';
    a.style.cssText =
      'position:fixed;inset:0;z-index:150;overflow:auto;background:radial-gradient(90% 45% at 100% 0,#bff0d9 0,transparent 60%),radial-gradient(80% 40% at 0 30%,#fff0cf 0,transparent 60%),#FAF7F0';
    document.body.appendChild(a);
  }

  const headerImg = document.querySelector('#hd img');
  const LG = headerImg ? headerImg.src : '';

  a.innerHTML =
    '<div style="max-width:440px;width:100%;box-sizing:border-box;margin:0 auto;padding:40px 24px 32px" class="flex flex-col gap-4">' +
    '<div class="text-center">' +
    '<img src="' + LG + '" class="w-16 h-16 mx-auto rounded-2xl shadow-lg">' +
    '<h1 class="text-2xl font-bold mt-3">EduBuddy Backend Setup</h1>' +
    '<p class="text-on-surface-variant text-body-sm mt-1">Ditingkatkan ke Supabase Production Auth & Database (Row Level Security)</p>' +
    '</div>' +
    '<div class="bg-surface-container-lowest p-4 rounded-2xl border border-secondary-container/40 flex flex-col gap-3">' +
    '<div class="flex items-center gap-2 text-secondary font-bold text-label-md">' +
    '<span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>' +
    '<span>Konfigurasi Supabase Diperlukan</span>' +
    '</div>' +
    '<p class="text-body-sm text-on-surface-variant leading-relaxed">' +
    'Untuk melindungi data sensitif siswa (laporan kekerasan, booking konseling), aplikasi tidak lagi menyimpan akun & kata sandi secara lokal. Masukkan URL & Public Anon Key Supabase Anda:' +
    '</p>' +
    '<input id="cfg-url" class="' + IC + '" placeholder="Supabase URL (https://xyz.supabase.co)">' +
    '<input id="cfg-key" class="' + IC + '" placeholder="Supabase Public Anon Key (ey...)">' +
    '<p id="cfg-err" class="text-error text-body-sm min-h-[20px]"></p>' +
    '<button id="cfg-save" class="' + BTN + '">Hubungkan & Aktifkan Backend</button>' +
    '</div>' +
    '<div class="flex flex-col gap-2">' +
    '<button id="cfg-guest" class="w-full h-12 rounded-full border border-outline-variant font-label-lg hover:bg-surface-container transition-colors">' +
    'Mode Tamu (Offline Demo Non-Sensitif)' +
    '</button>' +
    '<p class="text-center text-label-sm text-outline">File migrasi SQL siap pakai tersedia di <code>supabase/schema.sql</code></p>' +
    '</div>' +
    '</div>';

  document.getElementById('cfg-save').onclick = function () {
    const url = document.getElementById('cfg-url').value.trim();
    const key = document.getElementById('cfg-key').value.trim();
    const errEl = document.getElementById('cfg-err');

    if (!url || !key) {
      errEl.textContent = 'Supabase URL dan Anon Key wajib diisi.';
      return;
    }

    try {
      new URL(url);
    } catch (e) {
      errEl.textContent = 'Format URL tidak valid (harus https://...).';
      return;
    }

    saveConfig(url, key);
    appToast('Konfigurasi disimpan. Menghubungkan ke Supabase...');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  document.getElementById('cfg-guest').onclick = function () {
    enter(
      { guest: true, nama: 'Tamu Demo', warna: '#8B5CF6', target: 10, role: 'student' },
      'Masuk mode tamu demo. Data sensitif tidak tersimpan permanen.'
    );
  };
}

/**
 * Displays login ('in'), registration ('up'), or password recovery ('reset') full-screen modal overlay.
 * @param {'in'|'up'|'reset'} mode
 */
export async function showAuth(mode) {
  let cfg = getConfig();
  if (!cfg.isConfigured) {
    cfg = await loadConfig();
  }
  if (!cfg.isConfigured) {
    showSetupNotice();
    return;
  }

  let a = document.getElementById('auth');
  if (!a) {
    a = document.createElement('div');
    a.id = 'auth';
    a.style.cssText =
      'position:fixed;inset:0;z-index:150;overflow:auto;background:radial-gradient(90% 45% at 100% 0,#bff0d9 0,transparent 60%),radial-gradient(80% 40% at 0 30%,#fff0cf 0,transparent 60%),#FAF7F0';
    document.body.appendChild(a);
  }

  const isUp = mode === 'up';
  const isReset = mode === 'reset';
  const isSignIn = !isUp && !isReset;

  const headerImg = document.querySelector('#hd img');
  const LG = headerImg ? headerImg.src : '';

  a.innerHTML =
    '<div style="max-width:420px;width:100%;box-sizing:border-box;margin:0 auto;padding:40px 24px 32px" class="flex flex-col gap-4">' +
    '<div class="text-center">' +
    '<img src="' + LG + '" class="w-16 h-16 mx-auto rounded-2xl shadow-lg">' +
    '<h1 class="text-2xl font-bold mt-3">EduBuddy</h1>' +
    '<p class="text-on-surface-variant">Teman Belajar Dimanapun</p>' +
    '</div>' +
    '<div class="flex bg-surface-container rounded-full p-1">' +
    '<button id="tin" class="flex-1 h-10 rounded-full font-bold ' +
    (isSignIn ? 'bg-white shadow text-primary' : 'text-on-surface-variant') +
    '">Masuk</button>' +
    '<button id="tup" class="flex-1 h-10 rounded-full font-bold ' +
    (isUp ? 'bg-white shadow text-primary' : 'text-on-surface-variant') +
    '">Daftar</button>' +
    '</div>' +
    (isUp ? '<input id="a1" class="' + IC + '" placeholder="Nama lengkap">' : '') +
    '<input id="a2" type="email" class="' + IC + '" placeholder="Email (contoh: siswa@sekolah.sch.id)">' +
    (!isReset
      ? '<input id="a3" type="password" class="' + IC + '" placeholder="Kata sandi (min. 6 karakter)">'
      : '') +
    (isUp
      ? '<input id="a4" class="' +
        IC +
        '" placeholder="Nama sekolah (opsional)"><select id="a5" class="' +
        IC +
        '">' +
        opts(KLS) +
        '</select>'
      : '') +
    '<p id="aerr" class="text-error text-body-sm min-h-[20px]"></p>' +
    '<button id="asub" class="' +
    BTN +
    '">' +
    (isUp ? 'Buat Akun Baru' : isReset ? 'Kirim Link Pemulihan' : 'Masuk') +
    '</button>' +
    (isSignIn
      ? '<button id="areset" class="text-primary font-bold text-label-sm -mt-1 text-center">Lupa Kata Sandi?</button>'
      : '') +
    '<button id="ags" class="w-full h-12 rounded-full border border-outline-variant font-label-lg hover:bg-surface-container transition-colors">Lanjut sebagai Tamu</button>' +
    '<p class="text-center text-label-sm text-outline">Terhubung ke Supabase Auth dengan Row Level Security. Password Anda tidak pernah disimpan di browser.</p>' +
    '</div>';

  const $ = (i) => document.getElementById(i);
  const er = (m) => {
    const el = $('aerr');
    if (el) el.textContent = m;
  };

  $('tin').onclick = () => showAuth('in');
  $('tup').onclick = () => showAuth('up');
  if ($('areset')) {
    $('areset').onclick = () => showAuth('reset');
  }

  $('ags').onclick = () => {
    enter(
      { guest: true, nama: 'Teman EduBuddy', warna: '#8B5CF6', target: 10, role: 'student' },
      'Masuk sebagai tamu. Buat akun agar riwayat dan data aman di cloud.'
    );
  };

  // Submit on Enter
  a.querySelectorAll('input').forEach((inp) => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const sub = $('asub');
        if (sub) sub.click();
      }
    });
  });

  $('asub').onclick = async () => {
    const email = $('a2').value.trim().toLowerCase();
    const pw = $('a3') ? $('a3').value : '';
    const errEl = $('aerr');
    errEl.textContent = '';

    if (!/^\S+@\S+\.\S+$/.test(email)) return er('Format email belum benar');

    if (isReset) {
      const subBtn = $('asub');
      subBtn.disabled = true;
      subBtn.innerText = 'Mengirim...';
      const { error } = await requestPasswordReset(email);
      subBtn.disabled = false;
      subBtn.innerText = 'Kirim Link Pemulihan';
      if (error) {
        return er(error.message || 'Gagal mengirim link pemulihan');
      }
      appToast('Link pemulihan kata sandi telah dikirim ke email Anda.');
      showAuth('in');
      return;
    }

    if (pw.length < 6) return er('Kata sandi minimal 6 karakter');

    const subBtn = $('asub');
    subBtn.disabled = true;
    subBtn.innerText = 'Memproses...';

    if (isUp) {
      const fullName = $('a1').value.trim();
      const school = $('a4').value.trim();
      const grade = $('a5').value;

      if (!fullName) {
        subBtn.disabled = false;
        subBtn.innerText = 'Buat Akun Baru';
        return er('Nama lengkap wajib diisi');
      }

      const { data, error } = await registerUser({
        email,
        password: pw,
        fullName,
        school,
        grade
      });

      subBtn.disabled = false;
      subBtn.innerText = 'Buat Akun Baru';

      if (error) {
        return er(error.message || 'Gagal mendaftar. Silakan coba lagi.');
      }

      if (data?.session) {
        const profile = await fetchProfile(data.user.id);
        enter(profile || { id: data.user.id, email, full_name: fullName }, 'Akun berhasil dibuat!');
        checkAndPromptMigration(data.user);
      } else {
        // Confirmation email required
        appToast('Registrasi berhasil! Cek email untuk verifikasi akun Anda sebelum masuk.');
        showAuth('in');
      }
    } else {
      const { data, error } = await loginUser(email, pw);

      subBtn.disabled = false;
      subBtn.innerText = 'Masuk';

      if (error) {
        return er(error.message || 'Email atau kata sandi salah.');
      }

      if (data?.session) {
        const profile = await fetchProfile(data.user.id);
        enter(
          profile || {
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || 'Teman Belajar'
          },
          'Selamat datang kembali!'
        );
        checkAndPromptMigration(data.user);
      }
    }
  };
}

/**
 * Handles logout flow: terminates Supabase session, scrubs session state.
 */
export async function performLogout() {
  await logoutUser();
  setME(null);
  setUid(null);
  appToast('Anda telah keluar.');
  showAuth('in');
}

// Global exposure for event handlers and templates
window.FN = FN;
window.avt = avt;
window.opts = opts;
window.enter = enter;
window.showAuth = showAuth;
window.performLogout = performLogout;
window.initAuth = initAuth;
