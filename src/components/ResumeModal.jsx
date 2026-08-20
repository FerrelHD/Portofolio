"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, Copy, ExternalLink, ShieldAlert } from "lucide-react";

const ResumeModal = ({ open, onClose }) => {
  if (!open) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Portfolio & Resume link copied!");
  };

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
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-red my-auto"
        >
          {/* Header Bar */}
          <div className="bg-spider-red border-b-4 border-spider-black px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-comic-ink font-black text-xs uppercase tracking-widest">
              <ShieldAlert size={18} className="text-spider-yellow" />
              <span>S.H.I.E.L.D. Classified Agent Dossier</span>
            </div>
            <button onClick={onClose} className="text-comic-ink hover:text-spider-yellow">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <div>
              <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                Agent Clearance Level 05
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-comic-ink comic-stroke-thin">
                Ferrel Rashad Akeyla — Mission Brief
              </h3>
              <p className="text-comic-ink/60 text-xs mt-1">
                Full-Stack Web Developer & Game Designer | Specializing in React, Next.js, Laravel, & Unity.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-comic-surface border-2 border-comic-ink p-4 comic-chip">
                <h4 className="text-spider-yellow font-black text-xs uppercase tracking-wider mb-2">
                  Frontend & Web Tech
                </h4>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  React 19, Vite, Tailwind CSS v4, Framer Motion, TypeScript, Next.js.
                </p>
              </div>
              <div className="bg-comic-surface border-2 border-comic-ink p-4 comic-chip">
                <h4 className="text-spider-blue font-black text-xs uppercase tracking-wider mb-2">
                  Backend & Game Engines
                </h4>
                <p className="text-comic-ink/80 text-xs leading-relaxed">
                  Laravel, Filament, Supabase, Unity (C#), Roblox Studio (Luau).
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t-2 border-comic-surface">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 bg-comic-surface border-2 border-comic-ink text-comic-ink px-4 py-2 text-xs font-black uppercase tracking-wider comic-chip hover:bg-spider-yellow hover:text-spider-black transition-colors"
              >
                <Copy size={14} />
                <span>Copy Dossier Link</span>
              </button>
              <a
                href="https://github.com/FerrelHD"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-spider-red text-comic-ink px-5 py-2.5 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:bg-spider-yellow hover:text-spider-black transition-all"
              >
                <Download size={14} />
                <span>Download PDF Resume</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
