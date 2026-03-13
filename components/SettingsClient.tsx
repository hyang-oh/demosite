"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Language = "EN" | "KO" | "JA" | "ES";
type Theme = "light" | "dark" | "system";

const languages: { code: Language; label: string; native: string }[] = [
  { code: "EN", label: "English", native: "English" },
  { code: "KO", label: "Korean", native: "한국어" },
  { code: "JA", label: "Japanese", native: "日本語" },
  { code: "ES", label: "Spanish", native: "Español" },
];

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "라이트", icon: "☀" },
  { value: "dark", label: "다크", icon: "☾" },
  { value: "system", label: "시스템", icon: "⊙" },
];

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  desc?: string;
}

function Toggle({ checked, onChange, label, desc }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "#e5e2da" }}>
      <div>
        <p className="text-sm font-medium" style={{ color: "#1a1a1a", fontFamily: "'Pretendard', sans-serif" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "#9e9e9e", fontFamily: "'Pretendard', sans-serif" }}>{desc}</p>}
      </div>
      <button
        onClick={onChange}
        className="relative w-11 h-6 transition-colors duration-300 flex-shrink-0"
        style={{ background: checked ? "#1a1a1a" : "#e5e2da" }}
        aria-checked={checked}
        role="switch"
      >
        <span
          className="absolute top-1 w-4 h-4 bg-white transition-transform duration-300"
          style={{ transform: checked ? "translateX(23px)" : "translateX(4px)" }}
        />
      </button>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" as const },
  }),
};

export default function SettingsClient() {
  const [language, setLanguage] = useState<Language>("EN");
  const [theme, setTheme] = useState<Theme>("light");
  const [notifications, setNotifications] = useState({
    newFestivals: true,
    reminders: true,
    newsletter: false,
    updates: true,
  });

  const pretendard = "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
  const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

  return (
    <main className="min-h-screen" style={{ background: "#ffffff", paddingTop: "90px" }}>
      {/* Header */}
      <div
        className="py-12 lg:py-16 border-b"
        style={{ background: "#ffffff", borderColor: "#e5e2da" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <span className="rule-line" />
          <span
            className="text-xs font-semibold uppercase tracking-widest block mb-2"
            style={{ color: "#4344FD", fontFamily: pretendard }}
          >
            환경설정
          </span>
          <h1
            className="text-4xl lg:text-5xl font-semibold"
            style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
          >
            Settings
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#6e6e6e", fontFamily: pretendard }}>
            나만의 Festivo 환경을 설정하세요.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-px">

        {/* Profile card */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 border-b"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 flex items-center justify-center text-white text-lg font-semibold"
              style={{ background: "#1a1a1a", fontFamily: cormorant }}
            >
              H
            </div>
            <div>
              <p className="font-semibold" style={{ fontFamily: cormorant, color: "#1a1a1a", fontSize: "1.1rem" }}>Hyang Oh</p>
              <p className="text-sm" style={{ color: "#6e6e6e", fontFamily: pretendard }}>hyang@festivo.world</p>
              <span className="badge mt-1">Pro Member</span>
            </div>
            <button
              className="ml-auto text-xs font-medium px-4 py-1.5 border transition-colors"
              style={{ borderColor: "#e5e2da", color: "#6e6e6e", fontFamily: pretendard }}
            >
              편집
            </button>
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 border-b"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#9e9e9e", fontFamily: pretendard }}
          >
            언어
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="flex items-center justify-between px-4 py-3 border transition-all duration-200"
                style={{
                  borderColor: language === lang.code ? "#1a1a1a" : "#e5e2da",
                  background: language === lang.code ? "#1a1a1a" : "#ffffff",
                }}
              >
                <div className="text-left">
                  <p className="text-sm font-medium" style={{ color: language === lang.code ? "#ffffff" : "#1a1a1a", fontFamily: pretendard }}>{lang.native}</p>
                  <p className="text-xs" style={{ color: language === lang.code ? "#9e9e9e" : "#9e9e9e", fontFamily: pretendard }}>{lang.label}</p>
                </div>
                {language === lang.code && (
                  <span className="text-xs" style={{ color: "#4344FD" }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 border-b"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#9e9e9e", fontFamily: pretendard }}
          >
            외관
          </h2>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex-1 flex flex-col items-center gap-2 py-4 border transition-all duration-200"
                style={{
                  borderColor: theme === t.value ? "#1a1a1a" : "#e5e2da",
                  background: theme === t.value ? "#1a1a1a" : "#ffffff",
                  color: theme === t.value ? "#ffffff" : "#6e6e6e",
                }}
              >
                <span className="text-lg">{t.icon}</span>
                <span className="text-xs font-medium" style={{ fontFamily: pretendard }}>{t.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="px-6 pt-6 border-b"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#9e9e9e", fontFamily: pretendard }}
          >
            알림
          </h2>
          <Toggle
            checked={notifications.newFestivals}
            onChange={() => setNotifications((n) => ({ ...n, newFestivals: !n.newFestivals }))}
            label="새 축제"
            desc="관심 있는 새 축제가 등록되면 알려드려요"
          />
          <Toggle
            checked={notifications.reminders}
            onChange={() => setNotifications((n) => ({ ...n, reminders: !n.reminders }))}
            label="축제 리마인더"
            desc="저장한 축제 2주 전에 미리 알림을 보내드려요"
          />
          <Toggle
            checked={notifications.newsletter}
            onChange={() => setNotifications((n) => ({ ...n, newsletter: !n.newsletter }))}
            label="월간 뉴스레터"
            desc="매달 엄선된 축제 추천과 여행 이야기를 보내드려요"
          />
          <Toggle
            checked={notifications.updates}
            onChange={() => setNotifications((n) => ({ ...n, updates: !n.updates }))}
            label="앱 업데이트"
            desc="새로운 기능과 업데이트 소식을 알려드려요"
          />
        </motion.div>

        {/* Saved Festivals teaser */}
        <motion.div
          custom={4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 border-b"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#9e9e9e", fontFamily: pretendard }}
            >
              저장한 축제
            </h2>
            <Link
              href="/explore"
              className="text-xs font-medium transition-colors"
              style={{ color: "#4344FD", fontFamily: pretendard }}
            >
              더 보기 →
            </Link>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=70",
              "https://images.unsplash.com/photo-1567591370428-3e9e0def2e84?w=200&q=70",
              "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200&q=70",
            ].map((img, i) => (
              <div key={i} className="relative w-14 h-14 overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Saved festival" className="w-full h-full object-cover" />
              </div>
            ))}
            <div
              className="w-14 h-14 flex items-center justify-center flex-shrink-0 text-sm font-medium"
              style={{ background: "#f5f3eb", color: "#4344FD", fontFamily: pretendard }}
            >
              +14
            </div>
          </div>
        </motion.div>

        {/* About / Credits */}
        <motion.div
          custom={5}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6"
          style={{ background: "#111111" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: cormorant, color: "#f0ede4", fontStyle: "italic" }}
            >
              Festivo
            </span>
            <span className="text-xs" style={{ color: "#6e6e6e", fontFamily: pretendard }}>v1.0</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}>
            Festivo는 기획부터 배포까지 AI 도구만으로 디자인하고 개발했습니다. 창의성과 Claude Code가 만나면 무엇이 가능한지 보여주는 쇼케이스입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Claude Code", "Next.js 15", "Framer Motion", "Tailwind CSS v4", "Vercel"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium border"
                style={{ borderColor: "#2e2e2e", color: "#6e6e6e", fontFamily: pretendard }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#2e2e2e" }}>
            <p className="text-xs" style={{ color: "#6e6e6e", fontFamily: pretendard }}>© 2026 Festivo</p>
            <p className="text-xs font-medium" style={{ color: "#4344FD", fontFamily: pretendard }}>Made with Claude Code ✦</p>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          custom={6}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 border"
          style={{ background: "#ffffff", borderColor: "#e5e2da" }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#9e9e9e", fontFamily: pretendard }}
          >
            계정
          </h2>
          <div className="flex flex-col gap-0">
            <button
              className="text-sm font-medium text-left px-0 py-3 border-b transition-colors flex items-center justify-between"
              style={{ borderColor: "#e5e2da", color: "#6e6e6e", fontFamily: pretendard }}
            >
              내 데이터 내보내기 <span>→</span>
            </button>
            <button
              className="text-sm font-medium text-left px-0 py-3 transition-colors flex items-center justify-between"
              style={{ color: "#dc2626", fontFamily: pretendard }}
            >
              로그아웃 <span>→</span>
            </button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
