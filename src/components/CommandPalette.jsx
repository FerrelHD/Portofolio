"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Mail,
  Github,
  Linkedin,
  Zap,
  X,
  Newspaper,
  Gamepad2,
  Volume2,
} from "lucide-react";
import { achievementManager } from "../lib/achievements";
import { soundFX } from "../lib/soundFx";

const CommandPalette = ({ open, onClose, onOpenDailyBugle, onOpenBugHunter, triggerSpiderSense }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      achievementManager.unlock("terminal_hacker");
      soundFX.playBeep(600);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const actions = [
    {
      id: "daily-bugle",
      title: "Read The Daily Bugle Newspaper Report",
      icon: <Newspaper size={16} className="text-yellow-400" />,
      perform: () => {
        onClose();
        if (onOpenDailyBugle) onOpenDailyBugle();
      },
    },
    {
      id: "bug-hunter",
      title: "Play Spidey Bug Hunter (30s Arcade Mini-Game)",
      icon: <Gamepad2 size={16} className="text-spider-red" />,
      perform: () => {
        onClose();
        if (onOpenBugHunter) onOpenBugHunter();
      },
    },
    {
      id: "spider-sense",
      title: "Trigger Spider-Sense Pulse [Hotkey: S]",
      icon: <Zap size={16} className="text-spider-yellow" />,
      perform: () => {
        if (triggerSpiderSense) triggerSpiderSense();
        else {
          document.body.classList.add("spider-sense-active");
          setTimeout(() => document.body.classList.remove("spider-sense-active"), 2200);
        }
        onClose();
      },
    },
    {
      id: "sfx-toggle",
      title: `Toggle Web Audio Synthesizer SFX (Currently: ${soundFX.isMuted() ? "MUTED" : "ACTIVE"})`,
      icon: <Volume2 size={16} className="text-emerald-400" />,
      perform: () => {
        soundFX.setMuted(!soundFX.isMuted());
        onClose();
      },
    },
    {
      id: "cv",
      title: "Download Mission Brief / Resume (CV)",
      icon: <FileText size={16} className="text-sky-400" />,
      perform: () => {
        window.open("https://github.com/FerrelHD", "_blank");
        onClose();
      },
    },
    {
      id: "email",
      title: "Copy Agent Email Address",
      icon: <Mail size={16} className="text-purple-400" />,
      perform: () => {
        navigator.clipboard.writeText("ferrelrashadakeyla2014@gmail.com");
        onClose();
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      icon: <Github size={16} />,
      perform: () => {
        window.open("https://github.com/FerrelHD", "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      title: "Open LinkedIn Profile",
      icon: <Linkedin size={16} />,
      perform: () => {
        window.open("https://www.linkedin.com/in/ferrel-rashad-8a165514b/", "_blank");
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9992] bg-spider-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden"
        >
          {/* Header Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-comic-ink/20 bg-comic-surface">
            <Search size={18} className="text-spider-yellow" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search (Daily Bugle, Bug Hunter, Resume...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-comic-ink placeholder-comic-ink/50 text-sm font-bold focus:outline-none"
            />
            <button onClick={onClose} className="text-comic-ink/50 hover:text-comic-ink">
              <X size={18} />
            </button>
          </div>

          {/* Action List */}
          <div className="p-2 max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-xs text-comic-ink/50 font-bold uppercase">
                No matching commands found
              </p>
            ) : (
              <div className="space-y-1">
                {filtered.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.perform}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-comic-ink/10 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-md bg-comic-surface border border-comic-ink/10 group-hover:border-spider-yellow transition-colors">
                        {action.icon}
                      </span>
                      <span className="text-sm font-bold text-comic-ink group-hover:text-spider-yellow transition-colors">
                        {action.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-comic-ink/40 group-hover:text-comic-ink">
                      Enter ↵
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2 bg-comic-surface/50 border-t border-comic-ink/10 flex justify-between items-center text-[10px] text-comic-ink/50 font-bold uppercase">
            <span>Navigation: Click or Enter</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
