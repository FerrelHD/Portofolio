"use client";
import React from "react";
import { Sparkles } from "lucide-react";

/**
 * ComicTicker - Infinite running text marquee banner styled as Daily Bugle / Spider-Man comic ribbon.
 */
const ComicTicker = ({
  items = [],
  rotate = "-rotate-1",
  reverse = false,
  variant = "daily-bugle",
  className = "",
}) => {
  // Duplicate list to make infinite seamless loop
  const displayItems = [...items, ...items];

  const isBugle = variant === "daily-bugle";

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-3.5 z-20 select-none -my-3 sm:-my-5 transition-transform duration-300 ${rotate} ${className} ${
        isBugle
          ? "bg-spider-yellow border-y-3 sm:border-y-4 border-black shadow-[0_6px_0px_#000]"
          : "bg-[#14141C] border-y-3 sm:border-y-4 border-spider-red/80 shadow-[0_6px_0px_#FF1E26]"
      }`}
    >
      {/* Background Comic Halftone Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Marquee Track with infinite loop and pause-on-hover */}
      <div
        className={`${
          reverse ? "animate-comic-marquee-reverse" : "animate-comic-marquee"
        } items-center gap-6 sm:gap-8 flex`}
      >
        {displayItems.map((item, index) => {
          const text = typeof item === "string" ? item : item.text;
          const icon = typeof item === "object" ? item.icon : null;

          return (
            <div
              key={`${text}-${index}`}
              className="flex items-center gap-3 sm:gap-5 shrink-0"
            >
              {icon && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={icon}
                    alt=""
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: isBugle ? "multiply" : "screen" }}
                  />
                </div>
              )}

              <span
                className={`font-black uppercase tracking-wider text-xs sm:text-sm md:text-base flex items-center gap-2 ${
                  isBugle ? "text-spider-black" : "text-white"
                }`}
              >
                {text}
              </span>

              {/* Comic Separator Badge */}
              <span
                className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-black uppercase tracking-widest border border-black shadow-[2px_2px_0_#000] shrink-0 ${
                  isBugle
                    ? "bg-spider-red text-white"
                    : "bg-spider-yellow text-spider-black"
                }`}
              >
                <Sparkles size={10} className="mr-1" />
                <span>SPIDEY-DEV</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicTicker;
