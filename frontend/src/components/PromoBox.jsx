import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

// The SALCHIMAX box in plain CSS 3D (no library). It turns slowly; a tap swings it to face the
// front, opens the lid and pops out a branded card (the lockup from the lid and the slogan).
// Everything is a flat panel placed in space, and the faces carry the photos of the real box
// (/images/box); see .pbx in App.css.

// Texture URLs go in as inline custom properties: the CSS build would try to resolve them.
const TEX = Object.fromEntries(["lid", "front", "back", "side", "logo"].map((k) => [`--tex-${k}`, `url(/images/box/${k}.webp)`]));

// The light comes from the front left. A wall gets darker the further it faces away from it,
// so the box changes tone as it turns instead of looking like a flat sticker.
// `facing` is where the wall points when the box is at rest (degrees from +z toward +x).
const LIGHT = -35;
const shadeOf = (facing) => (angle) => {
  const lit = Math.max(0, Math.cos(((facing + angle - LIGHT) * Math.PI) / 180));
  return Math.round(0.42 * (1 - lit) * 100) / 100;
};

function Panel({ className, shade }) {
  return (
    <span className={`pbx__p ${className}`}>
      {shade && <motion.i className="pbx__sh" style={{ opacity: shade }} />}
    </span>
  );
}

export default function PromoBox() {
  const [open, setOpen] = useState(false);
  const stage = useRef(null);
  const inView = useInView(stage);
  const reduce = useReducedMotion();
  const ry = useMotionValue(-28);
  const front = useTransform(ry, shadeOf(0));
  const back = useTransform(ry, shadeOf(180));
  const right = useTransform(ry, shadeOf(90));
  const left = useTransform(ry, shadeOf(-90));

  // Closed: a slow full turn. Open: settle facing the front and stay there.
  useEffect(() => {
    if (reduce) {
      ry.set(open ? 0 : -28);
      return undefined;
    }
    if (!inView) return undefined;
    const move = open
      ? animate(ry, Math.round(ry.get() / 360) * 360, { type: "spring", stiffness: 55, damping: 15 })
      : animate(ry, ry.get() + 360, { duration: 16, ease: "linear", repeat: Infinity });
    return () => move.stop();
  }, [open, inView, reduce, ry]);

  return (
    <div className="pbx" style={TEX}>
      <button
        ref={stage}
        type="button"
        className={`pbx__stage${open ? " is-open" : ""}`}
        aria-pressed={open}
        aria-label={open ? "Cerrar la caja de SALCHIMAX" : "Abrir la caja de SALCHIMAX"}
        onClick={() => setOpen((o) => !o)}
        data-testid="promo-box"
      >
        <span className="pbx__scene" aria-hidden="true">
          <span className="pbx__tilt">
            <motion.span className="pbx__spin" style={{ rotateY: ry }}>
              <span className="pbx__box">
                <Panel className="pbx__front" shade={front} />
                <Panel className="pbx__back" shade={back} />
                <Panel className="pbx__left" shade={left} />
                <Panel className="pbx__right" shade={right} />
                <Panel className="pbx__floor" />
                <span className="pbx__card">
                  <span className="pbx__card-in">
                    <span className="pbx__w pbx__logo" style={{ "--i": 0 }} />
                    <span className="pbx__w pbx__w--a" style={{ "--i": 1 }}>MEJOR SABOR</span>
                    <span className="pbx__w pbx__w--b" style={{ "--i": 2 }}>QUE EL NUESTRO</span>
                    <span className="pbx__w pbx__w--big" style={{ "--i": 3 }}>NO HAY</span>
                  </span>
                </span>
                <span className="pbx__lid">
                  <Panel className="pbx__lid-top" />
                  <Panel className="pbx__lid-front" />
                  <Panel className="pbx__lid-left" />
                  <Panel className="pbx__lid-right" />
                </span>
              </span>
            </motion.span>
          </span>
          <span className="pbx__shadow" />
        </span>
      </button>
      <p className="pbx__hint" aria-hidden="true">{open ? "Toca para cerrarla" : "Toca la caja"}</p>
    </div>
  );
}
