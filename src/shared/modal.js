// EduBuddy Modal, Toast, and Feedback Component Utilities

export const BTN = 'w-full h-12 rounded-full bg-primary-container text-on-primary-container font-label-lg font-bold';
export const CD = 'bg-surface-container-lowest rounded-[20px] p-4 shadow-sm';
export const IC = 'h-12 rounded-2xl border border-outline-variant px-4 font-body-md w-full';

/**
 * Closes the active bottom-sheet modal if present.
 */
export function closeM() {
  const m = document.getElementById('mdl');
  if (m) {
    m.remove();
  }
}

/**
 * Creates and displays a bottom-sheet modal with provided HTML content.
 * @param {string} h - HTML content for inside the sheet
 * @returns {HTMLElement} The modal inner container element
 */
export function modal(h) {
  closeM();
  const m = document.createElement('div');
  m.id = 'mdl';
  m.style.cssText =
    'position:fixed;inset:0;background:rgba(19,27,46,.5);z-index:90;display:flex;align-items:flex-end;justify-content:center';
  m.innerHTML =
    '<div style="max-width:480px;width:100%;max-height:88vh;overflow:auto;padding:20px 20px calc(24px + env(safe-area-inset-bottom,0px))" class="bg-white rounded-t-[28px]">' +
    h +
    '</div>';
  m.onclick = function (e) {
    if (e.target === m) {
      m.remove();
    }
  };
  document.body.appendChild(m);
  return m.firstChild;
}

/**
 * Displays an ephemeral toast message near bottom of the viewport.
 * @param {string} m - Message text
 */
export function appToast(m) {
  const e = document.createElement('div');
  e.className = 'tst';
  e.textContent = m;
  e.style.cssText =
    'position:fixed;bottom:104px;left:50%;transform:translateX(-50%);background:#283044;color:#fff;padding:12px 18px;border-radius:999px;font-size:14px;z-index:99;max-width:90%;text-align:center';
  document.body.appendChild(e);
  setTimeout(function () {
    e.remove();
  }, 2400);
}

/**
 * Triggers a celebratory confetti animation across the screen.
 */
export function confetti() {
  const colors = ['#10B981', '#F59E0B', '#8B5CF6', '#F43F5E', '#0EA5E9'];
  for (let i = 0; i < 36; i++) {
    const d = document.createElement('div');
    d.className = 'cf';
    d.style.left = Math.random() * 100 + 'vw';
    d.style.background = colors[i % colors.length];
    d.style.animationDelay = Math.random() * 0.5 + 's';
    d.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    document.body.appendChild(d);
    (function (el) {
      setTimeout(function () {
        el.remove();
      }, 2400);
    })(d);
  }
}

// Global exposure
if (typeof window !== 'undefined') {
  window.modal = modal;
  window.closeM = closeM;
  window.appToast = appToast;
  window.confetti = confetti;
  window.BTN = BTN;
  window.CD = CD;
  window.IC = IC;
}

