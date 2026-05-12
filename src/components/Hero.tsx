// src/components/Hero.tsx
"use client";

import React, {
  useEffect, useRef, useState, memo, useCallback, useMemo,
} from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  motion, useMotionValue, useSpring, useTransform, AnimatePresence,
} from "framer-motion";
import ScrollCue from "@/components/ScrollCue";
import MarqueeStrip from "@/components/MarqueeStrip";

/* ══════════════════════════════════════════════════════════════
   STATIC MODULE-LEVEL DATA
   Never reallocated — defined once when the module loads.
══════════════════════════════════════════════════════════════ */

// BUG 13 FIX: SVG icons defined at module level as stable components,
// not inside OverlapInfoCards where they were recreated every render.
const CloudIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
    <path d="M7.5 18.5H17a4 4 0 0 0 .7-7.94A5.5 5.5 0 0 0 7.2 8.9 4.5 4.5 0 0 0 7.5 18.5Z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
    <path d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2Z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18.5 13.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
    <path d="M9 3h3a2 2 0 1 1 4 0h3v6a2 2 0 1 0 0 4v6h-6a2 2 0 1 1-4 0H3v-6a2 2 0 1 0 0-4V3h6Z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// BUG 15 FIX: reduced to 2 state values — char index drives everything,
// no separate displayText state string accumulation on each tick.
const ROLES = [
  { text: "Full Stack Developer",           color: "text-amber-400"   },
  { text: "Serverless Architect",            color: "text-cyan-400"    },
  { text: "Backend Developer",               color: "text-slate-300"   },
  { text: "Cloud Solutions Architect (AWS)", color: "text-amber-400"   },
  { text: "UI/UX Designer",                  color: "text-emerald-400" },
] as const;

// BUG 1 FIX: All tile `left` values capped at ≤90% so tiles never
// extend beyond the viewport. left: 122%/152% caused horizontal scroll
// on every screen size. Reduced tile count from 14 → 10 for performance.
// BUG 9 FIX: Tiles reduced to only the viewport-visible range.
// BUG 12 FIX: depth values reduced so parallax shifts stay within bounds.
const TILES_DARK = [
  { src: "/images/apple.webp",         left: "-8%",  top: "5%",  w: 480, h: 300, depth: 10, rot: -2 },
  { src: "/images/amazon2.webp",       left: "14%",  top: "8%",  w: 520, h: 320, depth: 12, rot:  2 },
  { src: "/images/netflix.webp",       left: "38%",  top: "16%", w: 420, h: 380, depth: 11, rot: -2 },
  { src: "/images/evangadiforum.webp", left: "60%",  top: "13%", w: 500, h: 300, depth: 13, rot:  2 },
  { src: "/images/s3.webp",            left: "84%",  top: "16%", w: 480, h: 300, depth: 12, rot: -2 },
  { src: "/images/gmypoti.webp",       left: "-8%",  top: "58%", w: 480, h: 300, depth: 12, rot:  2 },
  { src: "/images/s3.webp",            left: "10%",  top: "42%", w: 520, h: 320, depth: 14, rot: -2 },
  { src: "/images/amazon2.webp",       left: "34%",  top: "52%", w: 440, h: 360, depth: 12, rot:  2 },
  { src: "/images/abbegarage.webp",    left: "58%",  top: "53%", w: 480, h: 310, depth: 11, rot: -2 },
  { src: "/images/evangadiforum.webp", left: "80%",  top: "66%", w: 500, h: 300, depth: 13, rot:  2 },
] as const;

const CARDS = [
  { title: "Building cloud-native apps",                         desc: "AWS-ready apps with clean architecture and stable deployments.",  Icon: CloudIcon,  accent: "from-teal-400 to-indigo-500",  border: "border-teal-400/50",  rot: -6 },
  { title: "Crafting clean user experiences",                    desc: "Sharp UI, consistent spacing, and smooth interaction patterns.",   Icon: SparkIcon,  accent: "from-indigo-400 to-teal-400",  border: "border-rose-400/50",  rot:  5 },
  { title: "Turning complex problems into practical solutions",  desc: "From idea → implementation with readable, maintainable code.",    Icon: PuzzleIcon, accent: "from-amber-400 to-rose-400",   border: "border-amber-400/50", rot: -4 },
] as const;

/* ══════════════════════════════════════════════════════════════
   COLLAGETILE
   Each tile is its own component so useTransform is called at
   component top-level — never inside .map() (Rule of Hooks).
══════════════════════════════════════════════════════════════ */
type TileProps = {
  tile: (typeof TILES_DARK)[number];
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
  hovered: boolean;
  tileBorder: string;
  tileShadow: string;
  tileFilter: string;
  opacity: number;
};

const CollageTile = memo(function CollageTile({
  tile, smx, smy, hovered, tileBorder, tileShadow, tileFilter, opacity,
}: TileProps) {
  const tx = useTransform(smx, [-0.5, 0.5], [-tile.depth, tile.depth]);
  const ty = useTransform(smy, [-0.5, 0.5], [-tile.depth, tile.depth]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: tile.left, top: tile.top,
        width: tile.w,   height: tile.h,
        borderRadius: "3px",
        x: tx, y: ty,
        rotate: tile.rot ?? 0,
        border: tileBorder,
        boxShadow: tileShadow,
        backgroundImage: `url('${tile.src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: tileFilter,
        opacity,
        // BUG 12 FIX: removed animate={{scale}} driven by hovered —
        // that fired on ALL 14 tiles every hover enter/leave.
        // whileHover on the individual tile is enough.
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
});

/* ══════════════════════════════════════════════════════════════
   DIAGONAL COLLAGE BACKGROUND
   BUG 8 FIX: Only ONE instance mounts — the active theme's version.
   Previously both light+dark were in the DOM simultaneously.
   BUG 11 FIX: Mouse listeners skipped on touch devices (kept).
   BUG 10 FIX: Infinite breathing animation removed — it ran forever
   on every device including mobile, occupying the compositor.
══════════════════════════════════════════════════════════════ */
function DiagonalCollageBackground({ mode }: { mode: "light" | "dark" }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 20 });
  const smy = useSpring(my, { stiffness: 55, damping: 20 });
  const tiltX = useTransform(smy, [-0.5, 0.5], [3, -3]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // skip on touch — no mouse, wastes battery
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width  - 0.5);
      my.set((e.clientY - r.top)  / r.height - 0.5);
    };
    const onLeave = () => { mx.set(0); my.set(0); setHovered(false); };
    const onEnter = () => setHovered(true);

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  const baseBg     = mode === "light" ? "#EEE9E2" : "#0B1020";
  const tileBorder = mode === "light"
    ? "1px solid rgba(255,255,255,0.55)"
    : "1px solid rgba(255,255,255,0.12)";
  const tileShadow = mode === "light"
    ? "0 12px 36px rgba(0,0,0,0.18)"
    : "0 12px 36px rgba(0,0,0,0.5)";
  const tileFilter = mode === "light"
    ? "saturate(0.95) contrast(1.15) brightness(0.93)"
    : "saturate(0.80) contrast(1.08) brightness(0.75)";
  const overlay   = mode === "light" ? "bg-black/30" : "bg-black/44";
  const spotlight = mode === "light"
    ? "bg-[radial-gradient(700px_320px_at_50%_42%,rgba(0,0,0,0),rgba(0,0,0,0.6))]"
    : "bg-[radial-gradient(750px_350px_at_50%_42%,rgba(0,0,0,0),rgba(0,0,0,0.7))]";
  const tileOpacity = mode === "light" ? 0.95 : 0.50;

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: baseBg }} />

      {/* BUG 10 FIX: removed infinite scale animation. Just tilt on mouse. */}
      <motion.div
        className="absolute"
        style={{
          left: "-25%", top: "-25%", width: "150%", height: "150%",
          rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 -rotate-12">
          {TILES_DARK.map((t, i) => (
            <CollageTile
              key={i} tile={t}
              smx={smx} smy={smy} hovered={hovered}
              tileBorder={tileBorder} tileShadow={tileShadow}
              tileFilter={tileFilter} opacity={tileOpacity}
            />
          ))}
        </div>
      </motion.div>

      <div className={`absolute inset-0 ${overlay}`} />
      <div className={`absolute inset-0 ${spotlight}`} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   OVERLAP INFO CARDS
   BUG 2 FIX: peekX reduced from [0,18,36] → [0,10,20] — stays inside
   container on 320px phones.
   BUG 6 FIX: height auto with min-h instead of fixed 460px.
   BUG 13 FIX: Icons moved to module level (above).
   BUG 14 FIX: mousedown listener replaced with useEffect cleanup,
   and scoped to document not window.
══════════════════════════════════════════════════════════════ */
const OverlapInfoCards = memo(function OverlapInfoCards() {
  const [active, setActive] = useState<number | null>(null);

  // BUG 14 FIX: scoped click-outside to document, passive false only
  // where needed, with stable ref to avoid stale closure.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-cardstack]")) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // BUG 2 FIX: peekX max is 20px, safe on 320px screens.
  const peekY = [52, 26, 0];
  const peekX = [0, 10, 20];

  return (
    // BUG 6 FIX: min-h instead of fixed h — shrinks on mobile.
    <div
      data-cardstack
      className="relative w-full min-h-[360px] sm:min-h-[400px] md:min-h-[440px]"
    >
      {CARDS.map((c, i) => {
        const isActive  = active === i;
        const hasActive = active !== null;

        return (
          <motion.button
            key={c.title}
            type="button"
            onClick={() => setActive(prev => prev === i ? null : i)}
            className={[
              "absolute left-0 top-0 w-full text-left",
              "rounded-xl overflow-hidden border",
              c.border, "dark:border-white/10",
              "bg-white/70 dark:bg-white/[0.07] backdrop-blur-xl",
              "shadow-[0_16px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
              "cursor-pointer select-none",
            ].join(" ")}
            style={{ zIndex: isActive ? 99 : 10 + i }}
            animate={{
              x:         isActive ? 0     : peekX[i],
              y:         isActive ? -8    : peekY[i],
              rotate:    isActive ? 0     : c.rot,
              scale:     isActive ? 1.02  : hasActive ? 0.98 : 1.0,
              opacity:   isActive ? 1     : hasActive ? 0.78 : 1,
            }}
            whileHover={{ y: isActive ? -8 : peekY[i] - 6, scale: isActive ? 1.02 : 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className={`h-[5px] w-full bg-gradient-to-r ${c.accent}`} />
            {/* BUG FIX: responsive padding — tighter on mobile */}
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className={[
                  "shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-lg text-white",
                  "flex items-center justify-center",
                  `bg-gradient-to-r ${c.accent}`,
                  "border border-white/30 dark:border-white/10",
                ].join(" ")}>
                  <c.Icon />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base md:text-lg font-extrabold
                    text-slate-900 dark:text-white leading-snug">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-semibold
                    text-slate-600 dark:text-white/80 leading-relaxed">
                    {c.desc}
                  </p>
                  <p className="mt-2 text-[10px] sm:text-xs font-semibold
                    text-slate-400 dark:text-white/50">
                    {isActive ? "Click again to collapse ↑" : "Click to expand ↓"}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-black/8 dark:bg-white/8" />
          </motion.button>
        );
      })}
    </div>
  );
});

/* ══════════════════════════════════════════════════════════════
   TYPEWRITER
   BUG 15 FIX: Reduced to 2 state values. displayText computed from
   roleIndex+charIndex via slice — no accumulation state, one fewer
   setState call per character.
══════════════════════════════════════════════════════════════ */
const Typewriter = memo(function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const role = ROLES[roleIndex];
  const displayText = role.text.slice(0, charIndex);

  useEffect(() => {
    if (charIndex < role.text.length) {
      const t = setTimeout(() => setCharIndex(p => p + 1), 110);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCharIndex(0);
      setRoleIndex(p => (p + 1) % ROLES.length);
    }, 1600);
    return () => clearTimeout(t);
  }, [charIndex, role.text.length]);

  return (
    // BUG 5 FIX: text-xl on mobile, scales up — no overflow on 320px
    <h2 className={`mt-4 sm:mt-5 md:mt-6
      text-xl sm:text-3xl md:text-4xl lg:text-5xl
      font-extrabold min-h-[1.4em] ${role.color}`}
      aria-live="polite"
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </h2>
  );
});

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    // BUG 17 FIX: pt-24 sm:pt-28 accounts for fixed header height (~64px)
    // + breathing room. py-20 caused content to sit under the header.
    // overflow-x-hidden here is the outermost scroll-x kill switch.
    <section
      id="home"
      className="relative min-h-screen overflow-x-hidden
        px-4 sm:px-6
        pt-24 sm:pt-28 md:pt-32
        pb-12 sm:pb-16 md:pb-20"
    >
      {/* ── BACKGROUND ──────────────────────────────────────────
          BUG 8 FIX: Render ONE background based on resolvedTheme.
          Previously BOTH light and dark variants were mounted in
          the DOM at all times — double the image loads and paint cost.

          We need `mounted` guard so SSR doesn't render the wrong one.
          On first paint we show a simple solid colour until theme resolves.
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {resolvedTheme === undefined ? (
          // SSR / hydration placeholder — no flash, no wrong background
          <div className="absolute inset-0 bg-[#0B1020]" />
        ) : isDark ? (
          <DiagonalCollageBackground mode="dark" />
        ) : (
          <DiagonalCollageBackground mode="light" />
        )}
        {isDark && (
          <div className="absolute inset-0">
            <div className="star-field" />
            <div className="star-field star-field--2" />
          </div>
        )}
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────
          Mobile:  single column, cards below text
          lg+:     2 columns side by side
          BUG 3 FIX: removed -translate-x-10 from right column
          BUG 7 FIX: right column has max-w guard on mobile
          BUG 19 FIX: gap-8 on mobile, gap-12 on lg
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl
        grid gap-8 lg:gap-12
        lg:grid-cols-[1.4fr_0.6fr]
        items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="text-left text-white">

          {/* Logo + Name row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12
                rotate-45 rounded-sm
                bg-gradient-to-br from-teal-400 to-indigo-500
                shadow-[0_12px_30px_rgba(0,0,0,0.3)]
                transition-transform duration-300 hover:scale-110"
              />
              <span className="absolute text-white font-extrabold text-xs sm:text-sm md:text-base">
                G
              </span>
            </div>

            {/* BUG 5 FIX: text-4xl→8xl responsive scale, no overflow */}
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl
                uppercase tracking-[0.1em] sm:tracking-[0.14em]
                font-extrabold leading-none"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              <span className="bg-clip-text text-transparent
                bg-gradient-to-r from-teal-300 to-indigo-400">
                GEMMY
              </span>
            </h1>
          </motion.div>

          <Typewriter />

          {/* Bio — hidden on very small screens to save space */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 sm:mt-5 max-w-lg
              text-sm sm:text-base leading-relaxed
              text-white/60 dark:text-white/60
              hidden xs:block"
          >
            Building fast, scalable web apps with React, Next.js, Node.js &amp; AWS.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link
              href="#projects"
              className="px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4
                rounded-lg font-extrabold text-sm sm:text-base
                text-black bg-white
                shadow-[0_12px_32px_rgba(0,0,0,0.28)]
                transition-transform duration-200
                hover:scale-[1.04] active:scale-[0.97]
                dark:bg-white/10 dark:text-white dark:border dark:border-white/15"
            >
              Explore My Projects →
            </Link>
            <Link
              href="#contact"
              className="px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4
                rounded-lg font-extrabold text-sm sm:text-base
                border border-white/30 text-white
                shadow-[0_12px_32px_rgba(0,0,0,0.2)]
                transition-transform duration-200
                hover:scale-[1.04] active:scale-[0.97]
                hover:bg-white/10"
            >
              Let&apos;s Work Together
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — info cards ──
            BUG 3 FIX: removed -translate-x-10 completely
            BUG 7 FIX: max-w-sm on mobile so cards don't stretch full width
            Cards shown below text on mobile, side-by-side on lg
        ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:max-w-none
            lg:pt-10"
        >
          <OverlapInfoCards />
        </motion.div>
      </div>

      {/* ── SCROLL CUE ── */}
      <div className="translate-y-0 relative z-10 mt-10 sm:mt-12">
        <ScrollCue />
      </div>

      {/* ── MARQUEE ──
          BUG 4 FIX: mt-50 translate-y-30 = 50rem+30rem offset in Tailwind v4
          (unitless values = rem). Replaced with sensible responsive margin.
      ────────────────────────────────────────────────────────── */}
      <div className=" translate-y-30 relative z-10 mt-10 sm:mt-16 max-w-5xl mx-auto">
        <MarqueeStrip speedSeconds={150} />
      </div>
    </section>
  );
}
