// src/components/About.tsx
"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import { Download, Github, Briefcase, Linkedin, MapPin } from "lucide-react";

const HIGHLIGHTS = [
  { label: "+ Freelancer",  href: "#contact"      },
  { label: "10+ Projects",  href: "#projects"     },
  { label: "5+ Clients",    href: "#testimonials" },
] as const;

// ✅ Fix: use a single consistent type — both fields optional with defaults
type Action = {
  href:     string;
  label:    string;
  Icon:     React.FC<{ className?: string; "aria-hidden"?: boolean | "true" }>;
  cls:      string;
  download?: boolean;  // ✅ optional, not in a union
  external?: boolean;  // ✅ optional, not in a union
};

const ACTIONS: Action[] = [
  { href: "/game_portifolio.pdf",                                               download: true,  label: "Download CV", Icon: Download,  cls: "bg-indigo-600 hover:bg-indigo-500 border-indigo-500/40"  },
  { href: "https://github.com/gemechis27",                                      external: true,  label: "GitHub",      Icon: Github,    cls: "bg-[#24292e]  hover:bg-[#1a1e21]  border-white/10"       },
  { href: "https://www.upwork.com/freelancers/~0184af4ed85eb13995?viewMode=1",  external: true,  label: "Upwork",      Icon: Briefcase, cls: "bg-[#14a800]  hover:bg-[#0e8200]  border-[#14a800]/40"   },
  { href: "https://www.linkedin.com/in/gemechismulisa",                         external: true,  label: "LinkedIn",    Icon: Linkedin,  cls: "bg-[#0a66c2]  hover:bg-[#004182]  border-[#0a66c2]/40"   },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const Avatar = memo(function Avatar() {
  return (
    <div className="relative mx-auto md:mx-0 flex-shrink-0 w-full max-w-[220px] sm:max-w-[260px] md:w-[280px] md:max-w-none">
      <div
        className="relative flex items-center justify-center w-full aspect-square rounded-3xl p-[6px] transition-transform duration-300 hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg,#0a66c2,#14b8a6)",
          boxShadow: "0 0 15px rgba(99,102,241,0.28),0 0 30px rgba(14,165,233,0.18),0 0 40px rgba(20,184,166,0.25)",
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/myport.webp"
            alt="Gemechis Mulisa — Fullstack Developer"
            fill
            sizes="(max-width:640px) 220px,(max-width:768px) 260px,280px"
            className="object-cover"
            loading="lazy"
            priority={false}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div
            aria-label="Status: Available for work"
            className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white select-none pointer-events-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            Available for work
          </div>
        </div>
      </div>

      {([
        { value: "10+", label: "Projects", pos: "-top-3 -right-3 sm:-top-4 sm:-right-5"            },
        { value: "5+",  label: "Clients",  pos: "top-1/2 -translate-y-1/2 -right-3 sm:-right-6"   },
        { value: "2+",  label: "Yrs Exp",  pos: "-bottom-3 -right-3 sm:-bottom-4 sm:-right-5"     },
      ] as const).map(({ value, label, pos }) => (
        <div
          key={label}
          aria-label={`${value} ${label}`}
          className={`absolute ${pos} hidden sm:flex flex-col items-center justify-center w-[52px] h-[52px] rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_8px_24px_rgba(0,0,0,0.45)] text-white`}
        >
          <span className="text-sm font-black text-teal-400 leading-none">{value}</span>
          <span className="text-[9px] text-white/45 mt-0.5 font-medium leading-none">{label}</span>
        </div>
      ))}
    </div>
  );
});

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" aria-label="About me" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 hidden dark:block bg-[#111827]" />
      <div aria-hidden className="absolute inset-0 -z-10 dark:hidden overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(233,221,210,0.55)] backdrop-blur-xl" />
        <div
          className="absolute -left-48 top-1/4 -translate-y-1/2 w-[420px] h-[480px] sm:w-[500px] sm:h-[560px] rounded-full pointer-events-none"
          style={{ background: "#8A745E" }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 20%,rgba(255,255,255,0.80),rgba(255,255,255,0) 55%)", opacity: 0.9 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0))", opacity: 0.8 }} />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8 sm:mb-10 md:mb-12">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-teal-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-500 dark:text-teal-400">About Me</span>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <div
            className="w-full flex justify-center md:block md:w-auto transition-[opacity,transform] duration-700 ease-out"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)" }}
          >
            <Avatar />
          </div>

          <div
            className="flex-1 w-full min-w-0 transition-[opacity,transform] duration-700 delay-[120ms] ease-out"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 inline-block">
              About Me
            </h2>

            <p className="mb-4 leading-7 sm:leading-8 text-base sm:text-[17px] font-semibold text-teal-700 dark:text-white/90">
              I build scalable, production-ready web applications using React, Next.js, Node.js, and AWS. With a strong
              foundation in cloud architecture and modern UI engineering (Tailwind CSS), I focus on performance, clean
              design, and real-world problem solving.
            </p>

            <p className="mb-5 leading-7 text-sm sm:text-base font-medium text-teal-600 dark:text-white/70">
              Outside of coding, I enjoy hiking, reading sci-fi, and cooking. I&apos;m always eager to learn and adapt
              to new technologies in the web development world.
            </p>

            <div className="flex items-center gap-1.5 mb-7 text-sm text-teal-500/70 dark:text-white/35">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Addis Ababa, Ethiopia</span>
            </div>

            <ul className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 sm:mb-9 p-0 list-none">
              {HIGHLIGHTS.map(({ label, href }) => (
                <li key={label} className="flex">
                  <a
                    href={href}
                    className="flex items-center min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-3xl text-base font-semibold text-white bg-teal-600 dark:bg-gray-500 border-l-[6px] border-indigo-500 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(79,70,229,0.28)] active:scale-[0.97] touch-manipulation select-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {ACTIONS.map(({ href, download, external, label, Icon, cls }) => (
                <a
                  key={label}
                  href={href}
                  // ✅ spread conditionally — only adds the attribute when truthy
                  {...(download ? { download: true } : {})}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={label}
                  className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform duration-150 hover:scale-105 active:scale-95 touch-manipulation select-none ${cls}`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
