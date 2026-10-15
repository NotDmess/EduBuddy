// EduBuddy Mediasi & Konseling Feature
// Handles parent-student dialogue script builder, WhatsApp shareable summaries,
// emotional mood tracking, 4-second box breathing exercise, and counseling scheduling.

import { appToast } from '../shared/modal.js';
import { go } from '../core/router.js';

let breatheTimer = null;
let breatheStep = 0;

/**
 * Switches between 'orangtua' and 'mental' tabs in Mediasi view.
 * @param {'orangtua'|'mental'} tab
 */
export function switchTab(tab) {
  const btnOrtu = document.getElementById('tab-btn-orangtua');
  const btnMental = document.getElementById('tab-btn-mental');
  const contentOrtu = document.getElementById('tab-content-orangtua');
  const contentMental = document.getElementById('tab-content-mental');

  if (tab === 'orangtua') {
    if (btnOrtu) {
      btnOrtu.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm';
    }
    if (btnMental) {
      btnMental.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface';
    }
    if (contentOrtu) contentOrtu.classList.remove('hidden');
    if (contentMental) contentMental.classList.add('hidden');
  } else {
    if (btnMental) {
      btnMental.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm';
    }
    if (btnOrtu) {
      btnOrtu.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface';
    }
    if (contentMental) contentMental.classList.remove('hidden');
    if (contentOrtu) contentOrtu.classList.add('hidden');
  }
}

/**
 * Copies the negotiation script to clipboard with button feedback.
 */
export function copyScript() {
  const textEl = document.getElementById('quote-script-text');
  const textToCopy = textEl ? textEl.innerText.trim() : '';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  }

  const copyLabel = document.getElementById('copy-label');
  const copyIcon = document.getElementById('copy-icon');
  if (copyLabel) copyLabel.innerText = 'Tersalin ke Clipboard!';
  if (copyIcon) copyIcon.innerText = 'check_circle';

  showToast('Kalimat pembuka berhasil disalin ke clipboard!');

  setTimeout(() => {
    if (copyLabel) copyLabel.innerText = 'Salin Kalimat ke Catatan';
    if (copyIcon) copyIcon.innerText = 'content_copy';
  }, 2500);
}

/**
 * Opens WhatsApp to share educational summary with parents.
 */
export function shareWhatsApp() {
  const shareText = encodeURIComponent(
    'Halo Ibu/Bapak, ini ada ringkasan informasi yang bagus tentang peluang kerja dan fleksibilitas belajar dari program EduBuddy: https://edubuddy.id/ringkasan-keluarga'
  );
  showToast('Membuka WhatsApp untuk membagikan ringkasan...');
  setTimeout(() => {
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  }, 400);
}

/**
 * Handles mood selection and displays empathetic guidance.
 * @param {HTMLElement} el
 * @param {string} moodName
 */
export function selectMood(el, moodName) {
  if (typeof el === 'string') {
    moodName = el;
    el = Array.from(document.querySelectorAll('.mood-btn')).find((b) =>
      b.textContent.includes(moodName)
    );
  }

  document.querySelectorAll('.mood-btn').forEach((btn) => {
    btn.className =
      'mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]';
    const last = btn.querySelector('span:last-child');
    if (last) last.className = 'font-label-sm text-on-surface mt-1';
  });

  if (el && typeof el === 'object' && el.nodeType === 1) {
    el.className =
      'mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-primary-fixed text-on-primary-fixed shadow-sm transition-all active:scale-95 min-h-[58px]';
    const selectedLabel = el.querySelector('span:last-child');
    if (selectedLabel) {
      selectedLabel.className = 'font-label-sm text-on-primary-fixed mt-1 font-bold';
    }
  }

  const feedback = document.getElementById('mood-feedback');
  const msgs = {
    Capek: 'Napas dulu sejenak. Kamu sudah berjuang luar biasa hari ini. Rehat bukan berarti menyerah ya.',
    Cemas: 'Wajar merasa khawatir. Coba fokus ke satu jam ke depan saja, tidak usah pikirkan esok dulu.',
    Biasa: 'Hari yang tenang juga patut dinikmati. Jaga ritme belajarmu ya.',
    Tenang: 'Senang mendengarnya. Simpan ketenangan ini untuk melangkah ke modul berikutnya.',
    Semangat: 'Energi positifmu keren banget! Manfaatkan untuk selesaikan 1 micro-task hari ini!'
  };

  if (feedback) {
    feedback.innerHTML = `Kamu memilih <span class="font-semibold text-primary">${moodName}</span>: ${
      msgs[moodName] || 'Terima kasih sudah berbagi perasaanmu.'
    }`;
  }
}

/**
 * Toggles the 4-second box breathing timer.
 * @param {HTMLElement} btn
 */
export function toggleBreathingGuide(btn) {
  const instr = document.getElementById('breathe-instruction');
  const circle = document.getElementById('breathe-circle');

  if (breatheTimer) {
    clearInterval(breatheTimer);
    breatheTimer = null;
    if (btn) btn.innerText = 'Mulai Panduan Irama';
    if (instr) instr.innerText = 'Tarik napas 4 detik...';
    if (circle) circle.classList.remove('scale-125');
    return;
  }

  if (btn) btn.innerText = 'Hentikan Irama';
  const steps = [
    'Tarik napas perlahan... (1-2-3-4)',
    'Tahan di dada... (1-2-3-4)',
    'Hembuskan lewat mulut... (1-2-3-4)',
    'Tenang sejenak...'
  ];

  breatheStep = 0;
  if (instr) instr.innerText = steps[0];
  if (circle) circle.classList.add('scale-125');

  breatheTimer = setInterval(() => {
    breatheStep = (breatheStep + 1) % steps.length;
    if (instr) instr.innerText = steps[breatheStep];
    if (circle) {
      if (breatheStep === 0) circle.classList.add('scale-125');
      else if (breatheStep === 2) circle.classList.remove('scale-125');
    }
  }, 4000);
}

/**
 * Directs student to booking flow for Counselor appointment.
 */
export function scheduleCounseling() {
  showToast('Membuka jadwal konseling dengan Bu Ani...');
  setTimeout(() => {
    go('booking');
  }, 350);
}

/**
 * Displays in-page toast banner.
 * @param {string} msg
 */
export function showToast(msg) {
  const toast = document.getElementById('toast-notif');
  if (!toast) {
    appToast(msg);
    return;
  }
  const text = document.getElementById('toast-text');
  if (text) text.innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(dismissToast, 3500);
}

/**
 * Dismisses in-page toast banner.
 */
export function dismissToast() {
  const toast = document.getElementById('toast-notif');
  if (!toast) return;
  toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.remove('opacity-100', 'translate-y-0');
}

/**
 * Initializes interactive elements for Mediasi view.
 */
export function initMediasi() {
  // Ensure default tab is displayed properly
  switchTab('orangtua');
}

// Global exposure for template inline triggers
window.switchTab = switchTab;
window.copyScript = copyScript;
window.shareWhatsApp = shareWhatsApp;
window.selectMood = selectMood;
window.toggleBreathingGuide = toggleBreathingGuide;
window.scheduleCounseling = scheduleCounseling;
window.showToast = showToast;
window.dismissToast = dismissToast;
window.initMediasi = initMediasi;
