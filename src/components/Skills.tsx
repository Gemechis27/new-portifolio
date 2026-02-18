"use client";

import React, { useEffect, useState } from "react";
// ✅ Add Font Awesome CSS import here
import "@fortawesome/fontawesome-free/css/all.min.css";

function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div className="mb-6 w-full">
      <div className="mb-1 flex justify-between font-semibold text-gray-700 dark:text-gray-300">
        <span>{label}</span>
        <span>{level}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-in-out
                     bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400
                     shadow-[0_0_10px_#4f46e5,0_0_20px_#14b8a6]"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [levels, setLevels] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const targetLevels = [95, 90, 85, 80, 85, 90, 88, 92];
          targetLevels.forEach((val, i) => {
            setTimeout(() => {
              setLevels((prev) => {
                const updated = [...prev];
                updated[i] = val;
                return updated;
              });
            }, i * 300);
          });

          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 text-center overflow-hidden min-h-screen"
    >
      {/* Dark stars like Home section */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="star-field" />
      </div>

      {/* Light mode background */}
      <div className="absolute inset-0 -z-10 dark:hidden bg-[#fefefe]">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <h2
          className="mb-12 text-4xl md:text-5xl font-extrabold uppercase
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400
                     transition duration-300 hover:scale-[1.03]"
        >
          My Skills
        </h2>

        {/* Skill bars */}
        <div className="flex flex-col md:flex-row gap-10 justify-center text-left">
          <div className="flex-1 min-w-[280px]">
            <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-200">
              Technical Skills
            </h3>
            <SkillBar label="HTML/CSS" level={levels[0]} />
            <SkillBar label="JavaScript" level={levels[1]} />
            <SkillBar label="React" level={levels[2]} />
            <SkillBar label="Vue.js" level={levels[3]} />
          </div>

          <div className="flex-1 min-w-[280px]">
            <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-200">
              Professional Skills
            </h3>
            <SkillBar label="UI/UX Design" level={levels[4]} />
            <SkillBar label="Communication" level={levels[5]} />
            <SkillBar label="Teamwork" level={levels[6]} />
            <SkillBar label="Problem Solving" level={levels[7]} />
          </div>
        </div>

        {/* Icon Grid */}
        <div className="mt-16 grid gap-6 rounded-2xl border-2 p-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-200 border border-cyan-400 dark:bg-[#111827] dark:border-gray-600">
          {/* HTML */}
          <div className="group flex flex-col items-center border-2 border-blue-600 rounded-xl p-4 cursor-pointer bg-slate-200/60 hover:bg-slate-200/80 dark:bg-[#1e293b] dark:hover:bg-[#1e293b] transition duration-300 shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_15px_4px_rgba(255,215,0,0.5)]">
            <i className="fab fa-html5 text-3xl mb-2 text-[#e34f26] transition" />
            <span className="font-semibold text-slate-700 dark:text-gray-200 group-hover:text-yellow-200 transition">
              Nextjs
            </span>
          </div>
          {/* CSS */}
          <div className="group flex flex-col items-center rounded-xl p-4  border-2  border-emerald-500 cursor-pointer bg-slate-200/60 hover:bg-slate-200/80 dark:bg-[#1e293b] dark:hover:bg-[#1e293b] transition duration-300 shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_15px_4px_rgba(192,192,192,0.5)]">
            <i className="fab fa-css3-alt text-3xl mb-2 text-[#1572b6]" />
            <span className="font-semibold text-slate-700 dark:text-gray-200 group-hover:text-yellow-200 transition">
              React
            </span>
          </div>
          {/* AWS */}
         <div className="group flex flex-col items-center rounded-xl p-4 cursor-pointer 
  border-2 border-blue-500 
  bg-slate-200/60 hover:bg-slate-200/80 
  dark:bg-[#1e293b] dark:hover:bg-[#1e293b] 
  transition duration-300 
  shadow-[0_0_10px_rgba(0,0,0,0.08)] 
  hover:-translate-y-1 hover:scale-[1.05] 
  hover:shadow-[0_0_15px_4px_rgba(255,153,0,0.45)]">

  <i className="fab fa-aws text-3xl mb-2 
     text-[#FF9900] 
     dark:text-[#FFB84D]" />

  <span className="font-semibold text-slate-700 
    dark:text-gray-200 
    group-hover:text-[#FFB84D] transition">
    AWS
  </span>
</div>

          {/* React */}
          <div className="group flex flex-col items-center rounded-xl p-4 cursor-pointer  border-2 border-emerald-500 bg-slate-200/60 hover:bg-slate-200/80 dark:bg-[#1e293b] dark:hover:bg-[#1e293b] transition duration-300 shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_15px_4px_rgba(173,216,230,0.5)]">
            <i className="fab fa-react text-3xl mb-2 text-[#61dafb]" />
            <span className="font-semibold text-slate-700 dark:text-gray-200 group-hover:text-yellow-200 transition">
              Javascript
            </span>
          </div>
          {/* Vue */}
          <div className="group flex flex-col items-center rounded-xl p-4 cursor-pointer border-2 border-blue-500 bg-slate-200/60 hover:bg-slate-200/80 dark:bg-[#1e293b] dark:hover:bg-[#1e293b] transition duration-300 shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_15px_4px_rgba(144,238,144,0.5)]">
            <i className="fab fa-vuejs text-3xl mb-2 text-[#42b883]" />
            <span className="font-semibold text-slate-700 dark:text-gray-200 group-hover:text-yellow-200 transition">
              Tailwind
            </span>
          </div>
          {/* Node */}
          <div className="group flex flex-col items-center rounded-xl p-4 cursor-pointer border-2  border-emerald-500 bg-slate-200/60 hover:bg-slate-200/80 dark:bg-[#1e293b] dark:hover:bg-[#1e293b] transition duration-300 shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_15px_4px_rgba(173,255,47,0.5)]">
            <i className="fab fa-node-js text-3xl mb-2 text-[#3c873a]" />
            <span className="font-semibold text-slate-700 dark:text-gray-200 group-hover:text-yellow-200 transition">
              Node.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
