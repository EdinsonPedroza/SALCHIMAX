import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Reveal, useRevealStates, VIEWPORT } from "./Reveal";

const WA_LINK = "https://wa.me/573177371695";

export default function OrderCTA() {
  // The in-view observer lives on the h2 and drives its lines through variants, so
  // both lines hop in one after the other from a single trigger (each leans its own way).
  const first = useRevealStates("hop");
  const second = useRevealStates("hop");
  const line = (states, delay) => ({
    hidden: states.hidden,
    visible: { ...states.visible, transition: states.transition(delay) },
  });

  return (
    <section
      id="order-cta"
      data-testid="order-cta-section"
      className="py-10 md:py-14 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* Orange glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,102,0,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Decorative lines: they draw themselves outward from the centre */}
      <Reveal
        variant="bar"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent"
        style={{ transformOrigin: "center" }}
      />
      <Reveal
        variant="bar"
        delay={0.15}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent"
        style={{ transformOrigin: "center" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <Reveal as="span" variant="hop" className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-4 block w-fit mx-auto">
          ¿Listo para el antojo?
        </Reveal>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="font-heading text-6xl md:text-8xl text-white leading-none mb-6"
        >
          <motion.span className="block w-fit mx-auto" variants={line(first, 0.08)}>
            ANTOJO DE
          </motion.span>
          <motion.span className="block w-fit mx-auto text-[#FF6600]" variants={line(second, 0.24)}>
            ALGO DELICIOSO?
          </motion.span>
        </motion.h2>
        <Reveal as="p" delay={0.3} className="font-body text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Haz tu pedido ahora mismo por WhatsApp o llámanos.
          Abrimos desde las 5 PM todos los días.
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Reveal variant="stamp" delay={0.4} className="w-full sm:w-auto">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-btn"
              className="btn-orange flex items-center gap-3 px-10 py-5 text-2xl font-heading tracking-widest w-full sm:w-auto justify-center shadow-[0_0_40px_rgba(255,102,0,0.3)]"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,102,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="icon-pulse inline-flex">
                <MessageCircle size={28} />
              </span>
              PEDIR POR WHATSAPP
            </motion.a>
          </Reveal>
          <Reveal variant="stamp" delay={0.48} className="w-full sm:w-auto">
            <motion.a
              href="tel:3177371695"
              data-testid="cta-phone-btn"
              className="btn-outline-orange flex items-center gap-3 px-10 py-5 text-2xl font-heading tracking-widest w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={28} />
              LLAMAR AHORA
            </motion.a>
          </Reveal>
        </div>

        <Reveal as="p" delay={0.6} className="font-body text-sm text-gray-500 mt-8">
          Cra. 28 #19-20, Palmira, Valle del Cauca · Abre desde las 5 PM
        </Reveal>
      </div>
    </section>
  );
}
