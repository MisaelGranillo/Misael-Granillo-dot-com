/* Misael Granillo — site behavior: language toggle, mobile nav, scroll reveal */
(function () {
  "use strict";

  var STORAGE_KEY = "mg-lang";
  var SUPPORTED = ["es", "en"];

  /* ---------- language ---------- */
  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "es";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-es]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val === null) return;
      if (el.tagName === "TITLE") { el.textContent = val; return; }
      if (el.tagName === "META") { el.setAttribute("content", val); return; }
      el.textContent = val;
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var lang = stored ||
      ((navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es");
    applyLang(lang);

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".lang-btn");
      if (!btn) return;
      applyLang(btn.getAttribute("data-lang"));
      closeMobile();
    });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var mobile = document.getElementById("mobile-menu");

  function closeMobile() {
    if (!toggle || !mobile) return;
    toggle.setAttribute("aria-expanded", "false");
    mobile.hidden = true;
  }

  function initMobile() {
    if (!toggle || !mobile) return;

    // add language control inside the mobile menu, mirroring the desktop toggle
    var langWrap = document.createElement("div");
    langWrap.className = "mobile-lang";
    langWrap.innerHTML =
      '<button type="button" class="lang-btn" data-lang="es">ES</button>' +
      '<span class="lang-sep" aria-hidden="true">/</span>' +
      '<button type="button" class="lang-btn" data-lang="en">EN</button>';
    mobile.appendChild(langWrap);
    applyLang(document.documentElement.lang); // sync new buttons

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      mobile.hidden = open;
    });

    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobile);
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  initLang();
  initMobile();
  initReveal();
})();
