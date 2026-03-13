"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { Festival } from "@/lib/festivals";

interface CalendarClientProps {
  festivals: Festival[];
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthsShort = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

const pretendard = "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

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
      // Handle multi-month like "March–April"
      if (f.month.includes("–")) {
        const parts = f.month.split("–");
        const idx2 = months.indexOf(parts[1]);
        if (idx2 >= 0 && idx2 !== idx) counts[idx2]++;
      }
    });
    return counts;
  }, [festivals]);

  return (
    <main className="min-h-screen" style={{ background: "#ffffff", paddingTop: "90px" }}>
      {/* Header */}
      <div className="py-12 lg:py-16 border-b" style={{ borderColor: "#e5e2da" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="rule-line" />
          <span
            className="text-xs font-semibold uppercase tracking-widest block mb-2"
            style={{ color: "#4344FD", fontFamily: pretendard }}
          >
            월별 축제 일정
          </span>
          <h1
            className="text-4xl lg:text-6xl font-semibold"
            style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
          >
            축제 캘린더
          </h1>
          <p className="mt-3 text-base" style={{ color: "#6e6e6e", fontFamily: pretendard, fontWeight: 300 }}>
            원하는 달을 선택하면 해당 시기의 축제를 확인할 수 있어요.
          </p>
        </div>
      </div>

      {/* Month selector - sticky */}
      <div
        className="sticky z-30 border-b"
        style={{
          top: "90px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderColor: "#e5e2da",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-0 overflow-x-auto hide-scrollbar">
            {months.map((month, i) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(i)}
                className="flex flex-col items-center gap-1 px-4 lg:px-5 py-3 flex-shrink-0 transition-all duration-200 border-b-2"
                style={{
                  borderColor: selectedMonth === i ? "#4344FD" : "transparent",
                }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: selectedMonth === i ? "#4344FD" : i === currentMonth ? "#1a1a1a" : "#9e9e9e",
                    fontFamily: pretendard,
                  }}
                >
                  {monthsShort[i]}
                </span>
                {monthCounts[i] > 0 && (
                  <span
                    className="text-xs"
                    style={{
                      color: selectedMonth === i ? "#4344FD" : "#c4c4c4",
                      fontFamily: pretendard,
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-center gap-2 mb-8 pb-4 border-b" style={{ borderColor: "#e5e2da" }}>
          <CalendarDays size={16} strokeWidth={1.5} style={{ color: "#4344FD" }} />
          <p className="text-sm" style={{ color: "#6e6e6e", fontFamily: pretendard }}>
            <span className="font-medium" style={{ color: "#1a1a1a" }}>{months[selectedMonth]}</span>
            {" "}· {festivalsByMonth.length}개 축제
          </p>
        </div>

        <AnimatePresence mode="wait">
          {festivalsByMonth.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <div className="text-3xl mb-4 font-light" style={{ color: "#9e9e9e" }}>—</div>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: cormorant, color: "#1a1a1a", fontStyle: "italic" }}
              >
                이 달에는 축제가 없어요
              </h3>
              <p className="text-sm mt-2" style={{ color: "#9e9e9e", fontFamily: pretendard }}>
                다른 달을 선택해 보세요
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-0"
            >
              {festivalsByMonth.map((f, i) => (
                <Link
                  key={f.id}
                  href={`/festival/${f.id}`}
                  className="group flex gap-5 items-center py-5 border-b"
                  style={{ borderColor: "#e5e2da" }}
                >
                  <div
                    className="w-8 text-center flex-shrink-0"
                  >
                    <span
                      className="text-2xl font-semibold"
                      style={{ fontFamily: cormorant, color: "#e5e2da" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "#4344FD", fontFamily: pretendard }}
                      >
                        {f.category}
                      </span>
                      <span className="text-xs" style={{ color: "#c4c4c4" }}>·</span>
                      <span className="text-xs" style={{ color: "#9e9e9e", fontFamily: pretendard }}>
                        {f.duration}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-semibold mt-0.5 group-hover:text-blue-500 transition-colors truncate"
                      style={{ fontFamily: cormorant, color: "#1a1a1a" }}
                    >
                      {f.name}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "#6e6e6e", fontFamily: pretendard }}>
                      {f.city}, {f.country}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
                    <span className="text-xs font-medium" style={{ color: "#1a1a1a", fontFamily: pretendard }}>
                      ★ {f.rating}
                    </span>
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
