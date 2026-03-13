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

const continentData: { id: Continent; label: string; labelKo: string; coords: { x: string; y: string } }[] = [
  { id: "Americas", label: "Americas", labelKo: "아메리카", coords: { x: "22%", y: "45%" } },
  { id: "Europe", label: "Europe", labelKo: "유럽", coords: { x: "48%", y: "30%" } },
  { id: "Africa", label: "Africa", labelKo: "아프리카", coords: { x: "52%", y: "55%" } },
  { id: "Asia", label: "Asia", labelKo: "아시아", coords: { x: "72%", y: "35%" } },
  { id: "Oceania", label: "Oceania", labelKo: "오세아니아", coords: { x: "80%", y: "65%" } },
];

const dmSans = "var(--font-dm-sans), 'DM Sans', sans-serif";
const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

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
    <main className="pt-14 min-h-screen" style={{ background: "#ffffff" }}>
      {/* Header */}
      <div className="py-12 lg:py-16 border-b" style={{ borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="rule-line" />
          <span
            className="text-xs font-semibold uppercase tracking-widest block mb-2"
            style={{ color: "#4344FD", fontFamily: dmSans }}
          >
            지도로 찾기
          </span>
          <h1
            className="text-4xl lg:text-6xl font-semibold"
            style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
          >
            Festival Map
          </h1>
          <p className="mt-3 text-base" style={{ color: "#6e6e6e", fontFamily: dmSans, fontWeight: 300 }}>
            대륙을 선택하면 해당 지역의 축제를 볼 수 있어요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map area */}
          <div className="lg:col-span-2">
            {/* Continent visual map */}
            <div
              className="relative w-full border overflow-hidden"
              style={{ aspectRatio: "16/9", background: "#fafafa", borderColor: "#e5e2da" }}
            >
              {/* Simple world map representation with clickable continents */}
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
                        background: isActive ? "#4344FD" : "#1a1a1a",
                        borderRadius: "50%",
                        boxShadow: isActive ? "0 0 0 4px rgba(67,68,253,0.2)" : "none",
                      }}
                    >
                      <MapPin size={18} strokeWidth={1.5} color="#ffffff" />
                    </div>
                    <span
                      className="text-xs font-semibold whitespace-nowrap"
                      style={{
                        color: isActive ? "#4344FD" : "#1a1a1a",
                        fontFamily: dmSans,
                      }}
                    >
                      {c.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "#9e9e9e", fontFamily: dmSans }}
                    >
                      {count}개
                    </span>
                  </button>
                );
              })}

              {/* Background decorative lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="100" y2="50" stroke="#9e9e9e" strokeWidth="0.2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#9e9e9e" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#9e9e9e" strokeWidth="0.2" />
              </svg>
            </div>

            {/* Continent tabs */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setSelectedContinent(null)}
                className="px-4 py-2 text-xs font-medium border transition-all"
                style={{
                  background: !selectedContinent ? "#1a1a1a" : "#ffffff",
                  color: !selectedContinent ? "#ffffff" : "#6e6e6e",
                  borderColor: !selectedContinent ? "#1a1a1a" : "#e5e2da",
                  fontFamily: dmSans,
                }}
              >
                All
              </button>
              {continentData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedContinent(selectedContinent === c.id ? null : c.id)}
                  className="px-4 py-2 text-xs font-medium border transition-all"
                  style={{
                    background: selectedContinent === c.id ? "#4344FD" : "#ffffff",
                    color: selectedContinent === c.id ? "#ffffff" : "#6e6e6e",
                    borderColor: selectedContinent === c.id ? "#4344FD" : "#e5e2da",
                    fontFamily: dmSans,
                  }}
                >
                  {c.labelKo}
                </button>
              ))}
            </div>
          </div>

          {/* Festival list panel */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "80px" }}>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-sm font-semibold"
                  style={{ color: "#1a1a1a", fontFamily: dmSans }}
                >
                  {selectedContinent
                    ? continentData.find((c) => c.id === selectedContinent)?.labelKo
                    : "전체"}{" "}
                  · {filteredFestivals.length}개 축제
                </h2>
              </div>

              {/* Country groups */}
              <div className="space-y-0 max-h-[60vh] overflow-y-auto">
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
                        <div key={country} className="border-b" style={{ borderColor: "#e5e2da" }}>
                          <p
                            className="text-xs font-semibold uppercase tracking-widest py-3"
                            style={{ color: "#9e9e9e", fontFamily: dmSans }}
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
                                  <Image
                                    src={f.image}
                                    alt={f.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className="text-sm font-medium truncate group-hover:text-blue-500 transition-colors"
                                    style={{ color: "#1a1a1a", fontFamily: dmSans }}
                                  >
                                    {f.name}
                                  </p>
                                  <p className="text-xs" style={{ color: "#9e9e9e", fontFamily: dmSans }}>
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
