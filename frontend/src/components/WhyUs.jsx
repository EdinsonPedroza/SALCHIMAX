import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { Leaf, Trophy, DollarSign, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Ingredientes Frescos",
    desc: "Usamos solo ingredientes de la más alta calidad, frescos cada día para garantizar el mejor sabor.",
  },
  {
    icon: Trophy,
    title: "Porciones Épicas",
    desc: "Porciones generosas que te dejarán satisfecho. Aquí no hay pequeñas porciones.",
  },
  {
    icon: DollarSign,
    title: "Precios Accesibles",
    desc: "La mejor comida rápida de Palmira a precios que todos pueden disfrutar.",
  },
  {
    icon: Users,
    title: "Ambiente Familiar",
    desc: "Un lugar acogedor donde toda la familia y los amigos pueden disfrutar juntos.",
  },
  {
    icon: Zap,
    title: "Pedidos Rápidos",
    desc: "Tu pedido listo en tiempo récord. Domicilio o para recoger — siempre rápido.",
  },
];

/* ── 3D tilt card ── */
function TiltCard({ children, className, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 400,
    damping: 30,
  });
  const glowOpacity = useSpring(useTransform(mx, [-0.5, 0, 0.5], [0.05, 0, 0.05]), {
    stiffness: 300,
    damping: 25,
  });

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-testid={`feature-card-${index}`}
      className={className}
    >
      {/* Dynamic highlight on tilt */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,102,0,0.12) 0%, transparent 60%)",
          opacity: glowOpacity,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const num = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    // Parse numeric part
    const match = value.match(/[\d.]+/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[0]);
    const ctrl = animate(num, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        const rounded = Number.isInteger(target) ? Math.round(v) : v.toFixed(1);
        setDisplay(`${rounded}${suffix}`);
      },
    });
    return ctrl.stop;
  }, [inView, value, suffix, num]);

  return <span ref={ref}>{display}</span>;
}

export default function WhyUs() {
  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="py-20 md:py-28 bg-[#121212] relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Decorative ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "900px",
          height: "900px",
          background:
            "radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header — clip-path reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block"
          >
            Nuestra diferencia
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl md:text-6xl text-white mb-3"
            >
              ¿POR QUÉ ELEGIR{" "}
              <span className="text-[#FF6600] glitch-text" data-text="SALCHIMAX">
                SALCHIMAX
              </span>
              ?
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-1 bg-[#FF6600] mx-auto origin-left"
          />
        </motion.div>

        {/* Feature grid — 3D tilt cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <TiltCard
                key={i}
                index={i}
                className="relative bg-[#171717] border border-white/5 p-6 text-center hover:border-[#FF6600]/50 transition-colors duration-300 group perspective-card cursor-none"
              >
                <div className="flex justify-center mb-4" style={{ transform: "translateZ(20px)" }}>
                  <motion.div
                    whileHover={{ rotate: [0, -15, 15, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center group-hover:bg-[#FF6600]/25 group-hover:border-[#FF6600]/60 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,102,0,0.35)]"
                  >
                    <Icon size={26} className="text-[#FF6600]" />
                  </motion.div>
                </div>
                <h3
                  className="font-heading text-xl text-white mb-2 tracking-wide"
                  style={{ transform: "translateZ(12px)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="font-body text-sm text-gray-400 leading-relaxed"
                  style={{ transform: "translateZ(6px)" }}
                >
                  {feat.desc}
                </p>
              </TiltCard>
            );
          })}
        </div>

        {/* Stats row — animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-4 mt-14 border-t border-white/10 pt-12"
        >
          {[
            { value: "5.0", suffix: "★", label: "En Google Maps" },
            { value: "100", suffix: "%", label: "Ingredientes frescos" },
            { value: "5", suffix: "PM", label: "Abrimos desde" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
              data-testid={`stat-${i}`}
            >
              <div className="font-heading text-4xl md:text-5xl text-[#FF6600] mb-1 group-hover:neon-flicker transition-all">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-xs md:text-sm text-gray-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
