"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Festival } from "@/lib/festivals";

interface CalendarClientProps {
  festivals: Festival[];
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthsShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getMonthIndex(month: string): number {
  for (let i = 0; i < months.length; i++) {
    if (month.includes(months[i])) return i;
  }
  return -1;
}

export default function CalendarClient({ festivals }: CalendarClientProps) {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const festivalsByMonth = useMemo(() => {
    return festivals.filter((f) => {
      const monthStr = months[selectedMonth];
      return f.month.includes(monthStr);
    });
  }, [festivals, selectedMonth]);

  const monthCounts = useMemo(() => {
    const counts: number[] = new Array(12).fill(0);
    festivals.forEach((f) => {
      const idx = getMonthIndex(f.month);
      if (idx >= 0) counts[idx]++;
      if (f.month.includes("–")) {
        const parts = f.month.split("–");
        const idx2 = months.indexOf(parts[1]);
        if (idx2 >= 0 && idx2 !== idx) counts[idx2]++;
      }
    });
    return counts;
  }, [festivals]);

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg-elevated)", paddingTop: "64px" }}>
      {/* Header */}
      <div>
        <div className="max-w-[1100px] mx-auto px-8" style={{ paddingTop: "96px", paddingBottom: "64px" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "54px",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            Festival Calendar
          </h1>
          <p className="text-body" style={{ color: "var(--color-text-secondary)", marginTop: "12px" }}>
            Browse festivals by month
          </p>
        </div>
      </div>

      {/* Month selector - sticky */}
      <div
        className="sticky z-30"
        style={{
          top: "64px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border-default)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {months.map((month, i) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(i)}
                className="flex flex-col items-center gap-1 px-4 lg:px-5 py-3 flex-shrink-0 transition-all duration-200"
                style={{
                  borderBottom: selectedMonth === i
                    ? "2px solid var(--color-text-primary)"
                    : "2px solid transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: selectedMonth === i ? 500 : 400,
                    color: selectedMonth === i
                      ? "var(--color-text-primary)"
                      : i === currentMonth
                        ? "var(--color-text-primary)"
                        : "var(--color-text-tertiary)",
                  }}
                >
                  {monthsShort[i]}
                </span>
                {monthCounts[i] > 0 && (
                  <span
                    className="text-caption"
                    style={{
                      color: selectedMonth === i
                        ? "var(--color-text-primary)"
                        : "var(--color-text-tertiary)",
                    }}
                  >
                    {monthCounts[i]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Festival list */}
      <div className="max-w-[1100px] mx-auto px-8 py-10">
        <p
          className="text-caption"
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--color-border-default)",
          }}
        >
          {months[selectedMonth]} — {festivalsByMonth.length} festivals
        </p>

        <AnimatePresence mode="wait">
          {festivalsByMonth.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "96px 0", textAlign: "center" }}
            >
              <p className="text-heading" style={{ color: "var(--color-text-tertiary)" }}>
                No festivals this month
              </p>
              <p className="text-caption" style={{ color: "var(--color-text-tertiary)", marginTop: "8px" }}>
                Try another month
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {festivalsByMonth.map((f, i) => (
                <Link
                  key={f.id}
                  href={`/festival/${f.id}`}
                  className="group flex gap-5 items-center py-5"
                  style={{ borderBottom: "1px solid var(--color-border-default)" }}
                >
                  <div className="w-8 text-center flex-shrink-0">
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "var(--color-border-default)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                    <Image src={f.image} alt={f.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
                      {f.category} · {f.duration}
                    </span>
                    <h3
                      className="mt-1 truncate"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {f.name}
                    </h3>
                    <p className="text-caption mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                      {f.city}, {f.country}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
