import { useState, useEffect } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_salchimax-palmira/artifacts/t6dogmn4_image.png";
const WA_LINK = "https://wa.me/573177371695";

const navLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Nosotros", href: "#why-us" },
  { label: "Galería", href: "#gallery" },
  { label: "Ubicación", href: "#location" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsOpen: openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" data-testid="navbar-logo" className="flex items-center gap-2">
          <img
            src={LOGO_URL}
            alt="SALCHIMAX Urban Food"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
          />
          <span className="font-heading text-2xl md:text-3xl text-white tracking-wider hidden sm:block">
            SALCHIMAX
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="font-body text-sm uppercase tracking-widest text-gray-300 hover:text-[#FF6600] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Phone (desktop) */}
          <a
            href="tel:3177371695"
            data-testid="navbar-phone"
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#FF6600] transition-colors text-sm"
          >
            <Phone size={16} />
            <span className="font-body">317 737 1695</span>
          </a>

          {/* Cart icon */}
          <button
            data-testid="navbar-cart-btn"
            onClick={() => openCart(true)}
            className="relative text-white hover:text-[#FF6600] transition-colors p-2"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={24} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  data-testid="cart-badge"
                  className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs font-heading w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* WhatsApp CTA (desktop) */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-whatsapp-cta"
            className="hidden md:block btn-orange px-5 py-2.5 text-sm font-heading tracking-widest"
          >
            PEDIR AHORA
          </a>

          {/* Mobile hamburger */}
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="navbar-mobile-menu"
          className="md:hidden bg-[#0D0D0D] border-t border-white/10 px-4 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body uppercase tracking-widest text-gray-300 hover:text-[#FF6600] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-mobile-whatsapp"
            className="btn-orange px-6 py-3 text-center font-heading tracking-widest mt-2"
          >
            PEDIR POR WHATSAPP
          </a>
        </div>
      )}
    </nav>
  );
}
