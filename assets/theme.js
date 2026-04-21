document.addEventListener('DOMContentLoaded', () => {

  // ── MOBILE MENU ──
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
      mobileToggle.textContent = mobileNav.classList.contains('is-open') ? '✕' : '☰';
    });
  }

  // ── BACK TO TOP ──
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── ANNOUNCEMENT BAR CLOSE ──
  const announcementClose = document.getElementById('announcementClose');
  const announcementBar = document.getElementById('announcementBar');
  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      sessionStorage.setItem('announcementClosed', 'true');
    });
    if (sessionStorage.getItem('announcementClosed')) announcementBar.style.display = 'none';
  }

  // ── EMAIL POPUP ──
  const popup = document.getElementById('emailPopup');
  const popupClose = document.getElementById('popupClose');
  const popupSkip = document.getElementById('popupSkip');
  const popupForm = document.getElementById('popupForm');
  const popupCode = document.getElementById('popupCode');

  if (popup) {
    const shown = sessionStorage.getItem('popupShown');
    if (!shown) {
      setTimeout(() => {
        popup.classList.add('is-open');
        sessionStorage.setItem('popupShown', 'true');
      }, 5000);
    }

    const closePopup = () => popup.classList.remove('is-open');
    if (popupClose) popupClose.addEventListener('click', closePopup);
    if (popupSkip) popupSkip.addEventListener('click', closePopup);
    popup.querySelector('.email-popup__backdrop')?.addEventListener('click', closePopup);

    if (popupForm) {
      popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (popupCode) popupCode.classList.add('is-visible');
        popupForm.style.display = 'none';
        if (popupSkip) popupSkip.textContent = 'Close';
      });
    }
  }

  // ── FILTER PILLS ──
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    });
  });

  // ── CART COUNT ──
  document.querySelectorAll('.product-card__add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const count = document.querySelector('.header__cart-count');
      if (count) count.textContent = parseInt(count.textContent || '0') + 1;
      const orig = btn.innerHTML;
      btn.innerHTML = '✓';
      btn.style.background = '#5A8F53';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1500);
    });
  });

  // ── WISHLIST ──
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const liked = btn.dataset.liked === 'true';
      btn.dataset.liked = (!liked).toString();
      btn.textContent = liked ? '♡' : '♥';
      btn.style.color = liked ? '' : '#E05252';
    });
  });

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .testimonial-card, .why-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

  // ── STICKY HEADER SHADOW ──
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.08)' : '';
    });
  }

  // ── PRODUCT GALLERY THUMBS ──
  document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      const main = document.querySelector('.product-gallery__main img');
      if (main && thumb.querySelector('img')) {
        main.src = thumb.querySelector('img').src;
      }
    });
  });

});
