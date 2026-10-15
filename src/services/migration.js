// ==============================================================================
// EduBuddy PWA — Legacy Data Migration & Sensitive LocalStorage Scrubber
// ==============================================================================

import {
  createBooking,
  submitIncidentReport,
  submitFinancialRequest,
  saveAssessment
} from './supabase.js';
import { appToast } from '../shared/modal.js';

/**
 * Checks if legacy user accounts or passwords exist in localStorage.
 * @returns {boolean}
 */
export function hasLegacyAccounts() {
  if (typeof localStorage === 'undefined') return false;
  return !!localStorage.getItem('eb_users');
}

/**
 * Securely deletes legacy plain password hashes and legacy session identifiers.
 */
export function scrubLegacyCredentials() {
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem('eb_users')) {
    console.info('[Security] Menghapus penyimpanan password lokal legacy (eb_users).');
    localStorage.removeItem('eb_users');
  }
  if (localStorage.getItem('eb_ses')) {
    localStorage.removeItem('eb_ses');
  }
}

/**
 * Scans localStorage for legacy records belonging to a user prefix.
 * @param {string} userEmail
 * @returns {Object}
 */
export function getLegacyUserRecords(userEmail) {
  if (typeof localStorage === 'undefined') return { bookings: [], reports: [], requests: [], assessments: [] };

  const prefixes = [userEmail, 'tamu'];
  const results = {
    bookings: [],
    reports: [],
    requests: [],
    assessments: []
  };

  for (const prefix of prefixes) {
    try {
      const b = JSON.parse(localStorage.getItem('eb_' + prefix + 'booking')) || [];
      const l = JSON.parse(localStorage.getItem('eb_' + prefix + 'laporan')) || [];
      const a = JSON.parse(localStorage.getItem('eb_' + prefix + 'ajuan')) || [];
      const r = JSON.parse(localStorage.getItem('eb_' + prefix + 'risk')) || [];

      results.bookings.push(...b);
      results.reports.push(...l);
      results.requests.push(...a);
      results.assessments.push(...r);
    } catch (e) {
      // Ignore JSON parse errors for corrupt entries
    }
  }

  return results;
}

/**
 * Prompts the user before uploading any legacy offline records to the cloud.
 * Never uploads automatically without explicit user consent.
 * @param {Object} user - Authenticated Supabase user object
 */
export async function checkAndPromptMigration(user) {
  if (!user || !user.id) return;

  const records = getLegacyUserRecords(user.email);
  const totalItems = records.bookings.length + records.reports.length + records.requests.length + records.assessments.length;

  if (totalItems === 0) {
    scrubLegacyCredentials();
    return;
  }

  const userConfirmed = window.confirm(
    'Ditemukan ' + totalItems + ' riwayat data offline pada perangkat ini (booking/laporan/pengajuan).\n\n' +
    'Apakah Anda ingin menyinkronkan data ini ke akun aman Supabase Anda sekarang?\n\n' +
    'Pilih "OK" untuk mengunggah dan mengamankan di cloud, atau "Cancel" untuk menghapus data lokal.'
  );

  if (userConfirmed) {
    appToast('Mengunggah data lokal ke backend aman...');
    let migratedCount = 0;

    // Migrate bookings
    for (const b of records.bookings) {
      try {
        await createBooking({
          counselorName: b.n || 'Konselor',
          counselorRole: 'Konselor',
          sessionDate: new Date().toISOString().split('T')[0],
          sessionTime: b.t || '16:00',
          notes: b.d || ''
        });
        migratedCount++;
      } catch (e) {}
    }

    // Migrate reports
    for (const r of records.reports) {
      try {
        await submitIncidentReport({
          category: r.j || 'Umum',
          severityLevel: 2,
          description: (r.j || '') + ' - Riwayat offline dimigrasikan'
        });
        migratedCount++;
      } catch (e) {}
    }

    // Migrate financial requests
    for (const a of records.requests) {
      try {
        await submitFinancialRequest({
          aidType: a.t || 'Bantuan Umum',
          schoolName: a.s || 'Sekolah',
          applicantClass: a.k || 'Kelas 10',
          reason: 'Dimigrasikan dari riwayat offline'
        });
        migratedCount++;
      } catch (e) {}
    }

    // Clean up migrated local keys
    scrubUserLocalData(user.email);
    scrubLegacyCredentials();

    appToast('Berhasil memigrasikan ' + migratedCount + ' data ke Supabase.');
  } else {
    // User declined migration: offer to purge sensitive local storage
    const purgeConfirmed = window.confirm(
      'Apakah Anda ingin menghapus data sensitif offline tersebut dari perangkat ini agar tidak tertinggal di browser?'
    );
    if (purgeConfirmed) {
      scrubUserLocalData(user.email);
      scrubLegacyCredentials();
      appToast('Penyimpanan lokal sensitif telah dibersihkan.');
    }
  }
}

/**
 * Removes user-specific sensitive localStorage keys.
 */
export function scrubUserLocalData(userEmail) {
  if (typeof localStorage === 'undefined') return;
  const prefixes = [userEmail, 'tamu'];
  const keys = ['booking', 'laporan', 'ajuan', 'risk', 'jadwal', 'chat'];
  for (const p of prefixes) {
    for (const k of keys) {
      localStorage.removeItem('eb_' + p + k);
    }
  }
}

