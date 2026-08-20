"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, X, Check } from "lucide-react";

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

const SuitSelector = () => {
  const [activeSuit, setActiveSuit] = useState("classic");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spidey-suit");
    if (saved && SUITS.some((s) => s.id === saved)) {
      applySuit(saved);
    }
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

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      {/* FLOATING SPIDER ICON TAB BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-spider-red text-comic-ink border-2 border-spider-black px-3 py-2.5 comic-chip pop-shadow-sm hover:bg-spider-yellow hover:text-spider-black transition-all active:scale-95 group"
        title="Multiverse Suit Customizer"
      >
        <Palette size={16} strokeWidth={2.5} className="animate-pulse group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest hidden xl:inline">
          SUITS
        </span>
      </button>

      {/* FLOATING SIDE DRAWER POPOVER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="absolute right-full top-0 mr-3 w-72 bg-comic-panel border-4 border-spider-black comic-chip p-4 shadow-2xl pop-shadow-red"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-comic-ink/20 pb-3 mb-3">
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

            {/* Suit Cards List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {SUITS.map((suit) => {
                const isActive = activeSuit === suit.id;
                return (
                  <button
                    key={suit.id}
                    onClick={() => applySuit(suit.id)}
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
    </div>
  );
};

export default SuitSelector;
