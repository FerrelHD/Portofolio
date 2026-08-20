"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Code2, Zap, Gamepad2, Download, FolderKanban } from "lucide-react";
import { fadeUp, slideUp, staggerContainer } from "../lib/animation";
import ComicDoodleButton from "./ComicDoodleButton";

const Hero = () => {
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
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Watermark Background (Amazing Spider-Dev — 3 lines) */}
      <div className="watermark-text whitespace-pre-line text-center leading-[0.9]">
        AMAZING
        <br />
        SPIDER
        <br />
        DEV
      </div>

      {/* Large Halftone Gradient Overlay with bottom fade mask */}
      <div
        className="absolute inset-0 z-[-1] opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(255,30,38,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 90% 90%, rgba(22,93,255,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,213,0,0.05) 0%, transparent 70%)",
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Fine grid halftone dot pattern */}
      <div
        className="absolute inset-0 z-[-1] opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(240,237,227,1) 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* DYNAMIC FLOATING POP BADGES (DESKTOP / LAPTOP) — Organic Floating Paths */}
      <motion.div
        animate={floatAnim1}
        className="absolute top-[8%] right-[1.5%] lg:right-[2.5%] xl:right-[4%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-red comic-chip p-3 sm:p-3.5 pop-shadow-sm text-comic-ink flex items-center gap-3.5 select-none">
          <div className="w-10 h-10 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
            <Code2 size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/80">
              Web Craft
            </p>
            <p className="font-black text-sm">Full Stack</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim2}
        className="absolute top-[16%] left-[1.5%] lg:left-[2.5%] xl:left-[4%] z-[5] hidden lg:block"
      >
        <div className="bg-comic-panel comic-chip p-3 sm:p-3.5 pop-shadow-sm text-comic-ink flex items-center gap-3.5 select-none">
          <div className="w-10 h-10 bg-comic-surface comic-chip flex items-center justify-center text-spider-red">
            <Github size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/60">
              Open Source
            </p>
            <p className="font-black text-sm">@FerrelHD</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim3}
        className="absolute bottom-[12%] left-[1.5%] lg:left-[2.5%] xl:left-[4%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-blue comic-chip p-3 sm:p-3.5 pop-shadow-sm text-comic-ink flex items-center gap-3.5 select-none">
          <div className="w-10 h-10 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
            <Zap size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/80">
              Multiverse
            </p>
            <p className="font-black text-sm">Video & 3D</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={floatAnim4}
        className="absolute bottom-[20%] right-[1.5%] lg:right-[2.5%] xl:right-[4%] z-[5] hidden lg:block"
      >
        <div className="bg-spider-yellow comic-chip p-3 sm:p-3.5 pop-shadow-sm text-spider-black flex items-center gap-3.5 select-none">
          <div className="w-10 h-10 bg-spider-red comic-chip flex items-center justify-center text-comic-ink">
            <Gamepad2 size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-spider-black/70">
              Arcade
            </p>
            <p className="font-black text-sm">Game Dev</p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* EYEBROW — Comic Issue Chip */}
          <motion.div variants={fadeUp} className="mb-4 sm:mb-7 flex justify-center px-2">
            <span className="inline-block py-1 px-3 sm:py-1.5 sm:px-5 bg-spider-yellow comic-chip text-spider-black text-[9px] xs:text-[10px] sm:text-xs font-black tracking-[0.08em] sm:tracking-[0.22em] uppercase pop-shadow-sm max-w-[92vw] sm:max-w-none text-balance leading-tight sm:leading-normal">
              Comic Issue #001 — Origin of the Digital Creator
            </span>
          </motion.div>

          {/* HEADLINE — Comic Ink Stroke Style */}
          <motion.h1
            className="w-full max-w-full sm:max-w-[85vw] lg:max-w-[1000px] mx-auto font-black mb-6 sm:mb-8 leading-[0.95] flex flex-col items-center"
          >
            <div className="w-full py-1 -my-1 flex justify-center px-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-comic-ink comic-stroke text-balance tracking-tight sm:tracking-normal"
                style={{
                  fontSize:
                    "clamp(1.15rem, 5.8vw, 5rem)",
                  textShadow:
                    "min(3px, 0.35vw) min(3px, 0.35vw) 0px var(--color-ink-stroke)",
                  WebkitTextStroke:
                    "clamp(1px, 0.18vw, 2.5px) var(--color-ink-stroke)",
                }}
              >
                YOUR NEIGHBORHOOD
              </motion.span>
            </div>
            <div className="w-full py-1 -my-1 flex justify-center mt-[clamp(2px,0.6vw,8px)] px-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-spider-red comic-stroke italic text-balance tracking-tight sm:tracking-normal"
                style={{
                  fontSize:
                    "clamp(1.4rem, 7.2vw, 6rem)",
                  textShadow:
                    "min(3px, 0.35vw) min(3px, 0.35vw) 0px var(--color-ink-stroke)",
                  WebkitTextStroke:
                    "clamp(1px, 0.18vw, 2.5px) var(--color-ink-stroke)",
                }}
              >
                DIGITAL CREATOR
              </motion.span>
            </div>
          </motion.h1>

          {/* SUBTITLE (≤ 20 words) */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base md:text-lg text-comic-ink/70 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium px-2 leading-relaxed"
          >
            Full Stack Web Developer, Video Editor, 3D Modeler, and Game Developer
            crafting immersive digital experiences with cinematic flair.
          </motion.p>

          {/* CTA BUTTONS (Comic Doodle Multi-Layer RGB Matching Buttons) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 px-4 sm:px-0 max-w-xs sm:max-w-none mx-auto"
          >
            <ComicDoodleButton
              text="EXPLORE MISSIONS"
              href="#projects"
              variant="yellow"
              icon="⚡"
            />
            <ComicDoodleButton
              text="DOWNLOAD DOSSIER"
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
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
