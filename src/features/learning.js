// EduBuddy Career Bridge / Belajar Feature
// Filterable practical learning modules, why-it-matters explainer toggles, and modal dialogues.

/**
 * Toggles the "Kenapa Materi Ini Penting" explainer card.
 */
export function toggleExplainer() {
  const content = document.getElementById('explainerContent');
  const icon = document.getElementById('explainerIcon');
  const btn = document.getElementById('explainerToggle');
  if (!btn || !content || !icon) return;

  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    content.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    content.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
    btn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Filters module cards by category chips.
 * @param {string} category
 * @param {HTMLElement} buttonEl
 */
export function filterModules(category, buttonEl) {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(function (c) {
    c.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
    c.classList.add('bg-surface-container', 'text-on-surface-variant');
  });

  if (buttonEl) {
    buttonEl.classList.remove('bg-surface-container', 'text-on-surface-variant');
    buttonEl.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
  }

  const cards = document.querySelectorAll('.module-card');
  cards.forEach(function (card) {
    if (category === 'all') {
      card.style.display = 'flex';
    } else {
      const cardCat = card.getAttribute('data-category');
      if (cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

/**
 * Opens detailed reason / bridge modal for a subject.
 * @param {string} subject
 * @param {string} explanation
 */
export function openReasonModal(subject, explanation) {
  const modal = document.getElementById('reasonModal');
  const title = document.getElementById('modalSubject');
  const body = document.getElementById('modalBody');
  if (modal && title && body) {
    title.innerText = subject;
    body.innerText = explanation;
    modal.classList.remove('hidden');
  }
}

/**
 * Closes the subject reason modal.
 */
export function closeReasonModal() {
  const modal = document.getElementById('reasonModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

/**
 * Initializes Belajar view interactive elements.
 */
export function initBelajar() {
  // Safe initializations if needed
}

// Global exposure
window.toggleExplainer = toggleExplainer;
window.filterModules = filterModules;
window.openReasonModal = openReasonModal;
window.closeReasonModal = closeReasonModal;
window.initBelajar = initBelajar;

