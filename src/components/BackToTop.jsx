"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [shooting, setShooting] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (shooting) return;
    setShooting(true);
    const isReduced = document.body.classList.contains("user-reduce-motion");
    window.scrollTo({ top: 0, behavior: isReduced ? "auto" : "smooth" });
    setTimeout(() => setShooting(false), isReduced ? 50 : 900);
  };

  return (
    <>
      {/* Web line animation (tembakan jaring) */}
      <AnimatePresence>
        {shooting && (
          <motion.div
            key="web-line"
            className="web-line"
            initial={{ height: 0, opacity: 1, skewY: 0 }}
            animate={{
              height: ["0vh", "95vh", "0vh"],
              opacity: [1, 1, 0.4],
              skewY: [0, -0.5, 0.5, 0],
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.55, 1],
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Button */}
      <AnimatePresence>
        {show && (
          <motion.button
            aria-label="Swing back to top"
            onClick={handleClick}
            initial={{ opacity: 0, y: 40, scale: 0.6, rotate: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: shooting ? 1.08 : 1,
              rotate: shooting ? [0, -6, 6, 0] : 0,
            }}
            exit={{ opacity: 0, y: 40, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="web-shooter-btn"
            style={{ borderRadius: "4px" }}
          >
            {/* Spider web icon SVG */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-comic-ink"
            >
              {/* Jaring laba-laba memancar ke atas (arah top) */}
              <path d="M12 22 L12 6" />
              <path d="M12 6 L6 10" />
              <path d="M12 6 L18 10" />
              <path d="M12 10 L8 14" />
              <path d="M12 10 L16 14" />
              {/* Radial web rings */}
              <path d="M9 8 Q12 6 15 8" />
              <path d="M7.5 12 Q12 8.5 16.5 12" />
              <circle cx="12" cy="20" r="2" fill="currentColor" stroke="none" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackToTop;
