/* Misael Granillo — site behavior
   Language toggle (persisted), mobile menu, one split-flap reveal. */
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

  /* ---- Split-flap board ---- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var board = document.querySelector(".board");
  if (board) {
    // Build flap glyphs from plain text (progressive enhancement).
    board.querySelectorAll(".val").forEach(function (val) {
      var text = val.textContent.trim();
      val.textContent = "";
      text.split("").forEach(function (c) {
        var s = document.createElement("span");
        if (c === " ") { s.className = "sep"; s.innerHTML = "&nbsp;"; }
        else { s.className = "ch"; s.textContent = c; s.setAttribute("data-c", c); }
        val.appendChild(s);
      });
    });

    if (!reduce && "IntersectionObserver" in window) {
      var CHARS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789$+.KM%";
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          entry.target.querySelectorAll(".val .ch").forEach(function (ch, i) {
            var final = ch.getAttribute("data-c");
            var ticks = 5 + (i % 5), n = 0;
            setTimeout(function () {
              var iv = setInterval(function () {
                n++;
                if (n >= ticks) { clearInterval(iv); ch.textContent = final; }
                else { ch.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]; }
              }, 45);
            }, 30 * i);
          });
        });
      }, { threshold: 0.35 });
      io.observe(board);
    }
  }
})();
