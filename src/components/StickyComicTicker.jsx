"use client";
import React, { useState, useEffect } from "react";
import spiderEmblem from "../assets/spiderman-emblem.png";

const TICKER_WORDS = [
  "COMIC BOOK",
  "COMIC ARTS",
  "FULL STACK HERO",
  "DIGITAL CREATOR",
  "REACT & NEXT.JS",
  "3D & GAME CRAFT",
  "SPIDER-DEV",
  "ISSUE #001",
];

/**
 * StickyComicTicker - Persistent floating comic ribbon overlay that dynamically
 * inverts colors based on whether the active section is Cream or Red.
 */
const StickyComicTicker = () => {
  // "cream" | "red" | "dark"
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
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
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

  const isRedSection = activeTheme === "red";
  const isDarkSection = activeTheme === "dark";

  // Seamless borderless design without black strokes
  const colorStyles = isRedSection
    ? "bg-[#EDEAE2] text-[#D31F1F]"
    : isDarkSection
    ? "bg-[#FFD500] text-[#1A1A1A]"
    : "bg-[#D31F1F] text-[#FFFFFF]";

  const emblemFilter = isRedSection
    ? "brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(4678%) hue-rotate(352deg) brightness(88%) contrast(96%)" // Red icon
    : isDarkSection
    ? "brightness(0)" // Black icon on Yellow
    : "brightness(0) invert(1)"; // Pure White icon on Red

  // Duplicate items for continuous smooth marquee loop
  const displayItems = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 overflow-hidden py-2.5 sm:py-3.5 select-none transition-colors duration-500 ease-in-out font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight ${colorStyles}`}
      aria-label="Live Comic Ribbon Ticker"
    >
      <div className="animate-comic-marquee flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap will-change-transform font-sans">
        {displayItems.map((word, index) => (
          <React.Fragment key={index}>
            <span className="font-black tracking-tight shrink-0">{word}</span>
            <img
              src={spiderEmblem}
              alt="Spider Emblem"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain shrink-0 transition-all duration-300 mx-1"
              style={{ filter: emblemFilter }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StickyComicTicker;
