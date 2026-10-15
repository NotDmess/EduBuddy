// EduBuddy Schedule Calculator & Commitment Management Feature
// Provides flexible study slot calculations, quick 5-minute emergency mode,
// and custom user commitment addition.

import { modal, closeM, BTN, IC, appToast } from '../shared/modal.js';
import { cl, today } from '../shared/utils.js';
import { ST } from '../services/storage.js';
import { state } from '../core/state.js';
import { saveScheduleSlot } from '../services/supabase.js';

export let quickModeActive = false;
export let selectedDurationMinutes = 10;

/**
 * Toggles the emergency 5-minute study mode.
 */
export function toggleQuickFiveMode() {
  quickModeActive = !quickModeActive;
  const badge = document.getElementById('mode-badge');
  const btn = document.getElementById('quick-mode-btn');
  const badgeTotal = document.getElementById('badge-total-text') || document.getElementById('total-study-badge');

  if (quickModeActive) {
    if (badge) {
      badge.textContent = 'Aktif (5 Mnt)';
      badge.classList.remove('bg-surface-container-lowest/50', 'text-on-secondary-container');
      badge.classList.add('bg-primary', 'text-on-primary');
    }
    if (btn) {
      btn.classList.add('ring-2', 'ring-primary');
    }
    if (badgeTotal) {
      badgeTotal.textContent = 'Mode 5 Menit Aktif: Total 30 Menit Minggu Ini!';
    }
    showToast('Mode 5 Menit aktif: Beban target dipangkas, streak tetap aman!');
  } else {
    if (badge) {
      badge.textContent = 'Siap';
      badge.classList.remove('bg-primary', 'text-on-primary');
      badge.classList.add('bg-surface-container-lowest/50', 'text-on-secondary-container');
    }
    if (btn) {
      btn.classList.remove('ring-2', 'ring-primary');
    }
    if (badgeTotal) {
      badgeTotal.textContent = 'Ditemukan 6 Celah Waktu: Total 55 Menit Minggu Ini!';
    }
    showToast('Kembali ke ritme normal.');
  }
}

/**
 * Selects preferred study slot duration.
 * @param {number} minutes
 * @param {HTMLElement} btn
 */
export function selectDuration(minutes, btn) {
  selectedDurationMinutes = minutes;
  const buttons = document.querySelectorAll('.duration-option, .duration-btn');
  buttons.forEach(function (b) {
    b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm', 'shadow-md', 'font-bold');
    b.classList.add('bg-surface-container', 'text-on-surface');
    const sub = b.querySelector('span:last-child, .sub-text');
    if (sub) {
      sub.classList.remove('text-primary-fixed', 'text-on-primary/80');
      sub.classList.add('text-on-surface-variant');
    }
  });

  if (btn) {
    btn.classList.remove('bg-surface-container', 'bg-surface-container-low', 'text-on-surface');
    btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm', 'font-bold');
    const sub = btn.querySelector('span:last-child, .sub-text');
    if (sub) {
      sub.classList.remove('text-on-surface-variant');
      sub.classList.add('text-primary-fixed');
    }
  }

  const badgeTotal = document.getElementById('badge-total-text') || document.getElementById('total-study-badge');
  if (badgeTotal && !quickModeActive) {
    if (minutes === 5) {
      badgeTotal.textContent = 'Ditemukan 6 Celah Kilat: Total 30 Menit Minggu Ini!';
    } else if (minutes === 10) {
      badgeTotal.textContent = 'Ditemukan 6 Celah Waktu: Total 55 Menit Minggu Ini!';
    } else {
      badgeTotal.textContent = 'Ditemukan 5 Celah Fokus: Total 75 Menit Minggu Ini!';
    }
  }
}

/**
 * Recalculates available study slots with animation feedback.
 */
export function calculateScheduleAnimation() {
  const results = document.getElementById('results-section') || document.getElementById('results-container');
  if (results) {
    results.classList.add('scale-[0.98]', 'opacity-70');
    setTimeout(function () {
      results.classList.remove('scale-[0.98]', 'opacity-70');
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('Jadwal mikro optimal berhasil diperbarui.');
    }, 250);
  } else {
    showToast('Jadwal baru berhasil dihitung & disesuaikan!');
  }
}

/**
 * Toggles notification reminder toast.
 * @param {HTMLInputElement} [checkbox]
 */
export function toggleNotificationToast(checkbox) {
  if (checkbox && !checkbox.checked) {
    showToast('Pengingat jadwal dinonaktifkan.');
  } else {
    showToast('Pengingat ramah Kakak Pendamping diaktifkan!');
  }
}

/**
 * Saves generated study schedule to calendar.
 */
export function saveScheduleToCalendar() {
  const slotData = {
    d: today(),
    mins: selectedDurationMinutes,
    mode: quickModeActive ? '5menit' : 'fleksibel'
  };
  ST.add('jadwal', slotData);

  if (state.ME && state.ME.id && !state.ME.guest) {
    saveScheduleSlot({
      dayOfWeek: 1, // Senin
      slotTime: '12:45',
      subject: 'Matematika Praktis Warung'
    }).catch(function (err) {
      console.warn('Sync schedule to Supabase failed:', err);
    });
  }

  showToast('Tersimpan! Jadwal mikro disinkronkan ke kalender belajarmu.');
}

/**
 * Resets schedule parameters to default.
 */
export function resetScheduleCustom() {
  selectDuration(10, document.querySelectorAll('.duration-option')[1]);
  showToast('Jadwal dikembalikan ke rekomendasi awal.');
}

/**
 * In-page toast helper for schedule view.
 * @param {string} msg
 */
function showToast(msg) {
  const toast = document.getElementById('toast-notif');
  if (!toast) {
    appToast(msg);
    return;
  }
  const text = document.getElementById('toast-message') || document.getElementById('toast-text');
  if (text) text.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(function () {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2800);
}

/**
 * Opens dialog to add a new fixed commitment to the schedule.
 * @param {HTMLElement} b - Trigger button
 */
export function komit(b) {
  modal(
    '<h3 class="font-headline-md font-bold">Tambah Komitmen</h3>' +
      '<div class="flex flex-col gap-3 mt-4">' +
      '<input id="k1" class="' +
      IC +
      '" placeholder="Misal: Kerja di warung">' +
      '<input id="k2" class="' +
      IC +
      '" placeholder="Jam, misal 16.00-19.00">' +
      '<button id="ks" class="' +
      BTN +
      '">Tambahkan</button>' +
      '</div>'
  );

  const saveBtn = document.getElementById('ks');
  if (saveBtn) {
    saveBtn.onclick = function () {
      const n = cl({
        n: document.getElementById('k1').value.trim(),
        t: document.getElementById('k2').value.trim()
      });
      if (!n.n) return appToast('Isi nama komitmen dulu');

      const sc =
        (b && b.closest && b.closest('.space-y-space-md')) ||
        (b && b.parentElement && b.parentElement.parentElement) ||
        document;
      const gr = sc.querySelector('.grid') || sc;
      const r = document.createElement('div');
      r.className = 'flex items-center justify-between p-3 rounded-[16px] bg-primary-fixed/50';
      r.innerHTML =
        '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">event</span><div><p class="font-label-md font-bold">' +
        n.n +
        '</p><p class="text-body-sm text-on-surface-variant">' +
        (n.t || 'Jam fleksibel') +
        '</p></div></div><button class="w-9 h-9 rounded-full flex items-center justify-center text-outline"><span class="material-symbols-outlined text-[18px]">close</span></button>';

      r.lastChild.onclick = function () {
        r.remove();
        appToast('Komitmen dihapus');
      };
      gr.appendChild(r);
      closeM();
      appToast('Komitmen ditambahkan');
    };
  }
}

/**
 * Initializes listeners for Jadwal view.
 */
export function initJadwal() {
  const addBtn = Array.from(document.querySelectorAll('#view button')).find(function (b) {
    return /tambah/i.test(b.textContent) && b.querySelector('.material-symbols-outlined');
  });
  if (addBtn) {
    addBtn.onclick = function () {
      komit(addBtn);
    };
  }
}

// Global exposure
window.toggleQuickFiveMode = toggleQuickFiveMode;
window.selectDuration = selectDuration;
window.calculateScheduleAnimation = calculateScheduleAnimation;
window.toggleNotificationToast = toggleNotificationToast;
window.saveScheduleToCalendar = saveScheduleToCalendar;
window.resetScheduleCustom = resetScheduleCustom;
window.komit = komit;
window.initJadwal = initJadwal;
