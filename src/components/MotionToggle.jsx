"use client";
import React, { useState, useEffect } from "react";
import { Zap, ZapOff } from "lucide-react";

const MotionToggle = ({ isMobile = false }) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("comic_motion_enabled");
    const isMotionOn = saved !== null ? saved === "1" : true;
    setEnabled(isMotionOn);

    if (!isMotionOn) {
      document.body.classList.add("user-reduce-motion");
    } else {
      document.body.classList.remove("user-reduce-motion");
    }
  }, []);

  const toggleMotion = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    localStorage.setItem("comic_motion_enabled", nextState ? "1" : "0");

    if (!nextState) {
      document.body.classList.add("user-reduce-motion");
    } else {
      document.body.classList.remove("user-reduce-motion");
    }

    document.dispatchEvent(
      new CustomEvent("comic:motion-change", {
        detail: { enabled: nextState },
      })
    );
  };

  if (isMobile) {
    return (
      <button
        onClick={toggleMotion}
        type="button"
        className="relative z-10 flex items-center justify-between w-full py-2.5 px-4 comic-chip bg-comic-panel text-comic-ink text-xs font-black uppercase tracking-[0.18em] hover:bg-spider-yellow hover:text-spider-black transition-colors"
      >
        <span className="flex items-center gap-2">
          {enabled ? (
            <Zap size={16} className="text-spider-yellow" />
          ) : (
            <ZapOff size={16} className="text-spider-red" />
          )}
          Motion Effects
        </span>
        <span
          className={`px-2 py-0.5 text-[9px] comic-chip font-black ${
            enabled ? "bg-spider-blue text-comic-ink" : "bg-spider-red text-comic-ink"
          }`}
        >
          {enabled ? "ON" : "OFF"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleMotion}
      type="button"
      title={enabled ? "Reduce Motion Effects (Disable FX)" : "Enable Motion Effects (Enable FX)"}
      className={`relative flex items-center gap-1.5 px-2.5 py-1.5 comic-chip transition-all text-[10px] font-black uppercase tracking-wider ${
        enabled
          ? "bg-spider-blue/20 text-comic-ink border-spider-blue/50 hover:bg-spider-blue hover:text-comic-ink"
          : "bg-spider-red/20 text-spider-red border-spider-red/50 hover:bg-spider-red hover:text-comic-ink"
      }`}
    >
      {enabled ? (
        <Zap size={13} className="text-spider-yellow fill-spider-yellow" />
      ) : (
        <ZapOff size={13} className="text-spider-red" />
      )}
      <span className="hidden sm:inline">Motion: {enabled ? "ON" : "OFF"}</span>
    </button>
  );
};

export default MotionToggle;
