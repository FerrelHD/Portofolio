"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ArrowRight } from "lucide-react";

const CaseStudyModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[300] bg-spider-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-blue overflow-hidden my-auto"
        >
          {/* STICKY HEADER BAR (Always visible on mobile) */}
          <div className="bg-spider-blue border-b-4 border-spider-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-comic-ink font-black text-[11px] sm:text-xs uppercase tracking-widest">
              <BookOpen size={16} className="text-spider-yellow shrink-0" />
              <span className="truncate">ISSUE #002 — Behind The Scenes</span>
            </div>
            <button
              onClick={onClose}
              className="text-comic-ink hover:text-spider-yellow p-1 shrink-0 transition-colors"
              aria-label="Close case study modal"
            >
              <X size={20} strokeWidth={2.8} />
            </button>
          </div>

          {/* SCROLLABLE BODY CONTENT */}
          <div className="p-4 sm:p-6 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
            <div>
              <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                Case Study Archives
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink comic-stroke-thin mt-0.5">
                Building Fersya Shop & Street Rush
              </h3>
              <p className="text-comic-ink/60 text-xs mt-1 leading-relaxed">
                An insider look into full-stack Laravel Filament architecture and Unity game physics optimization.
              </p>
            </div>

            {/* Content Log Cards */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <span className="text-[10px] font-black text-spider-red uppercase tracking-wider block mb-1">
                  CHAPTER 01: FERSYA SHOP (E-COMMERCE)
                </span>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Implemented custom Filament admin panels with real-time stock management and order webhooks using Laravel 11.
                </p>
              </div>

              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <span className="text-[10px] font-black text-spider-yellow uppercase tracking-wider block mb-1">
                  CHAPTER 02: STREET RUSH (GAME PHYSICS)
                </span>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Optimized C# rigidbodies & obstacle spawners in Unity to maintain a steady 60 FPS on mobile devices.
                </p>
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-comic-surface shrink-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-comic-ink/50 text-center sm:text-left">
                More Case Studies Coming in Issue #003
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-spider-yellow text-spider-black px-5 py-2.5 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:pop-shadow-active transition-all"
              >
                <span>Close Briefing</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
