"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ArrowRight, ShoppingBag, Cpu, Gamepad2, Film, ShieldAlert } from "lucide-react";

const CaseStudyModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[300] bg-spider-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-blue overflow-hidden my-auto"
          data-lenis-prevent
        >
          {/* STICKY HEADER BAR */}
          <div className="bg-spider-blue border-b-4 border-spider-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-comic-ink font-black text-[11px] sm:text-xs uppercase tracking-widest">
              <BookOpen size={16} className="text-spider-yellow shrink-0" />
              <span className="truncate">ISSUE #002 — Comprehensive Mission Archives</span>
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
          <div className="p-4 sm:p-6 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0 touch-pan-y" data-lenis-prevent>
            <div>
              <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                Classified Project Briefs
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink comic-stroke-thin mt-0.5">
                Full-Stack & Multiverse Mission Logs
              </h3>
              <p className="text-comic-ink/60 text-xs mt-1 leading-relaxed">
                Detailed breakdowns of web applications, e-commerce platforms, 3D game engines, and creative editing.
              </p>
            </div>

            {/* PROJECT LOG CARDS GRID */}
            <div className="space-y-3 sm:space-y-4">
              {/* 1. Fersya Shop */}
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag size={14} className="text-spider-red shrink-0" />
                  <span className="text-[10px] font-black text-spider-red uppercase tracking-wider">
                    MISSION 01: FERSYA SHOP (HEALTHY FOOD & BODY CARE)
                  </span>
                </div>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  E-commerce platform for healthy foods, organic beverages, and body care products built with Laravel 11 & Filament admin dashboard for inventory management.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Laravel 11</span>
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Filament PHP</span>
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Tailwind CSS</span>
                </div>
              </div>

              {/* 2. Finesser Shop */}
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={14} className="text-spider-blue shrink-0" />
                  <span className="text-[10px] font-black text-spider-blue uppercase tracking-wider">
                    MISSION 02: FINESSER SHOP (DIGITAL ASSET MARKETPLACE)
                  </span>
                </div>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Digital asset online store providing high-quality digital templates, graphics, and design resources with responsive product browsing.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">Laravel</span>
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">Bootstrap</span>
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">Digital Storefront</span>
                </div>
              </div>

              {/* 3. Street Rush */}
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <div className="flex items-center gap-2 mb-1">
                  <Gamepad2 size={14} className="text-spider-yellow shrink-0" />
                  <span className="text-[10px] font-black text-spider-yellow uppercase tracking-wider">
                    MISSION 03: STREET RUSH (UNITY 3D GAME PHYSICS)
                  </span>
                </div>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Fast-paced 3D arcade runner game in Unity. Optimized C# rigidbodies & obstacle spawner algorithms to ensure smooth 60 FPS gameplay.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold bg-spider-yellow/20 text-spider-black px-2 py-0.5 comic-chip">Unity 3D</span>
                  <span className="text-[9px] font-bold bg-spider-yellow/20 text-spider-black px-2 py-0.5 comic-chip">C# Engine</span>
                  <span className="text-[9px] font-bold bg-spider-yellow/20 text-spider-black px-2 py-0.5 comic-chip">60 FPS Optimization</span>
                </div>
              </div>

              {/* 4. Student Life */}
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={14} className="text-spider-blue shrink-0" />
                  <span className="text-[10px] font-black text-spider-blue uppercase tracking-wider">
                    MISSION 04: STUDENT LIFE (WEB APP & SUPABASE)
                  </span>
                </div>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Web platform for student productivity, task management, and academic schedule tracking powered by React, TypeScript, and Supabase backend.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">React 19</span>
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">TypeScript</span>
                  <span className="text-[9px] font-bold bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip">Supabase</span>
                </div>
              </div>

              {/* 5. Video AMV */}
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <div className="flex items-center gap-2 mb-1">
                  <Film size={14} className="text-spider-red shrink-0" />
                  <span className="text-[10px] font-black text-spider-red uppercase tracking-wider">
                    MISSION 05: AMV CINEMATIC EDITING (FRANK OCEAN & CARTI)
                  </span>
                </div>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  High-tempo anime music video edits featuring precision beat syncing, custom motion transitions, and color grading.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Vegas Pro</span>
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Sound Design</span>
                  <span className="text-[9px] font-bold bg-spider-red/20 text-spider-red px-2 py-0.5 comic-chip">Motion Graphics</span>
                </div>
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-comic-surface shrink-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-comic-ink/50 text-center sm:text-left">
                More Mission Archives Coming in Issue #003
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-spider-yellow text-spider-black px-5 py-2.5 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:pop-shadow-active transition-all"
              >
                <span>Close Archives</span>
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
