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
  { value: "recommended", label: "추천순" },
  { value: "rating", label: "평점순" },
  { value: "month", label: "월별" },
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
    <main className="min-h-screen" style={{ background: "#ffffff", paddingTop: "90px" }}>
      {/* Page header */}
      <div
        className="relative py-16 lg:py-24 overflow-hidden border-b"
        style={{ background: "#ffffff", borderColor: "#e5e2da" }}
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <span className="rule-line" />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
          >
            전 세계 {filtered.length}개 축제
          </span>
          <h1
            className="text-5xl lg:text-7xl font-semibold mt-3"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.0,
              color: "#1a1a1a",
            }}
          >
            Explore Festivals
          </h1>
          <p
            className="mt-4 text-lg max-w-lg"
            style={{ color: "#6e6e6e", fontFamily: "'Pretendard', sans-serif", fontWeight: 300 }}
          >
            세계 곳곳의 축제를 당신의 스타일로 필터링하세요.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md">
            <div
              className="flex items-center gap-3 px-4 py-3 border"
              style={{ background: "#ffffff", borderColor: "#e5e2da" }}
            >
              <span style={{ color: "#6e6e6e", fontSize: "14px" }}>⌕</span>
              <input
                type="text"
                placeholder="축제명, 도시, 국가로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{
                  color: "#1a1a1a",
                  fontFamily: "'Pretendard', sans-serif",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-xs transition-colors"
                  style={{ color: "#6e6e6e" }}
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
        className="sticky z-30 border-b"
        style={{
          top: "90px",
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(12px)",
          borderColor: "#e5e2da",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              categories={categories}
              includeAll
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="text-xs font-medium border px-3 py-2 outline-none cursor-pointer hidden sm:block"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                borderColor: "#e5e2da",
                background: "#ffffff",
                color: "#6e6e6e",
                letterSpacing: "0.05em",
              }}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex border" style={{ borderColor: "#e5e2da" }}>
              {(["grid", "list"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200 text-xs"
                  style={{
                    background: viewMode === mode ? "#1a1a1a" : "transparent",
                    color: viewMode === mode ? "#ffffff" : "#9e9e9e",
                  }}
                  title={mode === "grid" ? "그리드 보기" : "목록 보기"}
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
        <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: "#e5e2da" }}>
          <p className="text-sm" style={{ color: "#6e6e6e", fontFamily: "'Pretendard', sans-serif" }}>
            {filtered.length > 0 ? (
              <>
                <span className="font-medium" style={{ color: "#1a1a1a" }}>{filtered.length}</span>개의 축제
                {activeCategory !== "All" && (
                  <> · <span className="font-medium" style={{ color: "#4344FD" }}>{activeCategory}</span></>
                )}
              </>
            ) : (
              "검색 결과가 없습니다"
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
              <div className="text-3xl mb-4 font-light" style={{ color: "#9e9e9e" }}>—</div>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#1a1a1a", fontStyle: "italic" }}
              >
                검색 결과가 없어요
              </h3>
              <p className="text-sm mt-2" style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}>
                다른 검색어나 카테고리를 시도해 보세요
              </p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key={`grid-${activeCategory}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
              transition={{ duration: 0.2 }}
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
