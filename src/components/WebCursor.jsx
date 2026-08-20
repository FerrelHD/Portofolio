"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * WebCursor Component
 * Spider-Man Web Shooter Cursor Trail.
 * Follows mouse movement with spring physics and renders a subtle web thread line to active hover targets.
 */
const WebCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid movement
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    // Hide cursor on touch devices or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || shouldReduceMotion) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, input, textarea, select, .comic-panel, .interactive");
      setIsHovered(!!target);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Outer Web Ring */}
      <motion.div
        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 transition-transform duration-150 ease-out ${
          isHovered
            ? "border-spider-red scale-125 bg-spider-red/10 shadow-[0_0_15px_rgba(255,30,38,0.5)]"
            : "border-spider-blue/60 scale-100"
        }`}
        style={{
          x: springX,
          y: springY,
        }}
      />

      {/* Inner Spider Point Dot */}
      <motion.div
        className={`absolute w-2 h-2 -ml-1 -mt-1 rounded-full ${
          isHovered ? "bg-spider-yellow" : "bg-spider-red"
        }`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  );
};

export default WebCursor;
