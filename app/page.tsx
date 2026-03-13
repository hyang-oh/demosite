import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import { festivals, getEditorsPick, getFeaturedFestivals } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";

const travelStyles = [
  { label: "Adventure", icon: "🧭" },
  { label: "Cultural", icon: "🏛" },
  { label: "Food & Drink", icon: "🍜" },
  { label: "Wildlife", icon: "🌿" },
  { label: "Family", icon: "🎡" },
  { label: "Photography", icon: "📷" },
];

const destinations = [
  { name: "Japan", count: "3 festivals", color: "#ffc828", image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80" },
  { name: "South Korea", count: "2 festivals", color: "#0a6e50", image: "https://images.unsplash.com/photo-1567591370428-3e9e0def2e84?w=600&q=80" },
  { name: "India", count: "2 festivals", color: "#ff9155", image: "https://images.unsplash.com/photo-1605278407197-a9e00b9ed6d9?w=600&q=80" },
  { name: "Brazil", count: "1 festival", color: "#50b464", image: "https://images.unsplash.com/photo-1564419320408-38e88b48956e?w=600&q=80" },
  { name: "Spain", count: "1 festival", color: "#E8311A", image: "https://images.unsplash.com/photo-1513614835788-548945c0af4e?w=600&q=80" },
  { name: "Thailand", count: "1 festival", color: "#4178ff", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80" },
  { name: "Mexico", count: "1 festival", color: "#db2777", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80" },
  { name: "Germany", count: "1 festival", color: "#ffc828", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80" },
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
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "600px" }}>
        <Image
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=85"
          alt="Festival crowd"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)" }} />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-5">
            2,400+ festivals · 120 countries
          </span>
          <h1
            className="text-white font-extrabold leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
          >
            Discover the world<br />through celebration.
          </h1>
          <p className="text-white/75 mt-6 text-lg font-light max-w-xl leading-relaxed">
            Curated festivals for every kind of traveler — from Rio&apos;s carnival streets to Japan&apos;s cherry blossom parks.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ background: "#E8311A" }}
            >
              Explore festivals →
            </Link>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm border border-white/40 hover:bg-white/10 transition-all">
              How it works
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 bg-white/40" />
        </div>
      </section>

      {/* TRAVEL STYLE TABS */}
      <section className="py-5 border-b" style={{ borderColor: "#E8E4DF", background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="scroll-x">
            <div className="flex gap-2" style={{ width: "max-content" }}>
              {travelStyles.map((style) => (
                <Link
                  key={style.label}
                  href={`/explore?style=${style.label}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 hover:border-red-400 hover:text-red-600"
                  style={{ borderColor: "#E8E4DF", color: "#444444" }}
                >
                  <span>{style.icon}</span>
                  {style.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-16 lg:py-24" style={{ background: "#F6F4F0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#E8311A" }}>Where to next</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-1" style={{ color: "#222222", letterSpacing: "-0.03em" }}>Popular Destinations</h2>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-sm font-semibold pb-0.5 border-b" style={{ color: "#E8311A", borderColor: "#E8311A" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.slice(0, 4).map((dest) => (
              <Link key={dest.name} href={`/explore?country=${dest.name}`} className="group relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "3/4" }}>
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="w-2 h-2 rounded-full mb-2" style={{ background: dest.color }} />
                  <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{dest.count}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {destinations.slice(4).map((dest) => (
              <Link key={dest.name} href={`/explore?country=${dest.name}`} className="group relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "4/3" }}>
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="w-2 h-2 rounded-full mb-1" style={{ background: dest.color }} />
                  <h3 className="text-white font-bold">{dest.name}</h3>
                  <p className="text-white/60 text-xs">{dest.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITOR'S PICK */}
      <section className="py-16 lg:py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#E8311A" }}>Handpicked for you</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-1" style={{ color: "#222222", letterSpacing: "-0.03em" }}>Editor&apos;s Pick</h2>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-sm font-semibold pb-0.5 border-b" style={{ color: "#E8311A", borderColor: "#E8311A" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3"><FestivalCard festival={editorsPick[0]} variant="featured" index={0} /></div>
            <div className="lg:col-span-2 flex flex-col gap-5">
              <FestivalCard festival={editorsPick[1]} variant="featured" index={1} />
              <FestivalCard festival={editorsPick[2]} variant="featured" index={2} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {editorsPick.slice(3, 6).map((f, i) => (
              <FestivalCard key={f.id} festival={f} variant="standard" index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* THIS SEASON */}
      <section className="py-16" style={{ background: "#F6F4F0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#E8311A" }}>Spring · March–April</span>
            <h2 className="text-3xl font-extrabold mt-1" style={{ color: "#222222", letterSpacing: "-0.03em" }}>This Season</h2>
          </div>
          <div className="scroll-x -mx-6 px-6 lg:-mx-10 lg:px-10">
            <div className="flex gap-5" style={{ width: "max-content" }}>
              {thisSeason.map((f, i) => (
                <div key={f.id} style={{ width: "280px", flexShrink: 0 }}>
                  <FestivalCard festival={f} variant="standard" index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-16 lg:py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#E8311A" }}>Around the world</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-1" style={{ color: "#222222", letterSpacing: "-0.03em" }}>Trending Now</h2>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-sm font-semibold pb-0.5 border-b" style={{ color: "#E8311A", borderColor: "#E8311A" }}>
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((f) => (
              <Link key={f.id} href={`/festival/${f.id}`} className="group relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "16/7" }}>
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 gradient-full" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="badge">{f.category}</span>
                  <h3 className="text-white font-bold text-xl mt-2">{f.name}</h3>
                  <p className="text-white/60 text-sm mt-0.5">{f.city} · {f.month}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background: "#222222" }}>
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#E8311A" }}>Never miss a festival</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-white" style={{ letterSpacing: "-0.03em" }}>
            Your next celebration awaits.
          </h2>
          <p className="text-lg mb-8" style={{ color: "#999999", fontWeight: 300 }}>
            Get personalized festival recommendations delivered to your inbox every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none"
              style={{ background: "#2E2E2E", border: "1px solid #3A3A3A", color: "#FFFFFF" }}
            />
            <button
              className="px-6 py-3.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "#E8311A" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "#E8E4DF", background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#E8311A" }}>
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <span className="text-base font-bold" style={{ color: "#222222" }}>Festivo</span>
          </div>
          <p className="text-sm" style={{ color: "#999999" }}>© 2026 Festivo. Discover the world through celebration.</p>
          <p className="text-xs font-medium" style={{ color: "#E8311A" }}>Made with Claude Code ✦</p>
        </div>
      </footer>
    </>
  );
}
