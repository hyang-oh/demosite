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
          className="group flex gap-5 items-start py-5"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <div className="relative w-24 flex-shrink-0 overflow-hidden" style={{ height: "72px" }}>
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
              {festival.category}
            </span>
            <h3
              className="line-clamp-1 mt-1"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--color-text-primary)",
              }}
            >
              {festival.name}
            </h3>
            <p className="text-caption mt-1" style={{ color: "var(--color-text-secondary)" }}>
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
        className="card group"
      >
        <Link href={`/festival/${festival.id}`} className="block">
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
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
                className="text-label"
                style={{ color: "var(--color-text-on-dark-secondary)" }}
              >
                {festival.category}
              </span>
              <h2
                className="line-clamp-2 mt-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "28px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: "var(--color-text-on-dark)",
                }}
              >
                {festival.name}
              </h2>
              <p
                className="text-caption mt-1"
                style={{ color: "var(--color-text-on-dark-tertiary)" }}
              >
                {festival.city}, {festival.country} · {festival.month}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Standard card — unboxed, Magazine-style
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group"
    >
      <Link href={`/festival/${festival.id}`} className="block">
        {/* Image — 4:3 */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="mt-3">
          <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
            {festival.category}
          </span>
          <h3
            className="line-clamp-2 mt-1"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: "var(--color-text-primary)",
            }}
          >
            {festival.name}
          </h3>
          <p className="text-caption mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {festival.city}, {festival.country} · {festival.month}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
