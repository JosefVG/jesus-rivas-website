// assets/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const giant = document.querySelector(".jr-giant");                  // "MI ESPACIO"
  const portraitImg = document.querySelector(".jr-portrait img");     // Jesús
  const tags = [...document.querySelectorAll(".jr-tags .tag")];       // [EMPRESARIO, Y AUTOR]
  const vNameSpan = document.querySelector(".jr-vertical-name span"); // "JESÚS RIVAS"

  if (!giant || !portraitImg || tags.length === 0 || !vNameSpan) return;

  const setInit = (el, styles) => Object.assign(el.style, styles);

  if (prefersReduced) {
    [giant, portraitImg, ...tags, vNameSpan].forEach(el =>
      setInit(el, { opacity: "", transform: "", filter: "" })
    );
    return;
  }

  function runHeroIntro(){
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const giant = document.querySelector(".jr-giant");
  const portraitImg = document.querySelector(".jr-portrait img");
  const tags = [...document.querySelectorAll(".jr-tags .tag")];
  const vNameSpan = document.querySelector(".jr-vertical-name span");

  if (!giant || !portraitImg || tags.length === 0 || !vNameSpan) return;
  if (prefersReduced) return;

  const setInit = (el, styles) => Object.assign(el.style, styles);

  // (opcional pero recomendado) cancelar animaciones previas
  [giant, portraitImg, ...tags, vNameSpan].forEach(el => {
    el.getAnimations?.().forEach(a => a.cancel());
    el.style.opacity = "";
    el.style.transform = "";
    el.style.filter = "";
  });

  /* ---- TU ANIMACIÓN TAL CUAL ---- */

  const cssOpacity = parseFloat(getComputedStyle(giant).opacity || "1");
  setInit(giant, { opacity: 0, filter: "blur(8px)" });
  const a1 = giant.animate(
    [
      { opacity: 0, filter: "blur(8px)" },
      { opacity: cssOpacity, filter: "blur(0px)" }
    ],
    { duration: 2200, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 200, fill: "forwards" }
  );
  a1.addEventListener("finish", () => {
    giant.style.opacity = "";
    giant.style.filter = "";
  });

  setInit(portraitImg, { opacity: 0, transform: "translateY(80px)" });
  portraitImg.animate(
    [
      { opacity: 0, transform: "translateY(80px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 2500, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 500, fill: "forwards" }
  );

  const [empresario, autor] = [tags[0], tags[1]];

  if (empresario) {
    setInit(empresario, { opacity: 0, transform: "translateX(-80px)" });
    empresario.animate(
      [
        { opacity: 0, transform: "translateX(-80px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      { duration: 2000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 1300, fill: "forwards" }
    );
  }

  if (autor) {
    setInit(autor, { opacity: 0, transform: "translateX(80px)" });
    autor.animate(
      [
        { opacity: 0, transform: "translateX(80px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      { duration: 2000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 1600, fill: "forwards" }
    );
  }

  setInit(vNameSpan, { opacity: 0, transform: "translateY(-40px)" });
  vNameSpan.animate(
    [
      { opacity: 0, transform: "translateY(-40px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 1800, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 2100, fill: "forwards" }
  );
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("is-loaded");
      document.body.style.overflow = "auto";

      // ✅ ahora sí se ve porque ya no está tapado
      runHeroIntro();
    }, 2600);
  } else {
    runHeroIntro();
  }
});

  /* --------------------------------------------------------
     ANIMACIÓN LENTA Y FLUIDA
     -------------------------------------------------------- */

  // 1) "MI ESPACIO" — gris
  const cssOpacity = parseFloat(getComputedStyle(giant).opacity || "1");
  setInit(giant, { opacity: 0, filter: "blur(8px)" });
  const a1 = giant.animate(
    [
      { opacity: 0, filter: "blur(8px)" },
      { opacity: cssOpacity, filter: "blur(0px)" }
    ],
    {
      duration: 2200, //  lento y elegante
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      delay: 200,
      fill: "forwards"
    }
  );
  a1.addEventListener("finish", () => {
    giant.style.opacity = "";
    giant.style.filter = "";
  });

  // 2) Jesús — subida suave desde abajo
  setInit(portraitImg, { opacity: 0, transform: "translateY(80px)" });
  portraitImg.animate(
    [
      { opacity: 0, transform: "translateY(80px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 2500, // más lento
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      delay: 500,
      fill: "forwards"
    }
  );

  // 3) EMPRESARIO — desde la izquierda
  const [empresario, autor] = [tags[0], tags[1]];
  if (empresario) {
    setInit(empresario, { opacity: 0, transform: "translateX(-80px)" });
    empresario.animate(
      [
        { opacity: 0, transform: "translateX(-80px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 1300,
        fill: "forwards"
      }
    );
  }

  // 4) Y AUTOR — desde la derecha
  if (autor) {
    setInit(autor, { opacity: 0, transform: "translateX(80px)" });
    autor.animate(
      [
        { opacity: 0, transform: "translateX(80px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 1600,
        fill: "forwards"
      }
    );
  }

  // 5) "JESÚS RIVAS" — cae desde arriba con fade elegante
  setInit(vNameSpan, { opacity: 0, transform: "translateY(-40px)" });
  vNameSpan.animate(
    [
      { opacity: 0, transform: "translateY(-40px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 1800,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      delay: 2100,
      fill: "forwards"
    }
  );
});


// ==============================
// Animación scroll para sección ABOUT
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll(
    ".about__title, .about__img, .about__content p"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // activa cuando el 20% del elemento es visible
    }
  );

  aboutElements.forEach((el) => observer.observe(el));
});


// ==============================
// Animación scroll para ABOUT BRIEF
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return;

  // Elementos a animar 
  const briefTitle = document.querySelector(".jr-brief .brief__title");
  const briefCols  = document.querySelectorAll(".jr-brief .brief__col");
  const briefParas = document.querySelectorAll(".jr-brief .brief__col p");

  // Inicial: estado oculto
  [briefTitle, ...briefCols, ...briefParas].forEach(el => {
    if (!el) return;
    el.classList.add("jr-reveal"); // estado base (opacity 0 + translate)
  });

  // Stagger helper
  const applyDelay = (list, start = 150, step = 120) => {
    list.forEach((el, i) => {
      el.style.setProperty("--jr-delay", `${start + i * step}ms`);
    });
  };

  // Delays: título -> columnas -> párrafos
  if (briefTitle) briefTitle.style.setProperty("--jr-delay", "120ms");
  applyDelay([...briefCols], 260, 140);
  applyDelay([...briefParas], 420, 120);

  // Observer
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("jr-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  [briefTitle, ...briefCols, ...briefParas].forEach(el => {
    if (el) io.observe(el);
  });
});


// ============== MIS LIBROS: lightbox ==============
(() => {
  const section   = document.querySelector('.jr-books');
  if (!section) return;

  const overlay   = section.querySelector('.book__overlay');
  const zoom      = section.querySelector('.book__zoom');
  const zoomImg   = section.querySelector('.book__zoom-img');
  const zoomTitle = section.querySelector('.book__zoom-title');
  const closeBtn  = section.querySelector('.book__close');
  const books     = section.querySelectorAll('.book');

  const open = (src, title, alt) => {
    zoomImg.src = src;
    zoomImg.alt = alt || title || 'Libro';
    zoomTitle.textContent = title || '';
    section.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    section.classList.remove('is-open');
    zoomImg.src = '';
    document.body.style.overflow = '';
  };

  books.forEach(b => {
    b.addEventListener('click', (e) => {
      // ✅ Si el click viene de un link/botón (Amazon), NO abras el zoom
      if (e.target.closest('a')) return;

      const img   = b.querySelector('img');
      const src   = img.getAttribute('src');
      const alt   = img.getAttribute('alt');
      const title = b.dataset.title || alt;
      open(src, title, alt);
    });
  });


  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  // ✅ Cerrar si haces click en el “fondo” del zoom (no en la imagen)
  zoom.addEventListener('click', (e) => {
    if (e.target === zoom) close();
  });

})();

// Smooth scroll para anclas internas (fix mobile menu)
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href");
  if (!id || id === "#") return;

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();

  // ✅ Si el menú móvil está abierto, ciérralo primero
  const wasNavOpen = document.body.classList.contains("nav-open");
  if (wasNavOpen) {
    document.body.classList.remove("nav-open");
    const burger = document.querySelector(".jr-burger");
    const mobile = document.querySelector(".jr-mobile");
    if (burger) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Abrir menú");
    }
    if (mobile) mobile.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // ✅ Espera 1 frame para que el DOM aplique el cierre y luego scrollea
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


// ==============================
// Menú hamburguesa móvil
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".jr-burger");
  const mobile = document.querySelector(".jr-mobile");
  const panel  = document.querySelector(".jr-mobile__panel");

  if (!burger || !mobile || !panel) return;

  const setExpanded = (isOpen) => {
    document.body.classList.toggle("nav-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    mobile.setAttribute("aria-hidden", String(!isOpen));
    burger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    // Bloquear scroll cuando está abierto
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const isOpen = () => document.body.classList.contains("nav-open");

  burger.addEventListener("click", () => setExpanded(!isOpen()));

  // Cerrar al hacer click en overlay o botón X
  mobile.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close='true']");
    if (close) setExpanded(false);
  });

  // Cerrar al hacer click en un link del menú móvil
  mobile.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", () => setExpanded(false));
  });

  // Cerrar con Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setExpanded(false);
  });

  // Si se cambia a desktop, cerrar menú
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && isOpen()) setExpanded(false);
  });
});

// ==============================
// MODALES (AVISO DE PRIVACIDAD Y POLÍTICA)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Configuración de los modales (ID del botón : ID del modal)
  const modalsConfig = {
    "btn-privacy": "modal-privacy",
    "btn-policy":  "modal-policy"
  };

  // Función para abrir un modal específico
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("is-visible");
      document.body.style.overflow = "hidden"; // Bloquear scroll
    }
  };

  // Función para cerrar cualquier modal activo
  const closeAllModals = () => {
    document.querySelectorAll(".jr-modal.is-visible").forEach(modal => {
      modal.classList.remove("is-visible");
    });
    document.body.style.overflow = ""; // Reactivar scroll
  };

  // 1. Asignar eventos a los botones de abrir
  Object.keys(modalsConfig).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(modalsConfig[btnId]);
      });
    }
  });

  // 2. Cerrar con botones (X o Overlay)
  document.addEventListener("click", (e) => {
    // Si el elemento clickeado tiene el atributo data-close="true"
    if (e.target.closest('[data-close="true"]')) {
      closeAllModals();
    }
  });

  // 3. Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });
});

// ==============================
// PRELOADER carga de la pagina 
// ==============================

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  
  if (preloader) {
    // Pequeño delay de seguridad para que la animación se aprecie al menos un instante
    setTimeout(() => {
      preloader.classList.add("is-loaded");
      document.body.style.overflow = "auto"; // Asegura que se pueda hacer scroll
    }, 2600); 
  }
});

// ==============================
// MODAL INFORMACIÓN DE LIBROS
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const bookModal = document.getElementById("modal-book-info");
  const modalTitle = document.getElementById("book-modal-title");
  const modalDesc = document.getElementById("book-modal-desc");
  const infoBtns = document.querySelectorAll(".book__info-btn");

  if (!bookModal || !infoBtns.length) return;

  // Función para cerrar
  const closeBookModal = () => {
    bookModal.classList.remove("is-visible");
    document.body.style.overflow = "";
  };

  // Asignar evento a cada botón de "Información"
  infoBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que se abra el zoom de la imagen
      
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");

      // Rellenar el modal
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Abrir
      bookModal.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    });
  });

  // Cerrar al dar clic en X o fondo
  bookModal.addEventListener("click", (e) => {
    if (e.target.closest('[data-close="true"]')) {
      closeBookModal();
    }
  });
  
  // Cerrar con ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bookModal.classList.contains("is-visible")) {
      closeBookModal();
    }
  });
});

