"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check } from "lucide-react";

const SUITS = [
  {
    id: "classic",
    name: "Classic Red & Blue",
    hero: "Peter Parker",
    red: "#FF1E26",
    blue: "#165DFF",
    tagline: "Your friendly neighborhood Spider-Man",
  },
  {
    id: "miles",
    name: "Miles Morales",
    hero: "Brooklyn Cyber",
    red: "#FF0033",
    blue: "#141417",
    tagline: "Matte black with neon red venom blast",
  },
  {
    id: "gwen",
    name: "Ghost-Spider",
    hero: "Gwen Stacy",
    red: "#FF007A",
    blue: "#00F0FF",
    tagline: "Vibrant cyan & magenta pop-art aesthetic",
  },
  {
    id: "2099",
    name: "Spider-Man 2099",
    hero: "Miguel O'Hara",
    red: "#FF5500",
    blue: "#0A1128",
    tagline: "Futuristic deep navy & cyber orange glow",
  },
];

const SpiderIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3" />
    <path
      d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const SuitSelector = () => {
  const [activeSuit, setActiveSuit] = useState("classic");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spidey-suit");
    if (saved && SUITS.some((s) => s.id === saved)) {
      applySuit(saved);
    }

    const handleCloseSuits = () => setIsOpen(false);
    window.addEventListener("spidey:close-suits", handleCloseSuits);
    return () => window.removeEventListener("spidey:close-suits", handleCloseSuits);
  }, []);

  const applySuit = (suitId) => {
    setActiveSuit(suitId);
    localStorage.setItem("spidey-suit", suitId);
    const suit = SUITS.find((s) => s.id === suitId);
    if (suit && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--color-spider-red", suit.red);
      document.documentElement.style.setProperty("--color-spider-blue", suit.blue);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      window.dispatchEvent(new CustomEvent("spidey:close-audio"));
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* EXPANDED POPOVER MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="absolute bottom-full left-0 mb-3 w-72 bg-comic-panel border-4 border-spider-black comic-chip p-4 shadow-2xl pop-shadow-red"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-comic-ink/20 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-spider-yellow" />
                <span className="text-xs font-black uppercase tracking-widest text-comic-ink">
                  Multiverse Suits
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-comic-ink/60 hover:text-spider-yellow transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Suit List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {SUITS.map((suit) => {
                const isActive = activeSuit === suit.id;
                return (
                  <button
                    key={suit.id}
                    onClick={() => {
                      applySuit(suit.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 comic-chip border-2 transition-all flex items-start justify-between gap-2 ${
                      isActive
                        ? "bg-comic-surface border-spider-yellow pop-shadow-sm"
                        : "bg-comic-surface/50 border-comic-ink/20 hover:border-comic-ink hover:bg-comic-surface"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {/* Color Swatch Dot */}
                        <span
                          className="w-3 h-3 rounded-full border border-spider-black shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${suit.red} 50%, ${suit.blue} 50%)`,
                          }}
                        />
                        <span className="text-xs font-black uppercase tracking-wider text-comic-ink">
                          {suit.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-comic-ink/60 font-medium leading-tight">
                        {suit.tagline}
                      </p>
                    </div>

                    {isActive && (
                      <span className="bg-spider-yellow text-spider-black p-0.5 rounded-full shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPIDER ICON BUTTON */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 py-2 px-3.5 comic-chip border-2 border-comic-ink text-xs font-black uppercase tracking-wider bg-spider-red text-comic-ink hover:bg-spider-yellow hover:text-spider-black transition-transform active:scale-95 pop-shadow-sm"
      >
        <SpiderIcon className="w-4 h-4 text-spider-yellow" />
        <span>SUITS</span>
      </button>
    </div>
  );
};

export default SuitSelector;
