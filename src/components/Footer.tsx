// src/components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 sm:mt-16 overflow-hidden">
      {/* DARK MODE background (from second style) */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[#011222]/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_2px)] bg-[length:2px_2px] opacity-40" />
      </div>

      {/* LIGHT MODE background (from second style, responsive like first) */}
      <div className="absolute inset-0 -z-10 dark:hidden overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(233,221,210,0.7)] backdrop-blur-xl" />

        {/* Right-top silver circle */}
        <div
          className="
            absolute right-[-50px] sm:right-[-80px] top-[-40px] sm:top-[-60px]
            h-[160px] sm:h-[220px] w-[160px] sm:w-[220px]
            rounded-full bg-slate-300 backdrop-blur-sm pointer-events-none
          "
        />

        {/* Left-bottom gold circle */}
        <div
          className="
            absolute left-[-40px] sm:left-[-60px] bottom-[-40px] sm:bottom-[-60px]
            h-[180px] sm:h-[260px] w-[180px] sm:w-[260px]
            rounded-full bg-[#D6B48C] backdrop-blur-sm pointer-events-none
          "
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 relative">
        {/* FIRST layout structure (better responsive behavior) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 lg:gap-12">
          
          {/* LEFT SIDE */}
          <div className="flex-1 min-w-0">
            <h2 className="flex flex-wrap items-center gap-1 text-3xl sm:text-4xl md:text-5xl font-extrabold">
              <span className="text-2xl sm:text-3xl font-sans text-indigo-700 uppercase tracking-tight drop-shadow-lg">
                G
              </span>
              <span className="text-2xl sm:text-3xl font-sans text-indigo-700 lowercase tracking-tight">
                e
              </span>
              <span className="text-2xl sm:text-3xl font-sans text-indigo-700 lowercase tracking-tight">
                me
              </span>
              <span className="text-2xl sm:text-3xl font-sans text-indigo-700 lowercase tracking-tight">
                chis
              </span>
              <span className="text-lg sm:text-xl font-handwriting text-amber-700 italic ml-1 sm:ml-2">
                ©
              </span>
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 italic font-bold leading-relaxed text-sm sm:text-base">
              <p className="text-sky-600 dark:text-white">Code with intent.</p>
              <span className="hidden sm:inline text-teal-500">•</span>
              <p className="text-sky-700 dark:text-slate-300">Built to speak.</p>
              <span className="hidden sm:inline text-teal-600">•</span>
              <p className="text-blue-700 dark:text-[#FFD700]">Built to last.</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 min-w-0 flex flex-col items-start md:items-end gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              © {year} Gemechis. All rights reserved.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/privacy"
                className="
                  inline-flex justify-center items-center
                  rounded-lg px-5 py-2.5 text-sm sm:text-base font-medium
                  border-2 border-gray-600
                  bg-sky-600 text-white
                  transition-all duration-300 ease-in-out
                  hover:bg-black/10 hover:scale-105 hover:border-yellow-400 hover:text-yellow-300
                  dark:bg-transparent dark:border-indigo-400/30 dark:text-slate-200
                  dark:hover:bg-indigo-500 dark:hover:text-yellow-400 dark:hover:scale-105
                  active:scale-95
                  min-w-[100px]
                "
              >
                Privacy
              </Link>

              <Link
                href="/policy"
                className="
                  inline-flex justify-center items-center
                  rounded-lg px-5 py-2.5 text-sm sm:text-base font-medium
                  border-2 border-gray-600
                  bg-sky-600 text-white
                  transition-all duration-300 ease-in-out
                  hover:bg-black/10 hover:scale-105 hover:border-yellow-400 hover:text-yellow-300
                  dark:bg-transparent dark:border-indigo-400/30 dark:text-slate-200
                  dark:hover:bg-indigo-500 dark:hover:text-yellow-400 dark:hover:scale-105
                  active:scale-95
                  min-w-[100px]
                "
              >
                Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-black/10 dark:bg-white/10" />
      </div>
    </footer>
  );
}
