/**
 * h·e·r collab — Global Shell
 * Injects shared chrome (buttons, nav, slideshow, footer) and
 * initialises theme + page-nav carousel behaviour.
 *
 * Each page MUST set data attributes on <body> before this script runs:
 *   data-page       — current page key (e.g. "index", "partners")
 *   data-next-page  — destination for the nav-toggle button (e.g. "partners.html")
 */
(function () {
  "use strict";

  /* ── SVG Icon Library ─────────────────────────────────────────── */

  const ICONS = {
    moon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',
    sun: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
    home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    partners: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8"/><path d="M16 5.13A4 4 0 0 1 18 9c0 1.42-.78 2.57-1.88 3.17"/></svg>',
    solutions: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
    investors: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-6 6-4-4-7 7"/><path d="M4 14v7"/></svg>',
    lock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  };

  const PAGE_ICONS = {
    index: ICONS.home,
    partners: ICONS.partners,
    solutions: ICONS.solutions,
    investors: ICONS.investors,
  };

  const PAGE_META = {
    "index.html":      { key: "index",      label: "Home" },
    "partners.html":   { key: "partners",    label: "Partners" },
    "solutions.html":  { key: "solutions",   label: "Solutions" },
    "investors.html":  { key: "investors",   label: "Investors" },
  };

  const PAGES = ["index.html", "partners.html", "solutions.html", "investors.html"];

  /* ── Helpers ──────────────────────────────────────────────────── */

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "html") e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }

  function currentPageFile() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function fadeNavigate(href) {
    document.body.style.transition = "opacity 0.25s ease";
    document.body.style.opacity = "0";
    setTimeout(function () { window.location.href = href; }, 250);
  }

  /* ── Detect if we're on a primary page ────────────────────────── */

  var currentFile = currentPageFile();
  var currentMeta = PAGE_META[currentFile];
  if (!currentMeta) return; // not a primary page — bail

  var nextDestination = document.body.getAttribute("data-next-page") || "partners.html";

  /* ── Inject Control Buttons ───────────────────────────────────── */

  // Theme toggle
  var themeBtn = el("button", {
    "class": "control-btn theme-toggle",
    id: "theme-toggle",
    type: "button",
    "aria-label": "Toggle theme",
    title: "Toggle theme",
  });
  themeBtn.innerHTML = ICONS.moon;
  document.body.insertBefore(themeBtn, document.body.firstChild);

  // Nav toggle — shows NEXT page icon
  var navBtn = el("button", {
    "class": "control-btn nav-toggle",
    id: "nav-toggle",
    type: "button",
    "aria-label": "Current page: " + currentMeta.label,
    title: "Current page: " + currentMeta.label,
  });
  // The nav toggle shows the CURRENT page icon (consistent with original)
  navBtn.innerHTML = PAGE_ICONS[currentMeta.key] || ICONS.home;
  document.body.insertBefore(navBtn, document.body.children[1]);

  // Asset toggle
  var assetBtn = el("button", {
    "class": "control-btn asset-toggle",
    id: "asset-toggle",
    type: "button",
    "aria-label": "Asset Airlock (restricted)",
    title: "Asset Airlock (restricted)",
  });
  assetBtn.innerHTML = ICONS.lock;
  document.body.appendChild(assetBtn);

  /* ── Inject Page Navigation ───────────────────────────────────── */

  var nav = el("nav", { "class": "page-nav", "aria-label": "Page navigation" });

  // Previous arrow
  var prevArrow = el("button", {
    "class": "page-nav-arrow",
    "data-dir": "-1",
    "aria-label": "Previous page",
    title: "Previous",
  });
  prevArrow.innerHTML = ICONS.chevronLeft;
  nav.appendChild(prevArrow);

  // Track
  var track = el("div", { "class": "page-nav-track" });
  var icons = el("div", { "class": "page-nav-icons" });

  PAGES.forEach(function (page) {
    var meta = PAGE_META[page];
    var a = el("a", {
      href: page,
      "aria-label": meta.label,
      html: PAGE_ICONS[meta.key],
    });
    if (page === currentFile) a.classList.add("active");
    icons.appendChild(a);
  });

  track.appendChild(icons);
  nav.appendChild(track);

  // Next arrow
  var nextArrow = el("button", {
    "class": "page-nav-arrow",
    "data-dir": "1",
    "aria-label": "Next page",
    title: "Next",
  });
  nextArrow.innerHTML = ICONS.chevronRight;
  nav.appendChild(nextArrow);

  document.body.insertBefore(nav, document.body.firstChild.nextSibling);

  /* ── Inject Background Slideshow ──────────────────────────────── */

  var slideshow = el("div", { "class": "bg-slideshow" });
  slideshow.appendChild(el("div", { "class": "bg-slide" }));
  slideshow.appendChild(el("div", { "class": "bg-slide" }));
  slideshow.appendChild(el("div", { "class": "bg-slide" }));
  document.body.insertBefore(slideshow, document.body.firstChild.nextSibling.nextSibling);

  var overlay = el("div", { "class": "bg-overlay-tint" });
  document.body.insertBefore(overlay, slideshow.nextSibling);

  /* ── Inject Footer ────────────────────────────────────────────── */

  var footerMap = {
    "index.html":     "Welcome & Brand Statement.",
    "partners.html":  "The Founding Partners.",
    "solutions.html": "Our Services for Clients and other Agencies.",
    "investors.html": "Our Services for Clients and other Agencies.",
  };

  var footerText = footerMap[currentFile] || "";
  // Footer is injected inside the showcase-tile by each page's own markup
  // (pages already have <footer> in their content). No global injection needed.

  /* ── Theme Logic ──────────────────────────────────────────────── */

  var themeKey = "theme-preference";
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function renderToggleIcon(theme) {
    themeBtn.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Light Mode" : "Dark Mode");
    themeBtn.setAttribute("title", theme === "dark" ? "Light Mode" : "Dark Mode");
  }

  function applyTheme(theme, persist) {
    document.body.dataset.theme = theme;
    renderToggleIcon(theme);
    if (persist) localStorage.setItem(themeKey, theme);
  }

  function resolveInitialTheme() {
    var saved = localStorage.getItem(themeKey);
    if (saved === "light" || saved === "dark") return saved;
    return prefersDark.matches ? "dark" : "light";
  }

  applyTheme(resolveInitialTheme());

  themeBtn.addEventListener("click", function () {
    var next = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
  });

  prefersDark.addEventListener("change", function (e) {
    if (!localStorage.getItem(themeKey)) applyTheme(e.matches ? "dark" : "light");
  });

  /* ── Nav Toggle ───────────────────────────────────────────────── */

  navBtn.addEventListener("click", function () {
    fadeNavigate(nextDestination);
  });

  /* ── Asset Toggle ─────────────────────────────────────────────── */

  assetBtn.addEventListener("click", function () {
    fadeNavigate("gatekeeper.html");
  });

  /* ── Page Nav Carousel IIFE ───────────────────────────────────── */

  (function () {
    var file = currentFile;
    var active = PAGES.indexOf(file);
    if (active < 0) active = 0;

    var originalLinks = Array.prototype.slice.call(icons.querySelectorAll("a"));
    var cloneCount = 2;
    var leadingClones = document.createDocumentFragment();
    originalLinks.slice(-cloneCount).forEach(function (link) {
      leadingClones.appendChild(link.cloneNode(true));
    });
    icons.insertBefore(leadingClones, icons.firstChild);
    originalLinks.slice(0, cloneCount).forEach(function (link) {
      icons.appendChild(link.cloneNode(true));
    });
    var links = icons.querySelectorAll("a");
    icons.style.setProperty("--page-nav-item-count", links.length);
    var arrows = document.querySelectorAll(".page-nav-arrow");
    var navigating = false;

    function centerActive(animate) {
      icons.classList.toggle("no-transition", !animate);
      links.forEach(function (l) {
        l.classList.toggle("active", PAGES.indexOf(l.getAttribute("href")) === active);
      });
      var slide = active + cloneCount - 1;
      icons.style.transform = "translateX(" + (-(slide * 100 / links.length)) + "%)";
      if (!animate) void icons.offsetHeight;
    }

    function navigateTo(i, visualSlide) {
      if (navigating) return;
      navigating = true;
      try {
        var target = ((i % PAGES.length) + PAGES.length) % PAGES.length;
        var direction = i > active ? 1 : -1;
        var slide = target + cloneCount - 1;
        if (active === PAGES.length - 1 && target === 0 && direction > 0) slide = links.length - 3;
        if (active === 0 && target === PAGES.length - 1 && direction < 0) slide = 0;
        if (typeof visualSlide === "number") slide = visualSlide;
        icons.classList.remove("no-transition");
        icons.style.transform = "translateX(" + (-(slide * 100 / links.length)) + "%)";
        links.forEach(function (l) {
          l.classList.toggle("active", PAGES.indexOf(l.getAttribute("href")) === target);
        });
        document.body.style.transition = "opacity 0.2s ease";
        document.body.style.opacity = "0";
        setTimeout(function () { window.location.href = PAGES[target]; }, 200);
      } catch (e) {
        navigating = false;
      }
      setTimeout(function () { navigating = false; }, 500);
    }

    arrows.forEach(function (btn) {
      btn.addEventListener("click", function () {
        navigateTo(active + parseInt(btn.dataset.dir));
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!window.matchMedia("(min-width: 769px)").matches) return;
      if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateTo(active + (event.key === "ArrowRight" ? 1 : -1));
      }
    });

    links.forEach(function (link, linkIndex) {
      link.addEventListener("click", function (event) {
        var target = PAGES.indexOf(link.getAttribute("href"));
        if (target < 0 || target === active) return;
        event.preventDefault();
        navigateTo(target, linkIndex - 1);
      });
    });

    /* ── Touch Swipe ─────────────────────────────────────────────── */

    var sx = 0, sy = 0, swiping = false, pageSwipe = false;

    // Allow pages to register exclusion zones (e.g. partner carousels)
    window.__shellSwipeExclusions = [];

    document.body.addEventListener("touchstart", function (e) {
      var inExclusion = window.__shellSwipeExclusions.some(function (sel) {
        return e.target.closest(sel);
      });
      pageSwipe = window.matchMedia("(max-width: 768px)").matches && !inExclusion;
      if (!pageSwipe) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      swiping = false;
    }, { passive: true });

    document.body.addEventListener("touchmove", function (e) {
      if (!pageSwipe) return;
      var dx = e.touches[0].clientX - sx;
      var dy = e.touches[0].clientY - sy;
      if (!swiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        swiping = true;
      }
      if (swiping) e.preventDefault();
    }, { passive: false });

    document.body.addEventListener("touchend", function (e) {
      if (!pageSwipe || !swiping) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 30) {
        navigateTo(active + (dx < 0 ? 1 : -1));
      }
      pageSwipe = false;
    }, { passive: true });

    centerActive(false);
  })();
})();
