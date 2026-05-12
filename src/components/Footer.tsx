// src/components/Footer.tsx


import React from "react";
import Link from "next/link";


const YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { label: "Home",         href: "#home"         },
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact",      href: "#contact"      },
] as const;

/* ─────────────────────────────────────────────────────────────
   FOOTER
─────────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden"
    >

      

      {/* Dark mode */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden dark:block bg-[#011222]/80 pointer-events-none"
      >
        <div className="absolute inset-0
          bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_2px)]
          bg-[length:2px_2px] opacity-40"
        />
      </div>

      {/* Light mode */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-[rgba(233,221,210,0.7)] backdrop-blur-xl" />

        {/* Silver circle — top right */}
        <div className="absolute right-[-50px] sm:right-[-80px] top-[-40px] sm:top-[-60px]
          h-[160px] sm:h-[220px] w-[160px] sm:w-[220px]
          rounded-full bg-slate-300 pointer-events-none"
        />

        {/* Gold circle — bottom left */}
        <div className="absolute left-[-40px] sm:left-[-60px] bottom-[-40px] sm:bottom-[-60px]
          h-[180px] sm:h-[260px] w-[180px] sm:w-[260px]
          rounded-full bg-[#D6B48C] pointer-events-none"
        />
      </div>

      {/* ── TOP GRADIENT BORDER — consistent with other sections ── */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r
          from-transparent via-sky-400/40 dark:via-indigo-400/25 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 relative">

        <div className="flex flex-col md:flex-row
          justify-between items-start md:items-center
          gap-6 md:gap-8 lg:gap-12">

          {/* ── LEFT: LOGO + TAGLINE ─────────────────────────────── */}
          <div className="flex-1 min-w-0">

          
            <p className="text-2xl sm:text-3xl font-extrabold font-sans
              tracking-tight text-indigo-700 uppercase"
              aria-label="Gemechis Mulisa"
            >
              Gemechis{" "}
              <span
                className="text-amber-700 italic normal-case font-bold text-lg sm:text-xl"
                aria-hidden
              >
                ©
              </span>
            </p>

            
            <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-1.5
              italic font-bold leading-relaxed text-sm sm:text-base">
              <span className="text-sky-600 dark:text-white">
                Code with intent.
              </span>
              <span aria-hidden className="text-teal-500 hidden sm:inline">•</span>
              <span className="text-sky-700 dark:text-slate-300">
                Built to speak.
              </span>
              <span aria-hidden className="text-teal-600 hidden sm:inline">•</span>
              <span className="text-blue-700 dark:text-[#FFD700]">
                Built to last.
              </span>
            </div>
          </div>

          {/* ── RIGHT: NAV + COPYRIGHT ───────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col
            items-start md:items-end gap-4 sm:gap-5">

            
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-xs sm:text-sm font-semibold
                        text-slate-600 dark:text-slate-400
                        hover:text-indigo-700 dark:hover:text-indigo-300
                        transition-colors duration-150
                        touch-manipulation"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            
            <p className="text-xs sm:text-sm font-bold
              text-slate-900 dark:text-slate-100">
              © {YEAR} Gemechis Mulisa. All rights reserved.
            </p>
          </div>
        </div>

        
        <div
          aria-hidden
          className="mt-7 sm:mt-8 h-px w-full bg-black/10 dark:bg-white/10"
        />

        {/* ── BOTTOM ROW: legal + built-with ──────────────────────── */}
        <div className="mt-4 flex flex-col sm:flex-row
          items-start sm:items-center justify-between
          gap-3 sm:gap-4">

          <div className="flex flex-wrap gap-3">
            <Link
              href="https://github.com/Gemechis27"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center justify-center
                rounded-lg px-4 py-2 text-xs sm:text-sm font-medium
                border-2 border-gray-600
                bg-sky-600 text-white
                hover:bg-black/10 hover:scale-105
                hover:border-yellow-400 hover:text-yellow-300
                dark:bg-transparent dark:border-indigo-400/30 dark:text-slate-200
                dark:hover:bg-indigo-500 dark:hover:text-yellow-400 dark:hover:scale-105
                active:scale-95
                transition-[background-color,border-color,color,transform] duration-200
                touch-manipulation"
            >
              GitHub
            </Link>

            <Link
              href="https://linkedin.com/in/gemechismulisa"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center justify-center
                rounded-lg px-4 py-2 text-xs sm:text-sm font-medium
                border-2 border-gray-600
                bg-sky-600 text-white
                hover:bg-black/10 hover:scale-105
                hover:border-yellow-400 hover:text-yellow-300
                dark:bg-transparent dark:border-indigo-400/30 dark:text-slate-200
                dark:hover:bg-indigo-500 dark:hover:text-yellow-400 dark:hover:scale-105
                active:scale-95
                transition-[background-color,border-color,color,transform] duration-200
                touch-manipulation"
            >
              LinkedIn
            </Link>
          </div>

          {/* Built-with badge */}
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-white/20
            font-medium tracking-wide">
            Built with{" "}
            <span className="text-sky-600 dark:text-indigo-400 font-semibold">
              Next.js
            </span>{" "}+{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              Tailwind CSS
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
