import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals, getEditorsPick } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";

/* ── Destination data by country ── */
const destinations = [
  { name: "Japan", continent: "Asia", count: 3, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
  { name: "South Korea", continent: "Asia", count: 5, image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80" },
  { name: "India", continent: "Asia", count: 2, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" },
  { name: "Thailand", continent: "Asia", count: 1, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80" },
  { name: "United Kingdom", continent: "Europe", count: 3, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { name: "Germany", continent: "Europe", count: 1, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80" },
  { name: "Spain", continent: "Europe", count: 1, image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80" },
  { name: "Brazil", continent: "Americas", count: 1, image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80" },
  { name: "United States", continent: "Americas", count: 2, image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80" },
  { name: "Mexico", continent: "Americas", count: 1, image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80" },
];

export default function HomePage() {
  const editorsPick = getEditorsPick().slice(0, 4);
  const currentMonthFestivals = festivals
    .filter((f) => ["March", "April", "March–April"].includes(f.month))
    .slice(0, 6);

  return (
    <>
      <Navigation />

      {/* ═══ 1. HERO — §5 ═══ */}
      <section style={{ background: "var(--color-bg-base)", paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="max-w-[1100px] mx-auto px-8">
          <p
            className="text-label"
            style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}
          >
            Discover festivals worldwide
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 6vw, 72px)",
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
            }}
          >
            전 세계 축제를 테마, 지역, 시즌별로 탐색하세요.
          </p>
          <div className="flex gap-2" style={{ marginTop: "48px" }}>
            {[
              { label: "테마별", href: "/explore" },
              { label: "나라별", href: "/explore" },
              { label: "이달의 축제", href: "/calendar" },
            ].map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  padding: "8px 20px",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "9999px",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                className="hover:text-[--color-text-primary] hover:border-[--color-border-strong]"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. EDITOR'S PICK — §4 header pattern ═══ */}
      <section className="section" style={{ background: "var(--color-bg-elevated)" }}>
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="section-header">
            <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
              에디터가 직접 고른
            </p>
            <h2 className="text-heading">Editor&apos;s Pick</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div><FestivalCard festival={editorsPick[0]} variant="featured" index={0} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {editorsPick.slice(1, 4).map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="standard" index={i + 1} />
              ))}
              <Link
                href="/explore"
                className="card flex items-center justify-center"
                style={{ minHeight: "120px" }}
              >
                <span
                  className="text-caption"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  전체 보기 →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. POPULAR DESTINATIONS ═══ */}
      <section
        className="section"
        style={{
          background: "var(--color-bg-elevated)",
          borderTop: "1px solid var(--color-border-default)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="section-header">
            <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
              나라별 탐색
            </p>
            <h2 className="text-heading">Popular Destinations</h2>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-px"
            style={{ background: "var(--color-border-default)" }}
          >
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/explore?country=${dest.name}`}
                className="group relative img-zoom"
                style={{ aspectRatio: "3/4", background: "var(--color-bg-elevated)" }}
              >
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 gradient-bottom opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "#ffffff",
                      lineHeight: 1.2,
                    }}
                  >
                    {dest.name}
                  </h3>
                  <p className="text-caption" style={{ color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                    {dest.count}개 축제
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. THIS MONTH ═══ */}
      <section
        className="section"
        style={{
          background: "var(--color-bg-elevated)",
          borderTop: "1px solid var(--color-border-default)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="section-header">
            <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
              봄 · 3~4월
            </p>
            <h2 className="text-heading">This Month</h2>
          </div>
          <div className="scroll-x -mx-8 px-8">
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {currentMonthFestivals.map((f, i) => (
                <div key={f.id} style={{ width: "280px", flexShrink: 0 }}>
                  <FestivalCard festival={f} variant="standard" index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. FOOTER ═══ */}
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
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--color-text-primary)",
            }}
          >
            Festivo
          </span>
          <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
            © 2026 Festivo. 축제로 세계를 발견하다.
          </p>
        </div>
      </footer>
    </>
  );
}
