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

/**
 * Asynchronously attempts to load configuration from runtime endpoint (/api/config)
 * if not already configured via window or localStorage.
 * Automatically caches valid config to localStorage so subsequent offline PWA loads work.
 * @returns {Promise<{supabaseUrl: string, supabaseAnonKey: string, isConfigured: boolean}>}
 */
export async function loadConfig() {
  const current = getConfig();
  if (current.isConfigured) return current;

  if (typeof fetch !== 'undefined') {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 3000) : null;
      const res = await fetch('/api/config', {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: controller ? controller.signal : undefined
      });
      if (timeoutId) clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        if (data && isValidConfig(data.supabaseUrl, data.supabaseAnonKey)) {
          window.EDUBUDDY_CONFIG = Object.assign(window.EDUBUDDY_CONFIG || {}, {
            SUPABASE_URL: data.supabaseUrl,
            SUPABASE_ANON_KEY: data.supabaseAnonKey
          });
          saveConfig(data.supabaseUrl, data.supabaseAnonKey);
          return getConfig();
        }
      }
    } catch (err) {
      // Offline, 404 on local static server, or network error - fallback gracefully
    }
  }

  return current;
}


