"use client";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { festivals } from "@/lib/festivals";

/* ── Floating media particles — scattered on top of giant text ── */
const particles: {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  w: number;
  h: number;
  x: string;
  y: string;
  rotate: number;
  depth: number; /* 0.3–1.0, controls parallax intensity */
  objectPosition: string;
}[] = [
  {
    id: "p1",
    type: "image",
    src: festivals[0].image,
    w: 180,
    h: 140,
    x: "8%",
    y: "18%",
    rotate: -6,
    depth: 0.8,
    objectPosition: "center 30%",
  },
  {
    id: "p2",
    type: "image",
    src: festivals[5].image,
    w: 120,
    h: 160,
    x: "28%",
    y: "12%",
    rotate: 3,
    depth: 0.5,
    objectPosition: "center 20%",
  },
  {
    id: "p3",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-confetti-falling-down-1584/1080p.mp4",
    poster: festivals[6].image,
    w: 160,
    h: 120,
    x: "48%",
    y: "8%",
    rotate: -2,
    depth: 0.9,
    objectPosition: "center",
  },
  {
    id: "p4",
    type: "image",
    src: festivals[11].image,
    w: 100,
    h: 130,
    x: "72%",
    y: "15%",
    rotate: 5,
    depth: 0.4,
    objectPosition: "center 40%",
  },
  {
    id: "p5",
    type: "image",
    src: festivals[9].image,
    w: 140,
    h: 100,
    x: "88%",
    y: "22%",
    rotate: -4,
    depth: 0.7,
    objectPosition: "right 30%",
  },
  {
    id: "p6",
    type: "image",
    src: festivals[4].image,
    w: 110,
    h: 150,
    x: "15%",
    y: "52%",
    rotate: 4,
    depth: 0.6,
    objectPosition: "center 60%",
  },
  {
    id: "p7",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-people-at-a-concert-8498/1080p.mp4",
    poster: festivals[17].image,
    w: 170,
    h: 120,
    x: "38%",
    y: "48%",
    rotate: -3,
    depth: 0.85,
    objectPosition: "center",
  },
  {
    id: "p8",
    type: "image",
    src: festivals[14].image,
    w: 90,
    h: 90,
    x: "60%",
    y: "55%",
    rotate: 8,
    depth: 0.35,
    objectPosition: "center 25%",
  },
  {
    id: "p9",
    type: "image",
    src: festivals[12].image,
    w: 130,
    h: 170,
    x: "78%",
    y: "45%",
    rotate: -5,
    depth: 0.75,
    objectPosition: "center 50%",
  },
  {
    id: "p10",
    type: "image",
    src: festivals[7].image,
    w: 150,
    h: 110,
    x: "5%",
    y: "78%",
    rotate: 2,
    depth: 0.55,
    objectPosition: "center 35%",
  },
  {
    id: "p11",
    type: "image",
    src: festivals[16].image,
    w: 100,
    h: 80,
    x: "32%",
    y: "82%",
    rotate: -7,
    depth: 0.45,
    objectPosition: "center",
  },
  {
    id: "p12",
    type: "image",
    src: festivals[20].image,
    w: 120,
    h: 90,
    x: "55%",
    y: "78%",
    rotate: 3,
    depth: 0.65,
    objectPosition: "center 45%",
  },
  {
    id: "p13",
    type: "image",
    src: festivals[2].image,
    w: 80,
    h: 110,
    x: "85%",
    y: "72%",
    rotate: -2,
    depth: 0.5,
    objectPosition: "center 20%",
  },
];

/* ── Single floating particle with parallax ── */
function FloatingParticle({
  particle,
  mouseX,
  mouseY,
}: {
  particle: (typeof particles)[number];
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const px = useTransform(mouseX, (v) => v * particle.depth * 40);
  const py = useTransform(mouseY, (v) => v * particle.depth * 40);

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        left: particle.x,
        top: particle.y,
        width: particle.w,
        height: particle.h,
        x: px,
        y: py,
        rotate: particle.rotate,
        zIndex: Math.round(particle.depth * 10),
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + Math.random() * 0.8,
        ease: "easeOut" as const,
      }}
    >
      {particle.type === "video" ? (
        <video
          src={particle.src}
          poster={particle.poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectPosition: particle.objectPosition }}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={particle.src}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: particle.objectPosition }}
        />
      )}
    </motion.div>
  );
}

/* ── Page ── */
export default function FestivalIndexPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  /* Mouse tracking → normalized -1 to 1 */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setReady(true);
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set((e.clientX - cx) / cx);
      rawY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return (
    <>
      <Navigation />

      <main
        className="min-h-screen"
        style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}
      >
        {/* ═══ Hero: giant text + floating particles ═══ */}
        <section
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ height: "calc(100vh - 64px)", minHeight: "600px" }}
        >
          {/* Giant background text — fills viewport */}
          <div className="absolute inset-0 flex flex-col justify-between px-6 md:px-12 py-8 md:py-12 pointer-events-none select-none">
            {/* Top-left: description + CTA */}
            <div className="relative z-20 pointer-events-auto max-w-[420px]">
              <motion.p
                className="text-body"
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                From ancient lantern ceremonies to desert music
                gatherings — discover festivals that move people
                across {new Set(festivals.map((f) => f.country)).size} countries.
              </motion.p>
              <motion.div
                style={{ marginTop: "20px" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/explore"
                  className="text-body-sm hover:opacity-80"
                  style={{
                    display: "inline-block",
                    background: "var(--color-text-primary)",
                    color: "var(--color-bg-elevated)",
                    padding: "10px 28px",
                    transition: "opacity 0.15s",
                  }}
                >
                  Explore festivals
                </Link>
              </motion.div>
            </div>

            {/* Giant serif text — right-aligned, stacked */}
            <div className="absolute top-[5%] right-0 md:right-[-2%] z-0">
              <motion.div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: "var(--color-text-primary)",
                  fontSize: "clamp(80px, 14vw, 200px)",
                  textAlign: "right",
                  paddingRight: "12px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Festivo
                <br />
                Collection
              </motion.div>
            </div>

            {/* Bottom-left giant text — date & details */}
            <div className="relative z-0">
              <motion.div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: "var(--color-text-primary)",
                  fontSize: "clamp(60px, 11vw, 160px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span style={{ color: "var(--color-text-tertiary)" }}>*</span>
                World
                <br />
                Festivals
                <br />
                <span
                  style={{
                    fontSize: "clamp(48px, 9vw, 130px)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  2026
                </span>
              </motion.div>
            </div>
          </div>

          {/* Floating image/video particles */}
          {ready && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {particles.map((p) => (
                <FloatingParticle
                  key={p.id}
                  particle={p}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              ))}
            </div>
          )}
        </section>

        {/* ═══ Bottom info bar ═══ */}
        <motion.section
          style={{
            borderTop: "1px solid var(--color-border-default)",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between">
            <div className="flex items-center gap-12">
              {[
                { label: "Festivals", value: String(festivals.length) },
                {
                  label: "Countries",
                  value: String(
                    new Set(festivals.map((f) => f.country)).size
                  ),
                },
                { label: "Categories", value: "6" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span
                    className="text-subheading"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-label"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/explore"
              className="text-label hidden md:block"
              style={{ color: "var(--color-text-secondary)" }}
            >
              View all →
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
}
