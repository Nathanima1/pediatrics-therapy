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
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to your server
      console.log('Form submitted:', data);
      
      // Show success message (you can replace this with a proper notification)
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
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
