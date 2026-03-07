import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      data-testid="marquee-strip"
      className="bg-[#FF6600] py-3 overflow-hidden border-y border-[#FF8533]"
    >
      <Marquee speed={70} gradient={false}>
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
