// EduBuddy Reusable Utilities

/**
 * Escapes HTML characters in a string to prevent XSS.
 * @param {string|null|undefined} s
 * @returns {string}
 */
export function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}

/**
 * Recursively escapes all string values within an object.
 * @param {Object} o
 * @returns {Object}
 */
export function cl(o) {
  for (const k in o) {
    if (typeof o[k] === 'string') {
      o[k] = o[k].replace(/[&<>"']/g, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
      });
    }
  }
  return o;
}

/**
 * Returns today's date formatted in Indonesian locale (e.g. "14 Okt").
 * @returns {string}
 */
export function today() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

/**
 * Returns a warm time-based greeting.
 * @returns {string}
 */
export function greet() {
  const x = new Date().getHours();
  return x < 11
    ? 'Selamat pagi'
    : x < 15
    ? 'Selamat siang'
    : x < 18
    ? 'Selamat sore'
    : 'Selamat malam';
}

// Global exposure
if (typeof window !== 'undefined') {
  window.esc = esc;
  window.cl = cl;
  window.today = today;
  window.greet = greet;
}

