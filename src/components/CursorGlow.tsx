"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // raw mouse position
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  // smooth follow
  const x = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* Main soft blob */}
      <motion.div
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={[
          "absolute rounded-full",
          "h-[140px] w-[140px] md:h-[180px] md:w-[180px]", // smaller
          isDark
            ? "bg-[radial-gradient(circle,rgba(99,102,241,0.22)_0%,rgba(45,212,191,0.16)_35%,rgba(0,0,0,0)_70%)]"
            : "bg-[radial-gradient(circle,rgba(250,204,21,0.28)_0%,rgba(45,212,191,0.25)_50%,rgba(45,212,191,0)_72%)]",
          isDark ? "mix-blend-screen" : "mix-blend-multiply",
          "blur-2xl opacity-90",
        ].join(" ")}
      />

      {/* Smaller sharper core */}
      <motion.div
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={[
          "absolute rounded-full",
          "h-10 w-10 md:h-12 md:w-12", // smaller
          isDark
            ? "bg-[radial-gradient(circle,rgba(45,212,191,0.9)_0%,rgba(99,102,241,0.35)_55%,rgba(0,0,0,0)_75%)]"
            : "bg-[radial-gradient(circle,rgba(250,204,21,0.8)_0%,rgba(45,212,191,0.45)_55%,rgba(45,212,191,0)_78%)]",
          isDark ? "mix-blend-screen" : "mix-blend-multiply",
          "blur-md opacity-70",
        ].join(" ")}
      />
    </div>
  );
}
