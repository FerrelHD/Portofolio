"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Sparkles } from "lucide-react";

const ProjectBriefModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[300] bg-spider-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-red my-auto overflow-hidden"
          data-lenis-prevent
        >
          {/* STICKY HEADER BAR */}
          <div className="bg-spider-red border-b-4 border-spider-black px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-comic-ink font-black text-xs uppercase tracking-widest min-w-0">
              <ShieldAlert size={16} className="text-spider-yellow shrink-0" />
              <span className="truncate">CLASSIFIED BRIEF — {project.title}</span>
            </div>
            <button
              onClick={onClose}
              className="text-comic-ink hover:text-spider-yellow p-1 shrink-0 transition-colors"
              aria-label="Close project brief modal"
            >
              <X size={20} strokeWidth={2.8} />
            </button>
          </div>

          {/* SCROLLABLE BODY CONTENT */}
          <div className="p-4 sm:p-6 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto min-h-0 flex-1 touch-pan-y" data-lenis-prevent>
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-spider-yellow uppercase tracking-widest">
                  SECTOR: {project.category}
                </span>
                {project.sfx && (
                  <span className="bg-spider-yellow text-spider-black px-2 py-0.5 text-[9px] font-black italic comic-chip">
                    {project.sfx}
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-comic-ink comic-stroke-thin">
                {project.title}
              </h3>
              <p className="text-comic-ink/80 text-xs sm:text-sm mt-2 leading-relaxed">
                {project.brief?.description || project.title}
              </p>
            </div>

            {/* Role & Tech Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <h4 className="text-[10px] font-black text-spider-yellow uppercase tracking-wider mb-1">
                  AGENT ROLE
                </h4>
                <p className="text-comic-ink font-bold text-xs">
                  {project.brief?.role || "Developer & Creator"}
                </p>
              </div>

              <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 comic-chip">
                <h4 className="text-[10px] font-black text-spider-blue uppercase tracking-wider mb-1">
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tech?.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-black uppercase tracking-wider bg-spider-blue/20 text-spider-blue px-2 py-0.5 comic-chip border border-spider-blue/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Highlights */}
            {project.brief?.highlights && (
              <div className="bg-comic-surface border-2 border-comic-ink p-4 comic-chip space-y-2">
                <h4 className="text-xs font-black text-comic-ink uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="text-spider-yellow" />
                  KEY MISSION HIGHLIGHTS
                </h4>
                <ul className="space-y-2">
                  {project.brief.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-comic-ink/90">
                      <CheckCircle2 size={14} className="text-spider-yellow shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-comic-surface shrink-0">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-comic-surface border-2 border-comic-ink text-comic-ink text-xs font-black uppercase tracking-wider comic-chip hover:bg-spider-yellow hover:text-spider-black transition-colors"
              >
                Close Brief
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-spider-red text-comic-ink px-6 py-2.5 text-xs font-black uppercase tracking-wider comic-chip pop-shadow-sm hover:bg-spider-yellow hover:text-spider-black transition-all text-center"
                >
                  <span>Launch Live Mission</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectBriefModal;
