import { useId } from "react";
import { motion } from "framer-motion";

// Shared entrance vocabulary for every section, so the whole page moves the same way.
// Things land like stickers slapped on a wall: a quick spring with a little overshoot and
// a slight lean that is different for every element, so a row never moves in lockstep.
//   hop    – titles and eyebrows
//   pop    – the map and the big footer name: grow in from a bit smaller
//   toss   – gallery photos: land from a bit larger, like prints tossed on a table
//   boing  – the orange strip: opens up from its middle, vertically
//   bar    – an accent line draws itself on
//   stamp  – cards settle from slightly smaller
//   slam   – a badge lands from slightly larger
//   fade   – the quiet default
// Nothing slides and nothing sweeps sideways. Only opacity and transform are animated, and
// with reduced motion MotionConfig turns the transforms off, leaving a plain fade.
export const EASE_OUT = [0.23, 1, 0.32, 1];

// Fire once the element is a little inside the screen, so the reveal is actually seen
// (the default triggers when a single pixel peeks in).
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };
// For elements that sit at the very bottom of the page: they can never get 12% inside.
export const VIEWPORT_EAGER = { once: true, margin: "0px" };

// Maximum lean in degrees; kinds not listed here don't rotate.
const LEAN = { hop: 1.4, pop: 3, toss: 4 };

const FROM = {
  fade: { opacity: 0 },
  hop: { opacity: 0, scale: 0.92 },
  pop: { opacity: 0, scale: 0.88 },
  toss: { opacity: 0, scale: 1.12 },
  boing: { opacity: 0, scaleY: 0.3 },
  bar: { scaleX: 0 },
  stamp: { opacity: 0, scale: 0.95 },
  slam: { opacity: 0, scale: 1.25 },
};
const TO = {
  fade: { opacity: 1 },
  hop: { opacity: 1, scale: 1, rotate: 0 },
  pop: { opacity: 1, scale: 1, rotate: 0 },
  toss: { opacity: 1, scale: 1, rotate: 0 },
  boing: { opacity: 1, scaleY: 1 },
  bar: { scaleX: 1 },
  stamp: { opacity: 1, scale: 1 },
  slam: { opacity: 1, scale: 1 },
};

const SPRING = { type: "spring", stiffness: 300, damping: 17 };
const TWEEN = { fade: 0.5, bar: 0.6, stamp: 0.5, slam: 0.4 };

function transitionFor(kind, delay) {
  if (kind in TWEEN) return { duration: TWEEN[kind], delay, ease: EASE_OUT };
  // The spring would also overshoot opacity: fade that one on a short tween instead.
  return { ...SPRING, delay, opacity: { duration: 0.25, delay, ease: "easeOut" } };
}

// A stable lean per element: the same element always leans the same way, neighbours differ.
// useId() is unique and deterministic per mounted component, so no Math.random in render.
function useLean(max) {
  const id = useId();
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const strength = 0.55 + (Math.abs(h >> 3) % 45) / 100; // 55%–100% of the maximum
  return (h % 2 ? 1 : -1) * max * strength;
}

/**
 * The hidden / visible states of a kind, for components that drive their own element
 * (variants on a parent, or `animate` tied to something other than scrolling into view).
 */
export function useRevealStates(kind = "fade") {
  const lean = useLean(LEAN[kind] ?? 0);
  return {
    hidden: kind in LEAN ? { ...FROM[kind], rotate: lean } : FROM[kind],
    visible: TO[kind],
    transition: (delay = 0) => transitionFor(kind, delay),
  };
}

/** Motion props for an element that plays its entrance once it scrolls into view. */
export function useReveal(kind = "fade", { delay = 0, eager = false } = {}) {
  const s = useRevealStates(kind);
  return {
    initial: s.hidden,
    whileInView: s.visible,
    viewport: eager ? VIEWPORT_EAGER : VIEWPORT,
    transition: s.transition(delay),
  };
}

/**
 * <Reveal as="h2" variant="hop" delay={0.1}>…</Reveal>
 * `as` is any motion tag. Stagger siblings with `delay` (30–80ms apart).
 */
export function Reveal({
  as = "div",
  variant = "fade",
  delay = 0,
  eager = false,
  className,
  style,
  children,
  ...rest
}) {
  const motionProps = useReveal(variant, { delay, eager });
  const Tag = motion[as];
  return (
    <Tag
      {...motionProps}
      className={className}
      style={variant === "bar" ? { transformOrigin: "left center", ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
