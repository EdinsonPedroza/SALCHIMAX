import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useKind, HIDDEN, SHOWN, VIEWPORT, EASE_OUT } from "./Reveal";

const items = [
  "SALCHIMAX",
  "URBAN FOOD",
  "PALMIRA",
  "DESDE LAS 5 PM",
  "PIDE POR WHATSAPP",
  "ALITAS",
  "HAMBURGUESAS",
  "NACHOS",
  "BURROS",
  "SALCHIPAPAS",
];

export default function MarqueeStrip() {
  const ref = useRef(null);
  // Pause the marquee while off-screen so it stops eating frames
  const inView = useInView(ref, { margin: "100px 0px" });
  // The strip is uncovered left to right when you scroll down to it
  const kind = useKind("unveil");

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN[kind]}
      whileInView={SHOWN[kind]}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      data-testid="marquee-strip"
      className="bg-[#FF6600] py-3 overflow-hidden border-y border-[#FF8533]"
    >
      <Marquee speed={70} gradient={false} play={inView}>
        {items.map((item, i) => (
          <span key={i} className="font-heading text-xl tracking-widest text-white mx-6 flex items-center gap-6">
            {item}
            <span className="text-white/50 mx-2">•</span>
          </span>
        ))}
      </Marquee>
    </motion.div>
  );
}
