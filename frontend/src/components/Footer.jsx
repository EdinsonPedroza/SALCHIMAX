import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_salchimax-palmira/artifacts/t6dogmn4_image.png";
const WA_LINK = "https://wa.me/573177371695";

const navLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Por qué nosotros", href: "#why-us" },
  { label: "Galería", href: "#gallery" },
  { label: "Ubicación", href: "#location" },
];

export default function Footer() {
  return (
    <footer id="footer" data-testid="footer" className="bg-[#0D0D0D] border-t border-white/5">
      {/* Social media section */}
      <div className="bg-[#121212] border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-4 block">
              Síguenos para ver promos y novedades
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-8">
              SIGUENOS EN <span className="text-[#FF6600]">REDES</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.instagram.com/salchi.maxx"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="instagram-link"
                className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 font-heading text-xl tracking-widest hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Instagram size={24} />
                @SALCHI.MAXX
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61571175376351"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="facebook-link"
                className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 font-heading text-xl tracking-widest hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Facebook size={24} />
                FACEBOOK
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="SALCHIMAX" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-heading text-2xl text-white tracking-wider">SALCHIMAX</div>
                <div className="font-body text-xs text-gray-500 uppercase tracking-widest">Urban Food</div>
              </div>
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              Las mejores salchipapas de Palmira. Comida rápida deliciosa, ingredientes frescos y porciones épicas.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4 tracking-wide">NAVEGACIÓN</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-[#FF6600] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4 tracking-wide">CONTACTO</h3>
            <ul className="space-y-3">
              <li className="font-body text-sm text-gray-400">
                <span className="text-[#FF6600]">Dirección:</span><br />
                Cra. 28 #19-20, Palmira, Valle del Cauca
              </li>
              <li className="font-body text-sm">
                <span className="text-[#FF6600]">Teléfono:</span><br />
                <a href="tel:3177371695" className="text-gray-400 hover:text-[#FF6600] transition-colors">
                  317 737 1695
                </a>
              </li>
              <li className="font-body text-sm text-gray-400">
                <span className="text-[#FF6600]">Horario:</span><br />
                Desde las 5:00 PM todos los días
              </li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-btn"
              className="btn-orange flex items-center gap-2 px-5 py-3 font-heading text-base tracking-widest mt-5 w-fit"
            >
              <MessageCircle size={18} />
              PEDIR AHORA
            </a>
          </div>
        </div>

        {/* Big brand name */}
        <div className="border-t border-white/5 pt-10 overflow-hidden">
          <div className="font-heading text-[18vw] md:text-[15vw] text-white/5 leading-none text-center select-none tracking-tighter">
            SALCHIMAX
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="font-body text-xs text-gray-600">
            © 2025 SALCHIMAX Urban Food · Palmira, Valle del Cauca, Colombia ·{" "}
            <span className="text-[#FF6600]">Todos los derechos reservados</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
