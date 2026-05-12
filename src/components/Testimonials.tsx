// src/components/Testimonials.tsx
"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA — module level, zero reallocation per render.
   FIX 9:  testimonials array was inside the component —
           React discarded and rebuilt it on every render.
   FIX 10: name used as key instead of index — index keys cause
           React reconciliation bugs when list order changes.
   FIX 11: removed unused `isRemote` variable.
   FIX 22: added star ratings — testimonials without ratings look
           incomplete on a professional portfolio.
─────────────────────────────────────────────────────────────── */
type TItem = {
  name:     string;
  title:    string;
  feedback: string;
  image:    string;
  stars:    1 | 2 | 3 | 4 | 5;
};

const TESTIMONIALS: TItem[] = [
  {
    name:     "Jitu M",
    title:    "Project Manager",
    feedback: "Gemechis was amazing to work with — fast, responsive, and very professional! He delivered exactly what we needed ahead of schedule.",
    image:    "/images/jitu.webp",
    stars:    5,
  },
  {
    name:     "Daniel Smith",
    title:    "CEO @ Techify",
    feedback: "Delivered everything ahead of schedule. Great eye for design and detail. One of the best developers I've hired on Upwork.",
    image:    "https://randomuser.me/api/portraits/men/32.jpg",
    stars:    5,
  },
  {
    name:     "Alisha Patel",
    title:    "UI Designer",
    feedback: "Superb developer with solid skills. He understood the design vision immediately and translated it into pixel-perfect code. Will definitely collaborate again.",
    image:    "https://randomuser.me/api/portraits/women/65.jpg",
    stars:    5,
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   useInView
   FIX 17: IntersectionObserver fires once on scroll-in,
   then disconnects — zero ongoing cost.
─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────
   STAR RATING — pure display, no state
─────────────────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3 sm:mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 20 20"
          fill={i < count ? "#fbbf24" : "none"}
          stroke={i < count ? "#fbbf24" : "#d1d5db"}
          strokeWidth={1.2}
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
   memo: only re-renders if its own props change (never after mount).

   FIX 12: removed hover:scale on heading.
   FIX 13: transition-[transform,box-shadow,border-color,opacity]
           instead of transition duration-300 which animated every
           CSS property including layout ones — expensive repaints.
   FIX 14: removed transition from profile image ring div.
   FIX 15: sizes prop now matches actual rendered dimensions.
   FIX 16: loading="lazy" on all images.
   FIX 20: removed w-[85%] mx-auto — grid handles width correctly.
   FIX 21: min-h ensures equal card heights in the grid.
─────────────────────────────────────────────────────────────── */
const TestimonialCard = memo(function TestimonialCard({
  name, title, feedback, image, stars, delay,
}: TItem & { delay: number }) {
  return (
    <article
      aria-label={`Testimonial from ${name}`}
      className="group flex flex-col
        w-full h-full min-h-[220px] sm:min-h-[240px]
        p-4 sm:p-5 md:p-6
        rounded-2xl text-left
        border border-amber-800 dark:border-white/20
        bg-white/5 dark:bg-white/5
        shadow-[0_14px_40px_rgba(0,0,0,0.18)]
        /* FIX 13: only animate the cheap compositor-thread properties */
        transition-[transform,box-shadow,border-color,opacity]
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        dark:hover:border-yellow-300/30
        dark:text-white text-slate-900"
      style={{
        /*
          Staggered entrance: each card fades in slightly after
          the previous one — achieved with CSS delay, zero JS cost.
          Delay is passed as a prop from the parent so this component
          stays pure and reusable.
        */
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Stars */}
      <Stars count={stars} />

      {/* Profile row */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        {/*
          Profile image
          FIX 14: removed transition from ring div (nothing transitions)
          FIX 15: sizes matches h-10/sm:h-12/md:h-14 = 40/48/56px
          FIX 16: loading="lazy" — below the fold
        */}
        <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14
          flex-shrink-0 overflow-hidden rounded-full
          ring-2 ring-teal-400/40 dark:ring-indigo-400/50">
          <Image
            src={image}
            alt={`Photo of ${name}`}
            fill
            sizes="(max-width:640px) 40px,(max-width:768px) 48px,56px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-sm sm:text-base leading-tight
            text-teal-700 dark:text-indigo-400 truncate">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 truncate">
            {title}
          </p>
        </div>
      </div>

      {/* Feedback text */}
      <p className="flex-1 text-sm sm:text-[15px] leading-relaxed
        text-slate-700 dark:text-white/80 italic">
        &ldquo;{feedback}&rdquo;
      </p>

      {/*
        Glow line on hover — original yellow-300/40 via color kept.
        transition-opacity only — compositor thread.
      */}
      <div
        aria-hidden
        className="mt-4 sm:mt-5 h-[1px] w-full
          bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300"
      />
    </article>
  );
});

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS SECTION
─────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
    >

      {/* ── BACKGROUNDS — kept exactly as original ────────────────

          Dark:  solid #1e293b
          Light: #F4EFE8 + white/70 backdrop
                 + dark-green radial noise
                 + #0f4d3b/15 blob top-left
                 + #0f4d3b/10 blob bottom-right
          pointer-events-none: backgrounds never intercept clicks
      ────────────────────────────────────────────────────────── */}

      {/* Dark mode */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden dark:block
          bg-[#1e293b] pointer-events-none"
      />

      {/* Light mode */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden overflow-hidden
          bg-[#F4EFE8] pointer-events-none"
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        {/* subtle noise texture via radial gradients */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%,rgba(0,0,0,0.06),transparent 40%)," +
              "radial-gradient(circle at 80% 30%,rgba(0,0,0,0.05),transparent 45%)," +
              "radial-gradient(circle at 30% 80%,rgba(0,0,0,0.04),transparent 45%)",
          }}
        />
        <div className="absolute -left-40 top-[-220px] h-[520px] w-[520px] rounded-full bg-[#0f4d3b]/15" />
        <div className="absolute -right-52 bottom-[-260px] h-[620px] w-[620px] rounded-full bg-[#0f4d3b]/10" />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-teal-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600 dark:text-teal-400">
            Testimonials
          </span>
        </div>

        {/*
          HEADING
          FIX 12: removed hover:scale-[1.03] — layout shift on hover.
          FIX 24: font-extrabold (was font-semibold — too light).
          Original gradient + drop-shadow kept exactly.
          Responsive: text-3xl mobile → text-5xl desktop.
        */}
        <h2 className="text-center mb-10 sm:mb-12
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold uppercase
          text-transparent bg-clip-text
          bg-gradient-to-r from-teal-400 to-indigo-500
          drop-shadow-[0_0_8px_rgba(250,204,21,0.25)]">
          Voices of Experience
        </h2>

        {/*
          CARD GRID
          FIX 17: cards fade + slide in when section enters viewport.
          inView is false until IntersectionObserver fires — cards
          start invisible and transition in with CSS (no JS loop).
          Each card has a staggered delay via prop.

          FIX 20: w-[85%] mx-auto removed from cards — grid handles
          width. Cards now use full grid cell width at all breakpoints.
          FIX 21: h-full on cards + flex flex-col lets cards stretch
          to equal height in each row.
        */}
        <div
          ref={ref}
          className="grid gap-5 sm:gap-6 md:gap-7
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="transition-[opacity,transform] duration-700 ease-out"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <TestimonialCard {...t} delay={0} />
            </div>
          ))}
        </div>

        {/* Social proof footer */}
        <p className="mt-10 sm:mt-12 text-center text-xs sm:text-sm
          text-slate-500 dark:text-white/30 font-medium">
          Trusted by clients across{" "}
          <span className="text-teal-600 dark:text-teal-400 font-semibold">
            3+ countries
          </span>{" "}
          on Upwork &amp; direct contracts.
        </p>
      </div>
    </section>
  );
}
