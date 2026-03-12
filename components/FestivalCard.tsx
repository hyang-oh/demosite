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
  Music: "#7C3AED",
  Culture: "#C8741A",
  Nature: "#16A34A",
  Food: "#DC2626",
  Seasonal: "#0284C7",
  Art: "#DB2777",
};

export default function FestivalCard({
  festival,
  variant = "standard",
  index = 0,
}: FestivalCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: index * 0.06, ease: "easeOut" as const },
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
        <Link href={`/festival/${festival.id}`} className="group flex gap-4 items-start py-4 border-b" style={{ borderColor: "#E8E3DC" }}>
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 img-zoom">
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="badge mb-1">{festival.category}</span>
            <h3 className="text-sm font-semibold line-clamp-1 mt-1" style={{ color: "#1C1C1C" }}>
              {festival.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#6B6B6B" }}>
              {festival.city}, {festival.country} · {festival.month}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs" style={{ color: "#C8741A" }}>★</span>
              <span className="text-xs font-medium">{festival.rating}</span>
              <span className="text-xs" style={{ color: "#A8A8A8" }}>({festival.reviewCount.toLocaleString()})</span>
            </div>
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
          <div className="relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "3/4" }}>
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 gradient-full" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="badge mb-2">{festival.category}</span>
              <h2
                className="text-2xl font-bold text-white mt-2 line-clamp-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {festival.name}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {festival.city}, {festival.country}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-white/90">★ {festival.rating}</span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-xs text-white/60">{festival.month}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Standard card
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
        <div className="relative rounded-xl overflow-hidden img-zoom" style={{ aspectRatio: "16/10" }}>
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 gradient-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {festival.editorsPick && (
            <div className="absolute top-3 left-3">
              <span className="badge">Editor&apos;s Pick</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <span className="text-xs" style={{ color: "#C8741A" }}>★</span>
            <span className="text-xs font-semibold" style={{ color: "#1C1C1C" }}>{festival.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: categoryColors[festival.category] ?? "#C8741A" }}
            >
              {festival.category}
            </span>
            <span style={{ color: "#E8E3DC" }}>·</span>
            <span className="text-xs" style={{ color: "#A8A8A8" }}>{festival.month}</span>
          </div>
          <h3
            className="text-base font-semibold mt-1 line-clamp-2 group-hover:text-amber-700 transition-colors"
            style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}
          >
            {festival.name}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "#6B6B6B" }}>
            {festival.city}, {festival.country}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs font-medium" style={{ color: "#1C1C1C" }}>★ {festival.rating}</span>
            <span className="text-xs" style={{ color: "#A8A8A8" }}>({festival.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
