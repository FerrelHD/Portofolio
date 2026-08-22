"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // Skip smooth scroll if reduced motion is enabled or on mobile touch screens
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bodyReduced = document.body.classList.contains("user-reduce-motion");
    const isMobile = window.innerWidth < 768 || ("ontouchstart" in window && window.innerWidth < 1024);

    if (prefersReduced || bodyReduced || isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      lerp: 0.1,
      prevent: (node) =>
        Boolean(
          node.closest("[data-lenis-prevent]") ||
          node.closest(".overflow-y-auto") ||
          node.closest(".fixed")
        ),
    });

    // 1. SINKRONISASI LENIS DENGAN GSAP SCROLLTRIGGER
    lenis.on("scroll", ScrollTrigger.update);

    // 2. SATUKAN TICKER RAF LENIS KE DALAM GSAP TICKER
    const updateGsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0); // Responsivitas 1:1 tanpa frame lag

    // Smoothly scroll for all internal anchor links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -40 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
