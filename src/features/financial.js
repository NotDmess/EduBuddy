// EduBuddy Financial Assistance Feature
// Handles application forms for scholarships, equipment aid, and emergency student funding.

import { modal, closeM, BTN, appToast } from '../shared/modal.js';
import { ST } from '../services/storage.js';
import { today } from '../shared/utils.js';
import { submitFinancialRequest } from '../services/supabase.js';

/**
 * Opens financial aid application dialog for the specified program.
 * @param {HTMLElement|{dataset: {apply: string}}} a - Button element with data-apply
 */
export function applyForm(a) {
  const t = a.dataset.apply;
  modal(
    '<h3 class="font-headline-md font-bold">Ajukan ' +
      t +
      '</h3>' +
      '<div class="flex flex-col gap-3 mt-4">' +
      '<input id="f1" placeholder="Nama sekolah / PKBM" class="h-12 rounded-2xl border border-outline-variant px-4">' +
      '<select id="f2" class="h-12 rounded-2xl border border-outline-variant px-3">' +
      '<option>Kelas 9</option>' +
      '<option>Kelas 10</option>' +
      '<option>Kelas 11</option>' +
      '<option>Kelas 12</option>' +
      '<option>Paket C</option>' +
      '</select>' +
      '<textarea id="f3" rows="3" placeholder="Ceritakan kebutuhanmu singkat" class="rounded-2xl border border-outline-variant p-4"></textarea>' +
      '<button id="fs" class="' +
      BTN +
      '">Kirim Pengajuan</button>' +
      '</div>'
  );

  const submitBtn = document.getElementById('fs');
  if (submitBtn) {
    submitBtn.onclick = function () {
      const s = document.getElementById('f1').value.trim();
      if (!s) {
        appToast('Isi nama sekolah dulu ya');
        return;
      }
      const applicantClass = document.getElementById('f2').value;
      const reason = document.getElementById('f3').value.trim() || 'Pengajuan bantuan siswa EduBuddy';

      ST.add('ajuan', {
        t: t,
        s: s,
        k: applicantClass,
        d: today()
      });

      submitFinancialRequest({
        aidType: t,
        schoolName: s,
        applicantClass: applicantClass,
        reason: reason
      }).catch(function (err) {
        console.warn('Financial request sync to Supabase failed:', err);
      });

      if (a.textContent !== undefined) a.textContent = 'Terkirim';
      if (a.disabled !== undefined) a.disabled = true;
      closeM();
      appToast('Pengajuan terkirim. Cek statusnya di Riwayat.');
    };
  }
}

/**
 * Updates financial aid buttons on the Ekonomi view to reflect already-submitted applications.
 */
export function initEkonomi() {
  const ds = ST.get('ajuan').map(function (x) {
    return x.t;
  });
  document.querySelectorAll('[data-apply]').forEach(function (b) {
    if (ds.indexOf(b.dataset.apply) > -1) {
      b.textContent = 'Terkirim';
      b.disabled = true;
    }
  });
}

// Global exposure
window.applyForm = applyForm;
window.initEkonomi = initEkonomi;

