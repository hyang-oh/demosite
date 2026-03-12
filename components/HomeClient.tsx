"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/festivals";
import { categories } from "@/lib/festivals";

const icons: Record<string, string> = {
  Music: "♪",
  Culture: "⛩",
  Nature: "🌿",
  Food: "⊕",
  Seasonal: "❋",
  Art: "◈",
};

interface HomeClientProps {
  categories: Category[];
}

export default function HomeClient({ categories }: HomeClientProps) {
  const [active, setActive] = useState<string>("Music");

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
              style={{
                background: isActive ? "#C8741A" : "transparent",
                color: isActive ? "#FFFFFF" : "#6B6B6B",
                borderColor: isActive ? "#C8741A" : "#E8E3DC",
              }}
            >
              <span className="text-xs">{icons[cat]}</span>
              {cat}
            </button>
          );
        })}
      </div>
      <Link
        href={`/explore?category=${active}`}
        className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: "#C8741A" }}
      >
        Explore {active} festivals →
      </Link>
    </div>
  );
}
