"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import backsoundAudio from "../assets/backsound.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.03); // Fixed default volume 3%
  const [isOpen, setIsOpen] = useState(false);

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

      // M = Mute / Unmute
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "m" || e.key === "M")) {
        setIsMuted((prev) => !prev);
      }

      // P = Play / Pause song
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "p" || e.key === "P")) {
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

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

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  return (
    <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40">
      <audio ref={audioRef} src={backsoundAudio} loop preload="auto" />

      <div className="relative flex items-center gap-2">
        {/* EXPANDED CONTROL PANEL POPOVER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute bottom-full left-0 mb-3 bg-comic-card comic-panel p-3 rounded-sm shadow-xl flex flex-col gap-2.5 min-w-[210px]"
            >
              <div className="flex items-center justify-between border-b-2 border-comic-ink/10 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-comic-ink/80 flex items-center gap-1.5">
                  <Music size={12} className="text-spider-red animate-pulse" /> BGM AUDIO
                </span>
                <span className="text-[10px] font-black text-spider-yellow tabular-nums">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Play/Pause & Mute Row */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={togglePlay}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 comic-chip border-2 border-comic-ink text-[10px] font-black uppercase transition-colors ${
                    isPlaying
                      ? "bg-spider-yellow text-spider-black"
                      : "bg-comic-panel text-comic-ink hover:bg-spider-red hover:text-comic-ink"
                  }`}
                >
                  {isPlaying ? <Pause size={12} strokeWidth={2.5} /> : <Play size={12} strokeWidth={2.5} />}
                  <span>{isPlaying ? "PAUSE" : "PLAY BGM"}</span>
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 bg-comic-panel comic-chip border-2 border-comic-ink text-comic-ink hover:bg-spider-blue transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={14} strokeWidth={2.5} />
                  ) : (
                    <Volume2 size={14} strokeWidth={2.5} />
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
                  aria-label="Volume slider"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN COLLAPSED FLOATING PILL BUTTON */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 py-2 px-3.5 comic-chip border-2 border-comic-ink text-xs font-black uppercase tracking-wider transition-transform active:scale-95 pop-shadow-sm ${
            isPlaying
              ? "bg-spider-yellow text-spider-black pop-shadow-active"
              : "bg-comic-panel text-comic-ink hover:bg-spider-red hover:text-comic-ink"
          }`}
        >
          <Music size={14} strokeWidth={2.5} className={isPlaying ? "animate-bounce text-spider-black" : ""} />
          <span>{isPlaying ? "BGM PLAYING" : "BGM AUDIO"}</span>
          {isMuted || volume === 0 ? (
            <VolumeX size={14} strokeWidth={2.5} />
          ) : (
            <Volume2 size={14} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
