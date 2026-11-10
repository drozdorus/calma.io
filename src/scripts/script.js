import { initWaves } from './waves.js';

initWaves();

// Optimized scroll handler
const headerEl = document.querySelector('.header');
const heroEl = document.querySelector('.hero');
const canvasEl = document.getElementById('waveCanvas');

// Scroll progress bar (injected so every page gets it without markup duplication)
const progressEl = document.createElement('div');
progressEl.className = 'scroll-progress';
document.body.appendChild(progressEl);

// Scroll-spy: the floating section pill (homepage only). Each link points to an
// on-page section; we highlight the one currently in view. No-ops on pages
// without the pill (navLinks is empty there).
//
// Driven by IntersectionObserver rather than polling getBoundingClientRect on
// scroll: with `scroll-behavior: smooth` (global, html{}), a large wheel/trackpad
// scroll is animated by the compositor across several frames while 'scroll'
// events on the main thread can lag or coalesce behind it — so a position
// computed from the *last fired* scroll event could still read as the previous
// section after the page has visually settled on the next one (e.g. the pill
// stuck on "Verticals" while Team is already on screen). IntersectionObserver
// reacts to actual visibility changes instead, so it can't lag like that.
const sectionNavEl = document.querySelector('.section-nav');
const navLinks = [...document.querySelectorAll('.section-nav .section-nav-link[href^="#"]')];
const navMap = new Map(navLinks.map(l => [l.getAttribute('href').slice(1), l]));
let activeNavLink = navLinks[0] || null;
const footerEl = document.querySelector('footer, .footer');

if (activeNavLink) {
  activeNavLink.classList.add('active');
  activeNavLink.setAttribute('aria-current', 'true');
}

function setActiveNavLink(link) {
  if (!link || link === activeNavLink) return;
  if (activeNavLink) {
    activeNavLink.classList.remove('active');
    activeNavLink.removeAttribute('aria-current');
  }
  link.classList.add('active');
  link.setAttribute('aria-current', 'true');
  // Keep the active item in view inside the (scrollable) pill on mobile —
  // adjust only the pill's horizontal scroll, never the page's vertical one.
  const scroller = link.closest('.section-nav-scroll');
  if (scroller && scroller.scrollWidth > scroller.clientWidth) {
    const linkLeft = link.offsetLeft;
    const linkRight = linkLeft + link.offsetWidth;
    const viewLeft = scroller.scrollLeft;
    const viewRight = viewLeft + scroller.clientWidth;
    if (linkLeft < viewLeft) scroller.scrollLeft = linkLeft - 8;
    else if (linkRight > viewRight) scroller.scrollLeft = linkRight - scroller.clientWidth + 8;
  }
  activeNavLink = link;
}

if (navLinks.length) {
  // A section counts as "current" while it occupies a band starting just
  // below the header and ending well above the viewport's bottom — this also
  // means a gap section with no nav entry (Blog) simply leaves the previous
  // link active, and the last section (FAQ) naturally stays active once the
  // page is scrolled past it (nothing re-triggers), no special-casing needed.
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNavLink(navMap.get(entry.target.id));
      }
    });
  }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });

  navMap.forEach((_link, id) => {
    const sec = document.getElementById(id);
    if (sec) spyObserver.observe(sec);
  });
}

// Hide the pill while the user scrolls down (it otherwise sits over whatever
// they're reading); reveal it on scroll-up or once scrolling settles near a
// section. Always hidden once the footer/CTA band is in view.
let lastScrollY = window.pageYOffset;
let navRevealTimer = null;
const navHideOnScroll = !matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateNavVisibility(scrolled) {
  if (!sectionNavEl) return;

  if (footerEl && footerEl.getBoundingClientRect().top < window.innerHeight) {
    sectionNavEl.classList.add('is-hidden');
    lastScrollY = scrolled;
    return;
  }

  // Reduced motion: skip the scroll-direction hide/reveal entirely — the pill
  // just stays put (still hidden near the footer above) instead of appearing
  // and disappearing as the user scrolls.
  if (!navHideOnScroll) {
    sectionNavEl.classList.remove('is-hidden');
    return;
  }

  const delta = scrolled - lastScrollY;
  if (delta > 4 && scrolled > 120) {
    sectionNavEl.classList.add('is-hidden');
  } else if (delta < -4) {
    sectionNavEl.classList.remove('is-hidden');
  }
  lastScrollY = scrolled;

  clearTimeout(navRevealTimer);
  navRevealTimer = setTimeout(() => {
    sectionNavEl.classList.remove('is-hidden');
  }, 150);
}

function updateScrollState() {
  const scrolled = window.pageYOffset;

  if (headerEl) {
    if (scrolled > 50) headerEl.classList.add('scrolled');
    else headerEl.classList.remove('scrolled');
  }

  if (canvasEl) {
    canvasEl.style.opacity = Math.max(0, 1 - scrolled / 300);
  }

  if (heroEl && scrolled < window.innerHeight) {
    heroEl.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progressEl.style.transform = `scaleX(${max > 0 ? scrolled / max : 0})`;

  updateNavVisibility(scrolled);
}

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollState();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Run once on load so a page opened mid-scroll (e.g. via #anchor) is correct;
// at the top it resolves to "no active link".
updateScrollState();

// Form handling
document.getElementById('contactForm')?.addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const button = form.querySelector('.submit-button');

  if (!data.get('name') || !data.get('email') || !data.get('message')) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (!isValidEmail(data.get('email'))) {
    showNotification('Please enter a valid email', 'error');
    return;
  }

  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showNotification('Thanks! We\'ll get back to you soon', 'success');
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    showNotification('Something went wrong. Please try again', 'error');
  } finally {
    button.textContent = 'Send Message';
    button.disabled = false;
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
  document.querySelectorAll('.notification').forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;

  const inner = document.createElement('div');
  inner.className = 'notification__inner';

  const span = document.createElement('span');
  span.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'notification__close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => notification.remove());

  inner.appendChild(span);
  inner.appendChild(closeBtn);
  notification.appendChild(inner);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('notification--leaving');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Section reveal observer
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('pre-fade');
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('pre-fade');
  sectionObserver.observe(section);
});

// "By the Numbers" count-up — the HTML already carries the final value
// (no-JS / crawler fallback); this only animates toward it once the block
// is in view. Runs once per element, skipped entirely under reduced motion.
(function initStatsCountUp() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const nodes = [...document.querySelectorAll('.stat-giant-value[data-count-to]')];
  if (!nodes.length) return;

  function animate(el) {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    const final = el.dataset.final;
    if (!Number.isFinite(target)) return;

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        el.textContent = Math.round(target * eased) + suffix;
        requestAnimationFrame(tick);
      } else {
        el.textContent = final;
      }
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nodes.forEach(el => observer.observe(el));
})();

// Mobile menu
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMenu;
// Page scripts (the hiring apply form) reuse the same toast.
window.showNotification = showNotification;

document.getElementById('mobileMenuBtn')?.addEventListener('click', toggleMenu);
document.getElementById('mobileMenuClose')?.addEventListener('click', closeMenu);
mobileMenu?.addEventListener('click', e => {
  if (e.target === mobileMenu) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});

// Horizontal scrollers — drag-to-scroll + dynamic edge fade (no fade at start/end)
function initHScroller(scroller) {
  if (!scroller) return;

  // Prevent native link-drag on any <a> children
  scroller.querySelectorAll('a').forEach(a => { a.draggable = false; });

  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let suppressClick = false;

  function onMouseMove(e) {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    scroller.scrollLeft = dragStartScroll - delta;
    if (Math.abs(delta) > 5) suppressClick = true;
  }

  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    scroller.classList.remove('dragging');
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  scroller.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartScroll = scroller.scrollLeft;
    suppressClick = false;
    scroller.classList.add('dragging');
    e.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  scroller.addEventListener('dragstart', e => e.preventDefault());

  scroller.addEventListener('click', e => {
    if (suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    }
  }, true);

  // Dynamic fade — only fade edges where there's more content to scroll into
  function updateFade() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 2;
    const atEnd = max <= 0 || scroller.scrollLeft >= max - 2;
    scroller.style.setProperty('--fade-start', atStart ? '0%' : '20%');
    scroller.style.setProperty('--fade-end', atEnd ? '0%' : '20%');
  }

  scroller.addEventListener('scroll', updateFade, { passive: true });
  window.addEventListener('resize', updateFade);
  window.addEventListener('load', updateFade);
  updateFade();
}

// Exposed for page-level scripts that init their own scrollers. (Mirrors
// window.closeMobileMenu, which the header's inline onclick handlers depend on.)
window.initHScroller = initHScroller;

initHScroller(document.querySelector('.upcoming-events-scroller'));
initHScroller(document.querySelector('.team-scroller'));

// FAQ — one accordion control for the whole site. Markup is native <details>,
// so it toggles fine without JS; this only layers a height slide on top (Web
// Animations API). Reduced-motion users get the plain native toggle. Items open
// independently everywhere — matching the no-JS behavior exactly.
(function initFaq() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 300;
  const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

  document.querySelectorAll('details.faq-item').forEach(item => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');
    if (!summary || !answer) return;

    let anim = null;

    summary.addEventListener('click', e => {
      e.preventDefault();
      if (anim) anim.cancel();

      if (item.open) {
        const start = answer.offsetHeight;
        anim = answer.animate(
          [{ height: start + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: DURATION, easing: EASING }
        );
        anim.onfinish = () => { item.open = false; anim = null; };
      } else {
        item.open = true;
        const end = answer.scrollHeight;
        anim = answer.animate(
          [{ height: '0px', opacity: 0 }, { height: end + 'px', opacity: 1 }],
          { duration: DURATION, easing: EASING }
        );
        anim.onfinish = () => { anim = null; };
      }
    });
  });
})();
