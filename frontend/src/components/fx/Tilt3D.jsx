import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePointerFx } from "../../hooks/usePointerFx";
import { perspectiveTemplate } from "./utils";

const SPRING = { stiffness: 260, damping: 22, mass: 0.5 };
const template = perspectiveTemplate(900);

/**
 * Pointer-follow 3D tilt with a moving glare. Desktop (fine pointer) only —
 * on touch / reduced motion it renders as the plain element.
 *
 * Children opt into depth with .depth-sm / .depth-md / .depth-lg (App.css):
 * they lift off the card while it is hovered. Every ancestor between this
 * element and a depth child needs `preserve-3d`, and none may use
 * overflow-hidden (it flattens the 3D context).
 */
export default function Tilt3D({
  as = "div",
  max = 10,
  lift = 18,
  glare = true,
  className = "",
  style,
  children,
  ...rest
}) {
  const fx = usePointerFx();
  const ref = useRef(null);
  const rect = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const z = useSpring(0, SPRING);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });
  const gx = useTransform(px, (v) => v * 100);
  const gy = useTransform(py, (v) => v * 100);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.20), rgba(255,102,0,0.10) 38%, transparent 62%)`;

  const Comp = motion[as] ?? motion.div;

  // Measure once per hover: getBoundingClientRect() inside mousemove forces a
  // synchronous layout on every pointer event.
  const onMouseEnter = () => {
    rect.current = ref.current.getBoundingClientRect();
    ref.current.dataset.tilt = "on";
    z.set(lift);
    glareOpacity.set(1);
  };
  const onMouseMove = (e) => {
    const r = rect.current;
    if (!r) return;
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  };
  const onMouseLeave = () => {
    ref.current.dataset.tilt = "off";
    px.set(0.5);
    py.set(0.5);
    z.set(0);
    glareOpacity.set(0);
    rect.current = null;
  };

  const fxProps = fx
    ? {
        "data-tilt": "off",
        style: { ...style, rotateX, rotateY, z },
        transformTemplate: template,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
      }
    : { style };

  return (
    <Comp ref={ref} className={`relative ${className}`} {...rest} {...fxProps}>
      {children}
      {fx && glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </Comp>
  );
}
