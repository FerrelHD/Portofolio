"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

const ProjectBriefModal = ({ project, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key listener
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[9999] bg-spider-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[82vh] flex flex-col bg-white text-comic-ink border-3 sm:border-4 border-black rounded-lg shadow-[8px_8px_0_#000] overflow-hidden select-none"
              data-lenis-prevent
            >
              {/* STICKY HEADER BAR */}
              <div className="bg-spider-red text-white border-b-3 sm:border-b-4 border-black px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-[0_2px_0_#000]">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest min-w-0">
                  <ShieldAlert size={18} className="text-spider-yellow shrink-0" />
                  <span className="truncate">CLASSIFIED BRIEF — {project.title}</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-spider-yellow text-spider-black border-2 border-black flex items-center justify-center hover:bg-white transition-all shadow-[1.5px_1.5px_0_#000] active:scale-95 cursor-pointer shrink-0 ml-2"
                  aria-label="Close project brief modal"
                >
                  <X size={18} strokeWidth={2.8} />
                </button>
              </div>

              {/* SCROLLABLE BODY CONTENT */}
              <div
                className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5 overflow-y-auto min-h-0 flex-1 touch-pan-y bg-[#FFFDF9]"
                data-lenis-prevent
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-spider-yellow text-spider-black px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider border border-black rounded shadow-[1px_1px_0_#000]">
                      SECTOR: {project.category}
                    </span>
                    {project.sfx && (
                      <span className="bg-spider-red text-white px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-black italic border border-black rounded -rotate-2">
                        {project.sfx}
                      </span>
                    )}
                    <span className="text-[9px] font-mono font-black text-comic-ink/70 uppercase ml-auto">
                      {project.issueNumber}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-comic-ink/85 text-xs sm:text-sm mt-1.5 leading-relaxed font-semibold">
                    {project.brief?.description || project.title}
                  </p>
                </div>

                {/* Role & Tech Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 sm:p-3.5 rounded shadow-[2px_2px_0_#000]">
                    <h4 className="text-[8.5px] sm:text-[9.5px] font-black text-spider-red uppercase tracking-wider mb-1">
                      AGENT ROLE
                    </h4>
                    <p className="text-comic-ink font-black text-xs sm:text-sm">
                      {project.brief?.role || "Developer & Creator"}
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border-2 border-black p-3 sm:p-3.5 rounded shadow-[2px_2px_0_#000]">
                    <h4 className="text-[8.5px] sm:text-[9.5px] font-black text-spider-blue uppercase tracking-wider mb-1">
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tech?.map((t) => (
                        <span
                          key={t}
                          className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider bg-white text-comic-ink px-2 py-0.5 border border-black rounded shadow-[1px_1px_0_#000]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mission Highlights */}
                {project.brief?.highlights && (
                  <div className="bg-[#FAF8F5] border-2 border-black p-3.5 sm:p-4 rounded shadow-[2px_2px_0_#000] space-y-2">
                    <h4 className="text-[10.5px] sm:text-xs font-black text-comic-ink uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} className="text-spider-red" />
                      <span>KEY MISSION HIGHLIGHTS</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.brief.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-comic-ink/90 font-medium">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* STICKY BOTTOM ACTIONS BAR */}
              <div className="bg-[#FAF8F5] border-t-2 sm:border-t-3 border-black p-3 sm:p-4 flex flex-col xs:flex-row items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full xs:w-auto px-4 py-2 bg-white border-2 border-black text-comic-ink text-xs font-black uppercase tracking-wider rounded hover:bg-gray-100 transition-all shadow-[2px_2px_0_#000] active:scale-95 cursor-pointer"
                >
                  Close Brief
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto flex items-center justify-center gap-2 bg-spider-red hover:bg-red-700 text-white px-5 py-2 text-xs font-black uppercase tracking-wider rounded shadow-[2px_2px_0_#000] active:scale-95 transition-all text-center"
                  >
                    <span>Launch Live Mission</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectBriefModal;
