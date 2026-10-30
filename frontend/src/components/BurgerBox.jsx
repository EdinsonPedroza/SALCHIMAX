import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";

// A burger box in plain CSS 3D (no library): it turns slowly, and a tap opens the lid and
// lets the burger come up. Everything is a flat panel placed in space; see .bbx in App.css.
// Layers of the burger, bottom to top: [y from the box centre (down is positive), diameter, colour].
const LAYERS = [
  [26, 100, "#D9942F"], [24, 100, "#E0A13D"],
  [17, 96, "#3E2314"], [15, 96, "#4B2B19"], [13, 96, "#3E2314"],
  [10, 80, "#FFC72C", "cheese"],
  [6, 112, "radial-gradient(circle, #86D94E, #3E9B2B)", "leaf"],
  [3, 84, "#E5392A"],
  [-1, 100, "#E0A13D"], [-4, 98, "#E6A94A"], [-7, 92, "#E9AE50"],
  [-10, 82, "#ECB357"], [-13, 66, "#EFB85E"],
  [-16, 44, "radial-gradient(circle at 30% 35%, #fff3d4 0 2px, transparent 3px), radial-gradient(circle at 65% 55%, #fff3d4 0 2px, transparent 3px), radial-gradient(circle at 45% 75%, #fff3d4 0 2px, transparent 3px), #F2BD64"],
];

function Panel({ className, children }) {
  return (
    <span className={`bbx__p ${className}`}>
      {children}
    </span>
  );
}

export default function BurgerBox() {
  const [open, setOpen] = useState(false);
  const stage = useRef(null);
  const inView = useInView(stage);
  const reduce = useReducedMotion();
  const ry = useMotionValue(-28);

  // Closed: a slow full turn. Open: settle facing the front and sway a little, so the
  // burger inside is never hidden behind the lid.
  useEffect(() => {
    if (reduce || !inView) return undefined;
    let cancelled = false;
    let sway;
    let move;
    if (open) {
      const base = Math.round(ry.get() / 360) * 360;
      move = animate(ry, base - 18, {
        type: "spring",
        stiffness: 60,
        damping: 14,
        onComplete: () => {
          if (cancelled) return;
          sway = animate(ry, base + 18, { duration: 4.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" });
        },
      });
    } else {
      move = animate(ry, ry.get() + 360, { duration: 16, ease: "linear", repeat: Infinity });
    }
    return () => {
      cancelled = true;
      move.stop();
      if (sway) sway.stop();
    };
  }, [open, inView, reduce, ry]);

  return (
    <div className="bbx">
      <button
        ref={stage}
        type="button"
        className={`bbx__stage${open ? " is-open" : ""}`}
        aria-pressed={open}
        aria-label={open ? "Cerrar la caja de hamburguesa" : "Abrir la caja de hamburguesa"}
        onClick={() => setOpen((o) => !o)}
        data-testid="burger-box"
      >
        <span className="bbx__scene" aria-hidden="true">
          <span className="bbx__tilt">
            <motion.span className="bbx__spin" style={{ rotateY: ry }}>
              <span className="bbx__box">
                <Panel className="bbx__front"><span className="bbx__label">SALCHI MAX</span></Panel>
                <Panel className="bbx__back" />
                <Panel className="bbx__left" />
                <Panel className="bbx__right" />
                <Panel className="bbx__floor" />
                <span className="bbx__burger">
                  {LAYERS.map(([y, d, bg, kind], i) => (
                    <i key={i} className={`bbx__disc${kind ? ` bbx__disc--${kind}` : ""}`} style={{ "--y": y, "--d": d, background: bg }} />
                  ))}
                </span>
                <span className="bbx__lid">
                  <Panel className="bbx__lid-top"><span className="bbx__label bbx__label--lid">SALCHI<br />MAX</span></Panel>
                  <Panel className="bbx__lid-front" />
                  <Panel className="bbx__lid-left" />
                  <Panel className="bbx__lid-right" />
                </span>
              </span>
            </motion.span>
          </span>
          <span className="bbx__shadow" />
        </span>
      </button>
      <p className="bbx__hint" aria-hidden="true">{open ? "Toca para cerrarla" : "Toca la caja"}</p>
    </div>
  );
}
