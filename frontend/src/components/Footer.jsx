import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { legal, SIC_URL } from "../data/legal";
import { Reveal } from "./Reveal";

const LOGO_URL = "/logo.jpeg";
const WA_LINK = "https://wa.me/573177371695";

// Owner and NIT show up once they are filled in data/legal.js (Ley 1480, art. 50 lit. a)
const IDENTITY = [legal.owner, legal.nit && `NIT ${legal.nit}`].filter(Boolean).join(" · ");

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
      <div className="bg-[#121212] border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <Reveal as="span" variant="wipe" className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-4 block w-fit mx-auto">
              Síguenos para ver promos y novedades
            </Reveal>
            <Reveal as="h2" variant="wipe" delay={0.08} className="font-heading text-4xl md:text-5xl text-white mb-8 w-fit mx-auto">
              SIGUENOS EN <span className="text-[#FF6600]">REDES</span>
            </Reveal>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Reveal variant="stamp" delay={0.18} className="w-full sm:w-auto">
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
              </Reveal>
              <Reveal variant="stamp" delay={0.26} className="w-full sm:w-auto">
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
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content — extra bottom room on phones so the floating
          WhatsApp button never covers the legal links */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 pb-24 md:pb-14">
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
              {legal.email && (
                <li className="font-body text-sm">
                  <span className="text-[#FF6600]">Correo:</span><br />
                  <a href={`mailto:${legal.email}`} className="text-gray-400 hover:text-[#FF6600] transition-colors">
                    {legal.email}
                  </a>
                </li>
              )}
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

        {/* Big brand name — uncovered left to right as you reach the bottom.
            eager: it sits too close to the end of the page to ever get 12% inside. */}
        <div className="border-t border-white/5 pt-10 overflow-hidden">
          <Reveal
            variant="unveil"
            eager
            className="font-heading text-[18vw] md:text-[15vw] text-white/5 leading-none text-center select-none tracking-tighter"
          >
            SALCHIMAX
          </Reveal>
        </div>

        <div className="text-center mt-4 space-y-2">
          <p className="font-body text-xs text-gray-600">
            © 2025 SALCHIMAX Urban Food · Palmira, Valle del Cauca, Colombia ·{" "}
            <span className="text-[#FF6600]">Todos los derechos reservados</span>
          </p>
          {IDENTITY && <p className="font-body text-xs text-gray-600">{IDENTITY}</p>}
          <p className="font-body text-xs text-gray-400">
            <Link to="/terminos" data-testid="footer-terms-link" className="hover:text-[#FF6600] transition-colors">
              Términos y Condiciones
            </Link>
            {" · "}
            <Link to="/privacidad" data-testid="footer-privacy-link" className="hover:text-[#FF6600] transition-colors">
              Política de Privacidad
            </Link>
            {" · "}
            <Link to="/pqr" data-testid="footer-pqr-link" className="hover:text-[#FF6600] transition-colors">
              PQR
            </Link>
          </p>
          {/* Ley 1480, art. 50 parágrafo: visible link to the consumer protection authority */}
          <p className="font-body text-xs text-gray-400">
            Protección al consumidor:{" "}
            <a
              href={SIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-sic-link"
              className="underline underline-offset-2 hover:text-[#FF6600] transition-colors"
            >
              Superintendencia de Industria y Comercio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
