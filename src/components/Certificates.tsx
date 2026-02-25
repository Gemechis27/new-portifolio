"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string; // /certificates/xxx.png
  verifyUrl?: string;
};

export default function Certificates() {
  const certificates: Certificate[] = useMemo(
    () => [
      {
        title: "Fullstack MERN Web Developer",
        issuer: "Evangadi ENV",
        date: "2025",
        image: "/certificates/fullstack.jpg",
        verifyUrl:
          "https://www.evangadi.com/academy/my-certificates/57602df8827caa3e",
      },
      {
        title: "Android Developer",
        issuer: "UDACITY",
        date: "2024",
        image: "/certificates/android-developer.jpg",
        verifyUrl:
          "https://www.udacity.com/certificate/e/8daeb880-4d7e-11ef-8e0a-53810c1769e9",
      },
      {
        title: "Programming Fundamental",
        issuer: "UDACITY",
        date: "2024",
        image: "/certificates/programming-fundamental.jpg",
        verifyUrl:
          "https://www.udacity.com/certificate/e/b44a75a4-596f-11ef-bcad-77375d2afcb2",
      },
      {
        title: "Machine Learning",
        issuer: "Coursera",
        date: "2024",
        image: "/certificates/cousera.png",
        verifyUrl: "https://example.com",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const current = certificates[active];

  const nextCertificate = () =>
    setActive((prev) => (prev + 1) % certificates.length);
  const prevCertificate = () =>
    setActive((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <section id="certificates" className="relative py-20 px-4">
      {/* ================= STARS (only in dark mode) ================= */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="star-field" />
      </div>

      {/* LIGHT background */}
      <div className="absolute inset-0 -z-10 dark:hidden overflow-hidden bg-[#F4EFE8]">
        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />
        <div className="absolute -left-48 top-[-220px] h-[520px] w-[520px] rounded-full bg-[#D6B48C]/85" />
        <div className="absolute -right-56 bottom-[-240px] h-[620px] w-[620px] rounded-full bg-[#EADFCC]/80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.95), rgba(255,255,255,0) 55%)",
            opacity: 0.9,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl ">
        <h2 className="text-center   text-4xl md:text-5xl font-extrabold uppercase mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 transition duration-300 hover:scale-[1.03]">
          Certificates
        </h2>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] items-start">
          {/* ================= FEATURED CERTIFICATE ================= */}
          <div className="relative rounded-[28px] overflow-hidden border border-white/15 bg-white/25 dark:bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.14)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover opacity-40 dark:opacity-30 scale-[1.05] transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 dark:from-black/65" />
              <div className="absolute inset-0 dark:hidden bg-white/10" />
            </div>

            {/* Foreground */}
            <div className="relative p-6 md:p-10 border-2 border-teal-600">
              <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
                <div>
                  <p className="text-xs tracking-widest uppercase text-white/80 dark:text-white/70">
                    Featured Certificate
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white dark:text-white">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-white/80 dark:text-white/70">
                    {current.issuer} • {current.date}
                  </p>
                </div>

                <div className="flex gap-3">
                  {current.verifyUrl && (
                    <a
                      href={current.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl font-semibold bg-yellow-400 text-[#0c0f1a] hover:bg-yellow-300 transition"
                    >
                      Verify
                    </a>
                  )}

                  <Link
                    href={current.image}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl font-semibold bg-white/15 text-white hover:bg-white/20 transition"
                  >
                    View
                  </Link>
                </div>
              </div>

              {/* Big preview image */}
              <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-4 border-indigo-400 dark:border-emerald-500 transition-all hover:scale-[1.01] hover:shadow-md">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              {/* Navigation buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={prevCertificate}
                  className="px-4 py-2 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Previous
                </button>
                <button
                  onClick={nextCertificate}
                  className="px-4 py-2 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* ================= STACKED MINI CARDS ================= */}
          <div className="relative h-[420px] lg:h-[520px]">
            <div className="relative h-full">
              {certificates.slice(0, 4).map((c, i) => {
                const isActive = i === active;
                const x = i * 26;
                const y = i * 18;
                const rot = i % 2 === 0 ? -6 : 6;
                const z = 50 - i;

                return (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className={[
                      "absolute left-0 top-0 w-full max-w-[360px] rounded-2xl overflow-hidden border backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:scale-[1.03]",
                      isActive
                        ? "border-yellow-300 shadow-[0_18px_55px_rgba(250,204,21,0.18)]"
                        : "border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.14)]",
                    ].join(" ")}
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                      zIndex: isActive ? 99 : z,
                    }}
                    aria-label={`Select certificate: ${c.title}`}
                  >
                    <div className="relative aspect-[16/10] bg-black/10 dark:bg-white/5 transition-all hover:scale-[1.02] hover:shadow-md">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="360px"
                        className="object-cover border-2 border-indigo-300 dark:border-emerald-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>

                    <div className="p-4 text-left bg-white/20 dark:bg-white/5 transition-all hover:bg-white/30 dark:hover:bg-white/10">
                      <p className="text-sm font-bold text-white dark:text-white line-clamp-1">
                        {c.title}
                      </p>
                      <p className="mt-1 text-xs text-white/80 dark:text-white/70 line-clamp-1">
                        {c.issuer} • {c.date}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm font-bold text-center -translate-y-40 text-cyan-600 dark:text-white/60">
              Click a card to preview.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
