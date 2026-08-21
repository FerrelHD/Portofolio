"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Grid,
  Share2,
  Zap,
  ShieldAlert,
  Flame,
  Award,
  Terminal,
  Cpu,
  Bookmark,
} from "lucide-react";
import SpiderSkillWeb, { SKILLS_DATA } from "./SpiderSkillWeb";
import { soundFX } from "../lib/soundFx";
import { fadeUp, staggerContainer, comicPop, comicStamp } from "../lib/animation";

// Skill power mastery percentages & color accents
const SKILL_POWER_METRICS = {
  react: { power: 95, color: "#00D8FF", label: "ADVANCED" },
  tailwind: { power: 98, color: "#38BDF8", label: "EXPERT" },
  typescript: { power: 90, color: "#3178C6", label: "ADVANCED" },
  node: { power: 88, color: "#5FA04E", label: "PROFICIENT" },
  video: { power: 92, color: "#FF1E26", label: "CINEMATIC" },
  motion: { power: 94, color: "#FF007A", label: "FLUID 60FPS" },
  blender: { power: 78, color: "#EA7600", label: "MODELING" },
  unity: { power: 75, color: "#FFFFFF", label: "GAME LOOPS" },
  figma: { power: 86, color: "#F24E1E", label: "UI / UX" },
  sql: { power: 72, color: "#00758F", label: "QUERIES" },
  ai: { power: 80, color: "#A855F7", label: "AGENTIC DX" },
};

const PROFICIENCY_GROUPS = [
  {
    level: "Proficient",
    dossierCode: "DOSSIER-01 // DAILY ARSENAL",
    title: "Core Mastery • Daily Driver",
    subtitle:
      "Teknologi yang dikuasai secara mendalam untuk arsitektur produksi siap rilis & performa tinggi.",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/50 shadow-[2px_2px_0_#000]",
    panelShadow: "shadow-[6px_6px_0_#10B981]",
    skills: SKILLS_DATA.filter((s) => s.level === "Proficient"),
  },
  {
    level: "Familiar",
    dossierCode: "DOSSIER-02 // BATTLE TESTED",
    title: "Working Knowledge • Delivered",
    subtitle:
      "Teknologi dengan pemahaman fundamental kokoh dan telah diimplementasikan dalam berbagai project nyata.",
    badgeClass: "bg-sky-500/20 text-sky-300 border-2 border-sky-500/50 shadow-[2px_2px_0_#000]",
    panelShadow: "shadow-[6px_6px_0_#165DFF]",
    skills: SKILLS_DATA.filter((s) => s.level === "Familiar"),
  },
  {
    level: "Exploring",
    dossierCode: "DOSSIER-03 // NEXT-GEN RESEARCH",
    title: "Next-Gen • Modern Tooling",
    subtitle:
      "Eksplorasi aktif pada teknologi mutakhir, AI agentic workflows, dan automated productivity pipelines.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-2 border-amber-500/50 shadow-[2px_2px_0_#000]",
    panelShadow: "shadow-[6px_6px_0_#FFD500]",
    skills: SKILLS_DATA.filter((s) => s.level === "Exploring"),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.75,
    },
  },
};

const Skills = () => {
  const [viewMode, setViewMode] = useState("web"); // "web" | "deck"

  const handleToggleView = (mode) => {
    setViewMode(mode);
    soundFX.playBeep(520);
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div variants={comicStamp} className="mb-3 flex justify-center">
            <span className="inline-flex items-center gap-2 bg-spider-yellow comic-chip text-spider-black px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase shadow-[3px_3px_0_#000]">
              <Sparkles size={14} />
              SUPERHERO ABILITY MATRIX
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-comic-ink leading-none">
            SKILLS &{" "}
            <span
              className="text-[#D31F1F] italic inline-block px-1 select-none"
              style={{
                textShadow:
                  "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0px -1.5px 0 #000, 0px 1.5px 0 #000, -1.5px 0px 0 #000, 1.5px 0px 0 #000, 1px 3px 0 #165DFF, 2px 4.5px 0 #165DFF, 2.5px 6px 0 #0C38A8, 3.5px 7.5px 0 #000000, 4px 10px 8px rgba(0,0,0,0.5)",
              }}
            >
              TECH STACK
            </span>
          </h2>
          <p className="text-sm sm:text-base text-comic-ink/70 mt-3 font-medium">
            An interactive comic dossier of my technical capabilities across modern web systems, visual arts, and computing engines.
          </p>

          {/* View Mode Toggle Buttons */}
          <div className="inline-flex items-center p-1.5 bg-white border-3 border-black rounded-2xl mt-6 shadow-[4px_4px_0_#000] max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => handleToggleView("web")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 ${
                viewMode === "web"
                  ? "bg-spider-red text-white border-black shadow-[2px_2px_0_#000]"
                  : "border-transparent text-comic-ink/70 hover:text-comic-ink"
              }`}
            >
              <Share2 size={13} />
              <span>Spider Web Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleView("deck")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 ${
                viewMode === "deck"
                  ? "bg-spider-blue text-white border-black shadow-[2px_2px_0_#000]"
                  : "border-transparent text-comic-ink/70 hover:text-comic-ink"
              }`}
            >
              <Grid size={13} />
              <span>Classified Deck</span>
            </button>
          </div>
        </motion.div>

        {/* View 1: Interactive Spider Web Matrix */}
        {viewMode === "web" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <SpiderSkillWeb />
          </motion.div>
        )}

        {/* View 2: Classified Level Deck (Comic Trading Cards) */}
        {viewMode === "deck" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {PROFICIENCY_GROUPS.map((group) => (
              <div
                key={group.level}
                className={`bg-white border-3 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-5 sm:p-8 ${group.panelShadow} relative overflow-hidden`}
              >
                {/* Halftone / Strip Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-black/[0.02] to-transparent pointer-events-none" />

                {/* Group Level Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-spider-black bg-spider-yellow px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000]">
                        {group.dossierCode}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-md ${group.badgeClass}`}>
                        {group.level}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-comic-ink">
                      {group.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-comic-ink/70 mt-1 font-medium max-w-2xl leading-relaxed">
                      {group.subtitle}
                    </p>
                  </div>
                  <div className="self-start sm:self-center flex items-center gap-1.5 bg-[#F7F4EE] border-2 border-black px-3 py-1.5 rounded-xl shadow-[2px_2px_0_#000]">
                    <ShieldAlert size={14} className="text-spider-red" />
                    <span className="text-xs font-mono font-black text-comic-ink">
                      {group.skills.length} TECH ASSETS
                    </span>
                  </div>
                </div>

                {/* Grid of Comic Trading Cards */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                >
                  {group.skills.map((skill) => {
                    const metrics = SKILL_POWER_METRICS[skill.id] || {
                      power: 80,
                      color: "#FF1E26",
                      label: "ACTIVE",
                    };
                    const isUnity = skill.id === "unity";

                    return (
                      <motion.div
                        key={skill.id}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.02 }}
                        onClick={() => soundFX.playBeep(650)}
                        className="bg-white border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#D9231E] hover:border-spider-red transition-all group flex flex-col justify-between cursor-pointer relative overflow-hidden text-comic-ink"
                      >
                        {/* Top Accent Bar */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5"
                          style={{ backgroundColor: metrics.color }}
                        />

                        {/* Card Header: Icon + Title + Category */}
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              {/* Avatar Box */}
                              <div className="w-11 h-11 rounded-xl bg-[#F7F4EE] border-2 border-black flex items-center justify-center p-2 shrink-0 shadow-[2px_2px_0_#000] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                <img
                                  src={skill.iconImg}
                                  alt={skill.name}
                                  className="w-full h-full object-contain"
                                  style={{
                                    filter: isUnity ? "none" : "none",
                                  }}
                                />
                              </div>

                              <div>
                                <h4 className="font-black text-sm sm:text-base text-comic-ink group-hover:text-spider-red transition-colors leading-tight">
                                  {skill.name}
                                </h4>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-comic-ink/60">
                                  {skill.category}
                                </span>
                              </div>
                            </div>

                            {/* Power Level Label Chip */}
                            <span
                              className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-black shadow-[1.5px_1.5px_0_#000] shrink-0"
                              style={{
                                backgroundColor: `${metrics.color}18`,
                                color: metrics.color,
                                borderColor: `${metrics.color}60`,
                              }}
                            >
                              {metrics.label}
                            </span>
                          </div>

                          {/* Skill Description */}
                          <p className="text-xs text-comic-ink/80 leading-relaxed mb-3.5 font-medium">
                            {skill.desc}
                          </p>
                        </div>

                        {/* Bottom Section: Power Meter */}
                        <div className="pt-2">
                          {/* Comic Arcade Power Meter */}
                          <div className="bg-[#F7F4EE] border-2 border-black rounded-lg p-2 shadow-[2px_2px_0_#000]">
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-comic-ink/70 mb-1">
                              <span className="flex items-center gap-1">
                                <Zap size={10} style={{ color: metrics.color }} />
                                MASTERY LEVEL
                              </span>
                              <span className="font-mono text-comic-ink font-black">
                                {metrics.power}%
                              </span>
                            </div>

                            {/* Progress Energy Bar */}
                            <div className="w-full h-2 bg-white rounded-sm border border-black p-0.5 flex items-center overflow-hidden">
                              <div
                                className="h-full rounded-xs transition-all duration-500"
                                style={{
                                  width: `${metrics.power}%`,
                                  backgroundColor: metrics.color,
                                  boxShadow: `0 0 8px ${metrics.color}88`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
