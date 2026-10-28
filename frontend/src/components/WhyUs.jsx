import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import { Leaf, Trophy, DollarSign, Users, Zap } from "lucide-react";

// Each reason is told with a real photo from the menu. `pos` is the object-position
// that keeps the dish in frame; `cap` is the dish name shown on the photo.
const features = [
  {
    icon: Leaf,
    title: "Ingredientes Frescos",
    desc: "Usamos solo ingredientes de la más alta calidad, frescos cada día para garantizar el mejor sabor.",
    img: "/images/cheesy-crunch.webp",
    pos: "50% 36%",
    alt: "Hamburguesa Cheesy Crunch con lechuga crespa, cebolla y carne Angus",
    cap: "Cheesy Crunch",
  },
  {
    icon: Trophy,
    title: "Porciones Épicas",
    desc: "Porciones generosas que te dejarán satisfecho. Aquí no hay pequeñas porciones.",
    img: "/images/salchimax.webp",
    pos: "50% 58%",
    alt: "La Salchimax!: una salchipapa gigante con carnes, maduro, maíz y queso",
    cap: "Salchimax!",
  },
  {
    icon: DollarSign,
    title: "Precios Accesibles",
    desc: "La mejor comida rápida de Palmira a precios que todos pueden disfrutar.",
    img: "/images/clasica.webp",
    pos: "50% 64%",
    alt: "La Clásica: salchipapa con tocineta y queso en su caja",
    cap: "La Clásica · $18.000",
  },
  {
    icon: Users,
    title: "Ambiente Familiar",
    desc: "Un lugar acogedor donde toda la familia y los amigos pueden disfrutar juntos.",
    img: "/images/nachos-texmex.webp",
    pos: "50% 42%",
    alt: "Nachos Tex-Mex para compartir, en el local de Salchimax",
    cap: "Nachos Tex-Mex",
  },
  {
    icon: Zap,
    title: "Pedidos Rápidos",
    desc: "Tu pedido listo en tiempo récord. Domicilio o para recoger — siempre rápido.",
    img: "/images/alitas-24.webp",
    pos: "50% 52%",
    alt: "Alitas recién hechas con papas y salsas",
    cap: "Alitas x24",
  },
];

const N = features.length;
const pad = (n) => String(n).padStart(2, "0");

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
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef([]);
  const intent = useRef(0);
  const swipe = useRef(null);
  const reduce = useReducedMotion();
  // Freeze the ambient glow, the autoplay bar and the fades while off-screen.
  const inView = useInView(sectionRef, { margin: "100px 0px" });

  const [cur, setCur] = useState(0);
  // Photos stacked bottom → top. The chosen one moves to the top and fades in over
  // the previous ones, which stay fully visible underneath: no dip while crossfading.
  const [pile, setPile] = useState(() => features.map((_, i) => (i + 1) % N));
  const auto = !reduce;

  const select = useCallback((i) => {
    setCur(i);
    setPile((p) => [...p.filter((k) => k !== i), i]);
  }, []);

  useEffect(() => () => clearTimeout(intent.current), []);

  // On narrow screens the list scrolls sideways: keep the active pill in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[cur];
    if (!list || !tab || window.innerWidth >= 1024) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [cur, reduce]);

  // With a mouse there is no need to click: resting on a reason shows its photo.
  // The short delay keeps the photo from flickering while the pointer crosses the list.
  const onTabEnter = (e, i) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(intent.current);
    intent.current = setTimeout(() => select(i), 90);
  };
  const onTabLeave = () => clearTimeout(intent.current);

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let to = null;
    if (step) to = (cur + step + N) % N;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = N - 1;
    if (to === null) return;
    e.preventDefault();
    select(to);
    tabRefs.current[to]?.focus();
  };

  // Touch screens: swipe the photo sideways to change reason.
  const onStageDown = (e) => {
    if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onStageUp = (e) => {
    const s = swipe.current;
    if (!s || e.pointerId !== s.id) return;
    swipe.current = null;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      select((cur + (dx < 0 ? 1 : -1) + N) % N);
    }
  };

  const f = features[cur];
  const Icon = f.icon;

  return (
    <section
      ref={sectionRef}
      id="why-us"
      data-testid="why-us-section"
      className={`py-8 md:py-10 bg-[#121212] relative overflow-hidden ${
        inView ? "" : "anim-paused"
      }`}
    >
      {/* Decorative ambient glow — CSS keeps it off the main thread */}
      <div
        className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "900px",
          height: "900px",
          background:
            "radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12"
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Reasons (left) + photo stage (right) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="why-grid"
        >
          <div
            ref={listRef}
            role="tablist"
            aria-label="Razones para elegirnos"
            className="why-list"
            onKeyDown={onKeyDown}
          >
            {features.map((feat, i) => {
              const selected = cur === i;
              return (
                <button
                  key={feat.title}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`why-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="why-panel"
                  tabIndex={selected ? 0 : -1}
                  data-testid={`feature-card-${i}`}
                  className="why-tab"
                  style={{ "--pos": feat.pos }}
                  onClick={() => select(i)}
                  onPointerEnter={(e) => onTabEnter(e, i)}
                  onPointerLeave={onTabLeave}
                >
                  <span className="why-th">
                    <img src={feat.img} alt="" width="64" height="64" loading="lazy" decoding="async" />
                  </span>
                  <span className="why-no">{pad(i + 1)}</span>
                  <span className="why-tt">{feat.title.toUpperCase()}</span>
                  {selected && (
                    <i className="why-prog" aria-hidden="true">
                      <b
                        className={auto ? "why-prog__run" : undefined}
                        onAnimationEnd={(e) => {
                          if (e.animationName === "why-fill") select((cur + 1) % N);
                        }}
                      />
                    </i>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="why-panel"
            role="tabpanel"
            aria-labelledby={`why-tab-${cur}`}
            className="why-stage"
            onPointerDown={onStageDown}
            onPointerUp={onStageUp}
            onPointerCancel={() => { swipe.current = null; }}
          >
            {features.map((feat, i) => (
              <div
                key={feat.img}
                className={`why-photo${cur === i ? " is-cur" : ""}`}
                style={{ zIndex: pile.indexOf(i) + 1, "--pos": feat.pos }}
                aria-hidden={cur !== i}
              >
                <img src={feat.img} alt={feat.alt} width="640" height="900" decoding="async" draggable="false" />
              </div>
            ))}
            <span className="why-shade" aria-hidden="true" />

            {/* Keyed by the reason: each change swaps the text with a plain fade */}
            <div key={cur} className="why-info">
              <div className="why-top">
                <span className="why-cap">{f.cap}</span>
                <span className="why-of">{pad(cur + 1)} / {pad(N)}</span>
              </div>
              <div>
                <span className="why-ic">
                  <Icon size={26} className="text-[#FF6600]" />
                </span>
                <h3 className="why-title">{f.title.toUpperCase()}</h3>
                <p className="why-desc">{f.desc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row — animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-4 mt-10 md:mt-12 border-t border-white/10 pt-10"
        >
          {[
            { value: "5.0", suffix: "★", label: "En Google Maps" },
            { value: "100", suffix: "%", label: "Ingredientes frescos" },
            { value: "5", suffix: "PM", label: "Abrimos desde" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
              data-testid={`stat-${i}`}
            >
              <div className="font-heading text-4xl md:text-5xl text-[#FF6600] mb-1 group-hover:neon-flicker">
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
