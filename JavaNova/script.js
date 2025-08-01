// Enhanced Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("main-navigation");

  if (!menuToggle || !navLinks) return;

  function toggleMenu() {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.setAttribute("aria-expanded", String(!expanded));
    document.body.style.overflow = expanded ? "" : "hidden";
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Close on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && e.target !== menuToggle) {
      closeMenu();
    }
  });

  // Keyboard support
  menuToggle.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      document.activeElement === menuToggle
    ) {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Trap focus when open
  document.addEventListener("keydown", (e) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      e.key === "Tab"
    ) {
      const focusable = Array.from(navLinks.querySelectorAll("a"));
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});

// Toggle Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-times");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.toggle("fa-bars");
      menuToggle.querySelector("i").classList.toggle("fa-times");
    }

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Sticky Header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Pricing Toggle Switch
const toggleSwitch = document.querySelector(".toggle-switch input");
const monthlyPrices = [29, 79, 129];
const annualPrices = [23.2, 63.2, 103.2]; // 20% discount

toggleSwitch.addEventListener("change", function () {
  const prices = document.querySelectorAll(".price");

  if (this.checked) {
    prices.forEach((price, index) => {
      if (index < 3) {
        price.innerHTML = `$${annualPrices[index]}<span>/month</span>`;
      }
    });
  } else {
    prices.forEach((price, index) => {
      if (index < 3) {
        price.innerHTML = `$${monthlyPrices[index]}<span>/month</span>`;
      }
    });
  }
});

// Course Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    // Filter courses
    courseCards.forEach((card) => {
      if (filterValue === "all") {
        card.style.display = "block";
      } else {
        if (card.getAttribute("data-level") === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});

// Form Validation
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

// Animated Counters
const counters = document.querySelectorAll(".stat-number");
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
    element.textContent.replace("%", "").replace("+", "")
  );
  let count = 0;

  const interval = setInterval(() => {
    const increment = Math.ceil(target / speed);
    count += increment;

    if (count >= target) {
      count = target;
      clearInterval(interval);
    }

    element.textContent = element.textContent.includes("%")
      ? count + "%"
      : element.textContent.includes("+")
      ? count + "+"
      : count;
  }, 10);
}

// Typing Animation - Pure JavaScript
function createTypingAnimation() {
  const text = "Innovating Java Education for Tomorrow's Developers";
  const typingElement = document.getElementById("typingText");
  const cursorElement = document.getElementById("cursor");

  let currentIndex = 0;
  let isTyping = true;
  let typingSpeed = 100; // milliseconds
  let erasingSpeed = 50; // milliseconds
  let pauseTime = 2000; // pause after typing complete

  // Cursor blinking animation
  function blinkCursor() {
    setInterval(() => {
      cursorElement.style.opacity =
        cursorElement.style.opacity === "0" ? "1" : "0";
    }, 500);
  }

  // Start cursor blinking
  blinkCursor();

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

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", function () {
  createTypingAnimation();
});

// Enhanced Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Add preload class to prevent transitions on page load
  document.body.classList.add("preload");

  // Remove preload class after page loads
  setTimeout(() => {
    document.body.classList.remove("preload");
  }, 100);

  // Updated professional SVG Icons for theme toggle
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
    .addEventListener("change", function (e) {
      clearTimeout(systemThemeTimeout);
      systemThemeTimeout = setTimeout(() => {
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
          setInitialTheme();
        }
      }, 100);
    });

  // Enhanced page visibility handling for smooth experience
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      // Refresh theme when page becomes visible again
      setTimeout(setInitialTheme, 100);
    }
  });

  // Initialize theme and set up event listener
  setInitialTheme();
  themeToggle.addEventListener("click", toggleTheme);

  // Add keyboard support for accessibility
  themeToggle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  });
});
