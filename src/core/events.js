// EduBuddy Global Event Delegation & Interactivity Bus
// Handles click delegation, route mapping, haptic vibration, modal shortcuts, and global alerts.

import { go } from './router.js';
import { closeM, appToast } from '../shared/modal.js';
import { handleAct } from '../features/profile.js';
import { applyForm } from '../features/financial.js';
import { lesson, setLastB } from '../features/lesson.js';

export const MAP = [
  [/jadwalkan|booking sesi/i, 'booking'],
  [/jadwal fleksibel|atur jadwal/i, 'jadwal'],
  [/kembali ke|simpan hasil/i, 'beranda'],
  [/chat konselor|ngobrol santai|jadwalkan ngobrol|ngobrol dengan/i, 'chat'],
  [/solusi ekonomi|bantuan dana|ajukan bantuan/i, 'ekonomi'],
  [/jembatan pelajaran/i, 'belajar'],
  [/ruang aman:|cerita tanpa nama/i, 'aman'],
  [/atur jam belajar/i, 'jadwal']
];

/**
 * Initializes global event handlers and polyfills.
 */
export function initGlobalEvents() {
  // 1. Monkeypatch addEventListener to track handled click nodes
  (function () {
    const o = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (t, f, c) {
      if (t === 'click' && this.nodeType === 1) this.__h = 1;
      return o.call(this, t, f, c);
    };
  })();

  // 2. Global Alert Interceptor
  window.alert = function (m) {
    m = String(m);
    const x = /modul: (.+?)(?: \(|$)/.exec(m);
    if (x) {
      setLastB(null);
      lesson(x[1]);
      return;
    }
    if (/jadwal fleksibel/i.test(m)) {
      go('jadwal');
      return;
    }
    if (/forum cerita/i.test(m)) {
      go('chat');
      return;
    }
    if (/konseling gratis/i.test(m)) {
      go('booking');
      return;
    }
    appToast(m);
  };

  // 3. Haptic feedback on button / path interaction
  document.addEventListener('pointerdown', function (e) {
    const b = e.target.closest('button,[data-path]');
    if (!b) return;
    try {
      if (navigator.vibrate) navigator.vibrate(8);
    } catch (err) {}
  });

  // 4. Modal body overflow synchronization
  const observer = new MutationObserver(function () {
    document.body.style.overflow =
      document.getElementById('mdl') || document.getElementById('auth') ? 'hidden' : '';
  });
  observer.observe(document.body, { childList: true });

  // 5. Escape key to close active modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeM();
  });

  // 6. Global delegated click listener
  document.addEventListener('click', function (e) {
    const target = e.target;

    // Close modal if [data-path] inside modal clicked
    if (target.closest('#mdl [data-path]')) {
      closeM();
    }

    // Handle data-path navigation
    const pathEl = target.closest('[data-path]');
    if (pathEl) {
      e.preventDefault();
      go(pathEl.dataset.path);
      return;
    }

    // Handle data-toast
    const toastEl = target.closest('[data-toast]');
    if (toastEl) {
      appToast(toastEl.dataset.toast);
      return;
    }

    // Handle data-apply
    const applyEl = target.closest('[data-apply]');
    if (applyEl) {
      applyForm(applyEl);
      return;
    }

    // Handle data-act
    const actEl = target.closest('[data-act]');
    if (actEl) {
      handleAct(actEl.dataset.act);
      return;
    }

    // Track clicked element for lesson context
    const clickedBtn = target.closest('button,a');
    if (clickedBtn) {
      setLastB(clickedBtn);
      if (target.closest('a[href="#"]')) {
        e.preventDefault();
      }
    }

    // Text matching navigation MAP for unlabeled action buttons
    const viewBtn = target.closest('#view button,#view a');
    if (!viewBtn || viewBtn.onclick || viewBtn.id) return;
    const tx = viewBtn.textContent;
    for (let k = 0; k < MAP.length; k++) {
      if (MAP[k][0].test(tx)) {
        e.preventDefault();
        go(MAP[k][1]);
        return;
      }
    }

    // Micro-interactions for buttons with keywords
    if (/gabung/i.test(tx)) {
      viewBtn.innerHTML = 'Tergabung';
      appToast('Kamu berhasil bergabung.');
    } else if (/pengingat/i.test(tx)) {
      appToast('Pengingat tersimpan di perangkatmu.');
    }
  });
}

// Global exposure
window.MAP = MAP;

