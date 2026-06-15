import { motion } from "framer-motion";
import { MessageCircle, CalendarDays } from "lucide-react";
import { promos } from "../data/promos";

const WA_LINK = "https://wa.me/573177371695";

function promoWaLink(promo) {
  const text = encodeURIComponent(
    `¡Hola SalchiMax! Quiero aprovechar la promo de ${promo.day}: ${promo.title} 🔥`
  );
  return `${WA_LINK}?text=${text}`;
}

function PromoCard({ promo, index }) {
  return (
    <motion.a
      href={promoWaLink(promo)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`promo-card-${promo.day.toLowerCase()}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#171717] hover:border-[#FF6600] transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={promo.img}
          alt={promo.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/30 to-transparent" />

        {/* Day badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-heading text-xs tracking-widest text-white">
          <CalendarDays size={13} className="text-[#FF6600]" />
          {promo.day.toUpperCase()}
        </span>

        {/* Highlight badge */}
        {promo.badge && (
          <span className="absolute top-3 right-3 bg-[#FF6600] text-white font-heading text-xs tracking-widest px-2.5 py-1 rounded">
            {promo.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-xl text-white leading-tight mb-1.5">
          {promo.title}
        </h3>
        <p className="font-body text-sm text-gray-400 leading-relaxed flex-1">
          {promo.desc}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          {promo.price && (
            <span className="price-tag text-base">{promo.price}</span>
          )}
          <span className="ml-auto flex items-center gap-2 font-heading text-sm tracking-widest text-[#FF6600] group-hover:text-[#FF8533] transition-colors">
            <MessageCircle size={16} />
            PEDIR
          </span>
        </div>
      </div>
    </motion.a>
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-6xl text-white mb-3"
          >
            PROMOS DE LA <span className="text-[#FF6600]">SEMANA</span>
          </motion.h2>
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
