/**
 * JavaNova Academy - ENHANCED Application Script
 *
 * Enhanced version with improved animations and functionality:
 * - Enhanced typing animation with proper cursor
 * - All original functionality preserved
 * - Better visual feedback
 */

// Enhanced, working application
const JavaNovaApp = {
  // State
  state: {
    isMobileMenuOpen: false,
    currentFilter: "all",
    typingIndex: 0,
    isInitialized: false,
    typingInterval: null,
    currentTextIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
    cursorInterval: null, // ← add this
  },

  // ENHANCED: Typing texts
  typingTexts: [
    "Build Enterprise Applications",
    "Master Spring Boot Framework",
    "Create Microservices Architecture",
    "Deploy to Cloud Platforms",
    "Optimize Application Performance",
    "Develop RESTful APIs",
    "Write Clean, Maintainable Code",
  ],

  // Initialize the app
  init() {
    console.log("🚀 JavaNova Enhanced App initializing...");

    try {
      // Remove preload class
      document.body.classList.remove("preload");

      // Initialize components
      this.initMobileMenu();
      this.initNavigation();
      this.initEnhancedTypingAnimation();
      this.initCourseFiltering();
      this.initFormValidation();
      this.initPricingToggle();

      this.state.isInitialized = true;
      console.log("✅ JavaNova Enhanced App initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize enhanced app:", error);
    }
  },

  // Mobile menu functionality
  initMobileMenu() {
    const menuToggle = document.getElementById("mobileMenuToggle");
    const menuClose = document.getElementById("mobileMenuClose");
    const menu = document.getElementById("mobileMenuNav");
    const overlay = document.getElementById("mobileMenuOverlay");
    const menuLinks = document.querySelectorAll(".mobile-nav-link");

    if (!menuToggle || !menu) {
      console.log("⚠️ Mobile menu elements not found");
      return;
    }

    // Toggle button
    menuToggle.addEventListener("click", () => {
      console.log("📱 Mobile menu toggle clicked");
      this.toggleMobileMenu();
    });

    // Close button
    if (menuClose) {
      menuClose.addEventListener("click", () => {
        console.log("❌ Mobile menu close clicked");
        this.closeMobileMenu();
      });
    }

    // Overlay click
    if (overlay) {
      overlay.addEventListener("click", () => {
        console.log("🔄 Mobile menu overlay clicked");
        this.closeMobileMenu();
      });
    }

    // Menu links
    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        console.log("🔗 Mobile menu link clicked:", href);
        this.closeMobileMenu();
        this.scrollToSection(href);
      });
    });

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.state.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    console.log("✅ Mobile menu initialized");
  },

  toggleMobileMenu() {
    if (this.state.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  },

  openMobileMenu() {
    const menu = document.getElementById("mobileMenuNav");
    const overlay = document.getElementById("mobileMenuOverlay");
    const toggle = document.getElementById("mobileMenuToggle");

    if (menu) menu.classList.add("active");
    if (overlay) overlay.classList.add("active");
    if (toggle) toggle.classList.add("active");

    document.body.classList.add("mobile-menu-open");
    this.state.isMobileMenuOpen = true;

    console.log("📱 Mobile menu opened");
  },

  closeMobileMenu() {
    const menu = document.getElementById("mobileMenuNav");
    const overlay = document.getElementById("mobileMenuOverlay");
    const toggle = document.getElementById("mobileMenuToggle");

    if (menu) menu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    if (toggle) toggle.classList.remove("active");

    document.body.classList.remove("mobile-menu-open");
    this.state.isMobileMenuOpen = false;

    console.log("❌ Mobile menu closed");
  },

  // Navigation functionality
  // Update in script.js
initNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .mobile-nav-link");
  
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      console.log("🔗 Nav link clicked:", href);
      this.scrollToSection(href);
    });
  });

  // Update active nav on scroll
  window.addEventListener(
    "scroll",
    this.throttle(() => {
      this.updateActiveNav();
    }, 100)
  );

  console.log("✅ Navigation initialized");
},

  scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const offsetTop = target.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    console.log("📍 Scrolled to:", targetId);
  },

  // Update sections list
updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .mobile-nav-link");
  const scrollPos = window.scrollY + 150;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });

    // Update active link
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "#" + currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
},

  // ENHANCED: Typing animation with proper cursor
  initEnhancedTypingAnimation() {
    const typingElement = document.getElementById("typingText");
    const cursorElement = document.getElementById("cursor");

    if (!typingElement) {
      console.log("⚠️ Typing element not found");
      return;
    }

    if (cursorElement) {
      cursorElement.style.display = "inline-block";

      // start a blinking cursor effect
      this.state.cursorInterval = setInterval(() => {
        cursorElement.style.opacity =
          cursorElement.style.opacity === "0" ? "1" : "0";
      }, 600);
    }

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentText = this.typingTexts[currentTextIndex];

      if (isDeleting) {
        // Delete character
        typingElement.textContent = currentText.substring(
          0,
          currentCharIndex - 1
        );
        currentCharIndex--;

        // If finished deleting
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % this.typingTexts.length;
          setTimeout(typeWriter, 500); // Pause before typing next
          return;
        }

        setTimeout(typeWriter, 50); // Faster deletion
      } else {
        // Type character
        typingElement.textContent = currentText.substring(
          0,
          currentCharIndex + 1
        );
        currentCharIndex++;

        // If finished typing
        if (currentCharIndex === currentText.length) {
          setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 2000); // Pause at end
          return;
        }

        setTimeout(typeWriter, 100); // Normal typing speed
      }
    };

    // Start the enhanced typing animation
    typeWriter();

    console.log("✅ Enhanced typing animation initialized");
  },

  // Optionally, if you want to clear the cursor interval when switching pages or stopping animation:
  clearCursorBlink() {
    if (this.state.cursorInterval) {
      clearInterval(this.state.cursorInterval);
      this.state.cursorInterval = null;
    }
  },

  // Course filtering
  initCourseFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseItems = document.querySelectorAll(".course-item");

    if (!filterButtons.length) {
      console.log("⚠️ Filter buttons not found");
      return;
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        console.log("🔍 Filter clicked:", filter);
        this.filterCourses(filter);
        this.updateActiveFilter(button);
      });
    });

    console.log("✅ Course filtering initialized");
  },

  filterCourses(filter) {
    const courseItems = document.querySelectorAll(".course-item");
    courseItems.forEach((item) => {
      const level = item.dataset.level;
      const shouldShow = filter === "all" || level === filter;

      // let Bootstrap grid decide layout, so clear any inline display override
      item.style.display = shouldShow ? "" : "none";
      // if you still want a fade, you can toggle a CSS class with a transition on opacity
      item.style.opacity = shouldShow ? "1" : "0";
    });

    this.state.currentFilter = filter;
    console.log("🔍 Courses filtered by:", filter);
  },

  updateActiveFilter(activeButton) {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    activeButton.classList.add("active");
  },

  // Form validation
  initFormValidation() {
    const form = document.getElementById("contactForm");
    if (!form) {
      console.log("⚠️ Contact form not found");
      return;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("📝 Form submitted");
      this.handleFormSubmit(form);
    });

    // Real-time validation
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });
    });

    console.log("✅ Form validation initialized");
  },

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.required && !value) {
      isValid = false;
    }

    if (field.type === "email" && value && !this.isValidEmail(value)) {
      isValid = false;
    }

    if (isValid) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    } else {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    }

    return isValid;
  },

  handleFormSubmit(form) {
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.showMessage(
        "Thank you! Your message has been sent successfully.",
        "success"
      );
      form.reset();
      inputs.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });
    } else {
      this.showMessage("Please correct the errors in the form.", "error");
    }
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  showMessage(text, type) {
    // Create message element
    const message = document.createElement("div");
    message.className = `alert alert-${
      type === "error" ? "danger" : "success"
    } position-fixed`;
    message.style.cssText =
      "top: 20px; right: 20px; z-index: 9999; max-width: 400px;";
    message.innerHTML = `
            ${text}
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.remove()"></button>
        `;

    document.body.appendChild(message);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);

    console.log("💬 Message shown:", text);
  },

  // Pricing toggle
  initPricingToggle() {
    const toggle = document.getElementById("pricingToggle");
    if (!toggle) {
      console.log("⚠️ Pricing toggle not found");
      return;
    }

    toggle.addEventListener("change", () => {
      const isAnnual = toggle.checked;
      console.log("💰 Pricing toggled:", isAnnual ? "annual" : "monthly");
      this.updatePricing(isAnnual);
    });

    console.log("✅ Pricing toggle initialized");
  },

  updatePricing(isAnnual) {
    const priceElements = document.querySelectorAll(".price-amount");

    priceElements.forEach((element) => {
      const monthlyPrice = parseInt(
        element.dataset.monthly || element.textContent.replace("$", "")
      );
      const newPrice = isAnnual
        ? Math.round(monthlyPrice * 12 * 0.8)
        : monthlyPrice;
      element.textContent = "$" + newPrice;
    });

    const periodElements = document.querySelectorAll(".price span.fs-6");
    periodElements.forEach((element) => {
      element.textContent = isAnnual ? "/year" : "/month";
    });
  },

  // Utility function
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Initialize app when DOM is ready
function initializeApp() {
  console.log("🚀 Initializing JavaNova Enhanced App...");
  try {
    JavaNovaApp.init();
    window.JavaNovaApp = JavaNovaApp; // Make globally available
    console.log("✅ JavaNova Enhanced App ready and available globally");
  } catch (error) {
    console.error("❌ Failed to initialize enhanced app:", error);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // DOM already loaded
  initializeApp();
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992 && JavaNovaApp.state.isMobileMenuOpen) {
    JavaNovaApp.closeMobileMenu();
  }
});

console.log("📄 JavaNova Enhanced App script loaded");
