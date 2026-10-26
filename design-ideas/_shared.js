/* Helpers + datos compartidos de los prototipos de Promos (sin dependencias) */
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IO = "cubic-bezier(0.77, 0, 0.175, 1)";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Resorte físico (equivalente a useSpring de Framer Motion) */
class Spring {
  constructor(value = 0, { k = 170, c = 22 } = {}) {
    this.value = value; this.target = value; this.vel = 0; this.k = k; this.c = c;
  }
  step(dt) {
    const n = Math.max(1, Math.ceil(dt / 0.008));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      this.vel += (-this.k * (this.value - this.target) - this.c * this.vel) * h;
      this.value += this.vel * h;
    }
    return this.value;
  }
}

/* Bucle por frame */
function loop(fn) {
  let last = performance.now();
  const f = (now) => {
    fn(Math.min(0.05, (now - last) / 1000), now);
    last = now;
    requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}

function grain() {
  const g = document.createElement("div");
  g.className = "grain";
  document.body.appendChild(g);
}

/* Polígono de estrella (sello "2x1") como clip-path */
function burst(points = 14, inner = 0.84) {
  const out = [];
  for (let i = 0; i < points * 2; i++) {
    const a = (Math.PI * i) / points - Math.PI / 2;
    const r = i % 2 ? inner : 1;
    out.push(`${(50 + Math.cos(a) * 50 * r).toFixed(2)}% ${(50 + Math.sin(a) * 50 * r).toFixed(2)}%`);
  }
  return `polygon(${out.join(",")})`;
}

const IMG = "../frontend/public/images/";
const WA = "https://wa.me/573177371695";

/* Mismos datos que frontend/src/data/promos.js. `dow` = día de la semana (0 = domingo) */
const PROMOS = [
  { day: "Lunes", dow: 1, title: "De 2 pa' 2", desc: "2 salchipapas personales (la que quieras) + 2 gaseosas personales", price: "$46.000", badge: "COMBO", img: IMG + "clasica.webp", c: "#ff6600" },
  { day: "Miércoles", dow: 3, title: "Miércoles Mexicano", desc: "2x1 en nachos · 2 burros (El Gringo o El Burro) por solo $36.000", price: "2x1", badge: "2x1", img: IMG + "nachos-texmex.webp", c: "#ffcc00" },
  { day: "Jueves", dow: 4, title: "Jueves de Alitas", desc: "2x1 en TODAS las alitas. Elige tus salsas favoritas.", price: "2x1", badge: "2x1", img: IMG + "alitas-24.webp", c: "#ff003c" },
  { day: "Domingo", dow: 0, title: "Domingo de Burgers", desc: "Por la compra de cualquier hamburguesa, ¡la gaseosa personal va GRATIS!", price: "GRATIS", badge: "GRATIS", img: IMG + "hamburguesa-especial.webp", c: "#f4efe6" },
];

const promoWa = (p) => `${WA}?text=${encodeURIComponent(`¡Hola SalchiMax! Quiero aprovechar la promo de ${p.day}: ${p.title} 🔥`)}`;

/* "Hoy": día real, o ?hoy=0..6 para probar cualquier día */
const DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const DOW = (() => {
  const q = new URLSearchParams(location.search).get("hoy");
  return q !== null && q !== "" ? ((+q % 7) + 7) % 7 : new Date().getDay();
})();
const TODAY_I = PROMOS.findIndex((p) => p.dow === DOW);
/* Próxima promo (si hoy no hay): índice y días que faltan */
function nextPromo() {
  for (let n = 1; n <= 7; n++) {
    const i = PROMOS.findIndex((p) => p.dow === (DOW + n) % 7);
    if (i >= 0) return { i, in: n };
  }
}
const pad = (n) => String(n).padStart(2, "0");
const SCISSORS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/></svg>';
const WA_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
