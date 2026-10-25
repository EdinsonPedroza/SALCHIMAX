import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE } from "./utils";

const unit = {
  hidden: { opacity: 0, rotateX: 90, y: 24, z: -80 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    z: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const hinge = { transformOrigin: "50% 100%" };

/**
 * Heading whose words (or letters) flip up out of the floor one after another.
 *
 * parts: array of strings or { text, className, glitch, tight } — one entry per
 *   differently styled run, e.g.
 *   ["PROMOS DE LA", { text: "SEMANA", className: "text-[#FF6600]" }]
 *   (tight: no space before the run, e.g. a closing "?")
 * by:    "word" (section titles) or "letter" (hero / big display text)
 * play:  boolean to drive the animation from outside (e.g. wait for the intro);
 *        omit it to play when the heading scrolls into view.
 *
 * Perspective comes from a CSS `perspective` on the parent of the animated
 * units, so nothing keeps a 3D transform once the flip has finished.
 */
export default function FlipText({
  as = "h2",
  parts,
  by = "word",
  stagger,
  delay = 0,
  play,
  className = "",
  style,
  ...rest
}) {
  const Tag = motion[as];
  const items = parts.map((p) => (typeof p === "string" ? { text: p } : p));
  const label = items.map((i) => i.text).join(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ?? (by === "letter" ? 0.035 : 0.09),
        delayChildren: delay,
      },
    },
  };
  const trigger =
    play === undefined
      ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
      : { animate: play ? "visible" : "hidden" };

  return (
    <Tag
      variants={container}
      initial="hidden"
      {...trigger}
      aria-label={label}
      className={className}
      style={{ ...(by === "word" ? { perspective: 800 } : null), ...style }}
      {...rest}
    >
      {items.map((item, pi) => {
        const words = item.text.split(" ");
        const cls = `${item.className ?? ""}${item.glitch ? " glitch-text" : ""}`;
        return (
          <Fragment key={pi}>
            {pi > 0 && !item.tight && " "}
            {words.map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                {by === "word" ? (
                  <motion.span
                    variants={unit}
                    className={`inline-block ${cls}`}
                    style={hinge}
                    data-text={item.glitch ? word : undefined}
                  >
                    {word}
                  </motion.span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`inline-block whitespace-nowrap ${cls}`}
                    style={{ perspective: 700 }}
                  >
                    {[...word].map((ch, ci) => (
                      <motion.span
                        key={ci}
                        variants={unit}
                        className="inline-block"
                        style={hinge}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                )}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </Tag>
  );
}
