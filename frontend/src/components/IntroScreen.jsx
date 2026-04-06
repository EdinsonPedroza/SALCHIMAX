import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "SALCHIMAX".split("");

function Ring({ delay, scaleTo }) {
  return (
    <motion.div
      className="absolute rounded-full border border-[#FF6600]/30 pointer-events-none"
      style={{ width: 160, height: 160, willChange: "transform, opacity" }}
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: scaleTo, opacity: 0 }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
    />
  );
}

function Spark({ angle, delay }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 120 + Math.random() * 60;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#FF6600]/70 pointer-events-none"
      style={{ top: "50%", left: "50%", marginTop: -2, marginLeft: -2 }}
      initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Más rápido: 2000ms antes de salir
    const t = setTimeout(() => setPhase("exit"), 2000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    onComplete?.();
  };

  const sparks = Array.from({ length: 8 }, (_, i) => ({
    angle: i * 45,
    delay: 0.2 + i * 0.01,
  }));

  const curtainTop = {
    initial: { y: 0 },
    exit: { y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
  };
  const curtainBottom = {
    initial: { y: 0 },
    exit: { y: "100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
  };

  const isExiting = phase === "exit";

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <>
          <motion.div
            key="curtain-top"
            variants={curtainTop}
            initial="initial"
            exit="exit"
            className="fixed inset-x-0 top-0 h-1/2 bg-[#0D0D0D] z-[9998] pointer-events-none"
            style={{ willChange: "transform" }}
          />
          <motion.div
            key="curtain-bottom"
            variants={curtainBottom}
            initial="initial"
            exit="exit"
            className="fixed inset-x-0 bottom-0 h-1/2 bg-[#0D0D0D] z-[9998] pointer-events-none"
            style={{ willChange: "transform" }}
          />

          <motion.div
            key="intro-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0D0D0D" }}
          >
            {/* Ambient glow — más oscuro y misterioso */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.08, 0.05] }}
              transition={{ duration: 1.8, times: [0, 0.4, 1] }}
              style={{
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 50%, #FF6600 0%, transparent 70%)",
              }}
            />

            {/* Logo area */}
            <div className="relative flex items-center justify-center">
              <Ring delay={0.15} scaleTo={2.375} />
              <Ring delay={0.28} scaleTo={3.25} />
              <Ring delay={0.42} scaleTo={4.375} />

              {sparks.map((s, i) => (
                <Spark key={i} angle={s.angle} delay={s.delay} />
              ))}

              <motion.div
                initial={{ scale: 0, y: -80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.34, 1.4, 0.64, 1], delay: 0.08 }}
                style={{ willChange: "transform" }}
              >
                {/* Glow detrás del logo */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 1, times: [0, 0.3, 1] }}
                  style={{
                    background: "radial-gradient(circle, #FF6600 0%, transparent 70%)",
                    filter: "blur(18px)",
                    transform: "scale(1.5)",
                  }}
                />
                {/* Logo sin círculo negro — solo ring naranja y glow */}
                <img
                  src="/logo.jpeg"
                  alt="SALCHIMAX"
                  loading="eager"
                  className="relative w-36 h-36 md:w-48 md:h-48 rounded-full object-cover"
                  style={{
                    boxShadow: "0 0 0 3px #FF6600, 0 0 35px #FF660066",
                  }}
                />
              </motion.div>
            </div>

            {/* Letras — más rápidas, entrada más sutil */}
            <div className="flex mt-8 overflow-hidden gap-0.5 md:gap-1">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-6xl sm:text-7xl md:text-9xl text-white leading-none select-none"
                  style={{ willChange: "transform" }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.42 + i * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Línea naranja */}
            <motion.div
              className="h-px bg-[#FF6600]/60 mt-3 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
              style={{ width: "min(480px, 85vw)", willChange: "transform" }}
            />

            {/* Tagline — blanco apagado, más misterioso */}
            <motion.p
              className="font-body uppercase tracking-[0.5em] text-white/30 text-xs md:text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
            >
              Urban Food · Palmira
            </motion.p>

            {/* Barra de progreso */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-[#FF6600]/50 w-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.85, delay: 0.1, ease: "linear" }}
              style={{ willChange: "transform" }}
            />

            {/* Esquinas decorativas — más sutiles */}
            <motion.div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#FF6600]/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.6 }} />
            <motion.div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#FF6600]/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.65 }} />
            <motion.div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-[#FF6600]/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.7 }} />
            <motion.div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-[#FF6600]/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.75 }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
