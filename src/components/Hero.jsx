"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Code2, Zap, Gamepad2, Download, FolderKanban, Briefcase, Mail, MapPin, CheckCircle } from "lucide-react";
import { fadeUp, slideUp, staggerContainer, comicStamp, comicPop } from "../lib/animation";
import ComicDoodleButton from "./ComicDoodleButton";

const Hero = ({ viewMode }) => {
  const reduce = useReducedMotion();

  // Multi-axis organic floating keyframe animations
  const floatAnim1 = reduce
    ? {}
    : {
        x: [0, 22, -18, 12, 0],
        y: [0, -28, 16, -22, 0],
        rotate: [0, 5, -4, 3, 0],
        transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
      };

  const floatAnim2 = reduce
    ? {}
    : {
        x: [0, -26, 18, -12, 0],
        y: [0, 22, -32, 18, 0],
        rotate: [0, -6, 4, -2, 0],
        transition: { duration: 9.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
      };

  const floatAnim3 = reduce
    ? {}
    : {
        x: [0, 20, -24, 15, 0],
        y: [0, -32, 22, -18, 0],
        rotate: [0, 4, -5, 3, 0],
        transition: { duration: 8.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
      };

  const floatAnim4 = reduce
    ? {}
    : {
        x: [0, -22, 28, -16, 0],
        y: [0, 24, -20, 26, 0],
        rotate: [0, -5, 6, -3, 0],
        transition: { duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
      };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* DYNAMIC FLOATING POP BADGES (DESKTOP / LAPTOP) — Nicely Framed Inward */}
      <motion.div
        animate={floatAnim1}
        className="hero-floating-badge absolute top-[12%] right-[6%] lg:right-[8%] xl:right-[12%] 2xl:right-[16%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-red comic-chip p-2.5 sm:p-3 pop-shadow-sm text-white flex items-center gap-3 select-none">
          <div className="w-9 h-9 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
            <Code2 size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
              Web Craft
            </p>
            <p className="font-black text-xs sm:text-sm">Full Stack</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim2}
        className="hero-floating-badge absolute top-[20%] left-[6%] lg:left-[8%] xl:left-[12%] 2xl:left-[16%] z-[5] hidden lg:block"
      >
        <div className="bg-white comic-chip p-2.5 sm:p-3 pop-shadow-sm text-comic-ink flex items-center gap-3 select-none">
          <div className="w-9 h-9 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
            <Github size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/60">
              Open Source
            </p>
            <p className="font-black text-xs sm:text-sm">@FerrelHD</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim3}
        className="hero-floating-badge absolute bottom-[14%] left-[7%] lg:left-[9%] xl:left-[13%] 2xl:left-[17%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-blue comic-chip p-2.5 sm:p-3 pop-shadow-sm text-comic-ink flex items-center gap-3 select-none">
          <div className="w-9 h-9 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/80">
              Multiverse
            </p>
            <p className="font-black text-xs sm:text-sm">Video & 3D</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim4}
        className="hero-floating-badge absolute bottom-[18%] right-[7%] lg:right-[9%] xl:right-[13%] 2xl:right-[17%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-yellow comic-chip p-2.5 sm:p-3 pop-shadow-sm text-spider-black flex items-center gap-3 select-none">
          <div className="w-9 h-9 bg-spider-red comic-chip flex items-center justify-center text-comic-ink">
            <Gamepad2 size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-spider-black/70">
              Arcade
            </p>
            <p className="font-black text-xs sm:text-sm">Game Dev</p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* EYEBROW — Comic Issue Chip */}
          <motion.div variants={comicStamp} className="mb-4 sm:mb-7 flex justify-center px-2">
            <span className="inline-block py-1 px-3 sm:py-1.5 sm:px-5 bg-spider-yellow comic-chip text-spider-black text-[9px] xs:text-[10px] sm:text-xs font-black tracking-[0.08em] sm:tracking-[0.22em] uppercase pop-shadow-sm max-w-[92vw] sm:max-w-none text-balance leading-tight sm:leading-normal">
              Comic Issue #001 — Origin of the Digital Creator
            </span>
          </motion.div>

          {/* HEADLINE — Official Spider-Man Movie Logo Typography Style */}
          <motion.h1
            variants={fadeUp}
            className="w-full max-w-4xl mx-auto font-black mb-5 sm:mb-7 flex flex-col items-center select-none"
          >
            {/* 1. MARVEL-STYLE TOP PILL: SPIDER-DEV */}
            <div className="mb-1.5 sm:mb-2">
              <span
                className="inline-block bg-[#FF1E26] text-white px-2.5 py-0.5 sm:px-3 sm:py-0.5 border-[2px] border-black font-black text-[9px] sm:text-[10.5px] tracking-[0.22em] sm:tracking-[0.26em] uppercase shadow-[1.5px_1.5px_0_#000] rounded-sm"
              >
                SPIDER-DEV
              </span>
            </div>

            {/* 2. 3D MOVIE LOGO TITLE: DIGITAL CREATOR (True Outer Stroke 8-Arah + 3D Blue Bevel) */}
            <div className="w-full flex justify-center px-2">
              <span
                className="inline-block text-[#FF1E26] uppercase whitespace-nowrap tracking-tight font-black"
                style={{
                  fontSize: "clamp(1.35rem, 5vw, 3.9rem)",
                  lineHeight: 1.06,
                  textShadow:
                    "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0px -1.5px 0 #000, 0px 1.5px 0 #000, -1.5px 0px 0 #000, 1.5px 0px 0 #000, 1px 3px 0 #165DFF, 2px 4.5px 0 #165DFF, 2.5px 6px 0 #0C38A8, 3.5px 7.5px 0 #000000, 4px 10px 8px rgba(0,0,0,0.5)",
                }}
              >
                DIGITAL CREATOR
              </span>
            </div>

            {/* 3. GOLDEN SUBTITLE: YOUR NEIGHBORHOOD DEVELOPER */}
            <div className="w-full flex justify-center mt-1.5 sm:mt-2 px-2">
              <span
                className="inline-block text-spider-yellow uppercase whitespace-nowrap tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.24em] font-black text-[9.5px] xs:text-[11px] sm:text-xs md:text-sm"
                style={{
                  textShadow:
                    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1.5px 1.5px 0 #000",
                }}
              >
                YOUR NEIGHBORHOOD DEVELOPER
              </span>
            </div>
          </motion.h1>

          {/* SUBTITLE (≤ 20 words) */}
          <motion.p
            variants={fadeUp}
            className="text-xs xs:text-sm sm:text-base md:text-lg text-comic-ink/70 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium px-4 leading-relaxed"
          >
            Full Stack Web Developer, Video Editor, 3D Modeler, and Game Developer
            crafting immersive digital experiences with cinematic flair.
          </motion.p>

          {/* CTA BUTTONS (Comic Doodle Multi-Layer Red & Blue Matching Buttons) */}

          {/* EXECUTIVE QUICK-SCAN BAR — Only visible in Executive/Recruiter Mode */}
          {viewMode === "executive" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              className="mb-8 sm:mb-10 mx-auto max-w-xl w-full"
            >
              <div className="bg-white/95 backdrop-blur-sm border-2 border-black rounded-xl p-4 sm:p-5 shadow-[4px_4px_0_#165DFF] text-left space-y-3">
                {/* Status */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                    <CheckCircle size={12} />
                    Open to Work
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-comic-ink/60 font-medium">
                    <MapPin size={11} /> Indonesia
                  </span>
                </div>

                {/* Role + Stack */}
                <div>
                  <p className="font-black text-sm sm:text-base text-comic-ink">
                    Full-Stack Web Developer
                  </p>
                  <p className="text-[10px] sm:text-xs text-comic-ink/60 font-medium mt-1">
                    React • Next.js • TypeScript • Node.js • Tailwind • SQL
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`${import.meta.env.BASE_URL}cv.pdf`}
                    download="CV_Ferrel_Rashad_Akeyla.pdf"
                    className="inline-flex items-center gap-1.5 bg-spider-blue text-white px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                  >
                    <Download size={12} /> Download CV
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 bg-spider-red text-white px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                  >
                    <Mail size={12} /> Contact Me
                  </a>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("spidey:open-deck"))}
                    className="inline-flex items-center gap-1.5 bg-spider-yellow text-spider-black px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
                  >
                    <Briefcase size={12} /> Pitch Deck
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          <motion.div
            variants={comicPop}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-3 sm:px-0 max-w-full mx-auto"
          >
            <ComicDoodleButton
              text="EXPLORE MISSIONS"
              href="#projects"
              variant="red"
              icon="⚡"
            />
            <ComicDoodleButton
              text="DOWNLOAD CV"
              href={`${import.meta.env.BASE_URL}cv.pdf`}
              download="CV_Ferrel_Rashad_Akeyla.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="blue"
              icon="📥"
            />
          </motion.div>

          {/* MOBILE FEATURE STRIP (< lg displays) */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-3 max-w-md mx-auto px-2 lg:hidden"
          >
            <div className="bg-spider-red comic-chip p-2.5 pop-shadow-sm text-comic-ink flex items-center gap-2.5">
              <div className="w-7 h-7 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black shrink-0">
                <Code2 size={16} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-comic-ink/80">
                  Web Craft
                </p>
                <p className="font-black text-xs">Full Stack</p>
              </div>
            </div>

            <div className="bg-comic-panel comic-chip p-2.5 pop-shadow-sm text-comic-ink flex items-center gap-2.5">
              <div className="w-7 h-7 bg-comic-surface comic-chip flex items-center justify-center text-spider-red shrink-0">
                <Github size={16} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-comic-ink/60">
                  Open Source
                </p>
                <p className="font-black text-xs">@FerrelHD</p>
              </div>
            </div>

            <div className="bg-spider-blue comic-chip p-2.5 pop-shadow-sm text-comic-ink flex items-center gap-2.5">
              <div className="w-7 h-7 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black shrink-0">
                <Zap size={16} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-comic-ink/80">
                  Multiverse
                </p>
                <p className="font-black text-xs">Video & 3D</p>
              </div>
            </div>

            <div className="bg-spider-yellow comic-chip p-2.5 pop-shadow-sm text-spider-black flex items-center gap-2.5">
              <div className="w-7 h-7 bg-spider-red comic-chip flex items-center justify-center text-comic-ink shrink-0">
                <Gamepad2 size={16} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-spider-black/70">
                  Arcade
                </p>
                <p className="font-black text-xs">Game Dev</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
