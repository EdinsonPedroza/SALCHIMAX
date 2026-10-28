import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function MiniCart() {
  const { totalItems, totalPrice, setIsOpen, isOpen, addedTick } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  // The drawer shows the same information, so the toast stays out of its way.
  const openRef = useRef(isOpen);
  openRef.current = isOpen;

  // Only when something is added: removing or lowering a quantity must not say "Agregado"
  useEffect(() => {
    if (addedTick === 0 || openRef.current) return;
    setShowAdded(true);
    const timer = setTimeout(() => setShowAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [addedTick]);

  return (
    <>
      {/* Toast notification: fades in from its corner, no sliding */}
      <AnimatePresence>
        {showAdded && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ transformOrigin: "top right" }}
            role="status"
            className="fixed top-24 right-6 z-[80] bg-[#1A1A1A] border border-[#FF6600]/30 text-white px-4 py-3 rounded-lg shadow-[0_4px_20px_rgba(255,102,0,0.3)] flex items-center gap-3"
          >
            <div className="bg-[#FF6600] w-8 h-8 rounded-full flex items-center justify-center">
              <Check size={16} className="text-white" />
            </div>
            <div>
              <p className="font-heading text-sm">Agregado al carrito</p>
              <p className="font-body text-xs text-gray-400">{totalItems} producto{totalItems > 1 ? 's' : ''} en el pedido</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.22, ease: EASE_OUT } }}
            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15 } }}
            className="fixed bottom-6 right-24 z-40"
          >
            {/* One ring per added product (it used to ping forever) */}
            <span
              key={addedTick}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-2xl bg-[#FF6600]${addedTick ? " cart-ring" : " opacity-0"}`}
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              data-testid="mini-cart-float-btn"
              className="relative bg-[#FF6600] text-white px-6 py-5 rounded-2xl shadow-[0_10px_30px_-6px_rgba(255,102,0,0.6)] flex items-center gap-3 hover:bg-[#FF8533] transition-colors duration-200 border-2 border-[#FF8533]"
              aria-label="Ver carrito"
            >
              {/* Badge de items */}
              <div className="relative">
                <ShoppingBag size={28} />
                <span
                  key={addedTick}
                  className={`absolute -top-3 -right-3 bg-white text-[#FF6600] text-sm font-heading w-6 h-6 rounded-full flex items-center justify-center font-bold shadow${addedTick ? " badge-pop" : ""}`}
                >
                  {totalItems}
                </span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-heading text-xs tracking-widest opacity-90">MI PEDIDO</span>
                <span key={totalPrice} className="menu-tick font-heading text-xl font-bold">
                  ${totalPrice.toLocaleString("es-CO")}
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
