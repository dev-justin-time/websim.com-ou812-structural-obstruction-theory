/* Lightweight interactions for the single-page primer.
   Designed to be compact and touch-friendly. */

(function(){
  const toggle = document.querySelector('.toggle');
  const details = document.getElementById('details');
  const obsButtons = Array.from(document.querySelectorAll('.obs'));
  const note = document.getElementById('noteText');
  const clearBtn = document.querySelector('[data-action="clear"]');

  toggle.addEventListener('click', () => {
    const open = details.classList.toggle('open');
    details.setAttribute('aria-hidden', !open);
    toggle.textContent = open ? 'Hide' : 'Details';
  });

  const notes = {
    1: 'o1 — First obstruction class: if nonzero, prevents a lift from Stage 0 → Stage 1. Lives in H^(n+1)(X;A).',
    2: 'o2 — Secondary obstruction: appears after resolving o1. Often governed by compatibility conditions and higher cohomology.'
  };

  function showNote(id){
    note.textContent = notes[id] || 'No note available.';
    // highlight selected dot
    obsButtons.forEach(b => b.querySelector('.obs-dot').style.filter = b.dataset.stage === String(id) ? 'drop-shadow(0 4px 6px rgba(43,108,176,0.25))' : 'none');
  }

  obsButtons.forEach(b => {
    const id = b.dataset.stage;
    b.addEventListener('click', () => showNote(id));
    b.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showNote(id); }
    });
  });

  clearBtn.addEventListener('click', () => {
    note.textContent = 'Tap an obstruction to read its interpretation.';
    obsButtons.forEach(b => b.querySelector('.obs-dot').style.filter = 'none');
  });

  // Start state: collapsed details, no note
  details.classList.remove('open');
  details.setAttribute('aria-hidden', 'true');
})();