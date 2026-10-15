import { ST } from '../services/storage.js';
import { CAT } from './quiz.js';
import { esc } from '../shared/utils.js';
import { state } from '../core/state.js';
import {
  fetchBookings,
  fetchMyReports,
  fetchMyFinancialRequests,
  fetchLatestAssessment
} from '../services/supabase.js';

/**
 * Renders the unified history and achievements timeline in #view.
 */
export function initRiwayat() {
  const v = document.getElementById('view');

  function renderView(bookings, reports, ajuan, rs) {
    function sec(t, a, f) {
      return (
        '<h3 class="font-headline-sm font-bold mt-2">' +
        t +
        '</h3>' +
        (a && a.length
          ? a
              .map(function (x) {
                return '<div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-body-md">' + f(x) + '</div>';
              })
              .join('')
          : '<p class="text-body-sm text-outline">Belum ada.</p>')
      );
    }

    const riskHtml =
      '<div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm">' +
      '<b>Hasil Refleksi Diri Terakhir</b><br>' +
      (rs && rs.length
        ? 'Dominan: <b class="text-secondary">' + esc(CAT[rs[0].top || rs[0].dominant_category]?.[0] || 'Refleksi') + '</b> • ' + esc(rs[0].d || rs[0].created_at?.split('T')[0] || '')
        : 'Belum pernah asesmen') +
      '<button data-path="diagnostik" class="block text-primary font-bold text-body-sm mt-2">Buka peta kondisi &gt;</button>' +
      '</div>';

    v.innerHTML =
      '<div class="flex flex-col gap-2">' +
      '<h2 class="font-headline-md font-bold">Riwayat & Pencapaian</h2>' +
      sec('Sesi Konseling', bookings, function (x) {
        const name = x.n || x.counselor_name || 'Konselor';
        const date = x.d || x.session_date || '';
        const time = x.t || x.session_time || '';
        return '<b>' + esc(name) + '</b><br>' + esc(date) + ' - ' + esc(time) + ' WIB <span class="text-primary font-bold">• Terjadwal</span>';
      }) +
      sec('Laporan Anonim', reports, function (x) {
        const code = x.c || x.report_code || 'EB';
        const cat = x.j || x.category || 'Laporan';
        const date = x.d || x.created_at?.split('T')[0] || '';
        return '<b>#' + esc(code) + '</b> - ' + esc(cat) + '<br><span class="text-body-sm text-on-surface-variant">' + esc(date) + ' • Diterima, menunggu konselor</span>';
      }) +
      sec('Pengajuan Bantuan', ajuan, function (x) {
        const title = x.t || x.aid_type || 'Bantuan';
        const school = x.s || x.school_name || '';
        const grade = x.k || x.applicant_class || '';
        const date = x.d || x.created_at?.split('T')[0] || '';
        return '<b>' + esc(title) + '</b><br>' + esc(school) + ' (' + esc(grade) + ')<br><span class="text-body-sm text-secondary font-bold">' + esc(date) + ' • Sedang diverifikasi</span>';
      }) +
      sec('Modul Selesai', ST.get('belajar'), function (x) {
        return esc(x.t) + ' - ' + esc(x.d);
      }) +
      riskHtml +
      '</div>';
  }

  // Initial render from local cache
  renderView(ST.get('booking'), ST.get('laporan'), ST.get('ajuan'), ST.get('risk'));

  // Live asynchronous sync with Supabase for authenticated users
  if (state.ME && state.ME.id && !state.ME.guest) {
    Promise.all([
      fetchBookings(state.ME.id),
      fetchMyReports(state.ME.id),
      fetchMyFinancialRequests(state.ME.id),
      fetchLatestAssessment(state.ME.id)
    ]).then(([cloudBookings, cloudReports, cloudRequests, cloudAssessment]) => {
      const combinedBookings = cloudBookings.length ? cloudBookings : ST.get('booking');
      const combinedReports = cloudReports.length ? cloudReports : ST.get('laporan');
      const combinedRequests = cloudRequests.length ? cloudRequests : ST.get('ajuan');
      const combinedAssessments = cloudAssessment ? [cloudAssessment] : ST.get('risk');
      renderView(combinedBookings, combinedReports, combinedRequests, combinedAssessments);
    }).catch(() => {});
  }
}

// Global exposure
window.initRiwayat = initRiwayat;

