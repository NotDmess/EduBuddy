// EduBuddy Micro-Module Interactive Lessons
// Four practical life-skill modules: Aritmatika Sosial (dagang), Penulis Konten (copy),
// Teknisi Pemula (listrik), Admin Olshop (olshop).

import { modal, closeM, BTN, confetti, appToast } from '../shared/modal.js';
import { ST } from '../services/storage.js';
import { esc, today } from '../shared/utils.js';

export let LASTB = null;

export function setLastB(el) {
  LASTB = el;
}

export const LS = [
  [
    'Kenali modal & harga jual',
    'Modal adalah semua biaya untuk membuat atau membeli barang. Harga jual adalah yang dibayar pembeli. Selisihnya adalah keuntungan kotor.'
  ],
  [
    'Hitung margin',
    'Margin (%) = (Untung / Harga Jual) x 100. Kalau untung Rp 1.000 dari jual Rp 5.000, marginmu 20%.'
  ],
  [
    'Pemisahan uang pribadi & usaha',
    'Jangan campur uang jajan dan uang modal. Kalau tercampur, modal habis tanpa disadari.'
  ]
];

export const LX = {
  dagang: {
    b: 'Jago Hitung Untung',
    s: LS,
    q: ['Modal Rp 2.000, dijual Rp 3.000. Untung per item?', ['Rp 1.000', 'Rp 2.000', 'Rp 5.000']]
  },
  copy: {
    b: 'Penulis Konten',
    s: [
      [
        'Kenali audiensmu',
        'Tulis untuk satu orang yang jelas: siapa dia dan apa masalahnya? Pesan yang spesifik lebih mudah diingat.'
      ],
      [
        'Rumus AIDA',
        'Attention (menarik perhatian), Interest (minat), Desire (ingin), Action (ajakan bertindak). Cocok untuk caption jualan.'
      ],
      [
        'Judul yang menjual',
        'Pakai angka, manfaat, dan bahasa sehari-hari. Contoh: "3 Jajanan Murah yang Bikin Ketagihan".'
      ]
    ],
    q: ['Dalam AIDA, huruf A kedua berarti?', ['Action (ajakan bertindak)', 'Angka', 'Aman']]
  },
  listrik: {
    b: 'Teknisi Pemula',
    s: [
      [
        'Keselamatan dulu',
        'Matikan MCB sebelum menyentuh instalasi. Jangan bekerja dengan tangan basah.'
      ],
      [
        'Hukum Ohm',
        'V = I x R: tegangan sama dengan arus dikali hambatan. Dasar Fisika yang dipakai teknisi.'
      ],
      [
        'Daya listrik',
        'P = V x I. Lampu 10 watt di 220V menarik arus sekitar 0,045 A. Hitung daya agar tagihan terkendali.'
      ]
    ],
    q: ['Sebelum memperbaiki stopkontak, langkah pertama?', ['Matikan MCB', 'Basahi tangan', 'Tarik kabel']]
  },
  olshop: {
    b: 'Admin Olshop',
    s: [
      [
        'Mulai dari satu produk',
        'Pilih produk yang kamu pahami. Foto jelas dan deskripsi jujur menaikkan kepercayaan pembeli.'
      ],
      [
        'Balas cepat dan ramah',
        'Admin yang membalas dalam 5 menit lebih sering closing. Siapkan template jawaban umum.'
      ],
      [
        'Catat pesanan',
        'Catat nama, produk, jumlah, alamat, dan status bayar agar tidak ada pesanan terlewat.'
      ]
    ],
    q: ['Apa yang paling menaikkan kepercayaan pembeli?', ['Foto jelas & deskripsi jujur', 'Harga paling mahal', 'Jarang membalas']]
  }
};

/**
 * Resolves context module title from the clicked button or surrounding headings.
 * @returns {string}
 */
export function ctitle() {
  const b = LASTB;
  if (!b) return '';
  const oc = b.getAttribute && b.getAttribute('onclick');
  const m = oc && /modul: (.+?)(?: \(|'|")/.exec(oc);
  if (m) return m[1];

  let n = b;
  for (let i = 0; i < 8 && n; i++) {
    n = n.parentElement;
    if (!n || n.id === 'view') break;
    const hs = n.querySelectorAll('h3');
    if (hs.length === 1) return hs[0].textContent.trim();
    if (!hs.length) {
      const h4 = n.querySelectorAll('h4');
      if (h4.length === 1) return h4[0].textContent.trim();
    }
  }
  return '';
}

/**
 * Opens an interactive 4-step micro-lesson in a bottom sheet modal.
 * @param {string} [t] - Lesson title override
 */
export function lesson(t) {
  t = ctitle() || t || 'Aritmatika Sosial';
  const k = /copy|konten|tulis|bahasa/i.test(t)
    ? 'copy'
    : /listrik|servis|fisika|teknisi/i.test(t)
    ? 'listrik'
    : /olshop|admin|digital/i.test(t)
    ? 'olshop'
    : 'dagang';

  const L = LX[k];
  let i = 0;
  const box = modal('');

  function draw() {
    if (i < 3) {
      box.innerHTML =
        '<p class="text-label-sm text-primary font-bold">' +
        esc(t) +
        ' - ' +
        (i + 1) +
        '/4</p><h3 class="font-headline-md font-bold mt-2">' +
        L.s[i][0] +
        '</h3><p class="mt-3 text-body-lg text-on-surface-variant">' +
        L.s[i][1] +
        '</p><button id="ln" class="mt-6 ' +
        BTN +
        '">Lanjut</button>';

      const nextBtn = document.getElementById('ln');
      if (nextBtn) {
        nextBtn.onclick = function () {
          i++;
          draw();
        };
      }
    } else if (i === 3) {
      const o = L.q[1]
        .map(function (x, n) {
          return [x, n === 0 ? 1 : 0];
        })
        .sort(function () {
          return Math.random() - 0.5;
        });

      box.innerHTML =
        '<p class="text-label-sm text-primary font-bold">Kuis kecil - 4/4</p><h3 class="font-headline-md font-bold mt-2">' +
        L.q[0] +
        '</h3><div class="flex flex-col gap-2 mt-4">' +
        o
          .map(function (x) {
            return (
              '<button data-q="' +
              x[1] +
              '" class="h-12 rounded-2xl border border-outline-variant font-label-lg">' +
              x[0] +
              '</button>'
            );
          })
          .join('') +
        '</div>';

      box.querySelectorAll('[data-q]').forEach(function (b) {
        b.onclick = function () {
          if (b.dataset.q === '1') {
            i = 4;
            draw();
          } else {
            appToast('Belum tepat, coba lagi ya.');
          }
        };
      });
    } else {
      ST.add('belajar', { t: t, d: today() });
      confetti();
      box.innerHTML =
        '<div class="text-center py-4"><div class="w-16 h-16 mx-auto mb-2 rounded-full bg-primary-fixed flex items-center justify-center text-primary"><span class="material-symbols-outlined text-[36px]" style="font-variation-settings: \'FILL\' 1;">workspace_premium</span></div><h3 class="font-headline-md font-bold mt-3">Modul selesai!</h3><p class="text-on-surface-variant mt-1">Badge "' +
        L.b +
        '" didapat. Total modul selesai: ' +
        ST.get('belajar').length +
        '</p><button id="lc" class="mt-6 ' +
        BTN +
        '">Tutup</button></div>';

      const closeBtn = document.getElementById('lc');
      if (closeBtn) {
        closeBtn.onclick = closeM;
      }
    }
  }

  draw();
}

// Global exposure
window.lesson = lesson;
window.ctitle = ctitle;
window.LS = LS;
window.LX = LX;

