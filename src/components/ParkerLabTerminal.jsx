"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { soundFX } from "../lib/soundFx";
import { achievementManager } from "../lib/achievements";

const COMMANDS = {
  help: {
    desc: "List all available commands",
    run: () => [
      "╔══════════════════════════════════════════════╗",
      "║  PARKER LAB TERMINAL v1.0 — COMMAND INDEX    ║",
      "╚══════════════════════════════════════════════╝",
      "",
      "  help ............ Show this help menu",
      "  skills .......... Display tech skill tree",
      "  projects ........ Browse project missions",
      "  contact ......... Get contact information",
      "  cat resume ...... Quick resume summary",
      "  whoami .......... About the developer",
      "  sudo hire ....... 🕷️ Hire this developer!",
      "  theme [name] .... Switch suit (classic|miles|gwen|2099)",
      "  neofetch ........ System info (Spider-OS)",
      "  clear ........... Clear terminal",
      "  exit ............ Close terminal",
      "",
      "  TIP: Use Tab for auto-complete, ↑↓ for history",
    ],
  },
  skills: {
    desc: "Display tech skill tree",
    run: () => [
      "┌─────────────────────────────────────┐",
      "│  🕸️  SPIDER SKILL WEB              │",
      "├─────────────────────────────────────┤",
      "│  ★★★★★  React / Next.js            │",
      "│  ★★★★★  Tailwind CSS               │",
      "│  ★★★★☆  TypeScript                 │",
      "│  ★★★★☆  Node.js / Express          │",
      "│  ★★★★☆  Framer Motion              │",
      "│  ★★★★☆  Video Editing              │",
      "│  ★★★☆☆  Blender 3D                 │",
      "│  ★★★☆☆  Unity / C#                 │",
      "│  ★★★★☆  Figma UI/UX               │",
      "│  ★★★★☆  SQL / NoSQL                │",
      "│  ★★★☆☆  AI Agent Workflows         │",
      "└─────────────────────────────────────┘",
    ],
  },
  projects: {
    desc: "Browse project missions",
    run: () => [
      "┌─────────────────────────────────────┐",
      "│  📋  MISSION LOG                    │",
      "├─────────────────────────────────────┤",
      "│                                     │",
      "│  01. Spider-Verse Portfolio          │",
      "│      React + Tailwind + Framer      │",
      "│      Status: ██████████ DEPLOYED    │",
      "│                                     │",
      "│  02. Full-Stack Web Apps             │",
      "│      Next.js + TypeScript + SQL      │",
      "│      Status: ████████░░ ACTIVE      │",
      "│                                     │",
      "│  03. Video & Motion Graphics         │",
      "│      Premiere + After Effects        │",
      "│      Status: ██████████ COMPLETE    │",
      "│                                     │",
      "│  04. 3D Blender Assets               │",
      "│      Modeling + Rendering + Anim     │",
      "│      Status: ███████░░░ IN-PROGRESS │",
      "│                                     │",
      "│  → Scroll down on the site to see   │",
      "│    full project cards & case studies │",
      "└─────────────────────────────────────┘",
    ],
  },
  contact: {
    desc: "Get contact information",
    run: () => [
      "┌─────────────────────────────────────┐",
      "│  📡  CONTACT WEB-LINK               │",
      "├─────────────────────────────────────┤",
      "│                                     │",
      "│  ✉  ferrelrashadakeyla2014@gmail.com │",
      "│  🔗 github.com/FerrelHD             │",
      "│  💼 linkedin.com/in/ferrel-rashad    │",
      "│                                     │",
      "│  → Type 'sudo hire' for a surprise! │",
      "└─────────────────────────────────────┘",
    ],
  },
  whoami: {
    desc: "About the developer",
    run: () => [
      "",
      "  Ferrel Rashad Akeyla",
      "  ─────────────────────",
      "  Full Stack Web Developer",
      "  Video Editor • 3D Artist • Game Dev",
      "",
      "  Your Friendly Neighborhood",
      "  Digital Creator 🕷️",
      "",
    ],
  },
  neofetch: {
    desc: "System info (Spider-OS)",
    run: () => {
      const now = new Date();
      return [
        "",
        "     /\\  /\\       peter@web-os",
        "    /  \\/  \\      ──────────────────",
        "   /\\ 🕷️ /\\      OS: Spider-OS v3.0",
        "  /  \\  /  \\     Host: Parker Lab Terminal",
        " / /\\ \\/ /\\ \\    Kernel: React 19 + Vite",
        "/_/  \\__/  \\_\\   Shell: parker-sh 1.0",
        "                  Resolution: " + window.innerWidth + "x" + window.innerHeight,
        "                  Theme: Comic Vintage Paper",
        "                  Uptime: Since " + now.toLocaleDateString(),
        "                  Packages: Framer, Lucide, Tailwind",
        "",
      ];
    },
  },
  clear: {
    desc: "Clear terminal",
    run: "CLEAR",
  },
  exit: {
    desc: "Close terminal",
    run: "EXIT",
  },
};

// Special multi-word commands
const MULTI_COMMANDS = {
  "cat resume": {
    desc: "Quick resume summary",
    run: () => [
      "┌─────────────────────────────────────┐",
      "│  📄  RESUME — FERREL RASHAD AKEYLA  │",
      "├─────────────────────────────────────┤",
      "│                                     │",
      "│  🎓 Education                       │",
      "│     Computer Science Student         │",
      "│                                     │",
      "│  💼 Focus Areas                     │",
      "│     • Full-Stack Web Development     │",
      "│     • UI/UX Design (Figma)           │",
      "│     • Video Editing & Motion         │",
      "│     • 3D Modeling (Blender)           │",
      "│     • Game Development (Unity)        │",
      "│     • AI Agent Integration            │",
      "│                                     │",
      "│  🛠️  Core Stack                      │",
      "│     React, Next.js, TypeScript,       │",
      "│     Tailwind, Node.js, SQL, Framer    │",
      "│                                     │",
      "│  📥 Download full CV: type           │",
      "│     'download cv' or click the       │",
      "│     DOWNLOAD CV button on hero       │",
      "└─────────────────────────────────────┘",
    ],
  },
  "sudo hire": {
    desc: "🕷️ Hire this developer!",
    run: (ctx) => {
      achievementManager.unlock("terminal_hacker");
      soundFX.playFanfare();
      setTimeout(() => {
        ctx?.onClose?.();
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 1800);
      return [
        "",
        "  ╔═══════════════════════════════════════╗",
        "  ║                                       ║",
        "  ║   🎉  GREAT POWER, GREAT HIRE! 🎉    ║",
        "  ║                                       ║",
        "  ║   Achievement Unlocked:                ║",
        "  ║   🏆 Web Terminal Hacker              ║",
        "  ║                                       ║",
        "  ║   Redirecting to Contact Section...    ║",
        "  ║   Let's build something amazing! 🕷️   ║",
        "  ║                                       ║",
        "  ╚═══════════════════════════════════════╝",
        "",
      ];
    },
  },
  "download cv": {
    desc: "Download resume PDF",
    run: () => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = import.meta.env.BASE_URL + "cv.pdf";
        a.download = "CV_Ferrel_Rashad_Akeyla.pdf";
        a.click();
      }, 300);
      return ["", "  📥 Downloading CV... Check your downloads folder!", ""];
    },
  },
};

const ALL_CMD_NAMES = [
  ...Object.keys(COMMANDS),
  ...Object.keys(MULTI_COMMANDS),
];

const SUITS = ["classic", "miles", "gwen", "2099"];

const WELCOME_LINES = [
  "╔══════════════════════════════════════════════╗",
  "║        🕷️  PARKER LAB TERMINAL v1.0         ║",
  "║     Your Friendly Neighborhood CLI Shell     ║",
  "╚══════════════════════════════════════════════╝",
  "",
  '  Type "help" to see available commands.',
  '  Use Tab to auto-complete, ↑↓ for history.',
  "",
];

const ParkerLabTerminal = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim().toLowerCase();
      if (!trimmed) return;

      const promptLine = `peter@web-os:~$ ${raw.trim()}`;
      soundFX.playBeep(500);

      // Theme command
      if (trimmed.startsWith("theme")) {
        const parts = trimmed.split(/\s+/);
        const suitName = parts[1];
        if (!suitName) {
          setLines((prev) => [
            ...prev,
            promptLine,
            "  Usage: theme [classic|miles|gwen|2099]",
            "  Current suits: " + SUITS.join(", "),
            "",
          ]);
          return;
        }
        if (SUITS.includes(suitName)) {
          const root = document.documentElement;
          const suitMap = {
            classic: { red: "#D31F1F", blue: "#165DFF" },
            miles: { red: "#C41212", blue: "#2B2D2F" },
            gwen: { red: "#E11D74", blue: "#0284C7" },
            "2099": { red: "#EA580C", blue: "#1E293B" },
          };
          const suit = suitMap[suitName];
          root.style.setProperty("--color-spider-red", suit.red);
          root.style.setProperty("--color-spider-blue", suit.blue);
          document.body.classList.remove(
            "theme-classic",
            "theme-miles",
            "theme-gwen",
            "theme-2099"
          );
          document.body.classList.add(`theme-${suitName}`);
          localStorage.setItem("spidey-suit", suitName);
          achievementManager.trackSuit(suitName);
          setLines((prev) => [
            ...prev,
            promptLine,
            `  🎨 Suit changed to: ${suitName.toUpperCase()}`,
            "",
          ]);
          return;
        }
        setLines((prev) => [
          ...prev,
          promptLine,
          `  ✗ Unknown suit "${suitName}". Available: ${SUITS.join(", ")}`,
          "",
        ]);
        return;
      }

      // Check multi-word commands first
      for (const [cmdKey, cmd] of Object.entries(MULTI_COMMANDS)) {
        if (trimmed === cmdKey) {
          const result = typeof cmd.run === "function" ? cmd.run({ onClose }) : cmd.run;
          setLines((prev) => [...prev, promptLine, ...result]);
          return;
        }
      }

      // Single-word commands
      const cmd = COMMANDS[trimmed];
      if (cmd) {
        if (cmd.run === "CLEAR") {
          setLines([]);
          return;
        }
        if (cmd.run === "EXIT") {
          onClose();
          return;
        }
        const result = typeof cmd.run === "function" ? cmd.run({ onClose }) : cmd.run;
        setLines((prev) => [...prev, promptLine, ...result]);
        return;
      }

      // Unknown command
      setLines((prev) => [
        ...prev,
        promptLine,
        `  ✗ Command not found: "${raw.trim()}"`,
        '  Type "help" for available commands.',
        "",
      ]);
    },
    [onClose]
  );

  const handleKeyDown = (e) => {
    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (!partial) return;
      const matches = ALL_CMD_NAMES.filter((n) => n.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
        soundFX.playBeep(700);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          `peter@web-os:~$ ${input}`,
          "  Matches: " + matches.join(", "),
          "",
        ]);
        soundFX.playBeep(400);
      }
      return;
    }

    // History navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInput(history[history.length - 1 - nextIdx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
        return;
      }
      const nextIdx = historyIdx - 1;
      setHistoryIdx(nextIdx);
      setInput(history[history.length - 1 - nextIdx]);
      return;
    }

    // Enter = execute
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input;
      if (val.trim()) {
        setHistory((prev) => [...prev, val.trim()]);
      }
      setHistoryIdx(-1);
      processCommand(val);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9993] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="parker-terminal w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#1a1a2e] border-b border-emerald-500/20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                  title="Close"
                />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400/80 ml-1.5">
                peter@web-os — parker-sh
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-400/60 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Close Terminal (Esc)"
            >
              <X size={16} />
            </button>
          </div>

          {/* Terminal Output */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-[11px] sm:text-[13px] leading-[1.6] text-emerald-400 bg-[#0d1117] parker-terminal-scanlines select-text"
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-all min-h-[1.1em]">
                {line}
              </div>
            ))}

            {/* Active Prompt */}
            <div className="flex items-center gap-0 mt-0.5">
              <span className="text-sky-400 shrink-0">peter@web-os</span>
              <span className="text-white shrink-0">:</span>
              <span className="text-purple-400 shrink-0">~</span>
              <span className="text-white shrink-0">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-emerald-300 caret-emerald-400 outline-none font-mono text-[11px] sm:text-[13px] min-w-0"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#1a1a2e] border-t border-emerald-500/20 text-[9px] sm:text-[10px] font-mono text-emerald-400/50 shrink-0">
            <span>PARKER LAB TERMINAL v1.0</span>
            <span className="hidden sm:inline">Tab: autocomplete • ↑↓: history • Esc: close</span>
            <span className="sm:hidden">Tab • ↑↓ • Esc</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ParkerLabTerminal;
