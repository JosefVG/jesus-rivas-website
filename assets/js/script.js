// assets/js/script.js

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galleryTrack");
  const btnL = document.querySelector(".gallery__arrow--left");
  const btnR = document.querySelector(".gallery__arrow--right");

  if (!track || !btnL || !btnR) return;

  function updateArrows() {
    const max = track.scrollWidth - track.clientWidth;
    const leftDone = track.scrollLeft <= 2;
    const rightDone = track.scrollLeft >= max - 2;

    btnL.classList.toggle("is-disabled", leftDone);
    btnR.classList.toggle("is-disabled", rightDone);
  }

  btnL.addEventListener("click", () => {
    if (btnL.classList.contains("is-disabled")) return;
    track.scrollBy({ left: -track.clientWidth * 0.85, behavior: "smooth" });
  });

  btnR.addEventListener("click", () => {
    if (btnR.classList.contains("is-disabled")) return;
    track.scrollBy({ left: track.clientWidth * 0.85, behavior: "smooth" });
  });

  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows();
});

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ==============================
  // HERO intro animation
  // ==============================
  function runHeroIntro() {
    if (prefersReduced) return;

    const giant = document.querySelector(".jr-giant");
    const portraitImg = document.querySelector(".jr-portrait img");
    const tags = [...document.querySelectorAll(".jr-tags .tag")];
    const vNameSpan = document.querySelector(".jr-vertical-name span");

    if (!giant || !portraitImg || tags.length === 0 || !vNameSpan) return;

    const setInit = (el, styles) => Object.assign(el.style, styles);

    // cancelar animaciones previas
    [giant, portraitImg, ...tags, vNameSpan].forEach(el => {
      el.getAnimations?.().forEach(a => a.cancel());
      el.style.opacity = "";
      el.style.transform = "";
      el.style.filter = "";
    });

    // 1) MI ESPACIO
    const cssOpacity = parseFloat(getComputedStyle(giant).opacity || "1");
    setInit(giant, { opacity: 0, filter: "blur(8px)" });
    const a1 = giant.animate(
      [{ opacity: 0, filter: "blur(8px)" }, { opacity: cssOpacity, filter: "blur(0px)" }],
      { duration: 2200, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 200, fill: "forwards" }
    );
    a1.addEventListener("finish", () => {
      giant.style.opacity = "";
      giant.style.filter = "";
    });

    // 2) Foto
    setInit(portraitImg, { opacity: 0, transform: "translateY(80px)" });
    portraitImg.animate(
      [{ opacity: 0, transform: "translateY(80px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 2500, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 500, fill: "forwards" }
    );

    // 3) Tags
    const [empresario, autor] = [tags[0], tags[1]];

    if (empresario) {
      setInit(empresario, { opacity: 0, transform: "translateX(-80px)" });
      empresario.animate(
        [{ opacity: 0, transform: "translateX(-80px)" }, { opacity: 1, transform: "translateX(0)" }],
        { duration: 2000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 1300, fill: "forwards" }
      );
    }

    if (autor) {
      setInit(autor, { opacity: 0, transform: "translateX(80px)" });
      autor.animate(
        [{ opacity: 0, transform: "translateX(80px)" }, { opacity: 1, transform: "translateX(0)" }],
        { duration: 2000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 1600, fill: "forwards" }
      );
    }

    // 4) Nombre vertical
    setInit(vNameSpan, { opacity: 0, transform: "translateY(-40px)" });
    vNameSpan.animate(
      [{ opacity: 0, transform: "translateY(-40px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 1800, easing: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 2100, fill: "forwards" }
    );
  }

  // ==============================
  // PRELOADER (1 sola vez)
  // ==============================
  window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const DURACION_MINIMA = 3500; // <-- cambia aquí (ms)

  setTimeout(() => {
    preloader.classList.add("is-hidden");

    setTimeout(() => {
      preloader.remove();
    }, 900); // coincide con la transición del CSS
  }, DURACION_MINIMA);
});


  // ==============================
  // Flecha HERO -> #about
  // ==============================
  const heroArrow = document.querySelector(".jr-hero .jr-scroll-v");
  if (heroArrow) {
    heroArrow.addEventListener("click", () => {
      document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ==============================
  // Menú hamburguesa móvil
  // ==============================
  const burger = document.querySelector(".jr-burger");
  const mobile = document.querySelector(".jr-mobile");
  if (burger && mobile) {
    const setExpanded = (isOpen) => {
      document.body.classList.toggle("nav-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      mobile.setAttribute("aria-hidden", String(!isOpen));
      burger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    const isOpen = () => document.body.classList.contains("nav-open");

    burger.addEventListener("click", () => setExpanded(!isOpen()));

    mobile.addEventListener("click", (e) => {
      if (e.target.closest("[data-close='true']")) setExpanded(false);
    });

    mobile.querySelectorAll("a[href^='#']").forEach(a => {
      a.addEventListener("click", () => setExpanded(false));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) setExpanded(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && isOpen()) setExpanded(false);
    });
  }

  // ==============================
  // Smooth scroll para anclas internas
  // ==============================
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    // cerrar menú si está abierto
    if (document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Abrir menú");
      mobile?.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ==============================
  // Animación scroll ABOUT
  // ==============================
  const aboutElements = document.querySelectorAll(".about__title, .about__img, .about__content p");
  if (aboutElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    aboutElements.forEach(el => observer.observe(el));
  }

  // ==============================
  // Animación scroll ABOUT BRIEF
  // ==============================
  if (!prefersReduced) {
    const briefTitle = document.querySelector(".jr-brief .brief__title");
    const briefCols  = document.querySelectorAll(".jr-brief .brief__col");
    const briefParas = document.querySelectorAll(".jr-brief .brief__col p");

    [briefTitle, ...briefCols, ...briefParas].forEach(el => el && el.classList.add("jr-reveal"));

    const applyDelay = (list, start = 150, step = 120) => {
      list.forEach((el, i) => el.style.setProperty("--jr-delay", `${start + i * step}ms`));
    };

    if (briefTitle) briefTitle.style.setProperty("--jr-delay", "120ms");
    applyDelay([...briefCols], 260, 140);
    applyDelay([...briefParas], 420, 120);

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

    [briefTitle, ...briefCols, ...briefParas].forEach(el => el && io.observe(el));
  }

  // ==============================
  // MIS LIBROS: zoom
  // ==============================
  (() => {
    const section = document.querySelector(".jr-books");
    if (!section) return;

    const overlay = section.querySelector(".book__overlay");
    const zoom = section.querySelector(".book__zoom");
    const zoomImg = section.querySelector(".book__zoom-img");
    const zoomTitle = section.querySelector(".book__zoom-title");
    const closeBtn = section.querySelector(".book__close");
    const books = section.querySelectorAll(".book");

    const open = (src, title, alt) => {
      zoomImg.src = src;
      zoomImg.alt = alt || title || "Libro";
      zoomTitle.textContent = title || "";
      section.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      section.classList.remove("is-open");
      zoomImg.src = "";
      document.body.style.overflow = "";
    };

    books.forEach(b => {
      b.addEventListener("click", (e) => {
        if (e.target.closest("a") || e.target.closest("button")) return; // no abrir con Amazon ni Info
        const img = b.querySelector("img");
        open(img.getAttribute("src"), b.dataset.title || img.alt, img.alt);
      });
    });

    overlay?.addEventListener("click", close);
    closeBtn?.addEventListener("click", close);
    window.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    zoom?.addEventListener("click", (e) => { if (e.target === zoom) close(); });
  })();

  // ==============================
  // MODALES (privacidad/política)
  // ==============================
  const modalsConfig = { "btn-privacy": "modal-privacy", "btn-policy": "modal-policy" };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  };

  const closeAllModals = () => {
    document.querySelectorAll(".jr-modal.is-visible").forEach(m => m.classList.remove("is-visible"));
    document.body.style.overflow = "";
  };

  Object.keys(modalsConfig).forEach(btnId => {
    const btn = document.getElementById(btnId);
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalsConfig[btnId]);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-close="true"]')) closeAllModals();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // ==============================
  // MODAL INFORMACIÓN DE LIBROS
  // ==============================
  const bookModal = document.getElementById("modal-book-info");
  const modalTitle = document.getElementById("book-modal-title");
  const modalDesc = document.getElementById("book-modal-desc");
  const infoBtns = document.querySelectorAll(".book__info-btn");

  const closeBookModal = () => {
    bookModal?.classList.remove("is-visible");
    document.body.style.overflow = "";
  };

  infoBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!bookModal) return;
      modalTitle.textContent = btn.getAttribute("data-title") || "";
      modalDesc.textContent  = btn.getAttribute("data-desc") || "";
      bookModal.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    });
  });

  bookModal?.addEventListener("click", (e) => {
    if (e.target.closest('[data-close="true"]')) closeBookModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bookModal?.classList.contains("is-visible")) closeBookModal();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const lb = document.getElementById("jrLightbox");
  const lbImg = document.getElementById("jrLightboxImg");
  const btnClose = lb?.querySelector(".jr-lightbox__close");

  if (!lb || !lbImg || !btnClose) return;

  const targets = document.querySelectorAll(".gallery__item img");

  const open = (src, alt = "") => {
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const close = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    lbImg.alt = "";
    document.body.classList.remove("no-scroll");
  };

  targets.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", (e) => {
      e.preventDefault();
      open(img.currentSrc || img.src, img.alt || "Imagen");
    });
  });

  btnClose.addEventListener("click", close);

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("is-open")) close();
  });
});

// Autoplay para el carrete de la galería
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galleryTrack");
  const btnR = document.querySelector(".gallery__arrow--right");
  const intervalTime = 3000; // Tiempo en milisegundos (3 segundos)

  if (!track || !btnR) return;

  let autoplay = setInterval(() => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    // Si llega al final, vuelve al principio
    if (track.scrollLeft >= maxScroll - 5) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      btnR.click(); // Simula el clic en la flecha derecha
    }
  }, intervalTime);

  // Pausar el movimiento si el usuario pone el mouse encima
  track.addEventListener("mouseenter", () => clearInterval(autoplay));
  
  // Reanudar cuando el usuario quita el mouse
  track.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 5) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        btnR.click();
      }
    }, intervalTime);
  });
});