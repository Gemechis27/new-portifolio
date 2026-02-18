// src/components/About.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Github, Briefcase, Linkedin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative px-4 py-20">
      {/* ✅ Dark mode background (keep black) */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[#111827]" />

      {/* ✅ Light mode background: milky + half-circle cream on LEFT */}
      <div className="absolute inset-0 -z-10 dark:hidden overflow-hidden">
        {/* base milky */}
        <div className="absolute inset-0
         bg-[rgba(233,221,210,0.55)] backdrop-blur-xl" />

        {/* half circle on left */}
        <div
          className="absolute -left-50 top-1/6 -translate-y-1/2 w-[500px] h-[560px] rounded-full bg-amber-100"
          style={{ background: "#8A745E", opacity: 100 }} 
        />

        {/* soft highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.80), rgba(255,255,255,0) 55%)",
            opacity: 0.9,
          }}
        />

        {/* subtle top glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))",
            opacity: 0.8,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 flex-wrap">
          {/* ✅ Image Wrap (same hover pop) */}
          <div className="flex justify-center items-center w-[280px] h-[280px] rounded-3xl p-[6px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #0a66c2, #14b8a6)",
              boxShadow:
                "0 0 15px rgba(99, 102, 241, 0.30), 0 0 30px rgba(14, 165, 233, 0.20), 0 0 40px rgba(20, 184, 166, 0.30)",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* put your about image in /public/about.jpg */}
              <Image
                src="/images/myport.jpg"
                alt="About Me"
                fill
                sizes="280px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* ✅ Content */}
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 
                           text-transparent bg-clip-text
                           bg-gradient-to-r from-indigo-500 to-teal-400
                           transition duration-300 hover:scale-[1.03] inline-block translate-x-50">
              About Me
            </h2>

            <p className="mb-5 leading-8 font-bold text-[1.2rem] font-semibold text-teal-600 dark:text-white/95">
              I&apos;m I build scalable, production-ready web applications using React, Next.js, Node.js, and AWS. With a strong foundation in cloud architecture and modern UI engineering (Tailwind CSS),
               I focus on performance, clean design, and real-world problem solving.
            </p>

            <p className="mb-5 leading-8 text-[1.2rem] font-semibold text-teal-600 dark:text-white/95">
              Outside of coding, I enjoy hiking, reading sci-fi, and cooking. I&apos;m always eager to learn
              and adapt to new technologies in the web development world.
            </p>

            {/* ✅ Highlights */}
            <ul className="mt-10 mb-10 flex flex-col items-start gap-4 p-0">
              <li className="max-w-[250px] w-full bg-teal-600 dark:bg-gray-500 text-white dark:text-white
                             border-l-16 border-indigo-500 rounded-3xl px-4 py-3 font-semibold
                             transition duration-300 cursor-pointer
                             hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,70,229,0.30)]">
                <a href="#experience" className=" translate-x-6 text-xl block w-full h-full no-underline">
                  + Freelancer
                </a>
              </li>

              <li className="max-w-[250px] w-full bg-teal-600 dark:bg-gray-500 text-white dark:text-white
                             border-l-16 border-indigo-500 rounded-3xl px-4 py-3 font-semibold
                             transition duration-300 cursor-pointer
                             hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,70,229,0.30)]">
                <Link href="/projects" className="block w-full h-full text-xl no-underline translate-x-6">
                  10+ Projects
                </Link>
              </li>

              <li className="max-w-[250px] w-full bg-teal-600 dark:bg-gray-500 text-white dark:text-white
                             border-l-16 border-indigo-600 rounded-3xl px-4 py-3 font-semibold
                             transition duration-300 cursor-pointer
                             hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,70,229,0.30)]">
                <Link href="/testimonials" className=" text-xl block w-full h-full no-underline translate-x-6">
                  5+ Clients
                </Link>
              </li>
              
            </ul>

            {/* ✅ Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/game_portifolio.pdf"
                download
                className="px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2
                           bg-indigo-600 text-white hover:bg-indigo-500 transition transform duration-300 ease-in-out
                           hover:scale-105 hover:shadow-lg"
              >
                Download CV <Download className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/gemechis27"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2
                           bg-slate-900 text-white hover:bg-slate-800 transition
                           dark:bg-slate-800 dark:hover:bg-slate-700 transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                GitHub <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.upwork.com/freelancers/~0184af4ed85eb13995?viewMode=1"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2
                           bg-teal-500 text-white hover:bg-teal-600 transition transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Upwork <Briefcase className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/gemechismulisa"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2
                           bg-[#0a66c2] text-white hover:bg-[#004182] transition transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                LinkedIn <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
