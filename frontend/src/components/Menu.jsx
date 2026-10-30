import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, MessageCircle, Plus, Check } from "lucide-react";
import { useCart, useCartActions } from "../context/CartContext";
import { Reveal, VIEWPORT, EASE_OUT } from "./Reveal";
import { categories, menuData, getPortions } from "../data/menu";

const WA_LINK = "https://wa.me/573177371695";

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{
        duration: 0.5,
        // Stagger per grid row (max 4 columns) so delays never pile up
        delay: (index % 4) * 0.07,
        ease: EASE_OUT,
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
          style={item.pos ? { objectPosition: item.pos } : undefined}
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Reveal as="span" variant="hop" className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block w-fit">
              Lo que más te gusta
            </Reveal>
            <Reveal as="h2" variant="hop" delay={0.08} className="font-heading text-5xl md:text-6xl text-white mb-3 w-fit">
              NUESTRO MENÚ
            </Reveal>
            <Reveal variant="bar" delay={0.22} className="w-16 h-1 bg-[#FF6600]" />
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
        </div>

        {/* Tabs */}
        <Reveal data-testid="menu-tabs" delay={0.3} className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-testid={`tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`font-heading text-sm tracking-widest px-4 py-2 border active:scale-[0.97] transition-[background-color,border-color,color,transform] duration-150 ease-out-strong ${
                activeTab === cat.id
                  ? "bg-[#FF6600] text-white border-[#FF6600]"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-[#FF6600] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

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
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            data-testid={`menu-grid-${activeTab}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {menuData[activeTab].map((item, i) => (
              <ProductCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Ley 1480: prices in COP with taxes (art. 26) and the scale of product photos (art. 50 lit. b) */}
        <p className="mt-6 text-center font-body text-xs text-white/50">
          Precios en pesos colombianos (COP), impuestos incluidos. Fotos de referencia, no están a escala.
        </p>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
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
