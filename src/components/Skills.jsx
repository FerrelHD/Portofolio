"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Video, Gamepad2, Sparkles, Grid, Share2, CheckCircle, Zap, Compass } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";
import SpiderSkillWeb, { SKILLS_DATA } from "./SpiderSkillWeb";
import { soundFX } from "../lib/soundFx";

const PROFICIENCY_GROUPS = [
  {
    level: "Proficient",
    title: "Core Mastery • Daily Driver",
    subtitle: "Teknologi yang dikuasai secara mendalam untuk arsitektur produksi siap rilis.",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    skills: SKILLS_DATA.filter((s) => s.level === "Proficient"),
  },
  {
    level: "Familiar",
    title: "Working Knowledge • Delivered",
    subtitle: "Teknologi dengan pemahaman fundamental kokoh dan telah diimplementasikan dalam berbagai project.",
    badgeClass: "bg-sky-500/15 text-sky-400 border-sky-500/40",
    skills: SKILLS_DATA.filter((s) => s.level === "Familiar"),
  },
  {
    level: "Exploring",
    title: "Next-Gen • Modern Tooling",
    subtitle: "Eksplorasi aktif pada teknologi mutakhir dan agentic workflows untuk meningkatkan produktivitas.",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    skills: SKILLS_DATA.filter((s) => s.level === "Exploring"),
  },
];

const Skills = () => {
  const [viewMode, setViewMode] = useState("web"); // "web" | "deck"
  const [activeTab, setActiveTab] = useState("all");

  const handleToggleView = (mode) => {
    setViewMode(mode);
    soundFX.playBeep(520);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-spider-red/10 border-2 border-spider-red/40 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-spider-red mb-3">
            <Sparkles size={14} />
            <span>SUPERHERO ABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
            SKILLS & TECH STACK
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 font-medium">
            An interactive map of my technical stack across web development, game systems, and visual computing. Hover over each node to view detailed proficiencies.
          </p>

          {/* View Mode Toggle Buttons */}
          <div className="inline-flex items-center p-1 bg-[#14141C] border-2 border-black rounded-xl mt-6 shadow-[3px_3px_0_#000]">
            <button
              type="button"
              onClick={() => handleToggleView("web")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${viewMode === "web"
                  ? "bg-spider-red text-white shadow-[0_2px_10px_rgba(255,30,38,0.4)]"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              <Share2 size={14} />
              <span>Spider Web Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleView("deck")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${viewMode === "deck"
                  ? "bg-spider-blue text-white shadow-[0_2px_10px_rgba(22,93,255,0.4)]"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              <Grid size={14} />
              <span>Classified Deck</span>
            </button>
          </div>
        </div>

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

        {/* View 2: Classified Level Deck */}
        {viewMode === "deck" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {PROFICIENCY_GROUPS.map((group) => (
              <div
                key={group.level}
                className="bg-[#121218] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0_#165DFF]"
              >
                {/* Group Level Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black uppercase px-3 py-1 rounded-md border ${group.badgeClass}`}>
                        {group.level}
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-wide text-white">
                        {group.title}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">
                      {group.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 font-bold">
                    {group.skills.length} Capabilities
                  </span>
                </div>

                {/* Grid of Tech Stack Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-[#1A1A24] border-2 border-black rounded-xl p-4 hover:border-spider-red transition-all duration-300 group hover:-translate-y-1 shadow-[3px_3px_0_#000]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={skill.iconImg}
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                          />
                          <span className="font-black text-sm text-white group-hover:text-spider-red transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded">
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        {skill.desc}
                      </p>
                      <div className="text-[11px] text-zinc-400 italic bg-black/40 p-2 rounded border-l-2 border-spider-yellow">
                        "{skill.fact}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
