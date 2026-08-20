"use client";
import React, { useState, useEffect, useCallback } from "react";
import { soundFX } from "../lib/soundFx";
import { achievementManager } from "../lib/achievements";

const COMIC_WORDS = [
  { text: "POW!", bg: "#FF1E26", textCol: "#FFFFFF", rotate: -8 },
  { text: "THWIP!", bg: "#165DFF", textCol: "#FFFFFF", rotate: 10 },
  { text: "BAM!", bg: "#FFD700", textCol: "#000000", rotate: -12 },
  { text: "200 OK!", bg: "#00E676", textCol: "#000000", rotate: 6 },
  { text: "CLEAN CODE!", bg: "#9C27B0", textCol: "#FFFFFF", rotate: -6 },
  { text: "FIXED!", bg: "#FF5722", textCol: "#FFFFFF", rotate: 9 },
  { text: "ZAP!", bg: "#00E5FF", textCol: "#000000", rotate: -10 },
];

export const spawnComicBurst = (x, y, customText = null) => {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("spawn-comic-burst", {
    detail: { x, y, customText },
  });
  window.dispatchEvent(event);
};

const ComicActionFX = () => {
  const [bursts, setBursts] = useState([]);

  const addBurst = useCallback((x, y, customText = null) => {
    const randomItem = COMIC_WORDS[Math.floor(Math.random() * COMIC_WORDS.length)];
    const id = Date.now() + Math.random();
    const burst = {
      id,
      x,
      y,
      text: customText || randomItem.text,
      bg: randomItem.bg,
      textColor: randomItem.textCol,
      rotate: randomItem.rotate + (Math.random() * 8 - 4),
      scale: 0.9 + Math.random() * 0.3,
    };

    setBursts((prev) => [...prev.slice(-10), burst]); // Keep at most 10 active
    soundFX.playPunch();
    achievementManager.trackComicClick();

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 750);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Trigger comic action on elements with data-comic or button / interactive clicks
      const target = e.target;
      const isButton = target.closest("button") || target.closest("a") || target.closest(".comic-target");
      if (isButton) {
        const rect = target.getBoundingClientRect();
        // Place burst near click or center of button
        const x = e.clientX || (rect.left + rect.width / 2);
        const y = e.clientY || (rect.top + rect.height / 2);
        addBurst(x, y);
      }
    };

    const handleCustomEvent = (e) => {
      if (e.detail) {
        addBurst(e.detail.x, e.detail.y, e.detail.customText);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("spawn-comic-burst", handleCustomEvent);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("spawn-comic-burst", handleCustomEvent);
    };
  }, [addBurst]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 will-change-transform animate-comic-pop"
          style={{
            left: `${burst.x}px`,
            top: `${burst.y}px`,
            "--burst-rotate": `${burst.rotate}deg`,
            "--burst-scale": `${burst.scale}`,
          }}
        >
          {/* Comic Burst Star Container */}
          <div
            className="relative font-black tracking-widest text-sm md:text-base px-3 py-1.5 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000]"
            style={{
              backgroundColor: burst.bg,
              color: burst.textColor,
              fontFamily: "'Outfit', 'Impact', sans-serif",
              textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            }}
          >
            {burst.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicActionFX;
