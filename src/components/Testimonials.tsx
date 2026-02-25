"use client";


import Image from "next/image";

type TItem = {
  name: string;
  title: string;
  feedback: string;
  image: string;
};

function TestimonialCard({ name, title, feedback, image }: TItem) {
  const isRemote = image.startsWith("http");

  return (
    <div
      className="
       
    group rounded-2xl
    w-[85%] mx-auto
    sm:w-[90%]
    md:w-full

        p-4 sm:p-5 md:p-6
        text-left
        border border-amber-800 dark:border-white/20
        bg-white/5 dark:bg-white/5
        shadow-[0_14px_40px_rgba(0,0,0,0.18)]
        hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        transition duration-300
        dark:text-white text-slate-900
        dark:hover:border-yellow-300/30
      "
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* PROFILE IMAGE */}
        <div
          className="
            relative
            h-10 w-10
            sm:h-12 sm:w-12
            md:h-14 md:w-14
            overflow-hidden rounded-full
            ring-2
            ring-teal-400/40 dark:ring-indigo-400/50
            transition
          "
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        {/* NAME + TITLE */}
        <div className="min-w-0">
          <p className="font-semibold text-sm sm:text-base leading-tight text-teal-700 dark:text-indigo-400">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 truncate">
            {title}
          </p>
        </div>
      </div>

      {/* FEEDBACK */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-white/80">
        “{feedback}”
      </p>

      {/* GLOW LINE */}
      <div className="mt-4 sm:mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

export default function Testimonials() {
  const testimonials: TItem[] = [
    {
      name: "Jitu M",
      title: "Project Manager",
      feedback:
        "Gemechis was amazing to work with — fast, responsive, and very professional!",
      image: "/images/jitu.webp",
    },
    {
      name: "Daniel Smith",
      title: "CEO @Techify",
      feedback:
        "Delivered everything ahead of schedule. Great eye for design and detail.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Alisha Patel",
      title: "UI Designer",
      feedback:
        "Superb developer with solid skills. Will definitely collaborate again.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 px-4">
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[#1e293b]" />

      <div className="absolute inset-0 -z-10 dark:hidden overflow-hidden bg-[#F4EFE8]">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.06), transparent 40%), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.05), transparent 45%), radial-gradient(circle at 30% 80%, rgba(0,0,0,0.04), transparent 45%)",
          }}
        />
        <div className="absolute -left-40 top-[-220px] h-[520px] w-[520px] rounded-full bg-[#0f4d3b]/15" />
        <div className="absolute -right-52 bottom-[-260px] h-[620px] w-[620px] rounded-full bg-[#0f4d3b]/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        <h2
          className="
            text-center
            text-3xl sm:text-4xl md:text-5xl
            font-semibold uppercase mb-10 sm:mb-12
            text-transparent bg-clip-text
            bg-gradient-to-r from-teal-400 to-indigo-500
            drop-shadow-[0_0_8px_rgba(250,204,21,0.25)]
            transition duration-300 hover:scale-[1.03]
          "
        >
          Voices of Experience
        </h2>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
