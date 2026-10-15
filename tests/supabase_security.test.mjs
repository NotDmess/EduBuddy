import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = '/Users/Dmess/projects/edubuddy-pwa-backup';

// ------------------------------------------------------------------------------
// Test Suite 1: Secret Leaks and Configuration Audit
// ------------------------------------------------------------------------------
test('Audit: No service-role key or private secrets in frontend files', () => {
  const sensitivePatterns = [
    /service_role/i,
    /sbp_[a-zA-Z0-9_-]{20,}/,
    /-----BEGIN PRIVATE KEY-----/,
    /secret[_-]?key\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/i
  ];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.git' && entry.name !== 'node_modules' && entry.name !== '.checkpoints') {
          scanDir(fullPath);
        }
      } else if (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of sensitivePatterns) {
          const match = content.match(pattern);
          assert.equal(
            match,
            null,
            `Secret pattern matched in ${fullPath}: ${match?.[0]}`
          );
        }
      }
    }
  }

  scanDir(projectRoot);
});

test('Audit: .gitignore excludes .env and secret files', () => {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');
  const content = fs.readFileSync(gitignorePath, 'utf8');
  assert.ok(content.includes('.env'), '.gitignore must ignore .env');
  assert.ok(content.includes('*.secret') || content.includes('.env.*'), '.gitignore must ignore secrets');
});

test('Audit: .env.example contains only non-secret placeholders', () => {
  const envExamplePath = path.join(projectRoot, '.env.example');
  assert.ok(fs.existsSync(envExamplePath), '.env.example must exist');
  const content = fs.readFileSync(envExamplePath, 'utf8');
  assert.ok(content.includes('VITE_SUPABASE_URL='));
  assert.ok(!/VITE_.*service_role/i.test(content));
});

// ------------------------------------------------------------------------------
// Test Suite 2: Input Validation and XSS Sanitization
// ------------------------------------------------------------------------------
test('Security: esc() sanitizes HTML entities and XSS attack vectors', async () => {
  const { esc } = await import('../src/shared/utils.js');

  const attackVectors = [
    { input: '<script>alert(1)</script>', expected: '&#60;script&#62;alert(1)&#60;/script&#62;' },
    { input: '<img src=x onerror=alert(1)>', expected: '&#60;img src=x onerror=alert(1)&#62;' },
    { input: '" onfocus="alert(1)', expected: '&#34; onfocus=&#34;alert(1)' },
    { input: "javascript:alert('XSS')", expected: 'javascript:alert(&#39;XSS&#39;)' },
    { input: 'Hello & Welcome', expected: 'Hello &#38; Welcome' }
  ];

  for (const { input, expected } of attackVectors) {
    assert.equal(esc(input), expected);
  }
});

test('Security: Email format validation blocks malformed inputs', () => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  assert.ok(emailRegex.test('siswa@sekolah.sch.id'));
  assert.ok(emailRegex.test('budi.prakoso@gmail.com'));
  assert.ok(!emailRegex.test('plainaddress'));
  assert.ok(!emailRegex.test('@missingusername.com'));
  assert.ok(!emailRegex.test('username@.com'));
  assert.ok(!emailRegex.test('user name@domain.com'));
});

// ------------------------------------------------------------------------------
// Test Suite 3: SQL Migration and RLS Policy Verification
// ------------------------------------------------------------------------------
test('RLS Audit: Migration SQL enables and forces RLS on all sensitive tables', () => {
  const schemaPath = path.join(projectRoot, 'supabase/schema.sql');
  assert.ok(fs.existsSync(schemaPath), 'Schema SQL must exist');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  const tables = [
    'public.profiles',
    'public.study_schedules',
    'public.counselor_bookings',
    'public.incident_reports',
    'public.financial_requests',
    'public.diagnostic_assessments',
    'public.learning_progress'
  ];

  for (const table of tables) {
    assert.ok(
      sql.includes(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`),
      `${table} must have ENABLE ROW LEVEL SECURITY`
    );
    assert.ok(
      sql.includes(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;`),
      `${table} must have FORCE ROW LEVEL SECURITY`
    );
  }
});

test('RLS Audit: Incident reports policy strictly limits SELECT to reporter or counselor', () => {
  const schemaPath = path.join(projectRoot, 'supabase/schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  assert.ok(sql.includes('CREATE POLICY "Reporters can read own incident reports"'));
  assert.ok(sql.includes('auth.uid() = reporter_id'));
  assert.ok(sql.includes("profiles.role = 'counselor'"));

  // Check that update is counselor-only
  assert.ok(sql.includes('CREATE POLICY "Only counselors can update incident status"'));
});

test('RLS Audit: User data isolation policies prevent cross-tenant access', () => {
  const schemaPath = path.join(projectRoot, 'supabase/schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  // Bookings isolation
  assert.ok(sql.includes('auth.uid() = user_id'));
  // Financial requests isolation
  assert.ok(sql.includes('CREATE POLICY "Users can read own financial requests"'));
  // Study schedules isolation
  assert.ok(sql.includes('CREATE POLICY "Users can read own study schedules"'));
  // Assessments isolation
  assert.ok(sql.includes('CREATE POLICY "Users can read own assessments"'));
});

// ------------------------------------------------------------------------------
// Test Suite 4: LocalStorage Scrubbing and Legacy Password Removal
// ------------------------------------------------------------------------------
test('Migration: scrubLegacyCredentials removes eb_users and eb_ses', async () => {
  // Mock localStorage in global
  const store = new Map();
  global.localStorage = {
    getItem: (k) => store.get(k) || null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k)
  };

  localStorage.setItem('eb_users', JSON.stringify({ 'test@test.com': { hash: 'legacy123' } }));
  localStorage.setItem('eb_ses', 'test@test.com');

  const { scrubLegacyCredentials } = await import('../src/services/migration.js');
  scrubLegacyCredentials();

  assert.equal(localStorage.getItem('eb_users'), null, 'eb_users must be removed');
  assert.equal(localStorage.getItem('eb_ses'), null, 'eb_ses must be removed');
});

// ------------------------------------------------------------------------------
// Test Suite 5: Service Worker Precache Inventory
// ------------------------------------------------------------------------------
test('PWA: service-worker.js precache array includes all core files and no dead references', () => {
  const swPath = path.join(projectRoot, 'service-worker.js');
  assert.ok(fs.existsSync(swPath), 'service-worker.js must exist');
  const content = fs.readFileSync(swPath, 'utf8');

  const match = content.match(/const SHELL = \[([\s\S]*?)\];/);
  assert.ok(match, 'SHELL array must be defined');

  const shellList = eval('[' + match[1] + ']');
  assert.ok(shellList.length >= 35, `SHELL must cache at least 35 core assets (found: ${shellList.length})`);

  for (const item of shellList) {
    if (item === './') continue;
    const resolved = path.join(projectRoot, item);
    assert.ok(fs.existsSync(resolved), `Asset in SHELL must exist: ${item}`);
  }
});

test('PWA Security: service-worker.js never caches external API or sensitive endpoints', () => {
  const swPath = path.join(projectRoot, 'service-worker.js');
  const content = fs.readFileSync(swPath, 'utf8');

  assert.ok(content.includes('url.origin !== self.location.origin'), 'Must bypass caching for non-origin requests');
  assert.ok(content.includes('/rest/v1/') || content.includes('/api/'), 'Must bypass caching for API paths');
  assert.ok(content.includes('edubuddy-v3'), 'Must use bumped cache version edubuddy-v3');
});

// ------------------------------------------------------------------------------
// Test Suite 6: Runtime Configuration & Environment Endpoint Verification
// ------------------------------------------------------------------------------
test('Runtime Config: api/config.js exists and never exposes service_role', () => {
  const apiPath = path.join(projectRoot, 'api/config.js');
  assert.ok(fs.existsSync(apiPath), 'api/config.js must exist for Vercel deployment');
  const content = fs.readFileSync(apiPath, 'utf8');

  assert.ok(!/service_role/i.test(content), 'api/config.js must never mention or read service_role');
  assert.ok(content.includes('VITE_SUPABASE_ANON_KEY') || content.includes('SUPABASE_ANON_KEY'), 'Must read public anon key');
  assert.ok(content.includes('VITE_SUPABASE_URL') || content.includes('SUPABASE_URL'), 'Must read Supabase URL');
});

test('Runtime Config: isValidConfig correctly validates configuration inputs', async () => {
  const { isValidConfig } = await import('../src/core/config.js');

  // Must reject empty or placeholder values
  assert.equal(isValidConfig('', ''), false);
  assert.equal(isValidConfig('https://your-project-id.supabase.co', 'valid-key'), false);
  assert.equal(isValidConfig('https://example.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'), false);
  assert.equal(isValidConfig('not-a-valid-url', 'some-anon-key'), false);

  // Must accept valid configuration
  assert.equal(isValidConfig('https://ljsvsmvjkewobxseztxk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.sig'), true);
});


