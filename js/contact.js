// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ========== Mobile Menu Toggle ==========
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  hamburgerBtn.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-submenu-toggle)');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // ========== Desktop Submenu Toggle ==========
  const playMenuBtn = document.getElementById('playMenuBtn');
  const playSubmenu = document.getElementById('playSubmenu');
  const navItem = playMenuBtn?.closest('.nav-item');
  
  if (playMenuBtn && playSubmenu) {
    playMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navItem.classList.toggle('active');
      playSubmenu.classList.toggle('active');
    });
    
    // Close submenu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navItem.contains(e.target)) {
        navItem.classList.remove('active');
        playSubmenu.classList.remove('active');
      }
    });
  }
  
  // ========== Mobile Submenu Toggle ==========
  const mobilePlayBtn = document.getElementById('mobilePlayBtn');
  const mobilePlaySubmenu = document.getElementById('mobilePlaySubmenu');
  const mobileNavItem = mobilePlayBtn?.closest('.mobile-nav-item');
  
  if (mobilePlayBtn && mobilePlaySubmenu) {
    mobilePlayBtn.addEventListener('click', function(e) {
      e.preventDefault();
      mobileNavItem.classList.toggle('active');
      mobilePlaySubmenu.classList.toggle('active');
    });
  }
  
  // ========== Form Submission ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Submit to Formsubmit.co via fetch
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        const contactCard = contactForm.closest('.contact-card');
        if (contactCard) {
          contactCard.innerHTML = `
            <div class="form-confirmation">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#5489FF" opacity="0.1"/>
                <circle cx="40" cy="40" r="30" fill="#5489FF" opacity="0.2"/>
                <path d="M28 40L36 48L52 32" stroke="#5489FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h2 class="confirmation-title">Your message was sent!</h2>
              <p class="confirmation-text">We will contact you shortly.</p>
            </div>
          `;
        }
      })
      .catch(error => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or call us directly.');
      });
    });
  }
  
  // ========== Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ========== Header Scroll Effect (Optional) ==========
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
});
