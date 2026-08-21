"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Sparkles } from "lucide-react";
import spiderEmblem from "../assets/spiderman-emblem.png";

const LOADER_SESSION_KEY = "comic_portfolio_shown_loader_v1";

const PageLoader = ({ onDone }) => {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // Cek sessionStorage: hanya tampilkan per page load session (bukan tiap navigasi SPA mount)
    try {
      const shown = window.sessionStorage.getItem(LOADER_SESSION_KEY);
      if (shown === "1") {
        setMounted(false);
        if (onDone) onDone();
        return;
      }
    } catch (_) {
      // ignore storage access errors
    }

    const start = performance.now();
    const minDuration = 1200;
    const maxProgressBeforeWait = 88;

    let rafId;
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / (minDuration * 0.9), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = Math.round(eased * maxProgressBeforeWait);
      if (!cancelled) setProgress(p);
      if (elapsed < minDuration) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    rafId = requestAnimationFrame(tick);

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      setTimeout(() => {
        if (!cancelled) {
          setMounted(false);
          try {
            window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
          } catch (_) {}
          if (onDone) onDone();
        }
      }, 500);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-spider-black/90 backdrop-blur-sm overflow-hidden select-none"
          key="page-loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Halftone Dot Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FFF 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Central Comic Panel Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative w-full max-w-lg bg-[#EDEAE2] border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden p-6 sm:p-8 text-comic-ink text-center"
          >
            {/* Top Comic Red Header Banner */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-spider-red border-b-2 border-spider-black" />

            {/* Issue Badge */}
            <div className="inline-flex items-center gap-1.5 bg-spider-yellow text-spider-black px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-spider-black comic-chip shadow-[2px_2px_0_#000] mt-1 mb-4">
              <Sparkles size={13} className="text-spider-red shrink-0" />
              <span>ISSUE #001 // INITIALIZING SPIDER-DEV</span>
            </div>

            {/* Central Animated Spider Emblem */}
            <motion.div
              animate={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3.5 bg-spider-red border-3 border-spider-black comic-chip flex items-center justify-center p-2.5 shadow-[3px_3px_0_#000]"
            >
              <img
                src={spiderEmblem}
                alt="Spider-Man Emblem"
                className="w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Titles */}
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-comic-ink comic-stroke leading-none mb-1">
              FERREL RASHAD <span className="text-spider-red">AKEYLA</span>
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-spider-black/70 tracking-widest uppercase mb-5">
              YOUR NEIGHBORHOOD DEVELOPER
            </p>

            {/* Progress Header Info */}
            <div className="mb-2 flex items-center justify-between px-1 text-[10px] sm:text-xs font-black uppercase">
              <span className="flex items-center gap-1.5 text-spider-black">
                <span className="w-2 h-2 rounded-full bg-spider-red animate-pulse" />
                <span>Assembling Web Matrix…</span>
              </span>
              <span className="bg-spider-black text-spider-yellow px-2.5 py-0.5 border border-black comic-chip tabular-nums font-mono">
                {progress}%
              </span>
            </div>

            {/* Comic Progress Bar Track */}
            <div className="relative w-full h-5 sm:h-6 bg-white border-3 border-spider-black comic-chip shadow-[3px_3px_0_#000] overflow-hidden mb-5">
              <motion.div
                className="h-full bg-gradient-to-r from-spider-red via-spider-yellow to-spider-yellow border-r-3 border-spider-black"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* Quick Hotkey Tips Footer */}
            <div className="pt-3 border-t-2 border-spider-black/15 flex flex-wrap items-center justify-center gap-2 text-[9px] sm:text-[10px] font-black uppercase text-spider-black/80">
              <span className="inline-flex items-center gap-1 bg-white border border-spider-black/40 px-2 py-1 comic-chip shadow-[1px_1px_0_#000]">
                <kbd className="font-mono bg-spider-yellow text-spider-black px-1 rounded-xs">E</kbd> Deck / PDF
              </span>
              <span className="inline-flex items-center gap-1 bg-white border border-spider-black/40 px-2 py-1 comic-chip shadow-[1px_1px_0_#000]">
                <kbd className="font-mono bg-spider-red text-white px-1 rounded-xs">S</kbd> Spider-Sense
              </span>
              <span className="inline-flex items-center gap-1 bg-white border border-spider-black/40 px-2 py-1 comic-chip shadow-[1px_1px_0_#000]">
                <kbd className="font-mono bg-spider-blue text-white px-1 rounded-xs">Ctrl+K</kbd> Terminal
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
