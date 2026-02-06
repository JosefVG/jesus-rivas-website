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

  /* --------------------------------------------------------
     ANIMACIÓN FINAL - MÁS LENTA Y FLUIDA
     -------------------------------------------------------- */

  // 1) "MI ESPACIO" — vuelve a su gris original
  const cssOpacity = parseFloat(getComputedStyle(giant).opacity || "1");
  setInit(giant, { opacity: 0, filter: "blur(8px)" });
  const a1 = giant.animate(
    [
      { opacity: 0, filter: "blur(8px)" },
      { opacity: cssOpacity, filter: "blur(0px)" }
    ],
    {
      duration: 2200, // más lento y elegante
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

  // Elementos a animar (NO el botón)
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
    b.addEventListener('click', () => {
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
})();
