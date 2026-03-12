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
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(247, 244, 239, 0.95)"
            : "rgba(247, 244, 239, 0.0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #E8E3DC" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#C8741A" }}
            >
              <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-playfair)" }}>F</span>
            </div>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}
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
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{ color: active ? "#C8741A" : "#1C1C1C" }}
                >
                  {label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300"
                    style={{
                      background: "#C8741A",
                      width: active ? "100%" : "0%",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-sm font-medium px-4 py-1.5 rounded-full border transition-colors duration-200"
              style={{ borderColor: "#E8E3DC", color: "#6B6B6B" }}
            >
              Sign in
            </button>
            <button
              className="text-sm font-medium px-4 py-1.5 rounded-full text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "#C8741A" }}
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
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "#1C1C1C",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "#1C1C1C",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "#1C1C1C",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-16 flex flex-col"
            style={{ background: "#F7F4EF" }}
          >
            <nav className="flex flex-col p-8 gap-2 flex-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={href}
                    className="block py-4 text-3xl font-semibold border-b transition-colors"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      borderColor: "#E8E3DC",
                      color: pathname === href ? "#C8741A" : "#1C1C1C",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <button
                  className="w-full py-3 rounded-full border text-base font-medium"
                  style={{ borderColor: "#E8E3DC", color: "#6B6B6B" }}
                >
                  Sign in
                </button>
                <button
                  className="w-full py-3 rounded-full text-base font-medium text-white"
                  style={{ background: "#C8741A" }}
                >
                  Plan a trip
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
