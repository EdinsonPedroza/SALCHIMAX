import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "SALCHIMAX".split("");

// Shock-ring that expands and fades
function Ring({ delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full border border-[#FF6600]/50 pointer-events-none"
      style={{ width: 160, height: 160 }}
      initial={{ width: 160, height: 160, opacity: 1 }}
      animate={{ width: size, height: size, opacity: 0 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

// Spark particle flying outward
function Spark({ angle, delay }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 180 + Math.random() * 80;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist;

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-[#FF6600] pointer-events-none"
      style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
  );
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("show"); // "show" | "exit"

  useEffect(() => {
    // Prevent scroll while intro is active
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setPhase("exit"), 2600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    onComplete?.();
  };

  const sparks = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    delay: 0.25 + i * 0.01,
  }));

  // Curtain split exit variants
  const curtainTop = {
    initial: { y: 0 },
    exit: {
      y: "-100%",
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
    },
  };
  const curtainBottom = {
    initial: { y: 0 },
    exit: {
      y: "100%",
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const isExiting = phase === "exit";

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <>
          {/* Top curtain half */}
          <motion.div
            key="curtain-top"
            variants={curtainTop}
            initial="initial"
            exit="exit"
            className="fixed inset-x-0 top-0 h-1/2 bg-[#0D0D0D] z-[9998] pointer-events-none"
            style={{ willChange: "transform" }}
          />
          {/* Bottom curtain half */}
          <motion.div
            key="curtain-bottom"
            variants={curtainBottom}
            initial="initial"
            exit="exit"
            className="fixed inset-x-0 bottom-0 h-1/2 bg-[#0D0D0D] z-[9998] pointer-events-none"
            style={{ willChange: "transform" }}
          />

          {/* Main content overlay */}
          <motion.div
            key="intro-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0D0D0D" }}
          >
            {/* Ambient radial glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.12] }}
              transition={{ duration: 2, times: [0, 0.3, 1] }}
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, #FF6600 0%, transparent 70%)",
              }}
            />

            {/* Logo area (rings + sparks + logo) */}
            <div className="relative flex items-center justify-center">
              {/* Shock rings */}
              <Ring delay={0.2} size={380} />
              <Ring delay={0.35} size={520} />
              <Ring delay={0.5} size={700} />

              {/* Sparks */}
              {sparks.map((s, i) => (
                <Spark key={i} angle={s.angle} delay={s.delay} />
              ))}

              {/* Logo */}
              <motion.div
                initial={{ scale: 0, y: -120, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.1,
                }}
                style={{ willChange: "transform" }}
              >
                {/* Glow behind logo */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5] }}
                  transition={{ duration: 1.2, times: [0, 0.3, 1] }}
                  style={{
                    background:
                      "radial-gradient(circle, #FF6600 0%, transparent 70%)",
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
                      "0 0 0 4px #FF6600, 0 0 0 8px #0D0D0D, 0 0 40px #FF660088",
                  }}
                />
              </motion.div>
            </div>

            {/* Brand letters */}
            <div className="flex mt-10 overflow-hidden gap-0.5 md:gap-1">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-6xl sm:text-7xl md:text-9xl text-white leading-none select-none"
                  style={{ willChange: "transform" }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.55 + i * 0.055,
                    ease: [0.34, 1.4, 0.64, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Orange accent line under letters */}
            <motion.div
              className="h-[3px] bg-[#FF6600] mt-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.15, ease: "easeOut" }}
              style={{ maxWidth: "min(600px, 90vw)" }}
            />

            {/* Tagline */}
            <motion.p
              className="font-body uppercase tracking-[0.45em] text-[#FF6600] text-sm md:text-base mt-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            >
              Urban Food · Palmira
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-[#FF6600]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, delay: 0.15, ease: "linear" }}
              style={{ willChange: "width" }}
            />

            {/* Corner decorations */}
            <motion.div
              className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#FF6600]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
            <motion.div
              className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#FF6600]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#FF6600]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
            <motion.div
              className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#FF6600]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
