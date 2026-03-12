import Navigation from "@/components/Navigation";
import { festivals, getFestivalById } from "@/lib/festivals";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return festivals.map((f) => ({ id: f.id }));
}

export default async function FestivalPage({ params }: Params) {
  const { id } = await params;
  const festival = getFestivalById(id);
  if (!festival) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-0 min-h-screen" style={{ background: "#F7F4EF" }}>
        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: "400px" }}>
          <Image
            src={festival.heroImage}
            alt={festival.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-full" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge">{festival.category}</span>
              <span className="text-white/60 text-xs">· {festival.duration}</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              {festival.name}
            </h1>
            {festival.nameKo && (
              <p className="text-white/60 text-lg mt-1" style={{ fontFamily: "var(--font-playfair)" }}>{festival.nameKo}</p>
            )}
            <p className="text-white/70 mt-2 text-base">
              📍 {festival.city}, {festival.country} &nbsp;·&nbsp; 📅 {festival.month}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Stats row */}
              <div className="flex gap-4 flex-wrap mb-8 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#C8741A" }}>★ {festival.rating}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#A8A8A8" }}>Rating</div>
                </div>
                <div className="w-px" style={{ background: "#E8E3DC" }} />
                <div className="text-center px-4">
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>{festival.reviewCount.toLocaleString()}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#A8A8A8" }}>Reviews</div>
                </div>
                <div className="w-px" style={{ background: "#E8E3DC" }} />
                <div className="text-center px-4">
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>{festival.duration}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#A8A8A8" }}>Duration</div>
                </div>
              </div>

              {/* Description */}
              <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>About this festival</h2>
              <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>{festival.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {festival.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>

              {/* Mood */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#A8A8A8" }}>Perfect for</h3>
                <div className="flex flex-wrap gap-2">
                  {festival.mood.map((m) => (
                    <span key={m} className="px-3 py-1.5 rounded-full text-sm font-medium border" style={{ borderColor: "#E8E3DC", color: "#1C1C1C" }}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Traveler Reviews</h2>
                <div className="space-y-4">
                  {festival.reviews.map((r, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}>
                      <div className="flex items-center gap-3 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#1C1C1C" }}>{r.author}</p>
                          <p className="text-xs" style={{ color: "#A8A8A8" }}>{r.date}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <span key={j} className="text-xs" style={{ color: j < r.rating ? "#C8741A" : "#E8E3DC" }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl p-5 sticky top-20" style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}>
                <h3 className="text-base font-semibold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Plan your visit</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "#A8A8A8" }}>When</span>
                    <span className="font-medium" style={{ color: "#1C1C1C" }}>{festival.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#A8A8A8" }}>Duration</span>
                    <span className="font-medium" style={{ color: "#1C1C1C" }}>{festival.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#A8A8A8" }}>Location</span>
                    <span className="font-medium text-right" style={{ color: "#1C1C1C" }}>{festival.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#A8A8A8" }}>Country</span>
                    <span className="font-medium" style={{ color: "#1C1C1C" }}>{festival.country}</span>
                  </div>
                </div>
                <button
                  className="w-full mt-5 py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
                  style={{ background: "#C8741A" }}
                >
                  Save to Wishlist
                </button>
                <button
                  className="w-full mt-2 py-3 rounded-full font-medium text-sm border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "#E8E3DC", color: "#6B6B6B" }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <Link href="/explore" className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: "#C8741A" }}>
            ← Back to Explore
          </Link>
        </div>
      </main>
    </>
  );
}
