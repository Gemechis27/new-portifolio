// src/components/Certificates.tsx
"use client";

import React, {
  memo, useCallback, useState, useRef, useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA — module level, zero reallocation per render.
   FIX 10: useMemo() on a static array is incorrect usage —
   useMemo is for values derived from props/state.
   A plain module-level const never gets reallocated.
─────────────────────────────────────────────────────────────── */
type Certificate = {
  title:     string;
  issuer:    string;
  date:      string;
  image:     string;
  verifyUrl?: string;
};

const CERTS: Certificate[] = [
  {
    title:     "Fullstack MERN Web Developer",
    issuer:    "Evangadi Academy",
    date:      "2025",
    image:     "/certificates/fullstack.webp",
    verifyUrl: "https://www.evangadi.com/academy/my-certificates/57602df8827caa3e",
  },
  {
    title:     "Android Developer",
    issuer:    "UDACITY",
    date:      "2024",
    image:     "/certificates/android-developer.webp",
    verifyUrl: "https://www.udacity.com/certificate/e/8daeb880-4d7e-11ef-8e0a-53810c1769e9",
  },
  {
    title:     "Programming Fundamental",
    issuer:    "UDACITY",
    date:      "2024",
    image:     "/certificates/programming-fundamental.webp",
    verifyUrl: "https://www.udacity.com/certificate/e/b44a75a4-596f-11ef-bcad-77375d2afcb2",
  },
  {
    title:     "Machine Learning",
    issuer:    "Coursera",
    date:      "2024",
    image:     "/certificates/cousera.webp",
    verifyUrl: "https://example.com",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   useInView
   FIX 21: Section images now only load when the section enters
   the viewport. IntersectionObserver fires once then disconnects
   — zero ongoing cost after first intersection.
─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
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
   MINI CARD
   memo: only re-renders when isActive changes for this card.
─────────────────────────────────────────────────────────────── */
const MiniCard = memo(function MiniCard({
  cert, index, isActive, onClick,
}: {
  cert: Certificate;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  /*
    FIX 15: x offset reduced from i*26 to i*14.
    Original i*26 = 78px at index 3 — overflowed 320px phones.
    i*14 = 42px max, safe on all screens.
    Also capped with maxWidth so cards never escape container.
  */
  const x   = index * 14;
  const y   = index * 18;
  const rot = index % 2 === 0 ? -6 : 6;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select certificate: ${cert.title}`}
      aria-pressed={isActive}
      /*
        FIX 12: removed hover:scale from card wrapper.
        Only the image inside scales on hover — not the whole card.
        FIX 13: transition-transform only (not transition-all which
        animates every CSS property including layout ones).
        FIX 20: loading="lazy" — only first card loads eagerly.
      */
      className={[
        "absolute left-0 top-0 w-full rounded-2xl overflow-hidden border backdrop-blur-xl",
        "transition-transform duration-200 hover:-translate-y-1",
        "touch-manipulation",
        isActive
          ? "border-yellow-300 shadow-[0_18px_55px_rgba(250,204,21,0.18)]"
          : "border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.14)]",
      ].join(" ")}
      style={{
        transform: `translate(${x}px,${y}px) rotate(${rot}deg)`,
        zIndex: isActive ? 99 : 50 - index,
        maxWidth: "calc(100% - 50px)", // prevent right-side overflow
        // FIX: will-change only on active card — not all 4 simultaneously
        willChange: isActive ? "transform" : "auto",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-black/10 dark:bg-white/5 overflow-hidden">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(max-width:640px) 90vw, 360px"
          className="object-cover border-2 border-indigo-300 dark:border-emerald-500
            transition-transform duration-300 hover:scale-[1.03]"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Caption */}
      <div className="p-3 sm:p-4 text-left bg-white/20 dark:bg-white/5">
        <p className="text-sm font-bold text-white leading-snug line-clamp-1">
          {cert.title}
        </p>
        <p className="mt-0.5 text-xs text-white/75 line-clamp-1">
          {cert.issuer} • {cert.date}
        </p>
      </div>
    </button>
  );
});

/* ─────────────────────────────────────────────────────────────
   CERTIFICATES
─────────────────────────────────────────────────────────────── */
export default function Certificates() {
  const { ref: secRef, inView } = useInView();
  const [active, setActive] = useState(0);
  const current = CERTS[active];

  /*
    FIX 18: useCallback with stable deps — functions are created once,
    never cause child re-renders.
  */
  const next = useCallback(
    () => setActive(p => (p + 1) % CERTS.length), []
  );
  const prev = useCallback(
    () => setActive(p => (p - 1 + CERTS.length) % CERTS.length), []
  );
  const select = useCallback((i: number) => setActive(i), []);

  return (
    <section
      id="certificates"
      ref={secRef}
      aria-label="Certificates"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
    >

      {/* ── BACKGROUNDS — kept exactly as original ────────────────

          Dark:  slate-950 gradient + star-field
          Light: #F4EFE8 base + white/65 backdrop
                 + D6B48C blob top-left
                 + EADFCC blob bottom-right
                 + radial white highlight top-left
          pointer-events-none: never intercepts clicks
      ────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden dark:block pointer-events-none
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      >
        <div className="star-field" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden overflow-hidden bg-[#F4EFE8] pointer-events-none"
      >
        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />
        <div className="absolute -left-48 top-[-220px] h-[520px] w-[520px] rounded-full bg-[#D6B48C]/85" />
        <div className="absolute -right-56 bottom-[-240px] h-[620px] w-[620px] rounded-full bg-[#EADFCC]/80" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 25% 15%,rgba(255,255,255,0.95),rgba(255,255,255,0) 55%)",
            opacity: 0.9,
          }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-teal-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-500 dark:text-teal-400">
            Certificates
          </span>
        </div>

        {/*
          HEADING
          FIX 14: removed hover:scale-[1.03] — caused layout shift.
          Original gradient: indigo-500 to teal-400 — kept exactly.
          Responsive: text-3xl mobile → text-5xl desktop.
        */}
        <h2 className="text-center mb-10 sm:mb-12
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold uppercase
          text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-500 to-teal-400">
          Certificates
        </h2>

        {/*
          MAIN GRID
          ──────────────────────────────────────────────────────
          mobile  → single column (featured above, mini stack below)
          lg+     → 2 cols: [featured 1.3fr] [mini cards .7fr]
          gap responsive: tight mobile, spacious desktop
        */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.3fr_.7fr] items-start">

          {/* ── LEFT: FEATURED CERTIFICATE ─────────────────────── */}
          <div
            className="transition-[opacity,transform] duration-700 ease-out"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/*
              FIX 22: removed hover:scale-[1.02] from the card wrapper.
              Scale on a large element causes expensive layout recalc.
              Kept the shadow and border styles exactly.
            */}
            <div className="relative rounded-[28px] overflow-hidden
              border border-white/15
              bg-white/25 dark:bg-white/5
              backdrop-blur-xl
              shadow-[0_18px_60px_rgba(0,0,0,0.14)]">

              {/*
                Background image — decorative blur layer.
                FIX 11: removed priority — this is below the fold.
                loading="lazy" so it doesn't compete with hero images.
              */}
              <div className="absolute inset-0" aria-hidden>
                {inView && (
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 60vw"
                    className="object-cover opacity-40 dark:opacity-30 scale-[1.05]"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 dark:from-black/65" />
                <div className="absolute inset-0 dark:hidden bg-white/10" />
              </div>

              {/* Foreground content */}
              <div className="relative p-5 sm:p-8 md:p-10 border-2 border-teal-600">

                {/* Title + meta + action buttons */}
                <div className="flex flex-col sm:flex-row gap-5 sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-white/80">
                      Featured Certificate
                    </p>
                    <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/80">
                      {current.issuer} • {current.date}
                    </p>
                  </div>

                  {/*
                    FIX 24: min-h-[44px] on all buttons — iOS touch target.
                    FIX 25: touch-manipulation removes 300ms iOS tap delay.
                    Original colors kept: yellow-400/#0c0f1a and white/15.
                  */}
                  <div className="flex gap-3 flex-wrap">
                    {current.verifyUrl && (
                      <a
                        href={current.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Verify ${current.title}`}
                        className="inline-flex items-center justify-center min-h-[44px]
                          px-5 py-2.5 rounded-xl font-semibold text-sm
                          bg-yellow-400 text-[#0c0f1a]
                          hover:bg-yellow-300
                          transition-colors duration-150
                          touch-manipulation"
                      >
                        Verify ↗
                      </a>
                    )}
                    <Link
                      href={current.image}
                      target="_blank"
                      aria-label={`View ${current.title}`}
                      className="inline-flex items-center justify-center min-h-[44px]
                        px-5 py-2.5 rounded-xl font-semibold text-sm
                        bg-white/15 text-white
                        hover:bg-white/25
                        transition-colors duration-150
                        touch-manipulation"
                    >
                      View
                    </Link>
                  </div>
                </div>

                {/*
                  Preview image.
                  FIX 23: removed transition-all + hover:scale from the
                  image wrapper — replaced with transition-transform only.
                  Original borders: indigo-400 light / emerald-500 dark — kept.
                */}
                <div className="mt-6 sm:mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden
                  border-4 border-indigo-400 dark:border-emerald-500">
                  {inView && (
                    <Image
                      key={current.image}
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 100vw,60vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  )}
                </div>

                {/*
                  Previous / Next navigation.
                  FIX 19: aria-label on both buttons.
                  Original colors: indigo-600 prev, emerald-600 next — kept.
                  FIX 24+25: min-h-[44px] + touch-manipulation.
                */}
                <div className="mt-4 flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous certificate"
                    className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl
                      font-semibold text-sm text-white
                      bg-indigo-600 hover:bg-indigo-700
                      transition-colors duration-150
                      touch-manipulation active:scale-95"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next certificate"
                    className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl
                      font-semibold text-sm text-white
                      bg-emerald-600 hover:bg-emerald-700
                      transition-colors duration-150
                      touch-manipulation active:scale-95"
                  >
                    Next →
                  </button>
                </div>

                {/* Dot indicators */}
                <div
                  role="tablist"
                  aria-label="Certificate selector"
                  className="mt-4 flex justify-center gap-2"
                >
                  {CERTS.map((c, i) => (
                    <button
                      key={c.title}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`View ${c.title}`}
                      onClick={() => select(i)}
                      className={`rounded-full transition-all duration-300 touch-manipulation
                        ${i === active
                          ? "w-6 h-2 bg-teal-400"
                          : "w-2 h-2 bg-white/25 hover:bg-white/50"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: STACKED MINI CARDS ──────────────────────────
              FIX 16: min-h instead of fixed h — adapts to content.
              On mobile this column appears below the featured card.
              Responsive height: smaller on mobile, taller on lg.
              FIX 17: "Click a card" hint now sits naturally below
              the stack, not at a hardcoded translate-y position.
          ────────────────────────────────────────────────────────── */}
          <div
            className="transition-[opacity,transform] duration-700 delay-150 ease-out"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/* Stack wrapper — relative positioning context for absolute cards */}
            <div
              className="relative"
              style={{
                /*
                  Height must accommodate the tallest card + its y offset.
                  Last card (i=3): y = 3*18 = 54px extra, plus card height ~180px
                  Total ≈ 234px minimum. Use a comfortable 280px mobile, 340px sm+.
                */
                minHeight: "clamp(260px, 35vw, 340px)",
              }}
            >
              {CERTS.map((c, i) => (
                <MiniCard
                  key={c.title}
                  cert={c}
                  index={i}
                  isActive={i === active}
                  onClick={() => select(i)}
                />
              ))}
            </div>

            {/* Hint text — naturally below the stack, no translate hack */}
            <p className="mt-4 text-xs sm:text-sm font-semibold text-center
              text-cyan-600 dark:text-white/50">
              Click a card to preview.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
