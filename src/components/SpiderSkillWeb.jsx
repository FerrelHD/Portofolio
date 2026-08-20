"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Zap, Compass } from "lucide-react";
import { soundFX } from "../lib/soundFx";

export const SKILLS_DATA = [
  // Proficient (Core / Daily Driver)
  {
    id: "react",
    name: "React / Next.js",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#00D8FF",
    ring: 1,
    angle: 0,
    desc: "Single-page apps, SSR architectures, state management, and custom hook lifecycles.",
    fact: "Learned React inspired by Spider-Man's high-tech suit HUD upgrades! 🕸️",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#38BDF8",
    ring: 1,
    angle: 60,
    desc: "Responsive design systems, micro-animations, theme tokens, and clean utility styling.",
    fact: "Tailwind utility classes are like webs — flexible, swift, and rock solid! 🎨",
  },
  {
    id: "typescript",
    name: "TypeScript / JS",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#3178C6",
    ring: 1,
    angle: 120,
    desc: "Type safety, asynchronous patterns, ESNext standards, and robust interface modeling.",
    fact: "Type safety catches runtime bugs before villains even have a chance to strike! 🛡️",
  },
  {
    id: "node",
    name: "Node.js / Express",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Production Ready",
    color: "#5FA04E",
    ring: 1,
    angle: 180,
    desc: "RESTful API design, middleware pipelines, authentication, and database integration.",
    fact: "Backend server performance fast as web-slinging under heavy traffic loads! ⚡",
  },
  {
    id: "video",
    name: "Video Editing",
    category: "Multiverse Arts",
    level: "Proficient",
    levelText: "Core Mastery • Cinematic",
    color: "#FF1E26",
    ring: 1,
    angle: 240,
    desc: "Premiere Pro / After Effects, pacing, cinematic sound design, and viral narrative flow.",
    fact: "Rhythmic cuts and pacing edited with precision like a cinematic comic trailer! 🎬",
  },
  {
    id: "motion",
    name: "Framer Motion / Anime",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Interactive",
    color: "#FF007A",
    ring: 1,
    angle: 300,
    desc: "Physics springs, scroll triggers, gesture controls, and smooth interactive UI transitions.",
    fact: "60 FPS interactions that make every click feel like a superhero action scene! 💥",
  },

  // Familiar (Working Knowledge / Production Delivered)
  {
    id: "blender",
    name: "3D Blender",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • 3D Assets",
    color: "#EA7600",
    ring: 2,
    angle: 30,
    desc: "Hard surface modeling, texturing, stylized lighting, and web 3D asset optimization.",
    fact: "Crafting 3D props and lighting for immersive comic multiverse atmospheres! 🧊",
  },
  {
    id: "unity",
    name: "Unity / C#",
    category: "Arcade Combat",
    level: "Familiar",
    levelText: "Working Knowledge • Game Dev",
    color: "#222C37",
    ring: 2,
    angle: 90,
    desc: "Player controllers, collision physics, tilemapping, and arcade gameplay mechanics.",
    fact: "Architecting game loops and ultra-smooth movement / swing physics mechanics! 🎮",
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • Wireframes",
    color: "#A259FF",
    ring: 2,
    angle: 150,
    desc: "Figma design systems, wireframing, typography hierarchies, and mobile responsiveness.",
    fact: "Designing comic book layouts and high-converting modern user journeys! 📐",
  },
  {
    id: "databases",
    name: "SQL & NoSQL",
    category: "Web Craft",
    level: "Familiar",
    levelText: "Working Knowledge • Schemas",
    color: "#00E5FF",
    ring: 2,
    angle: 210,
    desc: "PostgreSQL, MongoDB, indexing, relational modeling, and query optimizations.",
    fact: "Structuring clean databases so query responses fly at the speed of light! 🗄️",
  },

  // Exploring (Modern Tools / Next-Gen)
  {
    id: "unreal",
    name: "Unreal Engine",
    category: "Arcade Combat",
    level: "Exploring",
    levelText: "Exploring • Realtime 3D",
    color: "#0E1128",
    ring: 3,
    angle: 45,
    desc: "Lumen lighting, Blueprint scripting, and cinematic virtual environments.",
    fact: "Exploring next-gen real-time graphic fidelity and open world traversal! 🕹️",
  },
  {
    id: "ai_tools",
    name: "AI Agents & Tooling",
    category: "Web Craft",
    level: "Exploring",
    levelText: "Exploring • Modern Workflows",
    color: "#FFD500",
    ring: 3,
    angle: 225,
    desc: "Prompt engineering, MCP integrations, agentic workflows, and automated DX pipelines.",
    fact: "Pair programming with AI to accelerate prototyping speed by 10x! 🤖",
  },
];

const SpiderSkillWeb = ({ activeSuit }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);

  // Center coordinate
  const cx = 250;
  const cy = 250;

  // Radius for rings
  const ringRadius = {
    1: 95,
    2: 155,
    3: 210,
  };

  // Convert polar to cartesian
  const getNodePos = (ring, angleDeg) => {
    const r = ringRadius[ring] || 100;
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between w-full max-w-6xl mx-auto">
      {/* Interactive Web Constellation SVG */}
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-spider-red/5 rounded-full blur-3xl pointer-events-none" />

        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_25px_rgba(22,93,255,0.15)]">
          <defs>
            {/* Radial Web Gradient */}
            <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF1E26" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#165DFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Web Glow Circle */}
          <circle cx={cx} cy={cy} r="225" fill="url(#webGlow)" />

          {/* Web Concentric Rings */}
          {[95, 155, 210].map((r, i) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#2A2A38"
              strokeWidth="1.5"
              strokeDasharray={i === 2 ? "4 4" : "none"}
              className="opacity-70 transition-all duration-300"
            />
          ))}

          {/* Web Radial Strands from center */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const x2 = cx + 225 * Math.cos(rad);
            const y2 = cy + 225 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#252533"
                strokeWidth="1"
                className="opacity-60"
              />
            );
          })}

          {/* Connecting Web Strands between adjacent nodes */}
          {SKILLS_DATA.map((node, idx) => {
            const pos = getNodePos(node.ring, node.angle);
            return (
              <line
                key={`line-${node.id}`}
                x1={cx}
                y1={cy}
                x2={pos.x}
                y2={pos.y}
                stroke={selectedSkill?.id === node.id ? "#FF1E26" : "#3F3F50"}
                strokeWidth={selectedSkill?.id === node.id ? "2.5" : "1.2"}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Center Hub Spider Emblem */}
          <g transform={`translate(${cx - 24}, ${cy - 24})`}>
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="#0A0A0A"
              stroke="#FF1E26"
              strokeWidth="3"
              className="animate-pulse shadow-lg"
            />
            <text
              x="24"
              y="29"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="18"
              fontWeight="bold"
            >
              🕷️
            </text>
          </g>

          {/* Interactive Skill Nodes */}
          {SKILLS_DATA.map((node) => {
            const pos = getNodePos(node.ring, node.angle);
            const isSelected = selectedSkill?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedSkill(node);
                  soundFX.playBeep(440 + node.angle);
                }}
                onMouseEnter={() => {
                  setSelectedSkill(node);
                  soundFX.playBeep(440 + node.angle);
                }}
              >
                {/* Node Outer Halo on Selection */}
                {isSelected && (
                  <circle
                    r="18"
                    fill="none"
                    stroke="#FF1E26"
                    strokeWidth="2.5"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  r={isSelected ? "15" : "12"}
                  fill={isSelected ? "#FF1E26" : "#1E1E28"}
                  stroke={isSelected ? "#FFFFFF" : node.color}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="transition-all duration-300 group-hover:scale-125"
                />

                {/* Node Label Text */}
                <text
                  x="0"
                  y={node.angle > 90 && node.angle < 270 ? "-18" : "24"}
                  textAnchor="middle"
                  fill={isSelected ? "#FFFFFF" : "#D4D4D8"}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="'DM Sans', sans-serif"
                  className="transition-colors pointer-events-none drop-shadow-[0_2px_4px_#000]"
                >
                  {node.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Skill Detail Comic Card */}
      <div className="w-full lg:max-w-md">
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#14141A] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#FF1E26] relative overflow-hidden"
            >
              {/* Category & Level Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-md">
                  {selectedSkill.category}
                </span>
                <span
                  className={`text-xs font-black uppercase px-2.5 py-1 rounded-md border ${
                    selectedSkill.level === "Proficient"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                      : selectedSkill.level === "Familiar"
                      ? "bg-sky-500/15 text-sky-400 border-sky-500/40"
                      : "bg-amber-500/15 text-amber-400 border-amber-500/40"
                  }`}
                >
                  {selectedSkill.level}
                </span>
              </div>

              {/* Title & Level Subtitle */}
              <h3 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                <span>{selectedSkill.name}</span>
              </h3>
              <p className="text-xs font-bold text-spider-yellow uppercase tracking-wider mt-0.5 mb-3 flex items-center gap-1.5">
                <Zap size={13} />
                <span>{selectedSkill.levelText}</span>
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {selectedSkill.desc}
              </p>

              {/* Comic Lore / Fun Fact */}
              <div className="bg-[#1A1A24] border-l-4 border-spider-red p-3 rounded-r-xl">
                <div className="text-[10px] font-black uppercase tracking-wider text-spider-red mb-0.5 flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Spidey Lore / Dev Fact</span>
                </div>
                <p className="text-xs text-zinc-300 italic font-medium leading-normal">
                  "{selectedSkill.fact}"
                </p>
              </div>

              {/* Action hint */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Hover or click nodes on web matrix</span>
                <span className="text-spider-blue font-bold">Node #{selectedSkill.id}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpiderSkillWeb;
