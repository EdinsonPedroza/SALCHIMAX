// The menu: one source of truth for the product grid and the cart suggestions.

const IMAGES = {
  salchipapa: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80",
  salchipapa2: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&q=80",
  salchipapa3: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  burger3: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
  burger4: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80",
  wings: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=80",
  wings2: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&q=80",
  wings3: "https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=500&q=80",
  fries3: "https://images.unsplash.com/photo-1562059390-a761a084768e?w=500&q=80",
  combo2: "https://images.unsplash.com/photo-1584208124888-6f36e9f3da7d?w=500&q=80",
  combo3: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&q=80",
  drink: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80",
  drink2: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80",
  drink3: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80",
};

export const categories = [
  { id: "salchipapas", label: "Salchipapas" },
  { id: "burgers", label: "Hamburguesas" },
  { id: "alitas", label: "Alitas" },
  { id: "nachos", label: "Nachos" },
  { id: "burros", label: "Burros" },
  { id: "bebidas", label: "Bebidas" },
];

// `pos` (optional) is the object-position of the card photo: it keeps the dish in frame
// when the photo is taller than the card.
export const menuData = {
  salchipapas: [
    { name: "La Clásica", desc: "Papa amarilla, papa francesa, salchicha, queso, tocineta", price: "$18.000", price2: "$32.000", img: "/images/clasica-v2.webp", pos: "50% 80%" },
    { name: "La Mixta", desc: "Papa amarilla, salchicha, queso, tocineta, pollo y guacamole", price: "$20.000", price2: "$38.000", img: "/images/mixta.webp" },
    { name: "De La Casa", desc: "Papa amarilla, papa francesa, salchicha, queso, maíz, chorizo", price: "$20.000", price2: "$36.000", img: "/images/de-la-casa.webp" },
    { name: "La Máxima", desc: "Papa amarilla, salchicha, queso, pollo, BBQ, maduro y chorizo", price: "$22.000", price2: "$38.000", img: "/images/maxima-v2.webp", pos: "50% 80%" },
    { name: "La Colombiana", desc: "Papa amarilla, papa francesa, salchicha, maíz, maduro, costilla BBQ, queso", price: "$23.000", price2: "$41.000", img: "/images/colombiana-v2.webp", pos: "50% 80%" },
    { name: "Callejera", desc: "Papa amarilla, salchicha, queso, pollo y carne desmechada, ripio de papa", price: "$22.000", price2: "$38.000", img: "/images/callejera-v2.webp", pos: "50% 80%" },
    { name: "Tex - Mex", desc: "Papa amarilla, salchicha, queso, carne desmechada, guacamole, pico de gallo", price: "$23.000", price2: "$41.000", img: "/images/tex-mex-salchi.webp" },
    {
      name: "Salchimax!",
      desc: "Salchicha, tocineta, papa amarilla, papa francesa, chorizo, pollo desmechado, carne desmechada, maduro, maicitos, doble queso, salsas, salsa de la casa y costilla en salsa BBQ casera",
      price: "$78.000",
      prices: [
        { persons: "4 personas", price: "$78.000" },
        { persons: "6 personas", price: "$110.000" },
        { persons: "8 personas", price: "$150.000" },
      ],
      img: "/images/salchimax-v2.webp",
      pos: "50% 80%",
    },
  ],
  burgers: [
    { name: "La Clásica", desc: "Pan brioche, queso, carne 100% Angus, lechuga crespa, tomate, cebolla, salsa especial", price: "$21.000", img: "/images/hamburguesa-clasica.webp" },
    { name: "Chicken Burger", desc: "Pan brioche, queso, filete de pollo apanado, mermelada de tocineta, lechuga crespa, cebolla, tomate y salsa especial", price: "$22.000", img: "/images/chicken-burger.webp" },
    { name: "Especial", desc: "Pan brioche, queso, carne 100% Angus, tocineta, lechuga crespa, tomate, cebolla caramelizada, salsa especial", price: "$23.000", img: "/images/hamburguesa-especial.webp" },
    { name: "Cheesy Crunch", desc: "Pan brioche, queso apanado, carne 100% Angus, mermelada de tocineta, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: "/images/cheesy-crunch.webp" },
    { name: "La Triple", desc: "Pan brioche, queso, carne 100% Angus, pollo y carne desmechado, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: "/images/la-triple.webp" },
  ],
  alitas: [
    { name: "x6 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$28.000", img: "/images/alitas-6-v2.webp", pos: "50% 65%" },
    { name: "x12 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$51.000", img: "/images/alitas-12-v2.webp" },
    { name: "x24 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$96.000", img: "/images/alitas-12-v2.webp" },
  ],
  nachos: [
    { name: "Toppins Nachos", desc: "Nachos, queso, pico de gallo, sour cream, guacamole", price: "$25.000", img: "/images/nachos.webp" },
    { name: '"Colombianos"', desc: "Nachos, queso, pico de gallo, pollo desmechado, carne desmechada y maduro", price: "$33.500", img: "/images/nachos.webp" },
    { name: "Tex - Mex", desc: "Nachos, queso, pico de gallo, pollo BBQ, guacamole, tocineta y maíz", price: "$33.500", img: "/images/nachos.webp" },
  ],
  burros: [
    { name: "El Burro", desc: "Carne y pollo desmechado, guacamole, pico de gallo, lechuga, queso", price: "$20.000", img: "/images/burrito.webp", pos: "50% 65%" },
    { name: "El Gringo", desc: "Pollo BBQ, salchicha ranchera, lechuga, pico de gallo, queso, tocineta", price: "$20.000", img: "/images/burrito.webp", pos: "50% 65%" },
    { name: "El Super Burro", desc: "Carne y pollo desmechado, tocineta, pico de gallo, aguacate, lechuga, queso y salchicha ranchera", price: "$23.000", img: "/images/superburro.webp" },
  ],
  bebidas: [
    { name: "Gaseosa (Personal)", desc: "Bebida personal", price: "$5.000", img: IMAGES.drink },
    { name: "Jugo Hit (Personal)", desc: "Bebida personal", price: "$5.000", img: "/images/hit-personal-v2.webp" },
    { name: "Agua (Personal)", desc: "Bebida personal", price: "$3.000", img: IMAGES.drink3 },
    { name: "Gaseosa (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: "/images/gaseosa-litro.webp" },
    { name: "Jugo Hit (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: "/images/hit-litro-medio.webp" },
  ],
};

// 1 / 2 personas (price2) o varios tamaños (prices); null si el plato tiene un solo precio.
export function getPortions(item) {
  if (Array.isArray(item.prices) && item.prices.length > 0) {
    return item.prices.map((tier) => ({ label: tier.persons, price: tier.price }));
  }
  if (item.price2) {
    return [
      { label: "1 persona", price: item.price },
      { label: "2 personas", price: item.price2 },
    ];
  }
  return null;
}

// Small tiles (cart suggestions) don't need the full photo. Local photos have a 160px
// twin in /images/thumbs/ (about a tenth of the bytes); Unsplash resizes on request.
export function thumbOf(img) {
  if (img.startsWith("/images/")) return img.replace("/images/", "/images/thumbs/");
  return img.replace(/([?&])w=\d+/, "$1w=160");
}

// ── "¿Un último antojo?" ─────────────────────────────────────────────────────
// Small things that go with what is already in the cart, offered at the bottom of
// the cart drawer. Only single-price products are offered (one tap adds one unit,
// no portion to choose) and nothing above ADD_ON_MAX_PRICE: it is an impulse buy.
// What goes with what is a plain affinity table; ties go to the cheapest.
export const ADD_ON_MAX_PRICE = 28000;

const AFFINITY = {
  salchipapas: { bebidas: 3, alitas: 2, nachos: 1 },
  burgers: { bebidas: 3, nachos: 2, alitas: 1 },
  alitas: { bebidas: 3, nachos: 1, burgers: 1 },
  nachos: { bebidas: 3, alitas: 1, burgers: 1 },
  burros: { bebidas: 3, nachos: 1 },
  bebidas: { burros: 2, burgers: 2, nachos: 1, alitas: 1 },
};

const toNumber = (price) => parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

// Everything that can sit in the cart, by the exact name the cart gives it
// ("La Clásica (1 persona)" for portioned dishes), so a cart line maps to a category.
const CATEGORY_BY_NAME = new Map();
const ADD_ONS = [];
for (const [category, items] of Object.entries(menuData)) {
  for (const item of items) {
    const portions = getPortions(item);
    if (portions) {
      portions.forEach((p) => CATEGORY_BY_NAME.set(`${item.name} (${p.label})`, category));
    } else {
      CATEGORY_BY_NAME.set(item.name, category);
      const priceNum = toNumber(item.price);
      if (priceNum <= ADD_ON_MAX_PRICE) {
        ADD_ONS.push({ id: `${category}:${item.name}`, category, name: item.name, price: item.price, priceNum, img: item.img });
      }
    }
  }
}

/** Up to `limit` suggestions for a cart, never repeating what is in it nor more than two per category. */
export function getAddOns(cartItems, limit = 6) {
  if (cartItems.length === 0) return [];
  const have = new Set(cartItems.map((i) => i.name));
  const cats = cartItems.map((i) => CATEGORY_BY_NAME.get(i.name)).filter(Boolean);
  const scored = ADD_ONS.filter((p) => !have.has(p.name))
    .map((p) => ({ p, score: cats.reduce((sum, c) => sum + (AFFINITY[c]?.[p.category] ?? 0), 0) }))
    .sort((a, b) => b.score - a.score || a.p.priceNum - b.p.priceNum);

  const out = [];
  const perCategory = {};
  for (const { p } of scored) {
    if ((perCategory[p.category] ?? 0) >= 2) continue;
    perCategory[p.category] = (perCategory[p.category] ?? 0) + 1;
    out.push(p);
    if (out.length === limit) break;
  }
  return out;
}
