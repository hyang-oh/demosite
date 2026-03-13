"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/settings", label: "More" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "#fdfcf3",
          borderBottom: scrolled ? "1px solid #e5e2da" : "1px solid #e5e2da",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group">
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                color: "#1a1a1a",
                letterSpacing: "-0.02em",
                fontStyle: "italic",
              }}
            >
              Festivo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    color: active ? "#25aae1" : "#1a1a1a",
                    letterSpacing: "0.01em",
                  }}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: "#25aae1" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="text-sm font-medium transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#6e6e6e",
              }}
            >
              Sign in
            </button>
            <button
              className="text-sm font-medium px-5 py-2 transition-all duration-200"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                background: "#1a1a1a",
                color: "#fdfcf3",
              }}
            >
              Plan a trip
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "#1a1a1a", transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "#1a1a1a", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "#1a1a1a", transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-14 flex flex-col"
            style={{ background: "#fdfcf3" }}
          >
            <nav className="flex flex-col px-8 py-6 gap-0 flex-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    className="block py-5 text-3xl font-semibold border-b"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      borderColor: "#e5e2da",
                      color: pathname === href ? "#25aae1" : "#1a1a1a",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <button className="w-full py-3 border text-base font-medium" style={{ borderColor: "#e5e2da", color: "#6e6e6e" }}>Sign in</button>
                <button className="w-full py-3 text-base font-medium" style={{ background: "#1a1a1a", color: "#fdfcf3" }}>Plan a trip</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
