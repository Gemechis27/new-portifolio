// src/components/CursorGlow.tsx
"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";


const SPRING_CFG = { stiffness: 220, damping: 28, mass: 0.6 } as const;


const CursorGlow = memo(function CursorGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const mxRef = useRef(useMotionValue(-9999));
  const myRef = useRef(useMotionValue(-9999));
  const mx = mxRef.current;
  const my = myRef.current;

  const x = useSpring(mx, SPRING_CFG);
  const y = useSpring(my, SPRING_CFG);

 
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mounted, mx, my]);

  
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  
  const blobGrad = isDark
    ? "radial-gradient(circle,rgba(99,102,241,0.22)_0%,rgba(45,212,191,0.16)_35%,rgba(0,0,0,0)_70%)"
    : "radial-gradient(circle,rgba(250,204,21,0.28)_0%,rgba(45,212,191,0.25)_50%,rgba(45,212,191,0)_72%)";

  const coreGrad = isDark
    ? "radial-gradient(circle,rgba(45,212,191,0.9)_0%,rgba(99,102,241,0.35)_55%,rgba(0,0,0,0)_75%)"
    : "radial-gradient(circle,rgba(250,204,21,0.8)_0%,rgba(45,212,191,0.45)_55%,rgba(45,212,191,0)_78%)";

  const blendCls = isDark ? "mix-blend-screen" : "mix-blend-multiply";

  return (
    
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>

      
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          backgroundImage: blobGrad,
          willChange: "transform",
        }}
        className={[
          "absolute top-0 left-0 rounded-full",
          "h-[140px] w-[140px] md:h-[180px] md:w-[180px]",
          "blur-2xl opacity-90",
          blendCls,
        ].join(" ")}
      />

      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          backgroundImage: coreGrad,
          willChange: "transform",
        }}
        className={[
          "absolute top-0 left-0 rounded-full",
          "h-10 w-10 md:h-12 md:w-12",
          "blur-md opacity-70",
          blendCls,
        ].join(" ")}
      />
    </div>
  );
});

export default CursorGlow;
