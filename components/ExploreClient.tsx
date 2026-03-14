"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FestivalCard from "@/components/FestivalCard";
import type { Festival } from "@/lib/festivals";

interface ExploreClientProps {
  festivals: Festival[];
}

/* ── Sidebar filter sections — §7 ── */
const sidebarSections = [
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
    label: "By Month",
    items: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  {
    id: "vibe",
    label: "By Vibe",
    items: ["Family-friendly", "Romantic", "Solo", "Adventure", "Cultural"],
  },
];

export default function ExploreClient({ festivals }: ExploreClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        minHeight: "100vh",
        paddingTop: "56px",
      }}
    >
      {/* ── Left sidebar — §7 ── */}
      <aside
        style={{
          background: "var(--color-bg-sunken)",
          borderRight: "1px solid var(--color-border-default)",
          padding: "32px 0",
          position: "sticky",
          top: "56px",
          height: "calc(100vh - 56px)",
          overflowY: "auto",
        }}
      >
        {/* All reset */}
        <div style={{ padding: "0 20px", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: activeFilter === null ? 500 : 400,
              color: activeFilter === null
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 0 7px 8px",
              borderLeft: activeFilter === null
                ? "2px solid var(--color-accent)"
                : "2px solid transparent",
            }}
          >
            All ({festivals.length})
          </button>
        </div>

        {sidebarSections.map((section) => (
          <div key={section.id} style={{ padding: "0 20px", marginBottom: "28px" }}>
            <p
              className="text-label"
              style={{
                color: "var(--color-text-tertiary)",
                marginBottom: "10px",
              }}
            >
              {section.label}
            </p>
            {section.items.map((item) => {
              const isActive = activeFilter === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveFilter(isActive ? null : item)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: isActive
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                    fontWeight: isActive ? 500 : 400,
                    padding: "7px 0 7px 8px",
                    background: "none",
                    border: "none",
                    borderLeft: isActive
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.1s",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* ── Right content — §7 ── */}
      <div style={{ padding: "48px 32px", background: "var(--color-bg-base)" }}>
        {/* Section header — §4 pattern */}
        <div style={{ marginBottom: "48px" }}>
          <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
            {activeFilter ?? `전 세계 ${filtered.length}개 축제`}
          </p>
          <h1 className="text-heading">Explore Festivals</h1>
        </div>

        {/* Result count */}
        <p
          className="text-caption"
          style={{ color: "var(--color-text-secondary)", marginBottom: "24px" }}
        >
          {filtered.length}개의 축제
        </p>

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
                검색 결과가 없어요
              </p>
              <p className="text-caption" style={{ color: "var(--color-text-tertiary)", marginTop: "8px" }}>
                다른 필터를 선택해 보세요
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
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
