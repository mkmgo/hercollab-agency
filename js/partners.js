/**
 * h·e·r collab — Partners Page Logic
 * Partner switching, bio block carousel, swipe, haptic feedback.
 * Expects the global shell (js/shell.js) to have already run.
 */
(function () {
  "use strict";

  function haptic() {
    if (navigator.vibrate) navigator.vibrate(10);
  }

  /* ── Register swipe exclusion zones so shell ignores them ──────── */

  window.__shellSwipeExclusions = [
    ".partner-switcher",
    ".bio-slider-container",
    ".frame-nav-menu",
  ];

  /* ── Partner Switcher ─────────────────────────────────────────── */

  var partnerData = [
    { id: "neo",   label: "The Visionary" },
    { id: "chaz",  label: "The Multiplier" },
    { id: "tsholo", label: "The Engine" },
  ];
  var currentPartner = 0;
  var allContents = document.querySelectorAll(".partner-content");
  var partnerRail = document.getElementById("partner-rail");
  var labels = partnerData.map(function (d) { return d.label; });
  var RAIL_N = 3;
  var RAIL_CENTER = -((1 * 100) / (RAIL_N * 100)) * 100;
  var RAIL_TX = [0, -33.333333, -66.666667];

  function rebuildRail(centerIdx, labelArr) {
    var frag = [];
    for (var i = -1; i <= 1; i++) {
      var idx = (centerIdx + i + labelArr.length) % labelArr.length;
      var span = document.createElement("span");
      span.className = "partner-rail-item";
      span.textContent = labelArr[idx];
      frag.push(span);
    }
    partnerRail.replaceChildren.apply(partnerRail, frag);
  }

  function showPartner(index) {
    allContents.forEach(function (c) { c.classList.remove("active"); });
    var target = document.querySelector('.partner-content[data-partner="' + partnerData[index].id + '"]');
    if (target) target.classList.add("active");
    if (target && target._resetBlocks) target._resetBlocks();

    var old = currentPartner;
    if (old !== index) {
      var dir = index === (old + 1) % partnerData.length ? 1 : -1;
      var targetIdx = 1 + dir;
      partnerRail.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      partnerRail.style.transform = "translateX(" + RAIL_TX[targetIdx] + "%)";
      var onEnd = function () {
        clearTimeout(safetyTimer);
        partnerRail.removeEventListener("transitionend", onEnd);
        rebuildRail(index, labels);
        partnerRail.style.transition = "none";
        partnerRail.style.transform = "translateX(" + RAIL_CENTER + "%)";
        void partnerRail.offsetHeight;
        partnerRail.style.transition = "";
      };
      partnerRail.addEventListener("transitionend", onEnd);
      var safetyTimer = setTimeout(function () {
        partnerRail.removeEventListener("transitionend", onEnd);
        rebuildRail(index, labels);
        partnerRail.style.transition = "none";
        partnerRail.style.transform = "translateX(" + RAIL_CENTER + "%)";
        void partnerRail.offsetHeight;
        partnerRail.style.transition = "";
      }, 400);
    } else {
      rebuildRail(index, labels);
      partnerRail.style.transition = "none";
      partnerRail.style.transform = "translateX(" + RAIL_CENTER + "%)";
      void partnerRail.offsetHeight;
      partnerRail.style.transition = "";
    }

    currentPartner = index;
  }

  document.querySelector(".switcher-prev").addEventListener("click", function () {
    haptic();
    showPartner((currentPartner - 1 + partnerData.length) % partnerData.length);
  });

  document.querySelector(".switcher-next").addEventListener("click", function () {
    haptic();
    showPartner((currentPartner + 1) % partnerData.length);
  });

  /* ── Bio Block Carousel (per partner) ─────────────────────────── */

  var syncHeightFns = [];
  document.querySelectorAll(".partner-content").forEach(function (content) {
    var container = content.querySelector(".bio-slider-container");
    if (!container) return;
    var blocks = container.querySelectorAll(".bio-block");
    var total = blocks.length;
    var prevBtn = content.querySelector(".prev-block-btn");
    var nextBtn = content.querySelector(".next-block-btn");
    var current = 1;

    function syncContainerHeight() {
      var activeBlock = container.querySelector(".bio-block.active") || blocks[0];
      container.style.height = activeBlock.scrollHeight + "px";
    }
    syncHeightFns.push(syncContainerHeight);

    // Build switching rail from block labels
    var oldIndicator = content.querySelector(".block-indicator");
    var blockRailWrap = document.createElement("div");
    blockRailWrap.className = "block-rail-wrap";
    var blockRail = document.createElement("div");
    blockRail.className = "block-rail";
    var blockLabels = [];
    blocks.forEach(function (b) {
      var lbl = (b.querySelector(".block-label") || {}).textContent || "";
      blockLabels.push(lbl.trim());
    });
    for (var i = 0; i < 3; i++) {
      var span = document.createElement("span");
      span.className = "block-rail-item";
      blockRail.appendChild(span);
    }
    blockRailWrap.appendChild(blockRail);
    if (oldIndicator) oldIndicator.replaceWith(blockRailWrap);

    var railItems = blockRail.children;
    var B_CTR = -33.333333;
    var B_TX = [0, B_CTR, -66.666667];

    function rebuildBlockRail(currIdx) {
      var prevIdx = currIdx === 0 ? total - 1 : currIdx - 1;
      var nextIdx = currIdx === total - 1 ? 0 : currIdx + 1;
      var order = [prevIdx, currIdx, nextIdx];
      for (var j = 0; j < 3; j++) {
        railItems[j].textContent = blockLabels[order[j]];
      }
    }

    function updateBlock(target) {
      var activeBlock = container.querySelector(".bio-block.active");
      if (activeBlock) activeBlock.classList.remove("active");
      var oldIdx = current - 1;
      var newIdx = target - 1;
      current = target;
      blocks[newIdx].classList.add("active");
      syncContainerHeight();

      if (oldIdx !== newIdx) {
        var dir = newIdx === (oldIdx + 1) % total ? 1 : -1;
        var tgt = 1 + dir;
        blockRail.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        blockRail.style.transform = "translateX(" + B_TX[tgt] + "%)";
        var onEnd = function () {
          clearTimeout(safetyTimer);
          blockRail.removeEventListener("transitionend", onEnd);
          rebuildBlockRail(newIdx);
          blockRail.style.transition = "none";
          blockRail.style.transform = "translateX(" + B_CTR + "%)";
          void blockRail.offsetHeight;
          blockRail.style.transition = "";
        };
        blockRail.addEventListener("transitionend", onEnd);
        var safetyTimer = setTimeout(function () {
          blockRail.removeEventListener("transitionend", onEnd);
          rebuildBlockRail(newIdx);
          blockRail.style.transition = "none";
          blockRail.style.transform = "translateX(" + B_CTR + "%)";
          void blockRail.offsetHeight;
          blockRail.style.transition = "";
        }, 400);
      }
    }

    // Expose reset so Level 1 can reset when switching partners
    content._resetBlocks = function () {
      var activeBlock = container.querySelector(".bio-block.active");
      if (activeBlock) activeBlock.classList.remove("active");
      blocks[0].classList.add("active");
      current = 1;
      rebuildBlockRail(0);
      blockRail.style.transition = "none";
      blockRail.style.transform = "translateX(" + B_CTR + "%)";
      void blockRail.offsetHeight;
      blockRail.style.transition = "";
      syncContainerHeight();
    };

    content._resetBlocks();

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        haptic();
        var t = current - 1;
        if (t < 1) t = total;
        updateBlock(t);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        haptic();
        var t = current + 1;
        if (t > total) t = 1;
        updateBlock(t);
      });
    }
  });

  // Initial: show first partner
  showPartner(0);
  syncHeightFns.forEach(function (fn) { fn(); });

  // Keep bio-block heights accurate on resize
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      syncHeightFns.forEach(function (fn) { fn(); });
    }, 150);
  });

  /* ── Touch Swipe for Partner Components ───────────────────────── */

  function enableSwipe(container, prevBtn, nextBtn, threshold) {
    threshold = threshold || 30;
    var startX = 0;
    container.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener("touchend", function (e) {
      var endX = e.changedTouches[0].clientX;
      var delta = startX - endX;
      if (delta > threshold) {
        haptic();
        if (nextBtn) nextBtn.click();
      } else if (delta < -threshold) {
        haptic();
        if (prevBtn) prevBtn.click();
      }
    }, { passive: true });
  }

  enableSwipe(
    document.querySelector(".partner-switcher"),
    document.querySelector(".switcher-prev"),
    document.querySelector(".switcher-next")
  );

  document.querySelectorAll(".bio-block-switcher .frame-nav-menu").forEach(function (menu) {
    var prev = menu.querySelector(".prev-block-btn");
    var next = menu.querySelector(".next-block-btn");
    enableSwipe(menu, prev, next);
  });
})();
