"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Check,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldAlert,
  Trophy,
  Gamepad2,
  Newspaper,
  Volume1,
} from "lucide-react";
import backsoundAudio from "../assets/backsound.mp3";
import spideyEmblem from "../assets/spiderman-emblem.jpg";
import { achievementManager, ACHIEVEMENTS } from "../lib/achievements";
import { soundFX } from "../lib/soundFx";

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

const SpiderGadgetDrawer = ({ onOpenBugHunter, onOpenDailyBugle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("suits"); // "suits" | "trophies" | "arcade"
  const [activeSuit, setActiveSuit] = useState("classic");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [sfxMuted, setSfxMuted] = useState(soundFX.isMuted());

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
    setUnlockedCount(achievementManager.getUnlockedCount());

    const unsubscribe = achievementManager.subscribe(() => {
      setUnlockedCount(achievementManager.getUnlockedCount());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const applySuit = (suitId) => {
    setActiveSuit(suitId);
    localStorage.setItem("spidey-suit", suitId);
    achievementManager.trackSuit(suitId);
    soundFX.playBeep(600);

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

  const toggleSfx = () => {
    const nextVal = !sfxMuted;
    soundFX.setMuted(nextVal);
    setSfxMuted(nextVal);
    if (!nextVal) soundFX.playBeep(700);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <audio ref={audioRef} src={backsoundAudio} loop preload="auto" />

      {/* COMPACT LEFT ATTACHED BUTTON WITH UNLOCKED BADGE */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          soundFX.playBeep(520);
        }}
        className="group relative flex items-center justify-center bg-spider-red border-y-3 border-r-3 border-spider-black w-11 h-11 comic-chip shadow-2xl pop-shadow-red hover:bg-spider-yellow transition-all active:scale-95 text-comic-ink"
        style={{ borderRadius: "0 8px 8px 0" }}
        title="Open Spider Gadget Dock & Trophies"
      >
        <img
          src={spideyEmblem}
          alt="Spider Emblem"
          className="w-7 h-7 object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
        />
        {unlockedCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow">
            {unlockedCount}
          </span>
        )}
      </button>

      {/* SLIDE-OUT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-[290px] xs:w-80 sm:w-88 max-w-[calc(100vw-3.5rem)] max-h-[88vh] overflow-y-auto bg-comic-panel border-4 border-spider-black comic-chip p-4 sm:p-5 shadow-2xl pop-shadow-red text-white"
            >
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b-2 border-comic-ink/20 pb-3 mb-3">
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

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-zinc-800 mb-4 text-[10px] font-black uppercase">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("suits");
                    soundFX.playBeep(400);
                  }}
                  className={`py-1.5 rounded-lg transition-all ${
                    activeTab === "suits"
                      ? "bg-spider-red text-white shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Suits
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("trophies");
                    soundFX.playBeep(480);
                  }}
                  className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === "trophies"
                      ? "bg-yellow-500 text-black shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Trophy size={11} />
                  <span>{unlockedCount}/7</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("arcade");
                    soundFX.playBeep(560);
                  }}
                  className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === "arcade"
                      ? "bg-spider-blue text-white shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Gamepad2 size={11} />
                  <span>Arcade</span>
                </button>
              </div>

              {/* TAB 1: SUITS */}
              {activeTab === "suits" && (
                <div className="space-y-3 mb-4 animate-fade-in">
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
                          className={`p-2.5 comic-chip border-2 transition-all flex flex-col justify-between text-left ${
                            isActive
                              ? "bg-spider-red text-white border-spider-black pop-shadow-sm"
                              : "bg-comic-surface border-comic-ink/20 text-zinc-300 hover:border-comic-ink"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-spider-black shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${suit.red} 50%, ${suit.blue} 50%)`,
                              }}
                            />
                            {isActive && <Check size={11} strokeWidth={3} />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider leading-tight">
                            {suit.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: TROPHIES */}
              {activeTab === "trophies" && (
                <div className="space-y-2.5 mb-4 animate-fade-in max-h-56 overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400">
                      Multiverse Badges ({unlockedCount}/7)
                    </span>
                  </div>

                  {Object.values(ACHIEVEMENTS).map((ach) => {
                    const isUnlocked = achievementManager.isUnlocked(ach.id);
                    return (
                      <div
                        key={ach.id}
                        className={`p-2 rounded-xl border flex items-start gap-2.5 transition-all ${
                          isUnlocked
                            ? "bg-yellow-500/10 border-yellow-500/40 text-white"
                            : "bg-black/40 border-zinc-800 text-zinc-500 opacity-60"
                        }`}
                      >
                        <span className="text-base shrink-0">{ach.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wide truncate">
                              {ach.title}
                            </span>
                            {isUnlocked && (
                              <span className="text-[9px] font-black text-yellow-400 bg-yellow-400/20 px-1 rounded">
                                UNLOCKED
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] leading-tight text-zinc-400 mt-0.5">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: ARCADE & PRESS */}
              {activeTab === "arcade" && (
                <div className="space-y-3 mb-4 animate-fade-in">
                  <div className="bg-[#12121A] border-2 border-spider-red p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Gamepad2 size={16} className="text-spider-red" />
                      <span className="text-xs font-black uppercase tracking-wide text-white">
                        Spidey Bug Hunter
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mb-2.5">
                      Canvas arcade 30 detik untuk menembakkan jaring ke runtime errors!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onOpenBugHunter) onOpenBugHunter();
                      }}
                      className="w-full py-1.5 bg-spider-red hover:bg-red-600 text-white font-black text-[11px] uppercase rounded-lg shadow transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play size={12} fill="white" />
                      <span>Launch Mini-Game</span>
                    </button>
                  </div>

                  <div className="bg-[#12121A] border-2 border-zinc-700 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Newspaper size={16} className="text-yellow-400" />
                      <span className="text-xs font-black uppercase tracking-wide text-white">
                        The Daily Bugle Press
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mb-2.5">
                      Koran komik retro berisi liputan investigasi sosok developer!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onOpenDailyBugle) onOpenDailyBugle();
                      }}
                      className="w-full py-1.5 bg-[#F4EBD9] text-black hover:bg-white font-black text-[11px] uppercase rounded-lg shadow transition-colors"
                    >
                      Read Daily Bugle
                    </button>
                  </div>
                </div>
              )}

              {/* AUDIO & SFX SUITE SECTION */}
              <div className="relative z-10 space-y-2.5 border-t-2 border-comic-ink/15 pt-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-spider-blue">
                  <span className="flex items-center gap-1">
                    <Music size={11} /> Audio Controls
                  </span>
                  <button
                    type="button"
                    onClick={toggleSfx}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                      sfxMuted
                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                        : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                    }`}
                    title="Toggle Web Audio Synthesizer SFX"
                  >
                    <Volume1 size={10} />
                    <span>SFX: {sfxMuted ? "MUTED" : "ON"}</span>
                  </button>
                </div>

                {/* BGM Row */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 comic-chip border-2 border-comic-ink text-xs font-black uppercase transition-colors ${
                      isPlaying
                        ? "bg-spider-yellow text-spider-black pop-shadow-sm"
                        : "bg-comic-surface text-comic-ink hover:bg-spider-red hover:text-comic-ink"
                    }`}
                  >
                    {isPlaying ? <Pause size={12} strokeWidth={2.5} /> : <Play size={12} strokeWidth={2.5} />}
                    <span>{isPlaying ? "PAUSE BGM" : "PLAY BGM"}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="p-1.5 bg-comic-surface comic-chip border-2 border-comic-ink text-comic-ink hover:bg-spider-blue transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={14} strokeWidth={2.5} />
                    ) : (
                      <Volume2 size={14} strokeWidth={2.5} />
                    )}
                  </button>
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
