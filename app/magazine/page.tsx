"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

const themes = [
  "All",
  "Travel Guide",
  "Editor's Pick",
  "Photo Essay",
  "Personal Story",
  "Food & Culture",
];

const stories = [
  {
    id: "1",
    title: "The Art of Festival Travel",
    desc: "How to prepare for the perfect festival trip — from packing tips to experiencing it like a local.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    tag: "Travel Guide",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "10 Festivals You Can't Miss in 2026",
    desc: "Our editors handpicked the must-attend festivals around the world this year.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    tag: "Editor's Pick",
    readTime: "8 min",
  },
  {
    id: "3",
    title: "Cherry Blossom Season: A Photo Essay",
    desc: "Japan's sakura season captured through the lens — from Tokyo to Kyoto.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    tag: "Photo Essay",
    readTime: "4 min",
  },
  {
    id: "4",
    title: "How Holi Changed My Perspective",
    desc: "Reflections from India's Festival of Colors — finding meaning in the riot of pigments.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    tag: "Personal Story",
    readTime: "6 min",
  },
  {
    id: "5",
    title: "Festival Food Around the World",
    desc: "The special dishes you can only taste at festivals — from Oktoberfest pretzels to Songkran mango sticky rice.",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    tag: "Food & Culture",
    readTime: "7 min",
  },
  {
    id: "6",
    title: "Solo Festival Travel: A Guide",
    desc: "You don't need a group to enjoy festivals. A practical guide to going solo safely and fully.",
    image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&q=80",
    tag: "Travel Guide",
    readTime: "5 min",
  },
];

export default function MagazinePage() {
  const [activeTheme, setActiveTheme] = useState("All");

  const filtered = activeTheme === "All"
    ? stories
    : stories.filter((s) => s.tag === activeTheme);

  const featured = filtered[0];
  const grid = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--color-border-default)" }}>
          <div className="max-w-[1100px] mx-auto px-8" style={{ paddingTop: "48px", paddingBottom: "32px" }}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "36px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
              }}
            >
              Magazine
            </h1>
            <p className="text-body" style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}>
              Stories, guides, and photo essays about festivals and travel
            </p>
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">

            {/* Left sidebar — theme menu */}
            <aside className="hidden lg:block">
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "16px" }}>
                Topics
              </p>
              <nav className="flex flex-col gap-0">
                {themes.map((t) => {
                  const isActive = activeTheme === t;
                  const count = t === "All" ? stories.length : stories.filter((s) => s.tag === t).length;
                  return (
                    <button
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                        padding: "8px 12px",
                        background: isActive ? "var(--color-bg-sunken)" : "transparent",
                        border: "none",
                        borderLeft: isActive
                          ? "2px solid var(--color-text-primary)"
                          : "2px solid transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.1s",
                      }}
                    >
                      <span>{t}</span>
                      <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Right — content */}
            <div>
              {/* Mobile theme filter */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6" style={{ scrollbarWidth: "none" }}>
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTheme(t)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: activeTheme === t ? 500 : 400,
                      color: activeTheme === t ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      padding: "6px 14px",
                      border: activeTheme === t
                        ? "1px solid var(--color-text-primary)"
                        : "1px solid var(--color-border-default)",
                      borderRadius: "9999px",
                      background: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Featured story */}
              {featured && (
                <Link href="#" className="group block mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div
                      className="flex flex-col justify-center p-8 lg:p-10"
                      style={{ border: "1px solid var(--color-border-default)", borderLeft: "none" }}
                    >
                      <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
                        {featured.tag}
                      </span>
                      <h2
                        className="mt-3"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "24px",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.2,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {featured.title}
                      </h2>
                      <p
                        className="text-body mt-4"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {featured.desc}
                      </p>
                      <span className="text-caption mt-6" style={{ color: "var(--color-text-tertiary)" }}>
                        {featured.readTime} read
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Stories grid */}
              {grid.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {grid.map((story) => (
                    <Link key={story.id} href="#" className="group block">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      <div
                        className="mt-4 pb-4"
                        style={{ borderBottom: "1px solid var(--color-border-default)" }}
                      >
                        <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
                          {story.tag} · {story.readTime}
                        </span>
                        <h3
                          className="mt-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "15px",
                            fontWeight: 500,
                            lineHeight: 1.3,
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {story.title}
                        </h3>
                        <p
                          className="text-caption mt-2 line-clamp-2"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {story.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div style={{ padding: "96px 0", textAlign: "center" }}>
                  <p className="text-heading" style={{ color: "var(--color-text-tertiary)" }}>
                    No stories yet
                  </p>
                  <p className="text-caption mt-2" style={{ color: "var(--color-text-tertiary)" }}>
                    Check back soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Festivo */}
        <div style={{ borderTop: "1px solid var(--color-border-default)" }}>
          <div className="max-w-[1100px] mx-auto px-8 py-16">
            <div className="max-w-[480px] mx-auto text-center">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "24px",
                  fontWeight: 400,
                  color: "var(--color-text-primary)",
                }}
              >
                Festivo
              </span>
              <p className="text-body mt-4" style={{ color: "var(--color-text-secondary)" }}>
                Designed and developed entirely with AI tools — from planning to deployment.
                A showcase of what&apos;s possible when creativity meets Claude Code.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {["Claude Code", "Next.js 15", "Framer Motion", "Tailwind CSS v4", "Vercel"].map((tech) => (
                  <span
                    key={tech}
                    className="text-caption"
                    style={{
                      padding: "4px 12px",
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
