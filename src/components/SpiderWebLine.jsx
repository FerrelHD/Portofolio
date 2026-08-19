"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SpiderWebLine = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Track global scroll position across the page
  const { scrollYProgress } = useScroll();

  // Smooth scroll spring physics for natural fluid thread movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Ensure 8% of the web line is ALREADY drawn at top of Hero (scroll 0)
  const pathLengthValue = useTransform(smoothProgress, [0, 1], [0.08, 1]);

  useEffect(() => {
    // Check system prefers-reduced-motion & body class toggle
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      const bodyReduced = document.body.classList.contains("user-reduce-motion");
      setIsReducedMotion(mediaQuery.matches || bodyReduced);
    };

    checkMotion();
    mediaQuery.addEventListener("change", checkMotion);

    const observer = new MutationObserver(checkMotion);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mediaQuery.removeEventListener("change", checkMotion);
      observer.disconnect();
    };
  }, []);

  // Continuous Catenary Bezier Path through sections (Hero -> About -> Services -> Projects -> Skills -> Contact)
  const pathData =
    "M 880 160 C 420 520, 60 780, 150 1150 C 240 1520, 920 1780, 850 2150 C 780 2520, 80 2850, 150 3250 C 220 3650, 920 3950, 850 4350 C 780 4650, 200 4880, 500 4970";

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[12] w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 5000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Intense Spider Cyan Glow Filter */}
          <filter id="spider-web-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Thick Outer Cyan Glow Layer */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#00F0FF"
          strokeWidth="6"
          strokeOpacity="0.45"
          vectorEffect="non-scaling-stroke"
          filter="url(#spider-web-glow)"
          style={{
            pathLength: isReducedMotion ? 1 : pathLengthValue,
          }}
        />

        {/* Primary Bright White-Cyan Spider Web Thread */}
        <motion.path
          id="single-spider-web"
          d={pathData}
          fill="none"
          stroke="#E0FFFF"
          strokeWidth="2.8"
          strokeDasharray="10 4"
          strokeOpacity="0.95"
          vectorEffect="non-scaling-stroke"
          filter="url(#spider-web-glow)"
          style={{
            pathLength: isReducedMotion ? 1 : pathLengthValue,
          }}
        />
      </svg>
    </div>
  );
};

export default SpiderWebLine;
