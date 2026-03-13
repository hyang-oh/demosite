import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Festivo — Discover the World Through Celebration",
  description:
    "Curated festival discovery for curious travelers. Find and plan your next unforgettable celebration, from local traditions to global spectacles.",
  keywords: "festivals, travel, world festivals, cultural events, celebrations, music festivals",
  openGraph: {
    title: "Festivo",
    description: "Discover the world through celebration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
