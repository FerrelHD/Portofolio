"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFX } from "../lib/soundFx";
import ferrelPortrait from "../assets/ferrel-portrait.jpg";
import spideyIcon from "../assets/spideyicon.png";

const ComicSocialCard = ({ onFocusContact }) => {
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikes((l) => (next ? l + 1 : l - 1));
    soundFX.playThwip();

    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate(35);
      } catch (_) {}
    }

    if (next) {
      const heartId = Date.now();
      setFloatingHearts((prev) => [...prev, heartId]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((id) => id !== heartId));
      }, 900);
    }
  };

  const handleComment = () => {
    soundFX.playBeep(450);
    if (onFocusContact) {
      onFocusContact();
    } else {
      const nameInput = document.getElementById("contact-name-input") || document.querySelector("input[name='name']");
      if (nameInput) {
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleShare = async () => {
    soundFX.playPunch();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (_) {}
  };

  return (
    <div className="comic-social-card-wrapper w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none">
      <div className="comic-social-card group relative flex flex-col bg-[#FEFAE8] border-[3.5px] border-[#212121] rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0_#212121] hover:shadow-[10px_10px_0_#FF1E26] hover:-translate-y-1.5 hover:-rotate-1 transition-all duration-300">
        
        {/* CARD HEADER: Avatar + User Info */}
        <div className="flex items-center gap-3 mb-3.5">
          {/* Avatar Circle with Spidey Emblem badge */}
          <div className="relative w-12 h-12 rounded-full border-[3px] border-[#212121] bg-gradient-to-tr from-spider-blue to-cyan-300 overflow-hidden shrink-0 shadow-[2px_2px_0_#000] group-hover:scale-105 transition-transform">
            <img
              src={ferrelPortrait}
              alt="Ferrel Rashad"
              className="w-full h-full object-cover grayscale contrast-110"
              onError={(e) => {
                e.currentTarget.src = spideyIcon;
              }}
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className="bg-spider-yellow text-spider-black text-[12px] sm:text-[13px] font-black uppercase px-2 py-0.5 tracking-wider border border-black shadow-[1px_1px_0_#000]"
                style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}
              >
                Ferrel Rashad
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#212121]/80 tracking-widest mt-0.5">
              @FerrelHD • Spider-Dev
            </span>
          </div>
        </div>

        {/* CARD CONTENT: Image Box with Halftone Pattern */}
        <div className="relative w-full aspect-[16/10] rounded-xl border-[3px] border-[#212121] bg-[#165DFF] overflow-hidden shadow-[2px_2px_0_#000] mb-3 group-hover:skew-x-[-1.5deg] group-hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center">
          {/* Radial Halftone Dots */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.3) 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Card Graphic / Badge */}
          <div className="relative z-10 text-center p-3">
            <span className="inline-block bg-black/80 text-spider-yellow text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded border border-spider-yellow/40 shadow-[1px_1px_0_#000] mb-1.5">
              SPIDER-DEV TRANSMISSION FEED
            </span>
            <p className="text-white text-base sm:text-lg font-black uppercase tracking-tight drop-shadow-[0_2px_4px_#000]">
              AVAILABLE FOR NEW MISSIONS
            </p>
          </div>

          {/* Corner SFX Sticker */}
          <div className="absolute top-2 right-2 bg-spider-red text-white text-[8.5px] font-black tracking-wider px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000] rotate-6">
            LIVE ⚡
          </div>
        </div>

        {/* COMIC SPEECH BUBBLE */}
        <div className="relative mb-3.5 p-3 bg-[#FEFAE8] border-[2.5px] border-[#212121] rounded-xl text-[#212121] shadow-[2px_2px_0_#212121]">
          <p className="text-[11.5px] sm:text-xs font-black uppercase leading-relaxed tracking-wide">
            <span className="text-spider-red">MEANWHILE...</span> Ready to build high-impact web apps, 3D game mechanics & creative digital solutions! Drop a transmission below!
          </p>

          {/* Speech Bubble Arrow Pointer */}
          <div className="absolute -bottom-2.5 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#212121]" />
          <div className="absolute -bottom-2 left-[25px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#FEFAE8]" />
        </div>

        {/* CARD ACTIONS: Like, Comment, Share */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t-2 border-[#212121]/20">
          {/* Like Button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#212121] font-black text-xs uppercase shadow-[2px_2px_0_#212121] hover:bg-spider-red hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                isLiked ? "bg-spider-red text-white" : "bg-spider-yellow text-spider-black"
              }`}
            >
              <svg className="w-4 h-4 fill-current stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likes}</span>
            </button>

            {/* Floating Heart Particles */}
            <AnimatePresence>
              {floatingHearts.map((id) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, scale: 1.4, rotate: (Math.random() - 0.5) * 30 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute -top-3 left-3 text-spider-red text-base pointer-events-none"
                >
                  ❤️
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Comment / Direct Chat Button */}
          <button
            type="button"
            onClick={handleComment}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#212121] bg-spider-yellow text-spider-black hover:bg-spider-blue hover:text-white font-black text-xs uppercase shadow-[2px_2px_0_#212121] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            title="Write a message"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Transmit</span>
          </button>

          {/* Share / Copy Link Button */}
          <button
            type="button"
            onClick={handleShare}
            className="relative p-1.5 px-2.5 rounded-lg border-2 border-[#212121] bg-spider-yellow text-spider-black hover:bg-emerald-400 hover:text-spider-black font-black text-xs uppercase shadow-[2px_2px_0_#212121] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
            title="Share portfolio link"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicSocialCard;
