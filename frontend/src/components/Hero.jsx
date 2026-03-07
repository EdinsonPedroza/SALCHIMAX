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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />
      {/* Orange glow from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,102,0,0.15) 0%, transparent 70%)" }} />

      {/* Logos laterales — posición absoluta respecto a la sección, fuera del max-w container */}
      {/* Logo izquierdo */}
      <motion.img
        src={LOGO_URL}
        alt="SALCHIMAX"
        initial={{ opacity: 0, x: -80, rotate: -12 }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: [0, -8, 6, -5, 8, -3, 0],
          y: [0, -14, -6, -12, -4, -10, 0],
          scale: [1, 1.06, 0.96, 1.04, 0.98, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 0.7, delay: 0.2 },
          x: { duration: 0.7, delay: 0.2 },
          rotate: { duration: 6, delay: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
          y: { duration: 5, delay: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
          scale: { duration: 4, delay: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
        }}
        className="absolute left-8 md:left-14 lg:left-20 top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.6)] hidden md:block will-change-transform z-10"
      />
      {/* Logo derecho */}
      <motion.img
        src={LOGO_URL}
        alt="SALCHIMAX"
        initial={{ opacity: 0, x: 80, rotate: 12 }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: [0, 8, -6, 5, -8, 3, 0],
          y: [0, -10, -16, -5, -13, -7, 0],
          scale: [1, 0.97, 1.05, 0.98, 1.06, 0.96, 1],
        }}
        transition={{
          opacity: { duration: 0.7, delay: 0.2 },
          x: { duration: 0.7, delay: 0.2 },
          rotate: { duration: 6, delay: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
          y: { duration: 5, delay: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
          scale: { duration: 4, delay: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
        }}
        className="absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.6)] hidden md:block will-change-transform z-10"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center pt-24 pb-16">

        {/* Logo mobile — solo visible en móvil, centrado arriba del título */}
        <div className="flex justify-center mb-6 md:hidden">
          <motion.img
            src={LOGO_URL}
            alt="SALCHIMAX"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.04, 0.97, 1.05, 0.98, 1],
              y: [0, -8, -3, -10, -5, 0],
              rotate: [0, -4, 3, -3, 4, 0],
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 5, delay: 0.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
              y: { duration: 4, delay: 0.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
              rotate: { duration: 6, delay: 0.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
            }}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.4)] will-change-transform"
          />
        </div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading text-7xl md:text-8xl lg:text-9xl text-white leading-tight tracking-tight text-center mb-4"
        >
          LAS SALCHIPAPAS
          <br />
          <span className="text-[#FF6600]">MAS BRUTALES</span>
          <br />
          DE PALMIRA
        </motion.h1>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-whatsapp-btn"
            className="btn-orange flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center"
          >
            <MessageCircle size={22} />
            PEDIR POR WHATSAPP
          </a>
          <a
            href="#menu"
            data-testid="hero-menu-btn"
            className="btn-outline-orange flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center"
          >
            VER MENU
          </a>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-[#FF6600] text-lg">★</span>
            ))}
          </div>
          <span className="font-body text-sm text-gray-400">5.0 en Google Maps</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FF6600] z-10"
        data-testid="hero-scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}