import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals, getEditorsPick } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";
import {
  Palette, Search, Heart, CalendarCheck, Plane,
  Globe, MapPin, Star, Users,
  Map, CalendarDays, BookOpen,
} from "lucide-react";

/* ── Quick Menu ── */
const quickMenu = [
  { label: "테마별", icon: Palette, href: "/explore", color: "#FFF4EC" },
  { label: "나라별", icon: Globe, href: "/explore", color: "#EEF0FF" },
  { label: "이달의 축제", icon: CalendarDays, href: "/calendar", color: "#ECFAEF" },
  { label: "지도 검색", icon: Map, href: "/map", color: "#ECF6FF" },
  { label: "캘린더", icon: CalendarCheck, href: "/calendar", color: "#FFF8EC" },
  { label: "매거진", icon: BookOpen, href: "/magazine", color: "#F9ECFF" },
];

/* ── Continent tabs for destination section ── */
const continentTabs = [
  { id: "all", label: "All" },
  { id: "Asia", label: "Asia" },
  { id: "Europe", label: "Europe" },
  { id: "Americas", label: "Americas" },
];

/* ── Stats + Steps combined ── */
const stats = [
  { icon: Globe, value: "120+", label: "Countries" },
  { icon: MapPin, value: "2,400+", label: "Festivals" },
  { icon: Star, value: "50K+", label: "Reviews" },
  { icon: Users, value: "180K+", label: "Travelers" },
];

const steps = [
  { step: "01", icon: Search, title: "Discover", desc: "테마, 지역, 시즌별로 축제를 탐색하세요" },
  { step: "02", icon: Heart, title: "Save", desc: "마음에 드는 축제를 저장하고 추천받으세요" },
  { step: "03", icon: CalendarCheck, title: "Plan", desc: "여행 팁과 리뷰로 준비하세요" },
  { step: "04", icon: Plane, title: "Go", desc: "세계에서 가장 특별한 축제를 경험하세요" },
];

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

      {/* ═══ 1. HERO ═══ */}
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
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
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

      {/* ═══ 2. QUICK MENU ═══ */}
      <section className="py-8 lg:py-10 border-b" style={{ borderColor: "#e5e2da", background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center gap-2.5 py-5 transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: item.color, borderRadius: "12px" }}
                >
                  <Icon size={24} strokeWidth={1.5} style={{ color: "#1a1a1a" }} />
                  <span
                    className="text-xs font-semibold tracking-wide"
                    style={{ color: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. EDITOR'S PICK ═══ */}
      <section className="py-16 lg:py-24" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
              >
                에디터가 직접 고른
              </span>
              <h2
                className="text-4xl lg:text-5xl font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
              >
                Editor&apos;s Pick
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b transition-colors hover:text-blue-500"
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div><FestivalCard festival={editorsPick[0]} variant="featured" index={0} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {editorsPick.slice(1, 4).map((f, i) => (
                <FestivalCard key={f.id} festival={f} variant="standard" index={i + 1} />
              ))}
              <Link
                href="/explore"
                className="flex items-center justify-center border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#e5e2da", fontFamily: "'Pretendard', sans-serif", minHeight: "120px" }}
              >
                <span className="text-sm font-medium" style={{ color: "#4344FD" }}>
                  전체 보기 →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. DESTINATIONS BY CONTINENT ═══ */}
      <section className="py-16 lg:py-24 border-t" style={{ background: "#ffffff", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
              >
                나라별 탐색
              </span>
              <h2
                className="text-4xl lg:text-5xl font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
              >
                Popular Destinations
              </h2>
            </div>
            <Link
              href="/map"
              className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b transition-colors hover:text-blue-500"
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}
            >
              지도로 보기 →
            </Link>
          </div>

          {/* Continent filter tabs */}
          <div className="flex gap-2 mb-8">
            {continentTabs.map((tab) => (
              <span
                key={tab.id}
                className="px-4 py-2 text-xs font-medium border cursor-default"
                style={{
                  background: tab.id === "all" ? "#1a1a1a" : "#ffffff",
                  color: tab.id === "all" ? "#ffffff" : "#6e6e6e",
                  borderColor: tab.id === "all" ? "#1a1a1a" : "#e5e2da",
                  fontFamily: "'Pretendard', sans-serif",
                }}
              >
                {tab.label}
              </span>
            ))}
          </div>

          {/* Country grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px" style={{ background: "#e5e2da" }}>
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/explore?country=${dest.name}`}
                className="group relative img-zoom"
                style={{ aspectRatio: "3/4", background: "#ffffff" }}
              >
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 gradient-bottom opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white font-semibold text-lg"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
                  >
                    {dest.name}
                  </h3>
                  <p
                    className="text-white/50 text-xs mt-0.5"
                    style={{ fontFamily: "'Pretendard', sans-serif" }}
                  >
                    {dest.count}개 축제
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. THIS MONTH ═══ */}
      <section className="py-16 border-t" style={{ background: "#ffffff", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
              >
                봄 · 3~4월
              </span>
              <h2
                className="text-4xl font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
              >
                This Month
              </h2>
            </div>
            <Link
              href="/calendar"
              className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b transition-colors hover:text-blue-500"
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}
            >
              캘린더 보기 →
            </Link>
          </div>
          <div className="scroll-x -mx-6 px-6 lg:-mx-10 lg:px-10">
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

      {/* ═══ 6. STATS + HOW IT WORKS (combined) ═══ */}
      <section className="py-16 lg:py-24 border-t" style={{ background: "#fafafa", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border mb-16" style={{ borderColor: "#e5e2da", background: "#ffffff" }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center py-8 text-center"
                  style={{ borderRight: i < 3 ? "1px solid #e5e2da" : "none" }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color: "#4344FD" }} className="mb-3" />
                  <span
                    className="text-3xl lg:text-4xl font-semibold"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#1a1a1a" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs mt-1 tracking-widest uppercase"
                    style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* How it works */}
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest block mb-2"
              style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
            >
              간단한 4단계
            </span>
            <h2
              className="text-4xl lg:text-5xl font-semibold"
              style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
            >
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center text-center px-6 py-10 border"
                  style={{ borderColor: "#e5e2da", background: "#ffffff" }}
                >
                  <span
                    className="text-xs font-semibold tracking-widest mb-5"
                    style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}
                  >
                    {item.step}
                  </span>
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-5"
                    style={{ background: "#f5f3eb", borderRadius: "50%" }}
                  >
                    <Icon size={24} strokeWidth={1.5} style={{ color: "#4344FD" }} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#1a1a1a", fontStyle: "italic" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6e6e6e", fontFamily: "'Pretendard', sans-serif", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                  {i < steps.length - 1 && (
                    <span
                      className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-lg z-10"
                      style={{ color: "#9e9e9e" }}
                    >
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA ═══ */}
      <section className="py-24 border-t" style={{ background: "#111111", borderColor: "#2e2e2e" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
          >
            축제를 놓치지 마세요
          </span>
          <h2
            className="text-4xl lg:text-6xl font-semibold mt-4 mb-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#f0ede4",
              fontStyle: "italic",
              lineHeight: 1.05,
            }}
          >
            Your next celebration awaits.
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: "#6e6e6e", fontWeight: 300, fontFamily: "'Pretendard', sans-serif" }}
          >
            매달 맞춤형 축제 추천을 이메일로 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border" style={{ borderColor: "#2e2e2e" }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 text-sm outline-none"
              style={{
                background: "#1c1c1c",
                border: "none",
                color: "#f0ede4",
                fontFamily: "'Pretendard', sans-serif",
              }}
            />
            <button
              className="px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: "#4344FD",
                color: "#ffffff",
                fontFamily: "'Pretendard', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              구독하기
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 8. FOOTER ═══ */}
      <footer className="py-8 border-t" style={{ borderColor: "#e5e2da", background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#1a1a1a",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            Festivo
          </span>
          <p
            className="text-sm"
            style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}
          >
            © 2026 Festivo. 축제로 세계를 발견하다.
          </p>
          <p
            className="text-xs font-medium"
            style={{ color: "#4344FD", fontFamily: "'Pretendard', sans-serif" }}
          >
            Made with Claude Code ✦
          </p>
        </div>
      </footer>
    </>
  );
}
