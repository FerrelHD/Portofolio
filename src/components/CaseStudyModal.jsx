"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ExternalLink, ArrowRight } from "lucide-react";

const CaseStudyModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[220] bg-spider-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-blue overflow-hidden my-8"
        >
          {/* Header Bar */}
          <div className="bg-spider-blue border-b-4 border-spider-black px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-comic-ink font-black text-xs uppercase tracking-widest">
              <BookOpen size={18} className="text-spider-yellow" />
              <span>ISSUE #002 — Behind The Scenes Mission Log</span>
            </div>
            <button onClick={onClose} className="text-comic-ink hover:text-spider-yellow">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                Case Study Archives
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-comic-ink comic-stroke-thin">
                Building Fersya Shop & Street Rush
              </h3>
              <p className="text-comic-ink/60 text-xs mt-1">
                An insider look into full-stack Laravel Filament architecture and Unity game physics optimization.
              </p>
            </div>

            {/* Content Log Cards */}
            <div className="space-y-4">
              <div className="bg-comic-surface border-2 border-comic-ink p-4 comic-chip">
                <span className="text-[10px] font-black text-spider-red uppercase tracking-wider">
                  CHAPTER 01: FERSYA SHOP (E-COMMERCE)
                </span>
                <p className="text-comic-ink/80 text-xs mt-1 leading-relaxed">
                  Implemented custom Filament admin panels with real-time stock management and order webhooks using Laravel 11.
                </p>
              </div>

              <div className="bg-comic-surface border-2 border-comic-ink p-4 comic-chip">
                <span className="text-[10px] font-black text-spider-yellow uppercase tracking-wider">
                  CHAPTER 02: STREET RUSH (GAME PHYSICS)
                </span>
                <p className="text-comic-ink/80 text-xs mt-1 leading-relaxed">
                  Optimized C# rigidbodies & obstacle spawners in Unity to maintain a steady 60 FPS on mobile devices.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-comic-surface">
              <span className="text-[10px] font-black uppercase tracking-wider text-comic-ink/50">
                More Case Studies Coming in Issue #003
              </span>
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-spider-yellow text-spider-black px-5 py-2 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:pop-shadow-active transition-all"
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
