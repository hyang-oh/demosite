"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FestivalCard from "@/components/FestivalCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Festival, Category } from "@/lib/festivals";

interface ExploreClientProps {
  festivals: Festival[];
  categories: Category[];
}

type ViewMode = "grid" | "list";
type SortMode = "recommended" | "rating" | "month";

const sortOptions: { value: SortMode; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Top Rated" },
  { value: "month", label: "By Month" },
];

export default function ExploreClient({ festivals, categories }: ExploreClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortMode>("recommended");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...festivals];
    if (activeCategory !== "All") {
      list = list.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.country.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "month") {
      const monthOrder = ["January","February","March","March–April","April","May","June","July","August","September","October","October–November","November","December"];
      list.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }
    return list;
  }, [festivals, activeCategory, search, sort]);

  return (
    <main className="pt-16 min-h-screen" style={{ background: "#F7F4EF" }}>
      {/* Page header */}
      <div
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ background: "#1C1C1C" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C8741A 0, #C8741A 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <span
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "#C8741A" }}
          >
            {filtered.length} festivals worldwide
          </span>
          <h1
            className="text-4xl lg:text-6xl font-bold text-white mt-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore Festivals
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-lg">
            Every celebration, every corner of the world. Filter by your style.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-lg">
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span className="text-white/40 text-lg">⌕</span>
              <input
                type="text"
                placeholder="Search by name, city, country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/40 hover:text-white text-xs transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div
        className="sticky top-16 z-30 py-4 border-b"
        style={{
          background: "rgba(247, 244, 239, 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "#E8E3DC",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              categories={categories}
              includeAll
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="text-xs font-medium border rounded-full px-3 py-2 outline-none cursor-pointer hidden sm:block"
              style={{
                borderColor: "#E8E3DC",
                background: "#FFFFFF",
                color: "#6B6B6B",
              }}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* View toggle */}
            <div
              className="flex rounded-full border p-0.5 gap-0.5"
              style={{ borderColor: "#E8E3DC" }}
            >
              {(["grid", "list"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-xs"
                  style={{
                    background: viewMode === mode ? "#C8741A" : "transparent",
                    color: viewMode === mode ? "#FFFFFF" : "#A8A8A8",
                  }}
                  title={mode === "grid" ? "Grid view" : "List view"}
                >
                  {mode === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            {filtered.length > 0 ? (
              <>
                <span className="font-medium" style={{ color: "#1C1C1C" }}>{filtered.length}</span> festivals
                {activeCategory !== "All" && (
                  <> in <span className="font-medium" style={{ color: "#C8741A" }}>{activeCategory}</span></>
                )}
              </>
            ) : (
              "No festivals found"
            )}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <div className="text-4xl mb-4">✦</div>
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}
              >
                No festivals found
              </h3>
              <p className="text-sm mt-2" style={{ color: "#A8A8A8" }}>
                Try a different search or category
              </p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key={`grid-${activeCategory}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="standard" index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`list-${activeCategory}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="divide-y"
              style={{ borderTop: "1px solid #E8E3DC", borderBottom: "1px solid #E8E3DC" }}
            >
              {filtered.map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="horizontal" index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
