// main.js · scroll engine + generic drill wiring + error collector
(function () {
  window.__errs = [];
  addEventListener("error", e => window.__errs.push(String(e.message)));

  // QA mode: collapse vh sizing for full-page headless captures
  if (new URLSearchParams(location.search).has("qa")) document.documentElement.classList.add("qa");

  // cover chips → smooth scroll
  document.querySelectorAll("[data-goto]").forEach(b => {
    b.addEventListener("click", () => {
      const el = document.querySelector(b.dataset.goto);
      if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  });

  // generic drill targets: <tr data-drill data-title data-value data-sub data-source> / .m
  document.querySelectorAll("[data-drill]").forEach(el => {
    el.style.cursor = "pointer";
    el.tabIndex = 0;
    if (!el.matches("button, a, tr")) el.setAttribute("role", "button");
    el.setAttribute("aria-haspopup", "dialog");
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const r = el.getBoundingClientRect();
        U.showDrill({ title: el.dataset.title, value: el.dataset.value,
          sub: el.dataset.sub, source: el.dataset.source, x: r.left, y: r.bottom });
      }
    });
    el.setAttribute("data-drill-keep", "");
    el.addEventListener("click", e => {
      U.showDrill({
        title: el.dataset.title, value: el.dataset.value,
        sub: el.dataset.sub, source: el.dataset.source,
        x: e.clientX, y: e.clientY,
      });
      e.stopPropagation();
    });
  });

  // section entrance fade
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!REDUCE) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".band .prose, .band .wide").forEach(el => {
      el.classList.add("pre-in"); io.observe(el);
    });
    const st = document.createElement("style");
    st.textContent = ".pre-in{opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease}.pre-in.in{opacity:1;transform:none}";
    document.head.appendChild(st);
  }
})();
