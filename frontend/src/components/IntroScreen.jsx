import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "SALCHIMAX".split("");

/* ── Expanding ring ── */
function Ring({ delay, scaleTo, color = "#FF6600", opacity = 0.35 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 160,
        height: 160,
        border: `1.5px solid ${color}`,
        opacity,
        willChange: "transform, opacity",
      }}
      initial={{ scale: 1, opacity }}
      animate={{ scale: scaleTo, opacity: 0 }}
      transition={{ duration: 1.6, delay, ease: "easeOut" }}
    />
  );
}

/* ── Spark particle ── */
function Spark({ angle, delay, dist = 140, size = 2, color = "#FF6600" }) {
  const rad = (angle * Math.PI) / 180;
  const d = dist + Math.random() * 70;
  const x = Math.cos(rad) * d;
  const y = Math.sin(rad) * d;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        marginTop: -(size / 2),
        marginLeft: -(size / 2),
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        willChange: "transform, opacity",
      }}
      initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.85, delay, ease: "easeOut" }}
    />
  );
}

/* ── Shockwave ring ── */
function Shockwave({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none border-2 border-[#FF6600]/60"
      style={{ width: 200, height: 200, willChange: "transform, opacity" }}
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 3.5, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0, 0.5, 1] }}
    />
  );
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setPhase("exit"), 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    onComplete?.();
  };

  // 16 sparks at 22.5° each + 8 mini sparks offset
  const sparks = [
    ...Array.from({ length: 16 }, (_, i) => ({
      angle: i * 22.5,
      delay: 0.18 + i * 0.008,
      size: Math.random() * 2.5 + 1.5,
      dist: 120 + Math.random() * 80,
      color: i % 3 === 0 ? "#ffcc00" : "#FF6600",
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      angle: i * 45 + 11,
      delay: 0.28 + i * 0.01,
      size: 1.5,
      dist: 90 + Math.random() * 40,
      color: "#ff9944",
    })),
  ];

  const curtainTop = {
    initial: { y: 0 },
    exit: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  };
  const curtainBottom = {
    initial: { y: 0 },
    exit: { y: "100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
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
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0D0D0D" }}
          >
            {/* Deep ambient radial */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.07] }}
              transition={{ duration: 2, times: [0, 0.4, 1] }}
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 50%, #FF6600 0%, #ff330020 40%, transparent 70%)",
              }}
            />

            {/* Scan lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,102,0,0.015) 3px, rgba(255,102,0,0.015) 4px)",
              }}
            />

            {/* Logo area */}
            <div className="relative flex items-center justify-center">
              {/* Multiple expanding rings */}
              <Ring delay={0.1} scaleTo={2.2} color="#FF6600" opacity={0.4} />
              <Ring delay={0.22} scaleTo={3.1} color="#ff9900" opacity={0.25} />
              <Ring delay={0.36} scaleTo={4.2} color="#FF6600" opacity={0.15} />
              <Ring delay={0.5} scaleTo={5.5} color="#ffcc00" opacity={0.08} />

              {/* Shockwaves */}
              <Shockwave delay={0.08} />
              <Shockwave delay={0.24} />

              {/* All sparks */}
              {sparks.map((s, i) => (
                <Spark key={i} {...s} />
              ))}

              {/* Logo */}
              <motion.div
                initial={{ scale: 0, y: -100, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.5, 0.64, 1],
                  delay: 0.06,
                }}
                style={{ willChange: "transform" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.35] }}
                  transition={{ duration: 1.2, times: [0, 0.3, 1] }}
                  style={{
                    background: "radial-gradient(circle, #FF6600 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "scale(1.6)",
                  }}
                />
                <img
                  src="/logo.jpeg"
                  alt="SALCHIMAX"
                  loading="eager"
                  className="relative w-36 h-36 md:w-48 md:h-48 rounded-full object-cover"
                  style={{
                    boxShadow:
                      "0 0 0 3px #FF6600, 0 0 40px #FF6600aa, 0 0 80px #FF660040",
                  }}
                />
              </motion.div>
            </div>

            {/* Letters — stagger with color pop on entry */}
            <div className="flex mt-8 overflow-hidden gap-0.5 md:gap-1">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-6xl sm:text-7xl md:text-9xl leading-none select-none"
                  style={{
                    willChange: "transform",
                    color: i === 3 || i === 6 ? "#FF6600" : "white",
                    textShadow:
                      i === 3 || i === 6
                        ? "0 0 30px rgba(255,102,0,0.8)"
                        : "none",
                  }}
                  initial={{ y: 100, opacity: 0, skewX: -8 }}
                  animate={{ y: 0, opacity: 1, skewX: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.4 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated underline */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#FF6600] to-transparent mt-3 origin-center"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "min(500px, 88vw)", willChange: "transform" }}
            />

            {/* Tagline */}
            <motion.p
              className="font-body uppercase tracking-[0.5em] text-white/30 text-xs md:text-sm mt-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            >
              Urban Food · Palmira
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] origin-left"
              style={{
                background:
                  "linear-gradient(90deg, #FF6600, #ffcc00, #FF6600)",
                willChange: "transform",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, delay: 0.08, ease: "linear" }}
            />

            {/* Corner brackets */}
            {[
              "top-5 left-5 border-t border-l",
              "top-5 right-5 border-t border-r",
              "bottom-5 left-5 border-b border-l",
              "bottom-5 right-5 border-b border-r",
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute w-8 h-8 ${pos} border-[#FF6600]/40`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.55 + i * 0.06 }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
