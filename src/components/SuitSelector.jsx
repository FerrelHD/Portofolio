"use client";
import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const SUITS = [
  { id: "classic", label: "Classic", red: "#FF1E26", blue: "#165DFF" },
  { id: "miles", label: "Miles", red: "#FF0033", blue: "#1E1E24" },
  { id: "gwen", label: "Gwen", red: "#FF007A", blue: "#00F0FF" },
  { id: "2099", label: "2099", red: "#FF5500", blue: "#0A1128" },
];

const SuitSelector = () => {
  const [activeSuit, setActiveSuit] = useState("classic");

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
    <div className="flex items-center gap-1 bg-comic-panel border-2 border-comic-ink p-1 comic-chip">
      <Sparkles size={12} className="text-spider-yellow ml-1 flex-shrink-0" />
      {SUITS.map((suit) => (
        <button
          key={suit.id}
          onClick={() => applySuit(suit.id)}
          className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider transition-all comic-chip ${
            activeSuit === suit.id
              ? "bg-spider-red text-comic-ink pop-shadow-sm"
              : "text-comic-ink/60 hover:text-comic-ink"
          }`}
        >
          {suit.label}
        </button>
      ))}
    </div>
  );
};

export default SuitSelector;
