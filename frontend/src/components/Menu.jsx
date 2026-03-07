import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, Plus, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

const WA_LINK = "https://wa.me/573177371695";

const IMAGES = {
  salchipapa: "https://images.unsplash.com/photo-1762284513031-3d7ad15562bc?w=500&q=80",
  salchipapa2: "https://images.unsplash.com/photo-1771818708792-d671ae9b4b46?w=500&q=80",
  salchipapa3: "https://images.unsplash.com/photo-1770117160166-cece70b1f0b0?w=500&q=80",
  burger: "https://images.unsplash.com/photo-1678110707289-ab14382a1625?w=500&q=80",
  burger2: "https://images.unsplash.com/photo-1678110707493-8d05425137ac?w=500&q=80",
  wings: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?w=500&q=80",
  fries: "https://images.unsplash.com/photo-1662452883375-9226ea22c765?w=500&q=80",
  combo: "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=500&q=80",
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
    { name: "La Mixta", desc: "Papa amarilla, salchicha, queso, tocineta, pollo y guacamole", price: "$20.000", price2: "$38.000", img: IMAGES.salchipapa },
    { name: "De La Casa", desc: "Papa amarilla, papa francesa, salchicha, queso, maíz, chorizo", price: "$20.000", price2: "$36.000", img: IMAGES.salchipapa },
    { name: "La Máxima", desc: "Papa amarilla, salchicha, queso, pollo, BBQ, maduro y chorizo", price: "$22.000", price2: "$38.000", img: IMAGES.salchipapa },
    { name: "La Colombiana", desc: "Papa amarilla, papa francesa, salchicha, maíz, maduro, costilla BBQ, queso", price: "$23.000", price2: "$41.000", img: IMAGES.salchipapa },
    { name: "Callejera", desc: "Papa amarilla, salchicha, queso, pollo y carne desmechada, ripio de papa", price: "$22.000", price2: "$38.000", img: IMAGES.salchipapa },
    { name: "Tex - Mex", desc: "Papa amarilla, salchicha, queso, carne desmechada, guacamole, pico de gallo", price: "$23.000", price2: "$41.000", img: IMAGES.salchipapa },
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
    { name: "Burger Clásica", desc: "Pan brioche, queso cheddar, carne de res, lechuga crespa, tomate, cebolla, salsa especial. Con papa amarilla", price: "$18,000", img: IMAGES.burger },
    { name: "Burger Especial", desc: "Pan brioche, doble queso, carne de res, tocineta, lechuga crespa, tomate, cebolla caramelizada, salsa especial. Con papa", price: "$22,000", img: IMAGES.burger2 },
    { name: "Doble Burger", desc: "Pan brioche, doble queso, 2 carnes de res, tocineta, lechuga crespa, tomate, salsa especial. Con papa amarilla", price: "$23,000", img: IMAGES.burger },
    { name: "La Argentina", desc: "Pan brioche, queso mozarella, carne y chorizo, lechuga, tomate, cebolla al vino, chimichurri, salsa especial. Con papa", price: "$24,000", img: IMAGES.burger2 },
    { name: "Tex-Mex Burger", desc: "Pan brioche, queso cheddar, carne de res, carne desmechada, lechuga crespa, pico de gallo, guacamole, salsa especial. Con papa", price: "$24,000", img: IMAGES.burger },
  ],
  alitas: [
    { name: "x6 Alitas", desc: "Acompañadas de papa amarilla, sour cream, palitos de apio y zanahoria", price: "$25,000", img: IMAGES.wings },
    { name: "x12 Alitas", desc: "Acompañadas de papa amarilla, sour cream, palitos de apio y zanahoria", price: "$48,000", img: IMAGES.wings },
    { name: "x24 Alitas", desc: "Acompañadas de papa amarilla, sour cream, palitos de apio y zanahoria", price: "$90,000", img: IMAGES.wings },
    { name: "x50 Alitas", desc: "La fiesta perfecta. Acompañadas de papa amarilla, sour cream, palitos de apio y zanahoria", price: "$150,000", img: IMAGES.wings },
  ],
  nachos: [
    { name: "Toppings Nachos", desc: "Nachos, queso, pico de gallo, sour cream, guacamole", price: "$20,000", img: IMAGES.fries },
    { name: "Nachos Colombianos", desc: "Nachos, queso, pico de gallo, pollo, maduro y carne desmechada", price: "$32,000", img: IMAGES.fries },
    { name: "Nachos Tex-Mex", desc: "Nachos, queso, pico de gallo, pollo bbq, guacamole, tocineta y maíz", price: "$30,000", img: IMAGES.fries },
  ],
  burros: [
    { name: "El Burro", desc: "Carne y pollo desmechado, aguacate, pico de gallo, lechuga, queso", price: "$18,000", img: IMAGES.combo },
    { name: "El Gringo", desc: "Pollo bbq, salchicha ranchera, lechuga, pico de gallo, queso, tocineta", price: "$18,000", img: IMAGES.combo },
    { name: "El Super Burro", desc: "Carne y pollo desmechado, tocineta, pico de gallo, aguacate, lechuga, queso y salchicha ranchera", price: "$20,000", img: IMAGES.combo },
  ],
  sandwiches: [
    { name: "Cubano Sencillo", desc: "Jamón de cerdo, cervéroni, lechuga, tomate, queso, salsa de ajo", price: "$15,000", img: IMAGES.burger2 },
    { name: "Cubano Hawaiano", desc: "Jamón de cerdo, piña calada, lechuga, tomate, queso, salsa de ajo", price: "$18,000", img: IMAGES.burger },
    { name: "Cubano Especial", desc: "Jamón de cerdo, tocineta, cervéroni, lechuga, tomate, queso, salsa de ajo", price: "$18,000", img: IMAGES.burger2 },
  ],
  bebidas: [
    { name: "Gaseosa", desc: "Bebida refrescante", price: "$4,000", img: IMAGES.combo },
    { name: "Jugo Hit", desc: "Jugo natural", price: "$4,000", img: IMAGES.combo },
    { name: "Agua", desc: "Agua mineral", price: "$2,500", img: IMAGES.combo },
    { name: "Club Colombia", desc: "Cerveza premium colombiana", price: "$4,500", img: IMAGES.combo },
    { name: "Poker", desc: "La cerveza de Colombia", price: "$4,500", img: IMAGES.combo },
    { name: "Águila Light", desc: "Cerveza ligera", price: "$4,500", img: IMAGES.combo },
    { name: "Corona", desc: "Cerveza importada", price: "$7,000", img: IMAGES.combo },
  ],
};

function ProductCard({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
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
          <p className="font-body text-xs text-[#FF6600] mt-2">
            🧑 {item.price} &nbsp;|&nbsp; 👥 {item.price2}
          </p>
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

        {/* Add to cart button */}
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

        {/* Build-your-own note for salchipapas */}
        {activeTab === "salchipapas" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col gap-3"
          >
            <div className="p-4 border border-[#FF6600]/50 bg-[#FF6600]/10 text-center">
              <p className="font-heading text-sm text-white tracking-wide">
                🎉 <span className="text-[#FF6600]">Con más de 6 ingredientes, la base de papa es GRATIS</span>
              </p>
            </div>
            <div className="p-4 border border-[#FF6600]/30 bg-[#FF6600]/5">
              <p className="font-body text-sm text-gray-300">
                <span className="text-[#FF6600] font-semibold">CREA LA TUYA:</span>{" "}
                Base desde <span className="text-[#FF6600]">$3,500</span> — Toppings: Queso desde $2,000 · Tocineta $3,500 · Chorizo $3,500 · Costilla BBQ $5,000 · Pollo Desmechado $4,500 · Carne Desmechada $4,500 y más
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
