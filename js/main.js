/* Progressive enhancement only — the page is complete without JavaScript.
   1. Theme toggle (persisted)
   2. Header hairline on scroll
   3. Scroll-spy for section nav
   4. Knight's tour animation in the hero */

(function () {
  'use strict';

  /* ---- 1. Theme ---- */

  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ---- 2. Header ---- */

  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 3. Scroll-spy ---- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- 4. Knight's tour ---- */

  var svg = document.getElementById('knight-tour');
  if (!svg) return;

  // Same closed tour as the path's d attribute (column,row on an 8x8 board).
  var TOUR = [
    [3,3],[1,4],[0,6],[2,7],[1,5],[0,7],[2,6],[4,7],[6,6],[7,4],[6,2],[7,0],
    [5,1],[3,0],[1,1],[0,3],[2,2],[0,1],[2,0],[4,1],[6,0],[7,2],[5,3],[6,1],
    [4,0],[3,2],[1,3],[0,5],[1,7],[3,6],[5,7],[7,6],[6,4],[4,5],[3,7],[2,5],
    [0,4],[1,6],[2,4],[1,2],[0,0],[2,1],[0,2],[1,0],[3,1],[5,0],[7,1],[5,2],
    [7,3],[6,5],[7,7],[5,6],[4,4],[2,3],[3,5],[4,3],[5,5],[3,4],[4,2],[6,3],
    [7,5],[6,7],[4,6],[5,4]
  ];
  var ORIGIN = 20;
  var SPACING = 40;
  var SEG = Math.sqrt(5) * SPACING;      // every knight move has the same length
  var TOTAL = SEG * TOUR.length;         // 64 segments including the closing one

  function px(cell) {
    return [ORIGIN + cell[0] * SPACING, ORIGIN + cell[1] * SPACING];
  }

  // Draw the 8x8 dot grid.
  var grid = document.getElementById('tour-grid');
  var svgNS = 'http://www.w3.org/2000/svg';
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', ORIGIN + col * SPACING);
      dot.setAttribute('cy', ORIGIN + row * SPACING);
      dot.setAttribute('r', 2);
      grid.appendChild(dot);
    }
  }

  var path = document.getElementById('tour-path');
  var knight = document.getElementById('tour-knight');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The markup carries a static window (the tour's last nine moves, ending on the
  // knight's square). Animation slides that window along the closed loop forever;
  // without JavaScript, or with reduced motion, the static frame simply stays.
  if (reduceMotion.matches) return;

  var WINDOW = SEG * 9;
  var STEP_MS = 640;
  var PAUSE_MS = 160;
  var step = 0;
  var timer = null;

  path.style.transition = 'stroke-dashoffset ' + STEP_MS + 'ms cubic-bezier(0.45, 0, 0.25, 1)';
  knight.style.transition = 'transform ' + STEP_MS + 'ms cubic-bezier(0.45, 0, 0.25, 1)';

  function placeKnight(i) {
    var start = px(TOUR[0]);
    var p = px(TOUR[i % TOUR.length]);
    knight.style.transform = 'translate(' + (p[0] - start[0]) + 'px, ' + (p[1] - start[1]) + 'px)';
  }

  function advance() {
    if (document.hidden) {                 // wait quietly while the tab is hidden
      timer = setTimeout(advance, 800);
      return;
    }
    step += 1;
    // Offsets grow negative without bound; the dash period equals the loop
    // length, so the window wraps around the closed tour seamlessly.
    path.style.strokeDashoffset = String(WINDOW - step * SEG);
    placeKnight(step);
    timer = setTimeout(advance, STEP_MS + PAUSE_MS);
  }

  timer = setTimeout(advance, 1200);

  reduceMotion.addEventListener('change', function (e) {
    if (!e.matches) return;
    clearTimeout(timer);
    path.style.transition = 'none';
    knight.style.transition = 'none';
    path.style.strokeDashoffset = '804.98';
    knight.style.transform = '';
  });
})();
