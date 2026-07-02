/* Progressive enhancement only; the page is complete without JavaScript.
   1. Theme toggle (persisted)
   2. Header hairline on scroll
   3. Scroll-spy for section nav
   4. Knight's tour animation (dormant unless an #knight-tour svg is on the page) */

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

  var staticPath = document.getElementById('tour-path');
  var knight = document.getElementById('tour-knight');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The markup carries a static trail (the tour's last nine moves, ending on the
  // knight's square) for no-JS and reduced-motion visitors. With motion allowed,
  // the trail is rebuilt as one <line> per move so each new move can be drawn in
  // with a single-segment dash (dashing a many-vertex path hits Chromium
  // rendering artifacts) and older moves can fade with age, comet-style.
  if (reduceMotion.matches) return;

  var TRAIL = 9;
  var STEP_MS = 640;
  var PAUSE_MS = 160;
  var HEAD_OPACITY = 0.85;
  var EASE = 'cubic-bezier(0.45, 0, 0.25, 1)';
  // The static markup shows the tour's first nine moves with the knight on
  // square nine; the animation picks up from that exact frame.
  var START_STEP = 9;
  var step = START_STEP;
  var timer = null;
  var lines = [];

  var trailGroup = document.createElementNS(svgNS, 'g');
  svg.insertBefore(trailGroup, knight);

  var knightBase = [parseFloat(knight.getAttribute('cx')), parseFloat(knight.getAttribute('cy'))];
  knight.style.transition = 'transform ' + STEP_MS + 'ms ' + EASE;
  staticPath.style.transition = 'opacity ' + STEP_MS + 'ms linear';

  function placeKnight(i) {
    var p = px(TOUR[i % TOUR.length]);
    knight.style.transform = 'translate(' + (p[0] - knightBase[0]) + 'px, ' + (p[1] - knightBase[1]) + 'px)';
  }

  function agedOpacity(age) {
    return Math.max(HEAD_OPACITY * (1 - age / TRAIL), 0);
  }

  function advance() {
    if (document.hidden) {                 // wait quietly while the tab is hidden
      timer = setTimeout(advance, 800);
      return;
    }
    var from = px(TOUR[step % TOUR.length]);
    step += 1;
    var to = px(TOUR[step % TOUR.length]);

    var line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', from[0]);
    line.setAttribute('y1', from[1]);
    line.setAttribute('x2', to[0]);
    line.setAttribute('y2', to[1]);
    line.setAttribute('stroke-width', '1.75');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke', 'currentColor');
    line.style.color = 'var(--accent)';
    line.style.opacity = String(HEAD_OPACITY);
    line.style.strokeDasharray = SEG + ' ' + SEG;
    line.style.strokeDashoffset = String(SEG);
    trailGroup.appendChild(line);
    // Flush so the draw-in transition starts from the hidden state.
    void line.getBoundingClientRect();
    line.style.transition = 'stroke-dashoffset ' + STEP_MS + 'ms ' + EASE +
                            ', opacity ' + STEP_MS + 'ms linear';
    line.style.strokeDashoffset = '0';

    lines.push(line);
    for (var i = 0; i < lines.length; i++) {
      lines[i].style.opacity = String(agedOpacity(lines.length - 1 - i));
    }
    while (lines.length > TRAIL) {
      var old = lines.shift();
      trailGroup.removeChild(old);
    }

    // The static markup trail ages out alongside the animated lines.
    if (staticPath.style.display !== 'none') {
      var staticAge = step - START_STEP;
      if (staticAge >= TRAIL) {
        staticPath.style.display = 'none';
      } else {
        staticPath.style.opacity = String(agedOpacity(staticAge));
      }
    }

    placeKnight(step);
    timer = setTimeout(advance, STEP_MS + PAUSE_MS);
  }

  timer = setTimeout(advance, 1200);

  reduceMotion.addEventListener('change', function (e) {
    if (!e.matches) return;
    clearTimeout(timer);
    trailGroup.remove();
    knight.style.transition = 'none';
    knight.style.transform = '';
    staticPath.style.transition = 'none';
    staticPath.style.display = '';
    staticPath.style.opacity = '';
  });
})();
