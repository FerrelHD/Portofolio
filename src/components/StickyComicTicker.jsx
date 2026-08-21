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

    const updateTickerTheme = () => {
      // Check the exact physical pixel where the bottom ticker sits
      const tickerY = window.innerHeight - 25;
      for (const sec of sections) {
        const el =
          document.getElementById(sec.id) ||
          (sec.id === "footer" ? document.querySelector("footer") : null);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= tickerY && rect.bottom >= tickerY) {
            setActiveTheme(sec.type);
            return;
          }
        }
      }
    };

    updateTickerTheme();
    window.addEventListener("scroll", updateTickerTheme, { passive: true });
    window.addEventListener("resize", updateTickerTheme, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTickerTheme);
      window.removeEventListener("resize", updateTickerTheme);
    };
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
      className={`fixed bottom-0 left-0 right-0 z-50 overflow-hidden py-2.5 sm:py-3 select-none transition-colors duration-300 ease-in-out font-display font-black text-base sm:text-lg md:text-xl uppercase tracking-tighter ${colorStyles}`}
      aria-label="Live Comic Ribbon Ticker"
    >
      <div className="animate-comic-marquee flex items-center gap-6 sm:gap-8 md:gap-9 whitespace-nowrap will-change-transform font-display">
        {displayItems.map((word, index) => (
          <React.Fragment key={index}>
            <span className="font-display font-black tracking-tighter shrink-0">{word}</span>
            <img
              src={spiderEmblem}
              alt="Spider Emblem"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0 transition-all duration-300 mx-1"
              style={{ filter: emblemFilter }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StickyComicTicker;
