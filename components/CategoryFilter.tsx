"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/festivals";

const icons: Record<string, string> = {
  All: "✦",
  Music: "♪",
  Culture: "⛩",
  Nature: "🌿",
  Food: "⊕",
  Seasonal: "❋",
  Art: "◈",
};

interface CategoryFilterProps {
  active: string;
  onChange: (cat: string) => void;
  categories: string[];
  includeAll?: boolean;
}

export default function CategoryFilter({
  active,
  onChange,
  categories,
  includeAll = true,
}: CategoryFilterProps) {
  const items = includeAll ? ["All", ...categories] : categories;

  return (
    <div className="scroll-x">
      <div className="flex gap-2 pb-1" style={{ minWidth: "max-content" }}>
        {items.map((cat) => {
          const isActive = active === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap"
              style={{
                background: isActive ? "#C8741A" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#6B6B6B",
                borderColor: isActive ? "#C8741A" : "#E8E3DC",
              }}
            >
              <span className="text-xs">{icons[cat] ?? "•"}</span>
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
