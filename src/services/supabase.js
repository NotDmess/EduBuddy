// ==============================================================================
// EduBuddy PWA — Production Supabase Client & Service Layer
// ==============================================================================

import { getConfig } from '../core/config.js';

let supabaseClient = null;
let clientInitPromise = null;

/**
 * Initializes and returns the singleton Supabase client.
 * Uses official ESM distribution from CDN, preserving offline safety.
 * @returns {Promise<any|null>}
 */
export async function getSupabase() {
  const cfg = getConfig();
  if (!cfg.isConfigured) {
    return null;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  if (!clientInitPromise) {
    clientInitPromise = (async () => {
      try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        supabaseClient = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storageKey: 'eb_auth_token' // Supabase Auth internal token storage (JWT tokens only, never passwords)
          }
        });
        return supabaseClient;
      } catch (err) {
        console.warn('Gagal memuat client Supabase dari CDN:', err);
        return null;
      }
    })();
  }

  return clientInitPromise;
}

// ------------------------------------------------------------------------------
// Authentication Services
// ------------------------------------------------------------------------------

/**
 * Registers a new user via Supabase Auth.
 * Triggers automatic profile creation via PostgreSQL trigger.
 */
export async function registerUser({ email, password, fullName, school, grade }) {
  const sb = await getSupabase();
  if (!sb) return { data: null, error: { message: 'Backend belum dikonfigurasi.' } };

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        school: school || '',
        grade: grade || 'Kelas 10',
        role: 'student'
      }
    }
  });

  return { data, error };
}

/**
 * Signs in user via email and password using Supabase Auth.
 */
export async function loginUser(email, password) {
  const sb = await getSupabase();
  if (!sb) return { data: null, error: { message: 'Backend belum dikonfigurasi.' } };

  const { data, error } = await sb.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
}

/**
 * Signs out current user and clears session tokens.
 */
export async function logoutUser() {
  const sb = await getSupabase();
  if (sb) {
    await sb.auth.signOut().catch(() => {});
  }
}

/**
 * Requests password recovery email via Supabase Auth.
 */
export async function requestPasswordReset(email) {
  const sb = await getSupabase();
  if (!sb) return { data: null, error: { message: 'Backend belum dikonfigurasi.' } };

  const { data, error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/#/reset-password'
  });

  return { data, error };
}

/**
 * Updates password of the currently authenticated user.
 */
export async function updatePassword(newPassword) {
  const sb = await getSupabase();
  if (!sb) return { data: null, error: { message: 'Backend belum dikonfigurasi.' } };

  const { data, error } = await sb.auth.updateUser({
    password: newPassword
  });

  return { data, error };
}

/**
 * Returns current active session if exists.
 */
export async function getActiveSession() {
  const sb = await getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data?.session || null;
}

// ------------------------------------------------------------------------------
// Database Operations (Secured with Row Level Security)
// ------------------------------------------------------------------------------

/**
 * Fetches user profile from public.profiles table.
 */
export async function fetchProfile(userId) {
  const sb = await getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.warn('fetchProfile error:', error.message);
    return null;
  }
  return data;
}

/**
 * Updates profile fields in public.profiles table.
 */
export async function updateProfile(userId, updates) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  return await sb
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId);
}

/**
 * Fetches counselor bookings for active user.
 */
export async function fetchBookings(userId) {
  const sb = await getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('counselor_bookings')
    .select('*')
    .eq('user_id', userId)
    .order('session_date', { ascending: false });

  if (error) {
    console.warn('fetchBookings error:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Creates new counselor booking for active user.
 */
export async function createBooking({ counselorName, counselorRole, sessionDate, sessionTime, notes }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  if (!session) return { error: { message: 'Sesi kedaluwarsa. Silakan login kembali.' } };

  return await sb.from('counselor_bookings').insert({
    user_id: session.user.id,
    counselor_name: counselorName,
    counselor_role: counselorRole || 'Konselor',
    session_date: sessionDate,
    session_time: sessionTime,
    notes: notes || '',
    status: 'scheduled'
  });
}

/**
 * Submits sensitive incident report.
 * Reporter ID is linked if authenticated; otherwise null.
 */
export async function submitIncidentReport({ category, severityLevel, description }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  const reportCode = 'EB-' + Math.floor(1000 + Math.random() * 9000);

  const payload = {
    report_code: reportCode,
    category,
    severity_level: severityLevel,
    description,
    status: 'received',
    reporter_id: session ? session.user.id : null
  };

  const { data, error } = await sb.from('incident_reports').insert(payload).select().single();
  return { data, error, reportCode };
}

/**
 * Fetches incident reports submitted by active user.
 */
export async function fetchMyReports(userId) {
  const sb = await getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('incident_reports')
    .select('*')
    .eq('reporter_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('fetchMyReports error:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Submits financial aid request.
 */
export async function submitFinancialRequest({ aidType, schoolName, applicantClass, reason }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  if (!session) return { error: { message: 'Sesi kedaluwarsa. Silakan login kembali.' } };

  return await sb.from('financial_requests').insert({
    user_id: session.user.id,
    aid_type: aidType,
    school_name: schoolName,
    applicant_class: applicantClass,
    reason: reason,
    status: 'pending'
  });
}

/**
 * Fetches financial aid requests submitted by active user.
 */
export async function fetchMyFinancialRequests(userId) {
  const sb = await getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('financial_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('fetchMyFinancialRequests error:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetches latest diagnostic assessment.
 */
export async function fetchLatestAssessment(userId) {
  const sb = await getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from('diagnostic_assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

/**
 * Saves diagnostic assessment reflection.
 */
export async function saveAssessment({ dominantCategory, scores, actionPlan }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  if (!session) return { error: { message: 'Sesi kedaluwarsa. Silakan login kembali.' } };

  return await sb.from('diagnostic_assessments').insert({
    user_id: session.user.id,
    dominant_category: dominantCategory,
    scores: scores || {},
    action_plan: actionPlan || ''
  });
}

/**
 * Fetches study schedules for active user.
 */
export async function fetchSchedules(userId) {
  const sb = await getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('study_schedules')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) return [];
  return data || [];
}

/**
 * Saves or toggles a study schedule slot.
 */
export async function saveScheduleSlot({ dayOfWeek, slotTime, subject }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  if (!session) return { error: { message: 'Sesi kedaluwarsa. Silakan login kembali.' } };

  return await sb.from('study_schedules').insert({
    user_id: session.user.id,
    day_of_week: dayOfWeek,
    slot_time: slotTime,
    subject: subject,
    is_completed: false
  });
}

/**
 * Fetches learning module progress.
 */
export async function fetchLearningProgress(userId) {
  const sb = await getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) return [];
  return data || [];
}

/**
 * Upserts learning module completion and score.
 */
export async function recordModuleCompletion({ moduleKey, moduleTitle, quizScore }) {
  const sb = await getSupabase();
  if (!sb) return { error: { message: 'Backend belum dikonfigurasi.' } };

  const session = await getActiveSession();
  if (!session) return { error: { message: 'Sesi kedaluwarsa. Silakan login kembali.' } };

  return await sb.from('learning_progress').upsert({
    user_id: session.user.id,
    module_key: moduleKey,
    module_title: moduleTitle,
    is_completed: true,
    quiz_score: quizScore,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id,module_key' });
}
