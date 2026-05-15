// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================

// Initialize navbar functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    updateActiveNav();
  });
});

// Update active nav link based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// TYPING ANIMATION
// ========================================

const typedWords = document.querySelectorAll('.typed-words span');
let currentWord = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeAnimation() {
  const words = document.querySelectorAll('.typed-words span');
  
  // Remove active class from all
  words.forEach(word => word.classList.remove('active'));
  
  // Add active class to current
  words[currentWord].classList.add('active');
  
  // Move to next word
  currentWord = (currentWord + 1) % words.length;
}

// Change word every 3 seconds
setInterval(typeAnimation, 3000);
typeAnimation(); // Initial call

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = () => {
  const reveals = document.querySelectorAll('.stat-card, .education-card, .experience-card, .skill-category, .project-card, .certification-card, .achievement-item, .contact-item, .contact-form');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
};

window.addEventListener('scroll', revealElements);

// Initial call
revealElements();

// ========================================
// WEB3FORMS CONTACT FORM HANDLING
// ========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formStatus = document.getElementById('form-status');
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    if (formStatus) {
      formStatus.innerHTML = '';
      formStatus.className = '';
    }

    try {
      const formData = new FormData(this);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        // Success
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        }
        this.reset();
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        
        // Reset after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          if (formStatus) {
            formStatus.innerHTML = '';
            formStatus.className = '';
          }
        }, 3000);
      } else {
        // Error from API
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      // Error handling
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (error.message || 'An error occurred. Please try again.');
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      console.error('Form error:', error);
    }
  });
}

// ========================================
// SMOOTH SCROLL BEHAVIOR FOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
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

// ========================================
// ANIMATE ON SCROLL (INTERSECTION OBSERVER)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.stat-card, .education-card, .experience-card, .skill-category, .project-card, .certification-card, .achievement-item').forEach(el => {
  observer.observe(el);
});

// ========================================
// SKILL TAGS ANIMATION
// ========================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });

  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================================
// PROJECT CARDS INTERACTION
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ========================================
// STAT CARDS COUNTER (Optional animation)
// ========================================

let counted = false;

window.addEventListener('scroll', () => {
  if (!counted) {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
      counted = true;
      // Add any counter animation here
    }
  }
});

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// ========================================
// SCROLL INDICATOR ANIMATION
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ========================================
// PARALLAX EFFECT (Optional)
// ========================================

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }

  // Quick scroll to top with Ctrl+Home
  if (e.ctrlKey && e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Animate hero section elements
  const heroName = document.querySelector('.hero-name');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-description');
  
  if (heroName) heroName.style.animation = 'slideInLeft 0.8s ease 0.1s both';
  if (heroTitle) heroTitle.style.animation = 'slideInLeft 0.8s ease 0.2s both';
  if (heroDesc) heroDesc.style.animation = 'slideInLeft 0.8s ease 0.3s both';
});

// ========================================
// SMOOTH HASH NAVIGATION
// ========================================

if (window.location.hash) {
  setTimeout(() => {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// ========================================
// CONTACT FORM CLIENT-SIDE VALIDATION
// ========================================

const formValidation = document.querySelector('.contact-form');

if (formValidation) {
  // Real-time validation feedback
  const nameInput = formValidation.querySelector('input[name="name"]');
  const emailInput = formValidation.querySelector('input[name="email"]');
  const messageInput = formValidation.querySelector('textarea[name="message"]');

  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = '';
      }
    });
  }
}

// ========================================
// UTILITY: DARK MODE TOGGLE (Optional)
// ========================================

function initDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark-mode');
  }
}

// Initialize on load
initDarkMode();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll update
window.addEventListener('scroll', debounce(() => {
  updateActiveNav();
  revealElements();
}, 100));

// ========================================
// ANALYTICS PLACEHOLDER
// ========================================

console.log('Portfolio loaded successfully!');
console.log('Navigation, animations, and interactions are active.');

// ========================================
// INITIALIZATION
// ========================================

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  revealElements();
  typeAnimation();
  console.log('All portfolio features initialized');
});
