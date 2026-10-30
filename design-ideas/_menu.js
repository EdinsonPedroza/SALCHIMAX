/* Datos y utilidades de los prototipos del Menú (requiere _shared.js).
   Los datos son los mismos de frontend/src/components/Menu.jsx. */
const U = (id) => `https://images.unsplash.com/${id}?w=700&q=80`;
const L = (f) => `${IMG}${f}`;

const MENU_CATS = [
  { id: "salchipapas", label: "Salchipapas" },
  { id: "burgers", label: "Hamburguesas" },
  { id: "alitas", label: "Alitas" },
  { id: "nachos", label: "Nachos" },
  { id: "burros", label: "Burros" },
  { id: "bebidas", label: "Bebidas" },
];

const MENU = {
  salchipapas: [
    { name: "La Clásica", desc: "Papa amarilla, papa francesa, salchicha, queso, tocineta", price: "$18.000", price2: "$32.000", img: L("clasica-v2.webp") },
    { name: "La Mixta", desc: "Papa amarilla, salchicha, queso, tocineta, pollo y guacamole", price: "$20.000", price2: "$38.000", img: L("mixta.webp") },
    { name: "De La Casa", desc: "Papa amarilla, papa francesa, salchicha, queso, maíz, chorizo", price: "$20.000", price2: "$36.000", img: L("de-la-casa.webp") },
    { name: "La Máxima", desc: "Papa amarilla, salchicha, queso, pollo, BBQ, maduro y chorizo", price: "$22.000", price2: "$38.000", img: L("maxima-v2.webp") },
    { name: "La Colombiana", desc: "Papa amarilla, papa francesa, salchicha, maíz, maduro, costilla BBQ, queso", price: "$23.000", price2: "$41.000", img: L("colombiana-v2.webp") },
    { name: "Callejera", desc: "Papa amarilla, salchicha, queso, pollo y carne desmechada, ripio de papa", price: "$22.000", price2: "$38.000", img: L("callejera-v2.webp") },
    { name: "Tex - Mex", desc: "Papa amarilla, salchicha, queso, carne desmechada, guacamole, pico de gallo", price: "$23.000", price2: "$41.000", img: L("tex-mex-salchi.webp") },
    { name: "Salchimax!", desc: "Salchicha, tocineta, papa amarilla, papa francesa, chorizo, pollo y carne desmechada, maduro, maicitos, doble queso, salsas y costilla BBQ casera", price: "$78.000", prices: [{ persons: "4 personas", price: "$78.000" }, { persons: "6 personas", price: "$110.000" }, { persons: "8 personas", price: "$150.000" }], img: L("salchimax-v2.webp") },
  ],
  burgers: [
    { name: "La Clásica", desc: "Pan brioche, queso, carne 100% Angus, lechuga crespa, tomate, cebolla, salsa especial", price: "$21.000", img: U("photo-1568901346375-23c9450c58cd") },
    { name: "Chicken Burger", desc: "Pan brioche, queso, filete de pollo apanado, mermelada de tocineta, lechuga, cebolla, tomate y salsa especial", price: "$22.000", img: U("photo-1606755962773-d324e0a13086") },
    { name: "Especial", desc: "Pan brioche, queso, carne 100% Angus, tocineta, lechuga crespa, tomate, cebolla caramelizada, salsa especial", price: "$23.000", img: L("hamburguesa-especial.webp") },
    { name: "Cheesy Crunch", desc: "Pan brioche, queso apanado, carne 100% Angus, mermelada de tocineta, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: L("cheesy-crunch.webp") },
    { name: "La Triple", desc: "Pan brioche, queso, carne 100% Angus, pollo y carne desmechado, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: U("photo-1571091718767-18b5b1457add") },
  ],
  alitas: [
    { name: "x6 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$28.000", img: L("alitas-6-v2.webp") },
    { name: "x12 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$51.000", img: L("alitas-12-v2.webp") },
    { name: "x24 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$96.000", img: L("alitas-12-v2.webp") },
  ],
  nachos: [
    { name: "Toppins Nachos", desc: "Nachos, queso, pico de gallo, sour cream, guacamole", price: "$25.000", img: U("photo-1513456852971-30c0b8199d4d") },
    { name: "\"Colombianos\"", desc: "Nachos, queso, pico de gallo, pollo desmechado, carne desmechada y maduro", price: "$33.500", img: U("photo-1582169296194-e4d644c48063") },
    { name: "Tex - Mex", desc: "Nachos, queso, pico de gallo, pollo BBQ, guacamole, tocineta y maíz", price: "$33.500", img: L("nachos.webp") },
  ],
  burros: [
    { name: "El Burro", desc: "Carne y pollo desmechado, guacamole, pico de gallo, lechuga, queso", price: "$20.000", img: U("photo-1626700051175-6818013e1d4f") },
    { name: "El Gringo", desc: "Pollo BBQ, salchicha ranchera, lechuga, pico de gallo, queso, tocineta", price: "$20.000", img: L("burrito.webp") },
    { name: "El Super Burro", desc: "Carne y pollo desmechado, tocineta, pico de gallo, aguacate, lechuga, queso y salchicha ranchera", price: "$23.000", img: L("superburro.webp") },
  ],
  bebidas: [
    { name: "Gaseosa (Personal)", desc: "Bebida personal", price: "$5.000", img: U("photo-1622483767028-3f66f32aef97") },
    { name: "Jugo Hit (Personal)", desc: "Bebida personal", price: "$5.000", img: L("hit-personal-v2.webp") },
    { name: "Agua (Personal)", desc: "Bebida personal", price: "$3.000", img: U("photo-1548839140-29a749e1cf4d") },
    { name: "Gaseosa (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: L("gaseosa-litro.webp") },
    { name: "Jugo Hit (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: L("hit-litro-medio.webp") },
  ],
};

/* Porciones: 1 / 2 personas (price2) o varios tamaños (prices). null si el plato tiene un solo precio. */
function portions(item) {
  if (item.prices) return item.prices.map((p) => ({ label: p.persons, price: p.price }));
  if (item.price2) return [{ label: "1 persona", price: item.price }, { label: "2 personas", price: item.price2 }];
  return null;
}

/* Pedido de mentira: solo cuenta lo que se agrega, para probar el feedback de "agregado" */
const CART = { n: 0, el: null };
function mountCart() {
  const b = document.createElement("div");
  b.className = "cartpill"; b.setAttribute("aria-live", "polite");
  b.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span>PEDIDO <b id="cartN">0</b></span>`;
  document.body.appendChild(b); CART.el = b;
}
function cartAdd() {
  CART.n++;
  $("#cartN").textContent = CART.n;
  CART.el.classList.remove("pop"); void CART.el.offsetWidth; CART.el.classList.add("pop");
}

/* Cabecera común: mismo lenguaje que Promos (contorno + bloque naranja) */
function mountMenuHead() {
  $("#mstroke").innerHTML = [..."NUESTRO"].map((ch, k) => `<span class="ch" aria-hidden="true"><i style="--k:${k}">${ch}</i></span>`).join("");
}
