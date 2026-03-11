document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Page loaded');

  // ====== SET YEAR IN FOOTER ======
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ====== LUCIDE ICONS ======
  if (window.lucide) {
    try {
      window.lucide.createIcons();
    } catch (error) {
      console.error('Lucide error:', error);
    }
  }

  // ====== REVEAL ON SCROLL ======
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);

          setTimeout(() => {
            el.classList.add('visible');
          }, delay);

          observer.unobserve(el);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ====== HOVER EFFECTS ======
  const hoverCards = document.querySelectorAll(
    '.value-card, .activity-card, .activity-card-slider, .member-card, .card'
  );

  hoverCards.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      el.style.transform = 'translateY(-10px) scale(1.02)';
      el.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms ease';
      el.style.boxShadow = '0 20px 45px rgba(139,92,246,0.12)';
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });

  // ====== BUTTON FOCUS GLOW ======
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('focus', () => btn.classList.add('neon-outline'));
    btn.addEventListener('blur', () => btn.classList.remove('neon-outline'));
  });

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ====== SLIDER ======
  console.log('🎬 Initializing slider...');

  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');

  if (sliderWrapper && slides.length && leftBtn && rightBtn) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    function updateSlider() {
      const offset = -currentIndex * 100;
      sliderWrapper.style.transform = `translateX(${offset}%)`;
      console.log(`📸 Moved to slide: ${currentIndex + 1}/${totalSlides}`);
    }

    function goToPrevSlide(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
      restartAutoSlide();
    }

    function goToNextSlide(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
      restartAutoSlide();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      }, 5000);
    }

    function restartAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      startAutoSlide();
    }

    leftBtn.addEventListener('click', goToPrevSlide);
    rightBtn.addEventListener('click', goToNextSlide);

    sliderWrapper.addEventListener('mouseenter', () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
      startAutoSlide();
    });

    updateSlider();
    startAutoSlide();

    console.log('✅ Slider initialized!');
  } else {
    console.warn('⚠️ Slider elements not found. Skip slider init.');
  }

  // ====== GOOGLE FORM SUBMISSION ======
  const form = document.querySelector('form[action*="google.com/forms"]');
  const status = document.getElementById('status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const actionUrl = form.getAttribute('action');

      try {
        await fetch(actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        status.textContent = '✓ Gửi thành công! Cảm ơn bạn.';
        status.style.color = '#4ade80';
        form.reset();
      } catch (error) {
        console.error('Form submit error:', error);
        status.textContent = '✗ Gửi thất bại, thử lại.';
        status.style.color = '#f87171';
      }
    });
  }

  // ====== MUSIC TOGGLE ======
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  if (music && musicBtn) {
    musicBtn.addEventListener('click', async () => {
      try {
        if (music.paused) {
          await music.play();
          musicBtn.textContent = '🔊 Tắt nhạc';
        } else {
          music.pause();
          musicBtn.textContent = '🔇 Bật nhạc';
        }
      } catch (error) {
        console.error('Music play error:', error);
      }
    });
  }
});