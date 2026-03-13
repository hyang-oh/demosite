"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/calendar", label: "Calendar" },
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

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const isMapActive = pathname === "/map";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "#ffffff",
          borderBottom: scrolled ? "1px solid #e5e2da" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: "90px" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group flex-shrink-0">
            <span
              className="text-2xl lg:text-3xl font-bold tracking-tight"
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
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative text-base font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    color: active ? "#4344FD" : "#1a1a1a",
                    letterSpacing: "0.01em",
                  }}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "#4344FD" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right: Map icon + Search icon + Profile */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/map"
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-50"
              aria-label="Map"
              style={{
                color: isMapActive ? "#4344FD" : "#3a3a3a",
              }}
            >
              <Map size={20} strokeWidth={2} />
            </Link>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-50"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2.5} style={{ color: "#3a3a3a" }} />
            </button>
            <Link
              href="/settings"
              className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded-full ml-1"
              style={{
                background: "#1a1a1a",
                color: "#ffffff",
                fontFamily: "'Pretendard', sans-serif",
              }}
            >
              H
            </Link>
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

        {/* Search bar overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t overflow-hidden"
              style={{ borderColor: "#e5e2da" }}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
                <div className="flex items-center gap-3">
                  <Search size={18} strokeWidth={2} style={{ color: "#9e9e9e" }} />
                  <input
                    type="text"
                    placeholder="축제명, 도시, 국가로 검색..."
                    autoFocus
                    className="flex-1 text-base outline-none bg-transparent"
                    style={{
                      color: "#1a1a1a",
                      fontFamily: "'Pretendard', sans-serif",
                    }}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-xs"
                    style={{ color: "#9e9e9e" }}
                  >
                    ESC
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#ffffff", paddingTop: "90px" }}
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
                    className="block py-5 text-3xl font-semibold border-b"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      borderColor: "#e5e2da",
                      color: pathname === href ? "#4344FD" : "#1a1a1a",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 py-4"
                >
                  <span
                    className="w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-full"
                    style={{ background: "#1a1a1a", color: "#ffffff", fontFamily: "'Pretendard', sans-serif" }}
                  >
                    H
                  </span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}>Hyang Oh</p>
                    <p className="text-xs" style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}>설정</p>
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
