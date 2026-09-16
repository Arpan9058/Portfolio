/* =========================================================
   Arpan Gupta — portfolio
   Vanilla JS. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- current year ---------- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- sticky nav + scroll progress ---------- */

  var nav = document.getElementById('nav');
  var bar = document.querySelector('.progress i');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (nav) nav.classList.toggle('stuck', y > 24);

    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- pointer spotlight ---------- */

  var spot = document.querySelector('.spot');
  if (spot && fine && !reduced) {
    var sx = 50, sy = 22, tx = 50, ty = 22, raf = null;

    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = window.requestAnimationFrame(easeSpot);
    }, { passive: true });

    function easeSpot() {
      sx += (tx - sx) * 0.08;
      sy += (ty - sy) * 0.08;
      spot.style.setProperty('--mx', sx.toFixed(2) + '%');
      spot.style.setProperty('--my', sy.toFixed(2) + '%');
      raf = (Math.abs(tx - sx) > 0.1 || Math.abs(ty - sy) > 0.1)
        ? window.requestAnimationFrame(easeSpot)
        : null;
    }
  } else if (spot) {
    spot.style.opacity = '0';
  }

  /* ---------- reveal on scroll ---------- */

  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        window.setTimeout(function () { el.classList.add('in'); }, delay);
        revealer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- animated counters ---------- */

  var counters = Array.prototype.slice.call(document.querySelectorAll('.count'));

  function runCount(el) {
    var target = parseInt(el.getAttribute('data-to') || '0', 10);
    if (reduced || target === 0) { el.textContent = String(target); return; }

    var start = performance.now();
    var dur = 1400;

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(runCount);
  }

  /* ---------- hero role rotator ---------- */

  var rotator = document.getElementById('rotator');
  if (rotator) {
    var roles = [
      'Node.js APIs',
      'Spring Boot systems',
      'AI integrations',
      'marketing sites',
      'internal dashboards'
    ];
    var span = rotator.querySelector('span');

    if (reduced) {
      span.textContent = roles[0];
    } else {
      var idx = 0, chars = roles[0].length, typing = false;

      window.setInterval(function () {
        if (typing) return;
        typing = true;
        var current = roles[idx];
        var next = roles[(idx + 1) % roles.length];

        erase();

        function erase() {
          if (chars > 0) {
            chars -= 1;
            span.textContent = current.slice(0, chars);
            window.setTimeout(erase, 34);
          } else {
            idx = (idx + 1) % roles.length;
            type();
          }
        }

        function type() {
          if (chars < next.length) {
            chars += 1;
            span.textContent = next.slice(0, chars);
            window.setTimeout(type, 58);
          } else {
            typing = false;
          }
        }
      }, 3200);
    }
  }

  /* ---------- magnetic buttons ---------- */

  if (fine && !reduced) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-magnetic]'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (mx * 0.22).toFixed(1) + 'px,' + (my * 0.3).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- card tilt + cursor-tracked glow ---------- */

  if (fine && !reduced) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-tilt]'), function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;

        card.style.setProperty('--cx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--cy', (py * 100).toFixed(1) + '%');
        card.style.transform =
          'perspective(1000px) rotateX(' + ((0.5 - py) * 4).toFixed(2) + 'deg) ' +
          'rotateY(' + ((px - 0.5) * 5).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- mobile menu ---------- */

  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');

  function closeMenu() {
    if (!mobileNav || mobileNav.hidden) return;
    mobileNav.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) closeMenu();
    });
  }

  /* ---------- active section in nav ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- toast ---------- */

  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  /* ---------- click-to-copy contact rows ---------- */

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (row) {
    var btn = row.querySelector('.ccopy');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var value = row.getAttribute('data-copy');

      function done() {
        btn.textContent = 'Copied';
        showToast(value + ' copied to your clipboard');
        window.setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var tmp = document.createElement('textarea');
        tmp.value = value;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); done(); }
        catch (err) { showToast('Copy failed — the address is ' + value); }
        document.body.removeChild(tmp);
      }
    });
  });

  /* ---------- contact form -> mail client ---------- */

  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#cf-name');
      var email = form.querySelector('#cf-email');
      var kind = form.querySelector('#cf-kind');
      var msg = form.querySelector('#cf-msg');
      var ok = true;

      [name, email, msg].forEach(function (input) {
        var valid = input.value.trim() !== '' && input.checkValidity();
        input.parentElement.classList.toggle('invalid', !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });

      if (!ok) {
        showToast('Please fill in your name, a valid email and a message.');
        return;
      }

      var subject = 'Project enquiry — ' + kind.value;
      var body =
        'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Needs: ' + kind.value + '\n\n' +
        msg.value.trim() + '\n';

      window.location.href =
        'mailto:arpangupta0909@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      showToast('Opening your mail app…');
    });

    form.addEventListener('input', function (e) {
      if (e.target.parentElement) e.target.parentElement.classList.remove('invalid');
    });
  }

  /* ---------- smooth anchors for browsers without scroll-behavior ---------- */

  if (!('scrollBehavior' in document.documentElement.style)) {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 90);
      });
    });
  }
})();
