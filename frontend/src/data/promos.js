// ──────────────────────────────────────────────────────────────
//  PROMOS — Edita SOLO este archivo para cambiar las promociones.
//
//  Cómo funciona cada promo:
//   - day:    día(s) de la promo (etiqueta que se muestra arriba)
//   - title:  nombre de la promo
//   - desc:   descripción corta
//   - price:  precio (deja "" si no aplica)
//   - badge:  sello destacado, ej "2x1" o "GRATIS" (deja "" si no aplica)
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
    img: "/images/clasica.jpg",
    active: true,
  },
  {
    day: "Miércoles",
    title: "Miércoles Mexicano",
    desc: "2x1 en nachos · 2 burros (El Gringo o El Burro) por solo $36.000",
    price: "2x1",
    badge: "2x1",
    img: "/images/nachos-texmex.png",
    active: true,
  },
  {
    day: "Jueves",
    title: "Jueves de Alitas",
    desc: "2x1 en TODAS las alitas. Elige tus salsas favoritas.",
    price: "2x1",
    badge: "2x1",
    img: "/images/alitas-24.png",
    active: true,
  },
  {
    day: "Domingo",
    title: "Domingo de Burgers",
    desc: "Por la compra de cualquier hamburguesa, ¡la gaseosa personal va GRATIS!",
    price: "GRATIS",
    badge: "GRATIS",
    img: "/images/hamburguesa-especial.png",
    active: true,
  },
];
