"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command } from "lucide-react";

const ShortcutsModal = ({ open, onClose }) => {
  if (!open) return null;
  const items = [
    { key: "S", label: "Trigger Spider-Sense Tingling", accent: "bg-spider-red" },
    { key: "P", label: "Toggle Play / Pause BGM Song (Default 3% Volume)", accent: "bg-spider-red" },
    { key: "M", label: "Toggle Mute / Unmute Background Audio", accent: "bg-spider-yellow" },
    { key: "1-6", label: "Quick jump to sections (About, Projects, Contact)", accent: "bg-spider-blue" },
    { key: "?", label: "Show / hide this shortcuts panel", accent: "bg-spider-blue" },
    { key: "Tab", label: "Focus skip link & navigate", accent: "bg-spider-yellow" },
    { key: "Esc", label: "Close modals / shortcuts panel", accent: "bg-comic-panel" },
  ];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.94, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div className="modal-halftone halftone-overlay-sm" />
            {/* Blue accent bar at top */}
            <div className="h-3 w-full bg-spider-blue border-b-[3px] border-spider-black" />
            <div className="relative p-6 sm:p-8 md:p-10">
              <button
                onClick={onClose}
                aria-label="Close shortcuts"
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-spider-blue comic-chip text-comic-ink hover:bg-spider-yellow hover:text-spider-black transition-colors"
              >
                <X size={18} strokeWidth={2.8} />
              </button>

              {/* Header */}
              <div className="text-center mb-5 sm:mb-6">
                <p className="text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-spider-yellow mb-2">
                  SHIELD Classified Access
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
                  <span className="text-comic-ink comic-stroke">Comic </span>
                  <span className="text-spider-red comic-stroke italic">Shortcuts</span>
                </h3>
              </div>

              {/* List */}
              <div className="shortcuts-list mb-5 sm:mb-6">
                {items.map((it) => (
                  <React.Fragment key={it.key}>
                    <div className="flex items-center gap-2 justify-self-start">
                      <kbd className="kbd-key">{it.key}</kbd>
                      {it.key === "S" && (
                        <span className="inline-flex items-center justify-center bg-spider-yellow comic-chip text-spider-black px-2 py-0.5 text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase italic">
                          Try it!
                        </span>
                      )}
                    </div>
                    <p className="text-comic-ink/80 font-bold text-[12px] sm:text-sm self-center">
                      {it.label}
                    </p>
                  </React.Fragment>
                ))}
              </div>

              {/* Footer chip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t-2 border-comic-surface">
                <span className="inline-flex items-center gap-2 bg-comic-panel comic-chip text-comic-ink px-3 py-1.5">
                  <Command size={12} strokeWidth={2.5} className="text-spider-yellow" />
                  <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
                    Press Esc to close
                  </span>
                </span>
                <button
                  onClick={onClose}
                  className="bg-spider-red comic-chip text-comic-ink px-5 py-2 font-black uppercase tracking-[0.2em] text-xs pop-shadow-sm hover:bg-spider-yellow hover:text-spider-black hover:pop-shadow-active active:pop-shadow-active transition-all"
                >
                  Got It — Thwip!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShortcutsModal;
