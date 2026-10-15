// EduBuddy Application Router
// Handles client-side hash routing, aliases, title updates, bottom-navigation states,
// view mounting, and route-specific dynamic enhancements.

import { V } from '../views/templates.js';
import { state } from './state.js';
import { ST } from '../services/storage.js';
import { FN, avt } from '../services/auth.js';
import { greet } from '../shared/utils.js';
import { CD, closeM } from '../shared/modal.js';
import { CAT } from '../features/quiz.js';

import { initBooking } from '../features/booking.js';
import { initRiwayat } from '../features/riwayat.js';
import { initProfil } from '../features/profile.js';
import { initChat } from '../features/chat.js';
import { initEkonomi } from '../features/financial.js';
import { initAman } from '../features/safety.js';
import { initJadwal } from '../features/schedule.js';
import { initDiagnostik } from '../features/diagnostik.js';
import { initBelajar } from '../features/learning.js';
import { initMediasi } from '../features/mediasi.js';

export const AL = {
  'belajar-praktis': 'belajar',
  'atur-jadwal': 'jadwal',
  'solusi-ekonomi': 'ekonomi',
  'teman-cerita-chat': 'chat'
};

export const NAV = {
  belajar: 'belajar',
  aman: 'aman',
  chat: 'aman',
  jadwal: 'jadwal',
  profil: 'profil',
  ekonomi: 'profil',
  diagnostik: 'profil',
  mediasi: 'profil',
  beranda: 'beranda',
  booking: 'profil',
  riwayat: 'profil'
};

export const T = {
  beranda: 'Beranda',
  belajar: 'Belajar',
  aman: 'Ruang Aman',
  jadwal: 'Jadwal',
  profil: 'Profil',
  diagnostik: 'Hasil Diagnostik',
  mediasi: 'Mediasi & Konseling',
  ekonomi: 'Bantuan Ekonomi',
  chat: 'Teman Cerita',
  booking: 'Booking Konselor',
  riwayat: 'Riwayat'
};

const ROOTS = { belajar: 1, aman: 1, jadwal: 1, profil: 1, beranda: 1 };
export const HS = ['beranda'];
let SKIP = false;

/**
 * Navigates to a specific route hash.
 * @param {string} p - Route name
 */
export function go(p) {
  p = AL[p] || p;
  if (location.hash === '#/' + p) {
    render();
  } else {
    location.hash = '#/' + p;
  }
}

/**
 * Back navigation logic returning to previous route or default beranda.
 */
export function goBack() {
  let r = location.hash.replace('#/', '') || 'beranda';
  r = AL[r] || r;
  if (ROOTS[r]) {
    go('beranda');
    return;
  }
  if (HS.length > 1) {
    HS.pop();
    const p = HS.pop();
    SKIP = true;
    go(p || 'beranda');
  } else {
    go('beranda');
  }
}

/**
 * Ensures header back button is created and correctly shown or hidden.
 * @param {string} r - Current resolved route
 */
function updateHeaderBackButton(r) {
  let b = document.getElementById('hback');
  if (!b) {
    const g = document.querySelector('#hd .flex.items-center.gap-2');
    if (g) {
      b = document.createElement('button');
      b.id = 'hback';
      b.setAttribute('aria-label', 'Kembali');
      b.className =
        'w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0 -ml-1 mr-1 active:scale-95 transition-transform';
      b.innerHTML = '<span class="material-symbols-outlined text-[20px]">arrow_back</span>';
      b.onclick = goBack;
      g.insertBefore(b, g.firstChild);
    }
  }

  if (b) {
    if (r === 'beranda') {
      b.style.display = 'none';
    } else {
      b.style.display = 'flex';
    }
  }
}

/**
 * Main render function triggered on route changes.
 */
export function render() {
  closeM();

  let hashTarget = location.hash.replace(/^#\/?/, '');
  let pathTarget = location.pathname.replace(/^\//, '').replace(/\.html$/, '');
  let raw = hashTarget || (V[pathTarget] || AL[pathTarget] ? pathTarget : '') || 'beranda';
  let r = AL[raw] || raw;
  if (!V[r]) {
    r = 'beranda';
  }

  if (!SKIP) {
    if (HS[HS.length - 1] !== r) {
      HS.push(r);
    }
  }
  SKIP = false;

  const v = document.getElementById('view');
  if (!v) return;

  v.dataset.r = r;
  v.innerHTML = V[r];

  // Update header title and browser document title
  const titleEl = document.getElementById('ttl');
  if (titleEl) {
    titleEl.textContent = T[r] || 'EduBuddy';
  }
  document.title = (T[r] ? T[r] + ' • ' : '') + 'EduBuddy - Teman Belajar Dimanapun';

  // Toggle bottom navigation active state
  document.querySelectorAll('[data-nav]').forEach(function (b) {
    const on = b.dataset.nav === NAV[r];
    b.classList.toggle('on', on);
    b.classList.toggle('text-primary', on);
    b.classList.toggle('text-outline', !on);
    if (b.firstElementChild) {
      b.firstElementChild.classList.toggle('bg-primary-fixed', on);
    }
  });

  // Update profile avatar in header
  const profileImg = document.querySelector('#hd [data-path="profil"] img');
  if (profileImg && state.ME) {
    profileImg.src = avt(state.ME);
  }

  // Update Back button in header
  updateHeaderBackButton(r);

  // Dynamic route-specific controllers & enhancements
  if (r === 'beranda') {
    // Dynamic personalized greeting
    const walker = document.createTreeWalker(v, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while ((n = walker.nextNode())) {
      if (/halo rina/i.test(n.nodeValue)) {
        n.nodeValue = n.nodeValue.replace(/halo rina/i, greet() + ', ' + FN());
        break;
      }
    }

    // Dynamic risk priority banner if assessment was taken
    if (v.firstElementChild) {
      const rk = ST.get('risk')[0];
      const bn = document.createElement('div');
      bn.className = CD + ' bg-secondary-fixed/30 flex items-center justify-between gap-3';
      bn.innerHTML =
        '<div class="flex items-center gap-3 min-w-0"><span class="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-bold">!</span><div class="min-w-0"><p class="font-label-md font-bold truncate">Prioritas Refleksimu</p><p class="text-body-sm text-on-surface-variant truncate">' +
        (rk ? CAT[rk.top][0] + ' • ' + rk.d : 'Belum pernah asesmen') +
        '</p></div></div><button data-path="diagnostik" class="shrink-0 px-3 py-1.5 rounded-full bg-secondary text-on-secondary font-label-sm font-bold">Lihat Peta</button>';
      v.firstElementChild.insertBefore(bn, v.firstElementChild.children[1] || null);
    }
  } else if (r === 'profil') {
    initProfil();
  } else if (r === 'booking') {
    initBooking();
  } else if (r === 'riwayat') {
    initRiwayat();
  } else if (r === 'chat') {
    initChat();
  } else if (r === 'ekonomi') {
    initEkonomi();
  } else if (r === 'aman') {
    initAman();
  } else if (r === 'jadwal') {
    initJadwal();
  } else if (r === 'diagnostik') {
    initDiagnostik();
  } else if (r === 'belajar') {
    initBelajar();
  } else if (r === 'mediasi') {
    initMediasi();
  }

  window.scrollTo(0, 0);
}

// Global exposure
window.go = go;
window.goBack = goBack;
window.render = render;
window.AL = AL;
window.NAV = NAV;
window.T = T;
window.HS = HS;

