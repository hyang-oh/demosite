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
  { value: "light", label: "Light", icon: "☀" },
  { value: "dark", label: "Dark", icon: "☾" },
  { value: "system", label: "System", icon: "⊙" },
];

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  desc?: string;
}

function Toggle({ checked, onChange, label, desc }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-sm font-medium" style={{ color: "#1C1C1C" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "#A8A8A8" }}>{desc}</p>}
      </div>
      <button
        onClick={onChange}
        className="relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
        style={{ background: checked ? "#C8741A" : "#E8E3DC" }}
        aria-checked={checked}
        role="switch"
      >
        <span
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300"
          style={{ transform: checked ? "translateX(26px)" : "translateX(4px)" }}
        />
      </button>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
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

  return (
    <main className="pt-16 min-h-screen" style={{ background: "#F7F4EF" }}>
      {/* Header */}
      <div className="py-12 lg:py-16" style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E3DC" }}>
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#C8741A" }}>Preferences</span>
          <h1 className="text-4xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>
            Settings
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#6B6B6B" }}>
            Customize your Festivo experience.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Profile card */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ background: "linear-gradient(135deg, #C8741A, #E8881F)" }}
            >
              H
            </div>
            <div>
              <p className="font-semibold" style={{ fontFamily: "var(--font-playfair)", color: "#1C1C1C" }}>Hyang Oh</p>
              <p className="text-sm" style={{ color: "#6B6B6B" }}>hyang@festivo.world</p>
              <span className="badge mt-1">Pro Member</span>
            </div>
            <button className="ml-auto text-sm font-medium px-4 py-1.5 rounded-full border transition-colors hover:bg-gray-50" style={{ borderColor: "#E8E3DC", color: "#6B6B6B" }}>
              Edit
            </button>
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#A8A8A8" }}>Language</h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200"
                style={{
                  borderColor: language === lang.code ? "#C8741A" : "#E8E3DC",
                  background: language === lang.code ? "#FFF3E0" : "#FFFFFF",
                }}
              >
                <div className="text-left">
                  <p className="text-sm font-medium" style={{ color: "#1C1C1C" }}>{lang.native}</p>
                  <p className="text-xs" style={{ color: "#A8A8A8" }}>{lang.label}</p>
                </div>
                {language === lang.code && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ background: "#C8741A" }}>✓</span>
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
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#A8A8A8" }}>Appearance</h2>
          <div className="flex gap-3">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200"
                style={{
                  borderColor: theme === t.value ? "#C8741A" : "#E8E3DC",
                  background: theme === t.value ? "#FFF3E0" : "#FFFFFF",
                }}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-xs font-medium" style={{ color: theme === t.value ? "#C8741A" : "#6B6B6B" }}>{t.label}</span>
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
          className="rounded-2xl px-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider pt-6 mb-2" style={{ color: "#A8A8A8" }}>Notifications</h2>
          <div className="divide-y" style={{ borderColor: "#E8E3DC" }}>
            <Toggle
              checked={notifications.newFestivals}
              onChange={() => setNotifications((n) => ({ ...n, newFestivals: !n.newFestivals }))}
              label="New Festivals"
              desc="Get notified when new festivals are added near your interests"
            />
            <Toggle
              checked={notifications.reminders}
              onChange={() => setNotifications((n) => ({ ...n, reminders: !n.reminders }))}
              label="Festival Reminders"
              desc="Reminders 2 weeks before saved festivals"
            />
            <Toggle
              checked={notifications.newsletter}
              onChange={() => setNotifications((n) => ({ ...n, newsletter: !n.newsletter }))}
              label="Monthly Newsletter"
              desc="Curated festival picks and travel stories"
            />
            <Toggle
              checked={notifications.updates}
              onChange={() => setNotifications((n) => ({ ...n, updates: !n.updates }))}
              label="App Updates"
              desc="Product news and new features"
            />
          </div>
        </motion.div>

        {/* Saved Festivals teaser */}
        <motion.div
          custom={4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#A8A8A8" }}>Saved Festivals</h2>
            <Link href="/explore" className="text-xs font-medium" style={{ color: "#C8741A" }}>Browse more →</Link>
          </div>
          <div className="flex gap-3 overflow-hidden">
            {["https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=70",
              "https://images.unsplash.com/photo-1567591370428-3e9e0def2e84?w=200&q=70",
              "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200&q=70",
            ].map((img, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Saved festival" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-semibold" style={{ background: "#FFF3E0", color: "#C8741A" }}>
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
          className="rounded-2xl p-6"
          style={{ background: "#1C1C1C" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#C8741A" }}>
              <span className="text-white font-bold" style={{ fontFamily: "var(--font-playfair)" }}>F</span>
            </div>
            <div>
              <p className="font-semibold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Festivo v1.0</p>
              <p className="text-xs" style={{ color: "#6B6B6B" }}>Festival Discovery App</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#A8A8A8" }}>
            Festivo was designed and built entirely with AI tools — from design to deployment. A showcase of what&apos;s possible when creativity meets Claude Code.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Claude Code", "Next.js 15", "Framer Motion", "Tailwind CSS", "Vercel"].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(200,116,26,0.15)", color: "#C8741A" }}>
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#2E2E2E" }}>
            <p className="text-xs" style={{ color: "#6B6B6B" }}>© 2026 Festivo</p>
            <p className="text-xs" style={{ color: "#C8741A" }}>Made with Claude Code ✦</p>
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          custom={6}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #E8E3DC" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#A8A8A8" }}>Account</h2>
          <div className="flex flex-col gap-2">
            <button className="text-sm font-medium text-left px-4 py-3 rounded-xl border transition-colors hover:bg-gray-50 flex items-center justify-between" style={{ borderColor: "#E8E3DC", color: "#6B6B6B" }}>
              Export my data
              <span>→</span>
            </button>
            <button className="text-sm font-medium text-left px-4 py-3 rounded-xl transition-colors hover:bg-red-50 flex items-center justify-between" style={{ color: "#DC2626" }}>
              Sign out
              <span>→</span>
            </button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
