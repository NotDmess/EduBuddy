// EduBuddy Diagnostic Quiz Feature
// 6-question assessment to identify student risks (economic, time, relevance, mental, family, social)
// and generate personalized recommendations.

import { modal, closeM, BTN, CD } from '../shared/modal.js';
import { ST } from '../services/storage.js';
import { today } from '../shared/utils.js';

export const QS = [
  ['ekonomi', 'Seberapa sering biaya sekolah atau uang saku jadi beban pikiranmu?'],
  ['relevansi', 'Seberapa sering kamu merasa pelajaran di sekolah sia-sia?'],
  ['sosial', 'Seberapa sering kamu dibully atau dikucilkan?'],
  ['keluarga', 'Seberapa sering orang tua kurang mendukung pendidikanmu?'],
  ['mental', 'Seberapa sering cemas atau sedih sampai susah fokus belajar?'],
  ['waktu', 'Seberapa sering waktu kerja atau keluarga bentrok dengan belajar?']
];

export const OP = ['Tidak pernah', 'Kadang', 'Sering', 'Hampir selalu'];

export const CAT = {
  ekonomi: ['Ekonomi', 'ekonomi', 'Ajukan bantuan PIP atau beasiswa sekarang.'],
  relevansi: ['Relevansi Materi', 'belajar', 'Coba Career Bridge untuk menghubungkan pelajaran dengan dunia nyata.'],
  sosial: ['Sosial & Bullying', 'aman', 'Buka Ruang Aman: lapor anonim atau ngobrol dengan peer buddy.'],
  keluarga: ['Dukungan Keluarga', 'mediasi', 'Pakai panduan negosiasi impian dengan orang tua.'],
  mental: ['Mental & Asmara', 'booking', 'Booking sesi dengan konselor.'],
  waktu: ['Manajemen Waktu', 'jadwal', 'Atur jadwal belajar 5-15 menit yang fleksibel.']
};

/**
 * Initiates the 6-step diagnostic quiz in a modal dialog.
 */
export function quiz() {
  let i = 0;
  const sc = {};
  const bx = modal('');

  function draw() {
    if (i < 6) {
      bx.innerHTML =
        '<div class="h-2 rounded-full bg-surface-container"><div class="h-2 rounded-full bg-primary-container" style="width:' +
        (i / 6) * 100 +
        '%;transition:width .4s"></div></div><p class="text-label-sm text-primary font-bold mt-3">Pertanyaan ' +
        (i + 1) +
        '/6</p><h3 class="font-headline-sm font-bold mt-1">' +
        QS[i][1] +
        '</h3><div class="flex flex-col gap-2 mt-4">' +
        OP.map(function (o, n) {
          return '<button data-o="' + n + '" class="h-12 rounded-2xl border border-outline-variant font-label-lg">' + o + '</button>';
        }).join('') +
        '</div>';

      bx.querySelectorAll('[data-o]').forEach(function (b) {
        b.onclick = function () {
          sc[QS[i][0]] = +b.dataset.o;
          i++;
          draw();
        };
      });
    } else {
      const ks = Object.keys(sc).sort(function (a, b) {
        return sc[b] - sc[a];
      });
      const t = ks[0];
      ST.add('risk', { top: t, sc: JSON.stringify(sc), d: today() });

      bx.innerHTML =
        '<h3 class="font-headline-md font-bold">Hasil Diagnostikmu</h3>' +
        '<p class="text-body-sm text-on-surface-variant">Area yang paling butuh perhatian: <b class="text-secondary">' +
        CAT[t][0] +
        '</b></p>' +
        '<div class="flex flex-col gap-2 my-4">' +
        ks
          .map(function (k) {
            return (
              '<div><div class="flex justify-between text-body-sm"><span>' +
              CAT[k][0] +
              '</span><b>' +
              Math.round((sc[k] / 3) * 100) +
              '%</b></div><div class="h-2.5 rounded-full bg-surface-container"><div class="h-2.5 rounded-full ' +
              (k === t ? 'bg-secondary-container' : 'bg-primary-container') +
              '" style="width:' +
              Math.max(4, (sc[k] / 3) * 100) +
              '%"></div></div></div>'
            );
          })
          .join('') +
        '</div>' +
        '<div class="' +
        CD +
        ' bg-primary-fixed/40"><b>Rekomendasi untukmu</b><p class="mt-1 text-body-md">' +
        CAT[t][2] +
        '</p></div>' +
        '<button data-path="' +
        CAT[t][1] +
        '" class="mt-4 ' +
        BTN +
        '">Mulai Sekarang</button>' +
        '<button class="mt-2 w-full h-12 rounded-full border border-outline-variant font-label-lg" onclick="closeM();render()">Nanti Saja</button>';
    }
  }

  draw();
}

// Global exposure
window.QS = QS;
window.OP = OP;
window.CAT = CAT;
window.quiz = quiz;

