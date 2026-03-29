/* ============================================
   AXIS STUDIO — Main JavaScript Module
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initModals();
  initSmoothScroll();
  initRevealAnimations();
  initLazyYouTube();
  initHeaderScroll();
});

/* === HAMBURGER MENU === */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = navOverlay?.querySelectorAll('.nav-overlay__link');

  if (!hamburger || !navOverlay) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* === MODALS === */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    // Accessibility: Focus first interactive element or close button
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function initModals() {
  // Close on backdrop click (optional but good UX)
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 64;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* === REVEAL ON SCROLL (Intersection Observer) === */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* === LAZY VIDEO LOADING (YouTube & Instagram) === */
function initLazyYouTube() {
  console.log('Video loader initialized');
  
  document.addEventListener('click', (e) => {
    const placeholder = e.target.closest('.project-card__video-placeholder');
    if (!placeholder) return;

    console.log('Video placeholder clicked:', placeholder.dataset.videoId);
    
    const container = placeholder.closest('.project-card__video');
    const videoId = placeholder.dataset.videoId;
    const videoType = placeholder.dataset.videoType || 'youtube';
    
    if (!videoId || !container) {
      console.error('Missing Video ID or Container');
      return;
    }

    const iframe = document.createElement('iframe');

    if (videoType === 'instagram') {
      iframe.src = `https://www.instagram.com/reel/${videoId}/embed/`;
    } else {
      // Use nocookie domain for better compatibility and privacy
      // Added vq=hd720 & controls=1 & mute=0 per user request
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&mute=0&vq=hd720&controls=1`;
    }
    
    iframe.title = videoType === 'instagram' ? 'Instagram reel' : 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    // Smooth transition
    container.style.background = '#000';
    container.innerHTML = '';
    container.appendChild(iframe);
    
    console.log('Iframe injected:', iframe.src);
  });
}

/* === HEADER SCROLL EFFECT === */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
          header.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)';
          header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
          header.style.borderBottomColor = 'rgba(197, 160, 89, 0.1)';
          header.style.background = 'rgba(0, 0, 0, 0.85)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}
