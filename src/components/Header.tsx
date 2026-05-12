// src/components/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Sun, Moon, Menu, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA — module level, zero reallocation per render
─────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home",         href: "#home"         },
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Certificates", href: "#certificates" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact"      },
] as const;

// Framer reads these by reference — inline objects = new object every render
const SPRING     = { type: "spring", stiffness: 500, damping: 26 } as const;
const DWR_SPRING = { type: "spring", stiffness: 340, damping: 36 } as const;

/* ─────────────────────────────────────────────────────────────
   LOGO
   memo → only re-renders when `scrolled` changes
─────────────────────────────────────────────────────────────── */
const GMLogo = React.memo(function GMLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="relative h-full w-full grid place-items-center rounded-xl overflow-hidden">
      <div className={`absolute inset-0 rounded-xl
        bg-gradient-to-br from-teal-400 via-indigo-500 to-violet-600
        transition-opacity duration-300
        ${scrolled ? "opacity-90" : "opacity-55"}`}
      />
      <div className="absolute inset-[1.5px] rounded-[10px] bg-[#020817]" />
      <span className="relative font-black select-none text-[15px] tracking-tight leading-none">
        <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">G</span>
        <span className="bg-gradient-to-b from-teal-300 to-teal-500 bg-clip-text text-transparent">M</span>
      </span>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
   DESKTOP NAV LINK
   memo → only re-renders when THIS link's active state changes
─────────────────────────────────────────────────────────────── */
const NavLink = React.memo(function NavLink({
  href, label, active,
}: { href: string; label: string; active: boolean }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      transition={SPRING}
      className={`group relative text-[13px] font-semibold whitespace-nowrap
        transition-colors duration-150
        ${active ? "text-teal-400" : "text-white/55 hover:text-white"}`}
    >
      {label}
      {/* CSS transform only — compositor thread, no layout recalc */}
      <span className={`absolute left-0 -bottom-[3px] h-[1.5px] w-full rounded-full
        bg-gradient-to-r from-teal-400 to-indigo-500 origin-left
        transition-transform duration-200
        ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </motion.a>
  );
});

/* ─────────────────────────────────────────────────────────────
   HEADER
─────────────────────────────────────────────────────────────── */
export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted,  setMounted]  = React.useState(false);
  const [isOpen,   setIsOpen]   = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active,   setActive]   = React.useState("#home");

  // Hydration guard — avoids SSR/client mismatch on theme-dependent icons
  React.useEffect(() => setMounted(true), []);

  // passive:true — never blocks the scroll thread on mobile
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // IntersectionObserver — fires only on threshold cross, not every px
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(href); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Scroll lock — cleanup on unmount so it can never get stuck
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Stable callbacks — created once, never cause child re-renders
  const openMenu    = React.useCallback(() => setIsOpen(true),  []);
  const closeMenu   = React.useCallback(() => setIsOpen(false), []);
  const toggleTheme = React.useCallback(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    [resolvedTheme, setTheme]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── NAVBAR BAR ──────────────────────────────────────────── */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl border backdrop-blur-xl overflow-hidden
              transition-[background,border-color,box-shadow] duration-300
              ${scrolled
                ? "bg-[#020817]/92 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
                : "bg-[#020817]/60 border-white/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.3)]"
              }`}
          >
            
            <div className="flex items-center
              px-3 sm:px-4 md:px-5
              py-2.5 sm:py-3
              gap-2 sm:gap-3
              overflow-hidden">

              {/* ── LOGO ── always left, always visible ─────────── */}
              <Link
                href="#home"
                prefetch={false}
                onClick={closeMenu}
                className="flex items-center gap-2 sm:gap-2.5 shrink-0 group"
              >
                <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl">
                  <GMLogo scrolled={scrolled} />
                </div>
               
                <span className="text-[13px] sm:text-sm lg:text-[15px] font-bold
                  tracking-wide text-white truncate
                  max-w-[88px] sm:max-w-[160px] md:max-w-[140px] lg:max-w-none
                  group-hover:text-teal-300 transition-colors duration-150">
                  Gemechis Mulisa
                </span>
              </Link>

            
              <nav
                aria-label="Main navigation"
                className="hidden md:flex items-center gap-3 lg:gap-5
                  flex-1 justify-center min-w-0 overflow-hidden"
              >
                {NAV_ITEMS.map(item => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={active === item.href}
                  />
                ))}
              </nav>

              
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-fit">

                {/* GitHub — lg+ only, needs mounted guard for hydration */}
                {mounted && (
                  <motion.a
                    href="https://github.com/Gemechis27"
                    target="_blank" rel="noreferrer"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.07, y: -1 }}
                    whileTap={{ scale: 0.94 }}
                    transition={SPRING}
                    className="hidden lg:grid h-9 w-9 rounded-xl border place-items-center
                      border-white/10 bg-white/[0.05] text-white/60
                      hover:text-white hover:border-white/20 hover:bg-white/10
                      transition-colors duration-150"
                  >
                    <Github className="h-4 w-4" />
                  </motion.a>
                )}

                {/* LinkedIn — lg+ only, needs mounted guard for hydration */}
                {mounted && (
                  <motion.a
                    href="https://www.linkedin.com/in/gemechismulisa"
                    target="_blank" rel="noreferrer"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.07, y: -1 }}
                    whileTap={{ scale: 0.94 }}
                    transition={SPRING}
                    className="hidden lg:grid h-9 w-9 rounded-xl border place-items-center
                      border-blue-500/30 bg-blue-500/10 text-blue-400
                      hover:bg-blue-500/20 hover:border-blue-400/50
                      transition-colors duration-150"
                  >
                    <Linkedin className="h-4 w-4" />
                  </motion.a>
                )}

                
                <motion.button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  whileHover={{ scale: 1.07, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING}
                  className="h-9 w-9 rounded-xl border grid place-items-center shrink-0
                    border-white/10 bg-white/[0.05] text-white/60
                    hover:text-white hover:border-white/20 hover:bg-white/10
                    transition-colors duration-150"
                >
                  {mounted && (
                    resolvedTheme === "dark"
                      ? <Sun  className="h-[17px] w-[17px] text-amber-300" />
                      : <Moon className="h-[17px] w-[17px] text-indigo-300" />
                  )}
                </motion.button>

                {/*
                  ── HAMBURGER ──────────────────────────────────────
                
                */}
                <button
                  type="button"
                  onClick={openMenu}
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                  aria-controls="mobile-drawer"
                  className="lg:hidden h-9 w-9 rounded-xl border grid place-items-center shrink-0
                    border-white/10 bg-white/[0.05] text-white/70
                    hover:text-white hover:border-white/20 hover:bg-white/10
                    active:scale-95
                    transition-[color,border-color,background-color,transform]
                    duration-150 touch-manipulation"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE / TABLET DRAWER ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
      
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeMenu}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            />

            {/*
              Drawer panel
              ────────────────────────────────────────────────────────
             
            */}
            <motion.div
              id="mobile-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0,       opacity: 1 }}
              exit={{ x: "-100%",    opacity: 0 }}
              transition={DWR_SPRING}
              className="fixed top-3 left-3 z-50 flex flex-col
                w-[min(80vw,300px)] max-h-[92dvh]
                rounded-2xl border border-white/10
                bg-[#020817]/98 backdrop-blur-2xl
                shadow-[0_24px_80px_rgba(0,0,0,0.75)]
                will-change-transform overflow-hidden"
            >
              {/* gradient accent top bar */}
              <div className="h-[2px] w-full shrink-0
                bg-gradient-to-r from-teal-400 via-indigo-500 to-violet-600" />

              <div className="flex flex-col flex-1 overflow-y-auto p-4 sm:p-5">

                {/* drawer header */}
                <div className="flex items-center justify-between mb-5 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 relative rounded-lg overflow-hidden">
                      <GMLogo scrolled />
                    </div>
                    <span className="text-xs font-bold text-white/50
                      tracking-[0.18em] uppercase">
                      Navigation
                    </span>
                  </div>
                  {/*
                    FIX: plain <button> here too — same iOS Safari reason.
                    Close button must be reliable on first tap.
                  */}
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="h-8 w-8 rounded-xl grid place-items-center
                      border border-white/10 bg-white/5 text-white/50
                      hover:bg-red-500/15 hover:border-red-500/25 hover:text-red-400
                      active:scale-95
                      transition-[color,border-color,background-color,transform]
                      duration-150 touch-manipulation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                 <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
                  {NAV_ITEMS.map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3
                        px-3 py-[11px] rounded-xl
                        text-[13px] sm:text-sm font-semibold
                        transition-colors duration-150
                        active:scale-[0.98] touch-manipulation select-none
                        ${active === item.href
                          ? "text-teal-400 bg-teal-500/10 border border-teal-500/20"
                          : "text-white/60 hover:text-white hover:bg-white/[0.05] border border-transparent"
                        }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0
                        ${active === item.href ? "bg-teal-400" : "bg-white/15"}`}
                      />
                      {item.label}
                      {active === item.href && (
                        <span className="ml-auto text-teal-400/50 text-[10px]">●</span>
                      )}
                    </a>
                  ))}
                </nav>

                {/* push footer to bottom */}
                <div className="flex-1 min-h-4" />

                {/* social footer — GitHub/LinkedIn accessible on mobile */}
                <div className="pt-4 border-t border-white/[0.07]
                  flex items-center gap-2 shrink-0">
                  <a
                    href="https://github.com/Gemechis27"
                    target="_blank" rel="noreferrer"
                    aria-label="GitHub"
                    className="h-9 w-9 rounded-xl grid place-items-center
                      border border-white/10 bg-white/[0.04]
                      text-white/55 hover:text-white hover:bg-white/10
                      transition-colors duration-150 touch-manipulation"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gemechismulisa"
                    target="_blank" rel="noreferrer"
                    aria-label="LinkedIn"
                    className="h-9 w-9 rounded-xl grid place-items-center
                      border border-blue-500/25 bg-blue-500/[0.08]
                      text-blue-400 hover:bg-blue-500/15 hover:border-blue-400/40
                      transition-colors duration-150 touch-manipulation"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <div className="flex-1" />
                  <span className="text-[10px] text-white/15 font-mono tracking-wider">
                    GM · 2025
                  </span>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
