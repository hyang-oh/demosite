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
    <div
      className="flex items-center justify-between py-4"
      style={{ borderBottom: "1px solid var(--color-border-default)" }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          {label}
        </p>
        {desc && (
          <p className="text-caption mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
            {desc}
          </p>
        )}
      </div>
      <button
        onClick={onChange}
        className="relative w-11 h-6 transition-colors duration-300 flex-shrink-0"
        style={{ background: checked ? "var(--color-text-primary)" : "var(--color-border-default)" }}
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

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid var(--color-border-default)" }}>
        <div className="max-w-[600px] mx-auto px-8" style={{ paddingTop: "48px", paddingBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Settings
          </h1>
          <p className="text-body" style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}>
            Customize your Festivo experience
          </p>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto px-8 py-10 space-y-px">

        {/* Profile card */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full"
              style={{
                background: "var(--color-text-primary)",
                color: "var(--color-bg-elevated)",
                fontFamily: "var(--font-serif)",
                fontSize: "18px",
                fontWeight: 400,
              }}
            >
              H
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                Hyang Oh
              </p>
              <p className="text-caption" style={{ color: "var(--color-text-secondary)" }}>
                hyang@festivo.world
              </p>
            </div>
            <button
              className="ml-auto text-label"
              style={{
                padding: "6px 14px",
                border: "1px solid var(--color-border-default)",
                color: "var(--color-text-secondary)",
                background: "none",
                cursor: "pointer",
              }}
            >
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
          className="p-6"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
            Language
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="flex items-center justify-between px-4 py-3 transition-all duration-200"
                style={{
                  border: language === lang.code
                    ? "1px solid var(--color-text-primary)"
                    : "1px solid var(--color-border-default)",
                  background: language === lang.code
                    ? "var(--color-text-primary)"
                    : "transparent",
                  cursor: "pointer",
                }}
              >
                <div className="text-left">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: language === lang.code ? "var(--color-bg-elevated)" : "var(--color-text-primary)",
                    }}
                  >
                    {lang.native}
                  </p>
                  <p
                    className="text-caption"
                    style={{
                      color: language === lang.code ? "var(--color-text-tertiary)" : "var(--color-text-tertiary)",
                    }}
                  >
                    {lang.label}
                  </p>
                </div>
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
          className="p-6"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
            Appearance
          </p>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex-1 flex flex-col items-center gap-2 py-4 transition-all duration-200"
                style={{
                  border: theme === t.value
                    ? "1px solid var(--color-text-primary)"
                    : "1px solid var(--color-border-default)",
                  background: theme === t.value
                    ? "var(--color-text-primary)"
                    : "transparent",
                  color: theme === t.value
                    ? "var(--color-bg-elevated)"
                    : "var(--color-text-secondary)",
                  cursor: "pointer",
                }}
              >
                <span className="text-lg">{t.icon}</span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {t.label}
                </span>
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
          className="px-6 pt-6"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
            Notifications
          </p>
          <Toggle
            checked={notifications.newFestivals}
            onChange={() => setNotifications((n) => ({ ...n, newFestivals: !n.newFestivals }))}
            label="New festivals"
            desc="Get notified when new festivals matching your interests are added"
          />
          <Toggle
            checked={notifications.reminders}
            onChange={() => setNotifications((n) => ({ ...n, reminders: !n.reminders }))}
            label="Reminders"
            desc="Get reminded 2 weeks before saved festivals"
          />
          <Toggle
            checked={notifications.newsletter}
            onChange={() => setNotifications((n) => ({ ...n, newsletter: !n.newsletter }))}
            label="Monthly newsletter"
            desc="Curated festival picks and travel stories monthly"
          />
          <Toggle
            checked={notifications.updates}
            onChange={() => setNotifications((n) => ({ ...n, updates: !n.updates }))}
            label="App updates"
            desc="New features and improvements"
          />
        </motion.div>

        {/* Saved Festivals teaser */}
        <motion.div
          custom={4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6"
          style={{ borderBottom: "1px solid var(--color-border-default)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
              Saved Festivals
            </p>
            <Link
              href="/explore"
              className="text-label"
              style={{ color: "var(--color-text-secondary)" }}
            >
              View all →
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
              className="w-14 h-14 flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--color-bg-sunken)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
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
          style={{ background: "var(--color-text-primary)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "18px",
                fontWeight: 400,
                color: "var(--color-bg-elevated)",
              }}
            >
              Festivo
            </span>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>v1.0</span>
          </div>
          <p
            className="text-body mb-5"
            style={{ color: "var(--color-text-on-dark-tertiary)" }}
          >
            Designed and developed entirely with AI tools — from planning to deployment.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Claude Code", "Next.js 15", "Framer Motion", "Tailwind CSS v4", "Vercel"].map((tech) => (
              <span
                key={tech}
                className="text-caption"
                style={{
                  padding: "4px 12px",
                  border: "1px solid var(--color-border-on-dark)",
                  color: "var(--color-text-on-dark-tertiary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div
            className="mt-5 pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--color-border-on-dark)" }}
          >
            <p className="text-caption" style={{ color: "var(--color-text-on-dark-tertiary)" }}>
              &copy; 2026 Festivo
            </p>
            <p className="text-caption" style={{ color: "var(--color-text-on-dark-secondary)" }}>
              Made with Claude Code
            </p>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          custom={6}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6"
          style={{ border: "1px solid var(--color-border-default)" }}
        >
          <p className="text-label" style={{ color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
            Account
          </p>
          <div className="flex flex-col gap-0">
            <button
              className="text-left py-3 flex items-center justify-between"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                borderBottom: "1px solid var(--color-border-default)",
                color: "var(--color-text-secondary)",
                background: "none",
                border: "none",
                borderBlockEnd: "1px solid var(--color-border-default)",
                cursor: "pointer",
              }}
            >
              Export data <span>→</span>
            </button>
            <button
              className="text-left py-3 flex items-center justify-between"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-status-error)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Log out <span>→</span>
            </button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
