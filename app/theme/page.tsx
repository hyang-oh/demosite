"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals } from "@/lib/festivals";
import { Music, Palette, TreePine, Utensils, Sparkles, Drama, Heart, Compass, Users, Zap } from "lucide-react";

const themeCategories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "Music", label: "Music", icon: Music },
  { id: "Culture", label: "Cultural", icon: Drama },
  { id: "Nature", label: "Nature", icon: TreePine },
  { id: "Food", label: "Food", icon: Utensils },
  { id: "Art", label: "Art", icon: Palette },
  { id: "Seasonal", label: "Seasonal", icon: Sparkles },
  { id: "Romantic", label: "Romantic", icon: Heart },
  { id: "Adventure", label: "Adventure", icon: Compass },
  { id: "Family", label: "Family", icon: Users },
  { id: "Energetic", label: "Energetic", icon: Zap },
];

export default function ThemePage() {
  const [active, setActive] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all"
    ? festivals
    : festivals.filter(
        (f) =>
          f.category === active ||
          (f.mood && f.mood.some((m) => m === active))
      );

  return (
    <>
      <Navigation />
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
              Theme
            </h1>
            <p className="text-body" style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}>
              Explore festivals by theme and vibe
            </p>
          </div>
        </div>

        {/* Theme selector — icon row, horizontal scroll */}
        <div
          style={{
            borderBottom: "1px solid var(--color-border-default)",
            background: "var(--color-bg-elevated)",
          }}
        >
          <div className="max-w-[1100px] mx-auto px-8">
            <div
              ref={scrollRef}
              className="flex gap-0 overflow-x-auto py-6"
              style={{ scrollbarWidth: "none" }}
            >
              {themeCategories.map((theme) => {
                const isActive = active === theme.id;
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setActive(theme.id)}
                    className="flex flex-col items-center gap-3 flex-shrink-0 transition-all duration-200"
                    style={{
                      width: "100px",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: "8px 0",
                      borderBottom: isActive
                        ? "2px solid var(--color-text-primary)"
                        : "2px solid transparent",
                    }}
                  >
                    <div
                      className="flex items-center justify-center transition-all duration-200"
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: isActive
                          ? "var(--color-text-primary)"
                          : "var(--color-bg-sunken)",
                        color: isActive
                          ? "var(--color-bg-elevated)"
                          : "var(--color-text-secondary)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                          ? "var(--color-text-primary)"
                          : "var(--color-text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          <p
            className="text-caption"
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            {filtered.length} festivals
          </p>

          {filtered.length === 0 ? (
            <div style={{ padding: "96px 0", textAlign: "center" }}>
              <p className="text-heading" style={{ color: "var(--color-text-tertiary)" }}>
                No festivals found
              </p>
              <p className="text-caption mt-2" style={{ color: "var(--color-text-tertiary)" }}>
                Try another theme
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="standard" index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
