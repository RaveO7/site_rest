// === ANIMATION AU SCROLL (fade-in, slide-up) ===
// Ajoutez la classe 'fade-in' ou 'slide-up' à vos éléments pour activer l'effet
export function setupScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-up');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

// === MENU HAMBURGER ANIMÉ ===
export function setupHamburgerMenu() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

// === LIGHTBOX POUR LA GALERIE ===
export function setupLightbox() {
  const images = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg || !closeBtn) return;
  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightboxImg.focus();
    });
  });
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
  // Accessibilité : fermer avec ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}

// === SCROLL ANIMÉ SUR LES ANCRES ===
export function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          // Fermer le menu mobile si ouvert
          const nav = document.getElementById('mobile-nav');
          if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            nav.setAttribute('aria-hidden', 'true');
          }
        }
      }
    });
  });
}

// === INITIALISATION ===
export function initScripts() {
  setupScrollAnimations();
  setupHamburgerMenu();
  setupLightbox();
  setupSmoothScroll();
} 