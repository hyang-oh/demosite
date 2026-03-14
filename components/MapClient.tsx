"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Festival, Continent } from "@/lib/festivals";

interface MapClientProps {
  festivals: Festival[];
}

const continentData: { id: Continent; label: string; coords: { x: string; y: string } }[] = [
  { id: "Americas", label: "Americas", coords: { x: "22%", y: "45%" } },
  { id: "Europe", label: "Europe", coords: { x: "48%", y: "30%" } },
  { id: "Africa", label: "Africa", coords: { x: "52%", y: "55%" } },
  { id: "Asia", label: "Asia", coords: { x: "72%", y: "35%" } },
  { id: "Oceania", label: "Oceania", coords: { x: "80%", y: "65%" } },
];

export default function MapClient({ festivals }: MapClientProps) {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);

  const filteredFestivals = useMemo(() => {
    if (!selectedContinent) return festivals;
    return festivals.filter((f) => f.continent === selectedContinent);
  }, [festivals, selectedContinent]);

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredFestivals.forEach((f) => {
      counts[f.country] = (counts[f.country] || 0) + 1;
    });
    return counts;
  }, [filteredFestivals]);

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid var(--color-border-default)" }}>
        <div className="max-w-[1100px] mx-auto px-8" style={{ paddingTop: "48px", paddingBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Festival Map
          </h1>
          <p className="text-body" style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}>
            Explore festivals by region
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map area */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16/9",
                background: "var(--color-bg-sunken)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              {continentData.map((c) => {
                const count = festivals.filter((f) => f.continent === c.id).length;
                const isActive = selectedContinent === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContinent(isActive ? null : c.id)}
                    className="absolute flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110"
                    style={{
                      left: c.coords.x,
                      top: c.coords.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center transition-all duration-200"
                      style={{
                        background: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                        borderRadius: "50%",
                        boxShadow: isActive ? "0 0 0 4px rgba(0,0,0,0.1)" : "none",
                      }}
                    >
                      <MapPin size={18} strokeWidth={1.5} color="#ffffff" />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.label}
                    </span>
                    <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                      {count}
                    </span>
                  </button>
                );
              })}

              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </svg>
            </div>

            {/* Continent tabs */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setSelectedContinent(null)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: !selectedContinent ? 500 : 400,
                  color: !selectedContinent ? "var(--color-bg-elevated)" : "var(--color-text-secondary)",
                  background: !selectedContinent ? "var(--color-text-primary)" : "transparent",
                  border: "1px solid var(--color-border-default)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              {continentData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedContinent(selectedContinent === c.id ? null : c.id)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: selectedContinent === c.id ? 500 : 400,
                    color: selectedContinent === c.id ? "var(--color-bg-elevated)" : "var(--color-text-secondary)",
                    background: selectedContinent === c.id ? "var(--color-text-primary)" : "transparent",
                    border: "1px solid var(--color-border-default)",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Festival list panel */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "80px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  marginBottom: "16px",
                }}
              >
                {selectedContinent
                  ? continentData.find((c) => c.id === selectedContinent)?.label
                  : "All"}{" "}
                — {filteredFestivals.length} festivals
              </p>

              <div className="max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedContinent || "all"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {Object.entries(countryCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([country]) => (
                        <div key={country} style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                          <p
                            className="text-label"
                            style={{ color: "var(--color-text-tertiary)", padding: "12px 0 4px" }}
                          >
                            {country}
                          </p>
                          {filteredFestivals
                            .filter((f) => f.country === country)
                            .map((f) => (
                              <Link
                                key={f.id}
                                href={`/festival/${f.id}`}
                                className="flex items-center gap-3 py-2.5 group"
                              >
                                <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden">
                                  <Image src={f.image} alt={f.name} fill className="object-cover" sizes="40px" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className="truncate"
                                    style={{
                                      fontFamily: "var(--font-sans)",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "var(--color-text-primary)",
                                    }}
                                  >
                                    {f.name}
                                  </p>
                                  <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                                    {f.city} · {f.month}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
