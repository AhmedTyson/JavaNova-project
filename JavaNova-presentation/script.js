document.addEventListener("DOMContentLoaded", function () {
  // =============================================================================
  // UTILITY FUNCTIONS - Throttling and Debouncing
  // =============================================================================
  function throttle(func, wait) {
    let timeout,
      previous = 0;
    return function executedFunction(...args) {
      const now = Date.now();
      if (now - previous > wait) {
        func.apply(this, args);
        previous = now;
      }
    };
  }
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // =============================================================================
  // CORE SLIDE MANAGEMENT SYSTEM
  // =============================================================================
  const slides = document.querySelectorAll(".slide");
  const indicatorsContainer = document.getElementById("slideIndicators");
  const currentSlideDisplay = document.getElementById("currentSlide");
  const totalSlidesDisplay = document.getElementById("totalSlides");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");

  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  let isNavigating = false;

  if (totalSlidesDisplay) totalSlidesDisplay.textContent = totalSlides;

  function createIndicators() {
    if (!indicatorsContainer) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < totalSlides; i++) {
      const ind = document.createElement("div");
      ind.className = "indicator";
      if (i === 0) ind.classList.add("active");
      ind.addEventListener("click", () => goToSlide(i), { passive: true });
      frag.appendChild(ind);
    }
    indicatorsContainer.appendChild(frag);
  }

  const updateUI = debounce(() => {
    if (currentSlideDisplay)
      currentSlideDisplay.textContent = currentSlideIndex + 1;
    if (progressBar) {
      const pct =
        totalSlides > 1 ? (currentSlideIndex / (totalSlides - 1)) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    }
    document.querySelectorAll(".indicator").forEach((ind, i) => {
      ind.classList.toggle("active", i === currentSlideIndex);
    });
    if (prevBtn) {
      prevBtn.disabled = currentSlideIndex === 0;
      prevBtn.style.opacity = currentSlideIndex === 0 ? "0.3" : "1";
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlideIndex === totalSlides - 1;
      nextBtn.style.opacity =
        currentSlideIndex === totalSlides - 1 ? "0.3" : "1";
    }
  }, 50);

  function goToSlide(index, behavior = "smooth") {
    if (index < 0 || index >= totalSlides || isNavigating) return;
    isNavigating = true;
    currentSlideIndex = index;
    const target = slides[index];
    if (target)
      target.scrollIntoView({ behavior, block: "center", inline: "nearest" });
    updateUI();
    setTimeout(() => {
      isNavigating = false;
    }, 600);
  }

  // =============================================================================
  // NAVIGATION EVENT HANDLERS
  // =============================================================================
  if (prevBtn)
    prevBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
      },
      { passive: false }
    );
  if (nextBtn)
    nextBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        if (currentSlideIndex < totalSlides - 1)
          goToSlide(currentSlideIndex + 1);
      },
      { passive: false }
    );

  document.addEventListener(
    "keydown",
    (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      switch (e.key) {
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goToSlide(Math.max(currentSlideIndex - 1, 0));
          break;
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    },
    { passive: false }
  );

  // =============================================================================
  // MOBILE TOUCH NAVIGATION
  // =============================================================================
  let touchStartY = 0,
    touchStartTime = 0;
  const swipeThreshold = 50,
    maxSwipeTime = 300;
  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );
  document.addEventListener(
    "touchend",
    (e) => {
      const dist = touchStartY - e.changedTouches[0].screenY;
      const dt = Date.now() - touchStartTime;
      if (dt < maxSwipeTime && Math.abs(dist) > swipeThreshold) {
        if (dist > 0)
          goToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
        else goToSlide(Math.max(currentSlideIndex - 1, 0));
      }
    },
    { passive: true }
  );

  // =============================================================================
  // SCROLL DETECTION (IntersectionObserver)
  // =============================================================================
  const slideObserver = new IntersectionObserver(
    (entries) => {
      let mostVisible = null,
        maxRatio = 0;
      entries.forEach((ent) => {
        if (ent.intersectionRatio > maxRatio) {
          maxRatio = ent.intersectionRatio;
          mostVisible = ent.target;
        }
      });
      if (mostVisible && maxRatio > 0.5) {
        const idx = Array.from(slides).indexOf(mostVisible);
        if (idx !== -1 && idx !== currentSlideIndex) {
          currentSlideIndex = idx;
          updateUI();
        }
      }
    },
    { threshold: [0.1, 0.3, 0.5, 0.7, 0.9], rootMargin: "0px" }
  );
  slides.forEach((sl) => slideObserver.observe(sl));

  // =============================================================================
  // FULLSCREEN / F11 DETECTION & OPTIMIZATION
  // =============================================================================
  let isF11 = false;
  function setDynamicVH() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }
  function detectFullscreenMode() {
    const apiFS = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
    const fh = window.innerHeight,
      fw = window.innerWidth;
    const sh = screen.height,
      sw = screen.width;
    const prev = isF11;
    isF11 = fh >= sh - 30 && fw >= sw - 30 && !apiFS;
    if (isF11 !== prev) {
      document.body.classList.toggle("f11-detected", isF11);
      if (isF11) optimizeForFullscreen();
      else resetFullscreenOptimizations();
    }
  }
  function optimizeForFullscreen() {
    document.documentElement.style.scrollBehavior = "smooth";
    const nav = document.querySelector(".navigation-controls");
    if (nav) nav.style.padding = "0 clamp(2rem,4vw,6rem)";
    const ind = document.querySelector(".slide-indicators");
    if (ind) ind.style.bottom = "clamp(2rem,4vh,5rem)";
    document
      .querySelectorAll(".cosmic-background")
      .forEach((b) => (b.style.willChange = "transform"));
  }
  function resetFullscreenOptimizations() {
    const nav = document.querySelector(".navigation-controls");
    if (nav) nav.style.padding = "";
    const ind = document.querySelector(".slide-indicators");
    if (ind) ind.style.bottom = "";
    document
      .querySelectorAll(".cosmic-background")
      .forEach((b) => (b.style.willChange = "auto"));
  }
  const handleResize = debounce(() => {
    setDynamicVH();
    detectFullscreenMode();
  }, 150);

  // =============================================================================
  // ANIMATION SYSTEM (IntersectionObserver)
  // =============================================================================
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        const el = ent.target;
        if (ent.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.willChange = "transform, opacity";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          el.style.willChange = "auto";
        }
      });
    },
    { threshold: 0.15, rootMargin: "50px" }
  );

  function initializeAnimations() {
    const elems = document.querySelectorAll(`
            .floating-card, .step-card, .graduate-card, .stat-card,
            .feature-card, .team-card, .platform-mockup, .grid-item,
            .story-card, .milestone-card
        `);
    elems.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)";
      animationObserver.observe(el);
    });
  }

  // =============================================================================
  // BAR CHART ANIMATION
  // =============================================================================
  const barChartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          [
            { id: "bar-students", height: "250px", delay: 0 },
            { id: "bar-success", height: "200px", delay: 200 },
            { id: "bar-months", height: "150px", delay: 400 },
            { id: "bar-jobs", height: "230px", delay: 600 },
          ].forEach((bar) => {
            const elem = document.getElementById(bar.id);
            // corrected: add missing parentheses
            if (elem)
              setTimeout(() => (elem.style.height = bar.height), bar.delay);
          });
        } else {
          ["bar-students", "bar-success", "bar-months", "bar-jobs"].forEach(
            (id) => {
              const e = document.getElementById(id);
              if (e) e.style.height = "0";
            }
          );
        }
      });
    },
    { threshold: 0.3 }
  );
  const slide8 = document.getElementById("slide-8");
  if (slide8) barChartObserver.observe(slide8);

  // =============================================================================
  // CURSOR SYSTEM
  // =============================================================================
  function initializeCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    if (!cursor || !follower) return;
    const handleMouseMove = throttle((e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      follower.style.left = e.clientX + "px";
      follower.style.top = e.clientY + "px";
    }, 16);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener(
      "mousedown",
      () => cursor.classList.add("click"),
      { passive: true }
    );
    document.addEventListener(
      "mouseup",
      () => cursor.classList.remove("click"),
      { passive: true }
    );

    const selectors = `
            .feature-card, .floating-card, .step-card, .cta-button,
            .btn, .nav-btn, .indicator, .social-icon
        `;
    document.querySelectorAll(selectors).forEach((el) => {
      el.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add("hover");
          follower.classList.add("hover");
        },
        { passive: true }
      );
      el.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove("hover");
          follower.classList.remove("hover");
        },
        { passive: true }
      );
    });
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add("link");
          follower.classList.add("link");
        },
        { passive: true }
      );
      link.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove("link");
          follower.classList.remove("link");
        },
        { passive: true }
      );
    });
  }

  // =============================================================================
  // PROGRESS BAR (Throttled Scroll)
  // =============================================================================
  const updateProgressBar = throttle(() => {
    if (!progressBar) return;
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    requestAnimationFrame(() => {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    });
  }, 16);

  // =============================================================================
  // NAV-BTN IMPROVEMENT
  // =============================================================================
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = btn.dataset.target || btn.getAttribute("href");
        if (!target) return;
        const id = target.replace("#", "");
        const idx = Array.from(slides).findIndex((sl) => sl.id === id);
        if (idx >= 0) goToSlide(idx);
      },
      { passive: false }
    );
  });

  // =============================================================================
  // INITIALIZATION
  // =============================================================================
  function initialize() {
    createIndicators();
    updateUI();
    initializeAnimations();
    initializeCursor();
    setDynamicVH();
    detectFullscreenMode();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });
    window.addEventListener("scroll", updateProgressBar, { passive: true });
    [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ].forEach((evt) =>
      document.addEventListener(evt, detectFullscreenMode, { passive: true })
    );
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "F11") setTimeout(detectFullscreenMode, 100);
      },
      { passive: true }
    );
    console.log(
      "✅ JavaNova Presentation optimized and initialized successfully"
    );
  }

  initialize();

  // Team roles and responsibilities (excluding names)
  const teamRoles = [
    {
      role: "Design & Presentation Lead",
      responsibility:
        "Handles visual design, presentations, and brand consistency",
    },
    {
      role: "Java Research Specialist",
      responsibility:
        "Researched Java market demand and beginner-friendly projects",
    },
    {
      role: "Platform Strategy",
      responsibility:
        "Developed platform differentiation strategy and success stories",
    },
    {
      role: "Educational Methodology",
      responsibility:
        "Designed learning materials structure and educational content",
    },
    {
      role: "Founder & Vision Keeper",
      responsibility:
        "Academy founder, maintains mission and strategic direction",
    },
  ];
});
