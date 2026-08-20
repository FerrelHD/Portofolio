"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { soundFX } from "../lib/soundFx";

// Asset Imports for Real Brand Icons
import reactIcon from "../assets/React-icon.svg.webp";
import tailwindIcon from "../assets/tailwind.svg";
import typescriptIcon from "../assets/typescript.png";
import nodejsIcon from "../assets/nodejs.webp";
import videoEditIcon from "../assets/video editing icon.png";
import framerIcon from "../assets/framermotionicon.webp";
import blenderIcon from "../assets/Blender_logo_no_text.svg.webp";
import unityIcon from "../assets/unityicon.png";
import figmaIcon from "../assets/figma icon.png";
import sqlIcon from "../assets/sql icon.svg";
import aiAgentIcon from "../assets/ai agent icon.png";

// Center Hub: Authentic Sharp Spider-Man Emblem (Matching User Requested Vector)
const CenterSpiderEmblem = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 500 500" fill="currentColor">
    <g fill="currentColor">
      {/* Abdomen & Head */}
      <path d="M 250,195 C 240,175 235,160 235,145 C 235,130 242,120 250,112 C 258,120 265,130 265,145 C 265,160 260,175 250,195 Z" />
      <path d="M 250,200 C 230,225 218,270 218,310 C 218,360 232,410 250,445 C 268,410 282,360 282,310 C 282,270 270,225 250,200 Z" />

      {/* Top Mandibles */}
      <path d="M 245,115 L 250,105 L 255,115 Z" />

      {/* Top Left Leg 1 (Long Horn) */}
      <path d="M 238,135 C 190,40 145,55 125,120 C 145,95 180,85 230,140 Z" />
      {/* Top Left Leg 2 */}
      <path d="M 232,160 C 160,100 110,135 100,210 C 122,170 158,155 224,175 Z" />

      {/* Bottom Left Leg 3 */}
      <path d="M 226,220 C 120,230 70,290 60,370 C 95,310 140,285 220,240 Z" />
      {/* Bottom Left Leg 4 (Long Bottom Needle) */}
      <path d="M 230,260 C 170,330 135,400 120,460 C 148,410 178,350 238,280 Z" />

      {/* Top Right Leg 1 (Long Horn) */}
      <path d="M 262,135 C 310,40 355,55 375,120 C 355,95 320,85 270,140 Z" />
      {/* Top Right Leg 2 */}
      <path d="M 268,160 C 340,100 390,135 400,210 C 378,170 342,155 276,175 Z" />

      {/* Bottom Right Leg 3 */}
      <path d="M 274,220 C 380,230 430,290 440,370 C 405,310 360,285 280,240 Z" />
      {/* Bottom Right Leg 4 (Long Bottom Needle) */}
      <path d="M 270,260 C 330,330 365,400 380,460 C 352,410 322,350 262,280 Z" />
    </g>
  </svg>
);

/* =========================================================================
   SKILL NODES DATA (11 SKILLS — UNREAL REMOVED)
   ========================================================================= */

export const SKILLS_DATA = [
  // Ring 1 (Proficient • Core Mastery)
  {
    id: "react",
    name: "React / Next.js",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#00D8FF",
    ring: 1,
    angle: 0,
    iconImg: reactIcon,
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
    iconImg: tailwindIcon,
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
    iconImg: typescriptIcon,
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
    iconImg: nodejsIcon,
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
    iconImg: videoEditIcon,
    desc: "Premiere Pro / After Effects, pacing, cinematic sound design, and viral narrative flow.",
    fact: "Rhythmic cuts and pacing edited with precision like a cinematic comic trailer! 🎬",
  },
  {
    id: "motion",
    name: "Framer Motion",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Interactive",
    color: "#FF007A",
    ring: 1,
    angle: 300,
    iconImg: framerIcon,
    desc: "Physics springs, scroll triggers, gesture controls, and smooth interactive UI transitions.",
    fact: "60 FPS interactions that make every click feel like a superhero action scene! 💥",
  },

  // Ring 2 (Familiar • Working Knowledge)
  {
    id: "blender",
    name: "3D Blender",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • 3D Assets",
    color: "#EA7600",
    ring: 2,
    angle: 30,
    iconImg: blenderIcon,
    desc: "Hard surface modeling, texturing, stylized lighting, and web 3D asset optimization.",
    fact: "Crafting 3D props and lighting for immersive comic multiverse atmospheres! 🧊",
  },
  {
    id: "unity",
    name: "Unity / C#",
    category: "Arcade Combat",
    level: "Familiar",
    levelText: "Working Knowledge • Game Dev",
    color: "#FFFFFF",
    ring: 2,
    angle: 90,
    iconImg: unityIcon,
    desc: "Player controllers, collision physics, tilemapping, and arcade gameplay mechanics.",
    fact: "Architecting game loops and ultra-smooth movement / swing physics mechanics! 🎮",
  },
  {
    id: "uiux",
    name: "UI/UX (Figma)",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • Wireframes",
    color: "#A259FF",
    ring: 2,
    angle: 150,
    iconImg: figmaIcon,
    desc: "Figma design systems, wireframing, typography hierarchies, and mobile responsiveness.",
    fact: "Designing comic book layouts and high-converting modern user journeys! 📐",
  },
  {
    id: "databases",
    name: "SQL & Databases",
    category: "Web Craft",
    level: "Familiar",
    levelText: "Working Knowledge • Schemas",
    color: "#00E5FF",
    ring: 2,
    angle: 210,
    iconImg: sqlIcon,
    desc: "PostgreSQL, MongoDB, indexing, relational modeling, and query optimizations.",
    fact: "Structuring clean databases so query responses fly at the speed of light! 🗄️",
  },

  // Ring 3 (Exploring • Modern Tooling)
  {
    id: "ai_tools",
    name: "AI Agents",
    category: "Web Craft",
    level: "Exploring",
    levelText: "Exploring • Modern Workflows",
    color: "#FFD500",
    ring: 3,
    angle: 225,
    iconImg: aiAgentIcon,
    desc: "Prompt engineering, MCP integrations, agentic workflows, and automated DX pipelines.",
    fact: "Pair programming with AI to accelerate prototyping speed by 10x! 🤖",
  },
];

const SpiderSkillWeb = () => {
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

  // Helper to generate a visible polygon web string for a specific radius
  const getPolygonPoints = (radius, count = 12) => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const deg = (i * (360 / count) - 90) * (Math.PI / 180);
      pts.push(`${cx + radius * Math.cos(deg)},${cy + radius * Math.sin(deg)}`);
    }
    return pts.join(" ");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between w-full max-w-6xl mx-auto">
      {/* Interactive Web Constellation SVG */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center select-none">
        {/* Ambient Radial Web Halo Glow */}
        <div className="absolute inset-0 bg-spider-red/10 rounded-full blur-3xl pointer-events-none" />

        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_35px_rgba(22,93,255,0.25)]">
          <defs>
            {/* Radial Web Glow */}
            <radialGradient id="webCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF1E26" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#165DFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Circular Clip Paths for Node Icons (to eliminate square backgrounds) */}
            {SKILLS_DATA.map((node) => (
              <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                <circle cx="0" cy="0" r="13" />
              </clipPath>
            ))}
          </defs>

          {/* Web Base Glow Background */}
          <circle cx={cx} cy={cy} r="230" fill="url(#webCenterGlow)" />

          {/* 1. VISIBLE GEOMETRIC POLYGONAL COBWEB RINGS */}
          {[55, 95, 130, 155, 185, 210].map((r, i) => (
            <polygon
              key={`poly-${r}`}
              points={getPolygonPoints(r, 12)}
              fill="none"
              stroke={i % 2 === 1 ? "#525266" : "#38384A"}
              strokeWidth={i % 2 === 1 ? "1.8" : "1.2"}
              strokeDasharray={i === 5 ? "5 5" : "none"}
              className="opacity-80 transition-all duration-300"
            />
          ))}

          {/* 2. RADIAL WEB STRANDS (12 Principal Spokes) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const x2 = cx + 225 * Math.cos(rad);
            const y2 = cy + 225 * Math.sin(rad);
            return (
              <line
                key={`spoke-${deg}`}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#47475A"
                strokeWidth="1.5"
                className="opacity-75"
              />
            );
          })}

          {/* 3. ACTIVE HIGHLIGHT CONNECTING WEB (Lights up to active node) */}
          {SKILLS_DATA.map((node) => {
            const pos = getNodePos(node.ring, node.angle);
            const isSelected = selectedSkill?.id === node.id;
            return (
              <line
                key={`active-line-${node.id}`}
                x1={cx}
                y1={cy}
                x2={pos.x}
                y2={pos.y}
                stroke={isSelected ? "#FF1E26" : "transparent"}
                strokeWidth={isSelected ? "3" : "0"}
                className="transition-all duration-300 drop-shadow-[0_0_8px_#FF1E26]"
              />
            );
          })}

          {/* 4. CENTER HUB: AUTHENTIC SPIDER-MAN EMBLEM */}
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Outer Pulsing Neon Red Ring */}
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="none"
              stroke="#FF1E26"
              strokeWidth="2"
              className="animate-ping opacity-35"
            />
            {/* Base Hub Button */}
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="#0A0A0A"
              stroke="#FF1E26"
              strokeWidth="2.5"
              className="shadow-2xl"
            />
            {/* Center Official Sharp Spider Vector centered at (0,0) */}
            <g transform="translate(-16, -16)" className="text-white fill-white pointer-events-none">
              <CenterSpiderEmblem className="w-8 h-8 text-white fill-white" />
            </g>
          </g>

          {/* 5. INTERACTIVE SKILL NODES WITH CLEAN EMBEDDED ICONS */}
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
                    r="21"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Node Circle Background Badge */}
                <circle
                  r={isSelected ? "17" : "14"}
                  fill="#0E121A"
                  stroke={isSelected ? node.color : "#4A4A5A"}
                  strokeWidth={isSelected ? "3" : "1.8"}
                  className="transition-all duration-300 group-hover:scale-125 shadow-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                />

                {/* Embedded Real Icon Image clipped within circle */}
                <g clipPath={`url(#clip-${node.id})`} className="pointer-events-none">
                  <image
                    href={node.iconImg}
                    x={isSelected ? "-11" : "-9"}
                    y={isSelected ? "-11" : "-9"}
                    width={isSelected ? "22" : "18"}
                    height={isSelected ? "22" : "18"}
                    preserveAspectRatio="xMidYMid meet"
                    className="transition-all duration-300"
                  />
                </g>

                {/* Node Name Label Underneath */}
                <text
                  x="0"
                  y={node.angle > 90 && node.angle < 270 ? "-20" : "26"}
                  textAnchor="middle"
                  fill={isSelected ? "#FFFFFF" : "#CBD5E1"}
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

              {/* Title with Real Icon Image */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-11 h-11 rounded-xl p-2 flex items-center justify-center border-2 border-black shadow-[3px_3px_0_#000] shrink-0 bg-[#1E1E28] overflow-hidden"
                >
                  <img
                    src={selectedSkill.iconImg}
                    alt={selectedSkill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-none">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs font-bold text-spider-yellow uppercase tracking-wider mt-1 flex items-center gap-1">
                    <Zap size={12} />
                    <span>{selectedSkill.levelText}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-3.5">
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
