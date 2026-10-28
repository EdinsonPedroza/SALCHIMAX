import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, MessageCircle, Plus, Check } from "lucide-react";
import { useCart, useCartActions } from "../context/CartContext";

const WA_LINK = "https://wa.me/573177371695";

const IMAGES = {
  salchipapa: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80",
  salchipapa2: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&q=80",
  salchipapa3: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
  burger2: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80",
  burger3: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
  burger4: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80",
  burger5: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80",
  wings: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=80",
  wings2: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&q=80",
  wings3: "https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=500&q=80",
  fries: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&q=80",
  fries2: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=500&q=80",
  fries3: "https://images.unsplash.com/photo-1562059390-a761a084768e?w=500&q=80",
  combo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80",
  combo2: "https://images.unsplash.com/photo-1584208124888-6f36e9f3da7d?w=500&q=80",
  combo3: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&q=80",
  drink: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80",
  drink2: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80",
  drink3: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80",
};

const categories = [
  { id: "salchipapas", label: "Salchipapas" },
  { id: "burgers", label: "Hamburguesas" },
  { id: "alitas", label: "Alitas" },
  { id: "nachos", label: "Nachos" },
  { id: "burros", label: "Burros" },
  { id: "bebidas", label: "Bebidas" },
];

const menuData = {
  salchipapas: [
    { name: "La Clásica", desc: "Papa amarilla, papa francesa, salchicha, queso, tocineta", price: "$18.000", price2: "$32.000", img: "/images/clasica.webp" },
    { name: "La Mixta", desc: "Papa amarilla, salchicha, queso, tocineta, pollo y guacamole", price: "$20.000", price2: "$38.000", img: "/images/mixta.webp" },
    { name: "De La Casa", desc: "Papa amarilla, papa francesa, salchicha, queso, maíz, chorizo", price: "$20.000", price2: "$36.000", img: "/images/de-la-casa.webp" },
    { name: "La Máxima", desc: "Papa amarilla, salchicha, queso, pollo, BBQ, maduro y chorizo", price: "$22.000", price2: "$38.000", img: "/images/maxima.webp" },
    { name: "La Colombiana", desc: "Papa amarilla, papa francesa, salchicha, maíz, maduro, costilla BBQ, queso", price: "$23.000", price2: "$41.000", img: "/images/colombiana.webp" },
    { name: "Callejera", desc: "Papa amarilla, salchicha, queso, pollo y carne desmechada, ripio de papa", price: "$22.000", price2: "$38.000", img: "/images/callejera.webp" },
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
      img: "/images/salchimax.webp",
    },
  ],
  burgers: [
    { name: "La Clásica", desc: "Pan brioche, queso, carne 100% Angus, lechuga crespa, tomate, cebolla, salsa especial", price: "$21.000", img: IMAGES.burger },
    { name: "Chicken Burger", desc: "Pan brioche, queso, filete de pollo apanado, mermelada de tocineta, lechuga crespa, cebolla, tomate y salsa especial", price: "$22.000", img: IMAGES.burger2 },
    { name: "Especial", desc: "Pan brioche, queso, carne 100% Angus, tocineta, lechuga crespa, tomate, cebolla caramelizada, salsa especial", price: "$23.000", img: "/images/hamburguesa-especial.webp" },
    { name: "Cheesy Crunch", desc: "Pan brioche, queso apanado, carne 100% Angus, mermelada de tocineta, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: "/images/cheesy-crunch.webp" },
    { name: "La Triple", desc: "Pan brioche, queso, carne 100% Angus, pollo y carne desmechado, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: IMAGES.burger5 },
  ],
  alitas: [
    { name: "x6 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$28.000", img: "/images/alitas-6.webp" },
    { name: "x12 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$51.000", img: "/images/alitas-12.webp" },
    { name: "x24 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$96.000", img: "/images/alitas-24.webp" },
  ],
  nachos: [
    { name: "Toppins Nachos", desc: "Nachos, queso, pico de gallo, sour cream, guacamole", price: "$25.000", img: IMAGES.fries },
    { name: '"Colombianos"', desc: "Nachos, queso, pico de gallo, pollo desmechado, carne desmechada y maduro", price: "$33.500", img: IMAGES.fries2 },
    { name: "Tex - Mex", desc: "Nachos, queso, pico de gallo, pollo BBQ, guacamole, tocineta y maíz", price: "$33.500", img: "/images/nachos-texmex.webp" },
  ],
  burros: [
    { name: "El Burro", desc: "Carne y pollo desmechado, guacamole, pico de gallo, lechuga, queso", price: "$20.000", img: IMAGES.combo },
    { name: "El Gringo", desc: "Pollo BBQ, salchicha ranchera, lechuga, pico de gallo, queso, tocineta", price: "$20.000", img: "/images/gringo-burrito.webp" },
    { name: "El Super Burro", desc: "Carne y pollo desmechado, tocineta, pico de gallo, aguacate, lechuga, queso y salchicha ranchera", price: "$23.000", img: "/images/superburro.webp" },
  ],
  bebidas: [
    { name: "Gaseosa (Personal)", desc: "Bebida personal", price: "$5.000", img: IMAGES.drink },
    { name: "Jugo Hit (Personal)", desc: "Bebida personal", price: "$5.000", img: "/images/hit-personal.webp" },
    { name: "Agua (Personal)", desc: "Bebida personal", price: "$3.000", img: IMAGES.drink3 },
    { name: "Gaseosa (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: "/images/cocacola-litro.webp" },
    { name: "Jugo Hit (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: "/images/hit-litro.webp" },
  ],
};

// 1 / 2 personas (price2) o varios tamaños (prices); null si el plato tiene un solo precio.
function getPortions(item) {
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

// memo + actions-only context: adding one item used to re-render all 20 cards
// (and their Framer Motion wrappers) through the cart context.
const ProductCard = memo(function ProductCard({ item, index }) {
  const { addItem } = useCartActions();
  const reduceMotion = useReducedMotion();
  const portions = useMemo(() => getPortions(item), [item]);
  const [selected, setSelected] = useState(0);
  const [priceTicks, setPriceTicks] = useState(0);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const addTimer = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(addTimer.current);
    },
    []
  );

  const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  const portion = portions ? portions[selected] : null;
  const price = portion ? portion.price : item.price;

  const choosePortion = (next) => {
    if (next === selected) return;
    setSelected(next);
    setPriceTicks((n) => n + 1);
  };

  // Arrow keys move through the portions, like any radio group.
  const handlePortionKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (selected + step + portions.length) % portions.length;
    choosePortion(next);
    e.currentTarget.querySelectorAll('[role="radio"]')[next]?.focus();
  };

  const handleAdd = () => {
    addItem({
      name: portion ? `${item.name} (${portion.label})` : item.name,
      price,
      img: item.img,
    });
    setAdded(true);
    clearTimeout(addTimer.current);
    addTimer.current = setTimeout(() => setAdded(false), 2000);
  };

  // The border glow follows the mouse: one style write per frame, touch/pen ignored.
  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = cardRef.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const x = pointer.current.x - box.left;
      const y = pointer.current.y - box.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      // -1…1 across the card: the photo drifts a few px against the cursor
      el.style.setProperty("--nx", (x / box.width) * 2 - 1);
      el.style.setProperty("--ny", (y / box.height) * 2 - 1);
    });
  };

  // Photo settles back to the centre (CSS eases it) when the mouse leaves.
  const handlePointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    cardRef.current?.style.setProperty("--nx", 0);
    cardRef.current?.style.setProperty("--ny", 0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        // Stagger per grid row (max 4 columns) so delays never pile up
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={reduceMotion ? undefined : handlePointerMove}
      onPointerLeave={reduceMotion ? undefined : handlePointerLeave}
      data-testid={`product-card-${slug}`}
      className="menu-card"
    >
      {/* The photo leads: clean, no overlays on top of the dish */}
      <div className="menu-card__photo">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-3">
        <h3 className="menu-name font-heading text-[1.45rem] leading-none tracking-wide text-white">
          {item.name}
        </h3>
        <p className="menu-desc mt-1.5 flex-1 font-body text-[0.78rem] font-semibold leading-[1.45] text-white/55">
          {item.desc}
        </p>

        {/* Portions: segmented control with a sliding thumb */}
        {portions && (
          <div
            role="radiogroup"
            aria-label={`Porción de ${item.name}`}
            onKeyDown={handlePortionKey}
            className={`menu-seg${portions.length > 2 ? " menu-seg--stack" : ""}`}
            style={{ "--n": portions.length, "--k": selected }}
          >
            <i className="menu-seg__thumb" aria-hidden="true" />
            {portions.map((p, j) => (
              <button
                key={p.label}
                type="button"
                role="radio"
                aria-checked={selected === j}
                tabIndex={selected === j ? 0 : -1}
                data-testid={`portion-${slug}-${j}`}
                onClick={() => choosePortion(j)}
                className="menu-seg__opt"
              >
                <span>{p.label}</span>
                <b>{p.price}</b>
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2.5">
          <div className="flex min-w-0 flex-col gap-1">
            <small className="font-body text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/40">
              {portion ? portion.label : "Precio"}
            </small>
            <b
              key={priceTicks}
              className={`menu-price font-heading text-[1.7rem] font-normal leading-[0.9] text-[#FF6600]${
                priceTicks ? " menu-tick" : ""
              }`}
            >
              {price}
            </b>
          </div>

          {/* Round "+" that opens into an "AGREGADO ✓" pill */}
          <button
            type="button"
            data-testid={`add-to-cart-${slug}`}
            onClick={handleAdd}
            aria-label={`Agregar ${item.name} al pedido`}
            className={`menu-add${added ? " is-done" : ""}`}
          >
            <span className="menu-add__label" aria-hidden="true">
              AGREGADO
            </span>
            <span className="menu-add__icon" aria-hidden="true">
              <span className="menu-add__plus">
                <Plus size={20} strokeWidth={2.6} />
              </span>
              <span className="menu-add__check">
                <Check size={20} strokeWidth={2.8} />
              </span>
            </span>
          </button>
          <span className="sr-only" role="status">
            {added ? `${item.name} agregado al pedido` : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default function Menu() {
  const [activeTab, setActiveTab] = useState("salchipapas");
  const { totalItems, setIsOpen } = useCart();

  return (
    <section id="menu" data-testid="menu-section" className="py-8 md:py-10 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block">
              Lo que más te gusta
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-3">NUESTRO MENÚ</h2>
            <div className="w-16 h-1 bg-[#FF6600]" />
          </div>

          {/* Cart summary pill */}
          {totalItems > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              data-testid="menu-cart-summary"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 bg-[#FF6600] text-white px-5 py-3 font-heading text-base tracking-widest hover:bg-[#FF8533] transition-colors self-start md:self-auto"
            >
              <ShoppingBag size={18} />
              VER PEDIDO ({totalItems})
            </motion.button>
          )}
        </motion.div>

        {/* Tabs */}
        <div data-testid="menu-tabs" className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-testid={`tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`font-heading text-sm tracking-widest px-4 py-2 border transition-all duration-200 ${
                activeTab === cat.id
                  ? "bg-[#FF6600] text-white border-[#FF6600]"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-[#FF6600] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Note for burgers */}
        {activeTab === "burgers" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="p-4 border border-[#FF6600]/30 bg-[#FF6600]/5">
              <p className="font-body text-sm text-gray-300">
                <span className="text-[#FF6600] font-semibold">💡 TIP:</span>{" "}
                Transforma tu hamburguesa a doble carne por solo: <span className="text-[#FF6600] font-semibold">$8.000 adicionales</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Note for alitas */}
        {activeTab === "alitas" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col gap-3"
          >
            <div className="p-4 border border-[#FF6600]/50 bg-[#FF6600]/10 text-center">
              <p className="font-heading text-sm text-white tracking-wide">
                🎉 <span className="text-[#FF6600]">Todos los jueves: 2x1 en todas las alitas</span>
              </p>
            </div>
            <div className="p-4 border border-[#FF6600]/30 bg-[#FF6600]/5">
              <p className="font-body text-sm text-gray-300">
                <span className="text-[#FF6600] font-semibold">SALSAS DISPONIBLES —</span>{" "}
                <span className="font-semibold text-white">Mild:</span> Miel Mostaza, BBQ, Teriyaki &nbsp;|&nbsp;
                <span className="font-semibold text-white">Hot:</span> BBQ Hot, Buffalo &nbsp;|&nbsp;
                <span className="font-semibold text-white">Extra:</span> BBQ Diablo, Buffalo Diablo
              </p>
            </div>
          </motion.div>
        )}

        {/* Note for nachos */}
        {activeTab === "nachos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="p-4 border border-[#FF6600]/50 bg-[#FF6600]/10 text-center">
              <p className="font-heading text-sm text-white tracking-wide">
                🎉 <span className="text-[#FF6600]">Miércoles mexicano: 2x1 en nachos</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            data-testid={`menu-grid-${activeTab}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {menuData[activeTab].map((item, i) => (
              <ProductCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          {totalItems > 0 ? (
            <button
              data-testid="menu-view-cart-btn"
              onClick={() => setIsOpen(true)}
              className="btn-orange flex items-center gap-3 px-8 py-4 font-heading text-xl tracking-widest"
            >
              <ShoppingBag size={22} />
              VER MI PEDIDO ({totalItems})
            </button>
          ) : (
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="menu-whatsapp-cta"
              className="btn-orange inline-flex items-center gap-3 px-8 py-4 font-heading text-xl tracking-widest"
            >
              <MessageCircle size={22} />
              PEDIR POR WHATSAPP
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
