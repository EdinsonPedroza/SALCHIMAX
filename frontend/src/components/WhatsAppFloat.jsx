import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)]"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ scale: { duration: 2, repeat: Infinity, repeatDelay: 1 } }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
