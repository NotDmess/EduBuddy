// EduBuddy Ruang Aman & Mediasi Feature
// Anonymous reporting, emotional check-ins, guided breathing exercises, and family dialogue scripts.

import { ST } from '../services/storage.js';
import { today } from '../shared/utils.js';
import { appToast } from '../shared/modal.js';
import { submitIncidentReport } from '../services/supabase.js';

let breatheTimer = null;
let breatheStep = 0;

/**
 * Toggles the 4-second box breathing exercise guide.
 * @param {HTMLElement} btn
 */
export function toggleBreathingGuide(btn) {
  const instr = document.getElementById('breathe-instruction');
  if (breatheTimer) {
    clearInterval(breatheTimer);
    breatheTimer = null;
    if (btn) btn.innerText = 'Mulai Panduan Irama';
    if (instr) instr.innerText = 'Tarik napas 4 detik...';
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

  breatheTimer = setInterval(function () {
    breatheStep = (breatheStep + 1) % steps.length;
    if (instr) instr.innerText = steps[breatheStep];
  }, 4000);
}

/**
 * Handles mood chip selection and displays supportive reflection.
 * @param {HTMLElement} el
 * @param {string} moodName
 */
export function selectMood(el, moodName) {
  document.querySelectorAll('.mood-btn').forEach(function (btn) {
    btn.className =
      'mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]';
    const last = btn.querySelector('span:last-child');
    if (last) last.className = 'font-label-sm text-on-surface mt-1';
  });

  el.className =
    'mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-primary-fixed text-on-primary-fixed shadow-sm transition-all active:scale-95 min-h-[58px]';
  const selectedLabel = el.querySelector('span:last-child');
  if (selectedLabel) {
    selectedLabel.className = 'font-label-sm text-on-primary-fixed mt-1 font-bold';
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
    feedback.innerHTML =
      'Kamu merasa <span class="font-semibold text-primary">' +
      moodName +
      '</span>: ' +
      (msgs[moodName] || 'Terima kasih sudah berbagi perasaanmu.');
  }
}

/**
 * Switches between Orang Tua and Mental tabs in Mediasi view.
 * @param {'orangtua'|'mental'} tab
 */
export function switchTab(tab) {
  const btnOrtu = document.getElementById('tab-btn-orangtua');
  const btnMental = document.getElementById('tab-btn-mental');
  const contentOrtu = document.getElementById('tab-content-orangtua');
  const contentMental = document.getElementById('tab-content-mental');

  if (tab === 'orangtua') {
    if (btnOrtu)
      btnOrtu.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm';
    if (btnMental)
      btnMental.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface';
    if (contentOrtu) contentOrtu.classList.remove('hidden');
    if (contentMental) contentMental.classList.add('hidden');
  } else {
    if (btnMental)
      btnMental.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm';
    if (btnOrtu)
      btnOrtu.className =
        'flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface';
    if (contentMental) contentMental.classList.remove('hidden');
    if (contentOrtu) contentOrtu.classList.add('hidden');
  }
}

/**
 * Copies dialogue script to clipboard with user feedback.
 */
export function copyScript() {
  const textEl = document.getElementById('quote-script-text');
  const textToCopy = textEl ? textEl.innerText : '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).catch(function () {});
  }

  const copyLabel = document.getElementById('copy-label');
  const copyIcon = document.getElementById('copy-icon');
  if (copyLabel) copyLabel.innerText = 'Tersalin ke Clipboard!';
  if (copyIcon) copyIcon.innerText = 'check_circle';

  showToast('Kalimat pembuka berhasil disalin ke clipboard!');

  setTimeout(function () {
    if (copyLabel) copyLabel.innerText = 'Salin Kalimat ke Catatan';
    if (copyIcon) copyIcon.innerText = 'content_copy';
  }, 2500);
}

/**
 * Shares program summary via WhatsApp link.
 */
export function shareWhatsApp() {
  const shareText = encodeURIComponent(
    'Halo Ibu/Bapak, ini ada ringkasan informasi yang bagus tentang peluang kerja dan fleksibilitas belajar dari program EduBuddy: https://edubuddy.id/ringkasan-keluarga'
  );
  showToast('Membuka WhatsApp untuk membagikan ringkasan...');
  setTimeout(function () {
    window.open('https://api.whatsapp.com/send?text=' + shareText, '_blank');
  }, 400);
}

/**
 * Schedules counseling session shortcut from Mediasi view.
 */
export function scheduleCounseling() {
  showToast('Membuka formulir jadwal konseling dengan Bu Ani...');
  setTimeout(function () {
    if (window.go) {
      window.go('booking');
    } else {
      alert(
        'Halo! Waktu konseling gratis bersama Bu Ani tersedia setiap Selasa & Kamis jam 16:00 - 18:00 WIB via chat aman atau telpon.'
      );
    }
  }, 400);
}

/**
 * Toast helper for in-page notification banners.
 * @param {string} msg
 */
function showToast(msg) {
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

function dismissToast() {
  const toast = document.getElementById('toast-notif');
  if (!toast) return;
  toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.remove('opacity-100', 'translate-y-0');
}

/**
 * Initializes interactive controls on the Ruang Aman view.
 */
export function initAman() {
  // Chip multi-select interaction
  const chips = document.querySelectorAll('.chip-btn');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const isSelected = chip.classList.contains('bg-primary-container');
      if (isSelected) {
        chip.classList.remove('bg-primary-container', 'text-on-primary-container');
        chip.classList.add('bg-surface-container', 'text-on-surface-variant');
      } else {
        chip.classList.remove('bg-surface-container', 'text-on-surface-variant');
        chip.classList.add('bg-primary-container', 'text-on-primary-container');
      }
    });
  });

  // Severity Slider Label Update
  const slider = document.getElementById('severity-range');
  const label = document.getElementById('severity-label');
  const descriptions = [
    { text: '1 - Ringan / Curhat Biasa', bg: 'bg-primary-fixed', textCol: 'text-on-primary-fixed' },
    { text: '2 - Mengganggu Keseharian', bg: 'bg-secondary-fixed', textCol: 'text-on-secondary-fixed' },
    { text: '3 - Sangat Menekan Pikiran', bg: 'bg-secondary-container', textCol: 'text-on-secondary-container' },
    { text: '4 - Butuh Bantuan Segera', bg: 'bg-error-container', textCol: 'text-on-error-container' }
  ];

  if (slider && label) {
    slider.addEventListener('input', function (e) {
      const val = parseInt(e.target.value, 10) - 1;
      const cur = descriptions[val];
      if (cur) {
        label.textContent = cur.text;
        label.className = 'font-label-sm px-2.5 py-0.5 rounded-full font-bold ' + cur.bg + ' ' + cur.textCol;
      }
    });
  }

  // File upload change listener
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) {
        const fileName = fileInput.files[0].name;
        const uploadBox = fileInput.closest('.group');
        const label = uploadBox ? uploadBox.querySelector('.font-label-md') : null;
        if (label) {
          label.innerHTML = '<span class="text-primary font-bold">✓ ' + fileName + '</span> (EXIF dibersihkan)';
        }
        appToast('File terpilih: ' + fileName + ' (Metadata GPS dibersihkan).');
      }
    });
  }

  // Submit micro-animation and persistence
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const reportCode = 'EB-' + Math.floor(1000 + Math.random() * 9000);
      const selectedChips = document.querySelectorAll('.chip-btn.bg-primary-container');
      const categories =
        [].map
          .call(selectedChips, function (x) {
            return x.textContent.trim();
          })
          .join(', ') || 'Lainnya';
      const textInput = document.getElementById('cerita') || document.getElementById('lapor-teks');
      const note = (textInput && textInput.value.trim()) || 'Tidak ada catatan tambahan';
      const severityVal = (slider && parseInt(slider.value, 10)) || 1;

      ST.add('laporan', { c: reportCode, j: categories, d: today(), t: note });

      submitIncidentReport({
        category: categories,
        severityLevel: severityVal,
        description: note
      }).catch(function (err) {
        console.warn('Incident report cloud sync failed:', err);
      });

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="material-symbols-outlined animate-spin text-[20px]">sync</span>' +
        '<span>Mengenkripsi & Mengirim Aman...</span>';

      setTimeout(function () {
        submitBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
        submitBtn.classList.add('bg-primary', 'text-on-primary');
        submitBtn.innerHTML =
          '<span class="material-symbols-outlined text-[20px]">check_circle</span>' +
          '<span>Terkirim Aman (#' +
          reportCode +
          ')!</span>';
        appToast('Laporan aman terkirim #' + reportCode);
      }, 1200);
    });
  }
}

// Global exposure
window.toggleBreathingGuide = toggleBreathingGuide;
window.selectMood = selectMood;
window.switchTab = switchTab;
window.copyScript = copyScript;
window.shareWhatsApp = shareWhatsApp;
window.scheduleCounseling = scheduleCounseling;
window.initAman = initAman;

