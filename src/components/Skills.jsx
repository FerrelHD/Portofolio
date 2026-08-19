"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Video, Gamepad2, Lightbulb } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";

const skillCategories = [
  {
    title: "Web Craft",
    eyebrow: "Ability Matrix 01",
    accent: "spider-red",
    accentBg: "bg-spider-red",
    accentText: "text-spider-red",
    icon: <Layout size={22} strokeWidth={2.5} />,
    skills: [
      {
        name: "React / Next.js",
        level: 90,
        fact: "Belajar React karena terinspirasi suit tech upgrade milik Spider-Man! 🕸️",
      },
      {
        name: "Node.js / Express",
        level: 85,
        fact: "Server backend secepat web-slinging saat menangani rute request berat! ⚡",
      },
      {
        name: "Tailwind CSS",
        level: 95,
        fact: "Utility class Tailwind seperti jaring laba-laba, fleksibel & kokoh! 🎨",
      },
      {
        name: "TypeScript",
        level: 80,
        fact: "Type safety mencegah bug tak terduga sebelum musuh sempat menyerang! 🛡️",
      },
    ],
  },
  {
    title: "Multiverse Arts",
    eyebrow: "Ability Matrix 02",
    accent: "spider-blue",
    accentBg: "bg-spider-blue",
    accentText: "text-spider-blue",
    icon: <Video size={22} strokeWidth={2.5} />,
    skills: [
      {
        name: "Video Editing",
        level: 88,
        fact: "Potongan rhythm & pace video diedit presisi ala scene trailer komik! 🎬",
      },
      {
        name: "3D Modeling (Blender)",
        level: 82,
        fact: "Bikin aset 3D & lighting cinematic untuk atmosfer multiverse! 🧊",
      },
      {
        name: "Color Grading",
        level: 85,
        fact: "Tone warna disesuaikan dengan kontras tinggi ala cetakan komik klasik! 🌈",
      },
      {
        name: "Motion Graphics",
        level: 75,
        fact: "Animasi visual pop-art yang menghidupkan efek sound effect komik! 💥",
      },
    ],
  },
  {
    title: "Arcade Combat",
    eyebrow: "Ability Matrix 03",
    accent: "spider-yellow",
    accentBg: "bg-spider-yellow",
    accentText: "text-spider-yellow",
    icon: <Gamepad2 size={22} strokeWidth={2.5} />,
    skills: [
      {
        name: "Unity / C#",
        level: 80,
        fact: "Merancang logika game & mekanik swing/movement yang smooth! 🎮",
      },
      {
        name: "Unreal Engine",
        level: 70,
        fact: "Eksplorasi environment rendering real-time dengan grafis memukau! 🕹️",
      },
      {
        name: "Game Design",
        level: 85,
        fact: "Menyeimbangkan gameplay loop agar player betah bertahan di mission! 🎯",
      },
      {
        name: "Level Building",
        level: 78,
        fact: "Menata obstacle & platform gedung tinggi untuk rute jelajah optimal! 🏙️",
      },
    ],
  },
];

const Skills = () => {
  const [activeFactKey, setActiveFactKey] = useState(null);
  const factTimerRef = useRef(null);
  const containerRef = useRef(null);

  const handleBarClick = (key) => {
    if (activeFactKey === key) {
      setActiveFactKey(null);
      if (factTimerRef.current) clearTimeout(factTimerRef.current);
    } else {
      setActiveFactKey(key);
      if (factTimerRef.current) clearTimeout(factTimerRef.current);
      factTimerRef.current = setTimeout(() => {
        setActiveFactKey(null);
      }, 3500);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveFactKey(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      if (factTimerRef.current) clearTimeout(factTimerRef.current);
    };
  }, []);

  return (
    <motion.section
      id="skills"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden="true"
      >
        <div className="w-full h-full halftone-overlay-sm" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(255,30,38,0.06) 0%, transparent 70%), radial-gradient(ellipse 55% 35% at 50% 100%, rgba(22,93,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="bg-spider-yellow comic-chip text-spider-black text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 inline-flex items-center gap-1">
              <Lightbulb size={11} strokeWidth={3} />
              Click bar for fun facts!
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 tracking-tighter uppercase">
            Spider-
            <span className="text-spider-red comic-stroke drop-shadow-[3px_3px_0_var(--color-ink-stroke)]">
              Abilities
            </span>
          </h2>
          <p className="text-comic-ink/50 max-w-lg mx-auto font-medium text-sm sm:text-base">
            Power stats breakdown - technical prowess across three core disciplines.
          </p>
        </motion.div>

        {/* ABILITY MATRIX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              transition={{ delay: catIdx * 0.08 }}
              className="relative group"
            >
              <div
                className="comic-panel overflow-hidden relative"
                style={{ borderRadius: "3px" }}
              >
                {/* TOP ACCENT HEADER BAR */}
                <div className={`${cat.accentBg} comic-chip border-t-0 border-l-0 border-r-0 px-5 sm:px-6 py-4 sm:py-5`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-spider-black comic-chip text-comic-ink`}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-spider-black/70">
                          {cat.eyebrow}
                        </p>
                        <h3 className="text-[17px] sm:text-xl font-black uppercase tracking-tight text-spider-black leading-tight">
                          {cat.title}
                        </h3>
                      </div>
                    </div>
                    {/* Spider icon small */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-spider-black/70">
                      <circle cx="12" cy="12" r="2.5" />
                      <path
                        d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* CARD BODY — Skill Bars */}
                <div className="p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6 relative">
                  {/* Halftone overlay inside card body */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-full h-full halftone-overlay-sm" />
                  </div>

                  {cat.skills.map((skill, skillIdx) => {
                    const factKey = `${catIdx}-${skillIdx}`;
                    const isOpen = activeFactKey === factKey;

                    return (
                      <div
                        key={skill.name}
                        className="relative z-10 cursor-pointer group/bar"
                        onClick={() => handleBarClick(factKey)}
                        data-cursor="target"
                        data-cursor-label="FACT!"
                      >
                        <div className="flex justify-between mb-2 items-baseline">
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-comic-ink/75 group-hover/bar:text-spider-yellow transition-colors">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[11px] sm:text-xs font-black ${cat.accentText} tabular-nums`}
                          >
                            {skill.level}%
                          </span>
                        </div>

                        {/* Comic Jagged Progress Bar Track */}
                        <div
                          className="h-[10px] sm:h-3 w-full bg-comic-surface comic-chip border-[1.5px] relative overflow-hidden transition-transform group-hover/bar:scale-[1.01]"
                          style={{ borderRadius: "1px" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: skillIdx * 0.08 }}
                            className="h-full relative"
                            style={{
                              background: `linear-gradient(90deg, var(--color-${cat.accent}) 0%, var(--color-spider-yellow) 100%)`,
                            }}
                          >
                            <div
                              className="absolute top-0 left-0 right-0 h-[35%] bg-white/25"
                              style={{ borderRadius: "0" }}
                            />
                            <div
                              className="absolute right-0 top-0 bottom-0 w-2"
                              style={{
                                background:
                                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(10,10,10,0.4) 2px, rgba(10,10,10,0.4) 4px)",
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* FUN FACT TOOLTIP */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, y: -6 }}
                              transition={{ type: "spring", stiffness: 450, damping: 25 }}
                              className="fun-fact-tooltip absolute z-30 top-full left-0 right-0 mt-2 bg-spider-yellow text-spider-black comic-chip p-3 pop-shadow-sm pointer-events-none"
                            >
                              <div className="fun-fact-caret absolute -top-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-spider-black" />
                              <p className="text-[11px] font-bold italic leading-tight">
                                <span className="font-black not-italic text-[10px] tracking-wider uppercase bg-spider-black text-spider-yellow px-1.5 py-0.5 mr-1.5 comic-chip">
                                  💡 FUN FACT
                                </span>
                                {skill.fact}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Footer stat ringkasan card */}
                  <div className="pt-2 mt-2 border-t-2 border-comic-surface flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/50 mb-0.5">
                        Avg Power
                      </p>
                      <p className={`text-lg font-black comic-stroke-thin ${cat.accentText}`}>
                        {Math.round(cat.skills.reduce((a, b) => a + b.level, 0) / cat.skills.length)}%
                      </p>
                    </div>
                    <span
                      className={`${cat.accentBg} comic-chip text-spider-black px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em]`}
                    >
                      Tier S
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;

