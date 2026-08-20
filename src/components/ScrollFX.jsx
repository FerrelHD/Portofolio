"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const ScrollFX = () => {
  const [showPageFlip, setShowPageFlip] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const flipTimer = useRef(null);

  const [speedLines, setSpeedLines] = useState([]);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const lastY = useRef(0);
  const speedTimer = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    restDelta: 0.001,
  });

  // Bagian A: Page Flip Divider on comic:section-change
  useEffect(() => {
    const handleSectionChange = () => {
      // Throttle flip
      if (flipTimer.current) clearTimeout(flipTimer.current);

      setFlipKey((prev) => prev + 1);
      setShowPageFlip(true);

      flipTimer.current = setTimeout(() => {
        setShowPageFlip(false);
      }, 340);
    };

    document.addEventListener("comic:section-change", handleSectionChange);

    return () => {
      document.removeEventListener("comic:section-change", handleSectionChange);
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, []);

  // Bagian B: Speed lines on high scroll velocity
  useEffect(() => {
    let animationFrameId;

    const checkVelocity = () => {
      const currentY = scrollY.get();
      const velocity = Math.abs(currentY - lastY.current);
      lastY.current = currentY;

      const isReduced = document.body.classList.contains("user-reduce-motion");

      if (velocity > 22 && !isReduced) {
        // Generate 12-16 random lines
        const lines = Array.from({ length: 14 }).map((_, i) => ({
          id: `${Date.now()}-${i}`,
          left: `${Math.random() * 96 + 2}%`,
          height: `${Math.floor(Math.random() * 130 + 50)}px`,
          top: `${Math.random() * 80 + 10}%`,
          skew: Math.random() > 0.5 ? 12 : -12,
        }));
        setSpeedLines(lines);
        setShowSpeedLines(true);

        if (speedTimer.current) clearTimeout(speedTimer.current);
        speedTimer.current = setTimeout(() => {
          setShowSpeedLines(false);
        }, 220);
      }

      animationFrameId = requestAnimationFrame(checkVelocity);
    };

    animationFrameId = requestAnimationFrame(checkVelocity);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (speedTimer.current) clearTimeout(speedTimer.current);
    };
  }, [scrollY]);

  return (
    <>
      {/* Top Spider-Laser Scroll Progress Tracker */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-spider-red via-spider-yellow to-spider-blue z-[160] origin-left shadow-[0_0_12px_#FF1E26] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Bagian A: Page Flip Divider Sweep */}
      <AnimatePresence>
        {showPageFlip && (
          <motion.div
            key={`flip-${flipKey}`}
            className="fixed top-1/2 left-0 right-0 -translate-y-1/2 z-[140] pointer-events-none h-2.5 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full h-full border-y-2 border-spider-black"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-spider-red), var(--color-spider-yellow), var(--color-spider-blue), var(--color-spider-red))",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bagian B: Speed Lines Flash */}
      {showSpeedLines && (
        <div className="fixed inset-0 z-[130] pointer-events-none overflow-hidden">
          {speedLines.map((line) => (
            <div
              key={line.id}
              className="absolute bg-comic-ink/30 border-l border-white/40"
              style={{
                left: line.left,
                top: line.top,
                width: "2px",
                height: line.height,
                transform: `skewY(${line.skew}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ScrollFX;
