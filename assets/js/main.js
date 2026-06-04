/* ============================================================
   EchinoCoaching — Theme-Interaktion
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Seed-Ornament in alle .seed / .seed-mark einsetzen ---------- */
  var SEED = '<path d="M12 2c-1.6 3-1.6 5.6 0 8 1.6-2.4 1.6-5 0-8Z" fill="currentColor" opacity=".9"/><path d="M5 8c1 3 3 4.6 6 5-1-3-3-4.6-6-5ZM19 8c-1 3-3 4.6-6 5 1-3 3-4.6 6-5Z" fill="currentColor" opacity=".55"/><circle cx="12" cy="17" r="4.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 14.6v4.8M9.8 17h4.4" stroke="currentColor" stroke-width="1.1"/>';
  document.querySelectorAll('svg.seed, svg.seed-mark').forEach(function (s) {
    if (!s.innerHTML.trim()) s.innerHTML = SEED;
  });

  /* ---------- Mobile-Menü ---------- */
  var toggle = document.querySelector('.js-nav-toggle');
  var menu = document.querySelector('.js-mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header-Schatten beim Scrollen ---------- */
  var header = document.querySelector('.js-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Reveal beim Scrollen ---------- */
  var reveals = function () { return document.querySelectorAll('.reveal:not(.in)'); };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals().forEach(function (el) { io.observe(el); });
  }
  var revealInView = function () {
    reveals().forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) * 0.96 && r.bottom > 0) el.classList.add('in');
    });
  };
  revealInView();
  window.addEventListener('load', revealInView);
  setTimeout(function () { reveals().forEach(function (el) { el.classList.add('in'); }); }, 1400);

  /* ---------- Footer-Jahr ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Veranstaltungs-Filter (Chips) ---------- */
  var filter = document.querySelector('.js-ev-filter');
  if (filter) {
    var events = Array.prototype.slice.call(document.querySelectorAll('.js-ev-list .event'));
    var empty = document.querySelector('.js-ev-empty');
    filter.querySelectorAll('.ev-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filter.querySelectorAll('.ev-chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.getAttribute('data-filter');
        var visible = 0;
        events.forEach(function (ev) {
          var tags = ' ' + (ev.getAttribute('data-tags') || '') + ' ';
          var show = cat === 'all' || tags.indexOf(' ' + cat + ' ') !== -1;
          ev.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        if (empty) empty.style.display = visible ? 'none' : 'block';
      });
    });
  }
})();
