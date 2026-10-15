// EduBuddy Storage Service
// Handles user-scoped local persistence for risk assessments, bookings, aid applications,
// reports, schedule commitments, micro-learning progress, and chat history.

import { state, getUid } from '../core/state.js';

export const mem = {};

export const ST = {
  /**
   * Retrieves an array of records for a given storage key for the current user.
   * @param {string} k - Key name (e.g. 'risk', 'booking', 'belajar', 'ajuan', 'laporan', 'komit')
   * @returns {Array} Array of stored items
   */
  get: function (k) {
    const m = getUid() + k;
    if (mem[m]) return mem[m];
    try {
      const data = JSON.parse(localStorage.getItem('eb_' + m)) || [];
      mem[m] = data;
      return data;
    } catch (e) {
      return [];
    }
  },

  /**
   * Prepends a new record to the specified storage key and persists to localStorage.
   * @param {string} k - Key name
   * @param {*} v - Data object to store
   * @returns {Array} Updated array of stored items
   */
  add: function (k, v) {
    const a = ST.get(k);
    a.unshift(v);
    const m = getUid() + k;
    mem[m] = a;
    try {
      localStorage.setItem('eb_' + m, JSON.stringify(a));
    } catch (e) {}
    return a;
  }
};

/**
 * Returns the entire users registry from localStorage.
 * @returns {Object} User map indexed by email
 */
export function uget() {
  try {
    return JSON.parse(localStorage.getItem('eb_users')) || state.UM;
  } catch (e) {
    return state.UM;
  }
}

/**
 * Persists the user registry to localStorage.
 * @param {Object} o - User registry map
 */
export function uset(o) {
  state.UM = o;
  try {
    localStorage.setItem('eb_users', JSON.stringify(o));
  } catch (e) {}
}

/**
 * Stores or clears the active session token in localStorage.
 * @param {string|null} v - Session identifier ('tamu' or user email)
 */
export function sset(v) {
  state.SES = v;
  try {
    if (v) {
      localStorage.setItem('eb_ses', v);
    } else {
      localStorage.removeItem('eb_ses');
    }
  } catch (e) {}
}

/**
 * Retrieves the active session token from localStorage.
 * @returns {string|null}
 */
export function sget() {
  try {
    return localStorage.getItem('eb_ses') || state.SES;
  } catch (e) {
    return state.SES;
  }
}

/**
 * Persists current logged-in user profile changes back into eb_users.
 */
export function saveMe() {
  if (state.ME && !state.ME.guest) {
    const u = uget();
    u[state.ME.email] = state.ME;
    uset(u);
  }
}

// Ensure global accessibility for inline event handlers and automated tests
window.ST = ST;
window.uget = uget;
window.uset = uset;
window.sget = sget;
window.sset = sset;
window.saveMe = saveMe;

