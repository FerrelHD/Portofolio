"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import swingSpideyGif from "../assets/swingspidey.gif";

const SwingSpideyOverlay = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[400] bg-spider-black/92 backdrop-blur-lg flex flex-col items-center justify-center p-4 cursor-pointer select-none overflow-hidden"
        onClick={onClose}
      >
        {/* Halftone Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none halftone-overlay" />

        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-spider-red comic-chip text-comic-ink p-2 sm:p-3 hover:bg-spider-yellow hover:text-spider-black transition-colors pop-shadow-sm"
          aria-label="Close Swing Easter Egg"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Comic THWIP! Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: -5 }}
          exit={{ scale: 0 }}
          className="mb-4 sm:mb-6"
        >
          <span className="bg-spider-yellow text-spider-black px-6 py-2 comic-chip text-sm sm:text-base font-black italic tracking-widest uppercase pop-shadow-red flex items-center gap-2">
            <Sparkles size={18} />
            THWIP! — MULTIVERSE WEB SWING MODE
          </span>
        </motion.div>

        {/* Fullscreen GIF Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center"
        >
          <img
            src={swingSpideyGif}
            alt="Spider-Man Web Swing Multiverse Easter Egg"
            className="w-full h-full max-h-[75vh] object-contain drop-shadow-[0_0_35px_rgba(255,30,38,0.7)]"
          />
        </motion.div>

        {/* Dismiss hint */}
        <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-comic-ink/60 animate-pulse">
          [ Click Anywhere to Exit Web Swing ]
        </p>
      </div>
    </AnimatePresence>
  );
};

export default SwingSpideyOverlay;
