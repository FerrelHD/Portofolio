"use client";
import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import backsoundAudio from "../assets/backsound.mp3";

const AudioPlayer = ({ isMobile = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

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
    <div className={`relative flex items-center gap-2 ${isMobile ? "w-full justify-between bg-comic-panel p-3 comic-chip" : ""}`}>
      <audio ref={audioRef} src={backsoundAudio} loop preload="auto" />

      {/* Play/Pause & Mute Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className={`flex items-center gap-1.5 py-1 px-2.5 comic-chip border-2 border-comic-ink text-[10px] sm:text-xs font-black uppercase transition-colors ${
            isPlaying ? "bg-spider-yellow text-spider-black" : "bg-comic-panel text-comic-ink hover:bg-spider-red hover:text-comic-ink"
          }`}
        >
          {isPlaying ? <Pause size={13} strokeWidth={2.5} /> : <Play size={13} strokeWidth={2.5} />}
          <span>{isPlaying ? "BGM: ON" : "BGM: OFF"}</span>
        </button>

        <button
          onClick={toggleMute}
          onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="p-1.5 bg-comic-panel comic-chip border-2 border-comic-ink text-comic-ink hover:bg-spider-blue transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={14} strokeWidth={2.5} /> : <Volume2 size={14} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Volume Slider (Hover / Inline) */}
      <div
        className={`flex items-center gap-2 ${
          isMobile ? "flex" : "hidden sm:flex"
        }`}
        onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 sm:w-20 accent-spider-red cursor-pointer h-1.5 bg-comic-ink/20 rounded-lg appearance-none"
          aria-label="Volume slider"
        />
        <span className="text-[9px] font-black text-comic-ink/70 w-6 text-right tabular-nums">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
