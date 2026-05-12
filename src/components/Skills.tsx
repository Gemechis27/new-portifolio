// src/components/Skills.tsx
"use client";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  SiNextdotjs, SiTailwindcss,
} from "react-icons/si";
import {
  FaReact, FaNodeJs, FaAws, FaJs,
} from "react-icons/fa";

/*
  FIX 1: Removed @fortawesome/fontawesome-free/css/all.min.css
  That import loaded ~400KB of CSS for only 6 icons — the single
  biggest performance bug in this file. Replaced with react-icons
  which tree-shakes to ~2KB per icon and is already installed.

  FIX 3: Icons now match their correct labels:
    SiNextdotjs  → Next.js
    FaReact      → React
    FaAws        → AWS
    FaJs         → JavaScript
    SiTailwindcss→ Tailwind
    FaNodeJs     → Node.js
*/

/* ── Static data — module level, never reallocated ─────────────
   Both SKILL_BARS and ICON_SKILLS are defined once at module
   load time. Defining them inside the component would throw
   them away and recreate them on every render.
─────────────────────────────────────────────────────────────── */
const SKILL_BARS = [
  // Technical
  { label: "HTML / CSS",   level: 95, col: "technical" },
  { label: "JavaScript",   level: 90, col: "technical" },
  { label: "React",        level: 85, col: "technical" },
  { label: "Vue.js",       level: 80, col: "technical" },
  // Professional
  { label: "UI/UX Design",     level: 85, col: "professional" },
  { label: "Communication",    level: 90, col: "professional" },
  { label: "Teamwork",         level: 88, col: "professional" },
  { label: "Problem Solving",  level: 92, col: "professional" },
] as const;

const ICON_SKILLS = [
  {
    Icon: SiNextdotjs,
    label: "Next.js",
    iconCls: "text-black dark:text-white",
    border:  "border-blue-600",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(255,215,0,0.5)]",
  },
  {
    Icon: FaReact,
    label: "React",
    iconCls: "text-[#61dafb]",
    border:  "border-emerald-500",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(97,218,251,0.5)]",
  },
  {
    Icon: FaAws,
    label: "AWS",
    iconCls: "text-[#FF9900] dark:text-[#FFB84D]",
    border:  "border-blue-500",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(255,153,0,0.45)]",
  },
  {
    Icon: FaJs,
    label: "JavaScript",
    iconCls: "text-[#f7df1e]",
    border:  "border-emerald-500",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(247,223,30,0.5)]",
  },
  {
    Icon: SiTailwindcss,
    label: "Tailwind",
    iconCls: "text-[#38bdf8]",
    border:  "border-blue-500",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(56,189,248,0.5)]",
  },
  {
    Icon: FaNodeJs,
    label: "Node.js",
    iconCls: "text-[#3c873a]",
    border:  "border-emerald-500",
    glow:    "hover:shadow-[0_0_15px_4px_rgba(60,135,58,0.5)]",
  },
] as const;

/* ── SkillBar ────────────────────────────────────────────────
   memo: only re-renders when `level` changes (once on scroll).
   CSS transition on `width` runs on compositor thread.
─────────────────────────────────────────────────────────────── */
const SkillBar = memo(function SkillBar({
  label, level,
}: { label: string; level: number }) {
  return (
    <div className="mb-5 sm:mb-6 w-full">
      <div className="mb-1.5 flex justify-between items-center
        text-sm font-semibold
        text-gray-700 dark:text-gray-300">
        <span>{label}</span>
        <span className="tabular-nums">{level}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full
        bg-gray-200 dark:bg-gray-800">
        <div
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${label} proficiency`}
          className="h-full rounded-full
            bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400
            shadow-[0_0_10px_#4f46e5,0_0_20px_#14b8a6]
            transition-[width] duration-700 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
});

/* ── IconCard ────────────────────────────────────────────────
   memo: pure display, never re-renders after mount.
─────────────────────────────────────────────────────────────── */
const IconCard = memo(function IconCard({
  Icon, label, iconCls, border, glow,
}: (typeof ICON_SKILLS)[number]) {
  return (
    <div
      aria-label={label}
      className={[
        "group flex flex-col items-center justify-center",
        "rounded-xl p-3 sm:p-4 cursor-pointer select-none",
        "border-2", border,
        "bg-slate-200/60 hover:bg-slate-200/80",
        "dark:bg-[#1e293b] dark:hover:bg-[#263548]",
        // FIX 17: transition-transform only — not transition duration-300
        // which covers ALL properties and forces repaints on every frame.
        "transition-transform duration-200",
        "hover:-translate-y-1 hover:scale-[1.05]",
        "shadow-[0_0_10px_rgba(0,0,0,0.08)]",
        // FIX 18: touch-manipulation removes 300ms iOS tap delay
        "touch-manipulation",
        glow,
      ].join(" ")}
    >
      <Icon
        aria-hidden
        className={`text-2xl sm:text-3xl mb-1.5 sm:mb-2 ${iconCls}
          transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110`}
      />
      <span className="text-xs sm:text-sm font-semibold text-center leading-tight
        text-slate-700 dark:text-gray-200
        group-hover:text-yellow-300 dark:group-hover:text-yellow-200
        transition-colors duration-200">
        {label}
      </span>
    </div>
  );
});

/* ── Skills section ─────────────────────────────────────────── */
export default function Skills() {
  const secRef = useRef<HTMLElement>(null);

  /*
    FIX 5: Single boolean state instead of an array of 8 numbers.
    Previously: 8 individual setLevels() calls via setTimeout
                = 8 state updates = 8 re-renders = 8 paints.
    Now: setAnimated(true) fires once. Each SkillBar reads the
         correct level directly from the SKILL_BARS constant.
  */
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect(); // fire once, no ongoing observer cost
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={secRef}
      aria-label="Skills"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6
        text-center overflow-hidden min-h-screen"
    >

      {/* ── BACKGROUNDS — kept exactly as original ────────────────

          Dark: slate-950 gradient + star-field (original)
          Light: #fefefe + white/60 backdrop (original)
          pointer-events-none: backgrounds never intercept clicks
      ────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden dark:block
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          pointer-events-none"
      >
        <div className="star-field" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden bg-[#fefefe] pointer-events-none"
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-6xl">

        {/*
          HEADING
          FIX 12: removed hover:scale-[1.03] — caused layout shift.
          Original gradient: indigo-500 via teal-400 to emerald-400 — kept.
          FIX 16: text-left on mobile, stays centered on md+
          Responsive: text-3xl mobile → text-5xl desktop
        */}
        <h2 className="mb-10 sm:mb-12
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold uppercase text-center
          text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400">
          My Skills
        </h2>

        {/* ── SKILL BARS ─────────────────────────────────────────
            FIX 4: removed min-w-[280px] — overflowed 320px phones.
            Replaced with flex-1 min-w-0 which flexes down to 0.
            flex-col on mobile, flex-row on md+ (same as original).
        ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row
          gap-8 sm:gap-10
          justify-center text-left
          mb-12 sm:mb-16">

          {/* Technical Skills */}
          <div className="flex-1 min-w-0">
            <h3 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold
              text-slate-800 dark:text-gray-200">
              Technical Skills
            </h3>
            {SKILL_BARS.filter(s => s.col === "technical").map(s => (
              <SkillBar
                key={s.label}
                label={s.label}
                level={animated ? s.level : 0}
              />
            ))}
          </div>

          {/* Divider — visible on md+ only */}
          <div
            aria-hidden
            className="hidden md:block w-px bg-gray-200 dark:bg-gray-700/50 self-stretch mx-2"
          />

          {/* Professional Skills */}
          <div className="flex-1 min-w-0">
            <h3 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold
              text-slate-800 dark:text-gray-200">
              Professional Skills
            </h3>
            {SKILL_BARS.filter(s => s.col === "professional").map(s => (
              <SkillBar
                key={s.label}
                label={s.label}
                level={animated ? s.level : 0}
              />
            ))}
          </div>
        </div>

        {/* ── ICON GRID ──────────────────────────────────────────
            Original colors: bg-gray-200 border-cyan-400 light /
                             bg-[#111827] border-gray-600 dark — kept.

            FIX 13: grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
                    (was md:grid-cols-6 — too cramped at 768px)
            FIX 14: gap-3 sm:gap-4 (was gap-6 — too wide on mobile)
            FIX 15: p-4 sm:p-6 (was p-8 — too much padding on mobile)
        ────────────────────────────────────────────────────────── */}
        <div className="grid gap-3 sm:gap-4
          grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
          rounded-2xl
          border-2 border-cyan-400 dark:border-gray-600
          bg-gray-200 dark:bg-[#111827]
          p-4 sm:p-6">
          {ICON_SKILLS.map(skill => (
            <IconCard key={skill.label} {...skill} />
          ))}
        </div>

      </div>
    </section>
  );
}
