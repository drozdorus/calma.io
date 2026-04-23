// Wave Animation
(function() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Dynamic wave system with multiple layers
  const waves = [];

  // Create 8 waves: center=far (bright, blurry), top/bottom=near (darker, sharp)
  for (let i = 0; i < 8; i++) {
    const relY = 0.1 + i * 0.11; // 0.1..0.87
    const distFromCenter = Math.abs(relY - 0.5) / 0.4; // 0=center, 1=edge
    const depth = distFromCenter; // 1=near (top/bottom), 0=far (center)
    const ampScale = canvas.width > 768 ? 1.6 : 1;
    const amp = (20 + Math.random() * 30) * ampScale;
    waves.push({
      amplitude: amp,
      targetAmplitude: amp,
      baseAmp: amp,
      wavelength: 400 + Math.random() * 500,
      speed: 0.001 + depth * 0.001,
      phase: Math.random() * Math.PI * 2,
      yOffset: canvas.height * relY,
      opacity: 0.65 - depth * 0.45,
      lineWidth: 0.5 + (1 - depth) * 1.5,
      blur: (1 - depth) * 4,
      colorShift: Math.random() * 60,
    });
  }

  function drawWave(wave) {
    ctx.save();
    if (wave.blur > 0.1) ctx.filter = `blur(${wave.blur.toFixed(1)}px)`;

    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
      const primaryWave = Math.sin(x * (2 * Math.PI / wave.wavelength) + wave.phase) * wave.amplitude;
      const secondaryWave = Math.sin(x * (2 * Math.PI / (wave.wavelength * 1.5)) + wave.phase * 1.02) * wave.amplitude * 0.3;
      const tertiaryWave = Math.sin(x * (2 * Math.PI / (wave.wavelength * 2.0)) + wave.phase * 0.98) * wave.amplitude * 0.15;
      const y = wave.yOffset + primaryWave + secondaryWave + tertiaryWave;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    const time = Date.now() * 0.0001;
    const hue1 = 45 + Math.sin(time + wave.colorShift) * 15;
    const hue2 = 120 + Math.sin(time * 0.7 + wave.colorShift) * 25;
    gradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, ${wave.opacity})`);
    gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 90%, 75%, ${wave.opacity})`);
    gradient.addColorStop(1, `hsla(${hue2}, 95%, 65%, ${wave.opacity})`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = wave.lineWidth;
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    waves.forEach(wave => {
      drawWave(wave);
      wave.phase += wave.speed;
      wave.amplitude += (wave.targetAmplitude - wave.amplitude) * 0.02;
      if (Math.random() < 0.002) {
        wave.targetAmplitude = wave.baseAmp + (Math.random() - 0.5) * wave.baseAmp * 0.3;
      }
      wave.wavelength += Math.sin(wave.phase * 0.1) * 0.5;
      wave.wavelength = Math.max(300, Math.min(900, wave.wavelength));
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationId);
    else animate();
  });
})();

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Optimized scroll handler
const headerEl = document.querySelector('.header');
const heroEl = document.querySelector('.hero');
const canvasEl = document.getElementById('waveCanvas');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
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

      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

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

initHScroller(document.querySelector('.upcoming-events-scroller'));
initHScroller(document.querySelector('.past-events-scroller'));

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    const answer = this.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq-question').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isOpen) {
      this.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
