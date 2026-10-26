/* Encabezado, cintas y aviso "hoy" comunes a las variantes de tarjeta (requiere _shared.js) */
grain();

$("#stroke").innerHTML = [..."PROMOS"].map((ch, k) => `<span class="ch" aria-hidden="true"><i style="--k:${k}">${ch}</i></span>`).join("");

const PHRASE = "2x1 ★ COMBO ★ GRATIS ★ PIDE POR WHATSAPP ★ LUNES ★ MIÉRCOLES ★ JUEVES ★ DOMINGO ★ ";
const STRIP = Array.from({ length: 6 }, () => `<span>${PHRASE}</span>`).join("");
$("#m1").innerHTML = STRIP; $("#m2").innerHTML = STRIP;

(() => {
  const t = $("#todayT");
  if (TODAY_I >= 0) t.innerHTML = `HOY ES ${DAYS[DOW].toUpperCase()} · <b>${PROMOS[TODAY_I].title.toUpperCase()}</b> ¡APROVECHA!`;
  else { const n = nextPromo(); t.innerHTML = `HOY ES ${DAYS[DOW].toUpperCase()} · ${n.in === 1 ? "MAÑANA" : "EN " + n.in + " DÍAS"}: <b>${PROMOS[n.i].title.toUpperCase()}</b>`; }
})();

/* Marca `.in` en cada elemento la primera vez que entra en pantalla */
function revealOnView(selector, threshold = 0.2) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold });
  $$(selector).forEach((el) => io.observe(el));
}

/* Las cintas aceleran con la velocidad del scroll y se frenan solas */
if (!REDUCED) {
  const speed = new Spring(1, { k: 40, c: 9 });
  let lastY = scrollY;
  loop((dt) => {
    const v = Math.abs(scrollY - lastY) / Math.max(dt, 0.001); lastY = scrollY;
    speed.target = 1 + clamp(v / 500, 0, 7);
    const s = speed.step(dt);
    document.getAnimations().forEach((a) => { if (a.animationName === "marquee") a.playbackRate = s; });
  });
}
