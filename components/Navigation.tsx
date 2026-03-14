"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map } from "lucide-react";

/* ── Mega-menu data ── */
const megaCategories = [
  {
    id: "theme",
    label: "By Theme",
    items: ["Music", "Cultural", "Food", "Light & Fire", "Nature", "Art", "Seasonal", "Water"],
  },
  {
    id: "country",
    label: "By Country",
    items: ["Japan", "South Korea", "India", "Thailand", "United Kingdom", "Germany", "Spain", "Brazil", "United States", "Mexico"],
  },
  {
    id: "month",
    label: "This Month",
    items: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  {
    id: "vibe",
    label: "By Vibe",
    items: ["Family-friendly", "Romantic", "Solo", "Adventure", "Cultural"],
  },
];

const navLinks = [
  { href: "/explore", label: "Explore", hasMega: true },
  { href: "/calendar", label: "Calendar", hasMega: false },
  { href: "/magazine", label: "Magazine", hasMega: false },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(megaCategories[0].id);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  /* Close mega menu on outside click */
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  const activeMega = megaCategories.find((c) => c.id === activeCategory) ?? megaCategories[0];

  return (
    <>
      <header
        ref={megaRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "var(--color-bg-base)",
          borderBottom: scrolled || megaOpen
            ? "1px solid var(--color-border-default)"
            : "1px solid transparent",
        }}
      >
        {/* ── Nav Bar — 56px ── */}
        <div
          className="max-w-[1100px] mx-auto px-8 flex items-center justify-between"
          style={{ height: "56px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "var(--color-text-primary)",
              }}
            >
              Festivo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label, hasMega }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              if (hasMega) {
                return (
                  <button
                    key={href}
                    onClick={() => setMegaOpen(!megaOpen)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: megaOpen || active
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.15s",
                    }}
                    className="hover:text-[--color-text-primary]"
                  >
                    {label}
                  </button>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: active
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
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

        {/* ── Mega Menu — 2-panel dropdown ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              style={{
                borderTop: "1px solid var(--color-border-default)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  background: "var(--color-bg-elevated)",
                }}
              >
                {/* Left — category list */}
                <div
                  style={{
                    background: "var(--color-bg-sunken)",
                    padding: "24px 0",
                    borderRight: "1px solid var(--color-border-default)",
                  }}
                >
                  {megaCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 20px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: activeCategory === cat.id
                          ? "var(--color-text-primary)"
                          : "var(--color-text-secondary)",
                        fontWeight: activeCategory === cat.id ? 500 : 400,
                        background: activeCategory === cat.id
                          ? "var(--color-bg-elevated)"
                          : "transparent",
                        border: "none",
                        borderLeft: activeCategory === cat.id
                          ? "2px solid var(--color-accent)"
                          : "2px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.1s",
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Right — items 2-col */}
                <div style={{ padding: "28px 40px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "18px",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      marginBottom: "20px",
                    }}
                  >
                    {activeMega.label}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0 40px",
                    }}
                  >
                    {activeMega.items.map((item) => (
                      <Link
                        key={item}
                        href={`/explore?filter=${encodeURIComponent(item)}`}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          color: "var(--color-text-secondary)",
                          padding: "10px 0",
                          borderBottom: "1px solid var(--color-border-default)",
                          textDecoration: "none",
                          display: "block",
                          transition: "color 0.1s",
                        }}
                        className="hover:text-[--color-text-primary]"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
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
            style={{ background: "var(--color-bg-base)", paddingTop: "56px" }}
          >
            <nav className="flex flex-col px-8 py-6 gap-0 flex-1">
              {[...navLinks, { href: "/map", label: "Map", hasMega: false }].map(({ href, label }, i) => (
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
                      설정
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
