// ──────────────────────────────────────────────────────────────
//  PROMOS — Edita SOLO este archivo para cambiar las promociones.
//
//  Cómo funciona cada promo:
//   - day:    día(s) de la promo (etiqueta que se muestra arriba). Escribe el
//             nombre del día ("Lunes", "Lunes y Martes"): así se marca la de HOY
//   - color:  (opcional) color de acento, ej "#FF6600". Si no, usa el naranja de la marca
//   - title:  nombre de la promo
//   - desc:   descripción corta
//   - price:  precio (deja "" si no aplica)
//   - badge:  sello destacado, ej "2x1" o "GRATIS" (deja "" si no aplica)
//   - cond:   (opcional) condiciones o restricciones, ej "No acumulable · Solo en el local".
//             La ley (art. 33, Ley 1480) exige mostrarlas en la misma promo: si no las
//             escribes aquí, la promo aplica sin restricciones el día indicado
//   - img:    ruta de la foto en /images/...
//   - active: true = se muestra · false = se oculta (sin borrarla)
//
//  Para AGREGAR una promo: copia un bloque { ... } y cámbialo.
//  Para OCULTAR una promo temporalmente: pon active: false
// ──────────────────────────────────────────────────────────────

export const promos = [
  {
    day: "Lunes",
    title: "De 2 pa' 2",
    desc: "2 salchipapas personales (la que quieras) + 2 gaseosas personales",
    price: "$46.000",
    badge: "COMBO",
    img: "/images/clasica.webp",
    active: true,
  },
  {
    day: "Miércoles",
    title: "Miércoles Mexicano",
    desc: "2x1 en nachos · 2 burros (El Gringo o El Burro) por solo $36.000",
    price: "2x1",
    badge: "2x1",
    img: "/images/nachos-texmex.webp",
    active: true,
  },
  {
    day: "Jueves",
    title: "Jueves de Alitas",
    desc: "2x1 en TODAS las alitas. Elige tus salsas favoritas.",
    price: "2x1",
    badge: "2x1",
    img: "/images/alitas-24.webp",
    active: true,
  },
  {
    day: "Domingo",
    title: "Domingo de Burgers",
    desc: "Por la compra de cualquier hamburguesa, ¡la gaseosa personal va GRATIS!",
    price: "GRATIS",
    badge: "GRATIS",
    img: "/images/hamburguesa-especial.webp",
    active: true,
  },
];
