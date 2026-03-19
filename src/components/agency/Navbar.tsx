import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/logo.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Service", href: "/#services" },
  { label: "Our Work", href: "/work" },
  { label: "Project", href: "/work" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-[#F5F5F5]/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link to="/#home" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Aster.co" className="h-10 w-auto object-contain mix-blend-multiply" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-black/50 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://calendly.com/ramanpandhare10/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center px-6 py-2.5 rounded-full border-2 border-black bg-transparent text-black text-sm font-medium hover:bg-black hover:text-[#F5F5F5] transition-all duration-300 active:scale-95"
          >
            Let's Talk
          </a>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#F5F5F5] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-4xl font-bold tracking-tight text-black hover:opacity-50 transition-opacity"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <a
              href="https://calendly.com/ramanpandhare10/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-full bg-black text-[#F5F5F5] text-base font-medium"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
