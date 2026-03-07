import { motion } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";
const HERO_BG = "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=1920&q=85";
const LOGO_URL = "/logo.jpeg";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image con movimiento sutil */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />
      {/* Orange glow from bottom - animado */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,102,0,0.18) 0%, transparent 70%)" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logos en los costados - un poco más arriba y hacia adentro */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.8 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.03, 1],
          y: [0, -10, 0],
          boxShadow: ["0 0 30px rgba(255,102,0,0.3)", "0 0 45px rgba(255,102,0,0.5)", "0 0 30px rgba(255,102,0,0.3)"]
        }}
        transition={{
          opacity: { duration: 0.6 },
          x: { duration: 0.6 },
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden md:block absolute left-12 lg:left-20 top-[42%] -translate-y-1/2 z-20 rounded-full"
      >
        <img
          src={LOGO_URL}
          alt="SALCHIMAX"
          className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.4)]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.8 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.03, 1],
          y: [0, -10, 0],
          boxShadow: ["0 0 30px rgba(255,102,0,0.3)", "0 0 45px rgba(255,102,0,0.5)", "0 0 30px rgba(255,102,0,0.3)"]
        }}
        transition={{
          opacity: { duration: 0.6 },
          x: { duration: 0.6 },
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden md:block absolute right-12 lg:right-20 top-[42%] -translate-y-1/2 z-20 rounded-full"
      >
        <img
          src={LOGO_URL}
          alt="SALCHIMAX"
          className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.4)]"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 },
            scale: { type: "spring", stiffness: 200 },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
          className="inline-flex items-center gap-2 bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] px-4 py-1.5 text-xs font-body uppercase tracking-widest mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-[#FF6600] rounded-full"
          />
          Palmira, Valle del Cauca - Abre desde las 5 PM
        </motion.div>

        {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight mb-4"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                LAS SALCHIPAPAS
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 300 }}
                className="text-[#FF6600]"
              >
                MAS BRUTALES
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                DE PALMIRA
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Comida rápida deliciosa para compartir con amigos y familia.
              Ingredientes frescos, porciones épicas.
            </motion.p> */}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-btn"
                className="btn-orange flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,102,0,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <MessageCircle size={22} />
                </motion.span>
                PEDIR POR WHATSAPP
              </motion.a>
              <motion.a
                href="#menu"
                data-testid="hero-menu-btn"
                className="btn-outline-orange flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                VER MENU
              </motion.a>
            </motion.div>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center justify-center gap-2 mt-10"
            >
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <motion.span
                    key={i}
                    className="text-[#FF6600] text-lg"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <span className="font-body text-sm text-gray-400">5.0 en Google Maps</span>
            </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.7, 1, 0.7], y: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, delay: 1.2, repeat: Infinity, repeatDelay: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FF6600] z-10"
        data-testid="hero-scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
