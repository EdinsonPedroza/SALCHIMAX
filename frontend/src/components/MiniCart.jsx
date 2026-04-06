import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function MiniCart() {
  const { totalItems, setIsOpen } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  // Show "Added to cart" notification when items are added
  useEffect(() => {
    if (totalItems > 0) {
      setShowAdded(true);
      const timer = setTimeout(() => setShowAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // Don't show if cart is empty
  if (totalItems === 0) return null;

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
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-24 z-40 bg-[#FF6600] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(255,102,0,0.5)] flex items-center gap-2 hover:bg-[#e65c00] transition-colors"
          aria-label="Ver carrito"
        >
          <ShoppingBag size={24} />
          <span className="font-heading text-lg font-bold">
            {totalItems}
          </span>
        </motion.button>
      </AnimatePresence>
    </>
  );
}

