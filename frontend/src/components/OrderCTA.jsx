import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import Reveal3D from "./fx/Reveal3D";
import Tilt3D from "./fx/Tilt3D";
import FlipText from "./fx/FlipText";

const LOGO_URL = "/logo.jpeg";

const WA_LINK = "https://wa.me/573177371695";

export default function OrderCTA() {
  const sectionRef = useRef(null);
  // Freeze the orbit rings and floating discs while the section is off-screen.
  const inView = useInView(sectionRef, { margin: "100px 0px" });

  return (
    <section
      ref={sectionRef}
      id="order-cta"
      data-testid="order-cta-section"
      className={`py-24 md:py-32 bg-[#0D0D0D] relative overflow-hidden ${
        inView ? "" : "anim-paused"
      }`}
    >
      {/* Orange glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,102,0,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Two glowing orbit rings seen at a steep angle, spinning behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ perspective: 900 }}
      >
        <div className="orbit-ring orbit-ring-a h-[380px] w-[380px] md:h-[640px] md:w-[640px]" />
        <div className="orbit-ring orbit-ring-b h-[500px] w-[500px] md:h-[860px] md:w-[860px]" />
      </div>

      {/* Logo discs hovering either side (desktop only — no room on a phone) */}
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden="true"
        width={112}
        height={112}
        loading="lazy"
        className="disc-float pointer-events-none absolute left-[6%] top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full border-4 border-[#FF6600] object-cover shadow-[0_0_40px_rgba(255,102,0,0.6)] lg:block"
      />
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden="true"
        width={112}
        height={112}
        loading="lazy"
        className="disc-float-rev pointer-events-none absolute right-[6%] top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full border-4 border-[#FF6600] object-cover shadow-[0_0_40px_rgba(255,102,0,0.6)] lg:block"
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <Reveal3D from={{ rotateX: 35, y: 40, z: -120 }} duration={1}>
        <Tilt3D max={5} lift={0} glare={false} className="preserve-3d">
          <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-4 block">
            ¿Listo para el antojo?
          </span>
          {/* Each line flips up letter by letter; lines sit at different depths
              so they slide against each other as the block tilts. */}
          <h2 className="preserve-3d font-heading text-6xl md:text-8xl text-white leading-none mb-6">
            <FlipText
              as="span"
              by="letter"
              className="depth-md block text-extrude-w"
              parts={["ANTOJO DE"]}
            />
            <FlipText
              as="span"
              by="letter"
              delay={0.3}
              className="depth-lg block text-extrude"
              parts={[{ text: "ALGO DELICIOSO?", className: "text-[#FF6600]" }]}
            />
          </h2>
          <p className="font-body text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Haz tu pedido ahora mismo por WhatsApp o llámanos.
            Abrimos desde las 5 PM todos los días.
          </p>

          <div className="depth-lg flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          </div>

          <p className="font-body text-sm text-gray-500 mt-8">
            Cra. 28 #19-20, Palmira, Valle del Cauca · Abre desde las 5 PM
          </p>
        </Tilt3D>
        </Reveal3D>
      </div>
    </section>
  );
}
