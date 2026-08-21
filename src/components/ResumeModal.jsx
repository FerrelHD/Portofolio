"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, ShieldAlert } from "lucide-react";


const ResumeModal = ({ open, onClose }) => {
  if (!open) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Portfolio & Resume link copied!");
  };

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
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden my-auto"
          data-lenis-prevent
        >
          {/* STICKY HEADER BAR */}
          <div className="bg-spider-red border-b-4 border-spider-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-comic-ink font-black text-[11px] sm:text-xs uppercase tracking-widest">
              <ShieldAlert size={16} className="text-spider-yellow shrink-0" />
              <span className="truncate">S.H.I.E.L.D. Classified Agent Dossier</span>
            </div>
            <button
              onClick={onClose}
              className="text-comic-ink hover:text-spider-yellow p-1 shrink-0 transition-colors"
              aria-label="Close dossier modal"
            >
              <X size={20} strokeWidth={2.8} />
            </button>
          </div>

          {/* SCROLLABLE BODY CONTENT */}
          <div className="p-4 sm:p-6 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0 touch-pan-y" data-lenis-prevent>
            <div>
              <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                Agent Clearance Level 05
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink comic-stroke-thin mt-0.5">
                Ferrel Rashad Akeyla — Mission Brief
              </h3>
              <p className="text-comic-ink/60 text-xs mt-1 leading-relaxed">
                Full-Stack Web Developer & Game Designer | Specializing in React, Next.js, Laravel, & Unity.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <h4 className="text-spider-yellow font-black text-xs uppercase tracking-wider mb-1.5">
                  Frontend & Web Tech
                </h4>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  React 19, Vite, Tailwind CSS v4, Framer Motion, TypeScript, Next.js.
                </p>
              </div>
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <h4 className="text-spider-blue font-black text-xs uppercase tracking-wider mb-1.5">
                  Backend & Game Engines
                </h4>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Laravel, Filament, Supabase, Unity (C#), Roblox Studio (Luau).
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t-2 border-comic-surface shrink-0">
              <button
                onClick={() => {
                  if (onClose) onClose();
                  window.dispatchEvent(new CustomEvent("spidey:open-deck"));
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-spider-yellow text-spider-black px-4 py-2.5 text-xs font-black uppercase tracking-wider comic-chip hover:bg-white transition-colors"
              >
                <span>View PPT / Pitch Deck</span>
              </button>
              <button
                onClick={copyLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-comic-surface border-2 border-comic-ink text-comic-ink px-4 py-2.5 text-xs font-black uppercase tracking-wider comic-chip hover:bg-spider-yellow hover:text-spider-black transition-colors"
              >
                <Copy size={14} />
                <span>Copy Link</span>
              </button>
              <a
                href="https://github.com/FerrelHD"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-spider-red text-comic-ink px-5 py-2.5 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:bg-spider-yellow hover:text-spider-black transition-all text-center"
              >
                <Download size={14} />
                <span>GitHub Dossier</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
