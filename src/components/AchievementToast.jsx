"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, X } from "lucide-react";
import { achievementManager } from "../lib/achievements";

const AchievementToast = () => {
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    const unsubscribe = achievementManager.subscribe((event, data) => {
      if (event === "unlock" && data) {
        setActiveToast(data);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  return (
    <div className="fixed top-5 right-5 z-[9999] pointer-events-none flex flex-col gap-2 max-w-sm w-[90vw]">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto relative bg-[#0d1117]/95 border-2 border-yellow-400/90 rounded-2xl p-4 shadow-[0_10px_35px_rgba(255,215,0,0.35)] backdrop-blur-md overflow-hidden"
          >
            {/* Comic burst background accent */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-spider-red to-spider-blue animate-pulse" />

            <div className="flex items-start gap-3.5">
              {/* Badge Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-spider-red/20 border border-yellow-400/50 flex items-center justify-center text-2xl shadow-inner shrink-0 animate-bounce">
                {activeToast.icon || "🏆"}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400">
                  <Trophy size={13} className="inline text-yellow-400" />
                  <span>Achievement Unlocked!</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide mt-0.5 truncate">
                  {activeToast.title}
                </h4>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed mt-0.5">
                  {activeToast.description}
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setActiveToast(null)}
                className="text-zinc-400 hover:text-white p-1 transition-colors shrink-0"
                aria-label="Dismiss toast"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementToast;
