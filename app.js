document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Page loaded');
  
  // ====== SET YEAR IN FOOTER ======
  const y = new Date().getFullYear();
  const yy = document.getElementById('year');
  if(yy) yy.textContent = y;

  // ====== LUCIDE ICONS ======
  if (window.lucide) {
    try { lucide.createIcons(); } catch(e){ console.error('Lucide error:', e); }
  }

  // ====== REVEAL ON SCROLL ======
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        obs.unobserve(el);
      }
    });
  }, {
    root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12
  });

  reveals.forEach(r => observer.observe(r));

  // ====== HOVER EFFECTS ======
  document.querySelectorAll('.value-card, .activity-card, .member-card, .card').forEach(el => {
    el.addEventListener('pointerenter', () => {
      el.style.transform = 'translateY(-10px) scale(1.02)';
      el.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1)';
      el.style.boxShadow = '0 20px 45px rgba(139,92,246,0.07)';
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });

  // ====== BUTTON FOCUS GLOW ======
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('focus', () => btn.classList.add('neon-outline'));
    btn.addEventListener('blur', () => btn.classList.remove('neon-outline'));
  });

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').slice(1);
      const t = document.getElementById(targetId);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // ====== SLIDER CODE ======
  console.log('🎬 Initializing slider...');
  
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');
  
  console.log('Slider wrapper:', sliderWrapper);
  console.log('Slides:', slides.length);
  console.log('Left button:', leftBtn);
  console.log('Right button:', rightBtn);
  
  if (!sliderWrapper || !slides.length) {
    console.error('❌ Slider wrapper or slides not found!');
    return;
  }
  
  if (!leftBtn || !rightBtn) {
    console.error('❌ Arrow buttons not found!');
    return;
  }
  
  console.log('✅ All slider elements found!');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  function updateSlider() {
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
    console.log('📸 Moved to slide:', currentIndex);
  }
  
  // QUAN TRỌNG: Dùng onclick thay vì addEventListener
  leftBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('⬅️ Left button clicked!');
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  };
  
  rightBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('➡️ Right button clicked!');
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };
  
  // Auto slide (bỏ comment nếu muốn tự động chuyển)
  /*
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 5000);
  */
  
  console.log('✅ Slider initialized!');

  // ====== GOOGLE FORM SUBMISSION ======
  const form = document.querySelector('form[action*="google.com/forms"]');
  const status = document.getElementById('status');
  
  if (form && status) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const actionUrl = form.getAttribute('action');
      
      fetch(actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then(() => {
        status.innerText = '✓ Gửi thành công! Cảm ơn bạn.';
        status.style.color = '#4ade80';
        form.reset();
      })
      .catch(() => {
        status.innerText = '✗ Gửi thất bại, thử lại.';
        status.style.color = '#f87171';
      });
    });
  }
});
// tet
