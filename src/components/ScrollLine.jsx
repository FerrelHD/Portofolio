"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ScrollLine Component
 * Option B: MindMarket-style Curved SVG Scroll Line Animation.
 * Weaves smoothly across portfolio sections (Hero -> About -> Services -> Projects -> Skills -> Contact)
 * with Spider-Man color gradients, neon drop-shadow glow, and non-scaling stroke width.
 */
const ScrollLine = () => {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 1. Detect viewport width for responsive SVG path amplitude
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Track scroll progress & smooth out motion with spring physics
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // 3. Curved SVG Bezier Paths normalized to viewBox 0 0 1000 5000
  // Desktop Path: Wide organic weaving from right to left across sections
  const desktopPath = `
    M 850 150
    C 950 400, 800 700, 500 900
    C 200 1100, 100 1300, 150 1600
    C 200 1900, 850 2100, 880 2500
    C 910 2900, 150 3200, 120 3600
    C 90 4000, 850 4300, 850 4600
    C 850 4800, 600 4950, 500 5000
  `;

  // Mobile Path: Constrained to left side track (x ~ 40-120) to prevent overlapping cards/text
  const mobilePath = `
    M 60 100
    C 80 500, 40 1000, 70 1500
    C 100 2000, 40 2500, 80 3000
    C 120 3500, 40 4000, 70 4500
    L 50 5000
  `;

  const activePath = isMobile ? mobilePath : desktopPath;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none w-full h-full overflow-hidden">
      <svg
        className="w-full h-full block"
        viewBox="0 0 1000 5000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Spider-Man Neon Web Gradient */}
          <linearGradient
            id="spideyScrollGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF1E26" />
            <stop offset="30%" stopColor="#FFD500" />
            <stop offset="60%" stopColor="#165DFF" />
            <stop offset="85%" stopColor="#FF1E26" />
            <stop offset="100%" stopColor="#FFD500" />
          </linearGradient>

          {/* Intense Neon Glow Filter */}
          <filter id="scrollGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer A: Faint Guide Track Line (Background Rail) */}
        <path
          d={activePath}
          fill="none"
          stroke="rgba(240, 237, 227, 0.07)"
          strokeWidth={isMobile ? "2" : "3"}
          strokeDasharray="6 8"
          vectorEffect="non-scaling-stroke"
        />

        {/* Layer B: Animated Draw-on-Scroll Neon Line */}
        <motion.path
          d={activePath}
          fill="none"
          stroke="url(#spideyScrollGradient)"
          strokeWidth={isMobile ? "3" : "4.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#scrollGlow)"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: shouldReduceMotion ? 1 : smoothProgress,
            opacity: shouldReduceMotion ? 0.35 : 0.9,
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollLine;
