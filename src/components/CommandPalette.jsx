"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, FileText, Mail, Github, Linkedin, Zap, X } from "lucide-react";

const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState("");

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
      id: "cv",
      title: "Download Mission Brief / Resume (CV)",
      icon: <FileText size={16} />,
      perform: () => {
        window.open("https://github.com/FerrelHD", "_blank");
        onClose();
      },
    },
    {
      id: "email",
      title: "Copy Agent Email Address",
      icon: <Mail size={16} />,
      perform: () => {
        navigator.clipboard.writeText("ferrelrashadakeyla2014@gmail.com");
        alert("Email copied to clipboard!");
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
    {
      id: "spider-sense",
      title: "Trigger Spider-Sense Pulse",
      icon: <Zap size={16} />,
      perform: () => {
        document.body.classList.add("spider-sense-active");
        setTimeout(() => document.body.classList.remove("spider-sense-active"), 2200);
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
        className="fixed inset-0 z-[250] bg-spider-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
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
              placeholder="Type a command or search..."
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
              filtered.map((action) => (
                <button
                  key={action.id}
                  onClick={action.perform}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-spider-blue text-comic-ink text-left transition-colors group"
                >
                  <span className="text-spider-yellow group-hover:text-comic-ink">
                    {action.icon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider flex-1">
                    {action.title}
                  </span>
                  <Command size={12} className="opacity-40" />
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
