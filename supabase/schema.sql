-- ==============================================================================
-- EduBuddy PWA — Production-Grade Supabase Database Migration
-- Version: schema.sql (Production Database Schema)
-- Description: Sets up production tables, RLS policies, indexes, and triggers
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. User Profiles Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT 'Teman Belajar',
  school text DEFAULT '',
  grade text DEFAULT 'Kelas 10',
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'counselor', 'admin')),
  avatar_color text DEFAULT '#10B981',
  study_target_minutes integer DEFAULT 60 CHECK (study_target_minutes > 0 AND study_target_minutes <= 720),
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. Study Schedules Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week text NOT NULL CHECK (day_of_week IN ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')),
  slot_time text NOT NULL,
  subject text NOT NULL,
  is_completed boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_schedules FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_study_schedules_user_id ON public.study_schedules(user_id);

-- ------------------------------------------------------------------------------
-- 4. Counselor Bookings Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.counselor_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  counselor_name text NOT NULL,
  counselor_role text DEFAULT 'Konselor',
  session_date date NOT NULL,
  session_time text NOT NULL,
  topic text DEFAULT 'Umum',
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.counselor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselor_bookings FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_counselor_bookings_user_id ON public.counselor_bookings(user_id);

-- ------------------------------------------------------------------------------
-- 5. Sensitive Incident Reports Table (Strict Privacy)
-- ------------------------------------------------------------------------------
-- Reports are highly sensitive (bullying, harassment, emotional distress).
-- Access is restricted to the reporter and designated counselors ONLY.
CREATE TABLE IF NOT EXISTS public.incident_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  report_code text NOT NULL UNIQUE,
  category text NOT NULL,
  severity_level integer NOT NULL CHECK (severity_level BETWEEN 1 AND 4),
  description text NOT NULL,
  status text NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'in_review', 'resolved')),
  assigned_counselor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  counselor_notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_incident_reports_reporter_id ON public.incident_reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_incident_reports_assigned_counselor ON public.incident_reports(assigned_counselor_id);

-- ------------------------------------------------------------------------------
-- 6. Financial Assistance Requests Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.financial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  aid_type text NOT NULL,
  school_name text NOT NULL,
  applicant_class text NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.financial_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_requests FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_financial_requests_user_id ON public.financial_requests(user_id);

-- ------------------------------------------------------------------------------
-- 7. Diagnostic Assessments Table (Mental & Academic Reflection)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnostic_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dominant_category text NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  action_plan text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.diagnostic_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_assessments FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_diagnostic_assessments_user_id ON public.diagnostic_assessments(user_id);

-- ------------------------------------------------------------------------------
-- 8. Learning Module Progress Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_key text NOT NULL,
  module_title text NOT NULL,
  is_completed boolean DEFAULT false NOT NULL,
  quiz_score integer DEFAULT 0 CHECK (quiz_score >= 0 AND quiz_score <= 100),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT uq_user_module UNIQUE (user_id, module_key)
);

ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON public.learning_progress(user_id);

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- --- Profiles Policies ---
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- --- Study Schedules Policies ---
DROP POLICY IF EXISTS "Users can read own study schedules" ON public.study_schedules;
CREATE POLICY "Users can read own study schedules"
  ON public.study_schedules FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own study schedules" ON public.study_schedules;
CREATE POLICY "Users can insert own study schedules"
  ON public.study_schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own study schedules" ON public.study_schedules;
CREATE POLICY "Users can update own study schedules"
  ON public.study_schedules FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own study schedules" ON public.study_schedules;
CREATE POLICY "Users can delete own study schedules"
  ON public.study_schedules FOR DELETE
  USING (auth.uid() = user_id);

-- --- Counselor Bookings Policies ---
DROP POLICY IF EXISTS "Students can view own bookings" ON public.counselor_bookings;
CREATE POLICY "Students can view own bookings"
  ON public.counselor_bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  );

DROP POLICY IF EXISTS "Students can create bookings" ON public.counselor_bookings;
CREATE POLICY "Students can create bookings"
  ON public.counselor_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON public.counselor_bookings;
CREATE POLICY "Users can update own bookings"
  ON public.counselor_bookings FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  );

-- --- Sensitive Incident Reports Policies ---
-- Strictly limited: Only the reporter or authorized counselor can read.
DROP POLICY IF EXISTS "Reporters can read own incident reports" ON public.incident_reports;
CREATE POLICY "Reporters can read own incident reports"
  ON public.incident_reports FOR SELECT
  USING (
    (reporter_id IS NOT NULL AND auth.uid() = reporter_id) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can submit reports" ON public.incident_reports;
CREATE POLICY "Authenticated users can submit reports"
  ON public.incident_reports FOR INSERT
  WITH CHECK (
    reporter_id IS NULL OR auth.uid() = reporter_id
  );

DROP POLICY IF EXISTS "Only counselors can update incident status" ON public.incident_reports;
CREATE POLICY "Only counselors can update incident status"
  ON public.incident_reports FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'counselor'
    )
  );

-- --- Financial Assistance Requests Policies ---
DROP POLICY IF EXISTS "Users can read own financial requests" ON public.financial_requests;
CREATE POLICY "Users can read own financial requests"
  ON public.financial_requests FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own financial requests" ON public.financial_requests;
CREATE POLICY "Users can insert own financial requests"
  ON public.financial_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- --- Diagnostic Assessments Policies ---
DROP POLICY IF EXISTS "Users can read own assessments" ON public.diagnostic_assessments;
CREATE POLICY "Users can read own assessments"
  ON public.diagnostic_assessments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assessments" ON public.diagnostic_assessments;
CREATE POLICY "Users can insert own assessments"
  ON public.diagnostic_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- --- Learning Progress Policies ---
DROP POLICY IF EXISTS "Users can read own learning progress" ON public.learning_progress;
CREATE POLICY "Users can read own learning progress"
  ON public.learning_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own learning progress" ON public.learning_progress;
CREATE POLICY "Users can insert own learning progress"
  ON public.learning_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own learning progress" ON public.learning_progress;
CREATE POLICY "Users can update own learning progress"
  ON public.learning_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- 10. AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, school, grade, role, avatar_color)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Teman Belajar'),
    COALESCE(NEW.raw_user_meta_data->>'school', ''),
    COALESCE(NEW.raw_user_meta_data->>'grade', 'Kelas 10'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_color', '#10B981')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

