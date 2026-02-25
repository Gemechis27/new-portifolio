 "use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollCue from "@/components/ScrollCue";
import MarqueeStrip from "@/components/MarqueeStrip";



type Tile = {
  src: string;
  left: string;
  top: string;
  w: number;
  h: number;
  depth: number;
  rot?: number;
};

type InfoCard = {
  title: string;
  accent: string; // tailwind gradient classes
};

/* ===================== Background ===================== */

function DiagonalCollageBackground({ mode }: { mode: "light" | "dark" }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // mouse (-0.5..0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // smooth
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  // gentle tilt
  const tiltX = useTransform(smy, [-0.5, 0.5], [3, -3]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(dx);
      my.set(dy);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
      setHovered(false);
    };

    const onEnter = () => setHovered(true);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  const tiles: Tile[] = useMemo(
  () => [
    { src: "/images/apple.webp", left: "-14%", top: "6%", w: 520, h: 320, depth: 14, rot: -2 },
    { src: "/images/amazon2.webp", left: "10%", top: "9%", w: 560, h: 340, depth: 16, rot: 2 },
    { src: "/images/netflix.webp", left: "37%", top: "18%", w: 450, h: 420, depth: 15, rot: -2 },
    { src: "/images/evangadiforum.webp", left: "60%", top: "15%", w: 540, h: 330, depth: 17, rot: 2 },
    { src: "/images/s3.webp", left: "92%", top: "18%", w: 560, h: 340, depth: 18, rot: -2 },
    { src: "/images/gmypoti.webp", left: "122%", top: "21%", w: 520, h: 320, depth: 16, rot: 2 },
    { src: "/images/apple.webp", left: "152%", top: "24%", w: 520, h: 320, depth: 14, rot: -2 },
  
      // BOTTOM STRIP
      { src: "/images/gmypoti.webp", left: "-18%", top: "60%", w: 520, h: 320, depth: 16, rot: 2 },
      { src: "/images/s3.webp", left: "6%", top: "40%", w: 560, h: 350, depth: 18, rot: -2 },
      { src: "/images/amazon2.webp", left: "30%", top: "50%", w: 480, h: 400, depth: 16, rot: 2 },
      { src: "/images/abbegarage.webp", left: "54%", top: "51%", w: 520, h: 340, depth: 15, rot: -2 },
      { src: "/images/evangadiforum.webp", left: "76%", top: "64%", w: 540, h: 330, depth: 17, rot: 2 },
      { src: "/images/apple.webp", left: "100%", top: "67%", w: 520, h: 320, depth: 14, rot: -2 },
      { src: "/images/gmypoti.webp", left: "124%", top: "70%", w: 520, h: 320, depth: 16, rot: 2 },
    ],
    []
  );

  // theme styling
  const baseBg = mode === "light" ? "#EEE9E2" : "#0B1020";
  const tileBorder =
    mode === "light"
      ? "1px solid rgba(255,255,255,0.55)"
      : "1px solid rgba(255,255,255,0.16)";
  const tileShadow =
    mode === "light"
      ? "0 18px 46px rgba(0,0,0,0.22)"
      : "0 18px 46px rgba(0,0,0,0.55)";
  const tileFilter =
    mode === "light"
      ? "saturate(0.98) contrast(1.18) brightness(0.92)"
      : "saturate(0.85) contrast(1.1) brightness(0.78)";
  const overlay = mode === "light" ? "bg-black/34" : "bg-black/45";
  const spotlight =
    mode === "light"
      ? "bg-[radial-gradient(760px_360px_at_50%_45%,rgba(0,0,0,0.0),rgba(0,0,0,0.62))]"
      : "bg-[radial-gradient(820px_380px_at_50%_45%,rgba(0,0,0,0.0),rgba(0,0,0,0.72))]";

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: baseBg }} />

      {/* bleed so diagonal doesn't cut off */}
      <motion.div
        className="absolute"
        style={{
          left: "-30%",
          top: "-30%",
          width: "160%",
          height: "160%",
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        animate={{ scale: [1.0, 1.02, 1.0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 -rotate-12">
          {tiles.map((t, i) => {
            const tx = useTransform(smx, [-0.5, 0.5], [-t.depth, t.depth]);
            const ty = useTransform(smy, [-0.5, 0.5], [-t.depth, t.depth]);

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: t.left,
                  top: t.top,
                  width: t.w,
                  height: t.h,
                  borderRadius: "2px",
                  x: tx,
                  y: ty,
                  transform: `rotate(${t.rot ?? 0}deg)`,
                  border: tileBorder,
                  boxShadow: tileShadow,
                  backgroundImage: `url('${t.src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: tileFilter,
                  opacity: mode === "light" ? 0.98 : 0.55,
                }}
                animate={{ scale: hovered ? 1.03 : 1.0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
            );
          })}
        </div>
      </motion.div>

      <div className={`absolute inset-0 ${overlay}`} />
      <div className={`absolute inset-0 ${spotlight}`} />
    </div>
  );
}

/* ===================== Overlapping cards (right side) ===================== */



function OverlapInfoCards() {
  const [active, setActive] = useState<number | null>(null);

  // Inline SVG icons (no extra libs)
  const CloudIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M7.5 18.5H17a4 4 0 0 0 .7-7.94A5.5 5.5 0 0 0 7.2 8.9 4.5 4.5 0 0 0 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SparkIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 13.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  const PuzzleIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M9 3h3a2 2 0 1 1 4 0h3v6a2 2 0 1 0 0 4v6h-6a2 2 0 1 1-4 0H3v-6a2 2 0 1 0 0-4V3h6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  const cards = [
    {
      title: "Building cloud-native apps",
      desc: "AWS-ready apps with clean architecture and stable deployments.",
      Icon: CloudIcon,
      accent: "from-teal-400 to-indigo-500",
      borderLight: "border-teal-400/60",
      rot: -7,
    },
    {
      title: "Crafting clean user experiences",
      desc: "Sharp UI, consistent spacing, and smooth interaction patterns.",
      Icon: SparkIcon,
      accent: "from-indigo-400 to-teal-400",
      borderLight: "border-rose-400/55",
      rot: 6,
    },
    {
      title:
        "Turning complex problems into practical solutions with modern stacks.",
      desc: "From idea → implementation with readable, maintainable code.",
      Icon: PuzzleIcon,
      accent: "from-amber-400 to-rose-400",
      borderLight: "border-amber-400/60",
      rot: -5,
    },
  ] as const;

  // ✅ PEEK stack: only small part of lower cards is visible
  // (adjust these to show more/less)
  const peekY = [56, 28, 0]; // bottom card pushed down most
  const peekX = [0, 18, 36];

  // Click outside to reset (optional but nice)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If you click outside the card stack container -> reset
      if (!target.closest("[data-cardstack='true']")) setActive(null);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div
      data-cardstack="true"
      className="
        relative w-full max-w-[560px]
        h-[460px] md:h-[480px]
      "
    >
      {cards.map((c, i) => {
        const { title, desc, Icon, accent, borderLight, rot } = c;

        const isActive = active === i;
        const hasActive = active !== null;

        // Default peek position
        const baseX = peekX[i];
        const baseY = peekY[i];

        // When active: bring card to center and show FULL
        const activeX = 0;
        const activeY = -10; // slight lift so it feels premium

        // When another card is active: push non-active cards slightly back
        const behindScale = 0.98;
        const behindOpacity = 0.75;

        return (
          <motion.button
            key={title}
            type="button"
            onClick={() => setActive((prev) => (prev === i ? null : i))}
            className={[
              "absolute left-0 top-0 w-full text-left",
              "rounded-[2px] overflow-hidden",
              "border",
              borderLight,
              "dark:border-white/15",
              "bg-white/65 dark:bg-white/7",
              "backdrop-blur-xl",
              "shadow-[0_18px_55px_rgba(0,0,0,0.20)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.55)]",
              "transition-all duration-300",
              // ✅ cursor/feel
              "cursor-pointer",
              "select-none",
            ].join(" ")}
            style={{
              // z-index: active on top
              zIndex: isActive ? 99 : 10 + i,
            }}
            animate={{
              // position + rotation
              x: isActive ? activeX : baseX,
              y: isActive ? activeY : baseY,
              rotate: isActive ? 0 : rot,

              // size/shadow changes
              scale: isActive ? 1.03 : hasActive ? behindScale : 1.0,
              opacity: isActive ? 1 : hasActive ? behindOpacity : 1,

              // subtle shadow boost for active
              boxShadow: isActive
                ? "0 28px 90px rgba(0,0,0,0.35)"
                : modeShadowFallback(),
            }}
            whileHover={{
              // Only do hover lift if not active
              y: isActive ? activeY : baseY - 8,
              scale: isActive ? 1.03 : 1.015,
            }}
            whileTap={{
              scale: isActive ? 1.02 : 0.99,
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Accent top line */}
            <div className={`h-[6px] w-full bg-gradient-to-r ${accent}`} />

            <div className="p-6 md:p-15">
              <div className="flex items-start gap-4">
                {/* Icon badge */}
                <div
                  className={[
                    "shrink-0 h-12 w-12 rounded-[2px]",
                    "text-white flex items-center justify-center",
                    "bg-gradient-to-r",
                    accent,
                    "border border-white/40 dark:border-white/15",
                    "shadow-[0_14px_38px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
                  ].join(" ")}
                >
                  <Icon />
                </div>

                <div>
                  {/* ✅ Light text dark, dark text white */}
                  <p className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                    {title}
                  </p>
                  <p className="mt-2 text-sm md:text-base font-semibold text-slate-700 dark:text-white/85">
                    {desc}
                  </p>

                  {/* Hint text */}
                  <p className="mt-3 text-xs font-semibold text-red-600 dark:text-white/60">
                    {isActive ? "Click again to collapse" : "Click to expand"}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-black/10 dark:bg-white/10" />
          </motion.button>
        );
      })}
    </div>
  );

  

  // Helper: keeps TS happy when animating boxShadow
  function modeShadowFallback() {
    return "0 18px 55px rgba(0,0,0,0.20)";
  }
}



/* ===================== HERO (default export) ===================== */

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

 const roles = [
  { text: "Full Stack Developer", color: "text-amber-400" },
   { text: "Serverless Architect", color: "text-cyan-400" },
  { text: "Backend Developer", color: "text-slate-300" },

  { text: "Cloud Solutions Architect (AWS)", color: "text-amber-400" },
  { text: "UI/UX Designer", color: "text-emerald-400" },
];

const [displayText, setDisplayText] = useState("");
const [roleIndex, setRoleIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);

useEffect(() => {
  const currentRole = roles[roleIndex].text;

  if (charIndex < currentRole.length) {
    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + currentRole[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 120); // typing speed (adjust if needed)

    return () => clearTimeout(timeout);
  } else {
    const timeout = setTimeout(() => {
      setDisplayText("");
      setCharIndex(0);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 1400); // pause before next role

    return () => clearTimeout(timeout);
  }
}, [charIndex, roleIndex]);


  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="dark:hidden absolute inset-0">
          <DiagonalCollageBackground mode="light" />
        </div>

        {/* Dark base + collage + your stars */}
        <div className="hidden dark:block absolute inset-0 bg-[#0B1020]" />
        <div className="hidden dark:block absolute inset-0">
          <DiagonalCollageBackground mode="dark" />
        </div>
        <div className="hidden dark:block absolute inset-0">
          <div className="star-field" />
          <div className="star-field star-field--2" />
        </div>
      </div>

      {/* Layout: bigger LEFT, cards RIGHT */}
      <div className="relative z-10 mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.35fr_.65fr] items-start">
        {/* LEFT: H1/H2 big */}
        <div className="pt-6 md:pt-10 text-left text-white">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="flex items-center gap-4"
          >
            {/* Diamond brand mark */}
            <div className="relative flex items-center justify-center">
              <div
                className="
                  h-10 w-10 md:h-12 md:w-12
                  rotate-45
                  rounded-[2px]
                  bg-gradient-to-br from-teal-400 to-indigo-500
                  shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                  transition-transform duration-300
                  hover:scale-110
                "
              />
              <span className="absolute text-white font-extrabold text-sm md:text-base">
                G
              </span>
            </div>

            {/* GEMMY */}
            <h1
              className="text-6xl md:text-8xl uppercase tracking-[0.14em] font-extrabold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-indigo-400">
                GEMMY
              </span>
            </h1>
          </motion.div>

        
          

          <h2
  className={`mt-6 text-2xl md:text-5xl font-extrabold transition-colors duration-300 ${roles[roleIndex].color}`}
>
  {displayText}
  <span className="animate-blink">|</span>
</h2>


          {/* Buttons */}
          <div className="mt-10 flex gap-5 flex-wrap">
            <Link
              href="#projects"
              className="
                px-8 py-4
                rounded-[3px]
                border-amber-600
                font-extrabold
                text-black
                bg-white
                shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:scale-[1.06]
                hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500
                hover:text-white
                active:scale-[0.98]
                dark:bg-white/10 dark:text-white dark:border dark:border-white/20
              "
            >
              Explore My Projects →
            </Link>

            <Link
              href="#contact"
              className="
                px-8 py-4
                rounded-[3px]
                font-extrabold
                border border-amber-600
                text-white
                shadow-[0_18px_40px_rgba(0,0,0,0.25)]
                transition-all duration-300
                hover:scale-[1.06]
                hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500
                hover:border-transparent
                active:scale-[0.98]
                dark:border-white/30
              "
            >

              Let&apos;s Work Together
            </Link>
          </div>
        </div>

        

        {/* RIGHT: 3 overlapping cards */}
        <div className="lg:pt-14 flex justify-end gap -translate-x-10">
          <OverlapInfoCards />
        </div>
      </div>
      {/*         the mouse scollor  */}
      <div className="    ">
           <ScrollCue />
      </div>
      
                    <div className="mt-50 max-w-5xl mx-auto translate-y-30">
                       <MarqueeStrip speedSeconds={160} />
                   </div>

       
      
    </section>

    
  );
  
}




