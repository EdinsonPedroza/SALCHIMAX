/* Datos y utilidades de las versiones de "¿Por qué elegir SALCHIMAX?" (requiere _shared.js).
   Los textos son los mismos de frontend/src/components/WhyUs.jsx. */
const WHY = [
  { key: "fresh", title: "Ingredientes Frescos", desc: "Usamos solo ingredientes de la más alta calidad, frescos cada día para garantizar el mejor sabor." },
  { key: "epic", title: "Porciones Épicas", desc: "Porciones generosas que te dejarán satisfecho. Aquí no hay pequeñas porciones." },
  { key: "price", title: "Precios Accesibles", desc: "La mejor comida rápida de Palmira a precios que todos pueden disfrutar." },
  { key: "family", title: "Ambiente Familiar", desc: "Un lugar acogedor donde toda la familia y los amigos pueden disfrutar juntos." },
  { key: "fast", title: "Pedidos Rápidos", desc: "Tu pedido listo en tiempo récord. Domicilio o para recoger — siempre rápido." },
];
const WHY_STATS = [
  { value: 5, dec: 1, suffix: "★", label: "En Google Maps" },
  { value: 100, dec: 0, suffix: "%", label: "Ingredientes frescos" },
  { value: 5, dec: 0, suffix: "PM", label: "Abrimos desde" },
];

/* Los mismos íconos de Lucide que usa la landing (viewBox 24) */
const WHY_ICON = {
  fresh: ['<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>', '<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'],
  epic: ['<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>', '<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>', '<path d="M4 22h16"/>', '<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>', '<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>', '<path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'],
  price: ['<line x1="12" x2="12" y1="2" y2="22"/>', '<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'],
  family: ['<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>', '<circle cx="9" cy="7" r="4"/>', '<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>', '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
  fast: ['<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'],
};
/* Cada trazo lleva pathLength="1" para poder dibujarlo con stroke-dashoffset */
const whyShapes = (key) => WHY_ICON[key].map((s) => s.replace(/^<(\w+)/, '<$1 pathLength="1"')).join("");
const whyIcon = (key, size = 28, sw = 2) => `<svg class="wi" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${whyShapes(key)}</svg>`;

/* Contador: escribe el valor en uno o varios nodos; onTick recibe el progreso suavizado 0–1 */
function countUp(els, stat, { ms = 1600, delay = 0, onTick } = {}) {
  const nodes = Array.isArray(els) ? els : [els];
  const fmt = (v) => (stat.dec ? v.toFixed(stat.dec) : String(Math.round(v))) + stat.suffix;
  const set = (t) => nodes.forEach((n) => { n.textContent = t; });
  if (REDUCED) { set(fmt(stat.value)); if (onTick) onTick(1); return; }
  set(fmt(0)); if (onTick) onTick(0);
  const t0 = performance.now() + delay;
  const step = (now) => {
    const p = clamp((now - t0) / ms, 0, 1), e = 1 - Math.pow(1 - p, 3);
    set(fmt(stat.value * e)); if (onTick) onTick(e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Ejecuta cb una sola vez cuando el elemento entra en pantalla (con movimiento reducido, de inmediato) */
function onceInView(el, cb, threshold = 0.25) {
  if (REDUCED || !("IntersectionObserver" in window)) { cb(el); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); cb(e.target); } }), { threshold });
  io.observe(el);
}

/* Avisa cuando el elemento entra o sale de pantalla (para pausar lo infinito) */
function watchVisible(el, cb, margin = "120px 0px") {
  if (!("IntersectionObserver" in window)) { cb(true); return; }
  new IntersectionObserver(([e]) => cb(e.isIntersecting), { rootMargin: margin }).observe(el);
}

/* Resplandor que sigue al cursor: solo mouse, una escritura por cuadro */
function spotlight(el) {
  if (!FINE || REDUCED) return;
  let raf = 0, x = 0, y = 0;
  el.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX; y = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", x - r.left + "px"); el.style.setProperty("--my", y - r.top + "px");
    });
  });
}
