import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";

export default function OrderCTA() {
  return (
    <section
      id="order-cta"
      data-testid="order-cta-section"
      className="py-24 md:py-32 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* Orange glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,102,0,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-4 block">
            ¿Listo para el antojo?
          </span>
          <h2 className="font-heading text-6xl md:text-8xl text-white leading-none mb-6">
            ANTOJO DE
            <br />
            <span className="text-[#FF6600]">ALGO DELICIOSO?</span>
          </h2>
          <p className="font-body text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Haz tu pedido ahora mismo por WhatsApp o llámanos.
            Abrimos desde las 5 PM todos los días.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-btn"
              className="btn-orange flex items-center gap-3 px-10 py-5 text-2xl font-heading tracking-widest w-full sm:w-auto justify-center shadow-[0_0_40px_rgba(255,102,0,0.3)]"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,102,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}>
                <MessageCircle size={28} />
              </motion.span>
              PEDIR POR WHATSAPP
            </motion.a>
            <motion.a
              href="tel:3177371695"
              data-testid="cta-phone-btn"
              className="btn-outline-orange flex items-center gap-3 px-10 py-5 text-2xl font-heading tracking-widest w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={28} />
              LLAMAR AHORA
            </motion.a>
          </div>

          <p className="font-body text-sm text-gray-500 mt-8">
            Cra. 28 #19-20, Palmira, Valle del Cauca · Abre desde las 5 PM
          </p>
        </motion.div>
      </div>
    </section>
  );
}
