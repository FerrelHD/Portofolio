"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, Music, Play, Pause, Volume2, VolumeX, ShieldAlert } from "lucide-react";
import backsoundAudio from "../assets/backsound.mp3";

const SUITS = [
  {
    id: "classic",
    name: "Classic Red & Blue",
    hero: "Peter Parker",
    red: "#FF1E26",
    blue: "#165DFF",
    tagline: "Your friendly neighborhood Spider-Man",
  },
  {
    id: "miles",
    name: "Miles Morales",
    hero: "Brooklyn Cyber",
    red: "#FF0033",
    blue: "#141417",
    tagline: "Matte black with neon red venom blast",
  },
  {
    id: "gwen",
    name: "Ghost-Spider",
    hero: "Gwen Stacy",
    red: "#FF007A",
    blue: "#00F0FF",
    tagline: "Vibrant cyan & magenta pop-art aesthetic",
  },
  {
    id: "2099",
    name: "Spider-Man 2099",
    hero: "Miguel O'Hara",
    red: "#FF5500",
    blue: "#0A1128",
    tagline: "Futuristic deep navy & cyber orange glow",
  },
];

/* Iconic Sharp Spider-Man Suit Emblem Vector SVG */
const SpiderEmblem = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    {/* Central Spider Head & Abdomen Body */}
    <path d="M50 42 c-2 -4 -6 -7 -6 -12 c0 -4 2 -8 6 -10 c4 2 6 6 6 10 c0 5 -4 8 -6 12 z" />
    <path d="M50 44 c-4 4 -7 12 -7 20 c0 10 3 18 7 24 c4 -6 7 -14 7 -24 c0 -8 -3 -16 -7 -20 z" />
    {/* Left Top Legs */}
    <path d="M46 36 Q32 18 18 20 Q30 28 42 38 Z" />
    <path d="M44 40 Q22 26 12 34 Q26 40 40 44 Z" />
    {/* Left Bottom Legs */}
    <path d="M43 48 Q20 48 10 60 Q26 56 41 52 Z" />
    <path d="M45 54 Q28 68 22 84 Q34 72 44 60 Z" />
    {/* Right Top Legs */}
    <path d="M54 36 Q68 18 82 20 Q70 28 58 38 Z" />
    <path d="M56 40 Q78 26 88 34 Q74 40 60 44 Z" />
    {/* Right Bottom Legs */}
    <path d="M57 48 Q80 48 90 60 Q74 56 59 52 Z" />
    <path d="M55 54 Q72 68 78 84 Q66 72 56 60 Z" />
  </svg>
);

const SpiderGadgetDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSuit, setActiveSuit] = useState("classic");

  // Audio Player State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.03); // Fixed default 3%

  useEffect(() => {
    // Restore Saved Theme
    const saved = localStorage.getItem("spidey-suit");
    if (saved && SUITS.some((s) => s.id === saved)) {
      applySuit(saved);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
      const editable =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        (e.target && typeof e.target.isContentEditable === "boolean" && e.target.isContentEditable);

      if (editable) return;

      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "m" || e.key === "M")) {
        setIsMuted((prev) => !prev);
      }
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "p" || e.key === "P")) {
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const applySuit = (suitId) => {
    setActiveSuit(suitId);
    localStorage.setItem("spidey-suit", suitId);
    const suit = SUITS.find((s) => s.id === suitId);
    if (suit && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--color-spider-red", suit.red);
      document.documentElement.style.setProperty("--color-spider-blue", suit.blue);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked:", err));
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <audio ref={audioRef} src={backsoundAudio} loop preload="auto" />

      {/* LEFT ATTACHED SPIDER EMBLEM TAB BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group flex items-center gap-2 bg-spider-red border-y-3 border-r-3 border-spider-black py-3 px-2.5 comic-chip shadow-2xl pop-shadow-red hover:bg-spider-yellow hover:text-spider-black transition-all active:scale-95 text-comic-ink"
        style={{ borderRadius: "0 8px 8px 0" }}
        title="Open Spider Gadget Control Dock"
      >
        <SpiderEmblem className="w-6 h-6 text-spider-yellow group-hover:text-spider-black transition-transform group-hover:scale-110" />
        <span className="text-[10px] font-black uppercase tracking-widest writing-mode-vertical hidden sm:inline">
          DOCK
        </span>
      </button>

      {/* SLIDE-OUT COMIC GADGET DRAWER PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-80 bg-comic-panel border-4 border-spider-black comic-chip p-5 shadow-2xl pop-shadow-red overflow-hidden"
            >
              {/* Halftone Overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none halftone-overlay-sm" />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b-3 border-comic-ink/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-spider-yellow" />
                  <span className="text-xs font-black uppercase tracking-widest text-comic-ink comic-stroke-thin">
                    Spider Control Dock
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-comic-ink/60 hover:text-spider-yellow transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* SECTION 1: MULTIVERSE SUITS */}
              <div className="relative z-10 space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-spider-yellow">
                    Multiverse Suits
                  </span>
                  <Sparkles size={12} className="text-spider-yellow" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SUITS.map((suit) => {
                    const isActive = activeSuit === suit.id;
                    return (
                      <button
                        key={suit.id}
                        onClick={() => applySuit(suit.id)}
                        className={`p-2 comic-chip border-2 transition-all flex flex-col justify-between text-left ${
                          isActive
                            ? "bg-spider-red text-comic-ink border-spider-black pop-shadow-sm"
                            : "bg-comic-surface border-comic-ink/20 text-comic-ink hover:border-comic-ink"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-spider-black shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${suit.red} 50%, ${suit.blue} 50%)`,
                            }}
                          />
                          {isActive && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider leading-tight">
                          {suit.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: BGM AUDIO SUITE */}
              <div className="relative z-10 space-y-3 border-t-2 border-comic-ink/15 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-spider-blue flex items-center gap-1.5">
                    <Music size={12} /> BGM Audio Suite
                  </span>
                  <span className="text-[10px] font-black text-spider-yellow tabular-nums">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>

                {/* Play/Pause & Mute Button Row */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 comic-chip border-2 border-comic-ink text-xs font-black uppercase transition-colors ${
                      isPlaying
                        ? "bg-spider-yellow text-spider-black pop-shadow-sm"
                        : "bg-comic-surface text-comic-ink hover:bg-spider-red hover:text-comic-ink"
                    }`}
                  >
                    {isPlaying ? <Pause size={13} strokeWidth={2.5} /> : <Play size={13} strokeWidth={2.5} />}
                    <span>{isPlaying ? "PAUSE [P]" : "PLAY [P]"}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="p-2 bg-comic-surface comic-chip border-2 border-comic-ink text-comic-ink hover:bg-spider-blue transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={15} strokeWidth={2.5} />
                    ) : (
                      <Volume2 size={15} strokeWidth={2.5} />
                    )}
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[9px] font-black text-comic-ink/60 uppercase">VOL</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-spider-red cursor-pointer h-1.5 bg-comic-ink/20 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpiderGadgetDrawer;
