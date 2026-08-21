"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScroll = () => {
  useEffect(() => {
    // Skip smooth scroll if reduced motion is enabled or on mobile touch screens for 60fps native momentum scrolling
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bodyReduced = document.body.classList.contains("user-reduce-motion");
    const isMobile = window.innerWidth < 768 || ("ontouchstart" in window && window.innerWidth < 1024);

    if (prefersReduced || bodyReduced || isMobile) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ultra-smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
      lerp: 0.08,
      prevent: (node) =>
        Boolean(
          node.closest("[data-lenis-prevent]") ||
          node.closest(".overflow-y-auto") ||
          node.closest(".fixed")
        ),
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smoothly scroll for all internal anchor links (#hero, #about, #projects, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -60 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
