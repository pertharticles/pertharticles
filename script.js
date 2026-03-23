/* ============================================================
   DANAO GROUP — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV: Scroll state ── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── NAV: Mobile burger ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function closeMobile() {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobile();
    } else {
      burger.classList.add('active');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobile();
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el, i) {
    // Stagger siblings within the same parent container
    const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(el);
    if (idx > 0) {
      el.style.transitionDelay = (idx * 0.1) + 's';
    }
    revealObserver.observe(el);
  });

  /* ── ACTIVE NAV LINK (on scroll) ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showFormMessage('Please complete all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate submission
      const btn = form.querySelector('.btn');
      btn.textContent = 'Sending…';
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.7';

      setTimeout(function () {
        showFormMessage('Thank you. Your enquiry has been received. We will be in touch within 24 hours.', 'success');
        form.reset();
        btn.textContent = 'Send Enquiry';
        btn.style.pointerEvents = '';
        btn.style.opacity = '';
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(text, type) {
    // Remove existing message
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.textContent = text;
    msg.style.cssText = [
      'font-size: 0.78rem',
      'padding: 1rem 1.2rem',
      'border: 1px solid ' + (type === 'success' ? 'rgba(201,168,76,0.4)' : 'rgba(200,60,60,0.4)'),
      'color: ' + (type === 'success' ? '#C9A84C' : '#CC5555'),
      'background: ' + (type === 'success' ? 'rgba(201,168,76,0.05)' : 'rgba(200,60,60,0.05)'),
      'letter-spacing: 0.04em',
      'line-height: 1.6',
    ].join(';');

    form.insertBefore(msg, form.querySelector('.btn'));
  }

  /* ── YEAR ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

})();
