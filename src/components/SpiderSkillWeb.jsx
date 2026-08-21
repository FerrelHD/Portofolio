"use client";
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { soundFX } from "../lib/soundFx";


// Asset Imports for Real Brand Icons
import reactIcon from "../assets/React-icon.svg.webp";
import tailwindIcon from "../assets/tailwind.svg";
import typescriptIcon from "../assets/typescript-logo-png-svg.webp";
import nodejsIcon from "../assets/nodejs.webp";
import videoEditIcon from "../assets/video-editing-icon.webp";
import framerIcon from "../assets/framer-motion-icon.png";
import blenderIcon from "../assets/Blender_logo_no_text.svg.webp";
import unityIcon from "../assets/unityicon.png";
import figmaIcon from "../assets/figma-logo-png-svg.webp";
import sqlIcon from "../assets/sql icon 2.png";
import aiAgentIcon from "../assets/ai-agent-icon.webp";
import spiderEmblem from "../assets/spideyicon.png";

/* =========================================================================
   SKILL NODES CONFIG (11 SKILLS)
   ========================================================================= */

export const SKILLS_DATA = [
  // Ring 1 (Core Mastery • Inner Orbit: radius 135, speed: +0.35)
  {
    id: "react",
    name: "React / Next.js",
    shortName: "React / Next",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#00D8FF",
    ring: 1,
    baseAngle: 0,
    speed: 0.32,
    iconImg: reactIcon,
    desc: "Single-page apps, SSR architectures, state management, and custom hook lifecycles.",
    fact: "Learned React inspired by Spider-Man's high-tech suit HUD upgrades! 🕸️",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    shortName: "Tailwind",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#38BDF8",
    ring: 1,
    baseAngle: 60,
    speed: 0.32,
    iconImg: tailwindIcon,
    desc: "Responsive design systems, micro-animations, theme tokens, and clean utility styling.",
    fact: "Tailwind utility classes are like webs — flexible, swift, and rock solid! 🎨",
  },
  {
    id: "typescript",
    name: "TypeScript / JS",
    shortName: "TypeScript",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Daily Driver",
    color: "#3178C6",
    ring: 1,
    baseAngle: 120,
    speed: 0.32,
    iconImg: typescriptIcon,
    desc: "Type safety, asynchronous patterns, ESNext standards, and robust interface modeling.",
    fact: "Type safety catches runtime bugs before villains even have a chance to strike! 🛡️",
  },
  {
    id: "node",
    name: "Node.js / Express",
    shortName: "Node / API",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Production Ready",
    color: "#5FA04E",
    ring: 1,
    baseAngle: 180,
    speed: 0.32,
    iconImg: nodejsIcon,
    desc: "RESTful API design, middleware pipelines, authentication, and database integration.",
    fact: "Backend server performance fast as web-slinging under heavy traffic loads! ⚡",
  },
  {
    id: "video",
    name: "Video Editing",
    shortName: "Video / AMV",
    category: "Multiverse Arts",
    level: "Proficient",
    levelText: "Core Mastery • Cinematic",
    color: "#FF1E26",
    ring: 1,
    baseAngle: 240,
    speed: 0.32,
    iconImg: videoEditIcon,
    desc: "Premiere Pro / After Effects, pacing, cinematic sound design, and viral narrative flow.",
    fact: "Rhythmic cuts and pacing edited with precision like a cinematic comic trailer! 🎬",
  },
  {
    id: "motion",
    name: "Framer Motion",
    shortName: "Framer 60FPS",
    category: "Web Craft",
    level: "Proficient",
    levelText: "Core Mastery • Interactive",
    color: "#FF007A",
    ring: 1,
    baseAngle: 300,
    speed: 0.32,
    iconImg: framerIcon,
    desc: "Physics springs, scroll triggers, gesture controls, and smooth interactive UI transitions.",
    fact: "60 FPS interactions that make every click feel like a superhero action scene! 💥",
  },

  // Ring 2 (Familiar & Exploring • Outer Orbit: radius 235, speed: -0.20)
  {
    id: "blender",
    name: "3D Blender",
    shortName: "Blender 3D",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • 3D Assets",
    color: "#EA7600",
    ring: 2,
    baseAngle: 0,
    speed: -0.20,
    iconImg: blenderIcon,
    desc: "Hard surface modeling, texturing, stylized lighting, and web 3D asset optimization.",
    fact: "Crafting 3D props and lighting for immersive comic multiverse atmospheres! 🧊",
  },
  {
    id: "unity",
    name: "Unity / C#",
    shortName: "Unity 3D",
    category: "Arcade Combat",
    level: "Familiar",
    levelText: "Working Knowledge • Game Dev",
    color: "#FFFFFF",
    ring: 2,
    baseAngle: 72,
    speed: -0.20,
    iconImg: unityIcon,
    desc: "Player controllers, collision physics, tilemapping, and arcade gameplay mechanics.",
    fact: "Architecting game loops and ultra-smooth movement / swing physics mechanics! 🎮",
  },
  {
    id: "uiux",
    name: "UI/UX (Figma)",
    shortName: "Figma UI/UX",
    category: "Multiverse Arts",
    level: "Familiar",
    levelText: "Working Knowledge • Wireframes",
    color: "#A259FF",
    ring: 2,
    baseAngle: 144,
    speed: -0.20,
    iconImg: figmaIcon,
    desc: "Figma design systems, wireframing, typography hierarchies, and mobile responsiveness.",
    fact: "Designing comic book layouts and high-converting modern user journeys! 📐",
  },
  {
    id: "databases",
    name: "SQL & Databases",
    shortName: "SQL / DB",
    category: "Web Craft",
    level: "Familiar",
    levelText: "Working Knowledge • Schemas",
    color: "#00E5FF",
    ring: 2,
    baseAngle: 216,
    speed: -0.20,
    iconImg: sqlIcon,
    desc: "PostgreSQL, MongoDB, indexing, relational modeling, and query optimizations.",
    fact: "Structuring clean databases so query responses fly at the speed of light! 🗄️",
  },
  {
    id: "ai_tools",
    name: "AI Agents",
    shortName: "AI Agents",
    category: "Web Craft",
    level: "Exploring",
    levelText: "Exploring • Modern Workflows",
    color: "#FFD500",
    ring: 2,
    baseAngle: 288,
    speed: -0.20,
    iconImg: aiAgentIcon,
    desc: "Prompt engineering, MCP integrations, agentic workflows, and automated DX pipelines.",
    fact: "Pair programming with AI to accelerate prototyping speed by 10x! 🤖",
  },
];

const SpiderSkillWeb = () => {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [time, setTime] = useState(0);
  const reqRef = useRef(null);
  const lastTimeRef = useRef(0);
  const containerRef = useRef(null);

  // Center coordinate (expanded 600x600 canvas)
  const cx = 300;
  const cy = 300;

  // Radius for rings (expanded for breathing room)
  const ringRadius = {
    1: 135,
    2: 235,
  };

  // IntersectionObserver: Pause animation loop when out of viewport to save CPU
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "120px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous 60fps orbit animation loop (SLOWS DOWN on hover, never stops!)
  useEffect(() => {
    if (!isInView) return;

    lastTimeRef.current = performance.now();
    const animate = (now) => {
      // When hovered, speed drops smoothly to 20% (slow-motion cinematic mode)
      const speedMultiplier = isHovered ? 0.2 : 1.0;
      const dt = ((now - lastTimeRef.current) / 1000) * speedMultiplier;
      setTime((prev) => prev + dt);
      lastTimeRef.current = now;
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [isInView, isHovered]);

  // Convert polar orbit position to cartesian
  const getNodePos = (node) => {
    const r = ringRadius[node.ring] || 135;
    // Current angle = baseAngle + time * speed (in degrees)
    const currentAngleDeg = node.baseAngle + (time * node.speed * (180 / Math.PI));
    const rad = (currentAngleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
      currentAngleDeg,
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
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-14 justify-center w-full max-w-7xl mx-auto px-2 sm:px-4"
    >
      {/* Interactive Web Constellation SVG with Orbital Motion */}
      <div
        className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[520px] lg:max-w-[600px] aspect-square flex items-center justify-center select-none touch-manipulation group/web"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 2500)}
      >
        {/* Ambient Radial Web Halo Glow */}
        <div className="absolute inset-0 bg-spider-red/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slow Motion Comic Badge (Appears on hover, positioned higher with comic pop style) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-7 sm:-top-9 left-1/2 -translate-x-1/2 bg-spider-yellow text-spider-black border-2 sm:border-3 border-black comic-chip px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest pointer-events-none shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] z-20 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Zap size={13} className="text-spider-red fill-spider-red" />
              <span>SLOW-MOTION MODE ACTIVATED!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-[0_0_35px_rgba(22,93,255,0.25)] sm:drop-shadow-[0_0_50px_rgba(22,93,255,0.3)] overflow-visible">
          <defs>
            {/* Radial Web Center Glow */}
            <radialGradient id="webCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF1E26" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#165DFF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Circular Clip Paths for Node Icons */}
            {SKILLS_DATA.map((node) => (
              <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                <circle cx="0" cy="0" r="17" />
              </clipPath>
            ))}
          </defs>

          {/* Web Base Glow Background */}
          <circle cx={cx} cy={cy} r="285" fill="url(#webCenterGlow)" />

          {/* 1. VISIBLE GEOMETRIC POLYGONAL COBWEB RINGS */}
          {[75, 135, 185, 235, 280].map((r, i) => (
            <polygon
              key={`poly-${r}`}
              points={getPolygonPoints(r, 12)}
              fill="none"
              stroke={r === 135 || r === 235 ? "#165DFF" : i % 2 === 1 ? "#525266" : "#38384A"}
              strokeWidth={r === 135 || r === 235 ? "2" : "1.2"}
              strokeDasharray={r === 135 || r === 235 ? "5 5" : "none"}
              className="opacity-80 transition-all duration-300"
            />
          ))}

          {/* Glowing Circular Orbit Guides */}
          <circle
            cx={cx}
            cy={cy}
            r={ringRadius[1]}
            fill="none"
            stroke="#00D8FF"
            strokeWidth="1"
            strokeDasharray="4 8"
            className="opacity-45 animate-spin"
            style={{ transformOrigin: "300px 300px", animationDuration: "45s" }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringRadius[2]}
            fill="none"
            stroke="#FF1E26"
            strokeWidth="1"
            strokeDasharray="5 10"
            className="opacity-45 animate-spin"
            style={{ transformOrigin: "300px 300px", animationDirection: "reverse", animationDuration: "65s" }}
          />

          {/* 2. RADIAL WEB STRANDS (12 Principal Spokes) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const x2 = cx + 275 * Math.cos(rad);
            const y2 = cy + 275 * Math.sin(rad);
            return (
              <line
                key={`spoke-${deg}`}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#47475A"
                strokeWidth="1.4"
                className="opacity-75"
              />
            );
          })}

          {/* 3. ACTIVE HIGHLIGHT CONNECTING WEB (Lights up to active node) */}
          {SKILLS_DATA.map((node) => {
            const pos = getNodePos(node);
            const isSelected = selectedSkill?.id === node.id;
            return (
              <line
                key={`active-line-${node.id}`}
                x1={cx}
                y1={cy}
                x2={pos.x}
                y2={pos.y}
                stroke={isSelected ? "#FF1E26" : "transparent"}
                strokeWidth={isSelected ? "3.5" : "0"}
                className="transition-all duration-150 drop-shadow-[0_0_12px_#FF1E26]"
              />
            );
          })}

          {/* 4. CENTER HUB: SPIDER-MAN EMBLEM */}
          <g transform={`translate(${cx}, ${cy})`} className="pointer-events-none">
            {/* Outer Pulsing Neon Red Ring */}
            <circle r="34" fill="none" stroke="#FF1E26" strokeWidth="2.5" className="animate-ping opacity-40" />
            {/* Base Hub Button */}
            <circle r="30" fill="#0A0A0E" stroke="#FF1E26" strokeWidth="3" className="shadow-2xl" />
            {/* Spider Emblem raster image with blend mode */}
            <image
              href={spiderEmblem}
              x="-20"
              y="-20"
              width="40"
              height="40"
              className="pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />
          </g>

          {/* 5. INTERACTIVE ORBITING SKILL NODES (Scaled up + High contrast pill badges) */}
          {SKILLS_DATA.map((node) => {
            const pos = getNodePos(node);
            const isSelected = selectedSkill?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedSkill(node);
                  soundFX.playBeep(440 + node.ring * 100);
                }}
                onMouseEnter={() => {
                  setSelectedSkill(node);
                  soundFX.playBeep(440 + node.ring * 100);
                }}
              >
                {/* Touch Hit Area (generous for easy clicking/tapping) */}
                <circle r="36" fill="transparent" />

                {/* Node Outer Halo on Selection */}
                {isSelected && (
                  <circle
                    r="30"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="3"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Node Circle Background Badge (Bigger 44px - 50px diameter) */}
                <circle
                  r={isSelected ? "25" : "22"}
                  fill="#0E121A"
                  stroke={isSelected ? node.color : "#4A4A5A"}
                  strokeWidth={isSelected ? "3.5" : "2"}
                  className="transition-all duration-200 group-hover:scale-125 shadow-2xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]"
                />

                {/* Embedded Real Icon Image clipped within circle (28px - 32px) */}
                <g clipPath={`url(#clip-${node.id})`} className="pointer-events-none">
                  <image
                    href={node.iconImg}
                    x={isSelected ? "-15" : "-13"}
                    y={isSelected ? "-15" : "-13"}
                    width={isSelected ? "30" : "26"}
                    height={isSelected ? "30" : "26"}
                    preserveAspectRatio="xMidYMid meet"
                    className="transition-all duration-200"
                    style={{
                      mixBlendMode: "screen",
                      filter: node.id === "unity" ? "invert(1)" : "none",
                    }}
                  />
                </g>

                {/* Node Name Pill Badge (Crisp, High-Contrast & Legible) */}
                <g transform="translate(0, 34)" className="pointer-events-none">
                  <rect
                    x="-44"
                    y="-9"
                    width="88"
                    height="18"
                    rx="9"
                    fill={isSelected ? node.color : "#12141C"}
                    stroke={isSelected ? "#FFFFFF" : "#38384A"}
                    strokeWidth={isSelected ? "1.5" : "1"}
                    className="transition-all duration-200 shadow-md"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill={isSelected ? (node.color === "#FFFFFF" || node.color === "#FFD500" || node.color === "#00D8FF" ? "#000000" : "#FFFFFF") : "#F0EDE3"}
                    fontSize="9.5"
                    fontWeight="900"
                    letterSpacing="0.03em"
                    fontFamily="'Montserrat', sans-serif"
                    className="transition-colors select-none"
                  >
                    {node.shortName || node.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Skill Detail Comic Card */}
      <div className="w-full max-w-md lg:max-w-lg">
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-[#14141A] border-2 sm:border-3 border-black rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-[5px_5px_0px_#FF1E26] sm:shadow-[7px_7px_0px_#FF1E26] relative overflow-hidden"
            >
              {/* Category & Level Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 bg-zinc-800/80 px-2.5 sm:px-3 py-1 rounded-md">
                  {selectedSkill.category}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-black uppercase px-2.5 sm:px-3 py-1 rounded-md border ${
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
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl p-2 flex items-center justify-center border-2 border-black shadow-[3px_3px_0_#000] shrink-0 bg-[#1E1E28] overflow-hidden">
                  <img
                    src={selectedSkill.iconImg}
                    alt={selectedSkill.name}
                    className="w-full h-full object-contain"
                    style={{
                      mixBlendMode: "screen",
                      filter: selectedSkill.id === "unity" ? "invert(1)" : "none",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-none">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-spider-yellow uppercase tracking-wider mt-1.5 flex items-center gap-1">
                    <Zap size={14} />
                    <span>{selectedSkill.levelText}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-3 sm:my-4">
                {selectedSkill.desc}
              </p>

              {/* Comic Lore / Fun Fact */}
              <div className="bg-[#1A1A24] border-l-4 border-spider-red p-3 sm:p-3.5 rounded-r-xl">
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-spider-red mb-0.5 flex items-center gap-1">
                  <Sparkles size={13} />
                  <span>Spidey Lore / Dev Fact</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-medium leading-normal">
                  "{selectedSkill.fact}"
                </p>
              </div>

              {/* Action hint */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-500">
                <span>Hover for slow-motion • Click to inspect</span>
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
