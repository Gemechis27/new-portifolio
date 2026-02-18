// src/components/header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Sun, Moon, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function GMLogo({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative h-full w-full grid place-items-center border-2 border-emerald-600">
      <span className="font-extrabold select-none" style={{ fontSize: 20 }}>
        <span
          style={{
            background: "linear-gradient(180deg,#ffffff,#d4d4d4,#9a9a9a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          G
        </span>
        <span
          style={{
            background: "linear-gradient(180deg,#fff3b0,#f7c948,#c69300)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: 1,
          }}
        >
          M
        </span>
      </span>
    </div>
  );
}

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className={[
            "rounded-2xl border backdrop-blur-2xl",
            isDark
              ? "shadow-[0_22px_80px_rgba(0,0,0,0.55)]"
              : "shadow-[0_18px_60px_rgba(15,23,42,0.12)]",
            isDark ? "bg-gray-200 border-white" : "bg-lime-400 border-lime-900 border-2",
          ].join(" ")}
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 28%, rgba(10,12,16,0.70) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(245,246,248,0.72) 55%, rgba(235,238,244,0.66) 100%)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-3 gap-6">

            {/* LEFT: Hamburger (mobile only) */}
            <div className="flex items-center gap-3 md:hidden shrink-0">
              <motion.button
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 22 }}
                onClick={() => setIsOpen(true)}
                className={[
                  "h-10 w-10 rounded-xl border grid place-items-center",
                  isDark ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-slate-950",
                ].join(" ")}
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Logo + Name */}
            <Link href="#home" className="flex items-center gap-3 min-w-0">
              <motion.div
                whileHover={{ scale: 1.09, y: -1 }}
                className={[
                  "relative h-10 w-10 rounded-xl grid place-items-center border overflow-hidden shrink-0",
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/15",
                ].join(" ")}
              >
                <GMLogo isDark={isDark} />
              </motion.div>

              <span
                className={[
                  "text-base sm:text-lg font-bold tracking-wide truncate",
                  isDark ? "text-white hover:text-amber-300" : "text-slate-950 hover:text-slate-900",
                ].join(" ")}
              >
                Gemechis Mulisa
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -1, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 520, damping: 24 }}
                  className={[
                    "group relative text-sm font-bold",
                    isDark ? "text-white hover:text-amber-300" : "text-slate-950 hover:text-amber-400",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "absolute left-0 -bottom-2 h-[2px] w-full scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100",
                      isDark ? "bg-amber-300" : "bg-slate-950",
                    ].join(" ")}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.a
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 22 }}
                href="https://github.com/Gemechis27"
                target="_blank"
                className={[
                  "h-10 w-10 rounded-xl border grid place-items-center",
                  isDark ? "bg-white/15 border-white/20 text-white" : "bg-black/15 border-black/20 text-slate-950",
                ].join(" ")}
              >
                <Github className="h-5 w-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 22 }}
                href="https://www.linkedin.com/in/gemechismulisa"
                target="_blank"
                className="h-10 w-10 rounded-xl border grid place-items-center bg-blue-500 text-white"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 22 }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={[
                  "h-10 w-10 rounded-xl border grid place-items-center",
                  isDark ? "bg-white border-white/20 text-black" : "bg-black border-black/20 text-white",
                ].join(" ")}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SMALL WIDTH DRAWER (NOT FULL SCREEN) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={[
                "fixed top-4 left-4 z-50 h-[85vh] w-64 rounded-2xl border backdrop-blur-2xl p-6",
                isDark
                  ? "shadow-[0_22px_80px_rgba(0,0,0,0.55)] border-white"
                  : "shadow-[0_18px_60px_rgba(15,23,42,0.12)] border-lime-900 border-2",
              ].join(" ")}
              style={{
                background: isDark
                  ? "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(10,12,16,0.85) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(235,238,244,0.85) 100%)",
              }}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-lg bg-red-500 text-white grid place-items-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold hover:translate-x-1 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
