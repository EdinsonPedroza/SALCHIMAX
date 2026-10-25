import { motion } from "framer-motion";
import { EASE, perspectiveTemplate } from "./utils";

const template = perspectiveTemplate(1100);

/**
 * Scroll-in reveal that stands the element up out of the page in 3D.
 * `from` lists the transform values to start at; each one animates back to 0.
 * Extra props (href, whileHover, data-testid…) go straight to the element.
 * The timing lives inside whileInView, so a caller's whileHover is not delayed.
 */
export default function Reveal3D({
  as = "div",
  from = { rotateX: 55, y: 50, z: -120 },
  delay = 0,
  duration = 0.9,
  origin = "50% 100%",
  margin = "-60px",
  className,
  style,
  children,
  ...rest
}) {
  const Comp = motion[as] ?? motion.div;
  const to = {
    opacity: 1,
    ...Object.fromEntries(Object.keys(from).map((k) => [k, 0])),
    transition: { duration, delay, ease: EASE },
  };

  return (
    <Comp
      initial={{ opacity: 0, ...from }}
      whileInView={to}
      viewport={{ once: true, margin }}
      transformTemplate={template}
      style={{ transformOrigin: origin, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
