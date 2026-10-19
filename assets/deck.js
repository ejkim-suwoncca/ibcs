/* IB CS — slide engine, shared by every deck.
   - Shows one .slide at a time inside .deck.
   - Scales the 1280 × 720 canvas to fit the window (see deck.css).
   - Prev / Next buttons, arrow keys, Page Up / Down, Space, Home / End.
   - The address bar remembers the slide (#5), so a link can open slide 5.
   - Warns in the console about any slide whose content is too tall. */
(function () {
  const deck = document.querySelector('.deck');
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll(':scope > .slide'));
  if (!slides.length) return;
  const total = slides.length;
  const root = document.documentElement;
  slides.forEach(s => s.classList.remove('active'));
  slides[0].classList.add('cover');
  if (/[?&]check\b/.test(location.search)) root.classList.add('check');

  // Controls
  const bar = document.createElement('nav');
  bar.className = 'deck-controls';
  bar.setAttribute('aria-label', 'Slide controls');
  bar.innerHTML =
    '<button type="button" data-step="-1" aria-label="Previous slide">← Prev</button>' +
    '<span class="deck-counter" aria-live="polite"></span>' +
    '<button type="button" data-step="1" aria-label="Next slide">Next →</button>';
  document.body.appendChild(bar);
  const [prevBtn, nextBtn] = bar.querySelectorAll('button');
  const counter = bar.querySelector('.deck-counter');
  bar.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) step(Number(b.dataset.step));
  });

  let cur = -1;
  function goTo(n) {
    n = Math.max(0, Math.min(total - 1, n));
    if (n === cur) return;
    if (cur >= 0) slides[cur].classList.remove('active');
    cur = n;
    slides[cur].classList.add('active');
    slides[cur].scrollTop = 0;
    counter.textContent = (cur + 1) + ' / ' + total;
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === total - 1;
    history.replaceState(null, '', '#' + (cur + 1));
    deck.dispatchEvent(new CustomEvent('slidechange', { detail: { index: cur, slide: slides[cur] } }));
  }
  function step(d) { goTo(cur + d); }

  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); step(1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); step(-1); }
    else if (k === 'Home') { e.preventDefault(); goTo(0); }
    else if (k === 'End') { e.preventDefault(); goTo(total - 1); }
  });

  // Fit the canvas to the window
  function fit() {
    const cs = getComputedStyle(root);
    const w = parseFloat(cs.getPropertyValue('--canvas-w'));
    const h = parseFloat(cs.getPropertyValue('--canvas-h'));
    const top = parseFloat(cs.getPropertyValue('--bar-top'));
    const bottom = parseFloat(cs.getPropertyValue('--bar-bottom'));
    const s = Math.min(innerWidth / w, (innerHeight - top - bottom) / h);
    root.style.setProperty('--s', s.toFixed(4));
  }
  addEventListener('resize', fit);
  fit();

  // Flag slides whose content does not fit the canvas
  function checkFit() {
    if (innerWidth <= 720) return;
    slides.forEach((s, i) => {
      const wasActive = s.classList.contains('active');
      s.style.visibility = 'hidden';
      s.classList.add('active');
      const over = s.scrollHeight - s.clientHeight;
      if (!wasActive) s.classList.remove('active');
      s.style.visibility = '';
      s.classList.toggle('overflowing', over > 2);
      if (over > 2) console.warn('Slide ' + (i + 1) + ' is ' + over + 'px too tall for the canvas.');
    });
  }

  // Old inline handlers on some pages call these names
  window.goTo = goTo;
  window.changeSlide = window.go = window.move = window.navigate = step;
  window.goToSlide = n => goTo(n - 1);

  const fromHash = parseInt(location.hash.slice(1), 10);
  goTo(Number.isFinite(fromHash) ? fromHash - 1 : 0);
  addEventListener('hashchange', () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n)) goTo(n - 1);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkFit); else addEventListener('load', checkFit);
})();
