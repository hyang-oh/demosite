import Navigation from "@/components/Navigation";
import FestivalCard from "@/components/FestivalCard";
import HomeClient from "@/components/HomeClient";
import { festivals, getEditorsPick, getFeaturedFestivals, categories } from "@/lib/festivals";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedFestivals().slice(0, 4);
  const editorsPick = getEditorsPick().slice(0, 6);
  const hero = featured[0];
  const thisSeason = festivals
    .filter((f) => ["March", "April", "March\u2013April"].includes(f.month))
    .slice(0, 6);

  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "600px" }}>
        <Image
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=85"
          alt="Festival crowd at golden hour"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 gradient-full" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)" }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 lg:px-16 max-w-7xl mx-auto left-0 right-0">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge">Featured Festival</span>
              <span className="text-white/60 text-xs">· {hero?.country}</span>
            </div>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
              Discover the world<br /><em>through celebration.</em>
            </h1>
            <p className="text-white/80 mt-4 text-lg leading-relaxed max-w-xl">
              From Rio&apos;s carnival streets to Japan&apos;s cherry blossom parks — curated festivals for every kind of traveler.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity" style={{ background: "#C8741A" }}>
                Explore festivals →
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium border border-white/40 hover:bg-white/10 transition-all duration-200">
                Watch highlights ▶
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-white/40" />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 hidden lg:flex overflow-hidden rounded-tl-2xl" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)" }}>
          {[{ label: "Festivals", value: "2,400+" }, { label: "Countries", value: "120+" }, { label: "Curated", value: "by Experts" }].map((s, i) => (
            <div key={i} className="px-6 py-4 text-center" style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{s.value}</div>
              <div className="text-white/60 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="py-5 border-b" style={{ borderColor: "#E8E3DC", background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <HomeClient categories={categories} />
        </div>
      </section>

      {/* EDITOR'S PICK */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Handpicked for you</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Editor&apos;s Pick</h2>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b" style={{ color: "#C8741A", borderColor: "#C8741A" }}>View all</Link>
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
      <section className="py-16" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Spring · March–April</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>This Season</h2>
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

      {/* EXPLORE BY MOOD */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Find your vibe</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Explore by Mood</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { mood: "Energetic", emoji: "⚡", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=70" },
              { mood: "Romantic", emoji: "✨", image: "https://images.unsplash.com/photo-1513614835788-548945c0af4e?w=600&q=70" },
              { mood: "Spiritual", emoji: "🕯", image: "https://images.unsplash.com/photo-1605278407197-a9e00b9ed6d9?w=600&q=70" },
              { mood: "Family", emoji: "🎡", image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=70" },
              { mood: "Adventure", emoji: "🧭", image: "https://images.unsplash.com/photo-1564419320408-38e88b48956e?w=600&q=70" },
              { mood: "Chill", emoji: "🌙", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=70" },
            ].map((item) => (
              <Link key={item.mood} href={`/explore?mood=${item.mood}`} className="group relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "4/3" }}>
                <Image src={item.image} alt={`${item.mood} festivals`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                <div className="absolute inset-0 gradient-full" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5">
                  <span className="text-xl mb-1">{item.emoji}</span>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{item.mood}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DARK TRENDING */}
      <section className="py-16" style={{ background: "#1C1C1C" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Around the world</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-1 text-white" style={{ fontFamily: "var(--font-playfair)" }}>Trending Now</h2>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-sm font-medium pb-0.5 border-b" style={{ color: "#C8741A", borderColor: "#C8741A" }}>See all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.slice(0, 4).map((f) => (
              <Link key={f.id} href={`/festival/${f.id}`} className="group relative rounded-2xl overflow-hidden img-zoom" style={{ aspectRatio: "16/7" }}>
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 gradient-full" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="badge">{f.countryCode}</span>
                  <h3 className="text-white font-bold text-xl mt-2" style={{ fontFamily: "var(--font-playfair)" }}>{f.name}</h3>
                  <p className="text-white/60 text-sm mt-0.5">{f.city} · {f.month}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background: "#F7F4EF" }}>
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Never miss a festival</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>
            Your next celebration<br /><em>awaits.</em>
          </h2>
          <p className="text-lg mb-8" style={{ color: "#6B6B6B" }}>Get personalized festival recommendations delivered to your inbox every month.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3 rounded-full border text-sm outline-none" style={{ borderColor: "#E8E3DC", background: "#FFFFFF" }} />
            <button className="px-6 py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity" style={{ background: "#C8741A" }}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "#E8E3DC" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#C8741A" }}>
              <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-playfair)" }}>F</span>
            </div>
            <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Festivo</span>
          </div>
          <p className="text-sm" style={{ color: "#A8A8A8" }}>© 2026 Festivo. Discover the world through celebration.</p>
          <p className="text-xs" style={{ color: "#C8741A" }}>Made with Claude Code ✦</p>
        </div>
      </footer>
    </>
  );
}
