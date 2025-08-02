/* ===== BOOTSTRAP 5 + ENHANCED MOBILE MENU JAVASCRIPT ===== */

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Remove preload class to enable transitions
  setTimeout(() => {
    document.body.classList.remove("preload");
  }, 100);

  // Initialize all features
  initializeNavigation();
  initializeThemeToggle();
  initializeMobileMenu(); // New mobile menu functionality
  initializePricingToggle();
  initializeCourseFilters();
  initializeAnimatedCounters();
  initializeTypingAnimation();
  initializeFormValidation();
  initializeStickyHeader();
});

/* ===== ENHANCED MOBILE MENU FUNCTIONALITY ===== */
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenuNav');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) return;

  // Open mobile menu
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
    body.classList.add('mobile-menu-open');

    // Set aria attributes for accessibility
    mobileMenuToggle.setAttribute('aria-expanded', 'true');

    // Add staggered animation to menu items
    mobileNavLinks.forEach((link, index) => {
      link.style.transitionDelay = `${(index + 1) * 0.1}s`;
      link.style.opacity = '0';
      link.style.transform = 'translateX(-20px)';

      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, (index + 1) * 100);
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    body.classList.remove('mobile-menu-open');

    // Set aria attributes for accessibility
    mobileMenuToggle.setAttribute('aria-expanded', 'false');

    // Reset menu item animations
    mobileNavLinks.forEach((link) => {
      link.style.transitionDelay = '0s';
      link.style.opacity = '1';
      link.style.transform = 'translateX(0)';
    });
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Event listeners
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Close menu when clicking on navigation links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Get target section
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close menu first
        closeMobileMenu();

        // Smooth scroll to target after menu closes
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 400); // Wait for menu to close
      }
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98 && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Focus management for accessibility
  mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMobileMenu();
    }
  });

  // Trap focus within mobile menu when open
  function trapFocus(e) {
    if (!mobileMenu.classList.contains('active')) return;

    const focusableElements = mobileMenu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  document.addEventListener('keydown', trapFocus);
}

/* ===== NAVIGATION FUNCTIONALITY (Enhanced for Desktop) ===== */
function initializeNavigation() {
  // Desktop navigation smooth scrolling
  const desktopNavLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

  desktopNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Smooth scroll to target
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===== STICKY HEADER ===== */
function initializeStickyHeader() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.custom-navbar');

    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(10, 10, 24, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      header.style.backdropFilter = 'blur(15px)';
    } else {
      header.style.backgroundColor = 'rgba(10, 10, 24, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      header.style.backdropFilter = 'blur(10px)';
    }
  });
}

/* ===== PRICING TOGGLE FUNCTIONALITY ===== */
function initializePricingToggle() {
  const toggleSwitch = document.querySelector('#pricingToggle');
  const prices = document.querySelectorAll('.price');

  const monthlyPrices = [29, 79, 129];
  const annualPrices = [23.2, 63.2, 103.2]; // 20% discount

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function() {
      prices.forEach((price, index) => {
        if (index < 3) {
          const priceValue = this.checked ? annualPrices[index] : monthlyPrices[index];
          const span = price.querySelector('span');
          const spanText = span ? span.outerHTML : '<span class="fs-6 fw-normal">/month</span>';
          price.innerHTML = `$${priceValue}${spanText}`;
        }
      });
    });
  }
}

/* ===== COURSE FILTER FUNCTIONALITY ===== */
function initializeCourseFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter courses with animation
      courseItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          if (item.getAttribute('data-level') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });

  // Set initial state
  courseItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

/* ===== ANIMATED COUNTERS ===== */
function initializeAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  function animateCounter(element) {
    const target = parseInt(
      element.textContent.replace('%', '').replace('+', '')
    );
    let count = 0;

    const interval = setInterval(() => {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count >= target) {
        count = target;
        clearInterval(interval);
      }

      element.textContent = element.textContent.includes('%')
        ? count + '%'
        : element.textContent.includes('+')
        ? count + '+'
        : count;
    }, 10);
  }
}

/* ===== TYPING ANIMATION ===== */
function initializeTypingAnimation() {
  const text = "Innovating Java Education for Tomorrow's Developers";
  const typingElement = document.getElementById("typingText");
  const cursorElement = document.getElementById("cursor");

  if (!typingElement || !cursorElement) return;

  let currentIndex = 0;
  let isTyping = true;
  let typingSpeed = 100; // milliseconds
  let erasingSpeed = 50; // milliseconds
  let pauseTime = 2000; // pause after typing complete

  function typeWriter() {
    if (isTyping) {
      // Typing phase
      if (currentIndex < text.length) {
        typingElement.textContent = text.substring(0, currentIndex + 1);
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Finished typing, pause then start erasing
        isTyping = false;
        setTimeout(typeWriter, pauseTime);
      }
    } else {
      // Erasing phase
      if (currentIndex > 0) {
        typingElement.textContent = text.substring(0, currentIndex - 1);
        currentIndex--;
        setTimeout(typeWriter, erasingSpeed);
      } else {
        // Finished erasing, start typing again
        isTyping = true;
        setTimeout(typeWriter, typingSpeed);
      }
    }
  }

  // Start the animation after a short delay
  setTimeout(typeWriter, 1000);
}

/* ===== FORM VALIDATION (Bootstrap 5 Compatible) ===== */
function initializeFormValidation() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (contactForm.checkValidity()) {
        // Form is valid, show success message
        showSuccessMessage();
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        // Form is invalid, show validation messages
        contactForm.classList.add('was-validated');
      }
    });
  }

  function showSuccessMessage() {
    // Create a Bootstrap alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
      <strong>Success!</strong> Thank you for your message! We will get back to you soon.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert the alert before the form
    contactForm.parentNode.insertBefore(alertDiv, contactForm);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (alertDiv && alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}

/* ===== ENHANCED THEME TOGGLE FUNCTIONALITY ===== */
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (!themeToggle || !themeIcon) return;

  // Professional SVG Icons for theme toggle
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>`;

  // Set initial theme based on user preference or system preference
  function setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Temporarily disable transitions for initial load
    document.body.classList.add("preload");

    if (savedTheme === "light" || (!savedTheme && !systemPrefersDark)) {
      document.body.classList.add("light-mode");
      themeIcon.innerHTML = moonIcon;
    } else {
      document.body.classList.remove("light-mode");
      themeIcon.innerHTML = sunIcon;
    }

    // Re-enable transitions after theme is set
    setTimeout(() => {
      document.body.classList.remove("preload");
    }, 50);
  }

  // Enhanced toggle between light and dark themes
  function toggleTheme() {
    // Add loading state to prevent multiple rapid clicks
    if (themeToggle.hasAttribute("data-transitioning")) {
      return;
    }

    themeToggle.setAttribute("data-transitioning", "true");

    // Add smooth transition effect
    const isLightMode = document.body.classList.contains("light-mode");

    if (isLightMode) {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");

      // Smooth icon transition
      themeIcon.style.transform = "scale(0.8) rotate(180deg)";
      setTimeout(() => {
        themeIcon.innerHTML = sunIcon;
        themeIcon.style.transform = "scale(1) rotate(0deg)";
      }, 150);
    } else {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");

      // Smooth icon transition
      themeIcon.style.transform = "scale(0.8) rotate(-180deg)";
      setTimeout(() => {
        themeIcon.innerHTML = moonIcon;
        themeIcon.style.transform = "scale(1) rotate(0deg)";
      }, 150);
    }

    // Remove transition lock after animation completes
    setTimeout(() => {
      themeToggle.removeAttribute("data-transitioning");
    }, 400);
  }

  // Listen for system theme changes with debouncing
  let systemThemeTimeout;
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function(e) {
      clearTimeout(systemThemeTimeout);
      systemThemeTimeout = setTimeout(() => {
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
          setInitialTheme();
        }
      }, 100);
    });

  // Enhanced page visibility handling for smooth experience
  document.addEventListener("visibilitychange", function() {
    if (!document.hidden) {
      // Refresh theme when page becomes visible again
      setTimeout(setInitialTheme, 100);
    }
  });

  // Initialize theme and set up event listener
  setInitialTheme();
  themeToggle.addEventListener("click", toggleTheme);

  // Add keyboard support for accessibility
  themeToggle.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  });
}

/* ===== ENHANCED SCROLL ANIMATIONS ===== */
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .benefit-card, .tech-item');

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

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Initialize scroll animations
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(initializeScrollAnimations, 500);
});

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize-specific logic here if needed
    console.log('Resize handled');
  }, 250);
});

// Optimized scroll handler
let scrollTimeout;
let isScrolling = false;

function optimizedScrollHandler() {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      // Scroll-specific optimizations here
      isScrolling = false;
    });
    isScrolling = true;
  }
}

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */

// Focus management for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Skip link functionality
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(skipLink.getAttribute('href'));
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ===== ERROR HANDLING ===== */
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Could implement user-friendly error reporting here
});

// Graceful degradation for older browsers
if (!window.IntersectionObserver) {
  // Fallback for browsers without Intersection Observer
  document.querySelectorAll('.stat-number').forEach(counter => {
    // Immediately show the final value
    const target = parseInt(counter.textContent.replace('%', '').replace('+', ''));
    counter.textContent = counter.textContent.includes('%')
      ? target + '%'
      : counter.textContent.includes('+')
      ? target + '+'
      : target;
  });
}

console.log('🚀 JavaNova Academy - Enhanced Mobile Menu initialized successfully!');
