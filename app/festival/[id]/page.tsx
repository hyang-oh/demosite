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
      <main className="min-h-screen" style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}>
        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: "50vh", maxHeight: "520px", minHeight: "360px" }}>
          <Image
            src={festival.heroImage}
            alt={festival.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-full" />
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 max-w-[1100px] mx-auto">
            <span className="text-label" style={{ color: "var(--color-text-on-dark-secondary)" }}>
              {festival.category}
            </span>
            <h1
              className="mt-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--color-text-on-dark)",
              }}
            >
              {festival.name}
            </h1>
            {festival.nameKo && (
              <p style={{ color: "var(--color-text-on-dark-tertiary)", fontFamily: "var(--font-serif)", fontSize: "16px", marginTop: "4px" }}>
                {festival.nameKo}
              </p>
            )}
            <p className="text-caption mt-2" style={{ color: "var(--color-text-on-dark-secondary)" }}>
              {festival.city}, {festival.country} · {festival.month}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1100px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Stats row */}
              <div
                className="flex gap-0 mb-10"
                style={{ border: "1px solid var(--color-border-default)" }}
              >
                {[
                  { value: `${festival.rating}`, label: "Rating" },
                  { value: festival.reviewCount.toLocaleString(), label: "Reviews" },
                  { value: festival.duration, label: "Duration" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex-1 text-center py-5"
                    style={{
                      borderRight: i < 2 ? "1px solid var(--color-border-default)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-caption mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "var(--color-text-primary)",
                  marginBottom: "16px",
                }}
              >
                About the Festival
              </h2>
              <p className="text-body" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                {festival.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {festival.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>

              {/* Perfect for */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--color-border-default)" }}>
                <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
                  Perfect for
                </p>
                <div className="flex flex-wrap gap-2">
                  {festival.mood.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 500,
                        padding: "6px 14px",
                        border: "1px solid var(--color-border-default)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--color-border-default)" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "var(--color-text-primary)",
                    marginBottom: "24px",
                  }}
                >
                  Traveler Reviews
                </h2>
                {festival.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="py-5"
                    style={{ borderBottom: "1px solid var(--color-border-default)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.avatar} alt={r.author} className="w-8 h-8 object-cover rounded-full" />
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {r.author}
                        </p>
                        <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>{r.date}</p>
                      </div>
                    </div>
                    <p className="text-body" style={{ color: "var(--color-text-secondary)" }}>
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="sticky"
                style={{
                  top: "80px",
                  padding: "24px",
                  border: "1px solid var(--color-border-default)",
                  background: "var(--color-bg-elevated)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "var(--color-text-primary)",
                    marginBottom: "20px",
                  }}
                >
                  Plan Your Visit
                </h3>
                <div
                  className="space-y-3 text-sm pb-5 mb-5"
                  style={{ borderBottom: "1px solid var(--color-border-default)" }}
                >
                  {[
                    { label: "When", value: festival.month },
                    { label: "Duration", value: festival.duration },
                    { label: "City", value: festival.city },
                    { label: "Country", value: festival.country },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>{label}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                          textAlign: "right",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--color-text-primary)",
                    color: "var(--color-bg-elevated)",
                    fontFamily: "var(--font-sans)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save to Wishlist
                </button>
                <button
                  className="w-full mt-2 py-3 text-sm font-medium transition-colors"
                  style={{
                    border: "1px solid var(--color-border-default)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-[1100px] mx-auto px-8 pb-12">
          <Link
            href="/explore"
            className="text-label"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ← Back to Explore
          </Link>
        </div>
      </main>
    </>
  );
}
