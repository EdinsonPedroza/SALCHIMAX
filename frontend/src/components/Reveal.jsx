import { motion, useReducedMotion } from "framer-motion";

// Shared entrance vocabulary for every section, so the whole page moves the same way:
//   wipe   – text is uncovered left to right (titles, eyebrows)
//   bar    – an accent line draws itself on
//   stamp  – cards settle from slightly smaller
//   slam   – a badge lands from slightly larger
//   unveil – photos and strips are uncovered left to right
//   fade   – the quiet default
// Nothing slides up. Only opacity, transform and clip-path are animated.
export const EASE_OUT = [0.23, 1, 0.32, 1];

// Fire once the element is a little inside the screen, so the reveal is actually seen
// (the default triggers when a single pixel peeks in).
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };
// For elements that sit at the very bottom of the page: they can never get 12% inside.
export const VIEWPORT_EAGER = { once: true, margin: "0px" };

// The wipe's inset leaves room around text so glows and glitch layers are never clipped.
//
// The hidden clip must keep a sliver INSIDE the element's box (the 98% right inset): the
// browser's IntersectionObserver takes the target's own clip-path into account, and a
// fully closed one (100%) reports "not intersecting", so whileInView would never fire.
export const HIDDEN = {
  fade: { opacity: 0 },
  wipe: { opacity: 0, clipPath: "inset(-40% 98% -40% -15%)" },
  bar: { scaleX: 0 },
  stamp: { opacity: 0, scale: 0.95 },
  slam: { opacity: 0, scale: 1.25 },
  unveil: { opacity: 0, clipPath: "inset(0% 98% 0% 0%)" },
};
export const SHOWN = {
  fade: { opacity: 1 },
  wipe: { opacity: 1, clipPath: "inset(-40% -15% -40% -15%)" },
  bar: { scaleX: 1 },
  stamp: { opacity: 1, scale: 1 },
  slam: { opacity: 1, scale: 1 },
  unveil: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
};
export const DURATION = { fade: 0.5, wipe: 0.7, bar: 0.6, stamp: 0.5, slam: 0.4, unveil: 0.9 };

// Reduced motion: clip-path is not a transform, so Framer would still animate it.
// Those variants fall back to a plain fade (transforms are already handled by MotionConfig).
export function useKind(variant) {
  const reduce = useReducedMotion();
  return reduce && (variant === "wipe" || variant === "unveil") ? "fade" : variant;
}

/**
 * <Reveal as="h2" variant="wipe" delay={0.1}>…</Reveal>
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
  const kind = useKind(variant);
  const Tag = motion[as];
  return (
    <Tag
      initial={HIDDEN[kind]}
      whileInView={SHOWN[kind]}
      viewport={eager ? VIEWPORT_EAGER : VIEWPORT}
      transition={{ duration: DURATION[kind], delay, ease: EASE_OUT }}
      className={className}
      style={kind === "bar" ? { transformOrigin: "left center", ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
