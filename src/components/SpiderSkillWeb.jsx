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
import aiAgentIcon from "../assets/ai-agent-removebg-preview.png";
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
      {/* Interactive Spider-Radar Constellation SVG with Orbital Motion */}
      <motion.div
        initial={{ opacity: 0, y: 45, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[520px] lg:max-w-[600px] aspect-square flex items-center justify-center select-none touch-manipulation group/web"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 2500)}
      >
        {/* Slow Motion Comic Badge (Appears on hover, positioned higher with comic pop style) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute top-[-24px] sm:top-[-30px] md:top-[-34px] left-1/2 -translate-x-1/2 bg-spider-yellow text-spider-black border-2 sm:border-3 border-black comic-chip px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest pointer-events-none shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] z-20 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Zap size={13} className="text-spider-red fill-spider-red" />
              <span>SLOW-MOTION MODE ACTIVATED!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
          <defs>
            {/* Retro Comic Ink Halftone Pattern */}
            <pattern id="spiderHalftone" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.3" fill="#1A1A1A" opacity="0.07" />
            </pattern>

            {/* Spider-Red Radar Scanner Gradient */}
            <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D31F1F" stopOpacity="0.26" />
              <stop offset="60%" stopColor="#D31F1F" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Circular Clip Paths for Node Icons */}
            {SKILLS_DATA.map((node) => (
              <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                <circle cx="0" cy="0" r="17" />
              </clipPath>
            ))}
          </defs>

          {/* 1. AUTHENTIC COMIC NEWSPRINT SPIDER-RADAR HUD BASE (OPSI A) */}
          {/* Outer Warm Comic Paper Backing Disk with Crisp Ink Border & Comic Shadow */}
          <circle
            cx={cx}
            cy={cy}
            r="285"
            fill="#F7F4EE"
            stroke="#1A1A1A"
            strokeWidth="3.5"
            className="shadow-[8px_8px_0_#1A1A1A]"
          />
          {/* Inner Red Accent Rim */}
          <circle
            cx={cx}
            cy={cy}
            r="280"
            fill="none"
            stroke="#D31F1F"
            strokeWidth="2"
            opacity="0.85"
          />
          {/* Halftone Texture Overlay */}
          <circle cx={cx} cy={cy} r="280" fill="url(#spiderHalftone)" />

          {/* Rotating Comic Red Radar Scanner Sweep */}
          <g
            className="pointer-events-none"
            style={{
              transformOrigin: "300px 300px",
              animation: "spin 16s linear infinite",
            }}
          >
            <path
              d={`M ${cx} ${cy} L ${cx} ${cy - 280} A 280 280 0 0 1 ${cx + 195} ${cy - 200} Z`}
              fill="url(#radarSweepGradient)"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 280}
              stroke="#D31F1F"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.85"
            />
          </g>

          {/* 2. CRISP GEOMETRIC POLYGONAL COBWEB RINGS */}
          {[75, 135, 185, 235, 280].map((r) => {
            const isRing1 = r === 135;
            const isRing2 = r === 235;
            return (
              <polygon
                key={`poly-${r}`}
                points={getPolygonPoints(r, 12)}
                fill="none"
                stroke={isRing1 ? "#165DFF" : isRing2 ? "#D31F1F" : "#1A1A1A"}
                strokeWidth={isRing1 || isRing2 ? "2" : "1.2"}
                strokeDasharray={isRing1 || isRing2 ? "6 5" : "none"}
                opacity={isRing1 || isRing2 ? 0.95 : 0.25}
              />
            );
          })}

          {/* Rotating Orbit Path Guides */}
          <circle
            cx={cx}
            cy={cy}
            r={ringRadius[1]}
            fill="none"
            stroke="#165DFF"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-45 animate-spin"
            style={{ transformOrigin: "300px 300px", animationDuration: "45s" }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringRadius[2]}
            fill="none"
            stroke="#D31F1F"
            strokeWidth="1.2"
            strokeDasharray="5 8"
            className="opacity-45 animate-spin"
            style={{ transformOrigin: "300px 300px", animationDirection: "reverse", animationDuration: "65s" }}
          />

          {/* 3. RADIAL WEB STRANDS (12 Principal Spokes) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const x2 = cx + 280 * Math.cos(rad);
            const y2 = cy + 280 * Math.sin(rad);
            return (
              <line
                key={`spoke-${deg}`}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#1A1A1A"
                strokeWidth="1.2"
                opacity="0.28"
              />
            );
          })}

          {/* 4. ACTIVE HIGHLIGHT CONNECTING WEB (Lights up to active node) */}
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
                stroke={isSelected ? "#D31F1F" : "transparent"}
                strokeWidth={isSelected ? "3" : "0"}
                className="transition-all duration-150"
              />
            );
          })}

          {/* 5. CENTER HUB: SPIDER-MAN EMBLEM */}
          <g transform={`translate(${cx}, ${cy})`} className="pointer-events-none">
            {/* Outer Pulse */}
            <circle r="34" fill="none" stroke="#D31F1F" strokeWidth="2" className="animate-ping opacity-40" />
            {/* Base Hub Button */}
            <circle r="30" fill="#1A1A1A" stroke="#D31F1F" strokeWidth="3" />
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

          {/* 6. INTERACTIVE ORBITING SKILL NODES (High contrast comic badges) */}
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
                {/* Touch Hit Area */}
                <circle r="36" fill="transparent" />

                {/* Node Outer Halo on Selection */}
                {isSelected && (
                  <circle
                    r="29"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2.5"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Node Circle Background Badge */}
                <circle
                  r={isSelected ? "25" : "22"}
                  fill="#1A1A1A"
                  stroke={isSelected ? node.color : "#1A1A1A"}
                  strokeWidth={isSelected ? "3.5" : "2"}
                  className="transition-all duration-200 group-hover:scale-125 shadow-md"
                />

                {/* Embedded Real Icon Image clipped within circle */}
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

                {/* Node Name Pill Badge (Crisp Comic High-Contrast Label) */}
                <g transform="translate(0, 34)" className="pointer-events-none">
                  <rect
                    x="-44"
                    y="-9"
                    width="88"
                    height="18"
                    rx="9"
                    fill={isSelected ? node.color : "#1A1A1A"}
                    stroke={isSelected ? "#1A1A1A" : "#1A1A1A"}
                    strokeWidth={isSelected ? "2" : "1.2"}
                    className="transition-all duration-200 shadow-md"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill={
                      isSelected
                        ? node.color === "#FFFFFF" || node.color === "#FFD500" || node.color === "#00D8FF"
                          ? "#000000"
                          : "#FFFFFF"
                        : "#F7F4EE"
                    }
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
      </motion.div>

      {/* Selected Skill Detail Comic Card with Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.12 }}
        className="w-full max-w-md lg:max-w-lg"
      >
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-[#FFFFFF] border-2 sm:border-3 border-[#18181B] rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-[5px_5px_0px_#D9231E] sm:shadow-[7px_7px_0px_#D9231E] relative overflow-hidden text-[#18181B]"
            >
              {/* Category & Level Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#18181B] bg-[#F7F4EE] border border-[#18181B] px-2.5 sm:px-3 py-1 rounded-md">
                  {selectedSkill.category}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-black uppercase px-2.5 sm:px-3 py-1 rounded-md border ${
                    selectedSkill.level === "Proficient"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-600"
                      : selectedSkill.level === "Familiar"
                      ? "bg-sky-50 text-sky-700 border-sky-600"
                      : "bg-amber-50 text-amber-700 border-amber-600"
                  }`}
                >
                  {selectedSkill.level}
                </span>
              </div>

              {/* Title with Real Icon Image */}
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl p-2 flex items-center justify-center border-2 border-black shadow-[3px_3px_0_#000] shrink-0 bg-[#F7F4EE] overflow-hidden">
                  <img
                    src={selectedSkill.iconImg}
                    alt={selectedSkill.name}
                    className="w-full h-full object-contain"
                    style={{
                      filter: selectedSkill.id === "unity" ? "none" : "none",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#18181B] uppercase tracking-wide leading-none">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#D9231E] uppercase tracking-wider mt-1.5 flex items-center gap-1">
                    <Zap size={14} />
                    <span>{selectedSkill.levelText}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed my-3 sm:my-4">
                {selectedSkill.desc}
              </p>

              {/* Comic Lore / Fun Fact */}
              <div className="bg-[#F7F4EE] border-l-4 border-[#D9231E] p-3 sm:p-3.5 rounded-r-xl border border-[#18181B]">
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#D9231E] mb-0.5 flex items-center gap-1">
                  <Sparkles size={13} />
                  <span>Spidey Lore / Dev Fact</span>
                </div>
                <p className="text-xs sm:text-sm text-[#27272A] italic font-medium leading-normal">
                  "{selectedSkill.fact}"
                </p>
              </div>

              {/* Action hint */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-[#E4E4E7] flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#71717A]">
                <span>Hover for slow-motion • Click to inspect</span>
                <span className="text-[#165DFF] font-bold">Node #{selectedSkill.id}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SpiderSkillWeb;
