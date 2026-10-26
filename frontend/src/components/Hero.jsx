import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";
const HERO_BG_DESKTOP =
  "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=1920&q=85";
const HERO_BG_MOBILE =
  "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=1080&q=80";
const LOGO_URL = "/logo.jpeg";

// Matches the media-conditional <link rel="preload"> in public/index.html,
// so the hero image is never downloaded twice.
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

// Parallax is a per-frame spring on a full-bleed layer. Worth it on a desktop
// GPU, not on a phone, and pointless without a mouse wheel.
const wantsParallax = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

/* ── Floating embers ── */
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${3 + Math.random() * 94}%`,
  size: Math.random() * 3.5 + 1,
  dur: `${Math.random() * 5 + 4}s`,
  delay: `${Math.random() * 6}s`,
  drift: `${(Math.random() - 0.5) * 100}px`,
  opacity: Math.random() * 0.55 + 0.15,
}));

function FloatingEmbers() {
  // Fewer composite layers on mobile: each ember is its own layer while it
  // animates, and phones pay for that in fill rate.
  const [count] = useState(() => (isMobile() ? 8 : 18));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {EMBERS.slice(0, count).map((e) => (
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
  const rect = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });

  // Measure once on enter — getBoundingClientRect() inside mousemove forces a
  // synchronous layout on every pointer event.
  const onMouseEnter = () => {
    rect.current = ref.current.getBoundingClientRect();
  };
  const onMouseMove = (e) => {
    const r = rect.current;
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
    rect.current = null;
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      data-testid={testid}
      style={{ x: sx, y: sy }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Parallax background ── */
function ParallaxBg({ bgUrl }) {
  const { scrollY } = useScroll();
  // Spring-smoothed parallax: mouse-wheel scroll arrives in discrete chunks,
  // so binding the bg directly to scrollY makes it "step". The spring eases it.
  const rawBgY = useTransform(scrollY, [0, 700], [0, 140]);
  const bgY = useSpring(rawBgY, { stiffness: 80, damping: 20, mass: 0.3 });

  return (
    <motion.div
      style={{ y: bgY, backgroundImage: `url(${bgUrl})` }}
      className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
    />
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [bgUrl] = useState(() => (isMobile() ? HERO_BG_MOBILE : HERO_BG_DESKTOP));
  const [parallax] = useState(wantsParallax);
  // Every looping decoration below is CSS-driven; freeze it once the hero
  // leaves the viewport so the rest of the page scrolls on an idle compositor.
  const inView = useInView(sectionRef, { margin: "100px 0px" });

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-testid="hero-section"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden scan-lines ${
        inView ? "" : "anim-paused"
      }`}
    >
      {/* Background — parallax on desktop, static layer elsewhere */}
      {parallax ? (
        <ParallaxBg bgUrl={bgUrl} />
      ) : (
        <div
          style={{ backgroundImage: `url(${bgUrl})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
      )}

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
      <div
        className="hero-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,102,0,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Floating embers */}
      <FloatingEmbers />

      {/* Logo izquierdo — entrance in JS, idle float in CSS */}
      <motion.div
        initial={{ opacity: 0, x: -80, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-8 md:left-14 lg:left-20 top-1/2 -translate-y-1/2 hidden md:block z-10"
      >
        <img
          src={LOGO_URL}
          alt="SALCHIMAX"
          width={144}
          height={144}
          className="hero-logo-left w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.7)]"
        />
      </motion.div>

      {/* Logo derecho */}
      <motion.div
        initial={{ opacity: 0, x: 80, rotate: 12 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 hidden md:block z-10"
      >
        <img
          src={LOGO_URL}
          alt="SALCHIMAX"
          width={144}
          height={144}
          className="hero-logo-right w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_40px_rgba(255,102,0,0.7)]"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center pt-24 pb-16">
        {/* Logo mobile */}
        <div className="flex justify-center mb-6 md:hidden">
          <motion.img
            src={LOGO_URL}
            alt="SALCHIMAX"
            width={96}
            height={96}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hero-logo-mobile w-24 h-24 rounded-full object-cover border-4 border-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.5)]"
          />
        </div>

        {/* Main headline — each line fades in (no slide), staggered */}
        <div className="font-heading text-7xl md:text-8xl lg:text-9xl text-white leading-tight tracking-tight text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            LAS SALCHIPAPAS
          </motion.div>

          {/* Line 2 — GLITCH + pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <span className="text-pulse text-[#FF6600] inline-block">
              MAS BRUTALES
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            DE PALMIRA
          </motion.div>
        </div>


        {/* Magnetic CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="soft-bounce absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FF6600] z-10 flex flex-col items-center gap-1"
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
