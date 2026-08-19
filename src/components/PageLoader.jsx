"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command } from "lucide-react";

const LOADER_SESSION_KEY = "comic_portfolio_shown_loader_v1";

const PageLoader = ({ onDone }) => {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // Cek sessionStorage: hanya tampilkan PER page load session (bukan tiap navigasi SPA mount)
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

    // Simulasikan progress sampai window load event + minimal 1 detik
    const start = performance.now();
    const minDuration = 1100;
    const maxProgressBeforeWait = 82;

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
      // Mark selesai, lalu exit animasi
      setTimeout(() => {
        if (!cancelled) {
          setMounted(false);
          try {
            window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
          } catch (_) {}
          if (onDone) onDone();
        }
      }, 450);
    };

    // Jika window sudah fully loaded dan duration terlewati, selesaikan lebih cepat
    if (document.readyState === "complete") {
      // Biarkan animasi berjalan sesuai durasi minimum agar terasa
    } else {
      const onLoad = () => {
        // Page sudah siap, percepata sisa progress ke 100
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("load", onLoad);
      };
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="page-loader"
          key="page-loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="page-loader-inner">
            <div className="page-loader-halftone halftone-overlay" />

            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <span className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-spider-red comic-chip">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-comic-ink"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-comic-ink/50 mb-1">
                    Issue #001 — Loading
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
                    <span className="text-comic-ink comic-stroke">The Amazing </span>
                    <span className="text-spider-red comic-stroke italic">Digital Creator</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Progress Comic Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3 sm:mb-4 flex items-center justify-between px-1"
            >
              <span className="inline-flex items-center gap-2 bg-spider-yellow comic-chip text-spider-black px-3 py-1.5">
                <span className="w-1.5 h-1.5 bg-spider-black comic-chip animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase">
                  Assembling Comic Panels…
                </span>
              </span>
              <span className="inline-flex items-center justify-center bg-spider-black comic-chip text-spider-yellow px-3 py-1.5 min-w-[56px]">
                <span className="text-[10px] sm:text-[11px] font-black tabular-nums">
                  {progress}%
                </span>
              </span>
            </motion.div>

            {/* Progress Track */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="loader-progress-track"
              style={{ borderRadius: "2px" }}
            >
              <div
                className="loader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Footer chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              <span className="inline-flex items-center gap-1.5 bg-comic-panel comic-chip text-comic-ink px-3 py-1.5">
                <Command size={11} strokeWidth={2.5} className="text-spider-yellow" />
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
                  Press ? for shortcuts
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-comic-panel comic-chip text-comic-ink px-3 py-1.5">
                <kbd className="kbd-key" style={{ minWidth: 24, height: 20, fontSize: 10 }}>S</kbd>
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
                  = Spider-Sense
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
