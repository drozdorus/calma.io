// Optimized Wave Animation
(function() {
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
      opacity: 0.65 - depth * 0.45,   // center=bright (0.65), edges=muted (0.20)
      lineWidth: 0.5 + (1 - depth) * 1.5,  // center=thicker, edges=thin (0.5)
      blur: (1 - depth) * 4,          // center=blur 4px, edges=sharp
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
    
    // Update and draw each wave
    waves.forEach(wave => {
      drawWave(wave);
      
      // Slowly change phase to modify wave shape
      wave.phase += wave.speed;
      
      // Smoothly interpolate amplitude towards target
      wave.amplitude += (wave.targetAmplitude - wave.amplitude) * 0.02;
      
      // Occasionally nudge target amplitude around its base value
      if (Math.random() < 0.002) {
        wave.targetAmplitude = wave.baseAmp + (Math.random() - 0.5) * wave.baseAmp * 0.3;
      }
      
      // Slowly vary wavelength for more organic movement
      wave.wavelength += Math.sin(wave.phase * 0.1) * 0.5;
      wave.wavelength = Math.max(300, Math.min(900, wave.wavelength));
    });
    
    animationId = requestAnimationFrame(animate);
  }

  animate();
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
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
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const header = document.querySelector('.header');
      const canvas = document.getElementById('waveCanvas');
      
      // Header island toggle
      if (scrolled > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Canvas fade
      if (canvas) {
        const opacity = Math.max(0, 1 - scrolled / 300);
        canvas.style.opacity = opacity;
      }
      
      // Hero parallax
      const hero = document.querySelector('.hero');
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
      
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Form handling
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  
  const form = e.target;
  const data = new FormData(form);
  const button = form.querySelector('.submit-button');
  
  // Validation
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
  notification.className = 'notification';
  notification.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 20px; cursor: pointer; opacity: 0.7; padding: 0;">×</button>
    </div>
  `;
  
  const bg = {
    success: 'linear-gradient(135deg, #00FF7F, #FFD700)',
    error: 'linear-gradient(135deg, #ff4757, #ff6b7a)',
    info: 'linear-gradient(135deg, #FFD700, #00FF7F)'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bg[type]};
    color: #0a0a0a;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Intersection Observer for sections
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });
});

// Mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('active');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMenu;

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuClose = document.getElementById('mobileMenuClose');
  const menu = document.getElementById('mobileMenu');
  
  menuBtn?.addEventListener('click', toggleMenu);
  menuClose?.addEventListener('click', closeMenu);
  menu?.addEventListener('click', e => {
    if (e.target === menu) closeMenu();
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
  
  // Past events toggle
  const toggle = document.getElementById('pastEventsToggle');
  const content = document.getElementById('pastEventsContent');

  toggle?.addEventListener('click', () => {
    const isActive = content.classList.toggle('active');
    toggle.classList.toggle('active', isActive);
  });

  // Events slider
  const sliderTrack = document.querySelector('.events-slider-track');
  const sliderViewport = document.querySelector('.events-slider-viewport');
  const prevBtn = document.querySelector('.events-slider-prev');
  const nextBtn = document.querySelector('.events-slider-next');
  const dotsContainer = document.querySelector('.events-slider-dots');
  const cards = sliderTrack ? Array.from(sliderTrack.querySelectorAll('.conference-card')) : [];

  if (sliderTrack && cards.length) {
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - cardsPerView);
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const totalDots = getMaxIndex() + 1;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('events-slider-dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function getCardWidth() {
      // Use actual rendered card width to avoid offset drift from padding differences
      return cards[0].offsetWidth;
    }

    function updateSlider() {
      const gap = 24;
      const offset = currentIndex * (getCardWidth() + gap);
      sliderTrack.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = currentIndex <= 0;
      nextBtn.disabled = currentIndex >= getMaxIndex();

      dotsContainer.querySelectorAll('.events-slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
      updateSlider();
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Unified drag support (touch + mouse)
    let dragStartX = 0;
    let dragDeltaX = 0;
    let isDragging = false;

    function getBaseOffset() {
      return currentIndex * (getCardWidth() + 24);
    }

    function onDragStart(x) {
      dragStartX = x;
      dragDeltaX = 0;
      isDragging = true;
      sliderTrack.style.transition = 'none';
      sliderViewport.classList.add('dragging');
    }

    function onDragMove(x) {
      if (!isDragging) return;
      dragDeltaX = x - dragStartX;
      sliderTrack.style.transform = `translateX(${-getBaseOffset() + dragDeltaX}px)`;
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      sliderTrack.style.transition = '';
      sliderViewport.classList.remove('dragging');
      if (Math.abs(dragDeltaX) > 50) {
        if (dragDeltaX < 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      } else {
        updateSlider();
      }
      dragDeltaX = 0;
    }

    // Touch events
    sliderViewport.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX), { passive: true });
    sliderViewport.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX), { passive: true });
    sliderViewport.addEventListener('touchend', onDragEnd);

    // Mouse events
    sliderViewport.addEventListener('mousedown', (e) => {
      onDragStart(e.clientX);
    });
    document.addEventListener('mousemove', (e) => onDragMove(e.clientX));
    document.addEventListener('mouseup', onDragEnd);

    // Trackpad horizontal scroll
    let wheelAccum = 0;
    let wheelLocked = false;
    sliderViewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLocked) return;
      wheelAccum += e.deltaX;
      if (Math.abs(wheelAccum) > 30) {
        goTo(currentIndex + (wheelAccum > 0 ? 1 : -1));
        wheelAccum = 0;
        wheelLocked = true;
        setTimeout(() => { wheelLocked = false; }, 400);
      }
    }, { passive: false });


    window.addEventListener('resize', () => {
      cardsPerView = getCardsPerView();
      if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
      buildDots();
      updateSlider();
    });

    buildDots();
    updateSlider();
  }
});

// Scroll to top
document.getElementById('scrollTopBtn')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var isOpen = this.getAttribute('aria-expanded') === 'true';
    var answer = this.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq-question').forEach(function(other) {
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
