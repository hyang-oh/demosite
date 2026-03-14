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
  { name: "Thailand", count: 2, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80" },
  { name: "Italy", count: 1, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80" },
  { name: "Belgium", count: 1, image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=600&q=80" },
  { name: "Australia", count: 1, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80" },
  { name: "United States", count: 3, image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80" },
  { name: "South Africa", count: 1, image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
  { name: "China", count: 1, image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80" },
];

export default function HomePage() {
  const editorsPick = getEditorsPick();
  const springFestivals = festivals
    .filter((f) => ["March", "April", "March–April"].includes(f.month))
    .slice(0, 6);
  const cultureFestivals = festivals
    .filter((f) => f.category === "Culture")
    .slice(0, 6);

  return (
    <>
      <Navigation />

      {/* ═══ HERO ═══ */}
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

      {/* ═══ EDITOR'S PICK — horizontal scroll ═══ */}
      <section style={{ background: "var(--color-bg-elevated)", paddingBottom: "64px" }}>
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="flex items-end justify-between" style={{ marginBottom: "24px" }}>
            <div>
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                Editor&apos;s Pick
              </p>
              <h2 className="text-heading">Festivals Worth Traveling For</h2>
            </div>
            <Link
              href="/explore"
              className="text-label hidden sm:block"
              style={{ color: "var(--color-text-secondary)" }}
            >
              View all →
            </Link>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto pl-8">
          <div
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {editorsPick.map((f, i) => (
              <div
                key={f.id}
                style={{ width: "320px", flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <FestivalCard festival={f} variant="standard" index={i} />
              </div>
            ))}
            <div style={{ width: "32px", flexShrink: 0 }} />
          </div>
        </div>
      </section>

      {/* ═══ POPULAR DESTINATIONS — horizontal scroll ═══ */}
      <section
        style={{
          background: "var(--color-bg-elevated)",
          paddingBottom: "64px",
          borderTop: "1px solid var(--color-border-default)",
          paddingTop: "48px",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="flex items-end justify-between" style={{ marginBottom: "24px" }}>
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
        </div>
        <div className="max-w-[1100px] mx-auto pl-8">
          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/explore?country=${dest.name}`}
                className="group relative overflow-hidden flex-shrink-0"
                style={{ width: "200px", aspectRatio: "3/4", scrollSnapAlign: "start" }}
              >
                <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" />
                <div className="absolute inset-0 gradient-bottom opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
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
            <div style={{ width: "32px", flexShrink: 0 }} />
          </div>
        </div>
      </section>

      {/* ═══ SPRING FESTIVALS — horizontal scroll ═══ */}
      <section
        style={{
          background: "var(--color-bg-elevated)",
          paddingBottom: "64px",
          borderTop: "1px solid var(--color-border-default)",
          paddingTop: "48px",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="flex items-end justify-between" style={{ marginBottom: "24px" }}>
            <div>
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                This Season
              </p>
              <h2 className="text-heading">Spring Festivals</h2>
            </div>
            <Link
              href="/calendar"
              className="text-label hidden sm:block"
              style={{ color: "var(--color-text-secondary)" }}
            >
              View calendar →
            </Link>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto pl-8">
          <div
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {springFestivals.map((f, i) => (
              <div
                key={f.id}
                style={{ width: "320px", flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <FestivalCard festival={f} variant="standard" index={i} />
              </div>
            ))}
            <div style={{ width: "32px", flexShrink: 0 }} />
          </div>
        </div>
      </section>

      {/* ═══ CULTURAL — horizontal scroll ═══ */}
      <section
        style={{
          background: "var(--color-bg-elevated)",
          paddingBottom: "64px",
          borderTop: "1px solid var(--color-border-default)",
          paddingTop: "48px",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="flex items-end justify-between" style={{ marginBottom: "24px" }}>
            <div>
              <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
                By Theme
              </p>
              <h2 className="text-heading">Cultural Immersion</h2>
            </div>
            <Link
              href="/explore"
              className="text-label hidden sm:block"
              style={{ color: "var(--color-text-secondary)" }}
            >
              See all →
            </Link>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto pl-8">
          <div
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {cultureFestivals.map((f, i) => (
              <div
                key={f.id}
                style={{ width: "320px", flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <FestivalCard festival={f} variant="standard" index={i} />
              </div>
            ))}
            <div style={{ width: "32px", flexShrink: 0 }} />
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
