/* Team carousel — mirrors events slider logic exactly */
(function () {
  const track = document.getElementById('teamTrack');
  const viewport = document.getElementById('teamViewport');
  const prevBtn = document.getElementById('teamPrev');
  const nextBtn = document.getElementById('teamNext');
  const dotsContainer = document.getElementById('teamDots');
  if (!track || !viewport) return;

  const cards = Array.from(track.querySelectorAll('.team-card'));
  if (!cards.length) return;

  let currentIndex = 0;
  let cardsPerView = getCardsPerView();

  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - cardsPerView);
  }

  function setCardWidths() {
    const gap = 24;
    const w = Math.floor((viewport.offsetWidth - (cardsPerView - 1) * gap) / cardsPerView);
    cards.forEach(c => { c.style.width = w + 'px'; });
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const total = getMaxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.classList.add('events-slider-dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const gap = 24;
    const offset = currentIndex * (cards[0].offsetWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

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

  // Drag support
  let dragStartX = 0;
  let dragDeltaX = 0;
  let isDragging = false;

  function getBaseOffset() {
    return currentIndex * (cards[0].offsetWidth + 24);
  }

  viewport.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    viewport.classList.add('dragging');
    track.style.transition = 'none';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    track.style.transform = `translateX(${-getBaseOffset() + dragDeltaX}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('dragging');
    track.style.transition = '';
    if (dragDeltaX < -50) goTo(currentIndex + 1);
    else if (dragDeltaX > 50) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });

  viewport.addEventListener('touchstart', e => {
    dragStartX = e.touches[0].clientX;
    dragDeltaX = 0;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', e => {
    dragDeltaX = e.touches[0].clientX - dragStartX;
    track.style.transform = `translateX(${-getBaseOffset() + dragDeltaX}px)`;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    track.style.transition = '';
    if (dragDeltaX < -50) goTo(currentIndex + 1);
    else if (dragDeltaX > 50) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    setCardWidths();
    buildDots();
    updateSlider();
  });

  // rAF ensures viewport has its layout width before we calculate card sizes
  requestAnimationFrame(() => {
    setCardWidths();
    buildDots();
    updateSlider();
  });
})();
