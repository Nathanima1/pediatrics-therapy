// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ========== Form Submission ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Submit to Formsubmit.co via fetch
      console.log('Submitting form to:', contactForm.action);
      console.log('Form data:', Object.fromEntries(new FormData(contactForm)));
      
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (response.ok) {
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
        } else {
          throw new Error('Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
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
