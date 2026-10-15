// ==============================================================================
// EduBuddy PWA — Application Configuration & Environment Loader
// ==============================================================================

const CFG_URL_KEY = 'eb_cfg_supabase_url';
const CFG_KEY_KEY = 'eb_cfg_supabase_anon_key';

/**
 * Returns current Supabase configuration.
 * Priority:
 * 1. window.EDUBUDDY_CONFIG (injected via deployment or env.js)
 * 2. Stored browser configuration (for local testing/setup)
 * 3. Default empty
 */
export function getConfig() {
  const windowCfg =
    (typeof window !== 'undefined' && (window.EDUBUDDY_CONFIG || window.__ENV || window)) || {};
  const storedUrl = typeof localStorage !== 'undefined' ? localStorage.getItem(CFG_URL_KEY) : '';
  const storedKey = typeof localStorage !== 'undefined' ? localStorage.getItem(CFG_KEY_KEY) : '';

  const supabaseUrl = (
    windowCfg.SUPABASE_URL ||
    windowCfg.VITE_SUPABASE_URL ||
    storedUrl ||
    ''
  ).trim();
  const supabaseAnonKey = (
    windowCfg.SUPABASE_ANON_KEY ||
    windowCfg.VITE_SUPABASE_ANON_KEY ||
    storedKey ||
    ''
  ).trim();

  return {
    supabaseUrl,
    supabaseAnonKey,
    isConfigured: isValidConfig(supabaseUrl, supabaseAnonKey)
  };
}

/**
 * Validates that URL and Key are present and not default placeholders.
 * @param {string} url
 * @param {string} key
 * @returns {boolean}
 */
export function isValidConfig(url, key) {
  if (!url || !key) return false;
  if (url.includes('your-project-id') || key.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch (e) {
    return false;
  }
}

/**
 * Saves custom Supabase configuration to browser storage.
 * @param {string} url
 * @param {string} key
 */
export function saveConfig(url, key) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CFG_URL_KEY, (url || '').trim());
    localStorage.setItem(CFG_KEY_KEY, (key || '').trim());
  }
}

/**
 * Clears custom Supabase configuration from browser storage.
 */
export function clearConfig() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(CFG_URL_KEY);
    localStorage.removeItem(CFG_KEY_KEY);
  }
}

