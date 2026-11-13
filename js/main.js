/* ==========================================================================
   AgroAlert Araucanía — Comportamiento del sitio
   Sin dependencias. Todo es progresivo: si algo no está disponible, el sitio
   sigue siendo legible y navegable.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------------------
     1. Año del pie de página
     ---------------------------------------------------------------------- */
  var year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     2. Cabecera translúcida al hacer scroll
     ---------------------------------------------------------------------- */
  var header = doc.getElementById("site-header");
  if (header) {
    var ticking = false;

    var paintHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    };

    var requestPaint = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paintHeader);
    };

    paintHeader();
    window.addEventListener("scroll", requestPaint, { passive: true });
  }

  /* ------------------------------------------------------------------------
     3. Menú móvil
     ---------------------------------------------------------------------- */
  var toggle = doc.getElementById("nav-toggle");
  var links = doc.getElementById("nav-links");

  if (toggle && links) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      links.classList.toggle("is-open", open);
      doc.body.classList.toggle("menu-open", open);
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Cierra al elegir un enlace o al salir con Escape.
    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    // Si la ventana crece, el menú desplegable ya no aplica.
    var wide = window.matchMedia("(min-width: 861px)");
    var onWide = function (event) {
      if (event.matches) setMenu(false);
    };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ------------------------------------------------------------------------
     4. Aparición de bloques al entrar en pantalla
     ---------------------------------------------------------------------- */
  var revealItems = Array.prototype.slice.call(doc.querySelectorAll(".reveal"));

  if (!revealItems.length) return;

  var showAll = function () {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  };

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });

  // Red de seguridad: si el observador no dispara (navegador antiguo o
  // contenido fuera del flujo), todo queda visible antes de imprimir o al
  // reactivar la pestaña.
  window.addEventListener("beforeprint", showAll);

  // Si el usuario cambia a "reducir movimiento" en caliente.
  var onMotionChange = function (event) {
    if (event.matches) {
      observer.disconnect();
      showAll();
    }
  };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onMotionChange);
  else if (reduceMotion.addListener) reduceMotion.addListener(onMotionChange);
})();
