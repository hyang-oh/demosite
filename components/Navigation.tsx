"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/calendar", label: "Calendar" },
  { href: "/theme", label: "Theme" },
  { href: "/magazine", label: "Magazine" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "var(--color-bg-elevated)",
          borderBottom: scrolled
            ? "1px solid var(--color-border-default)"
            : "1px solid transparent",
        }}
      >
        {/* ── Nav Bar — 64px ── */}
        <div
          className="max-w-[1100px] mx-auto px-8 flex items-center justify-between"
          style={{ height: "64px" }}
        >
          {/* Logo — serif, bold */}
          <Link href="/" className="flex-shrink-0">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "26px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
              }}
            >
              Festivo
            </span>
          </Link>

          {/* Desktop nav — flat, no mega menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: active ? 500 : 400,
                    color: "var(--color-text-primary)",
                    transition: "color 0.15s",
                  }}
                  className="hover:text-[--color-text-primary]"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Search"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <Link
              href="/map"
              className="w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Map"
              style={{
                color: pathname === "/map"
                  ? "var(--color-text-primary)"
                  : "var(--color-text-tertiary)",
              }}
            >
              <Map size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="/settings"
              className="w-7 h-7 flex items-center justify-center rounded-full ml-2"
              style={{
                background: "var(--color-text-primary)",
                color: "var(--color-bg-elevated)",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              H
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--color-text-primary)",
                transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--color-text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--color-text-primary)",
                transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </div>

        {/* ── Search bar overlay ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
              style={{ borderTop: "1px solid var(--color-border-default)" }}
            >
              <div className="max-w-[1100px] mx-auto px-8 py-4">
                <div className="flex items-center gap-3">
                  <Search size={16} strokeWidth={1.5} style={{ color: "var(--color-text-tertiary)" }} />
                  <input
                    type="text"
                    placeholder="Search festivals, cities, countries..."
                    autoFocus
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      color: "var(--color-text-primary)",
                    }}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-label"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    ESC
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}
          >
            <nav className="flex flex-col px-8 py-6 gap-0 flex-1">
              {[...navLinks, { href: "/map", label: "Map" }].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    className="block py-5"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "28px",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      borderBottom: "1px solid var(--color-border-default)",
                      color: pathname === href
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Link href="/settings" className="flex items-center gap-3 py-4">
                  <span
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{
                      background: "var(--color-text-primary)",
                      color: "var(--color-bg-elevated)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    H
                  </span>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-text-primary)" }}>
                      Hyang Oh
                    </p>
                    <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                      Settings
                    </p>
                  </div>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
