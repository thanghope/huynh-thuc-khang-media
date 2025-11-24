

document.addEventListener('DOMContentLoaded', () => {
  // set current year in footer
  const y = new Date().getFullYear();
  const yy = document.getElementById('year');
  if(yy) yy.textContent = y;

  // Initialize lucide icons
  if (window.lucide) {
    try { lucide.createIcons(); } catch(e){ /* ignore */ }
  }

  // Reveal on scroll with IntersectionObserver
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

  // Tiny hover float effect: add subtle transform on pointerenter/leave to improve "float"
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

  // Buttons glow pulse on focus (keyboard nav)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('focus', () => btn.classList.add('neon-outline'));
    btn.addEventListener('blur', () => btn.classList.remove('neon-outline'));
  });

  // Contact form (simple local UX)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic confirmation (no backend) — replace with actual endpoint if needed
      const btn = contactForm.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Đã gửi';
      setTimeout(()=>{ btn.disabled=false; btn.textContent='Gửi'; }, 1200);
    });
  }

  // small accessibility: smooth scroll for internal anchors
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
});
const form = document.getElementById("contact-form");
const status = document.getElementById("status");
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfOJIPBgP_i5HRbhcs5N0JbXpIqZ4uyPSB0dUSmd8Syi2uJzA/viewform?usp=dialog"; // Form ID của m

form.addEventListener("submit", function(e){
  e.preventDefault();
  const formData = new FormData(form);

  fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
  .then(() => {
    status.innerText = "✓ Gửi thành công! Cảm ơn bạn.";
    form.reset();
  })
  .catch(() => {
    status.innerText = "✗ Gửi thất bại, thử lại.";
  });
});
