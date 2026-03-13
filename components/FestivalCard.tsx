"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Festival } from "@/lib/festivals";

interface FestivalCardProps {
  festival: Festival;
  variant?: "standard" | "featured" | "horizontal";
  index?: number;
}

const categoryColors: Record<string, string> = {
  Music: "#4344FD",
  Culture: "#4344FD",
  Nature: "#4344FD",
  Food: "#4344FD",
  Seasonal: "#4344FD",
  Art: "#4344FD",
};

export default function FestivalCard({
  festival,
  variant = "standard",
  index = 0,
}: FestivalCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" as const },
    },
  };

  if (variant === "horizontal") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <Link
          href={`/festival/${festival.id}`}
          className="group flex gap-5 items-start py-5 border-b"
          style={{ borderColor: "#e5e2da" }}
        >
          <div className="relative w-24 h-18 overflow-hidden flex-shrink-0 img-zoom" style={{ height: "72px" }}>
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
            >
              {festival.category}
            </span>
            <h3
              className="text-base font-semibold line-clamp-1 mt-0.5 group-hover:text-blue-500 transition-colors"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                color: "#1a1a1a",
                fontSize: "1.05rem",
              }}
            >
              {festival.name}
            </h3>
            <p className="text-xs mt-1" style={{ color: "#6e6e6e", fontFamily: "'Pretendard', sans-serif" }}>
              {festival.city}, {festival.country} · {festival.month}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="group cursor-pointer"
      >
        <Link href={`/festival/${festival.id}`} className="block">
          <div className="relative overflow-hidden img-zoom" style={{ aspectRatio: "3/4" }}>
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 gradient-full" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
              >
                {festival.category}
              </span>
              <h2
                className="text-2xl font-semibold text-white mt-2 line-clamp-2"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
              >
                {festival.name}
              </h2>
              <p className="text-white/60 text-sm mt-1" style={{ fontFamily: "'Pretendard', sans-serif" }}>
                {festival.city}, {festival.country} · {festival.month}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Standard card — Monocle editorial style
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group cursor-pointer"
    >
      <Link href={`/festival/${festival.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden img-zoom" style={{ aspectRatio: "4/3" }}>
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {festival.editorsPick && (
            <div className="absolute top-3 left-3">
              <span className="badge">에디터 추천</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-3 pb-4 border-b" style={{ borderColor: "#e5e2da" }}>
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
            >
              {festival.category}
            </span>
            <span
              className="text-xs"
              style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}
            >
              {festival.month}
            </span>
          </div>
          <h3
            className="text-lg font-semibold mt-1 line-clamp-2 group-hover:text-blue-500 transition-colors"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            {festival.name}
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: "#6e6e6e", fontFamily: "'Pretendard', sans-serif" }}
          >
            {festival.city}, {festival.country}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-medium" style={{ color: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}>
              ★ {festival.rating}
            </span>
            <span className="text-xs" style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}>
              ({festival.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
