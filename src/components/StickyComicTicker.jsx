"use client";
import React, { useState, useEffect } from "react";

const TICKER_ITEMS = [
  "COMIC BOOK",
  "✦",
  "COMIC ARTS",
  "✦",
  "FULL STACK HERO",
  "✦",
  "DIGITAL CREATOR",
  "✦",
  "REACT & NEXT.JS",
  "✦",
  "3D & GAME CRAFT",
  "✦",
  "SPIDER-DEV",
  "✦",
  "ISSUE #001",
  "✦",
];

/**
 * StickyComicTicker - Persistent floating comic ribbon overlay that dynamically
 * inverts colors based on whether the active section is Cream or Red.
 */
const StickyComicTicker = () => {
  // "cream" | "red"
  const [activeTheme, setActiveTheme] = useState("cream");

  useEffect(() => {
    const sections = [
      { id: "hero", type: "cream" },
      { id: "about", type: "red" },
      { id: "services", type: "cream" },
      { id: "projects", type: "red" },
      { id: "skills", type: "cream" },
      { id: "contact", type: "red" },
      { id: "footer", type: "dark" },
    ];

    const observerCallback = (entries) => {
      // Find the entry that has the highest intersection ratio
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio descending
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visibleEntries[0];
        const match = sections.find((s) => s.id === topEntry.target.id);
        if (match) {
          setActiveTheme(match.type);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.15, 0.4, 0.7],
      rootMargin: "-10% 0px -10% 0px",
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id) || document.querySelector(id === "footer" ? "footer" : `#${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Invert colors:
  // If active section is "cream" -> Ticker is RED bg with WHITE text
  // If active section is "red"   -> Ticker is CREAM bg with RED/BLACK text
  // If active section is "dark"  -> Ticker is YELLOW bg with BLACK text
  const isRedSection = activeTheme === "red";
  const isDarkSection = activeTheme === "dark";

  const colorStyles = isRedSection
    ? "bg-[#EDEAE2] text-[#D31F1F] border-t-3 border-black shadow-[0_-4px_0_#000]"
    : isDarkSection
    ? "bg-[#FFD500] text-[#1A1A1A] border-t-3 border-black shadow-[0_-4px_0_#000]"
    : "bg-[#D31F1F] text-[#FFFFFF] border-t-3 border-black shadow-[0_-4px_0_#000]";

  const starColor = isRedSection ? "text-[#1A1A1A]" : isDarkSection ? "text-[#D31F1F]" : "text-[#FFD500]";

  // Duplicate items for continuous marquee loop
  const displayItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 overflow-hidden py-2 sm:py-2.5 select-none transition-colors duration-500 ease-in-out font-black text-xs sm:text-sm tracking-[0.2em] uppercase ${colorStyles}`}
      aria-label="Live Comic Ribbon Ticker"
    >
      <div className="animate-comic-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform">
        {displayItems.map((item, index) => {
          const isStar = item === "✦";
          return (
            <span
              key={index}
              className={`inline-flex items-center shrink-0 ${
                isStar ? `${starColor} text-base sm:text-lg animate-pulse` : "font-black tracking-[0.22em]"
              }`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StickyComicTicker;
