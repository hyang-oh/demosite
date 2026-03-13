import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals, getEditorsPick, getFeaturedFestivals } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";

const travelStyles = [
  { label: "Adventure" },
  { label: "Cultural" },
  { label: "Food & Drink" },
  { label: "Wildlife" },
  { label: "Family" },
  { label: "Photography" },
];

const destinations = [
  { name: "Japan", count: "3 festivals", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
  { name: "South Korea", count: "2 festivals", image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80" },
  { name: "India", count: "2 festivals", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" },
  { name: "Brazil", count: "1 festival", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80" },
  { name: "Spain", count: "1 festival", image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80" },
  { name: "Thailand", count: "1 festival", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80" },
  { name: "Mexico", count: "1 festival", image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80" },
  { name: "Germany", count: "1 festival", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80" },
];

export default function HomePage() {
  const editorsPick = getEditorsPick().slice(0, 6);
  const featured = getFeaturedFestivals().slice(0, 4);
  const thisSeason = festivals
    .filter((f) => ["March", "April", "March–April"].includes(f.month))
    .slice(0, 6);

  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="relative w-full overflow-hidden" style={{ height: "80svh", maxHeight: "720px", minHeight: "480px" }}>
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85"
          alt="Golden hour landscape travel"
          fill className="object-cover" priority sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)" }}
        />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                2,400+ festivals · 120 countries
              </span>
              <h1
                className="text-white font-semibold mt-4 leading-none"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                }}
              >
                Discover the world<br />through celebration.
              </h1>
              <p
                className="text-white/70 mt-6 text-lg max-w-xl leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 300 }}
              >
                Curated festivals for every kind of traveler — from Rio&apos;s carnival streets to Japan&apos;s cherry blossom parks.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    background: "#ffffff",
                    color: "#1a1a1a",
                    letterSpacing: "0.02em",
                  }}
                >
                  Explore festivals
                </Link>
                <button
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border border-white/40 text-white hover:bg-white/10 transition-all"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.02em" }}
                >
                  How it works
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 flex items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Scroll</span>
          <div className="w-8 h-px bg-white/60" />
        </div>
      </section>

      {/* TRAVEL STYLE TABS */}
      <section className="py-4 border-b" style={{ borderColor: "#e5e2da", background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="scroll-x">
            <div className="flex gap-0 border-l" style={{ width: "max-content", borderColor: "#e5e2da" }}>
              {travelStyles.map((style) => (
                <Link
                  key={style.label}
                  href={`/explore?style=${style.label}`}
                  className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:text-blue-500 border-r whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    borderColor: "#e5e2da",
                    color: "#6e6e6e",
                  }}
                >
                  {style.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-16 lg:py-24" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Where to next
              </span>
              <h2
                className="text-4xl lg:text-5xl font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
              >
                Popular Destinations
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b transition-colors hover:text-blue-500"
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              View all →
            </Link>
          </div>

          {/* Large grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "#e5e2da" }}>
            {destinations.slice(0, 4).map((dest) => (
              <Link
                key={dest.name}
                href={`/explore?country=${dest.name}`}
                className="group relative img-zoom"
                style={{ aspectRatio: "3/4", background: "#ffffff" }}
              >
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 gradient-bottom opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white font-semibold text-xl"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
                  >
                    {dest.name}
                  </h3>
                  <p
                    className="text-white/50 text-xs mt-0.5"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em" }}
                  >
                    {dest.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Small grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-px" style={{ background: "#e5e2da" }}>
            {destinations.slice(4).map((dest) => (
              <Link
                key={dest.name}
                href={`/explore?country=${dest.name}`}
                className="group relative img-zoom"
                style={{ aspectRatio: "4/3", background: "#ffffff" }}
              >
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 gradient-bottom opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3
                    className="text-white font-semibold text-base"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
                  >
                    {dest.name}
                  </h3>
                  <p
                    className="text-white/50 text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em" }}
                  >
                    {dest.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITOR'S PICK */}
      <section className="py-16 lg:py-24 border-t" style={{ background: "#ffffff", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Handpicked for you
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
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3"><FestivalCard festival={editorsPick[0]} variant="featured" index={0} /></div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <FestivalCard festival={editorsPick[1]} variant="featured" index={1} />
              <FestivalCard festival={editorsPick[2]} variant="featured" index={2} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {editorsPick.slice(3, 6).map((f, i) => (
              <FestivalCard key={f.id} festival={f} variant="standard" index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* THIS SEASON */}
      <section className="py-16 border-t" style={{ background: "#ffffff", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-8 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <span className="rule-line" />
            <span
              className="text-xs font-semibold uppercase tracking-widest block mb-2"
              style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Spring · March–April
            </span>
            <h2
              className="text-4xl font-semibold"
              style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
            >
              This Season
            </h2>
          </div>
          <div className="scroll-x -mx-6 px-6 lg:-mx-10 lg:px-10">
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {thisSeason.map((f, i) => (
                <div key={f.id} style={{ width: "260px", flexShrink: 0 }}>
                  <FestivalCard festival={f} variant="standard" index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-16 lg:py-24 border-t" style={{ background: "#ffffff", borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: "#e5e2da" }}>
            <div>
              <span className="rule-line" />
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-2"
                style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Around the world
              </span>
              <h2
                className="text-4xl lg:text-5xl font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
              >
                Trending Now
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b transition-colors hover:text-blue-500"
              style={{ color: "#1a1a1a", borderColor: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#e5e2da" }}>
            {featured.map((f) => (
              <Link
                key={f.id}
                href={`/festival/${f.id}`}
                className="group relative img-zoom"
                style={{ aspectRatio: "16/7", background: "#ffffff" }}
              >
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 gradient-full" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {f.category}
                  </span>
                  <h3
                    className="text-white font-semibold text-xl mt-2"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="text-white/50 text-sm mt-0.5"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {f.city} · {f.month}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t" style={{ background: "#111111", borderColor: "#2e2e2e" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Never miss a festival
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
            style={{ color: "#6e6e6e", fontWeight: 300, fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Get personalized festival recommendations delivered to your inbox every month.
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
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            />
            <button
              className="px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: "#4344FD",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            style={{ color: "#9e9e9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            © 2026 Festivo. Discover the world through celebration.
          </p>
          <p
            className="text-xs font-medium"
            style={{ color: "#4344FD", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Made with Claude Code ✦
          </p>
        </div>
      </footer>
    </>
  );
}
