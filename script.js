"use strict";

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--cx", e.clientX + "px");
  document.body.style.setProperty("--cy", e.clientY + "px");
});

const parallaxBg = document.getElementById("parallaxBg");
const parallaxElements = document.querySelectorAll(".parallax-element");

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrollY * 0.25}px)`;
      }

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.1;
        const rect = el.getBoundingClientRect();
        const offset = window.innerHeight / 2 - rect.top - rect.height / 2;
        el.style.transform = `translateY(${offset * speed}px)`;
      });

      ticking = false;
    });
    ticking = true;
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".section--step").forEach((section) => {
  revealObserver.observe(section);
});

/* ─── SMOOTH SCROLL (hero CTA) ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─── CHAR COUNTER ───────────────────────────── */
const textarea = document.getElementById("historia");
const charCount = document.getElementById("charCount");

if (textarea && charCount) {
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    charCount.textContent = len;
    charCount.style.color =
      len < 30
        ? "var(--magenta)"
        : len > 2000
          ? "var(--laranja)"
          : "rgba(232,232,232,0.4)";
  });
}

/* ─── URGENCY SLIDER ─────────────────────────── */
const slider = document.getElementById("urgencia");
const urgencyEmoji = document.getElementById("urgencyEmoji");
const urgencyText = document.getElementById("urgencyText");
const urgencyDisplay = document.getElementById("urgencyDisplay");

const urgencyLevels = [
  {
    emoji: "😴",
    text: "Fofoquinha básica",
    color: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.1)",
  },
  {
    emoji: "👀",
    text: "Ficou interessante..",
    color: "rgba(0,194,232,0.08)",
    border: "rgba(0,194,232,0.25)",
  },
  {
    emoji: "😮",
    text: "Tem história nisso!",
    color: "rgba(44,41,119,0.15)",
    border: "rgba(44,41,119,0.4)",
  },
  {
    emoji: "🔥",
    text: "Quente quente!",
    color: "rgba(255,120,48,0.12)",
    border: "rgba(255,120,48,0.4)",
  },
  {
    emoji: "💣",
    text: "BOMBA! Sai AGORA!",
    color: "rgba(181,31,77,0.15)",
    border: "rgba(181,31,77,0.6)",
  },
];

function updateUrgency(val) {
  const level = urgencyLevels[val - 1];
  urgencyEmoji.textContent = level.emoji;
  urgencyText.textContent = level.text;
  urgencyDisplay.style.background = level.color;
  urgencyDisplay.style.borderColor = level.border;

  // Atualiza cor da trilha do slider
  const pct = ((val - 1) / 4) * 100;
  slider.style.background = `linear-gradient(to right, var(--laranja) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`;
}

if (slider) {
  slider.addEventListener("input", () => updateUrgency(parseInt(slider.value)));
  updateUrgency(1); // inicial
}

/* ─── UPLOAD ZONE ────────────────────────────── */
const uploadZone = document.getElementById("uploadZone");
const uploadInput = document.getElementById("provas");
const uploadPreview = document.getElementById("uploadPreview");

if (uploadZone && uploadInput) {
  // Drag & Drop
  ["dragenter", "dragover"].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.remove("drag-over");
    });
  });

  uploadZone.addEventListener("drop", (e) => {
    uploadInput.files = e.dataTransfer.files;
    showPreview(e.dataTransfer.files);
  });

  uploadInput.addEventListener("change", () => {
    showPreview(uploadInput.files);
  });

  function showPreview(files) {
    uploadPreview.innerHTML = "";
    Array.from(files).forEach((file) => {
      const item = document.createElement("div");
      item.className = "upload-preview__item";
      item.innerHTML = `📄 ${file.name} <small>(${formatBytes(file.size)})</small>`;
      uploadPreview.appendChild(item);
    });
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }
}

/* ─── CHECKBOX ANIMATION ─────────────────────── */
document.querySelectorAll(".checkbox-card").forEach((card) => {
  card.addEventListener("change", () => {
    const input = card.querySelector("input");
    if (input.checked) {
      card.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.04)" },
          { transform: "scale(1)" },
        ],
        { duration: 250, easing: "ease-out" },
      );
    }
  });
});

/* ─── FORM VALIDATION ────────────────────────── */
function showError(id, show) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("hidden", !show);
}

function validateForm() {
  let valid = true;

  // Tipo de conteúdo (pelo menos 1)
  const tipos = document.querySelectorAll('input[name="tipo[]"]:checked');
  if (tipos.length === 0) {
    showError("error-tipo", true);
    valid = false;
  } else {
    showError("error-tipo", false);
  }

  const historia = document.getElementById("historia");
  if (!historia || historia.value.trim().length < 30) {
    showError("error-historia", true);
    if (historia) historia.focus();
    valid = false;
  } else {
    showError("error-historia", false);
  }

  return valid;
}

const form = document.getElementById("hofofocaForm");
const submitBtn = document.getElementById("submitBtn");
const btnLoader = document.getElementById("btnLoader");
const btnText = submitBtn ? submitBtn.querySelector(".btn__text") : null;
const btnIcon = submitBtn ? submitBtn.querySelector(".btn__icon") : null;

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll até o primeiro erro visível
      const firstError = document.querySelector(".field-error:not(.hidden)");
      if (firstError) {
        firstError
          .closest(".section")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (btnText) btnText.textContent = "Enviando...";
    if (btnIcon) btnIcon.classList.add("hidden");
    if (btnLoader) btnLoader.classList.remove("hidden");
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showConfirmation();
      } else {
        throw new Error("Resposta não OK: " + response.status);
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      // Feedback de erro amigável
      if (btnText) btnText.textContent = "Erro! Tenta de novo.";
      if (btnLoader) btnLoader.classList.add("hidden");
      if (btnIcon) {
        btnIcon.classList.remove("hidden");
        btnIcon.textContent = "⚠️";
      }
      submitBtn.disabled = false;
    }
  });
}

function showConfirmation() {
  const confirmation = document.getElementById("confirmation");
  if (!confirmation) return;

  confirmation.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Animação de entrada
  confirmation.animate(
    [
      { opacity: 0, transform: "scale(0.95)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
  );

  // Glitch no título da confirmação
  const title = confirmation.querySelector(".confirmation__title");
  if (title) {
    setTimeout(() => triggerGlitch(title), 600);
  }
}

function triggerGlitch(el) {
  el.style.animation = "none";
  el.offsetHeight; // reflow
  el.style.animation = "";
}

/* Exposição global para o botão do HTML */
window.resetForm = function () {
  const confirmation = document.getElementById("confirmation");
  if (confirmation) {
    confirmation.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (form) form.reset();
  if (charCount) charCount.textContent = "0";
  if (uploadPreview) uploadPreview.innerHTML = "";
  if (btnText) btnText.textContent = "Manda pra Léia!";
  if (btnIcon) {
    btnIcon.textContent = "🎤";
    btnIcon.classList.remove("hidden");
  }
  if (btnLoader) btnLoader.classList.add("hidden");
  if (submitBtn) submitBtn.disabled = false;

  updateUrgency(1);

  // Scroll pro topo
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ─── SECTION BG COLOR SHIFT no scroll ───────── */
const sectionColors = {
  "step-1": "rgba(44,41,119,0.85)",
  "step-2": "rgba(23,20,28,0.92)",
  "step-3": "rgba(181,31,77,0.12)",
  "step-4": "rgba(23,20,28,0.92)",
  "step-5": "rgba(0,194,232,0.08)",
  "step-6": "rgba(23,20,28,0.92)",
};

const colorObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const color = sectionColors[id];
        if (color) {
          document.body.style.setProperty("--current-section-bg", color);
        }
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".section--step")
  .forEach((s) => colorObserver.observe(s));

/* ─── HERO SCROLL FADE ───────────────────────── */
const hero = document.getElementById("hero");

window.addEventListener(
  "scroll",
  () => {
    if (!hero) return;
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    const opacity = Math.max(0, 1 - scrollY / (heroH * 0.6));
    hero.style.opacity = opacity;
  },
  { passive: true },
);
