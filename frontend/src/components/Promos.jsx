import { motion } from "framer-motion";
import { MessageCircle, CalendarDays } from "lucide-react";
import { promos } from "../data/promos";
import Reveal3D from "./fx/Reveal3D";
import Tilt3D from "./fx/Tilt3D";
import FlipText from "./fx/FlipText";

const WA_LINK = "https://wa.me/573177371695";

function promoWaLink(promo) {
  const text = encodeURIComponent(
    `¡Hola SalchiMax! Quiero aprovechar la promo de ${promo.day}: ${promo.title} 🔥`
  );
  return `${WA_LINK}?text=${text}`;
}

function PromoCard({ promo, index }) {
  return (
    <Reveal3D
      as="a"
      href={promoWaLink(promo)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`promo-card-${promo.day.toLowerCase()}`}
      from={{ rotateX: 50, y: 60, z: -140 }}
      delay={index * 0.12}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="block h-full"
    >
      <Tilt3D
        max={9}
        className="group flex h-full flex-col rounded-lg border border-white/10 bg-[#171717] hover:border-[#FF6600] transition-colors duration-300"
      >
        {/* Image */}
        <div className="preserve-3d relative h-40">
          <div className="media-fade-soft absolute inset-0 overflow-hidden">
            <img
              src={promo.img}
              alt={promo.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Day badge */}
          {/* Solid instead of backdrop-blur: this badge sits on a card that moves
              with the scroll, so the blur would be recomputed every frame. */}
          <span className="depth-lg absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 px-3 py-1 rounded-full font-heading text-xs tracking-widest text-white">
            <CalendarDays size={13} className="text-[#FF6600]" />
            {promo.day.toUpperCase()}
          </span>

          {/* Highlight badge */}
          {promo.badge && (
            <span className="depth-lg absolute top-3 right-3 bg-[#FF6600] text-white font-heading text-xs tracking-widest px-2.5 py-1 rounded">
              {promo.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="preserve-3d flex flex-1 flex-col p-4">
          <h3 className="depth-md font-heading text-xl text-white leading-tight mb-1.5">
            {promo.title}
          </h3>
          <p className="font-body text-sm text-gray-400 leading-relaxed flex-1">
            {promo.desc}
          </p>

          <div className="depth-sm mt-4 flex items-center justify-between gap-2">
            {promo.price && (
              <span className="price-tag text-base">{promo.price}</span>
            )}
            <span className="ml-auto flex items-center gap-2 font-heading text-sm tracking-widest text-[#FF6600] group-hover:text-[#FF8533] transition-colors">
              <MessageCircle size={16} />
              PEDIR
            </span>
          </div>
        </div>
      </Tilt3D>
    </Reveal3D>
  );
}

export default function Promos() {
  const activePromos = promos.filter((p) => p.active);

  if (activePromos.length === 0) return null;

  return (
    <section
      id="promos"
      data-testid="promos-section"
      className="py-20 md:py-28 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,102,0,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block"
          >
            Cada día una excusa para comer
          </motion.span>
          <FlipText
            className="font-heading text-5xl md:text-6xl text-white mb-3"
            parts={["PROMOS DE LA", { text: "SEMANA", className: "text-[#FF6600]" }]}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-1 bg-[#FF6600] mx-auto origin-center"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activePromos.map((promo, i) => (
            <PromoCard key={promo.day + promo.title} promo={promo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
