import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Festivo — 축제로 세계를 발견하다",
  description:
    "전 세계 축제를 큐레이션하고 여행을 계획하세요. 현지 전통부터 세계적인 축제까지, 잊을 수 없는 경험을 만나보세요.",
  keywords: "축제, 여행, 세계 축제, 문화 행사, 페스티벌, 음악 축제",
  openGraph: {
    title: "Festivo",
    description: "축제로 세계를 발견하다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cormorant.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
