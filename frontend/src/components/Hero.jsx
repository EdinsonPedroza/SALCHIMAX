import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";
const HERO_BG =
  "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=1920&q=85";
const LOGO_URL = "/logo.jpeg";

/* ── Floating embers ── */
const EMBERS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${3 + Math.random() * 94}%`,
  size: Math.random() * 3.5 + 1,
  dur: `${Math.random() * 5 + 4}s`,
  delay: `${Math.random() * 6}s`,
  drift: `${(Math.random() - 0.5) * 100}px`,
  opacity: Math.random() * 0.55 + 0.15,
}));

function FloatingEmbers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {EMBERS.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            bottom: "-8px",
            width: e.size,
            height: e.size,
            "--ember-dur": e.dur,
            "--ember-delay": e.delay,
            "--ember-drift": e.drift,
            opacity: e.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Magnetic button ── */
function MagneticBtn({ href, children, className, target, rel, testid }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      data-testid={testid}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Scroll-parallax background wrapper ── */
function ParallaxBg() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
      css={{ backgroundImage: `url(${HERO_BG})` }}
    >
      {/* inline style to avoid css prop issues */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  // Spring-smoothed parallax: mouse-wheel scroll arrives in discrete chunks,
  // so binding the bg directly to scrollY makes it "step". The spring eases it.
  const rawBgY = useTransform(scrollY, [0, 700], [0, 140]);
  const bgY = useSpring(rawBgY, { stiffness: 80, damping: 20, mass: 0.3 });

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scan-lines"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
        css={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0 z-[1]" />

      {/* Orange glow from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,102,0,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Animated center glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.22, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,102,0,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Floating embers */}
      <FloatingEmbers />

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
          rotate: {
            duration: 6,
            delay: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          y: {
            duration: 5,
            delay: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          scale: {
            duration: 4,
            delay: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        className="absolute left-8 md:left-14 lg:left-20 top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.7)] hidden md:block will-change-transform z-10"
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
          rotate: {
            duration: 6,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          y: {
            duration: 5,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          scale: {
            duration: 4,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        className="absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.7)] hidden md:block will-change-transform z-10"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center pt-24 pb-16">
        {/* Logo mobile */}
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
              scale: {
                duration: 5,
                delay: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              y: {
                duration: 4,
                delay: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              rotate: {
                duration: 6,
                delay: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.5)] will-change-transform"
          />
        </div>

        {/* Main headline — each line with clip-path reveal */}
        <div className="font-heading text-7xl md:text-8xl lg:text-9xl text-white leading-tight tracking-tight text-center mb-8">
          {/* Line 1 — slide in from left */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%", skewX: -6 }}
              animate={{ y: 0, skewX: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              LAS SALCHIPAPAS
            </motion.div>
          </div>

          {/* Line 2 — GLITCH + pulse */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%", scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="text-[#FF6600] inline-block"
              >
                MAS BRUTALES
              </motion.span>
            </motion.div>
          </div>

          {/* Line 3 — slide in from right */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%", skewX: 6 }}
              animate={{ y: 0, skewX: 0 }}
              transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              DE PALMIRA
            </motion.div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="font-body text-gray-400 text-base md:text-lg mb-8 tracking-wide"
        >
          Sabor urbano · Palmira, Valle del Cauca
        </motion.p>

        {/* Magnetic CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticBtn
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            testid="hero-whatsapp-btn"
            className="btn-orange-liquid flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center"
          >
            <MessageCircle size={22} />
            PEDIR POR WHATSAPP
          </MagneticBtn>

          <MagneticBtn
            href="#menu"
            testid="hero-menu-btn"
            className="btn-outline-orange flex items-center gap-3 px-8 py-4 text-lg font-heading tracking-widest w-full sm:w-auto justify-center hover:scale-105 transition-transform"
          >
            VER MENÚ
          </MagneticBtn>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <div className="flex gap-1 hero-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[#FF6600] text-lg">
                ★
              </span>
            ))}
          </div>
          <span className="font-body text-sm text-gray-400">
            5.0 en Google Maps
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator — bouncing + chevron */}
      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.6, 1], y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.4 },
          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FF6600] z-10 flex flex-col items-center gap-1"
        data-testid="hero-scroll-indicator"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#FF6600]/60">
          scroll
        </span>
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
