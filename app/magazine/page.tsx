import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

const pretendard = "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const stories = [
  {
    id: "1",
    title: "축제 여행의 기술",
    desc: "축제 여행을 완벽하게 준비하는 법. 현지인처럼 즐기는 팁부터 짐 싸기까지.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    tag: "여행 가이드",
    readTime: "5분",
  },
  {
    id: "2",
    title: "2026년 놓칠 수 없는 축제 10선",
    desc: "올해 놓치면 안 되는 전 세계 축제 10선. 에디터가 직접 엄선했습니다.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    tag: "에디터 추천",
    readTime: "8분",
  },
  {
    id: "3",
    title: "벚꽃 시즌: 포토 에세이",
    desc: "일본의 벚꽃 시즌을 렌즈에 담았습니다. 도쿄에서 교토까지.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    tag: "포토 에세이",
    readTime: "4분",
  },
  {
    id: "4",
    title: "홀리 축제가 바꿔놓은 나의 시선",
    desc: "인도 홀리 축제에서 느낀 것들. 색채의 향연 속에서 발견한 의미.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    tag: "개인 에세이",
    readTime: "6분",
  },
  {
    id: "5",
    title: "세계 축제 음식 기행",
    desc: "축제에서만 맛볼 수 있는 특별한 음식들. 옥토버페스트 프레첼부터 태국 송크란 망고까지.",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    tag: "음식과 문화",
    readTime: "7분",
  },
  {
    id: "6",
    title: "혼자 떠나는 축제 여행 가이드",
    desc: "혼자서도 충분히 즐길 수 있는 축제 여행. 안전하고 풍성한 솔로 트래블 가이드.",
    image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&q=80",
    tag: "여행 가이드",
    readTime: "5분",
  },
];

export default function MagazinePage() {
  const featured = stories[0];
  const grid = stories.slice(1);

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ background: "#ffffff", paddingTop: "90px" }}>
        {/* Header */}
        <div className="py-12 lg:py-16 border-b" style={{ borderColor: "#e5e2da" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <span className="rule-line" />
            <span
              className="text-xs font-semibold uppercase tracking-widest block mb-2"
              style={{ color: "#4344FD", fontFamily: pretendard }}
            >
              에디토리얼
            </span>
            <h1
              className="text-4xl lg:text-6xl font-semibold"
              style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
            >
              매거진
            </h1>
            <p className="mt-3 text-base" style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}>
              축제와 여행에 대한 이야기, 가이드, 포토 에세이.
            </p>
          </div>
        </div>

        {/* Featured story */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <Link href="#" className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden img-zoom" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className="flex flex-col justify-center p-8 lg:p-12 border border-l-0"
                style={{ borderColor: "#e5e2da" }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#4344FD", fontFamily: pretendard }}
                >
                  {featured.tag}
                </span>
                <h2
                  className="text-3xl lg:text-4xl font-semibold mt-3 group-hover:text-blue-500 transition-colors"
                  style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic", lineHeight: 1.1 }}
                >
                  {featured.title}
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}
                >
                  {featured.desc}
                </p>
                <span
                  className="mt-6 text-xs font-medium"
                  style={{ color: "#9e9e9e", fontFamily: pretendard }}
                >
                  {featured.readTime} 읽기
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stories grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {grid.map((story) => (
              <Link key={story.id} href="#" className="group block">
                <div className="relative overflow-hidden img-zoom" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 pb-4 border-b" style={{ borderColor: "#e5e2da" }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: "#4344FD", fontFamily: pretendard }}
                    >
                      {story.tag}
                    </span>
                    <span className="text-xs" style={{ color: "#c4c4c4" }}>·</span>
                    <span className="text-xs" style={{ color: "#9e9e9e", fontFamily: pretendard }}>
                      {story.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold mt-2 group-hover:text-blue-500 transition-colors"
                    style={{ fontFamily: cormorant, color: "#1a1a1a", lineHeight: 1.2 }}
                  >
                    {story.title}
                  </h3>
                  <p
                    className="text-sm mt-2 line-clamp-2"
                    style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}
                  >
                    {story.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* About Festivo */}
        <div className="border-t" style={{ borderColor: "#e5e2da" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <span
                className="text-3xl font-semibold"
                style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
              >
                Festivo
              </span>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}
              >
                Festivo는 기획부터 배포까지 AI 도구만으로 디자인하고 개발했습니다.
                창의성과 Claude Code가 만나면 무엇이 가능한지 보여주는 쇼케이스입니다.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {["Claude Code", "Next.js 15", "Framer Motion", "Tailwind CSS v4", "Vercel"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium border"
                    style={{ borderColor: "#e5e2da", color: "#6e6e6e", fontFamily: pretendard }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
