/* ==========================================================================
   Azzaouia Resort — Main JavaScript
   Vanilla JS, no dependencies. Depends on js/config.js and js/i18n.js.
   ========================================================================== */

(function () {
  "use strict";

  var $ = function (id) {
    return document.getElementById(id);
  };

  var isRTL = function () {
    return I18N.dir() === "rtl";
  };

  /* ---------- Loading Screen ---------- */
  var loader = $("loader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (loader) loader.classList.add("is-hidden");
    }, 600);
  });

  /* ---------- Scroll Progress · Sticky Nav · Back to Top ---------- */
  var scrollProgress = $("scrollProgress");
  var navbar = $("navbar");
  var backToTop = $("backToTop");

  function onScroll() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + "%";

    if (navbar) navbar.classList.toggle("is-scrolled", scrollTop > 40);
    if (backToTop) backToTop.classList.toggle("is-visible", scrollTop > 500);

    updateActiveNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mobile Hamburger Menu ---------- */
  var hamburger = $("hamburger");
  var navMenu = $("navMenu");

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Dark / Light Mode ---------- */
  var themeToggle = $("themeToggle");
  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem("hotel-theme");
  } catch (e) {
    storedTheme = null;
  }

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("hotel-theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ---------- Language switcher ---------- */
  var langSwitch = $("langSwitch");
  var langToggle = $("langToggle");
  var langMenu = $("langMenu");
  var langCurrent = $("langCurrent");

  function closeLangMenu() {
    if (!langSwitch) return;
    langSwitch.classList.remove("is-open");
    langToggle.setAttribute("aria-expanded", "false");
  }

  if (langSwitch && langToggle && langMenu) {
    langToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = langSwitch.classList.toggle("is-open");
      langToggle.setAttribute("aria-expanded", String(isOpen));
    });

    langMenu.querySelectorAll(".lang__option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        I18N.set(btn.getAttribute("data-lang"));
        closeLangMenu();
      });
    });

    document.addEventListener("click", function (e) {
      if (!langSwitch.contains(e.target)) closeLangMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  function refreshLangUI(lang) {
    if (langCurrent) langCurrent.textContent = I18N.LANGS[lang].label;
    if (langMenu) {
      langMenu.querySelectorAll(".lang__option").forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
      });
    }
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  var revealObserver = null;

  function observeReveal(el) {
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  }

  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute("data-delay") || 0;
            entry.target.style.setProperty("--reveal-delay", delay + "ms");
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
  }

  document.querySelectorAll(".reveal").forEach(observeReveal);

  /* ---------- Animated Counters ---------- */
  var counters = document.querySelectorAll("[data-counter]");

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-counter"), 10);
    var duration = 1800;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-counter");
    });
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__link");

  function updateActiveNav() {
    var currentId = "";
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + currentId);
    });
  }

  /* ======================================================================
     Reservation — every booking button in the page routes through here
     ====================================================================== */

  var reservationToast = $("reservationToast");
  var toastTimer = null;

  window.showReservationNotice = function () {
    if (!reservationToast) return;
    reservationToast.hidden = false;
    reservationToast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      reservationToast.classList.remove("is-visible");
      setTimeout(function () {
        reservationToast.hidden = true;
      }, 400);
    }, 5000);
  };

  /* Collects what the visitor has already chosen in the hero search form. */
  function currentSearchParams(roomType) {
    var params = { lang: I18N.get() };
    if (bookingData.checkin) params.checkin = bookingData.checkin;
    if (bookingData.checkout) params.checkout = bookingData.checkout;
    if (bookingData.adults) params.adults = bookingData.adults;
    if (bookingData.children && bookingData.children !== "0") {
      params.children = bookingData.children;
      if (bookingData.childAges.length) params.childAges = bookingData.childAges;
    }
    if (roomType) params.roomType = roomType;
    return params;
  }

  /* Any element carrying data-reserve opens Nozoul.
     data-room-type="…" is forwarded to the engine when present. */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest ? e.target.closest("[data-reserve]") : null;
    if (!trigger) return;
    e.preventDefault();
    Reservation.open(currentSearchParams(trigger.getAttribute("data-room-type")));
  });

  /* ======================================================================
     Accommodation — cards + detail modal, rendered from ACCOMMODATIONS
     ====================================================================== */

  var accGrid = $("accommodationGrid");
  var stayModal = $("stayModal");
  var stayModalBody = $("stayModalBody");
  var lastFocusedBeforeModal = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Card and thumbnail strip use the light 900px files; the large view uses
     the 1600px original. */
  function cardImage(item) {
    return (item.thumbs && item.thumbs[0]) || item.images[0];
  }

  function thumbImage(item, i) {
    return (item.thumbs && item.thumbs[i]) || item.images[i];
  }

  function renderAccommodationCards() {
    if (!accGrid) return;
    accGrid.innerHTML = "";

    ACCOMMODATIONS.forEach(function (item, index) {
      var name = I18N.pick(item.name);
      var article = document.createElement("article");
      article.className = "stay-card reveal";
      article.setAttribute("data-reveal", "fade-up");
      article.setAttribute("data-delay", String(index * 80));
      article.setAttribute("data-stay-id", item.id);

      article.innerHTML =
        '<div class="stay-card__media">' +
          '<img src="' + escapeHtml(cardImage(item)) + '" alt="' + escapeHtml(name) + '" loading="lazy" width="800" height="600" />' +
          '<span class="stay-card__tag">' + escapeHtml(I18N.pick(item.tag)) + "</span>" +
        "</div>" +
        '<div class="stay-card__body">' +
          '<h3 class="stay-card__title">' + escapeHtml(name) + "</h3>" +
          '<p class="stay-card__desc">' + escapeHtml(I18N.pick(item.short)) + "</p>" +
          '<ul class="stay-card__facts">' +
            '<li><span class="stay-card__fact-label">' + escapeHtml(I18N.t("acc.capacity")) + "</span>" +
            '<span class="stay-card__fact-value">' + escapeHtml(I18N.pick(item.capacity)) + "</span></li>" +
            '<li><span class="stay-card__fact-label">' + escapeHtml(I18N.t("acc.from")) + "</span>" +
            '<span class="stay-card__fact-value stay-card__price"><bdi>' + item.price + " MAD</bdi> " +
            '<em>' + escapeHtml(I18N.t("acc.perNight")) + "</em></span></li>" +
          "</ul>" +
          '<div class="stay-card__actions">' +
            '<button type="button" class="btn btn--ghost stay-card__more" data-stay-open="' + escapeHtml(item.id) + '">' +
              escapeHtml(I18N.t("cta.discover")) +
            "</button>" +
            '<button type="button" class="btn btn--gold" data-reserve data-room-type="' + escapeHtml(item.id) + '">' +
              escapeHtml(I18N.t("cta.book")) +
            "</button>" +
          "</div>" +
        "</div>";

      accGrid.appendChild(article);
      observeReveal(article);
    });
  }

  function findStay(id) {
    for (var i = 0; i < ACCOMMODATIONS.length; i++) {
      if (ACCOMMODATIONS[i].id === id) return ACCOMMODATIONS[i];
    }
    return null;
  }

  function listBlock(titleKey, items) {
    if (!items || !items.length) return "";
    return (
      '<div class="stay-detail__block">' +
        "<h4>" + escapeHtml(I18N.t(titleKey)) + "</h4>" +
        "<ul>" +
          items.map(function (line) {
            return "<li>" + escapeHtml(line) + "</li>";
          }).join("") +
        "</ul>" +
      "</div>"
    );
  }

  function openStayModal(id) {
    var item = findStay(id);
    if (!item || !stayModal || !stayModalBody) return;

    var name = I18N.pick(item.name);
    var thumbs = item.images.length > 1
      ? '<div class="stay-detail__thumbs">' +
          item.images.map(function (src, i) {
            return '<button type="button" class="stay-detail__thumb' + (i === 0 ? " is-active" : "") +
              '" data-stay-image="' + escapeHtml(src) + '">' +
              '<img src="' + escapeHtml(thumbImage(item, i)) + '" alt="" loading="lazy" /></button>';
          }).join("") +
        "</div>"
      : "";

    stayModalBody.innerHTML =
      '<div class="stay-detail">' +
        '<div class="stay-detail__media">' +
          '<img id="stayDetailImage" src="' + escapeHtml(item.images[0]) + '" alt="' + escapeHtml(name) + '" />' +
          thumbs +
        "</div>" +
        '<div class="stay-detail__content">' +
          '<span class="stay-detail__tag">' + escapeHtml(I18N.pick(item.tag)) + "</span>" +
          '<h3 class="stay-detail__title" id="stayModalTitle">' + escapeHtml(name) + "</h3>" +
          '<p class="stay-detail__desc">' + escapeHtml(I18N.pick(item.long)) + "</p>" +
          '<dl class="stay-detail__specs">' +
            "<div><dt>" + escapeHtml(I18N.t("acc.capacity")) + "</dt><dd>" + escapeHtml(I18N.pick(item.capacity)) + "</dd></div>" +
            "<div><dt>" + escapeHtml(I18N.t("acc.from")) + "</dt><dd><bdi>" + item.price + " MAD</bdi> " +
              escapeHtml(I18N.t("acc.perNight")) + "</dd></div>" +
          "</dl>" +
          listBlock("acc.rates", I18N.pick(item.rates)) +
          listBlock("acc.goodToKnow", I18N.pick(item.notes)) +
          '<button type="button" class="btn btn--gold btn--block stay-detail__book" data-reserve data-room-type="' +
            escapeHtml(item.id) + '">' + escapeHtml(I18N.t("cta.book")) + "</button>" +
        "</div>" +
      "</div>";

    lastFocusedBeforeModal = document.activeElement;
    stayModal.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(function () {
      stayModal.classList.add("is-open");
    });
    var closeBtn = $("stayModalClose");
    if (closeBtn) closeBtn.focus();
  }

  function closeStayModal() {
    if (!stayModal || stayModal.hidden) return;
    stayModal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(function () {
      stayModal.hidden = true;
      stayModalBody.innerHTML = "";
    }, 280);
    if (lastFocusedBeforeModal && lastFocusedBeforeModal.focus) lastFocusedBeforeModal.focus();
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest) return;

    var opener = e.target.closest("[data-stay-open]");
    if (opener) {
      openStayModal(opener.getAttribute("data-stay-open"));
      return;
    }

    if (e.target.closest("[data-close-modal]")) {
      closeStayModal();
      return;
    }

    var thumb = e.target.closest("[data-stay-image]");
    if (thumb) {
      var main = $("stayDetailImage");
      if (main) main.src = thumb.getAttribute("data-stay-image");
      stayModalBody.querySelectorAll(".stay-detail__thumb").forEach(function (t) {
        t.classList.remove("is-active");
      });
      thumb.classList.add("is-active");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeStayModal();
  });

  /* ======================================================================
     Gallery filters + Lightbox
     ====================================================================== */

  var galleryFilters = document.querySelectorAll(".gallery__filter");
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));

  galleryFilters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      var category = this.getAttribute("data-filter");

      galleryFilters.forEach(function (f) {
        f.classList.remove("is-active");
        f.setAttribute("aria-selected", "false");
      });
      this.classList.add("is-active");
      this.setAttribute("aria-selected", "true");

      galleryItems.forEach(function (item) {
        var show = category === "all" || item.getAttribute("data-category") === category;
        item.classList.toggle("is-hidden", !show);
      });
      applyGalleryLimit();
    });
  });

  /* Show only the first GALLERY_MAX photos of the current filter; the last
     visible tile gets a "+N" overlay and opens the lightbox with the rest. */
  var GALLERY_MAX = 6;
  function applyGalleryLimit() {
    var matching = galleryItems.filter(function (item) {
      return !item.classList.contains("is-hidden");
    });
    galleryItems.forEach(function (item) {
      item.classList.remove("is-more");
      var old = item.querySelector(".gallery__more");
      if (old) old.remove();
    });
    matching.forEach(function (item, i) {
      if (i >= GALLERY_MAX) item.classList.add("is-more");
    });
    var extra = matching.length - GALLERY_MAX;
    if (extra > 0) {
      var last = matching[GALLERY_MAX - 1];
      var badge = document.createElement("span");
      badge.className = "gallery__more";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = "+" + extra;
      last.appendChild(badge);
    }
  }
  applyGalleryLimit();

  var lightbox = $("lightbox");
  var lightboxImg = $("lightboxImg");
  var lightboxCaption = $("lightboxCaption");
  var lightboxCounter = $("lightboxCounter");
  var lightboxClose = $("lightboxClose");
  var lightboxPrev = $("lightboxPrev");
  var lightboxNext = $("lightboxNext");

  var currentLightboxIndex = 0;
  var visibleGalleryItems = [];

  function getVisibleItems() {
    return galleryItems.filter(function (item) {
      return !item.classList.contains("is-hidden");
    });
  }

  function showLightboxImage() {
    var item = visibleGalleryItems[currentLightboxIndex];
    if (!item) return;
    var img = item.querySelector("img");
    var caption = item.querySelector("figcaption");

    lightboxImg.src = item.getAttribute("data-src") || img.src;
    lightboxImg.alt = img.alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption ? caption.textContent : "";
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentLightboxIndex + 1) + " / " + visibleGalleryItems.length;
    }
  }

  /* `item` is the clicked figure — the index is resolved against the
     currently visible set, so filters and the lightbox stay in sync. */
  function openLightbox(item) {
    visibleGalleryItems = getVisibleItems();
    var index = visibleGalleryItems.indexOf(item);
    if (index === -1) return;
    currentLightboxIndex = index;
    showLightboxImage();
    lightbox.hidden = false;
    requestAnimationFrame(function () {
      lightbox.classList.add("is-open");
    });
    document.body.classList.add("is-locked");
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(function () {
      lightbox.hidden = true;
    }, 260);
  }

  function stepLightbox(delta) {
    if (!visibleGalleryItems.length) return;
    currentLightboxIndex =
      (currentLightboxIndex + delta + visibleGalleryItems.length) % visibleGalleryItems.length;
    showLightboxImage();
  }

  galleryItems.forEach(function (item) {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("click", function () {
      openLightbox(item);
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (lightbox) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", function () {
      stepLightbox(1);
    });
    lightboxPrev.addEventListener("click", function () {
      stepLightbox(-1);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox__figure")) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      /* Arrow keys follow reading direction in RTL */
      if (e.key === "ArrowRight") stepLightbox(isRTL() ? -1 : 1);
      if (e.key === "ArrowLeft") stepLightbox(isRTL() ? 1 : -1);
    });

    /* Touch swipe on mobile */
    var touchStartX = 0;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) < 45) return;
      stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ======================================================================
     Contact form (frontend only)
     ====================================================================== */

  var contactForm = $("contactForm");
  var formStatus = $("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("name").value.trim();
      var email = $("email").value.trim();

      if (!name || !email) {
        formStatus.textContent = I18N.t("ctc.errFields");
        formStatus.className = "form__status is-error";
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = I18N.t("ctc.errEmail");
        formStatus.className = "form__status is-error";
        return;
      }

      formStatus.textContent = I18N.t("ctc.ok");
      formStatus.className = "form__status is-success";
      contactForm.reset();
    });
  }

  /* ======================================================================
     Hero booking card
     ====================================================================== */

  var hbCheckin = $("hb-checkin");
  var hbCheckout = $("hb-checkout");
  var hbAdults = $("hb-adults");
  var hbChildren = $("hb-children");
  var hbChildAgesWrap = $("hb-childAges");
  var hbChildAgesGrid = $("hb-childAgesGrid");
  var hbBookNow = $("hb-bookNow");
  var hbStatus = $("hb-status");

  var hbSumCheckin = $("hb-sum-checkin");
  var hbSumCheckout = $("hb-sum-checkout");
  var hbSumAdults = $("hb-sum-adults");
  var hbSumChildren = $("hb-sum-children");
  var hbSumAges = $("hb-sum-ages");

  var bookingData = {
    checkin: "",
    checkout: "",
    adults: "2",
    children: "0",
    childAges: []
  };

  function hbTodayStr() {
    var d = new Date();
    return d.getFullYear() +
      "-" + ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" + ("0" + d.getDate()).slice(-2);
  }

  /* Guest selects are built in JS so their labels follow the language. */
  function buildGuestSelects() {
    if (!hbAdults || !hbChildren) return;
    var keptAdults = hbAdults.value || "2";
    var keptChildren = hbChildren.value || "0";

    var adultsHtml = "";
    for (var a = 1; a <= 6; a++) {
      adultsHtml += '<option value="' + a + '">' +
        (a === 1 ? I18N.t("booking.adultOne") : a + " " + I18N.t("booking.adultMany")) +
        "</option>";
    }
    hbAdults.innerHTML = adultsHtml;
    hbAdults.value = keptAdults;

    var childrenHtml = '<option value="0">' + I18N.t("booking.childZero") + "</option>";
    for (var c = 1; c <= 6; c++) {
      childrenHtml += '<option value="' + c + '">' +
        (c === 1 ? I18N.t("booking.childOne") : c + " " + I18N.t("booking.childMany")) +
        "</option>";
    }
    hbChildren.innerHTML = childrenHtml;
    hbChildren.value = keptChildren;
  }

  function hbBuildAgeOptions() {
    var opts = '<option value="0">' + I18N.t("booking.ageUnder1") + "</option>";
    for (var a = 1; a <= 12; a++) {
      opts += '<option value="' + a + '">' + a + " " +
        (a === 1 ? I18N.t("booking.yearOne") : I18N.t("booking.yearMany")) + "</option>";
    }
    return opts;
  }

  function hbRenderChildAges() {
    if (!hbChildAgesGrid) return;
    var count = parseInt(hbChildren.value, 10) || 0;
    var previous = getChildAges();
    hbChildAgesGrid.innerHTML = "";

    if (count > 0) {
      hbChildAgesWrap.hidden = false;
      for (var i = 1; i <= count; i++) {
        var item = document.createElement("div");
        item.className = "hero-booking__age-item";
        item.innerHTML =
          '<label for="hb-childAge' + i + '">' + I18N.t("booking.childAge") + " " + i + "</label>" +
          '<select id="hb-childAge' + i + '" name="hb-childAge' + i + '">' + hbBuildAgeOptions() + "</select>";
        hbChildAgesGrid.appendChild(item);

        /* keep any age the visitor had already picked */
        if (previous[i - 1] !== undefined) {
          var sel = item.querySelector("select");
          sel.value = String(previous[i - 1]);
        }
      }
    } else {
      hbChildAgesWrap.hidden = true;
    }
    updateSummary();
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    var parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    var d = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
    try {
      return d.toLocaleDateString(I18N.LANGS[I18N.get()].locale, {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  }

  function getChildAges() {
    var count = parseInt(hbChildren ? hbChildren.value : "0", 10) || 0;
    var ages = [];
    for (var i = 1; i <= count; i++) {
      var sel = $("hb-childAge" + i);
      if (sel) ages.push(parseInt(sel.value, 10));
    }
    return ages;
  }

  function agesToLabels(ages) {
    if (!ages || !ages.length) return "—";
    return ages.map(function (a) {
      if (a === 0) return I18N.t("booking.ageUnder1");
      return a + " " + (a === 1 ? I18N.t("booking.yearOne") : I18N.t("booking.yearMany"));
    }).join(", ");
  }

  function updateSummary() {
    if (!hbCheckin) return;
    var childrenVal = parseInt(hbChildren.value, 10) || 0;

    bookingData.checkin = hbCheckin.value;
    bookingData.checkout = hbCheckout.value;
    bookingData.adults = hbAdults.value;
    bookingData.children = String(childrenVal);
    bookingData.childAges = getChildAges();

    hbSumCheckin.textContent = formatDate(bookingData.checkin);
    hbSumCheckout.textContent = formatDate(bookingData.checkout);
    hbSumAdults.textContent = bookingData.adults;
    hbSumChildren.textContent = bookingData.children;
    hbSumAges.textContent = childrenVal > 0 ? agesToLabels(bookingData.childAges) : "—";
  }

  if (hbCheckin) {
    hbCheckin.min = hbTodayStr();
    hbCheckin.addEventListener("change", function () {
      if (hbCheckin.value) {
        hbCheckout.min = hbCheckin.value;
        if (hbCheckout.value && hbCheckout.value <= hbCheckin.value) hbCheckout.value = "";
      }
      updateSummary();
    });

    hbCheckout.addEventListener("change", updateSummary);
    hbAdults.addEventListener("change", updateSummary);
    hbChildren.addEventListener("change", hbRenderChildAges);

    hbChildAgesGrid.addEventListener("change", function (e) {
      if (e.target && e.target.tagName === "SELECT") updateSummary();
    });
  }

  /* Hero search "Réserver" — validates, then opens Nozoul with the dates. */
  if (hbBookNow) {
    hbBookNow.addEventListener("click", function () {
      updateSummary();

      if (!bookingData.checkin || !bookingData.checkout) {
        hbStatus.textContent = I18N.t("booking.errDates");
        hbStatus.className = "hero-booking__status is-error";
        return;
      }

      if (bookingData.checkout <= bookingData.checkin) {
        hbStatus.textContent = I18N.t("booking.errOrder");
        hbStatus.className = "hero-booking__status is-error";
        return;
      }

      var opened = Reservation.open(currentSearchParams());
      hbStatus.textContent = opened ? I18N.t("booking.opening") : I18N.t("booking.notConfigured");
      hbStatus.className = "hero-booking__status " + (opened ? "is-success" : "is-error");
    });
  }

  /* ---------- Footer Year ---------- */
  var yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ======================================================================
     Language boot — everything language-dependent re-renders here
     ====================================================================== */

  I18N.onChange(function (lang) {
    refreshLangUI(lang);
    buildGuestSelects();
    hbRenderChildAges();
    renderAccommodationCards();
    if (stayModal && !stayModal.hidden) closeStayModal();
    /* status messages are stale in the new language */
    if (hbStatus) hbStatus.textContent = "";
    if (formStatus) formStatus.textContent = "";
    updateActiveNav();
  });

  I18N.set(I18N.detect());

  /* ---------- Initial scroll call ---------- */
  onScroll();
})();
