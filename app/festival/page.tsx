"use client";

import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { festivals } from "@/lib/festivals";

/* ── Bento card data: mix of images & videos with object-position focus ── */
const bentoCards = [
  {
    id: festivals[0].id,
    type: "image" as const,
    src: festivals[0].heroImage,
    title: festivals[0].name,
    subtitle: `${festivals[0].city}, ${festivals[0].country}`,
    category: festivals[0].category,
    span: "col-span-2 row-span-2",
    objectPosition: "center 30%",
  },
  {
    id: "video-1",
    type: "video" as const,
    src: "https://cdn.coverr.co/videos/coverr-confetti-falling-down-1584/1080p.mp4",
    poster: festivals[5].image,
    title: "Festival Highlights",
    subtitle: "Best moments from around the world",
    category: "Highlights",
    span: "col-span-1 row-span-1",
    objectPosition: "center",
  },
  {
    id: festivals[6].id,
    type: "image" as const,
    src: festivals[6].heroImage,
    title: festivals[6].name,
    subtitle: `${festivals[6].city}, ${festivals[6].country}`,
    category: festivals[6].category,
    span: "col-span-1 row-span-1",
    objectPosition: "center 20%",
  },
  {
    id: festivals[11].id,
    type: "image" as const,
    src: festivals[11].heroImage,
    title: festivals[11].name,
    subtitle: `${festivals[11].city}, ${festivals[11].country}`,
    category: festivals[11].category,
    span: "col-span-1 row-span-2",
    objectPosition: "center 40%",
  },
  {
    id: "video-2",
    type: "video" as const,
    src: "https://cdn.coverr.co/videos/coverr-people-at-a-concert-8498/1080p.mp4",
    poster: festivals[17].image,
    title: "Live Performances",
    subtitle: "Music festivals worldwide",
    category: "Music",
    span: "col-span-2 row-span-1",
    objectPosition: "center 60%",
  },
  {
    id: festivals[9].id,
    type: "image" as const,
    src: festivals[9].heroImage,
    title: festivals[9].name,
    subtitle: `${festivals[9].city}, ${festivals[9].country}`,
    category: festivals[9].category,
    span: "col-span-1 row-span-1",
    objectPosition: "right 30%",
  },
  {
    id: festivals[14].id,
    type: "image" as const,
    src: festivals[14].heroImage,
    title: festivals[14].name,
    subtitle: `${festivals[14].city}, ${festivals[14].country}`,
    category: festivals[14].category,
    span: "col-span-1 row-span-1",
    objectPosition: "center 25%",
  },
  {
    id: festivals[4].id,
    type: "image" as const,
    src: festivals[4].heroImage,
    title: festivals[4].name,
    subtitle: `${festivals[4].city}, ${festivals[4].country}`,
    category: festivals[4].category,
    span: "col-span-2 row-span-1",
    objectPosition: "center 50%",
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── Bento Card ── */
function BentoCard({ card }: { card: (typeof bentoCards)[number] }) {
  const [hovered, setHovered] = useState(false);
  const isLink = !card.id.startsWith("video-");

  const content = (
    <motion.div
      variants={cardVariants}
      className={`${card.span} relative overflow-hidden group`}
      style={{ minHeight: card.span.includes("row-span-2") ? 420 : 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Media */}
      {card.type === "video" ? (
        <video
          src={card.src}
          poster={card.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            objectPosition: card.objectPosition,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      ) : (
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{
            objectPosition: card.objectPosition,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          sizes={
            card.span.includes("col-span-2")
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
          opacity: hovered ? 1 : 0.55,
        }}
      />

      {/* Inner border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(255,255,255,0.25)"
            : "inset 0 0 0 0px rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <motion.span
          className="text-label"
          style={{ color: "var(--color-text-on-dark-tertiary)" }}
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {card.category}
        </motion.span>
        <motion.h3
          className="text-card-title mt-1"
          style={{ color: "var(--color-text-on-dark)" }}
          animate={{ y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {card.title}
        </motion.h3>
        <motion.p
          className="text-caption mt-1"
          style={{ color: "var(--color-text-on-dark-secondary)" }}
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 }}
        >
          {card.subtitle}
        </motion.p>
      </div>

      {/* Play indicator for video cards */}
      {card.type === "video" && (
        <motion.div
          className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
          style={{ width: 32, height: 32 }}
          animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M1 1L9 6L1 11V1Z" fill="white" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );

  if (isLink) {
    return (
      <Link href={`/festival/${card.id}`} className="contents">
        {content}
      </Link>
    );
  }
  return content;
}

/* ── Page ── */
export default function FestivalIndexPage() {
  const totalFestivals = festivals.length;
  const totalCountries = new Set(festivals.map((f) => f.country)).size;

  return (
    <>
      <Navigation />

      <main
        className="min-h-screen"
        style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}
      >
        {/* ═══ Hero — Sana Summit style ═══ */}
        <motion.section
          className="text-center"
          style={{ paddingTop: "80px", paddingBottom: "48px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-[1100px] mx-auto px-8">
            <motion.p
              className="text-label"
              style={{ color: "var(--color-text-tertiary)", marginBottom: "20px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Festivo Collection
            </motion.p>

            <motion.h1
              className="text-display"
              style={{ color: "var(--color-text-primary)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Celebrations that
              <br />
              <span style={{ color: "var(--color-text-tertiary)" }}>
                move the world
              </span>
            </motion.h1>

            <motion.p
              className="text-body"
              style={{
                color: "var(--color-text-secondary)",
                marginTop: "24px",
                maxWidth: "440px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Immerse yourself in the sights, sounds, and stories
              of festivals across {totalCountries} countries.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-3"
              style={{ marginTop: "32px" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/explore"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "var(--color-text-primary)",
                  color: "var(--color-bg-elevated)",
                  padding: "10px 28px",
                  transition: "opacity 0.15s",
                }}
                className="hover:opacity-90"
              >
                Explore all
              </Link>
              <Link
                href="/calendar"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "1px solid var(--color-border-default)",
                  color: "var(--color-text-secondary)",
                  padding: "10px 28px",
                  transition: "border-color 0.15s",
                }}
                className="hover:border-[--color-text-tertiary]"
              >
                By season
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══ Bento Grid ═══ */}
        <section style={{ paddingBottom: "64px" }}>
          <div className="max-w-[1100px] mx-auto px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              style={{ gridAutoRows: "200px" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {bentoCards.map((card) => (
                <BentoCard key={card.id} card={card} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ Stats line ═══ */}
        <motion.section
          style={{
            borderTop: "1px solid var(--color-border-default)",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-center gap-16">
            {[
              { label: "Festivals", value: String(totalFestivals) },
              { label: "Countries", value: String(totalCountries) },
              { label: "Categories", value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-heading" style={{ color: "var(--color-text-primary)" }}>
                  {stat.value}
                </p>
                <p
                  className="text-label"
                  style={{ color: "var(--color-text-tertiary)", marginTop: "4px" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  );
}
