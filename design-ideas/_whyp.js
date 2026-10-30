/* Versiones con fotos de "¿Por qué elegir SALCHIMAX?" (requiere _shared.js y _why.js).
   Cada razón lleva una foto real de la carta (las mismas de /images/ en la landing). */
const WHY_PHOTO = {
  fresh: { src: IMG + "cheesy-crunch.webp", pos: "50% 36%", alt: "Hamburguesa Cheesy Crunch con lechuga crespa, cebolla y carne Angus", cap: "Cheesy Crunch" },
  epic: { src: IMG + "salchimax.webp", pos: "50% 58%", alt: "La Salchimax!: una salchipapa gigante con carnes, maduro, maíz y queso", cap: "Salchimax!" },
  price: { src: IMG + "clasica.webp", pos: "50% 64%", alt: "La Clásica: salchipapa con tocineta y queso en su caja", cap: "La Clásica · $18.000" },
  family: { src: IMG + "nachos.webp", pos: "50% 42%", alt: "Nachos Tex-Mex para compartir, en el local de Salchimax", cap: "Nachos Tex-Mex" },
  fast: { src: IMG + "alitas-12.webp", pos: "50% 52%", alt: "Alitas recién hechas con papas y salsas", cap: "Alitas x12" },
};
WHY.forEach((w) => { w.photo = WHY_PHOTO[w.key]; });

/* <img> con las medidas reales para no mover el layout al cargar */
const whyImg = (w, extra = "") => `<img src="${w.photo.src}" alt="${w.photo.alt}" width="640" height="900" decoding="async"${extra}>`;

/* Cifras comunes (las tres de la landing) con su conteo */
function whyStats(host) {
  WHY_STATS.forEach((s, i) => {
    const final = (s.dec ? s.value.toFixed(s.dec) : s.value) + s.suffix;
    const d = document.createElement("div");
    d.className = "wp-st";
    d.setAttribute("role", "img"); d.setAttribute("aria-label", `${final} ${s.label}`);
    d.innerHTML = `<b aria-hidden="true">${final}</b><span aria-hidden="true">${s.label}</span>`;
    host.appendChild(d);
    onceInView(d, () => { d.classList.add("in"); countUp($("b", d), s, { ms: 1500, delay: i * 120 }); }, 0.5);
  });
}
