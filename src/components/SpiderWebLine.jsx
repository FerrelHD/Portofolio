"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SpiderWebLine = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Track global scroll position
  const { scrollYProgress } = useScroll();

  // Smooth scroll spring physics for natural thread movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

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

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 4200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Spider Neon Glow */}
          <filter id="spider-web-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Soft Glow Line */}
        <motion.path
          d="M 880 120 C 450 420, 80 680, 160 960 C 240 1240, 880 1420, 820 1720 C 760 2020, 120 2280, 180 2620 C 240 2960, 920 3180, 840 3480 C 760 3780, 220 3980, 500 4150"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="3.5"
          strokeOpacity="0.25"
          vectorEffect="non-scaling-stroke"
          filter="url(#spider-web-glow)"
          style={{
            pathLength: isReducedMotion ? 1 : smoothProgress,
          }}
        />

        {/* Primary Crisp Web Line */}
        <motion.path
          id="single-spider-web"
          d="M 880 120 C 450 420, 80 680, 160 960 C 240 1240, 880 1420, 820 1720 C 760 2020, 120 2280, 180 2620 C 240 2960, 920 3180, 840 3480 C 760 3780, 220 3980, 500 4150"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.8"
          strokeDasharray="6 2"
          vectorEffect="non-scaling-stroke"
          filter="url(#spider-web-glow)"
          style={{
            pathLength: isReducedMotion ? 1 : smoothProgress,
          }}
        />
      </svg>
    </div>
  );
};

export default SpiderWebLine;
