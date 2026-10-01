/* Misael Granillo — site behavior
   Language toggle (persisted), mobile menu, scroll reveal. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Language ---- */
  function applyLang(lang) {
    if (lang !== "es" && lang !== "en") lang = "es";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    try { localStorage.setItem("mg_lang", lang); } catch (e) {}
    document.querySelectorAll("[data-title-es]").forEach(function (el) {
      var t = el.getAttribute("data-title-" + lang);
      if (t) document.title = t;
    });
  }

  var stored;
  try { stored = localStorage.getItem("mg_lang"); } catch (e) {}
  if (!stored) {
    stored = (navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es";
  }
  applyLang(stored);

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set]");
    if (b) { applyLang(b.getAttribute("data-set")); }
  });

  /* ---- Mobile menu ---- */
  var menuBtn = document.querySelector(".menu-btn");
  var links = document.querySelector(".nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", open ? "false" : "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) links.setAttribute("data-open", "false");
    });
  }

  /* ---- Scroll reveal ---- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SEL = ".hero .kicker, .hero h1, .hero .sub, .cred, .section-label, .section h2, .lede, .domain, .ledger, .foundation, .arc-item, .tr-group, .panel, .cap, .note-list li, .contact-row, .article h1, .prose > div > *";
  var targets = Array.prototype.slice.call(document.querySelectorAll(SEL));

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    // small stagger within the same group
    var d = (i % 6) * 55;
    el.style.transitionDelay = d + "ms";
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });
})();
