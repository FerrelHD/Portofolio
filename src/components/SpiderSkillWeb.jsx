"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ExternalLink } from "lucide-react";
import { soundFX } from "../lib/soundFx";

/* =========================================================================
   OFFICIAL BRAND VECTOR SVG ICONS (PRECISION EMBEDDED)
   ========================================================================= */

// 1. React (Official Orbital Atom)
const ReactIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
    <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
    <g stroke="#00D8FF" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 2. Tailwind CSS (Official Dual-Wave Curves)
const TailwindIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#38BDF8"
    />
  </svg>
);

// 3. TypeScript (Official 'TS' Lettermark)
const TypeScriptIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path
      d="M11.5 8H5.5V10H7.5V17H9.5V10H11.5V8ZM18.5 10.8C18.2 10.2 17.5 9.8 16.5 9.8C15.3 9.8 14.3 10.4 14.3 11.5C14.3 12.6 15.1 13.1 16.2 13.5L16.8 13.7C17.5 14 17.9 14.3 17.9 14.9C17.9 15.6 17.2 16 16.3 16C15.2 16 14.4 15.4 14.1 14.4H12.3C12.6 16.4 14.2 17.5 16.3 17.5C18.3 17.5 19.8 16.4 19.8 14.8C19.8 13.4 18.9 12.8 17.6 12.3L17 12.1C16.3 11.8 15.9 11.6 15.9 11C15.9 10.5 16.4 10.2 17.1 10.2C17.8 10.2 18.3 10.5 18.5 11.1L18.5 10.8Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 4. Node.js (Official Hexagon)
const NodeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2ZM17.2 14.7C17.2 14.8 17.1 14.9 17 15L12.5 17.6C12.3 17.7 12.1 17.7 11.9 17.6L7.4 15C7.3 14.9 7.2 14.8 7.2 14.7V9.5C7.2 9.4 7.3 9.3 7.4 9.2L11.9 6.6C12.1 6.5 12.3 6.5 12.5 6.6L17 9.2C17.1 9.3 17.2 9.4 17.2 9.5V14.7Z"
      fill="#5FA04E"
    />
  </svg>
);

// 5. Blender 3D (Official Blender Curved Eye/Flame Logo)
const BlenderIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Blender orange arms and central blue pupil */}
    <path
      d="M12 2C8 2 4.5 4.5 3 8C4.5 7 6.5 6.5 8.5 7C5.5 9 4 12 4.5 15.5C5 13.5 6.5 12 8.5 12C7.5 13.5 7.5 15.5 8.5 17C9.5 15.5 11.5 15 13 16C12 17.5 12 19.5 13 21C17.5 20.5 21 16.5 21 12C21 6.5 17 2 12 2ZM14.5 14C13.1 14 12 12.9 12 11.5C12 10.1 13.1 9 14.5 9C15.9 9 17 10.1 17 11.5C17 12.9 15.9 14 14.5 14Z"
      fill="#EA7600"
    />
    <circle cx="14.5" cy="11.5" r="1.5" fill="#225785" />
  </svg>
);

// 6. Unity (Official 3D Tri-Chevron Cube)
const UnityIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12 2L4 6.8V16.4L12 21.2L20 16.4V6.8L12 2ZM12 4.4L18 8V11.2L14.4 9.2L12 13.4L9.6 9.2L6 11.2V8L12 4.4ZM6 12.8L9.2 11L11.6 15.2H7.8L6 16.2V12.8ZM18 16.2L16.2 15.2H12.4L14.8 11L18 12.8V16.2Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. Unreal Engine (Official Circle 'U' Emblem)
const UnrealIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#0E1128" stroke="#FFFFFF" strokeWidth="1.5" />
    <path
      d="M8.5 7.5V12C8.5 14.5 10 16.5 12 16.5C14 16.5 15.5 14.5 15.5 12V7.5H13.8V12C13.8 13.5 13 14.8 12 14.8C11 14.8 10.2 13.5 10.2 12V7.5H8.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 8. Framer Motion (Official Tri-Level Geometric 'F')
const FramerIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 2H20V9.33H12L4 2Z" fill="#FF007A" />
    <path d="M4 9.33H12V16.67H4L12 9.33Z" fill="#FF007A" />
    <path d="M4 16.67H12L4 24V16.67Z" fill="#FF007A" />
  </svg>
);

// 9. Figma / UI-UX (Official 5 Geometries)
const FigmaIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M8 2H12V8H8C6.34 8 5 6.66 5 5C5 3.34 6.34 2 8 2Z" fill="#F24E1E" />
    <path d="M12 2H16C17.66 2 19 3.34 19 5C19 6.66 17.66 8 16 8H12V2Z" fill="#FF7262" />
    <path d="M12 8H16C17.66 8 19 9.34 19 11C19 12.66 17.66 14 16 14H12V8Z" fill="#1ABCFE" />
    <path d="M5 11C5 9.34 6.34 8 8 8H12V14H8C6.34 14 5 12.66 5 11Z" fill="#A259FF" />
    <path d="M5 17C5 15.34 6.34 14 8 14H12V17C12 18.66 10.66 20 9 20C7.34 20 5 18.66 5 17Z" fill="#0ACF83" />
  </svg>
);

// 10. SQL & Databases (Stacked Disk Cylinders)
const DatabaseIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// 11. Video Editing / Premiere Pro (Film Reel & Play Matrix)
const VideoEditIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FF1E26" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

// 12. AI Tooling & Neural Workflows (Neural Node Matrix)
const AiToolsIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFD500" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" fill="#FFD500" fillOpacity="0.3" />
  </svg>
);

// Center Hub: Authentic Sharp Spider-Man Emblem
const CenterSpiderEmblem = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 36 c-3 -4 -6 -7 -6 -11 c0 -5 2 -9 6 -11 c4 2 6 6 6 11 c0 4 -3 7 -6 11 z" />
    <path d="M50 38 c-5 5 -8 15 -8 24 c0 12 3 22 8 30 c5 -8 8 -18 8 -30 c0 -9 -3 -19 -8 -24 z" />
    {/* Left Legs */}
    <path d="M46 28 C32 8 16 10 12 24 C18 18 30 16 44 29 Z" />
    <path d="M44 33 C25 18 10 26 8 42 C15 32 26 28 42 36 Z" />
    <path d="M43 44 C22 46 8 58 6 76 C15 62 26 56 42 48 Z" />
    <path d="M44 54 C30 70 20 84 16 96 C24 84 32 72 45 58 Z" />
    {/* Right Legs */}
    <path d="M54 28 C68 8 84 10 88 24 C82 18 70 16 56 29 Z" />
    <path d="M56 33 C75 18 90 26 92 42 C85 32 74 28 58 36 Z" />
    <path d="M57 44 C78 46 92 58 94 76 C85 62 74 56 58 48 Z" />
    <path d="M56 54 C70 70 80 84 84 96 C76 84 68 72 55 58 Z" />
  </svg>
);

/* =========================================================================
   SKILL NODES DATA
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
    icon: <ReactIcon className="w-5 h-5" />,
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
    icon: <TailwindIcon className="w-4 h-4" />,
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
    icon: <TypeScriptIcon className="w-4 h-4" />,
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
    icon: <NodeIcon className="w-4 h-4" />,
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
    icon: <VideoEditIcon className="w-4 h-4" />,
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
    icon: <FramerIcon className="w-4 h-4" />,
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
    icon: <BlenderIcon className="w-4 h-4" />,
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
    icon: <UnityIcon className="w-4 h-4" />,
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
    icon: <FigmaIcon className="w-4 h-4" />,
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
    icon: <DatabaseIcon className="w-4 h-4" />,
    desc: "PostgreSQL, MongoDB, indexing, relational modeling, and query optimizations.",
    fact: "Structuring clean databases so query responses fly at the speed of light! 🗄️",
  },

  // Ring 3 (Exploring • Modern Tooling)
  {
    id: "unreal",
    name: "Unreal Engine",
    category: "Arcade Combat",
    level: "Exploring",
    levelText: "Exploring • Realtime 3D",
    color: "#8B9BB4",
    ring: 3,
    angle: 45,
    icon: <UnrealIcon className="w-4 h-4" />,
    desc: "Lumen lighting, Blueprint scripting, and cinematic virtual environments.",
    fact: "Exploring next-gen real-time graphic fidelity and open world traversal! 🕹️",
  },
  {
    id: "ai_tools",
    name: "AI Agents",
    category: "Web Craft",
    level: "Exploring",
    levelText: "Exploring • Modern Workflows",
    color: "#FFD500",
    ring: 3,
    angle: 225,
    icon: <AiToolsIcon className="w-4 h-4" />,
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
          <g transform={`translate(${cx - 24}, ${cy - 24})`}>
            {/* Outer Pulsing Neon Red Ring */}
            <circle
              cx="24"
              cy="24"
              r="24"
              fill="none"
              stroke="#FF1E26"
              strokeWidth="2"
              className="animate-ping opacity-35"
            />
            {/* Base Hub Button */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="#0A0A0A"
              stroke="#FF1E26"
              strokeWidth="2.5"
              className="shadow-2xl"
            />
            {/* Center Official Sharp Spider Vector */}
            <g transform="translate(10, 10) scale(0.28)" className="text-white">
              <CenterSpiderEmblem className="w-[100px] h-[100px] text-white fill-white" />
            </g>
          </g>

          {/* 5. INTERACTIVE SKILL NODES WITH OFFICIAL SVG BRAND LOGOS */}
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
                    r="20"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Node Circle Background Badge */}
                <circle
                  r={isSelected ? "17" : "14"}
                  fill={isSelected ? "#0A0A0A" : "#12121A"}
                  stroke={isSelected ? node.color : "#404050"}
                  strokeWidth={isSelected ? "3" : "1.8"}
                  className="transition-all duration-300 group-hover:scale-125 shadow-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                />

                {/* Embedded Real SVG Logo Icon */}
                <g transform={isSelected ? "translate(-8, -8) scale(1)" : "translate(-7, -7) scale(0.88)"} className="transition-all duration-300 pointer-events-none">
                  {node.icon}
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

              {/* Title with Official Vector SVG Icon */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0_#000] shrink-0"
                  style={{ backgroundColor: "#1E1E28" }}
                >
                  {selectedSkill.icon}
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
