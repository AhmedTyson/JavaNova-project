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
    slides[index].scrollIntoView({ behavior: "smooth" });
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

  // Scroll detection
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < slides.length; i++) {
        const slideTop = slides[i].offsetTop;
        const slideBottom = slideTop + slides[i].offsetHeight;

        if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
          currentSlideIndex = i;
          updateUI();
          break;
        }
      }

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
});
