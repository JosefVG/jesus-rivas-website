// assets/js/script.js

// =====================================
// GALERÍA RESPONSIVE (1/2/3 visibles)
// MISMO DISEÑO, solo comportamiento
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galleryTrack");
  const btnL = document.querySelector(".gallery__arrow--left");
  const btnR = document.querySelector(".gallery__arrow--right");

  if (!track || !btnL || !btnR) return;

  const items = () => Array.from(track.querySelectorAll(".gallery__item"));
  let currentIndex = 0;
  let resizeTimer = null;

  function visibleCount() {
    if (window.innerWidth <= 700) return 1;      // celular
    if (window.innerWidth <= 1024) return 2;     // tableta
    return 3;                                    // laptop/desktop
  }

  function maxIndex() {
    return Math.max(0, items().length - visibleCount());
  }

  function clampIndex(i) {
    return Math.max(0, Math.min(i, maxIndex()));
  }

  function itemLeft(index) {
    const list = items();
    if (!list[index]) return 0;
    return list[index].offsetLeft - track.offsetLeft;
  }

  function goTo(index, smooth = true) {
    currentIndex = clampIndex(index);

    track.scrollTo({
      left: itemLeft(currentIndex),
      behavior: smooth ? "smooth" : "auto"
    });

    updateArrows();
  }

  function updateArrows() {
    const max = maxIndex();

    btnL.classList.toggle("is-disabled", currentIndex <= 0);
    btnR.classList.toggle("is-disabled", currentIndex >= max);
  }

  function detectIndexByScroll() {
    const list = items();
    if (!list.length) return;

    const left = track.scrollLeft;
    let nearest = 0;
    let minDist = Infinity;

    list.forEach((el, i) => {
      const x = el.offsetLeft - track.offsetLeft;
      const d = Math.abs(x - left);
      if (d < minDist) {
        minDist = d;
        nearest = i;
      }
    });

    currentIndex = clampIndex(nearest);
    updateArrows();
  }
  

  // Flecha izquierda = retrocede 1 foto
  btnL.addEventListener("click", () => {
    if (btnL.classList.contains("is-disabled")) return;
    goTo(currentIndex - 1);
  });

  // Flecha derecha = avanza 1 foto
  btnR.addEventListener("click", () => {
    if (btnR.classList.contains("is-disabled")) return;
    goTo(currentIndex + 1);
  });

  // Sincroniza al hacer scroll manual/touch
  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      detectIndexByScroll();
      ticking = false;
    });
  });

  // Ajuste al cambiar tamaño (móvil/tablet/pc)
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIndex = clampIndex(currentIndex);
      goTo(currentIndex, false);
    }, 120);
  });

  // Init
  goTo(0, false);
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
  const vNameEl = document.querySelector(".jr-vertical-name"); // ✅ no exige span

  // ✅ No canceles toda la animación si falta el nombre vertical
  if (!giant || !portraitImg || tags.length === 0) return;

  const setInit = (el, styles) => Object.assign(el.style, styles);

  [giant, portraitImg, ...tags, vNameEl].filter(Boolean).forEach(el => {
    el.getAnimations?.().forEach(a => a.cancel());
    el.style.opacity = "";
    el.style.transform = "";
    el.style.filter = "";
  });

  // 1) MI ESPACIO
  const cssOpacity = parseFloat(getComputedStyle(giant).opacity || "1");
  setInit(giant, { opacity: "0", filter: "blur(10px)" });

  const a1 = giant.animate(
    [
      { opacity: 0, filter: "blur(10px)", transform: "translateY(-50%) translateX(-8px)" },
      { opacity: cssOpacity, filter: "blur(0px)", transform: "translateY(-50%) translateX(0)" }
    ],
    {
      duration: 2400,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      delay: 120,
      fill: "forwards"
    }
  );

  a1.addEventListener("finish", () => {
    giant.style.opacity = "";
    giant.style.filter = "";
    giant.style.transform = ""; // vuelve al CSS base
  });

  // 2) Foto (entrada)
  setInit(portraitImg, { opacity: "0", transform: "translateY(80px)" });

  const pAnim = portraitImg.animate(
    [
      { opacity: 0, transform: "translateY(80px)" },
      { opacity: 1, transform: "translateY(0px)" }
    ],
    {
      duration: 2500,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      delay: 450,
      fill: "forwards"
    }
  );

  pAnim.addEventListener("finish", () => {
    portraitImg.style.opacity = "1";
    portraitImg.style.transform = "translateY(0)";
    // ✅ activa flotación cuando termina entrada
    document.body.classList.add("hero-ready");
  });

  // 3) Tags
  const [empresario, autor] = [tags[0], tags[1]];

  if (empresario) {
    setInit(empresario, { opacity: "0", transform: "translateX(-60px)" });
    empresario.animate(
      [
        { opacity: 0, transform: "translateX(-60px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      {
        duration: 1400,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 1150,
        fill: "forwards"
      }
    );
  }

  if (autor) {
    setInit(autor, { opacity: "0", transform: "translateX(60px)" });
    autor.animate(
      [
        { opacity: 0, transform: "translateX(60px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      {
        duration: 1400,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 1320,
        fill: "forwards"
      }
    );
  }

  // 4) Nombre vertical (opcional)
  if (vNameEl) {
    setInit(vNameEl, { opacity: "0", transform: "translateY(-24px)" });
    vNameEl.animate(
      [
        { opacity: 0, transform: "translateY(-24px)" },
        { opacity: 0.65, transform: "translateY(0)" }
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 1650,
        fill: "forwards"
      }
    );
  }
}

  // ==============================
  // PRELOADER (1 sola vez)
  // ==============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const DURACION_MINIMA = 3500;

  const startHero = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        runHeroIntro();
      });
    });
  };

  if (!preloader) {
    startHero();
    return;
  }

  setTimeout(() => {
    preloader.classList.add("is-hidden");

    // ✅ Espera a que termine la transición del preloader (0.5s en tu CSS)
    setTimeout(() => {
      preloader.remove();
      startHero(); // ✅ aquí ya se ve "MI ESPACIO"
    });

  }, DURACION_MINIMA);

  setTimeout(() => {
  preloader.classList.add("is-hidden");

  setTimeout(() => {
    runHeroIntro(); // ✅ aquí se dispara
  }, 120);

  setTimeout(() => {
    preloader.remove();
  }, 900);
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
// MIS LIBROS: clic directo a Amazon (sin zoom)
// ==============================
(() => {
  const section = document.querySelector(".jr-books");
  if (!section) return;

  const books = section.querySelectorAll(".book");

  books.forEach((book) => {
    // Busca enlace de Amazon dentro de la tarjeta
    const amazonLink =
      book.querySelector('a[href*="amazon."]') ||
      book.querySelector(".book__amazon") ||
      book.querySelector("a");

    if (!amazonLink) return;

    // Toda la tarjeta abre Amazon
    book.addEventListener("click", (e) => {
      // Si el clic fue en botón de info (si aún existe), no hacer nada aquí
      if (e.target.closest(".book__info-btn")) return;

      // Si el clic fue directamente en el enlace, deja que el navegador lo maneje
      if (e.target.closest("a")) return;

      // Abrir Amazon (misma pestaña)
      window.location.href = amazonLink.href;

      // Si prefieres nueva pestaña, usa esto en vez de la línea de arriba:
      // window.open(amazonLink.href, "_blank", "noopener");
    });

    // Cursor para indicar que es clickeable
    book.style.cursor = "pointer";
  });
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

const form = document.getElementById("contact-form");
const statusText = document.getElementById("status");




// =====================================
// CONTACTO — EmailJS (SIN PHP) + MODAL ÉXITO
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusText = document.getElementById("status");
  const submitBtn = document.getElementById("contact-submit-btn");

  // Modal éxito
  const successModal = document.getElementById("modal-send-success");

  const openSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.add("is-visible");
    successModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.remove("is-visible");
    successModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Cerrar modal éxito (X o fondo)
  successModal?.addEventListener("click", (e) => {
    if (e.target.closest('[data-close-send="true"]')) {
      closeSuccessModal();
    }
  });

  // ESC para cerrar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal?.classList.contains("is-visible")) {
      closeSuccessModal();
    }
  });

  if (!form) return;

  let statusResetTimer = null;
const defaultStatusText = statusText ? statusText.textContent : "";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      if (statusText) statusText.textContent = "❌ Completa todos los campos.";
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.style.cursor = "not-allowed";
      submitBtn.textContent = "Enviando...";
    }
    if (statusText) statusText.textContent = "Enviando mensaje...";

    try {
      await emailjs.sendForm(
        "service_8bsbd1f",   // ✅ Tu Service ID
        "template_bwe4n34",    // ✅ Reemplaza con tu Template ID real
        form
      );

      if (statusText) {
  // limpia timer anterior para evitar conflictos
  if (statusResetTimer) clearTimeout(statusResetTimer);

  statusText.textContent = "✅ Correo enviado correctamente.";

  // después de 5 segundos vuelve al texto anterior
  statusResetTimer = setTimeout(() => {
    statusText.textContent = defaultStatusText; 
    // si prefieres vacío, usa:
    // statusText.textContent = "";
  }, 8000);
}

      form.reset();

      // ✅ Abrir cuadro de éxito
      openSuccessModal();

    } catch (error) {
      console.error("EmailJS error:", error);
      if (statusText) {
        statusText.textContent = "❌ Error al enviar. Intenta nuevamente en unos minutos.";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
        submitBtn.style.cursor = "";
        submitBtn.textContent = "Enviar Solicitud";
      }
    }
  });
});