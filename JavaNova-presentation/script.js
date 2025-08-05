document.addEventListener("DOMContentLoaded", function () {
  // Slide management
  const slides = document.querySelectorAll(".slide");
  const indicatorsContainer = document.getElementById("slideIndicators");
  const currentSlideDisplay = document.getElementById("currentSlide");
  const totalSlidesDisplay = document.getElementById("totalSlides");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  totalSlidesDisplay.textContent = totalSlides;

  // Create indicators
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (i === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
  }

  // Update UI
  function updateUI() {
    currentSlideDisplay.textContent = currentSlideIndex + 1;
    progressBar.style.width = `${
      (currentSlideIndex / (totalSlides - 1)) * 100
    }%`;

    // Update indicators
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
      if (index === currentSlideIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    // Update navigation buttons
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlideIndex = index;
    // center the slide in the viewport
    slides[index].scrollIntoView({ behavior: "smooth", block: "center" });
    updateUI();
  }

  // Navigation event listeners
  prevBtn.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "PageUp") {
      goToSlide(Math.max(currentSlideIndex - 1, 0));
    } else if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      goToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
    } else if (e.key === "Home") {
      goToSlide(0);
    } else if (e.key === "End") {
      goToSlide(totalSlides - 1);
    }
  });

  // Scroll detection → pick the slide whose midpoint is nearest viewport center
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (isScrolling) return;
    isScrolling = true;
    setTimeout(() => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const centerY = scrollY + vh / 2;
      let closest = 0,
        minDiff = Infinity;
      slides.forEach((sl, i) => {
        const top = sl.offsetTop;
        const mid = top + sl.offsetHeight / 2;
        const diff = Math.abs(centerY - mid);
        if (diff < minDiff) {
          minDiff = diff;
          closest = i;
        }
      });
      currentSlideIndex = closest;
      updateUI();
      isScrolling = false;
    }, 100);
  });

  // Initialize UI
  updateUI();

  // Animation reset function
  function resetElementAnimation(element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
  }

  // Animate elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        } else {
          // Reset animation when leaving viewport
          resetElementAnimation(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe elements for animation
  document
    .querySelectorAll(
      ".floating-card, .step-card, .graduate-card, .stat-card, .feature-card, .team-card, .platform-mockup, .grid-item, .story-card, .milestone-card"
    )
    .forEach((element) => {
      resetElementAnimation(element);
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(element);
    });

  // Animate bar chart
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate bars
          document.getElementById("bar-students").style.height = "250px";
          document.getElementById("bar-success").style.height = "200px";
          document.getElementById("bar-months").style.height = "150px";
          document.getElementById("bar-jobs").style.height = "230px";
        } else {
          // Reset bars when not in view
          document.getElementById("bar-students").style.height = "0";
          document.getElementById("bar-success").style.height = "0";
          document.getElementById("bar-months").style.height = "0";
          document.getElementById("bar-jobs").style.height = "0";
        }
      });
    },
    { threshold: 0.5 }
  );

  barObserver.observe(document.getElementById("slide-8"));

  // Cursor animation
  (function () {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      follower.style.left = e.clientX + "px";
      follower.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => cursor.classList.add("click"));
    document.addEventListener("mouseup", () =>
      cursor.classList.remove("click")
    );

    // hover on cards/buttons
    document
      .querySelectorAll(
        ".feature-card, .floating-card, .step-card, .cta-button, .btn"
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("hover");
          follower.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("hover");
          follower.classList.remove("hover");
        });
      });

    // links
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("link");
        follower.classList.add("link");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("link");
        follower.classList.remove("link");
      });
    });
  })();

  (function () {
    let isF11 = false,
      resizeTimer;

    // Set dynamic viewport height
    function setVH() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    }

    // Detect F11 (no Fullscreen API) vs API fullscreen
    function detectF11() {
      const was = isF11;
      const apiFS = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      isF11 =
        window.innerHeight >= screen.height - 10 &&
        window.innerWidth >= screen.width - 10 &&
        !apiFS;
      if (isF11 !== was) {
        document.body.classList.toggle("f11-detected", isF11);
        isF11 ? optimizeF11() : resetF11();
        console.log(`F11 ${isF11 ? "entered" : "exited"}`);
      }
    }

    function optimizeF11() {
      document.documentElement.style.scrollBehavior = "smooth";
      const nav = document.querySelector(".navigation-controls");
      if (nav) nav.style.padding = "0 clamp(2rem,4vw,6rem)";
      const ind = document.querySelector(".slide-indicators");
      if (ind) ind.style.bottom = "clamp(2rem,4vh,5rem)";
      document
        .querySelectorAll(".cosmic-background")
        .forEach((b) => (b.style.willChange = "transform"));
      document.querySelectorAll(".nova-burst").forEach((b) => {
        b.style.animationDuration = "2.5s";
      });
    }

    function resetF11() {
      const nav = document.querySelector(".navigation-controls");
      if (nav) nav.style.padding = "";
      const ind = document.querySelector(".slide-indicators");
      if (ind) ind.style.bottom = "";
      document
        .querySelectorAll(".cosmic-background")
        .forEach((b) => (b.style.willChange = ""));
    }

    // Debounced resize/orientation handler
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setVH();
        detectF11();
        window.dispatchEvent(new Event("scroll"));
      }, 150);
    }

    // PERFORMANCE OPTIMIZATIONS
    function optimizePerformance() {
      // IntersectionObserver for animations
      const obs = new IntersectionObserver(
        (e, s) => {
          e.forEach((ent) => {
            ent.target.style.willChange = ent.isIntersecting
              ? "transform,opacity"
              : "auto";
          });
        },
        { root: null, rootMargin: "20px", threshold: 0.1 }
      );
      document
        .querySelectorAll(".floating-card, .step-card, .cosmic-background")
        .forEach((el) => obs.observe(el));

      // Throttled scroll for progress bar
      let ticking = false;
      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            const pct =
              (window.scrollY /
                (document.body.scrollHeight - window.innerHeight)) *
              100;
            const bar = document.getElementById("progressBar");
            if (bar) bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
            ticking = false;
          });
          ticking = true;
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // (Optional) F11 performance monitor for debugging
    /*
    function monitor() {
      console.log('F11',document.body.classList.contains('f11-detected'),
                  'Win',window.innerWidth,'x',window.innerHeight);
    }
    setInterval(monitor,2000);
    */

    // INIT
    document.addEventListener("DOMContentLoaded", optimizePerformance);
    setVH();
    detectF11();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    document.addEventListener("fullscreenchange", detectF11);
    document.addEventListener("webkitfullscreenchange", detectF11);
    document.addEventListener("mozfullscreenchange", detectF11);
    document.addEventListener("MSFullscreenChange", detectF11);
    document.addEventListener("keydown", (e) => {
      if (e.key === "F11") setTimeout(detectF11, 100);
    });
  })();

  // Replace generic nav button handler with index-based navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.dataset.target || btn.getAttribute("href");
      if (!target) return;
      const slideId = target.replace("#", "");
      const idx = Array.from(slides).findIndex((sl) => sl.id === slideId);
      if (idx >= 0) goToSlide(idx);
    });
  });
});
