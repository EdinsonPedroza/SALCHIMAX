import { useState, useEffect } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const LOGO_URL = "/logo.jpeg";
const WA_LINK = "https://wa.me/573177371695";

const navLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Nosotros", href: "#why-us" },
  { label: "Galería", href: "#gallery" },
  { label: "Ubicación", href: "#location" },
];

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: "100%" }}
    />
  );
}

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
    <>
      <ScrollProgress />
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            data-testid="navbar-logo"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src={LOGO_URL}
              alt="SALCHIMAX Urban Food"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
              whileHover={{
                boxShadow: "0 0 20px rgba(255,102,0,0.7)",
                borderColor: "#FF6600",
              }}
              style={{
                border: "2px solid rgba(255,102,0,0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            />
            <span className="font-heading text-2xl md:text-3xl text-white tracking-wider hidden sm:block">
              SALCHIMAX
            </span>
          </motion.a>

          {/* Desktop links — with animated underline */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="relative font-body text-sm uppercase tracking-widest text-gray-300 hover:text-[#FF6600] transition-colors duration-200 group py-1"
              >
                {link.label}
                {/* Sliding underline */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FF6600] transition-all duration-300 group-hover:w-full" />
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
            <motion.button
              data-testid="navbar-cart-btn"
              onClick={() => openCart(true)}
              className="relative text-white hover:text-[#FF6600] transition-colors p-2"
              aria-label="Abrir carrito"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={24} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    data-testid="cart-badge"
                    className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs font-heading w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,102,0,0.8)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* WhatsApp CTA (desktop) */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-whatsapp-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block btn-orange px-5 py-2.5 text-sm font-heading tracking-widest hover:shadow-[0_0_20px_rgba(255,102,0,0.5)] transition-shadow"
            >
              PEDIR AHORA
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              data-testid="navbar-mobile-toggle"
              onClick={() => setOpen(!open)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu — slide down */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden bg-[#0D0D0D]/98 backdrop-blur-md border-t border-[#FF6600]/20"
              data-testid="navbar-mobile-menu"
            >
              <div className="px-4 py-6 flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="font-body uppercase tracking-widest text-gray-300 hover:text-[#FF6600] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="navbar-mobile-whatsapp"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="btn-orange px-6 py-3 text-center font-heading tracking-widest mt-2 hover:shadow-[0_0_20px_rgba(255,102,0,0.4)] transition-shadow"
                >
                  PEDIR POR WHATSAPP
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
