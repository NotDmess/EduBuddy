// EduBuddy Diagnostic View Controller
// Handles radar chart toggle, retake triggers, and re-assessment CTA button.

import { BTN } from '../shared/modal.js';
import { quiz } from './quiz.js';

/**
 * Initializes interactive controls on the Diagnostik view.
 */
export function initDiagnostik() {
  const toggleBtn = document.getElementById('toggleGraphBtn');
  if (toggleBtn) {
    toggleBtn.onclick = function () {
      const isExpanded = toggleBtn.getAttribute('data-expanded') === 'true';
      if (isExpanded) {
        toggleBtn.setAttribute('data-expanded', 'false');
        toggleBtn.classList.remove('bg-primary', 'text-on-primary');
        toggleBtn.classList.add('bg-surface-container', 'text-on-surface');
      } else {
        toggleBtn.setAttribute('data-expanded', 'true');
        toggleBtn.classList.remove('bg-surface-container', 'text-on-surface');
        toggleBtn.classList.add('bg-primary', 'text-on-primary');
      }
    };
  }

  const retakeBtn = document.getElementById('retakeModalTrigger');
  if (retakeBtn) {
    retakeBtn.onclick = function () {
      if (window.go) {
        window.go('beranda');
      }
    };
  }

  const v = document.getElementById('view');
  if (v && v.firstElementChild) {
    const bt = document.createElement('button');
    bt.className = BTN + ' my-4';
    bt.textContent = 'Mulai Asesmen Ulang';
    bt.onclick = quiz;
    v.firstElementChild.appendChild(bt);
  }
}

// Global exposure
window.initDiagnostik = initDiagnostik;

