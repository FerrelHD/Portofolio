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
  Zap,
  Terminal,
  Flame,
  ShieldCheck,
  SlidersHorizontal,
  Printer,
} from "lucide-react";

import backsoundAudio from "../assets/backsound.mp3";
import spideyEmblem from "../assets/spideyicon.png";
import spideyGif from "../assets/spidey.gif";
import { achievementManager, ACHIEVEMENTS } from "../lib/achievements";
import { soundFX } from "../lib/soundFx";

const SUITS = [
  {
    id: "classic",
    name: "Classic Red & Blue",
    hero: "Peter Parker",
    red: "#D31F1F",
    blue: "#165DFF",
    tagline: "Your friendly neighborhood Spider-Man",
  },
  {
    id: "miles",
    name: "Miles Morales",
    hero: "Brooklyn Cyber",
    red: "#C41212",
    blue: "#2B2D2F",
    tagline: "Stealth charcoal with deep crimson venom blast",
  },
  {
    id: "gwen",
    name: "Ghost-Spider",
    hero: "Gwen Stacy",
    red: "#E11D74",
    blue: "#0284C7",
    tagline: "Vibrant comic magenta & cyan pop-art",
  },
  {
    id: "2099",
    name: "Spider-Man 2099",
    hero: "Miguel O'Hara",
    red: "#EA580C",
    blue: "#1E293B",
    tagline: "Cyber crimson & nightfall slate navy",
  },
];

// Map achievement IDs to sharp comic vector icons
const ACHIEVEMENT_ICONS = {
  spider_sense: <Zap size={14} className="text-spider-red" />,
  multiverse_traveler: <Sparkles size={14} className="text-purple-600" />,
  terminal_hacker: <Terminal size={14} className="text-spider-blue" />,
  daily_bugle: <Newspaper size={14} className="text-spider-yellow" />,
  bug_squasher: <Gamepad2 size={14} className="text-emerald-600" />,
  comic_hero: <Flame size={14} className="text-amber-600" />,
  true_believer: <ShieldCheck size={14} className="text-sky-600" />,
};

const SpiderGadgetDrawer = ({ onOpenBugHunter, onOpenDailyBugle, onOpenDeck }) => {
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

  useEffect(() => {
    const handleToggleBgm = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        soundFX.playBeep(300);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            soundFX.playBeep(600);
          })
          .catch(() => {});
      }
    };

    const handleToggleMute = () => {
      setIsMuted((prev) => {
        const next = !prev;
        soundFX.playBeep(next ? 250 : 500);
        return next;
      });
    };

    const handleToggleDock = () => {
      setIsOpen((prev) => {
        soundFX.playThwip();
        return !prev;
      });
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("spidey:toggle-bgm", handleToggleBgm);
    window.addEventListener("spidey:toggle-mute", handleToggleMute);
    window.addEventListener("spidey:toggle-dock", handleToggleDock);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("spidey:toggle-bgm", handleToggleBgm);
      window.removeEventListener("spidey:toggle-mute", handleToggleMute);
      window.removeEventListener("spidey:toggle-dock", handleToggleDock);
    };
  }, [isPlaying]);

  const applySuit = (suitId) => {
    setActiveSuit(suitId);
    localStorage.setItem("spidey-suit", suitId);
    achievementManager.trackSuit(suitId);
    soundFX.playBeep(600);

    const suit = SUITS.find((s) => s.id === suitId);
    if (suit && typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--color-spider-red", suit.red);
      root.style.setProperty("--color-spider-blue", suit.blue);
      root.style.setProperty("--color-glow-red", `${suit.red}66`);
      root.style.setProperty("--color-glow-blue", `${suit.blue}66`);

      document.body.classList.remove(
        "theme-classic",
        "theme-miles",
        "theme-gwen",
        "theme-2099"
      );
      document.body.classList.add(`theme-${suitId}`);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      soundFX.playBeep(300);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          soundFX.playBeep(600);
        })
        .catch(() => {
          console.warn("Audio autoplay blocked by browser policy");
        });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    soundFX.playBeep(isMuted ? 500 : 250);
  };

  const toggleSfx = () => {
    const muted = soundFX.toggleMute();
    setSfxMuted(muted);
  };

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={backsoundAudio}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      {/* FLOATING TRIGGER TAB (Fixed on screen edge) */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none">
        {/* ANIMATED SPIDEY PERCHED ON TOP OF BUTTON */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="perched-spidey"
              initial={{ y: -60, opacity: 0, scale: 0.3 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{
                y: -50,
                opacity: 0,
                scale: 0.2,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 18,
                mass: 0.8,
              }}
              onClick={() => {
                setIsOpen(true);
                soundFX.playThwip();
              }}
              className="absolute -top-[44px] left-0 cursor-pointer z-30 pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
              title="Click Spidey to open Gadgets!"
            >
              <img
                src={spideyGif}
                alt="Perched Spider-Man"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] filter"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DOCK TOGGLE BUTTON */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            soundFX.playThwip();
          }}
          aria-label="Toggle Spider Control Dock"
          className="group relative flex items-center bg-spider-yellow text-spider-black border-y-3 border-r-3 border-black py-3 pl-3 pr-3.5 rounded-r-2xl shadow-[4px_4px_0_#000] hover:bg-spider-red hover:text-white transition-all hover:pr-5 active:pr-3.5 pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center p-0.5">
              <img
                src={spideyEmblem}
                alt="Spider Emblem"
                className="w-full h-full object-contain filter group-hover:invert"
              />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
              GADGETS
            </span>
            {unlockedCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-spider-red border border-black animate-ping" />
            )}
          </div>
        </button>
      </div>

      {/* FULLY RESPONSIVE SLIDE-OUT DRAWER MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none select-none">
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "-110%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-110%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-auto w-[calc(100vw-1rem)] sm:w-92 max-w-[380px] max-h-[82vh] sm:max-h-[85vh] overflow-y-auto bg-white border-3 sm:border-4 border-black rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_#D31F1F] text-comic-ink"
            >
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b-2 border-black pb-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-spider-yellow border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0_#000]">
                    <ShieldAlert size={14} className="text-spider-black" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-comic-ink">
                    SPIDER CONTROL DOCK
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-[#EDEAE2] border-2 border-black flex items-center justify-center text-comic-ink hover:text-white hover:bg-spider-red transition-all shadow-[2px_2px_0_#000]"
                >
                  <X size={15} strokeWidth={3} />
                </button>
              </div>

              {/* Tab Selector Buttons (Comic Segmented Control) */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#EDEAE2] p-1.5 rounded-xl border-2 border-black mb-4 text-[10px] font-black uppercase shadow-[2px_2px_0_#000]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("suits");
                    soundFX.playBeep(400);
                  }}
                  className={`py-2 rounded-lg transition-all border-2 ${
                    activeTab === "suits"
                      ? "bg-spider-red text-white border-black shadow-[2px_2px_0_#000]"
                      : "border-transparent text-comic-ink/60 hover:text-comic-ink"
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
                  className={`py-2 rounded-lg transition-all border-2 flex items-center justify-center gap-1 ${
                    activeTab === "trophies"
                      ? "bg-spider-yellow text-spider-black border-black shadow-[2px_2px_0_#000]"
                      : "border-transparent text-comic-ink/60 hover:text-comic-ink"
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
                  className={`py-2 rounded-lg transition-all border-2 flex items-center justify-center gap-1 ${
                    activeTab === "arcade"
                      ? "bg-spider-blue text-white border-black shadow-[2px_2px_0_#000]"
                      : "border-transparent text-comic-ink/60 hover:text-comic-ink"
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
                    <span className="text-[10px] font-black uppercase tracking-wider text-spider-red flex items-center gap-1">
                      <Sparkles size={12} /> Multiverse Suits
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {SUITS.map((suit) => {
                      const isActive = activeSuit === suit.id;
                      return (
                        <button
                          key={suit.id}
                          onClick={() => applySuit(suit.id)}
                          className={`p-2.5 border-2 rounded-xl transition-all flex flex-col justify-between text-left ${
                            isActive
                              ? "bg-spider-red text-white border-black shadow-[3px_3px_0_#000]"
                              : "bg-[#EDEAE2] border-black text-comic-ink hover:border-spider-yellow shadow-[2px_2px_0_#000]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border-2 border-black shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${suit.red} 50%, ${suit.blue} 50%)`,
                              }}
                            />
                            {isActive && (
                              <span className="w-4 h-4 rounded-full bg-white text-spider-red flex items-center justify-center border border-black">
                                <Check size={10} strokeWidth={4} />
                              </span>
                            )}
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
                <div className="space-y-2.5 mb-4 animate-fade-in max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-spider-red flex items-center gap-1">
                      <Trophy size={12} /> Multiverse Badges ({unlockedCount}/7)
                    </span>
                  </div>

                  {Object.values(ACHIEVEMENTS).map((ach) => {
                    const isUnlocked = achievementManager.isUnlocked(ach.id);
                    const iconEl = ACHIEVEMENT_ICONS[ach.id] || <Trophy size={14} />;

                    return (
                      <div
                        key={ach.id}
                        className={`p-2.5 rounded-xl border-2 border-black flex items-start gap-2.5 transition-all shadow-[2px_2px_0_#000] ${
                          isUnlocked
                            ? "bg-[#EDEAE2] text-comic-ink"
                            : "bg-[#EDEAE2]/50 text-comic-ink/50 opacity-60"
                        }`}
                      >
                        {/* Comic Icon Box */}
                        <div
                          className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center shrink-0 ${
                            isUnlocked ? "bg-white shadow-[1px_1px_0_#000]" : "bg-black/20"
                          }`}
                        >
                          {iconEl}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wide truncate">
                              {ach.title}
                            </span>
                            {isUnlocked ? (
                              <span className="text-[8px] font-black text-spider-black bg-spider-yellow border border-black px-1.5 py-0.2 rounded shadow-[1px_1px_0_#000]">
                                UNLOCKED
                              </span>
                            ) : (
                              <span className="text-[8px] font-bold text-comic-ink/60 bg-white border border-black/30 px-1.5 py-0.2 rounded">
                                LOCKED
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] leading-tight text-comic-ink/80 mt-1 font-medium">
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
                  {/* Bug Hunter Card */}
                  <div className="bg-[#EDEAE2] border-2 border-black p-3 rounded-xl shadow-[3px_3px_0_#D31F1F]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-spider-red border border-black flex items-center justify-center text-white">
                        <Gamepad2 size={12} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wide text-comic-ink">
                        Spidey Bug Hunter
                      </span>
                    </div>
                    <p className="text-[10px] text-comic-ink/80 mb-2.5 leading-relaxed font-medium">
                      Canvas arcade 30 detik untuk menembakkan jaring ke runtime errors!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onOpenBugHunter) onOpenBugHunter();
                      }}
                      className="w-full py-2 bg-spider-red hover:bg-red-700 text-white font-black text-xs uppercase rounded-lg border-2 border-black shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Play size={11} fill="white" />
                      <span>Launch Mini-Game</span>
                    </button>
                  </div>

                  {/* Daily Bugle Press Card */}
                  <div className="bg-[#EDEAE2] border-2 border-black p-3 rounded-xl shadow-[3px_3px_0_#FFD500]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-spider-yellow border border-black flex items-center justify-center text-spider-black">
                        <Newspaper size={12} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wide text-comic-ink">
                        The Daily Bugle Press
                      </span>
                    </div>
                    <p className="text-[10px] text-comic-ink/80 mb-2.5 leading-relaxed font-medium">
                      Koran komik retro vintage berisi liputan investigasi sosok developer!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onOpenDailyBugle) onOpenDailyBugle();
                      }}
                      className="w-full py-2 bg-spider-yellow hover:bg-amber-300 text-spider-black font-black text-xs uppercase rounded-lg border-2 border-black shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Read Daily Bugle</span>
                    </button>
                  </div>

                  {/* PITCH DECK / EXPORT PDF CARD */}
                  <div className="bg-[#EDEAE2] border-2 border-black p-3 rounded-xl shadow-[3px_3px_0_#D31F1F]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-spider-red border border-black flex items-center justify-center text-white">
                        <Printer size={12} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wide text-comic-ink">
                        Portfolio Pitch Deck & PDF
                      </span>
                    </div>
                    <p className="text-[10px] text-comic-ink/80 mb-2.5 leading-relaxed font-medium">
                      Slide presentasi ringkas 5 halaman landscape untuk export PDF / pitching!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onOpenDeck) onOpenDeck();
                      }}
                      className="w-full py-2 bg-spider-red hover:bg-red-700 text-white font-black text-xs uppercase rounded-lg border-2 border-black shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Open Pitch Deck & PDF (E)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* AUDIO & SFX SUITE SECTION */}
              <div className="relative z-10 space-y-2.5 border-t-2 border-black pt-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-spider-blue">
                    <Music size={11} /> Audio Suite
                  </span>
                  <button
                    type="button"
                    onClick={toggleSfx}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md border-2 border-black text-[9px] font-black uppercase shadow-[1.5px_1.5px_0_#000] transition-all ${
                      sfxMuted
                        ? "bg-red-100 text-red-700 border-red-500"
                        : "bg-emerald-100 text-emerald-800 border-emerald-500"
                    }`}
                    title="Toggle Web Audio Synthesizer SFX"
                  >
                    <Volume1 size={10} />
                    <span>SFX: {sfxMuted ? "MUTED" : "ACTIVE"}</span>
                  </button>
                </div>

                {/* BGM Row */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all ${
                      isPlaying
                        ? "bg-spider-yellow text-spider-black"
                        : "bg-[#EDEAE2] text-comic-ink hover:bg-spider-red hover:text-white"
                    }`}
                  >
                    {isPlaying ? <Pause size={12} strokeWidth={3} /> : <Play size={12} strokeWidth={3} />}
                    <span>{isPlaying ? "PAUSE BGM" : "PLAY BGM"}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="p-2 bg-[#EDEAE2] rounded-xl border-2 border-black text-comic-ink hover:bg-spider-blue hover:text-white shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={15} strokeWidth={2.5} />
                    ) : (
                      <Volume2 size={15} strokeWidth={2.5} />
                    )}
                  </button>
                </div>

                {/* Comic Volume Slider Row */}
                <div className="flex items-center gap-2.5 bg-[#EDEAE2] px-2.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0_#000]">
                  <Volume2 size={13} className="text-spider-red shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const newVol = parseFloat(e.target.value);
                      setVolume(newVol);
                      if (isMuted && newVol > 0) setIsMuted(false);
                    }}
                    aria-label="Volume Slider"
                    className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer accent-spider-red border border-black"
                  />
                  <span className="text-[10px] font-mono font-bold text-comic-ink w-8 text-right shrink-0 tabular-nums">
                    {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpiderGadgetDrawer;
