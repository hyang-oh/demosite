import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals, getEditorsPick } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";

/* ── Curated data ── */
const destinations = [
  { name: "Japan", count: 3, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
  { name: "South Korea", count: 5, image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80" },
  { name: "India", count: 2, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" },
  { name: "United Kingdom", count: 3, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { name: "Germany", count: 1, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80" },
  { name: "Brazil", count: 1, image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80" },
];

export default function HomePage() {
  const editorsPick = getEditorsPick();
  const springFestivals = festivals
    .filter((f) => ["March", "April", "March–April"].includes(f.month))
    .slice(0, 4);
  const cultureFestivals = festivals
    .filter((f) => f.category === "Culture")
    .slice(0, 3);

  return (
    <>
      <Navigation />

      {/* ═══ HERO — minimal, editorial ═══ */}
      <section style={{ background: "var(--color-bg-elevated)", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-[1100px] mx-auto px-8">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(44px, 6vw, 72px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-text-primary)",
            }}
          >
            Discover the world<br />through celebration
          </h1>
          <p
            className="text-body"
            style={{
              color: "var(--color-text-secondary)",
              marginTop: "24px",
              maxWidth: "480px",
            }}
          >
            Festivals that move people — curated by theme, country, and season.
          </p>
        </div>
      </section>

      {/* ═══ EDITORIAL GRID — free-form, asymmetric ═══ */}
      <section style={{ background: "var(--color-bg-elevated)" }}>
        <div className="max-w-[1100px] mx-auto px-8">

          {/* ── Row 1: Lead feature (2/3) + text block (1/3) ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            style={{ paddingBottom: "64px" }}
          >
            {/* Large featured card */}
            <div className="lg:col-span-2">
              <FestivalCard festival={editorsPick[0]} variant="featured" index={0} />
            </div>
            {/* Editorial text + small card */}
            <div className="flex flex-col gap-6">
              <div
                style={{
                  padding: "32px 28px",
                  background: "var(--color-bg-sunken)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
                  Editor&apos;s Pick
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "24px",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Festivals worth traveling for
                </h2>
                <p
                  className="text-body"
                  style={{ color: "var(--color-text-secondary)", marginTop: "12px" }}
                >
                  Our editors handpick the most extraordinary celebrations happening around the globe.
                </p>
                <Link
                  href="/explore"
                  className="text-label mt-6 inline-block"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  View all picks →
                </Link>
              </div>
              <FestivalCard festival={editorsPick[1]} variant="standard" index={1} />
            </div>
          </div>

          {/* ── Row 2: 3 equal cards ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ paddingBottom: "64px" }}
          >
            {editorsPick.slice(2, 5).map((f, i) => (
              <FestivalCard key={f.id} festival={f} variant="standard" index={i + 2} />
            ))}
          </div>

          {/* ── Row 3: Destinations — horizontal image strip ── */}
          <div
            style={{
              paddingBottom: "64px",
              borderTop: "1px solid var(--color-border-default)",
              paddingTop: "48px",
            }}
          >
            <div className="flex items-end justify-between" style={{ marginBottom: "28px" }}>
              <div>
                <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                  By Country
                </p>
                <h2 className="text-heading">Popular Destinations</h2>
              </div>
              <Link
                href="/explore"
                className="text-label hidden sm:block"
                style={{ color: "var(--color-text-secondary)" }}
              >
                See all →
              </Link>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {destinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={`/explore?country=${dest.name}`}
                  className="group relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
                  <div className="absolute inset-0 gradient-bottom opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#ffffff",
                        lineHeight: 1.2,
                      }}
                    >
                      {dest.name}
                    </h3>
                    <p className="text-caption" style={{ color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                      {dest.count} festivals
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Row 4: Reversed asymmetric — small left + large right ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            style={{
              paddingBottom: "64px",
              borderTop: "1px solid var(--color-border-default)",
              paddingTop: "48px",
            }}
          >
            {/* Left column — stacked small items */}
            <div className="flex flex-col">
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                This Season
              </p>
              <h2 className="text-heading" style={{ marginBottom: "24px" }}>
                Spring Festivals
              </h2>
              {springFestivals.slice(0, 3).map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="horizontal" index={i} />
              ))}
              <Link
                href="/calendar"
                className="text-label mt-4 inline-block"
                style={{ color: "var(--color-text-secondary)" }}
              >
                View calendar →
              </Link>
            </div>
            {/* Right — large featured */}
            <div className="lg:col-span-2">
              {springFestivals[3] ? (
                <FestivalCard festival={springFestivals[3]} variant="featured" index={4} />
              ) : springFestivals[0] ? (
                <FestivalCard festival={springFestivals[0]} variant="featured" index={4} />
              ) : null}
            </div>
          </div>

          {/* ── Row 5: Culture highlight — 2 col asymmetric ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            style={{
              paddingBottom: "80px",
              borderTop: "1px solid var(--color-border-default)",
              paddingTop: "48px",
            }}
          >
            <div>
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                By Theme
              </p>
              <h2 className="text-heading" style={{ marginBottom: "24px" }}>
                Cultural Immersion
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cultureFestivals.slice(0, 2).map((f, i) => (
                  <FestivalCard key={f.id} festival={f} variant="standard" index={i + 6} />
                ))}
              </div>
            </div>
            <div>
              {cultureFestivals[2] && (
                <FestivalCard festival={cultureFestivals[2]} variant="featured" index={8} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          padding: "32px 0",
          borderTop: "1px solid var(--color-border-default)",
          background: "var(--color-bg-base)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Festivo
          </span>
          <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
            &copy; 2026 Festivo. Discover the world through celebration.
          </p>
        </div>
      </footer>
    </>
  );
}
