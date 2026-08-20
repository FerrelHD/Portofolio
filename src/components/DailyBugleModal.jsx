"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Newspaper, Award, Code, Sparkles, ExternalLink } from "lucide-react";
import { achievementManager } from "../lib/achievements";
import { soundFX } from "../lib/soundFx";

const DailyBugleModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      achievementManager.unlock("daily_bugle");
      soundFX.playBeep(480);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Newspaper Paper Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F4EBD9] text-[#1A1A1A] rounded-sm p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_8px_#0A0A0A] border-4 border-[#222] font-serif z-10"
        >
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4 font-sans text-xs uppercase tracking-wider font-black">
            <div className="flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded-xs">SPECIAL EDITION</span>
              <span className="text-zinc-600">VOL. LXIV NO. 28,491</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1 text-zinc-800 hover:text-black font-bold p-1 transition-colors"
                title="Print Newspaper"
              >
                <Printer size={15} />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-black text-white p-1 rounded-sm hover:bg-spider-red transition-colors"
                aria-label="Close Newspaper"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Newspaper Masthead */}
          <div className="text-center border-b-4 border-double border-black pb-4 mb-4">
            <div className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-black text-zinc-700 uppercase mb-1">
              "THE VOICE OF THE MULTIVERSE • BROOKLYN'S FINEST PRESS"
            </div>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#0A0A0A] leading-none"
              style={{ fontFamily: "'Impact', 'Cinzel', 'Times New Roman', serif" }}
            >
              THE DAILY BUGLE
            </h1>
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-sans font-bold uppercase border-t-2 border-b-2 border-black mt-2 py-1 px-1">
              <span>NEW YORK & BROOKLYN CITY</span>
              <span>SPECIAL DEV REVEAL</span>
              <span>PRICE: 10 CENTS (FREE WITH GITHUB)</span>
            </div>
          </div>

          {/* Screaming Headline */}
          <div className="text-center my-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-black font-sans">
              WHO IS FERREL? CODING MENACE OR WEB HERO?!
            </h2>
            <p className="text-xs sm:text-sm font-sans font-bold text-zinc-700 italic mt-1">
              Exclusive Front-Page Investigation Into The Fullstack Developer Swinging Across Modern Frameworks!
            </p>
          </div>

          {/* Newspaper 3-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t-2 border-black">
            {/* Column 1: Secret Origins & Bio */}
            <div className="space-y-3 md:border-r border-black/30 md:pr-4">
              <h3 className="font-sans font-black text-sm uppercase tracking-wide border-b border-black pb-1 flex items-center gap-1.5">
                <Code size={14} className="text-spider-red" />
                <span>ORIGIN: THE LAB BITE</span>
              </h3>
              <p className="text-xs leading-relaxed text-justify first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-1.5 first-letter:text-black">
                Bitten by an insatiable curiosity for creative computing, Ferrel has evolved into an agile Fullstack & Interactive Web Developer. Equipped with high-performance React architectures, smooth motion physics, and clean modular code, he crafts digital experiences that feel alive.
              </p>
              <div className="bg-black/5 p-3 border-l-2 border-black text-xs italic">
                "With great computing power comes great responsibility for clean architecture and 60 FPS interfaces."
              </div>
              <p className="text-xs leading-relaxed text-justify">
                From designing complex UI state machines to video editing and 3D worlds in Blender, he bridges technical precision with comic-book aesthetic flair.
              </p>
            </div>

            {/* Column 2: Halftone Photo & Stats */}
            <div className="space-y-3 md:border-r border-black/30 md:pr-4">
              {/* Halftone / Comic Box */}
              <div className="border-2 border-black p-2 bg-black text-white text-center shadow-[4px_4px_0_#222]">
                <div className="bg-[#EAE1D0] p-4 text-black border border-black/50">
                  <div className="text-3xl mb-1">🕸️ ⚡ 💻</div>
                  <div className="font-sans font-black text-sm uppercase tracking-wider text-spider-red">
                    WANTED FOR CLEAN CODE
                  </div>
                  <div className="text-[10px] font-mono text-zinc-700 mt-1">
                    STATUS: AVAILABLE FOR COLLABORATIONS
                  </div>
                </div>
                <div className="text-[9px] font-sans font-semibold uppercase text-zinc-300 mt-1.5">
                  FIG 1.1: ARCHIVE PHOTO CAUGHT IN VITE DEV SERVER
                </div>
              </div>

              {/* Bug Squashed Statistics */}
              <div className="border-t border-b border-black py-2 my-2">
                <h4 className="font-sans font-bold text-xs uppercase text-zinc-900 mb-1">
                  OFFICIAL METRICS ON RECORD:
                </h4>
                <ul className="text-xs space-y-1 font-mono text-zinc-800">
                  <li>✔ 100+ Production Bugs Squashed</li>
                  <li>✔ 99.9% Lighthouse Accessibility</li>
                  <li>✔ 60 FPS Micro-Interactions</li>
                  <li>✔ 4 Alternate Spider Suits Unlocked</li>
                </ul>
              </div>
            </div>

            {/* Column 3: J. Jonah Jameson Editorial */}
            <div className="space-y-3">
              <h3 className="font-sans font-black text-sm uppercase tracking-wide border-b border-black pb-1 flex items-center gap-1.5">
                <Award size={14} className="text-spider-blue" />
                <span>EDITORIAL: J. JONAH JAMESON</span>
              </h3>
              <p className="text-xs leading-relaxed text-justify font-serif italic text-zinc-900">
                "Listen to me! This kid thinks he can just swing into my office with responsive layouts, TypeScript reliability, and smooth Lenis scrolling?! He's making other websites look ancient! I want photos of him shipping to production RIGHT NOW!"
              </p>
              <div className="border-2 border-dashed border-black p-2.5 bg-yellow-100/60 font-sans text-xs">
                <span className="font-black block uppercase text-[11px] text-zinc-900">
                  ⚡ RECRUITER DIRECT DISPATCH
                </span>
                <span className="text-[11px] text-zinc-700 block mt-0.5">
                  Ready to deploy this superhero onto your team or client projects?
                </span>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-1 font-black text-[11px] uppercase bg-black text-white px-2.5 py-1 rounded-xs hover:bg-spider-red transition-colors"
                >
                  <span>Send Spider-Signal</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Newspaper Footer Banner */}
          <div className="border-t-2 border-black mt-6 pt-2 text-center text-[10px] font-sans font-bold uppercase text-zinc-600 flex justify-between items-center">
            <span>PRINTED IN THE MULTIVERSE</span>
            <span>PRESS ESCAPE OR 'N' TO CLOSE</span>
            <span>COPYRIGHT © DAILY BUGLE DEV CHRONICLES</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DailyBugleModal;
