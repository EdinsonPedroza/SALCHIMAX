import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const reviews = [
  {
    name: "Valentina G.",
    rating: 5,
    text: "La mejor salchipapa que he probado en Palmira. ¡La Carnívora es brutal!",
    avatar: "V",
  },
  {
    name: "Andrés M.",
    rating: 5,
    text: "Excelente atención y comida deliciosa. Las alitas son increíbles, 100% recomendado.",
    avatar: "A",
  },
  {
    name: "Daniela R.",
    rating: 5,
    text: "El ambiente es chevere, la comida es buenísima y el precio está muy bien. Volveré pronto.",
    avatar: "D",
  },
  {
    name: "Carlos P.",
    rating: 5,
    text: "La doble burger está brutal. Porciones grandísimas y muy sabrosas. El mejor fast food de Palmira.",
    avatar: "C",
  },
  {
    name: "Juliana T.",
    rating: 5,
    text: "Las nachos colombianas son lo máximo! Siempre pido por WhatsApp y llega rápido.",
    avatar: "J",
  },
  {
    name: "Miguel O.",
    rating: 5,
    text: "El sandwich cubano especial es una delicia. Definitivamente los mejores de la ciudad.",
    avatar: "M",
  },
  {
    name: "Laura S.",
    rating: 5,
    text: "Pedí la Picadita y quedé enamorada. La combinación de ingredientes es perfecta.",
    avatar: "L",
  },
];

function ReviewCard({ review }) {
  return (
    <motion.div
      data-testid="testimonial-card"
      className="bg-[#171717] border border-white/5 p-6 mx-3 w-72 flex-shrink-0"
      whileHover={{ scale: 1.02, borderColor: "rgba(255,102,0,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#FF6600] flex items-center justify-center font-heading text-white text-lg">
          {review.avatar}
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm">{review.name}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i} className="text-[#FF6600] text-xs">★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="font-body text-sm text-gray-300 leading-relaxed">"{review.text}"</p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-20 md:py-28 bg-[#121212] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block">
            Lo que dicen de nosotros
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-3">
            RESEÑAS <span className="text-[#FF6600]">REALES</span>
          </h2>
          <div className="w-16 h-1 bg-[#FF6600] mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-[#FF6600] text-2xl">★</span>
              ))}
            </div>
            <span className="font-heading text-3xl text-white">5.0</span>
            <span className="font-body text-sm text-gray-400">en Google Maps</span>
          </div>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <Marquee speed={40} gradient={false} className="mb-4">
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </Marquee>

      {/* Marquee row 2 - reverse */}
      <Marquee speed={35} gradient={false} direction="right">
        {[...reviews].reverse().map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </Marquee>
    </section>
  );
}
