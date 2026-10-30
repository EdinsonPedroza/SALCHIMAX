import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LETTERS = "SALCHIMAX".split("");
const EASE_OUT = [0.23, 1, 0.32, 1];
const EASE_CURTAIN = [0.76, 0, 0.24, 1];

// The intro's clock starts once the heading font is ready (so the letters never
// flash in a fallback face), but never waits longer than FONT_WAIT_MS.
const FONT_WAIT_MS = 1000;
const SHOW_MS = 1300;
const REDUCED_SHOW_MS = 800;
const EXIT_MS = 450;
// Exit animation is ~0.6s; if it never reports completion (throttled tab,
// stuck compositor layer) unmount anyway so the page is never left covered.
const FAILSAFE_MS = EXIT_MS + 1500;

// The 3D swing needs a capable GPU; phones (and in-app browsers) can leave the
// 3D layers stuck, so they get the flat entrance instead.
const wants3D = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

/* ── Expanding ring ── */
function Ring({ delay, scaleTo, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: 160, height: 160, border: "1.5px solid #FF6600" }}
      initial={{ scale: 1, opacity }}
      animate={{ scale: scaleTo, opacity: 0 }}
      transition={{ duration: 1, delay, ease: EASE_OUT }}
    />
  );
}

/* ── Spark particle: fixed values, so it never changes between renders ── */
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const rad = ((i * 30 + (i % 2) * 8) * Math.PI) / 180;
  const dist = 120 + ((i * 37) % 70);
  return {
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    size: 2 + (i % 3) * 0.8,
    delay: 0.2 + i * 0.012,
    color: i % 3 === 0 ? "#FF8533" : "#FF6600",
  };
});

function Spark({ x, y, size, delay, color }) {
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
      }}
      initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    />
  );
}

/* ── Shockwave ring ── */
function Shockwave({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none border-2 border-[#FF6600]/60"
      style={{ width: 200, height: 200 }}
      initial={{ scale: 0.6, opacity: 0.8 }}
      animate={{ scale: 3.2, opacity: 0 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
    />
  );
}

/**
 * Opening loader. `onExitStart` fires the moment the curtains begin to open: the
 * hero's entrance is synced to it, so it plays while the page is being revealed
 * instead of behind the cover. `onComplete` fires once the curtains are gone.
 */
export default function IntroScreen({ onExitStart, onComplete }) {
  const reduce = useReducedMotion();
  const [is3D] = useState(wants3D);
  const [go, setGo] = useState(false);
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let started = false;
    let cancelled = false;
    const timers = [];

    const finish = () => {
      document.body.style.overflow = "";
      onComplete?.();
    };
    const startExit = () => {
      if (cancelled) return;
      setPhase("exit");
      onExitStart?.();
      timers.push(setTimeout(finish, FAILSAFE_MS));
    };
    const begin = () => {
      if (started || cancelled) return;
      started = true;
      setGo(true);
      timers.push(setTimeout(startExit, reduce ? REDUCED_SHOW_MS : SHOW_MS));
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(begin);
      timers.push(setTimeout(begin, FONT_WAIT_MS));
    } else {
      begin();
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    onComplete?.();
  };

  const curtainTop = {
    initial: { y: 0 },
    exit: { y: "-100%", transition: { duration: EXIT_MS / 1000, ease: EASE_CURTAIN } },
  };
  const curtainBottom = {
    initial: { y: 0 },
    exit: { y: "100%", transition: { duration: EXIT_MS / 1000, ease: EASE_CURTAIN } },
  };

  const isExiting = phase === "exit";
  const barSeconds = (reduce ? REDUCED_SHOW_MS : SHOW_MS) / 1000;

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
            {/* Scan lines (static) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,102,0,0.015) 3px, rgba(255,102,0,0.015) 4px)",
              }}
            />

            {/* Everything below mounts when the clock starts, so every delay is
                measured from the same moment */}
            {go && (
              <>
                {/* Deep ambient radial */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.12, 0.07] }}
                  transition={{ duration: 1.4, times: [0, 0.4, 1] }}
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 45% at 50% 50%, #FF6600 0%, #ff330020 40%, transparent 70%)",
                  }}
                />

                {/* Logo area */}
                <div className="relative flex items-center justify-center">
                  {!reduce && (
                    <>
                      <Ring delay={0.12} scaleTo={2.3} opacity={0.4} />
                      <Ring delay={0.3} scaleTo={3.6} opacity={0.18} />
                      <Shockwave delay={0.1} />
                      {SPARKS.slice(0, is3D ? 12 : 6).map((s, i) => (
                        <Spark key={i} {...s} />
                      ))}
                    </>
                  )}

                  {/* Desktop: swings open on its vertical axis, edge-on to face-on (so the
                      mirrored back is never seen). Mobile: flat fade and settle. */}
                  <motion.div
                    initial={
                      is3D
                        ? { opacity: 0, scale: 0.85, rotateY: -90 }
                        : { opacity: 0, scale: 0.85 }
                    }
                    animate={
                      is3D
                        ? { opacity: 1, scale: 1, rotateY: 0 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{ duration: is3D ? 0.55 : 0.35, ease: EASE_OUT, delay: 0.03 }}
                    style={is3D ? { transformPerspective: 800 } : undefined}
                  >
                    {/* Soft glow: a plain gradient, no blur filter */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        inset: "-45%",
                        background:
                          "radial-gradient(circle, rgba(255,102,0,0.55) 0%, transparent 65%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0.4] }}
                      transition={{ duration: 0.9, times: [0, 0.3, 1] }}
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

                {/* Letters: each one is stamped on, left to right (no sliding) */}
                <div className="flex mt-8 gap-0.5 md:gap-1">
                  {LETTERS.map((letter, i) => (
                    <motion.span
                      key={i}
                      className="font-heading text-6xl sm:text-7xl md:text-9xl leading-none select-none text-white"
                      initial={{ opacity: 0, scale: 1.25 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.22 + i * 0.035, ease: EASE_OUT }}
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
                  transition={{ duration: 0.4, delay: 0.6, ease: EASE_OUT }}
                  style={{ width: "min(500px, 88vw)" }}
                />

                {/* Tagline */}
                <motion.p
                  className="font-body uppercase tracking-[0.5em] text-white/30 text-xs md:text-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7, ease: EASE_OUT }}
                >
                  Urban Food · Palmira
                </motion.p>

                {/* Loading bar: fills exactly while the intro is up */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#FF6600]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: barSeconds, ease: "linear" }}
                />
              </>
            )}

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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={go ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.25, delay: 0.35 + i * 0.04, ease: EASE_OUT }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
