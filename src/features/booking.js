// EduBuddy Counselor Booking Feature
// Handles counselor selection, date/time scheduling, duplicate checking, and booking confirmation.

import { BTN, appToast } from '../shared/modal.js';
import { ST } from '../services/storage.js';
import { createBooking } from '../services/supabase.js';
import { state } from '../core/state.js';

export const KON = [
  ['Bu Ani K.', 'Konselor - Bullying & Mental'],
  ['Pak Dimas R.', 'Konselor - Karier & Keluarga'],
  ['Kak Sari', 'Peer Buddy - Pertemanan & Asmara']
];

export const SL = ['15.30', '16.30', '19.00', '20.00'];

/**
 * Renders and manages the Counselor Booking flow in #view.
 */
export function initBooking() {
  const s = { c: 0, d: 0, t: 0 };
  const v = document.getElementById('view');

  const ds = [0, 1, 2, 3, 4].map(function (n) {
    const d = new Date();
    d.setDate(d.getDate() + n + 1);
    return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
  });

  function ch(g, items, k) {
    return (
      '<div class="flex flex-wrap gap-2">' +
      items
        .map(function (x, i) {
          const on = s[k] === i;
          return (
            '<button data-g="' +
            k +
            '" data-i="' +
            i +
            '" class="px-4 h-10 rounded-full font-label-md ' +
            (on
              ? 'bg-primary-container text-on-primary-container font-bold'
              : 'bg-surface-container-lowest border border-outline-variant') +
            '">' +
            x +
            '</button>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function draw() {
    v.innerHTML =
      '<div class="flex flex-col gap-4">' +
      '<h2 class="font-headline-md font-bold">Booking Sesi Konseling</h2>' +
      '<p class="text-body-sm text-on-surface-variant">Gratis dan rahasia. Pilih teman bicaramu.</p>' +
      '<div class="flex flex-col gap-2">' +
      KON.map(function (k, i) {
        return (
          '<button data-g="c" data-i="' +
          i +
          '" class="text-left p-4 rounded-[20px] ' +
          (s.c === i ? 'bg-tertiary-fixed ring-2 ring-tertiary' : 'bg-surface-container-lowest shadow-sm') +
          '"><b>' +
          k[0] +
          '</b><br><span class="text-body-sm text-on-surface-variant">' +
          k[1] +
          '</span></button>'
        );
      }).join('') +
      '</div>' +
      '<h3 class="font-label-lg font-bold">Tanggal</h3>' +
      ch(0, ds, 'd') +
      '<h3 class="font-label-lg font-bold">Jam</h3>' +
      ch(0, SL, 't') +
      '<button id="bk" class="' +
      BTN +
      ' mt-2">Konfirmasi Booking</button>' +
      '</div>';

    v.querySelectorAll('[data-g]').forEach(function (b) {
      b.onclick = function () {
        s[b.dataset.g] = +b.dataset.i;
        draw();
      };
    });

    const bkBtn = document.getElementById('bk');
    if (bkBtn) {
      bkBtn.onclick = function () {
        const o = { n: KON[s.c][0], d: ds[s.d], t: SL[s.t] };
        if (
          ST.get('booking').some(function (x) {
            return x.d === o.d && x.t === o.t;
          })
        ) {
          appToast('Kamu sudah punya sesi di jam itu');
          return;
        }

        ST.add('booking', o);
        if (state.ME && state.ME.id && !state.ME.guest) {
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + s.d + 1);
          createBooking({
            counselorName: o.n,
            counselorRole: KON[s.c][1],
            sessionDate: targetDate.toISOString().split('T')[0],
            sessionTime: o.t,
            notes: 'Sesi melalui EduBuddy PWA'
          }).catch(function (err) {
            console.warn('Booking sync to Supabase failed:', err);
          });
        }
        v.innerHTML =
          '<div class="text-center pt-10">' +
          '<div class="w-16 h-16 mx-auto mb-2 rounded-full bg-primary-fixed flex items-center justify-center text-primary"><span class="material-symbols-outlined text-[36px]" style="font-variation-settings: \'FILL\' 1;">check_circle</span></div>' +
          '<h2 class="font-headline-md font-bold mt-3">Booking berhasil!</h2>' +
          '<p class="mt-2 text-on-surface-variant">' +
          o.n +
          '<br>' +
          o.d +
          ' - ' +
          o.t +
          ' WIB</p>' +
          '<button data-path="riwayat" class="mt-6 px-6 ' +
          BTN +
          '">Lihat di Riwayat</button>' +
          '<button data-path="booking" class="mt-3 px-6 h-12 rounded-full border border-outline-variant font-label-lg block mx-auto">Booking sesi lain</button>' +
          '</div>';
      };
    }
  }

  draw();
}

// Global exposure
window.KON = KON;
window.SL = SL;
window.initBooking = initBooking;

