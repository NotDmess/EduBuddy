// EduBuddy Profile & Settings Feature
// Profile display, profile edit modal, password change, parent contact, FAQ modal,
// and notification center.

import { state } from '../core/state.js';
import { ST, saveMe } from '../services/storage.js';
import { esc } from '../shared/utils.js';
import { modal, closeM, BTN, CD, IC, appToast } from '../shared/modal.js';
import { avt, hsh, opts, showAuth, enter, KLS, performLogout } from '../services/auth.js';
import { updateProfile, updatePassword } from '../services/supabase.js';
import { quiz } from './quiz.js';

/**
 * Switch component markup generator.
 * @param {boolean} on
 * @returns {string}
 */
export function sw(on) {
  return (
    '<span class="w-11 h-6 rounded-full p-0.5 flex ' +
    (on ? 'bg-primary-container justify-end' : 'bg-outline-variant justify-start') +
    '"><span class="w-5 h-5 rounded-full bg-white shadow"></span></span>'
  );
}

/**
 * Grid tile button markup generator.
 * @param {string} p
 * @param {string} i
 * @param {string} t
 * @param {string} s
 * @returns {string}
 */
export function tl(p, i, t, s) {
  return (
    '<button data-path="' +
    p +
    '" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left"><span class="material-symbols-outlined text-primary text-[28px]">' +
    i +
    '</span><h4 class="font-headline-sm font-bold mt-2">' +
    t +
    '</h4><p class="text-body-sm text-on-surface-variant">' +
    s +
    '</p></button>'
  );
}

/**
 * Opens edit profile modal.
 */
export function editProf() {
  const u = state.ME;
  const cs = ['#10B981', '#8B5CF6', '#F59E0B', '#F43F5E', '#0EA5E9', '#475569'];
  let w = u.warna;

  const bx = modal(
    '<h3 class="font-headline-md font-bold">Edit Profil</h3>' +
      '<div class="flex flex-col gap-3 mt-4">' +
      '<div class="flex justify-center gap-2" id="cc">' +
      cs
        .map(function (c) {
          return (
            '<button data-c="' +
            c +
            '" class="w-9 h-9 rounded-full" style="background:' +
            c +
            ';outline:' +
            (c === w ? '3px solid #006c49' : 'none') +
            ';outline-offset:2px"></button>'
          );
        })
        .join('') +
      '</div>' +
      '<input id="e1" class="' +
      IC +
      '" placeholder="Nama" value="' +
      esc(u.nama) +
      '">' +
      '<input id="e2" class="' +
      IC +
      '" placeholder="Sekolah" value="' +
      esc(u.sekolah) +
      '">' +
      '<select id="e3" class="' +
      IC +
      '">' +
      opts(KLS, u.kelas) +
      '</select>' +
      '<textarea id="e4" rows="2" class="rounded-2xl border border-outline-variant p-4" placeholder="Bio / impianmu">' +
      esc(u.bio) +
      '</textarea>' +
      '<label class="text-body-sm text-on-surface-variant">Target belajar harian</label>' +
      '<select id="e5" class="' +
      IC +
      '">' +
      [5, 10, 15]
        .map(function (m) {
          return '<option value="' + m + '"' + (m === u.target ? ' selected' : '') + '>' + m + ' menit/hari</option>';
        })
        .join('') +
      '</select>' +
      '<button id="es" class="' +
      BTN +
      '">Simpan Perubahan</button>' +
      '</div>'
  );

  bx.querySelectorAll('[data-c]').forEach(function (b) {
    b.onclick = function () {
      w = b.dataset.c;
      bx.querySelectorAll('[data-c]').forEach(function (x) {
        x.style.outline = x === b ? '3px solid #006c49' : 'none';
      });
    };
  });

  const saveBtn = document.getElementById('es');
  if (saveBtn) {
    saveBtn.onclick = function () {
      const n = document.getElementById('e1').value.trim();
      if (!n) return appToast('Nama tidak boleh kosong');
      state.ME.nama = n;
      state.ME.full_name = n;
      state.ME.sekolah = document.getElementById('e2').value.trim();
      state.ME.kelas = document.getElementById('e3').value;
      state.ME.bio = document.getElementById('e4').value.trim();
      state.ME.target = +document.getElementById('e5').value;
      state.ME.warna = w;
      state.ME.avatar_color = w;

      if (state.ME.id && !state.ME.guest) {
        updateProfile(state.ME.id, {
          full_name: n,
          school: state.ME.sekolah,
          grade: state.ME.kelas,
          bio: state.ME.bio,
          avatar_color: w,
          study_target_minutes: state.ME.target
        }).catch(function (err) {
          console.warn('Sync profile to Supabase failed:', err);
        });
      } else {
        saveMe();
      }

      closeM();
      const profileImg = document.querySelector('#hd [data-path="profil"] img');
      if (profileImg) {
        profileImg.src = avt(state.ME);
      }
      if (window.render) window.render();
      appToast('Profil diperbarui');
    };
  }
}

/**
 * Opens password change modal.
 */
export function pwForm() {
  modal(
    '<h3 class="font-headline-md font-bold">Ubah Kata Sandi</h3>' +
      '<div class="flex flex-col gap-3 mt-4">' +
      '<input id="p2" type="password" class="' +
      IC +
      '" placeholder="Kata sandi baru (min. 6 karakter)">' +
      '<button id="ps" class="' +
      BTN +
      '">Simpan Kata Sandi</button>' +
      '</div>'
  );

  const saveBtn = document.getElementById('ps');
  if (saveBtn) {
    saveBtn.onclick = async function () {
      if (state.ME.isGuest) {
        return appToast('Akun Tamu tidak dapat mengubah kata sandi.');
      }
      const n = document.getElementById('p2').value;
      if (!n || n.length < 6) return appToast('Kata sandi baru minimal 6 karakter');

      saveBtn.disabled = true;
      saveBtn.textContent = 'Menyimpan...';

      const res = await updatePassword(n);
      if (res?.error) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Simpan Kata Sandi';
        return appToast('Gagal: ' + (res.error.message || 'Tidak dapat memperbarui kata sandi'));
      }

      closeM();
      appToast('Kata sandi berhasil diperbarui');
    };
  }
}

/**
 * Opens parent / guardian contact modal.
 */
export function ortuForm() {
  modal(
    '<h3 class="font-headline-md font-bold">Kontak Orang Tua/Wali</h3>' +
      '<p class="text-body-sm text-on-surface-variant mt-1">Opsional. Dipakai untuk membagikan ringkasan percakapan.</p>' +
      '<input id="o1" class="' +
      IC +
      ' mt-4" placeholder="Nama / No. WhatsApp" value="' +
      esc(state.ME.ortu) +
      '">' +
      '<button id="os" class="' +
      BTN +
      ' mt-3">Simpan</button>'
  );

  const saveBtn = document.getElementById('os');
  if (saveBtn) {
    saveBtn.onclick = function () {
      state.ME.ortu = document.getElementById('o1').value.trim();
      saveMe();
      closeM();
      if (window.render) window.render();
      appToast('Kontak disimpan');
    };
  }
}

/**
 * Opens FAQ & Help bottom sheet.
 */
export function faq() {
  const q = [
    [
      'Apakah laporan bully benar-benar anonim?',
      'Ya. Nama dan akunmu tidak dikirim bersama laporan. Kamu hanya mendapat kode pelacakan.'
    ],
    ['Apakah konseling gratis?', 'Ya, sesi dengan konselor dan peer buddy di EduBuddy gratis.'],
    ['Berapa lama belajar sehari?', 'Cukup 5-15 menit. Atur ritmenya di menu Jadwal.'],
    [
      'Dataku disimpan di mana?',
      'Di perangkat ini saja (versi demo). Jangan hapus data browser jika ingin menyimpannya.'
    ]
  ];

  modal(
    '<h3 class="font-headline-md font-bold mb-3">Bantuan & FAQ</h3>' +
      q
        .map(function (x) {
          return (
            '<details class="border-b border-surface-container py-3"><summary class="font-label-lg font-bold">' +
            x[0] +
            '</summary><p class="mt-2 text-on-surface-variant">' +
            x[1] +
            '</p></details>'
          );
        })
        .join('') +
      '<button class="mt-4 ' +
      BTN +
      '" onclick="closeM()">Tutup</button>'
  );
}

/**
 * Opens Notification Center modal.
 */
export function notif() {
  const l = [['notifications', 'Selamat datang di EduBuddy', 'Mulai dengan tes diagnostik 2 menit.']];
  ST.get('booking').forEach(function (x) {
    l.unshift(['calendar_today', 'Sesi dengan ' + x.n, x.d + ' pukul ' + x.t]);
  });
  ST.get('ajuan').forEach(function (x) {
    l.unshift(['payments', 'Pengajuan ' + x.t, 'Sedang diverifikasi']);
  });
  ST.get('laporan').forEach(function (x) {
    l.unshift(['shield', 'Laporan #' + x.c, 'Diterima, menunggu konselor']);
  });

  modal(
    '<h3 class="font-headline-md font-bold mb-3">Notifikasi</h3>' +
      l
        .map(function (x) {
          return (
            '<div class="flex items-center gap-3 py-3 border-b border-surface-container"><div class="w-10 h-10 rounded-full bg-primary-fixed/50 flex items-center justify-center shrink-0 text-primary"><span class="material-symbols-outlined text-[20px]">' +
            x[0] +
            '</span></div><div><b>' +
            x[1] +
            '</b><br><span class="text-body-sm text-on-surface-variant">' +
            x[2] +
            '</span></div></div>'
          );
        })
        .join('') +
      '<button class="mt-4 ' +
      BTN +
      '" onclick="closeM()">Tutup</button>'
  );
}

/**
 * Renders the dynamic Profil view in #view.
 */
export function initProfil() {
  const v = document.getElementById('view');
  const u = state.ME || { nama: 'Teman', guest: true };
  const g = !u.guest;

  function row(a, i, t, r) {
    return (
      '<button data-act="' +
      a +
      '" class="w-full flex items-center gap-3 p-4 text-left"><span class="material-symbols-outlined text-primary">' +
      i +
      '</span><span class="flex-1 font-label-lg">' +
      t +
      '</span>' +
      (r || '<span class="material-symbols-outlined text-outline">chevron_right</span>') +
      '</button>'
    );
  }

  v.innerHTML =
    '<div class="flex flex-col gap-4">' +
    '<div class="' +
    CD +
    ' flex items-center gap-4">' +
    '<img src="' +
    avt(u) +
    '" class="w-16 h-16 rounded-full ring-4 ring-primary/20">' +
    '<div class="flex-1 min-w-0"><h2 class="font-headline-md font-bold truncate">' +
    esc(u.nama) +
    '</h2><p class="text-body-sm text-on-surface-variant truncate">' +
    esc(u.sekolah || 'Sekolah belum diisi') +
    (u.kelas ? ' • ' + esc(u.kelas) : '') +
    '</p><p class="text-body-sm text-on-surface-variant truncate">' +
    (u.guest ? 'Mode tamu' : esc(u.email)) +
    '</p></div>' +
    '<button data-act="edit" aria-label="Edit profil" class="w-11 h-11 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center"><span class="material-symbols-outlined">edit</span></button>' +
    '</div>' +
    (u.bio ? '<p class="' + CD + ' text-body-md italic">“' + esc(u.bio) + '”</p>' : '') +
    '<div class="grid grid-cols-3 gap-3 text-center">' +
    [
      [ST.get('belajar').length, 'Modul'],
      [ST.get('booking').length, 'Sesi'],
      [(u.target || 10) + 'm', 'Target/hari']
    ]
      .map(function (x) {
        return (
          '<div class="' +
          CD +
          '"><div class="font-headline-md font-bold text-primary">' +
          x[0] +
          '</div><div class="text-label-sm text-on-surface-variant">' +
          x[1] +
          '</div></div>'
        );
      })
      .join('') +
    '</div>' +
    (u.guest ? '<button data-act="logout" class="' + BTN + '">Daftar / Masuk agar datamu tersimpan</button>' : '') +
    '<h3 class="font-headline-sm font-bold">Semua Fitur</h3>' +
    '<div class="grid grid-cols-2 gap-3">' +
    [
      ['diagnostik', 'monitor_heart', 'Diagnostik Risiko', 'Tes & rekomendasi'],
      ['belajar', 'local_library', 'Career Bridge', 'Materi tepat guna'],
      ['aman', 'shield', 'Ruang Aman', 'Lapor bully anonim'],
      ['jadwal', 'event_available', 'Jadwal Fleksibel', 'Belajar 5-15 menit'],
      ['mediasi', 'family_restroom', 'Mediasi & Konseling', 'Orang tua, hati & pikiran'],
      ['ekonomi', 'account_balance_wallet', 'Bantuan & Beasiswa', 'PIP, KIP, dana SPP'],
      ['chat', 'forum', 'Teman Cerita', 'Chat konselor'],
      ['booking', 'event', 'Booking Konselor', 'Pilih jadwal sesi'],
      ['riwayat', 'history', 'Riwayat', 'Laporan, bantuan, badge'],
      ['beranda', 'home', 'Beranda', 'Ringkasan harianmu']
    ]
      .map(function (x) {
        return tl(x[0], x[1], x[2], x[3]);
      })
      .join('') +
    '</div>' +
    '<h3 class="font-headline-sm font-bold mt-2">Pengaturan</h3>' +
    '<div class="' +
    CD +
    ' !p-0 divide-y divide-surface-container">' +
    row('edit', 'person', 'Edit Profil') +
    row('sw:notif', 'notifications', 'Notifikasi & Pengingat', sw(u.notif !== false)) +
    row('sw:anon', 'lock', 'Mode Anonim Default', sw(u.anon !== false)) +
    row(
      'ortu',
      'contact_phone',
      'Kontak Orang Tua/Wali',
      '<span class="text-body-sm text-outline truncate max-w-[40%]">' + esc(u.ortu || 'Belum diisi') + '</span>'
    ) +
    (u.guest ? '' : row('pw', 'key', 'Ubah Kata Sandi')) +
    row('faq', 'help', 'Bantuan & FAQ') +
    '<button data-act="logout" class="w-full flex items-center gap-3 p-4 text-left text-error"><span class="material-symbols-outlined">logout</span><span class="flex-1 font-label-lg">' +
    (u.guest ? 'Keluar dari Mode Tamu' : 'Keluar') +
    '</span></button>' +
    '</div>' +
    '<p class="text-center text-label-sm text-outline">EduBuddy v1.1 • Teman Belajar Dimanapun</p>' +
    '</div>';
}

/**
 * Handles action triggers from [data-act] elements.
 * @param {string} act
 */
export function handleAct(act) {
  if (act === 'edit') editProf();
  else if (act === 'pw') pwForm();
  else if (act === 'ortu') ortuForm();
  else if (act === 'faq') faq();
  else if (act === 'notif') notif();
  else if (act === 'quiz') quiz();
  else if (act === 'sw:notif') {
    state.ME.notif = state.ME.notif === false;
    saveMe();
    initProfil();
    appToast('Pengaturan notifikasi disimpan');
  } else if (act === 'sw:anon') {
    state.ME.anon = state.ME.anon === false;
    saveMe();
    initProfil();
    appToast('Mode anonim disimpan');
  } else if (act === 'save-quote') {
    const qb = document.querySelector('[data-act="save-quote"]');
    if (qb) {
      qb.innerHTML = '<span class="material-symbols-outlined text-[16px]">bookmark_added</span><span>Tersimpan di Catatan</span>';
    }
    appToast('Pesan pengingat disimpan ke catatan.');
  } else if (act === 'logout') {
    performLogout();
  }
}

// Global exposure
window.editProf = editProf;
window.pwForm = pwForm;
window.ortuForm = ortuForm;
window.faq = faq;
window.notif = notif;
window.initProfil = initProfil;
window.sw = sw;
window.tl = tl;
window.handleAct = handleAct;

