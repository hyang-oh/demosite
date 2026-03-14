"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FestivalCard from "@/components/FestivalCard";
import type { Festival } from "@/lib/festivals";

interface ExploreClientProps {
  festivals: Festival[];
}

const filterSections = [
  {
    id: "theme",
    label: "Theme",
    items: ["Music", "Culture", "Food", "Nature", "Art", "Seasonal"],
  },
  {
    id: "country",
    label: "Country",
    items: ["Japan", "South Korea", "India", "Thailand", "United Kingdom", "Germany", "Spain", "Brazil", "United States", "Mexico"],
  },
  {
    id: "month",
    label: "Month",
    items: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  {
    id: "vibe",
    label: "Vibe",
    items: ["Energetic", "Spiritual", "Romantic", "Family", "Adventure", "Chill"],
  },
];

export default function ExploreClient({ festivals }: ExploreClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  const filtered = useMemo(() => {
    if (!activeFilter) return festivals;
    const q = activeFilter.toLowerCase();
    return festivals.filter(
      (f) =>
        f.category.toLowerCase() === q ||
        f.country.toLowerCase() === q ||
        f.month.toLowerCase() === q ||
        (f.mood && f.mood.some((m) => m.toLowerCase() === q))
    );
  }, [festivals, activeFilter]);

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        {/* Header */}
        <div style={{ paddingTop: "96px", paddingBottom: "64px" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "54px",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            Explore Festivals
          </h1>
          <p
            className="text-body"
            style={{ color: "var(--color-text-secondary)", marginTop: "12px" }}
          >
            {filtered.length} festivals{activeFilter ? ` — ${activeFilter}` : ""}
          </p>
        </div>

        {/* Filter bar */}
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-2 flex-wrap"
          style={{
            paddingBottom: "32px",
            marginBottom: "32px",
          }}
        >
          {/* All button */}
          <button
            onClick={() => { setActiveFilter(null); setOpenDropdown(null); }}
            className="filter-pill"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 500,
              color: activeFilter === null ? "var(--color-bg-elevated)" : "var(--color-text-secondary)",
              padding: "6px 14px",
              border: activeFilter === null
                ? "1px solid var(--color-text-primary)"
                : "1px solid var(--color-border-default)",
              borderRadius: "9999px",
              background: activeFilter === null ? "var(--color-text-primary)" : "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            All
          </button>

          {/* Filter dropdowns */}
          {filterSections.map((section) => {
            const isOpen = openDropdown === section.id;
            const hasActive = section.items.some((item) => item === activeFilter);
            return (
              <div key={section.id} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : section.id)}
                  className="filter-pill flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: hasActive ? "var(--color-bg-elevated)" : "var(--color-text-secondary)",
                    padding: "6px 14px",
                    border: hasActive
                      ? "1px solid var(--color-text-primary)"
                      : "1px solid var(--color-border-default)",
                    borderRadius: "9999px",
                    background: hasActive ? "var(--color-text-primary)" : "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {hasActive ? activeFilter : section.label}
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.15s",
                    }}
                  />
                </button>

                {/* Dropdown layer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.12 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        background: "var(--color-bg-elevated)",
                        border: "1px solid var(--color-border-default)",
                        borderRadius: "8px",
                        padding: "8px 0",
                        minWidth: "180px",
                        zIndex: 50,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      }}
                    >
                      {section.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setActiveFilter(activeFilter === item ? null : item);
                            setOpenDropdown(null);
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            fontFamily: "var(--font-sans)",
                            fontSize: "13px",
                            fontWeight: activeFilter === item ? 500 : 400,
                            color: activeFilter === item
                              ? "var(--color-text-primary)"
                              : "var(--color-text-secondary)",
                            padding: "8px 16px",
                            background: activeFilter === item
                              ? "var(--color-bg-sunken)"
                              : "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.1s",
                          }}
                          className="hover:bg-[--color-bg-sunken]"
                        >
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Card grid — 3 columns */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "96px 0", textAlign: "center" }}
            >
              <p className="text-heading" style={{ color: "var(--color-text-tertiary)" }}>
                No results
              </p>
              <p className="text-caption" style={{ color: "var(--color-text-tertiary)", marginTop: "8px" }}>
                Try a different filter
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ paddingBottom: "80px" }}
            >
              {filtered.map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="standard" index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
