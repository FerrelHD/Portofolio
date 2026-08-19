"use client";
import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const ComicCursor = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [targetLabel, setTargetLabel] = useState("LOCK ON!");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Framer Motion spring for ring lag behind dot
  const springConfig = { stiffness: 350, damping: 30 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    // Fine pointer check (Desktop non-touch)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);
    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    // Initial reduced motion check
    const checkMotion = () => {
      setIsReducedMotion(document.body.classList.contains("user-reduce-motion"));
    };
    checkMotion();

    const handleMotionChange = (e) => {
      setIsReducedMotion(!e.detail.enabled);
    };
    document.addEventListener("comic:motion-change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      document.removeEventListener("comic:motion-change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    // Set data attribute on html element to hide native cursor
    document.documentElement.setAttribute("data-custom-cursor", "1");

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      if (isReducedMotion) {
        ringX.set(x);
        ringY.set(y);
      } else {
        ringX.set(x);
        ringY.set(y);
      }

      // Check modal open
      const hasModal = document.querySelector(".modal-backdrop") !== null;
      setIsModalOpen(hasModal);

      // Check hovered elements
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          "a, button, [role='button'], .comic-panel, [data-cursor='target'], input, select, textarea, .tracker-card"
        );
        if (interactive) {
          setIsHovered(true);
          const customLabel = interactive.getAttribute("data-cursor-label");
          setTargetLabel(customLabel || "LOCK ON!");
        } else {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isFinePointer, isReducedMotion, ringX, ringY]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Dot (Immediate follow) */}
      <div
        className={`cursor-dot ${
          isHovered ? "cursor-reticle" : ""
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          opacity: isModalOpen ? 0.3 : 1,
        }}
      >
        {isHovered && (
          <div className="cursor-reticle-crosshair">
            <span className="reticle-line line-v" />
            <span className="reticle-line line-h" />
          </div>
        )}
      </div>

      {/* 2. Ring (Spring lag behind) */}
      <motion.div
        className={`cursor-ring ${isHovered ? "cursor-ring-active" : ""}`}
        style={{
          x: isReducedMotion ? pos.x : ringX,
          y: isReducedMotion ? pos.y : ringY,
          opacity: isModalOpen ? 0.2 : isHovered ? 1 : 0.75,
        }}
      >
        {/* SVG Spider Web Ring */}
        <svg viewBox="0 0 40 40" className="w-full h-full text-current">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M20 2 L20 38 M2 20 L38 20 M7 7 L33 33 M7 33 L33 7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 3. Badge "LOCK ON!" when hovered */}
      {isHovered && !isModalOpen && (
        <div
          className="cursor-lock-badge"
          style={{
            transform: `translate3d(${pos.x + 20}px, ${pos.y - 12}px, 0)`,
          }}
        >
          {targetLabel}
        </div>
      )}
    </div>
  );
};

export default ComicCursor;
