"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/festivals";

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
      <div className="flex gap-1 pb-1" style={{ minWidth: "max-content" }}>
        {items.map((cat) => {
          const isActive = active === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 whitespace-nowrap border"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                background: isActive ? "#1a1a1a" : "transparent",
                color: isActive ? "#ffffff" : "#6e6e6e",
                borderColor: isActive ? "#1a1a1a" : "#e5e2da",
                letterSpacing: "0.1em",
              }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
