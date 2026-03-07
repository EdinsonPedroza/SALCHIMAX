import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, Plus, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

const WA_LINK = "https://wa.me/573177371695";

const IMAGES = {
  salchipapa: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=500&q=80",
  salchipapa2: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  salchipapa3: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&q=80",
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
  { id: "sandwiches", label: "Sándwich Cubano" },
  { id: "bebidas", label: "Bebidas" },
];

const menuData = {
  salchipapas: [
    { name: "La Clásica", desc: "Papa amarilla, papa francesa, salchicha, queso, tocineta", price: "$18.000", price2: "$32.000", img: IMAGES.salchipapa },
    { name: "La Mixta", desc: "Papa amarilla, salchicha, queso, tocineta, pollo y guacamole", price: "$20.000", price2: "$38.000", img: IMAGES.salchipapa2 },
    { name: "De La Casa", desc: "Papa amarilla, papa francesa, salchicha, queso, maíz, chorizo", price: "$20.000", price2: "$36.000", img: IMAGES.salchipapa3 },
    { name: "La Máxima", desc: "Papa amarilla, salchicha, queso, pollo, BBQ, maduro y chorizo", price: "$22.000", price2: "$38.000", img: IMAGES.salchipapa },
    { name: "La Colombiana", desc: "Papa amarilla, papa francesa, salchicha, maíz, maduro, costilla BBQ, queso", price: "$23.000", price2: "$41.000", img: IMAGES.salchipapa2 },
    { name: "Callejera", desc: "Papa amarilla, salchicha, queso, pollo y carne desmechada, ripio de papa", price: "$22.000", price2: "$38.000", img: IMAGES.salchipapa3 },
    { name: "Tex - Mex", desc: "Papa amarilla, salchicha, queso, carne desmechada, guacamole, pico de gallo", price: "$23.000", price2: "$41.000", img: IMAGES.salchipapa2 },
    {
      name: "Salchimax!",
      desc: "Salchicha, tocineta, papa amarilla, papa francesa, chorizo, pollo desmechado, carne desmechada, maduro, maicitos, doble queso, salsas, salsa de la casa y costilla en salsa BBQ casera",
      price: "$78.000",
      prices: [
        { persons: "4 personas", price: "$78.000" },
        { persons: "6 personas", price: "$110.000" },
        { persons: "8 personas", price: "$150.000" },
      ],
      img: IMAGES.salchipapa,
    },
  ],
  burgers: [
    { name: "La Clásica", desc: "Pan brioche, queso, carne 100% Angus, lechuga crespa, tomate, cebolla, salsa especial", price: "$21.000", img: IMAGES.burger },
    { name: "Chicken Burger", desc: "Pan brioche, queso, filete de pollo apanado, mermelada de tocineta, lechuga crespa, cebolla, tomate y salsa especial", price: "$22.000", img: IMAGES.burger2 },
    { name: "Especial", desc: "Pan brioche, queso, carne 100% Angus, tocineta, lechuga crespa, tomate, cebolla caramelizada, salsa especial", price: "$23.000", img: IMAGES.burger3 },
    { name: "Cheesy Crunch", desc: "Pan brioche, queso apanado, carne 100% Angus, mermelada de tocineta, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: IMAGES.burger4 },
    { name: "La Triple", desc: "Pan brioche, queso, carne 100% Angus, pollo y carne desmechado, lechuga crespa, cebolla, salsa especial", price: "$26.000", img: IMAGES.burger5 },
  ],
  alitas: [
    { name: "x6 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$28.000", img: IMAGES.wings },
    { name: "x12 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$51.000", img: IMAGES.wings2 },
    { name: "x24 Alitas", desc: "Acompañadas de papa amarilla, sour cream y palitos de zanahoria", price: "$96.000", img: IMAGES.wings3 },
  ],
  nachos: [
    { name: "Toppins Nachos", desc: "Nachos, queso, pico de gallo, sour cream, guacamole", price: "$25.000", img: IMAGES.fries },
    { name: '"Colombianos"', desc: "Nachos, queso, pico de gallo, pollo desmechado, carne desmechada y maduro", price: "$33.500", img: IMAGES.fries2 },
    { name: "Tex - Mex", desc: "Nachos, queso, pico de gallo, pollo BBQ, guacamole, tocineta y maíz", price: "$33.500", img: IMAGES.fries3 },
  ],
  burros: [
    { name: "El Burro", desc: "Carne y pollo desmechado, guacamole, pico de gallo, lechuga, queso", price: "$20.000", img: IMAGES.combo },
    { name: "El Gringo", desc: "Pollo BBQ, salchicha ranchera, lechuga, pico de gallo, queso, tocineta", price: "$20.000", img: IMAGES.combo2 },
    { name: "El Super Burro", desc: "Carne y pollo desmechado, tocineta, pico de gallo, aguacate, lechuga, queso y salchicha ranchera", price: "$23.000", img: IMAGES.combo },
  ],
  sandwiches: [
    { name: "Cubano Sencillo", desc: "Jamón de cerdo, cervéroni, lechuga, tomate, queso, salsa de ajo", price: "$15,000", img: IMAGES.combo3 },
    { name: "Cubano Hawaiano", desc: "Jamón de cerdo, piña calada, lechuga, tomate, queso, salsa de ajo", price: "$18,000", img: IMAGES.burger },
    { name: "Cubano Especial", desc: "Jamón de cerdo, tocineta, cervéroni, lechuga, tomate, queso, salsa de ajo", price: "$18,000", img: IMAGES.burger2 },
  ],
  bebidas: [
    { name: "Gaseosa (Personal)", desc: "Bebida personal", price: "$5.000", img: IMAGES.drink },
    { name: "Jugo Hit (Personal)", desc: "Bebida personal", price: "$5.000", img: IMAGES.drink2 },
    { name: "Agua (Personal)", desc: "Bebida personal", price: "$3.000", img: IMAGES.drink3 },
    { name: "Gaseosa (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: IMAGES.drink },
    { name: "Jugo Hit (Litro y Medio)", desc: "Bebida litro y medio", price: "$8.000", img: IMAGES.drink2 },
  ],
};

function ProductCard({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showPortionPicker, setShowPortionPicker] = useState(false);

  const handleAdd = () => {
    if ((item.price2 && item.price2 !== "") || (Array.isArray(item.prices) && item.prices.length > 0)) {
      setShowPortionPicker(true);
    } else {
      addItem({ name: item.name, price: item.price, img: item.img });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handlePortionSelect = (label, price) => {
    addItem({ name: `${item.name} (${label})`, price, img: item.img });
    setShowPortionPicker(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      data-testid={`product-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="food-card overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="overflow-hidden h-44 relative flex-shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="gallery-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <h3 className="font-heading text-lg text-white tracking-wide leading-tight">{item.name}</h3>
          {!item.prices && <span className="price-tag flex-shrink-0 text-base">{item.price}</span>}
        </div>
        <p className="font-body text-xs text-gray-400 leading-relaxed flex-1">{item.desc}</p>

        {/* Dual pricing for 1 / 2 persons */}
        {item.price2 && (
          <div className="mt-2 flex gap-2">
            <span className="flex-1 text-center font-body text-xs bg-[#FF6600]/10 border border-[#FF6600]/30 text-[#FF6600] py-1 px-2 rounded">
              👤 {item.price}
            </span>
            <span className="flex-1 text-center font-body text-xs bg-[#FF6600]/10 border border-[#FF6600]/30 text-[#FF6600] py-1 px-2 rounded">
              👥 {item.price2}
            </span>
          </div>
        )}

        {/* Multi-tier pricing for Salchimax! */}
        {item.prices && (
          <div className="mt-2 flex flex-col gap-1">
            {item.prices.map((tier) => (
              <span key={tier.persons} className="font-body text-xs text-[#FF6600]">
                {tier.persons}: <span className="font-semibold">{tier.price}</span>
              </span>
            ))}
          </div>
        )}

        {/* Add to cart button / Portion picker */}
        {showPortionPicker && item.price2 && item.price2 !== "" && !item.prices && (
          <div className="mt-3 flex flex-col gap-2">
            <p className="font-body text-xs text-gray-300 text-center font-semibold uppercase tracking-widest">¿Para cuántas personas?</p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePortionSelect("1 persona", item.price)}
                className="flex-1 py-3 font-heading text-sm border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all rounded flex flex-col items-center gap-1"
              >
                <span className="text-lg">👤</span>
                <span>1 PERSONA</span>
                <span className="text-xs font-body">{item.price}</span>
              </button>
              <button
                onClick={() => handlePortionSelect("2 personas", item.price2)}
                className="flex-1 py-3 font-heading text-sm border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all rounded flex flex-col items-center gap-1"
              >
                <span className="text-lg">👥</span>
                <span>2 PERSONAS</span>
                <span className="text-xs font-body">{item.price2}</span>
              </button>
            </div>
            <button
              onClick={() => setShowPortionPicker(false)}
              className="font-body text-xs text-gray-500 hover:text-gray-300 text-center mt-1"
            >
              Cancelar
            </button>
          </div>
        )}

        {showPortionPicker && Array.isArray(item.prices) && item.prices.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            <p className="font-body text-xs text-gray-400 text-center">¿Para cuántas personas?</p>
            <div className="flex flex-col gap-1">
              {item.prices.map((tier) => (
                <button
                  key={tier.persons}
                  onClick={() => handlePortionSelect(tier.persons, tier.price)}
                  className="w-full py-2 font-heading text-xs border border-[#FF6600]/50 text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all flex justify-between px-3"
                >
                  <span>{tier.persons}</span>
                  <span>{tier.price}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPortionPicker(false)}
              className="font-body text-xs text-gray-500 hover:text-gray-300 text-center"
            >
              Cancelar
            </button>
          </div>
        )}

        {!showPortionPicker && (
          <button
            data-testid={`add-to-cart-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={handleAdd}
            className={`mt-3 flex items-center justify-center gap-2 w-full py-2.5 font-heading text-sm tracking-widest transition-all duration-300 ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#FF6600]/10 border border-[#FF6600]/30 text-[#FF6600] hover:bg-[#FF6600] hover:text-white"
            }`}
          >
            {added ? (
              <>
                <Check size={15} />
                AGREGADO
              </>
            ) : (
              <>
                <Plus size={15} />
                AGREGAR AL PEDIDO
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("salchipapas");
  const { totalItems, setIsOpen } = useCart();

  return (
    <section id="menu" data-testid="menu-section" className="py-20 md:py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
                🎉 <span className="text-[#FF6600]">Domingos 2x1 en nachos</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            data-testid={`menu-grid-${activeTab}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {menuData[activeTab].map((item, i) => (
              <ProductCard key={i} item={item} />
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
