"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Clock } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaCss3Alt,
  FaHtml5,
} from "react-icons/fa";
import { SiNextdotjs, SiMysql, SiFirebase, SiStripe } from "react-icons/si";

/* ================= FILTER TYPES ================= */
const filterOptions = ["All", "Frontend", "Backend", "Full Stack"] as const;
type Filter = (typeof filterOptions)[number];

/* ================= PROJECT TYPE ================= */
type Project = {
  title: string;
  tech: string;
  description: string;
  image: string;
  demo: string;
  github: string;
  stack?: string[];
};

/* ================= STACK ICON + COLOR ================= */
const stackConfig: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  react: {
    icon: <FaReact />,
    color: "bg-sky-200 text-sky-700 border-sky-600",
  },
  node: {
    icon: <FaNodeJs />,
    color: "bg-green-100 text-green-700 border-green-500",
  },
  aws: {
    icon: <FaAws />,
    color: "bg-orange-100 text-orange-700 border-orange-500",
  },
  "next.js": {
    icon: <SiNextdotjs />,
    color: "bg-black text-white border-black",
  },
  mysql: {
    icon: <SiMysql />,
    color: "bg-blue-100 text-blue-700 border-blue-400",
  },
  firebase: {
    icon: <SiFirebase />,
    color: "bg-amber-100 text-amber-700 border-amber-500",
  },
  stripe: {
    icon: <SiStripe />,
    color: "bg-purple-100 text-purple-700 border-purple-500",
  },
  html: {
    icon: <FaHtml5 />,
    color: "bg-orange-100 text-orange-700 border-orange-500",
  },
  css: {
    icon: <FaCss3Alt />,
    color: "bg-blue-100 text-blue-700 border-blue-500",
  },
  api: {
    icon: <ArrowUpRight size={12} />,
    color: "bg-amber-200 text-blue-700 border-blue-500",
  },
  backend: {
    icon: <FaNodeJs />,
    color: "bg-emerald-100 text-emerald-800 border-emerald-500",
  },
  frontend: {
    icon: <FaReact />,
    color: "bg-cyan-100 text-cyan-800 border-cyan-500",
  },
  "full stack": {
    icon: <FaReact />,
    color: "bg-indigo-100 text-indigo-800 border-indigo-500",
  },
  ui: {
    icon: <FaCss3Alt />,
    color: "bg-pink-100 text-pink-800 border-pink-300 ",
  },
  ux: {
    icon: <FaCss3Alt />,
    color: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300",
  },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  /* ================= PROJECT LIST ================= */
  const projectList: Project[] = [
    {
      title: "Apple.com Clone",
      tech: "Frontend",
      description: "Responsive Apple homepage replica with smooth animations and layout.",
      image: "/images/apple1.png",
      demo: "https://apcloneweb.netlify.app/",
      github: "https://github.com/Gemechis27/AppleCloneReact_v2.git",
      stack: ["React", "HTML", "CSS"],
    },
    {
      title: "Amazon E-commerce",
      tech: "Full Stack",
      description: "Full e-commerce site with cart, checkout, and user authentication.",
      image: "/images/amazon2.jpeg",
      demo: "https://amazonclon14.netlify.app/",
      github: "https://github.com/Gemechis27/Amazon_frontend.git",
      stack: ["React", "Node", "Stripe", "Firebase"],
    },
    {
      title: "Amazon S3 & CloudFront",
      tech: "Coming Soon",
      description: "New pet project page coming soon!",
      image: "/images/s3.png",
      demo: "https://aws-s3-project-gules.vercel.app/",
      github: "https://github.com/Gemechis27/aws-s3-project.git",
      stack: ["AWS", "Next.js","API"],
    },
    { title: "Netflix Clone", 
      tech: "Frontend", 
      description: "Movie streaming UI with dynamic data from TMDB.", 
      image: "/images/netflex.png", 
      demo: "https://gemechism.netlify.app/", 
      github: "https://github.com/Gemechis27/Nexflix-clone.git", 
      stack: ["React", "API", "UI/UX"], },
      { title: "Evangadi Forum", 
        tech: "Full Stack", 
        description: "Community Q&A platform similar to Stack Overflow.", 
        image: "/images/evangadiforum.png", 
        demo: "https://evangadi-forum-final-omega.vercel.app/", 
        github: "https://github.com/Gemechis27/EvangadiForum_Final.git", 
        stack: ["React", "Node", "Express", "MySQL"], 
      },
      { title: "Personal Portfolio", 
        tech: "Frontend", 
        description: "Personal portfolio website.", 
        image: "/images/gmypoti.png", 
        demo: "https://dynamic-florentine-a3490e.netlify.app/", 
        github: "https://github.com/Gemechis27/webproject.git", 
        stack: ["React", "CSS", "UI"], 
      },
      { title: "Ambo city System", 
        tech: "Coming Soon, Backend", 
        description: "Student management system for internal campus use.", 
        image: "/images/Ambocity.jpeg", 
        demo: "#", 
        github: "#", 
        stack: ["Backend", "API", "DB"],
       },
       { title: "Abe Garage", 
        tech: "Coming Soon", 
        description: "Abe Garage full web app under development.", 
        image: "/images/Abbegarage.jpg", 
        demo: "#", 
        github: "#", 
        stack: ["Full Stack"], 
      },
  ];

  /* ================= FILTER LOGIC ================= */
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectList;
    return projectList.filter((p) => p.tech === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="relative  px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-5xl font-extrabold uppercase mb-12
          text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">
          My Projects
        </h2>

        {/* ================= FILTER BUTTONS ================= */}
        <div className="mb-12 flex justify-center gap-4 flex-wrap">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold border transition
                ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const comingSoon = project.tech.toLowerCase().includes("coming");

            return (
              <div
                key={project.title}
                className="
                  group rounded-2xl overflow-hidden
                  border border-indigo-200
                  bg-gradient-to-br from-slate-50 to-indigo-100
                  transition-all duration-300
                  hover:-translate-y-2 hover:scale-[1.03]
                  hover:ring-2 hover:ring-indigo-400/50
                "
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-black/70 text-white flex items-center gap-1">
                    {comingSoon && <Clock size={14} />}
                    {comingSoon ? "Coming Soon" : project.tech}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6 border-t border-indigo-200">
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-700">
                    {project.description}
                  </p>

                  {/* STACK WITH ICONS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack?.map((tech) => {
                      const key = tech.toLowerCase();
                      const cfg = stackConfig[key];

                      return (
                          <span
  key={tech}
  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold border cursor-pointer

    /* Smooth animation */
    transition-all duration-300 ease-in-out

    /* Hover effect (individual) */
    hover:-translate-y-[2px]
    hover:shadow-md

    /* Click / active effect */
    active:translate-y-0
    active:scale-95

    ${
      cfg
        ? cfg.color
        : "bg-gray-100 text-gray-700 border-gray-200"
    }
  `}
>
  {/* Icon spin on hover */}
  <span
    className="
      transition-transform duration-300 ease-in-out
      hover:rotate-180
    "
  >
    {cfg?.icon}
  </span>

  {tech}
</span>


                      );
                    })}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex gap-3">
                  <a
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
  className={`px-4 py-2 rounded-full border font-semibold flex items-center gap-2 transition-all
    ${
      comingSoon || project.github === "#"
        ? "opacity-50 pointer-events-none bg-slate-300 text-slate-600 dark:bg-white/10 dark:text-white/50"
        : "bg-white text-black border-slate-300 hover:bg-black hover:text-white dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
    }`}
>
  <Github size={16} />
  Code
</a>

                    <a
  href={project.demo}
  target="_blank"
  rel="noopener noreferrer"
  className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all
    ${
      comingSoon || project.demo === "#"
        ? "opacity-50 pointer-events-none bg-slate-300 text-slate-600 dark:bg-white/10 dark:text-white/50"
        : "bg-indigo-600 text-black hover:bg-indigo-700 hover:scale-105 hover:shadow-lg dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-700"
    }`}
>
  Live
  <ArrowUpRight size={16} />
</a>


                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
