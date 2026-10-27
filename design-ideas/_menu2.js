/* Utilidades de la ronda 2 del menú (requiere _shared.js y _menu.js) */
const ICON = {
  plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const priceNum = (s) => +String(s).replace(/\D/g, "");
const money = (n) => "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const flat = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/* Cambia el contenido de un contenedor con un fundido corto (sin desplazamientos) */
function swap(el, render) {
  clearTimeout(el._swap);
  if (REDUCED) { render(); return; }
  el.classList.add("out");
  el._swap = setTimeout(() => { render(); requestAnimationFrame(() => el.classList.remove("out")); }, 150);
}

/* Reinicia una animación CSS de una sola vez en un elemento (p. ej. al cambiar un precio) */
function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

/* Pestañas con indicador por recorte. Devuelve { select(id) }. */
function clipTabs(host, cats, active, onSelect) {
  host.classList.add("seg");
  const track = document.createElement("div");
  track.className = "seg-track"; track.setAttribute("role", "tablist"); track.setAttribute("aria-label", "Categorías");
  const fill = document.createElement("div");
  fill.className = "seg-fill"; fill.setAttribute("aria-hidden", "true");
  const html = (c) => `${c.label.toUpperCase()}<small>${MENU[c.id].length}</small>`;
  const btns = cats.map((c) => {
    const b = document.createElement("button");
    b.className = "seg-b"; b.setAttribute("role", "tab"); b.dataset.id = c.id; b.innerHTML = html(c);
    b.addEventListener("click", () => select(c.id));
    track.appendChild(b);
    const s = document.createElement("span"); s.innerHTML = html(c); fill.appendChild(s);
    return b;
  });
  track.appendChild(fill); host.appendChild(track);

  let cur = active;
  function place(anim) {
    const b = btns.find((x) => x.dataset.id === cur); if (!b) return;
    const l = b.offsetLeft, r = track.offsetWidth - l - b.offsetWidth;
    if (!anim) fill.style.transition = "none";
    fill.style.clipPath = `inset(4px ${r}px 4px ${l}px round 999px)`;
    if (!anim) { void fill.offsetWidth; fill.style.transition = ""; }
    btns.forEach((x) => { const on = x === b; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; });
    host.scrollTo({ left: l - (host.clientWidth - b.offsetWidth) / 2, behavior: anim && !REDUCED ? "smooth" : "auto" });
  }
  function select(id) { if (id === cur) return; cur = id; place(true); onSelect(id); }
  track.addEventListener("keydown", (e) => {
    const i = btns.findIndex((x) => x.dataset.id === cur);
    const to = e.key === "ArrowRight" ? (i + 1) % btns.length : e.key === "ArrowLeft" ? (i - 1 + btns.length) % btns.length : e.key === "Home" ? 0 : e.key === "End" ? btns.length - 1 : -1;
    if (to < 0) return;
    e.preventDefault(); select(btns[to].dataset.id); btns[to].focus();
  });
  place(false);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => place(false));
  addEventListener("resize", () => place(false));
  return { select };
}

/* Botón "Agregar" que cambia a "Agregado ✓" durante un momento */
function flashDone(btn, ms = 1600) {
  btn.classList.add("done");
  clearTimeout(btn._t);
  btn._t = setTimeout(() => btn.classList.remove("done"), ms);
}

/* Navegación con flechas dentro de un radiogroup (porciones) */
function radioKeys(group, selector) {
  group.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    const items = $$(selector, group), i = items.findIndex((x) => x === document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const to = items[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length];
    to.focus(); to.click();
  });
}
