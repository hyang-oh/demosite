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

  const dmSans = "var(--font-dm-sans), 'DM Sans', sans-serif";
  const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

  return (
    <>
      <Navigation />
      <main className="pt-14 min-h-screen" style={{ background: "#fdfcf3" }}>
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
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 pb-10 max-w-5xl mx-auto">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#25aae1", fontFamily: dmSans }}
            >
              {festival.category}
            </span>
            <h1
              className="text-4xl lg:text-6xl font-semibold text-white mt-2"
              style={{ fontFamily: cormorant, fontStyle: "italic", lineHeight: 1.05 }}
            >
              {festival.name}
            </h1>
            {festival.nameKo && (
              <p className="text-white/50 text-base mt-1" style={{ fontFamily: cormorant }}>{festival.nameKo}</p>
            )}
            <p className="text-white/60 mt-2 text-sm" style={{ fontFamily: dmSans }}>
              {festival.city}, {festival.country} &nbsp;·&nbsp; {festival.month}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Stats row */}
              <div
                className="flex gap-0 mb-10 border"
                style={{ borderColor: "#e5e2da" }}
              >
                <div className="flex-1 text-center py-5 border-r" style={{ borderColor: "#e5e2da" }}>
                  <div
                    className="text-2xl font-semibold"
                    style={{ fontFamily: cormorant, color: "#1a1a1a" }}
                  >
                    ★ {festival.rating}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9e9e9e", fontFamily: dmSans, letterSpacing: "0.08em" }}>RATING</div>
                </div>
                <div className="w-px" style={{ background: "#e5e2da" }} />
                <div className="flex-1 text-center py-5 border-r" style={{ borderColor: "#e5e2da" }}>
                  <div className="text-2xl font-semibold" style={{ fontFamily: cormorant, color: "#1a1a1a" }}>
                    {festival.reviewCount.toLocaleString()}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9e9e9e", fontFamily: dmSans, letterSpacing: "0.08em" }}>REVIEWS</div>
                </div>
                <div className="flex-1 text-center py-5">
                  <div className="text-2xl font-semibold" style={{ fontFamily: cormorant, color: "#1a1a1a" }}>
                    {festival.duration}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9e9e9e", fontFamily: dmSans, letterSpacing: "0.08em" }}>DURATION</div>
                </div>
              </div>

              {/* Description */}
              <h2
                className="text-xl font-semibold mb-4"
                style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
              >
                About this festival
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#6e6e6e", fontFamily: dmSans, fontWeight: 300 }}>
                {festival.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {festival.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>

              {/* Perfect for */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#e5e2da" }}>
                <h3
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#9e9e9e", fontFamily: dmSans }}
                >
                  Perfect for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {festival.mood.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 text-sm font-medium border"
                      style={{ borderColor: "#e5e2da", color: "#1a1a1a", fontFamily: dmSans }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#e5e2da" }}>
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
                >
                  Traveler Reviews
                </h2>
                <div className="space-y-0">
                  {festival.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="py-5 border-b"
                      style={{ borderColor: "#e5e2da" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.avatar} alt={r.author} className="w-8 h-8 object-cover" />
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#1a1a1a", fontFamily: dmSans }}>{r.author}</p>
                          <p className="text-xs" style={{ color: "#9e9e9e", fontFamily: dmSans }}>{r.date}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <span key={j} className="text-xs" style={{ color: j < r.rating ? "#25aae1" : "#e5e2da" }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#6e6e6e", fontFamily: dmSans, fontWeight: 300 }}>
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="border sticky top-18 p-6"
                style={{ background: "#ffffff", borderColor: "#e5e2da", top: "80px" }}
              >
                <h3
                  className="text-base font-semibold mb-5"
                  style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
                >
                  Plan your visit
                </h3>
                <div className="space-y-3 text-sm border-b pb-5 mb-5" style={{ borderColor: "#e5e2da" }}>
                  {[
                    { label: "When", value: festival.month },
                    { label: "Duration", value: festival.duration },
                    { label: "Location", value: festival.city },
                    { label: "Country", value: festival.country },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ color: "#9e9e9e", fontFamily: dmSans }}>{label}</span>
                      <span className="font-medium text-right" style={{ color: "#1a1a1a", fontFamily: dmSans }}>{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ background: "#1a1a1a", color: "#fdfcf3", fontFamily: dmSans }}
                >
                  Save to Wishlist
                </button>
                <button
                  className="w-full mt-2 py-3 text-sm font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#e5e2da", color: "#6e6e6e", fontFamily: dmSans }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-12">
          <Link
            href="/explore"
            className="text-sm font-medium flex items-center gap-2 transition-colors"
            style={{ color: "#25aae1", fontFamily: dmSans }}
          >
            ← Back to Explore
          </Link>
        </div>
      </main>
    </>
  );
}
