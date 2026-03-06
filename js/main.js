// MAIN.JS - Landing Page Interactivity

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initDesktopSubmenu();
  initHeaderScroll();
  initSmoothScroll();
  initActiveStates();
  initAccordions();
});

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const body = document.body;
  
  if (hamburger && mobileMenu && closeMenuBtn) {
    hamburger.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
    
    // Close when clicking outside menu content
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
  
  // Mobile submenu toggles
  const mobileSubmenus = document.querySelectorAll('.mobile-submenu-toggle');
  mobileSubmenus.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.mobile-nav-item');
      const submenu = parent.querySelector('.mobile-submenu');
      
      // Close other submenus
      document.querySelectorAll('.mobile-nav-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          const otherSubmenu = item.querySelector('.mobile-submenu');
          if (otherSubmenu) {
            otherSubmenu.classList.remove('active');
          }
        }
      });
      
      // Toggle current submenu
      parent.classList.toggle('active');
      submenu.classList.toggle('active');
    });
  });
}

function openMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  hamburger.classList.add('active');
  mobileMenu.classList.add('active');
  body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  body.style.overflow = '';
  
  // Close all submenus
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
    const submenu = item.querySelector('.mobile-submenu');
    if (submenu) {
      submenu.classList.remove('active');
    }
  });
}

// ========== DESKTOP SUBMENU ==========
function initDesktopSubmenu() {
  const playNav = document.querySelector('.nav-item.has-submenu');
  const playLink = playNav?.querySelector('.nav-link');
  const submenu = playNav?.querySelector('.submenu');
  
  if (playNav && playLink && submenu) {
    let submenuTimeout;
    
    // Open submenu on click
    playLink.addEventListener('click', function(e) {
      e.preventDefault();
      clearTimeout(submenuTimeout);
      
      const isActive = playNav.classList.contains('active');
      
      // Close all submenus
      document.querySelectorAll('.nav-item.has-submenu').forEach(item => {
        item.classList.remove('active');
        const menu = item.querySelector('.submenu');
        if (menu) {
          menu.classList.remove('active');
        }
      });
      
      // Toggle current submenu
      if (!isActive) {
        playNav.classList.add('active');
        submenu.classList.add('active');
      }
    });
    
    // Keep submenu open when hovering over it
    submenu.addEventListener('mouseenter', function() {
      clearTimeout(submenuTimeout);
    });
    
    submenu.addEventListener('mouseleave', function() {
      submenuTimeout = setTimeout(() => {
        playNav.classList.remove('active');
        submenu.classList.remove('active');
      }, 200);
    });
    
    // Close submenu when clicking outside
    document.addEventListener('click', function(e) {
      if (!playNav.contains(e.target)) {
        playNav.classList.remove('active');
        submenu.classList.remove('active');
      }
    });
  }
}

// ========== HEADER SCROLL EFFECT ==========
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(240, 244, 246, 0.95)';
      header.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'rgba(240, 244, 246, 0.9)';
      header.style.boxShadow = '0 4px 35px rgba(0, 0, 0, 0.36)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty or just # hrefs
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        }
        
        // Smooth scroll with offset for fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== ACTIVE STATES ==========
function initActiveStates() {
  // Set home icon as active on landing page
  const homeIcon = document.querySelector('.nav-home-icon');
  if (homeIcon && window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    homeIcon.classList.add('active');
  }
  
  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  const isContactPage = currentPath.endsWith('contact.html');
  const navLinks = document.querySelectorAll('.nav-link, .submenu-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath) {
      link.classList.add('active');
      
      // If it's a submenu link, also activate the parent
      // But NOT for the contact page — Contact lives in the header button, not under PLAY
      const parentNav = link.closest('.nav-item.has-submenu');
      if (parentNav && !isContactPage) {
        parentNav.querySelector('.nav-link').classList.add('active');
      }
    }
  });

  // Activate the CONTACT header button when on the contact page
  if (isContactPage) {
    const contactBtn = document.querySelector('.contact-btn.desktop-contact');
    if (contactBtn) {
      contactBtn.classList.add('active');
    }
  }
}

// ========== CARD ANIMATIONS (Optional Enhancement) ==========
function initCardAnimations() {
  const cards = document.querySelectorAll('.service-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// Uncomment to enable card animations
// initCardAnimations();

// ========== ACCORDION (ARCHETYPE 2) ==========
function initAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      const isActive = accordionItem.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current accordion
      if (isActive) {
        accordionItem.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      } else {
        accordionItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
