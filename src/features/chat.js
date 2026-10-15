// EduBuddy Teman Cerita Chat Feature
// Safe, supportive chat space with automated empathetic responses, quick replies,
// and localStorage persistence per user.

import { getUid } from '../core/state.js';
import { FN } from '../services/auth.js';

export const CHM = {};

/**
 * Loads persisted chat messages for the current user.
 * @returns {Array<{m: string, c: string}>}
 */
export function chLoad() {
  const uid = getUid();
  try {
    return JSON.parse(localStorage.getItem('eb_' + uid + 'chat')) || CHM[uid] || [];
  } catch (e) {
    return CHM[uid] || [];
  }
}

/**
 * Persists chat messages array for current user.
 * @param {Array<{m: string, c: string}>} a
 */
export function chSave(a) {
  const uid = getUid();
  CHM[uid] = a;
  try {
    localStorage.setItem('eb_' + uid + 'chat', JSON.stringify(a));
  } catch (e) {}
}

/**
 * Initializes chat box, restores previous messages, attaches response bot,
 * and sets up persistence observer.
 */
export function initChat() {
  const box = document.getElementById('chatBox');
  const inp = document.getElementById('chatIn');
  if (!box || !inp) return;

  const R = [
    'Terima kasih sudah cerita, ' + FN() + '. Kamu tidak sendirian. Mau ceritakan lebih detail?',
    'Perasaanmu valid. Kita pelan-pelan aja ya. Kapan terakhir kali itu terjadi?',
    'Aku catat ya. Kalau mau, kamu bisa lapor anonim lewat tab Aman, atau jadwalkan sesi dengan konselor.'
  ];
  let i = 0;

  // Restore saved messages if present
  const ms = chLoad();
  if (ms.length) {
    box.innerHTML = '';
    ms.forEach(function (x) {
      const d = document.createElement('div');
      d.className = x.c;
      d.textContent = x.m;
      box.appendChild(d);
    });
  }

  // Observe chatbox mutations to auto-save history
  const observer = new MutationObserver(function () {
    chSave(
      [].map.call(box.children, function (c) {
        return { m: c.textContent, c: c.className };
      })
    );
  });
  observer.observe(box, { childList: true });

  function add(t, me) {
    const d = document.createElement('div');
    d.className =
      (me
        ? 'self-end bg-primary-container text-on-primary-container rounded-tr-sm'
        : 'self-start bg-surface-container-lowest rounded-tl-sm shadow-sm') +
      ' max-w-[80%] rounded-2xl p-3 text-[15px]';
    d.textContent = t;
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
  }

  function send(t) {
    if (!t.trim()) return;
    add(t, 1);
    inp.value = '';
    setTimeout(function () {
      add(R[i++ % R.length]);
    }, 900);
  }

  const sendBtn = document.getElementById('chatSend');
  if (sendBtn) {
    sendBtn.onclick = function () {
      send(inp.value);
    };
  }

  inp.onkeydown = function (e) {
    if (e.key === 'Enter') {
      send(inp.value);
    }
  };

  document.querySelectorAll('.qr').forEach(function (b) {
    b.onclick = function () {
      send(b.textContent);
    };
  });
}

// Global exposure
window.initChat = initChat;
window.chLoad = chLoad;
window.chSave = chSave;

