import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MiniCart() {
  const { totalItems, setIsOpen } = useCart();

  // Don't show if cart is empty
  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#FF6600] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(255,102,0,0.5)] flex items-center gap-2 hover:bg-[#e65c00] transition-colors"
        aria-label="Ver carrito"
      >
        <ShoppingBag size={24} />
        <span className="font-heading text-lg font-bold">
          {totalItems}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}

