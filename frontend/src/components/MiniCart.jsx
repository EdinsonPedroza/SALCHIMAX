import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function MiniCart() {
  const { totalItems, totalPrice, setIsOpen } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  // Show "Added to cart" notification when items are added
  useEffect(() => {
    if (totalItems > 0) {
      setShowAdded(true);
      const timer = setTimeout(() => setShowAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {showAdded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
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
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            className="fixed bottom-40 right-6 z-40"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-2xl bg-[#FF6600] opacity-30 animate-ping" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              data-testid="mini-cart-float-btn"
              className="relative bg-[#FF6600] text-white px-6 py-5 rounded-2xl shadow-[0_0_50px_rgba(255,102,0,1)] flex items-center gap-3 hover:bg-[#FF8533] transition-all duration-200 border-2 border-[#FF8533]"
              aria-label="Ver carrito"
            >
              {/* Badge de items */}
              <div className="relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-3 -right-3 bg-white text-[#FF6600] text-sm font-heading w-6 h-6 rounded-full flex items-center justify-center font-bold shadow">
                  {totalItems}
                </span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-heading text-xs tracking-widest opacity-90">MI PEDIDO</span>
                <span className="font-heading text-xl font-bold">${totalPrice.toLocaleString("es-CO")}</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

