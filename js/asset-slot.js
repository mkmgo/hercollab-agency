/**
 * h·e·r collab — Asset Slot Interaction
 * Shared hover/focus behaviour for .asset-slot components.
 * Used by gatekeeper.html and any future asset listing pages.
 */
(function () {
  "use strict";

  function initAssetSlots() {
    var slots = document.querySelectorAll(".asset-slot");
    slots.forEach(function (slot) {
      slot.addEventListener("mouseenter", function () {
        this.style.borderColor = "";
      });
      slot.addEventListener("mouseleave", function () {
        this.style.borderColor = "";
      });
      slot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAssetSlots);
  } else {
    initAssetSlots();
  }
})();
