(function () {
  const config = window.SITE_CONFIG || {};
  const year = new Date().getFullYear();
  const pathPrefix = document.body?.dataset.pathPrefix || "";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function phoneHref() {
    return `tel:${config.phone || ""}`;
  }

  function mailHref() {
    return `mailto:${config.email || ""}`;
  }

  function hydrateConfigTargets(root = document) {
    const fullAddress = [config.addressLine1, config.addressLine2].filter(Boolean).join(", ");
    const renderBrandWordmark = (el, name) => {
      const parts = String(name || "").trim().split(/\s+/);
      const descriptor = parts.length > 1 ? parts.pop() : "";
      const primary = parts.join(" ") || name || "";
      el.innerHTML = descriptor
        ? `<span class="brand-name-main">${primary}</span><span class="brand-name-sub">${descriptor}</span>`
        : `<span class="brand-name-main">${primary}</span>`;
    };
    const values = {
      companyName: config.companyName,
      companyLegalName: config.companyLegalName,
      companyId: config.companyId,
      companyAddress: fullAddress,
      phoneText: config.phoneDisplay,
      emailText: config.email,
      websiteText: config.website,
      ctaPrimary: config.ctaPrimary,
      footerTextPrimary: config.footerTextPrimary,
      footerTextSecondary: config.footerTextSecondary,
      disclaimerShort: config.disclaimerShort,
      disclaimerFull: config.disclaimerFull,
      footerDisclaimer: config.footerDisclaimer,
      serviceArea: config.serviceArea,
      businessHours: config.businessHours,
      copyrightLine: `${year} ${config.companyName}. ${config.copyrightLine}`,
      ctaSecondary: config.ctaSecondary,
      year
    };

    Object.entries(values).forEach(([key, value]) => {
      $$(`[data-${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}]`, root).forEach((el) => {
        if (key === "companyName" && el.closest(".brand")) {
          renderBrandWordmark(el, value);
          return;
        }
        el.textContent = value || "";
      });
    });

    $$("[data-phone-link]", root).forEach((el) => el.setAttribute("href", phoneHref()));
    $$("[data-email-link]", root).forEach((el) => el.setAttribute("href", mailHref()));
    $$("[data-website-link]", root).forEach((el) => el.setAttribute("href", config.websiteUrl || "#"));
    $$("[data-phone-label]", root).forEach((el) => el.textContent = config.phoneButtonLabel || config.phoneDisplay || "");

    if (document.title.includes("Company")) {
      document.title = document.title.replace("Company", config.companyName || "Siding Company");
    }
  }

  function bindNavigation() {
    const header = $(".site-header");
    const drawer = $(".mobile-drawer");
    const toggle = $(".menu-toggle");
    const close = $(".menu-close");
    const accordion = $(".mobile-accordion");

    window.addEventListener("scroll", () => {
      header?.classList.toggle("is-sticky", window.scrollY > 60);
      updateScrollProgress();
    }, { passive: true });

    function openDrawer() {
      drawer?.classList.add("is-open");
      drawer?.setAttribute("aria-hidden", "false");
      toggle?.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
    }

    function closeDrawer() {
      drawer?.classList.remove("is-open");
      drawer?.setAttribute("aria-hidden", "true");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
    }

    toggle?.addEventListener("click", openDrawer);
    close?.addEventListener("click", closeDrawer);
    drawer?.addEventListener("click", (event) => {
      if (event.target === drawer) closeDrawer();
    });
    accordion?.addEventListener("click", () => {
      const expanded = accordion.getAttribute("aria-expanded") === "true";
      accordion.setAttribute("aria-expanded", String(!expanded));
      $(".mobile-service-list")?.classList.toggle("is-open", !expanded);
    });
  }

  function bindCookieBanner() {
    const key = `${(config.companyName || "site").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cookie-choice`;
    if (localStorage.getItem(key)) return;
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <p>We use essential cookies and basic analytics-style storage to improve this siding website. Read the <a href="${pathPrefix}cookie-policy.html">Cookie Policy</a>.</p>
      <div>
        <button class="btn btn-outline" type="button" data-cookie-decline>Decline</button>
        <button class="btn btn-primary" type="button" data-cookie-accept>Accept</button>
      </div>
    `;
    document.body.append(banner);
    $("[data-cookie-accept]", banner).addEventListener("click", () => {
      localStorage.setItem(key, "accepted");
      banner.remove();
    });
    $("[data-cookie-decline]", banner).addEventListener("click", () => {
      localStorage.setItem(key, "declined");
      banner.remove();
    });
  }

  function bindContactForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = $(".form-success", form.parentElement);
      if (message) {
        message.textContent = `${config.formSuccessPrefix} ${config.companyName}. ${config.formSuccessSuffix} ${config.email}.`;
        message.hidden = false;
      }
      form.reset();
    });
  }

  function bindReveals() {
    const reveals = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  }

  function bindCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    const animate = (el) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1200;
      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function updateScrollProgress() {
    const button = $(".scroll-top");
    if (!button) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    button.style.setProperty("--progress", `${Math.round(progress * 100)}%`);
    button.classList.toggle("is-visible", window.scrollY > 420);
  }

  function bindScrollTop() {
    const button = document.createElement("button");
    button.className = "scroll-top";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = `<i data-lucide="arrow-up"></i>`;
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.append(button);
  }

  function bindImageTilt() {
    $$(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
        card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function bindFaqAnimation() {
    $$(".footer-faq-list details").forEach((details) => {
      const summary = $("summary", details);
      if (!summary) return;

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        const isOpen = details.open;
        const startHeight = `${details.offsetHeight}px`;

        if (isOpen) {
          details.style.height = startHeight;
          requestAnimationFrame(() => {
            details.style.height = `${summary.offsetHeight}px`;
          });
          details.addEventListener("transitionend", function close() {
            details.open = false;
            details.style.height = "";
            details.removeEventListener("transitionend", close);
          });
          return;
        }

        details.open = true;
        details.style.height = startHeight;
        const endHeight = `${details.scrollHeight}px`;
        requestAnimationFrame(() => {
          details.style.height = endHeight;
        });
        details.addEventListener("transitionend", function open() {
          details.style.height = "";
          details.removeEventListener("transitionend", open);
        });
      });
    });
  }

  function bindServiceCarousel() {
    const carousel = $("[data-service-carousel]");
    if (!carousel) return;
    const prev = $("[data-carousel-prev]");
    const next = $("[data-carousel-next]");
    const slide = $(".service-slide", carousel);
    const step = () => (slide?.getBoundingClientRect().width || 320) + 18;

    prev?.addEventListener("click", () => {
      carousel.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next?.addEventListener("click", () => {
      carousel.scrollBy({ left: step(), behavior: "smooth" });
    });
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") carousel.scrollBy({ left: -step(), behavior: "smooth" });
      if (event.key === "ArrowRight") carousel.scrollBy({ left: step(), behavior: "smooth" });
    });
  }

  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateConfigTargets();
    bindNavigation();
    bindScrollTop();
    bindCookieBanner();
    bindContactForm();
    bindReveals();
    bindCounters();
    bindImageTilt();
    bindFaqAnimation();
    bindServiceCarousel();
    initIcons();
    updateScrollProgress();
  });
})();
