document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed - main.js is running"); // Debug: Confirm script execution

  // Mobile Menu Toggle
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");

  if (navToggle && navMenu) {
    console.log("Nav toggle and menu found"); // Debug
    navToggle.addEventListener("click", () => {
      console.log("Toggle clicked"); // Debug
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        console.log("Nav link clicked"); // Debug
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Reset menu on window resize (above md breakpoint)
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        console.log("Window resized above 768px"); // Debug
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  } else {
    console.error("Nav toggle or menu not found"); // Debug
  }

  // Sticky Header
  const header = document.querySelector(".header");
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
  }

  // Pricing Toggle with Fade-In Animation
  const pricingToggle = document.querySelector(".pricing-toggle input");
  const monthlyPrices = document.querySelectorAll(".price.monthly");
  const yearlyPrices = document.querySelectorAll(".price.yearly");

  if (pricingToggle) {
    pricingToggle.addEventListener("change", function () {
      // Update aria-checked for accessibility
      this.setAttribute("aria-checked", this.checked ? "true" : "false");

      if (this.checked) {
        monthlyPrices.forEach((price) => {
          price.classList.remove("visible");
          price.style.display = "none";
        });
        yearlyPrices.forEach((price) => {
          price.style.display = "block";
          setTimeout(() => price.classList.add("visible"), 10); // Delay for transition
        });
      } else {
        yearlyPrices.forEach((price) => {
          price.classList.remove("visible");
          price.style.display = "none";
        });
        monthlyPrices.forEach((price) => {
          price.style.display = "block";
          setTimeout(() => price.classList.add("visible"), 10); // Delay for transition
        });
      }
    });

    // Initialize monthly prices as visible
    monthlyPrices.forEach((price) => price.classList.add("visible"));
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const inputs = contactForm.querySelectorAll("input, textarea");

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
        if (input.type === "email" && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            valid = false;
            input.classList.add("error");
          }
        }
      });

      if (valid) {
        const formWrapper = contactForm.parentElement;
        const successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.textContent =
          "Thank you! Your message has been sent successfully.";
        formWrapper.innerHTML = "";
        formWrapper.appendChild(successMessage);
      }
    });
  }

  // Stats Count-Up Animation
  const countUp = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes("%");
    const isKPlus = element.textContent.includes("k+");
    const isPlus = element.textContent.includes("+") && !isKPlus;
    const update = () => {
      start += increment;
      if (isPercentage) {
        element.textContent = `${Math.min(start, target).toFixed(1)}%`;
      } else if (isKPlus) {
        element.textContent = `${Math.min(Math.round(start), target)}k+`;
      } else if (isPlus) {
        element.textContent = `${Math.min(Math.round(start), target)}+`;
      } else {
        element.textContent = Math.min(Math.round(start), target);
      }
      if (start < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const statsNumbers = document.querySelectorAll(".stats__number[data-count]");
  const statsSection = document.querySelector(".stats");
  let animated = false;

  if (statsSection && statsNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          statsNumbers.forEach((num) => {
            const target = parseFloat(num.getAttribute("data-count"));
            countUp(num, target, 2000); // 2-second animation
          });
          animated = true;
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }

  // Locations Tooltip Toggle for Mobile
  const locationPoints = document.querySelectorAll(".locations__point");
  locationPoints.forEach((point) => {
    point.addEventListener("click", (e) => {
      const tooltip = point.querySelector(".locations__tooltip");
      const isVisible = tooltip.style.opacity === "1";
      locationPoints.forEach((p) => {
        p.querySelector(".locations__tooltip").style.opacity = "0";
        p.querySelector(".locations__tooltip").style.visibility = "hidden";
        p.querySelector(".locations__tooltip").style.transform =
          "translateX(-50%) translateY(-25px)";
      });
      if (!isVisible) {
        tooltip.style.opacity = "1";
        tooltip.style.visibility = "visible";
        tooltip.style.transform = "translateX(-50%) translateY(-35px)";
      }
      e.stopPropagation();
    });
  });

  // Close tooltips when clicking elsewhere
  document.addEventListener("click", () => {
    locationPoints.forEach((point) => {
      point.querySelector(".locations__tooltip").style.opacity = "0";
      point.querySelector(".locations__tooltip").style.visibility = "hidden";
      point.querySelector(".locations__tooltip").style.transform =
        "translateX(-50%) translateY(-25px)";
    });
  });
});
