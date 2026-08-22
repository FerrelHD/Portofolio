"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Code2, Gamepad2, ArrowRight, Newspaper } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staggerContainer } from "../lib/animation";
import { soundFX } from "../lib/soundFx";
import HangingSpidey from "./HangingSpidey";

gsap.registerPlugin(ScrollTrigger);

const SPIDER_SUIT_URL = new URL(
  "../assets/spidermancomicnew_Nero_AI_Image_Upscaler_Photo_Face.png",
  import.meta.url
).href;

const FERREL_PORTRAIT_URL = new URL("../assets/ferrel-portrait.jpg", import.meta.url)
  .href;

/* BOLD FADE-IN SLIDE-UP BOTTOM-TO-TOP VARIANTS */
const comicFadeSlideUp = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 190,
      mass: 0.8,
    },
  },
};

const panelFadeSlideUp = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 220,
      mass: 0.7,
    },
  },
};

const stampFadePop = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    y: 15,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 6,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 280,
      delay: 0.15,
    },
  },
};

const stampFadePopLeft = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    y: 15,
    rotate: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: -6,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 280,
      delay: 0.15,
    },
  },
};

/* Animated Stat Counter */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    const from = 0;
    let rafId;
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {count}
      {suffix}
    </span>
  );
};

/* PUFFY COMIC CLOUD SVG COMPONENT */
const ComicCloud = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 70"
    className={`drop-shadow-[3px_3px_0_#000] pointer-events-none ${className}`}
    fill="#FFFFFF"
    stroke="#000000"
    strokeWidth="3.5"
    strokeLinejoin="round"
  >
    <path d="M 25,55 C 10,55 5,42 12,32 C 8,22 18,12 30,15 C 38,5 58,5 68,14 C 78,6 98,8 102,20 C 114,24 116,40 106,50 C 112,60 98,65 88,58 C 78,66 60,65 52,58 C 42,66 28,64 25,55 Z" />
    <path d="M 20,38 Q 28,45 35,38" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 75,42 Q 82,48 90,40" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const SHARDS = [
  {
    id: "tl-eye",
    clip: "polygon(0 0, 50% 0, 50% 50%, 0 35%)",
    exit: { x: "-35%", y: "-35%", rotate: -15, z: 45, opacity: 0.15 },
    delay: 0,
  },
  {
    id: "tr-eye",
    clip: "polygon(50% 0, 100% 0, 100% 35%, 50% 50%)",
    exit: { x: "35%", y: "-35%", rotate: 15, z: 45, opacity: 0.15 },
    delay: 0.02,
  },
  {
    id: "ml-web",
    clip: "polygon(0 35%, 50% 50%, 0 70%)",
    exit: { x: "-45%", y: "0%", rotate: -10, z: 35, opacity: 0.1 },
    delay: 0.04,
  },
  {
    id: "mr-web",
    clip: "polygon(50% 50%, 100% 35%, 100% 70%)",
    exit: { x: "45%", y: "0%", rotate: 10, z: 35, opacity: 0.1 },
    delay: 0.03,
  },
  {
    id: "bl-chin",
    clip: "polygon(0 70%, 50% 50%, 50% 100%, 0 100%)",
    exit: { x: "-30%", y: "35%", rotate: 12, z: 40, opacity: 0.15 },
    delay: 0.05,
  },
  {
    id: "br-chin",
    clip: "polygon(50% 50%, 100% 70%, 100% 100%, 50% 100%)",
    exit: { x: "30%", y: "35%", rotate: -12, z: 40, opacity: 0.15 },
    delay: 0.01,
  },
];

const SecretIdentityCard = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragProgress, setDragProgress] = useState(0);
  const cardRef = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const triggerHaptic = (ms = 35) => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate(ms);
      } catch (_) {}
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseEnter = () => {
    setIsRevealed(true);
    triggerHaptic(30);
    soundFX.playThwip();
  };

  const handleMouseLeave = () => {
    setIsRevealed(false);
    setTilt({ x: 0, y: 0 });
    soundFX.playBeep(320);
  };

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 10) {
      isDragging.current = true;
      const rect = cardRef.current.getBoundingClientRect();
      const normX = (touch.clientX - rect.left) / rect.width - 0.5;
      const normY = (touch.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: normX * 18, y: -normY * 18 });

      const progress = Math.min(Math.max(Math.abs(dx) / (rect.width * 0.35), 0), 1);
      setDragProgress(progress);
      if (progress > 0.15 && !isRevealed) {
        setIsRevealed(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging.current) {
      if (dragProgress > 0.35 || isRevealed) {
        setIsRevealed(true);
        triggerHaptic(45);
        soundFX.playThwip();
      } else {
        setIsRevealed(false);
        triggerHaptic(20);
        soundFX.playBeep(320);
      }
      setDragProgress(0);
      setTilt({ x: 0, y: 0 });
      isDragging.current = false;
    } else {
      handleTap();
    }
  };

  const handleTap = () => {
    setIsRevealed((prev) => {
      const next = !prev;
      triggerHaptic(next ? 40 : 25);
      if (next) soundFX.playThwip();
      else soundFX.playBeep(320);
      return next;
    });
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
        animate={{
          rotateX: tilt.y,
          rotateY: tilt.x,
          scale: isRevealed ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative w-full aspect-[4/5] comic-panel overflow-hidden cursor-pointer select-none border-3 sm:border-4 border-black rounded-xl shadow-[6px_6px_0_#000] sm:shadow-[8px_8px_0_#000] hover:shadow-[10px_10px_0_#FFD500] transition-shadow duration-300"
      >
        {/* HANGING SPIDEY */}
        <div className="absolute top-0 right-3 sm:right-5 z-40 pointer-events-none">
          <HangingSpidey />
        </div>

        {/* GLOW ENERGY BORDER ON REVEAL */}
        <div
          className={`absolute inset-0 z-30 pointer-events-none border-2 border-spider-yellow transition-opacity duration-300 ${
            isRevealed ? "opacity-100 shadow-[inset_0_0_20px_rgba(255,213,0,0.5)]" : "opacity-0"
          }`}
        />

        {/* LAYER 1: BASE PHOTO */}
        <div className="absolute inset-0 z-10 w-full h-full bg-black">
          <img
            src={FERREL_PORTRAIT_URL}
            alt="Ferrel Rashad Akeyla - Secret Identity"
            className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://picsum.photos/seed/ferrel-rashad-portrait/800/1000";
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(10,10,10,0.6) 100%)",
            }}
          />

          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
              isRevealed ? "opacity-30 mix-blend-color-dodge bg-gradient-to-r from-cyan-500 via-transparent to-red-500" : "opacity-0"
            }`}
          />
        </div>

        {/* LAYER 2: 6 DYNAMIC 3D SPIDER-VERSE SHARDS */}
        {SHARDS.map((shard) => (
          <motion.div
            key={shard.id}
            initial={false}
            animate={
              isRevealed
                ? shard.exit
                : { x: "0%", y: "0%", rotate: 0, z: 0, opacity: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: shard.delay,
            }}
            className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            style={{
              clipPath: shard.clip,
              backgroundImage: `url(${SPIDER_SUIT_URL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: isRevealed
                ? "drop-shadow(0 0 12px rgba(255,213,0,0.85)) drop-shadow(-3px 0 0 #00F0FF) drop-shadow(3px 0 0 #FF1E26)"
                : "none",
            }}
          />
        ))}

        {/* SOLID IDLE COVER */}
        <motion.div
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-21 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${SPIDER_SUIT_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* LAYER 3: DIAGONAL YELLOW LASER SLASH WIPE */}
        <motion.div
          initial={false}
          animate={{
            x: isRevealed ? "150%" : "-150%",
            opacity: isRevealed ? 1 : 0,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0 z-25 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, #FFD500 48%, #FFFFFF 50%, #FFD500 52%, transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* HALFTONE OVERLAY */}
        <div
          className="absolute inset-0 z-25 pointer-events-none opacity-25 mix-blend-overlay"
          aria-hidden="true"
        >
          <div className="w-full h-full halftone-overlay-sm" />
        </div>

        {/* TOP LEFT BADGE (RESPONSIVE FONT & PADDING) */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-30 overflow-hidden h-[30px] sm:h-[34px]">
          <motion.div
            animate={{ y: isRevealed ? -34 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-[30px] sm:h-[34px] flex items-center">
              <span className="bg-spider-red text-white border-2 border-black px-2 sm:px-3 py-0.5 sm:py-1 text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase rounded-md shadow-[1.5px_1.5px_0_#000] sm:shadow-[2px_2px_0_#000]">
                SPIDERMAN
              </span>
            </div>
            <div className="h-[30px] sm:h-[34px] flex items-center">
              <span className="bg-spider-blue text-white border-2 border-black px-2 sm:px-3 py-0.5 sm:py-1 text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase rounded-md shadow-[1.5px_1.5px_0_#000] sm:shadow-[2px_2px_0_#000]">
                FERREL RASHAD
              </span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM RIGHT BADGE */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-30 overflow-hidden h-[30px] sm:h-[34px]">
          <motion.div
            animate={{ y: isRevealed ? -34 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-[30px] sm:h-[34px] flex items-center">
              <span className="bg-spider-yellow text-spider-black border-2 border-black px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] xs:text-[9px] sm:text-[9.5px] font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase rounded-md shadow-[1.5px_1.5px_0_#000] sm:shadow-[2px_2px_0_#000] blink-soft">
                CLASSIFIED
              </span>
            </div>
            <div className="h-[30px] sm:h-[34px] flex items-center">
              <span className="bg-emerald-500 text-black border-2 border-black px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] xs:text-[9px] sm:text-[9.5px] font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase rounded-md shadow-[1.5px_1.5px_0_#000] sm:shadow-[2px_2px_0_#000]">
                UNMASKED 100%
              </span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM LEFT CUE */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-30 max-w-[55%] truncate">
          <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white/90 drop-shadow-[0_1px_2px_#000]">
            {isRevealed ? "[ IDENTITY UNLOCKED ]" : "[ 🖐️ TAP TO UNMASK ]"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* SPIDER SUIT HUD & DIAGNOSTICS WIDGET (WITH INTERACTIVE WEB-SHOOTER) */
const SpiderSuitHUDWidget = () => {
  const [fluidLevel, setFluidLevel] = useState(4); // 4 bars = 100%
  const [isReloading, setIsReloading] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const handleShootWeb = (e) => {
    e.stopPropagation();
    if (isReloading) return;

    if (fluidLevel > 1) {
      const next = fluidLevel - 1;
      setFluidLevel(next);
      soundFX.playThwip();
      setLastAction(`THWIP! -25%`);
      setTimeout(() => setLastAction(null), 800);
    } else {
      // Last shot -> trigger reload
      setFluidLevel(0);
      soundFX.playThwip();
      setIsReloading(true);
      setLastAction(`EMPTY! RELOADING...`);

      setTimeout(() => {
        setFluidLevel(4);
        setIsReloading(false);
        setLastAction(`REFILLED 100% ⚡`);
        soundFX.playBeep(440);
        setTimeout(() => setLastAction(null), 1000);
      }, 1200);
    }
  };

  const getFluidPercent = () => {
    if (isReloading) return "RELOAD";
    return `${fluidLevel * 25}%`;
  };

  return (
    <motion.div
      variants={panelFadeSlideUp}
      className="bg-[#FAF8F5] text-comic-ink p-3 sm:p-3.5 border-2 sm:border-3 border-black rounded-xl shadow-[4px_4px_0_#000] relative overflow-hidden select-none"
    >
      {/* Halftone subtle bg */}
      <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />

      {/* Top Header Strip */}
      <div className="flex items-center justify-between gap-2 border-b-2 border-black/15 pb-1.5 mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-[0.14em] text-comic-ink">
            SUIT DIAGNOSTICS // HUD v2.6
          </span>
        </div>
        <span className="bg-spider-yellow text-spider-black text-[7px] xs:text-[7.5px] font-black uppercase px-1.5 py-0.5 border border-black rounded shadow-[1px_1px_0_#000]">
          {lastAction ? lastAction : "STARK-TECH"}
        </span>
      </div>

      {/* 2x2 Diagnostics Grid */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        {/* Status 1: INTERACTIVE WEB FLUID CARTRIDGE (CLICK TO SHOOT) */}
        <motion.div
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleShootWeb}
          className={`p-2 border-2 border-black rounded shadow-[2px_2px_0_#000] cursor-pointer transition-colors relative overflow-hidden ${
            isReloading
              ? "bg-spider-yellow/30 border-spider-red"
              : "bg-white hover:bg-spider-blue/10"
          }`}
          title="Click to shoot web & test cartridge!"
        >
          <div className="flex items-center justify-between text-[7px] xs:text-[7.5px] font-black uppercase tracking-wider text-comic-ink mb-1">
            <span className="flex items-center gap-1">
              <span>🕸️</span>
              <span className="text-spider-blue">SHOOT WEB</span>
            </span>
            <span
              className={`font-black ${
                fluidLevel <= 1 ? "text-spider-red animate-pulse" : "text-spider-blue"
              }`}
            >
              {getFluidPercent()}
            </span>
          </div>

          {/* 4-Segment Cartridge Battery Meter */}
          <div className="w-full bg-black/15 h-2.5 rounded-sm overflow-hidden border border-black flex gap-0.5 p-0.5">
            {[1, 2, 3, 4].map((bar) => {
              const isFilled = bar <= fluidLevel;
              return (
                <div
                  key={bar}
                  className={`h-full flex-1 rounded-xs transition-all duration-200 ${
                    isFilled
                      ? fluidLevel === 1
                        ? "bg-spider-red"
                        : "bg-spider-blue"
                      : "bg-transparent"
                  }`}
                />
              );
            })}
          </div>

          <p className="text-[6.5px] xs:text-[7px] font-black uppercase tracking-wider text-comic-ink/70 mt-1 text-center">
            {isReloading ? "⚙️ AUTO-REFILL..." : "👆 TAP TO SHOOT"}
          </p>
        </motion.div>

        {/* Status 2: Spider-Sense Sensitivity */}
        <div className="bg-white p-2 border border-black rounded shadow-[1.5px_1.5px_0_#000] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] xs:text-[7.5px] font-black uppercase tracking-wider text-comic-ink/80 mb-1">
            <span>⚡ SPIDER-SENSE</span>
            <span className="text-spider-red font-black">LVL 5</span>
          </div>
          <p className="text-[7.5px] xs:text-[8px] font-black uppercase tracking-tight text-emerald-600 truncate">
            ● READY FOR ACTION
          </p>
          <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden border border-black/30 mt-1">
            <div className="bg-emerald-500 h-full w-full animate-pulse" />
          </div>
        </div>

        {/* Status 3: Sector Coordinates */}
        <div className="bg-white p-2 border border-black rounded shadow-[1.5px_1.5px_0_#000]">
          <span className="text-[7px] xs:text-[7.5px] font-black uppercase tracking-wider text-comic-ink/70 block mb-0.5">
            📍 SECTOR COORD
          </span>
          <p className="text-[7.5px] xs:text-[8px] font-black uppercase tracking-tight text-comic-ink truncate">
            WEST JAVA, ID (-6.9°)
          </p>
        </div>

        {/* Status 4: Mission Status */}
        <div className="bg-white p-2 border border-black rounded shadow-[1.5px_1.5px_0_#000]">
          <span className="text-[7px] xs:text-[7.5px] font-black uppercase tracking-wider text-comic-ink/70 block mb-0.5">
            🚀 MISSION STATUS
          </span>
          <p className="text-[7.5px] xs:text-[8px] font-black uppercase tracking-tight text-spider-blue truncate">
            CODE &amp; DEPLOY ACTIVE
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const About = ({ onOpenDailyBugle }) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const leftStickyRef = useRef(null);

  const stats = [
    { label: "Years Active", value: 1, suffix: "+", accent: "border-t-spider-red" },
    { label: "Missions Done", value: 5, suffix: "+", accent: "border-t-spider-blue" },
    { label: "Certifications", value: 2, suffix: "", accent: "border-t-spider-yellow" },
  ];

  // GSAP Sticky Parallax Float
  useEffect(() => {
    if (reduce || !leftStickyRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftStickyRef.current,
        { y: 35 },
        {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 md:py-36 relative overflow-hidden bg-spider-red text-white [clip-path:polygon(0_2.5vw,100%_0,100%_calc(100%-2.5vw),0_100%)]"
    >
      <div className="container mx-auto px-3.5 sm:px-6 relative z-10">
        {/* SECTION HEADER (SLIDE UP FROM BOTTOM WITH FADE) */}
        <motion.div
          variants={comicFadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-5 tracking-tighter uppercase text-white">
            Beyond The{" "}
            <span
              className="text-spider-yellow italic inline-block px-1 select-none"
              style={{
                textShadow:
                  "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0px -1.5px 0 #000, 0px 1.5px 0 #000, -1.5px 0px 0 #000, 1.5px 0px 0 #000, 1px 3px 0 #165DFF, 2px 4.5px 0 #165DFF, 2.5px 6px 0 #0C38A8, 3.5px 7.5px 0 #000000, 4px 10px 8px rgba(0,0,0,0.5)",
              }}
            >
              Mask
            </span>
          </h2>
          <p className="text-white/90 max-w-md mx-auto font-medium text-xs xs:text-sm sm:text-base px-2">
            The man behind the suit. Origins of a multidisciplinary digital creator.
          </p>
        </motion.div>

        {/* MAIN SPLIT LAYOUT: 5 Cols Left (Identity Card + Stats + HUD) vs 7 Cols Right (Authentic Comic Page) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* LEFT — SECRET IDENTITY CARD + POWER STATS + SUIT HUD (PERFECTLY BALANCED HEIGHT) */}
          <div
            ref={leftStickyRef}
            className="lg:col-span-5 max-w-[380px] sm:max-w-[440px] mx-auto w-full lg:mx-0 lg:sticky lg:top-28 relative z-20 flex flex-col gap-3 sm:gap-3.5"
          >
            <motion.div
              variants={comicFadeSlideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <SecretIdentityCard />
              {/* Comic credit chip */}
              <div className="mt-3 sm:mt-3.5 flex items-center justify-center gap-2 text-[9px] xs:text-[10px] font-black tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/90">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-spider-yellow border border-black inline-block rounded-full" />
                <span>Secret Identity Protocol — SHIELD Class A</span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white border border-black inline-block rounded-full" />
              </div>
            </motion.div>

            {/* POWER STATS CARDS */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-3 gap-2 sm:gap-2.5"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={comicFadeSlideUp}
                  className={`bg-white text-comic-ink p-2.5 sm:p-3 relative overflow-hidden border-2 border-black rounded shadow-[3px_3px_0_#000] text-center ${stat.accent}`}
                >
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-full h-full halftone-overlay-sm" />
                  </div>
                  <p className="relative text-2xl sm:text-3xl font-black text-spider-red mb-0.5 leading-none">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="relative text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-wider text-comic-ink leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* SPIDER SUIT HUD & DIAGNOSTICS WIDGET (IDE 1) */}
            <SpiderSuitHUDWidget />
          </div>

          {/* RIGHT — AUTHENTIC COMIC BOOK PAGE STRIP */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7 bg-white text-comic-ink p-3.5 xs:p-4 sm:p-6 md:p-7 border-3 sm:border-4 md:border-[5px] border-black rounded-xl shadow-[6px_6px_0_#000] sm:shadow-[10px_10px_0_#000] relative select-none"
          >
            {/* VINTAGE COMIC BOOK MASTHEAD HEADER */}
            <motion.div
              variants={panelFadeSlideUp}
              className="flex items-center justify-between gap-1.5 sm:gap-2 border-b-[2.5px] sm:border-b-[3.5px] border-black pb-2.5 sm:pb-3 mb-3.5 sm:mb-5 bg-[#FAF8F5] p-2 sm:p-2.5 border-2 rounded"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-spider-red text-white border-2 border-black flex items-center justify-center font-black text-[10px] sm:text-xs shrink-0 shadow-[1px_1px_0_#000]">
                  ★
                </div>
                <div className="min-w-0">
                  <h4 className="text-[8.5px] xs:text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] text-comic-ink leading-tight truncate">
                    SPIDER-DEV COMICS GROUP
                  </h4>
                  <p className="text-[7px] xs:text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-spider-red truncate">
                    VOL. 1 // ISSUE #001 // ORIGIN OF THE CREATOR
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="hidden xs:inline-block text-[7.5px] sm:text-[8.5px] font-mono font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 bg-spider-yellow border border-black text-black">
                  AUG // 2026
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-black bg-spider-yellow flex items-center justify-center font-black text-[8.5px] sm:text-[9.5px] shadow-[1px_1px_0_#000]">
                  12¢
                </div>
              </div>
            </motion.div>

            {/* EASTER EGG: UNCLE BEN'S ETERNAL SLOGAN BANNER */}
            <motion.div
              variants={panelFadeSlideUp}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => soundFX.playPunch()}
              className="mb-4 sm:mb-6 bg-[#FFF9EE] border-2 border-black border-dashed hover:border-solid hover:border-spider-red p-2 xs:p-2.5 sm:p-3 rounded text-center cursor-pointer transition-all shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#FF1E26] group select-none"
              title="Click for Easter Egg sound!"
            >
              <p className="text-[8px] xs:text-[9.5px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.18em] text-comic-ink group-hover:text-spider-red transition-colors flex items-center justify-center gap-1.5 sm:gap-2 leading-tight">
                <span className="text-spider-red animate-pulse">🕷️</span>
                <span>&ldquo;WITH GREAT POWER COMES GREAT RESPONSIBILITY&rdquo;</span>
                <span className="text-spider-red animate-pulse">🕷️</span>
              </p>
            </motion.div>

            {/* COMIC PAGE PANELS CONTAINER */}
            <div className="space-y-4 sm:space-y-6 md:space-y-7 relative">
              {/* TIER 1: TOP SPLIT PANELS */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* TOP LEFT PANEL (CLASSIC SPIDER-BLUE) */}
                <motion.div
                  variants={panelFadeSlideUp}
                  className="relative bg-spider-blue text-white p-3.5 xs:p-4 sm:p-5 border-2 sm:border-[3px] border-black rounded-md shadow-[3px_3px_0_#000] overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />
                  <div className="relative z-10">
                    <span className="bg-spider-yellow text-spider-black border border-black text-[8px] sm:text-[8.5px] font-black uppercase px-2 py-0.5 rounded shadow-[1px_1px_0_#000] inline-block mb-1.5 sm:mb-2">
                      IDENTIFIER
                    </span>
                    <h4 className="text-xs xs:text-sm sm:text-base font-black uppercase tracking-tight text-white mb-1 sm:mb-1.5">
                      Ferrel Rashad Akeyla
                    </h4>
                    <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-bold leading-relaxed text-white/95">
                      Multidisciplinary creator engineering software, 3D graphics, and game systems from West Java.
                    </p>
                  </div>
                </motion.div>

                {/* TOP RIGHT PANEL (WARM COMIC CREAM) */}
                <motion.div
                  variants={panelFadeSlideUp}
                  className="relative bg-[#FFF8EB] text-comic-ink p-3.5 xs:p-4 sm:p-5 border-2 sm:border-[3px] border-black rounded-md shadow-[3px_3px_0_#000] overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />

                  {/* Comic '!' Starburst Badge */}
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-5 h-5 sm:w-6 sm:h-6 bg-spider-yellow text-spider-black border-2 border-black rounded-full flex items-center justify-center font-black text-[10px] sm:text-xs shadow-[1.5px_1.5px_0_#000] rotate-12 z-20">
                    !
                  </div>

                  <div className="relative z-10 pr-6">
                    <span className="bg-spider-red text-white border border-black text-[8px] sm:text-[8.5px] font-black uppercase px-2 py-0.5 rounded shadow-[1px_1px_0_#000] inline-block mb-1.5 sm:mb-2">
                      MISSION DIRECTIVE
                    </span>
                    <h4 className="text-xs xs:text-sm sm:text-base font-black uppercase tracking-tight text-comic-ink mb-1 sm:mb-1.5">
                      Creative Code &amp; Motion
                    </h4>
                    <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-bold leading-relaxed text-comic-ink/90">
                      Merging high-octane visual aesthetics with bulletproof modern technical architectures.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* TIER 2: MIDDLE FULL-WIDTH RED SUNBURST BANNER */}
              <motion.div
                variants={panelFadeSlideUp}
                className="relative bg-spider-red text-white p-3.5 xs:p-4 sm:p-6 pt-6 xs:pt-7 sm:pt-8 border-2 sm:border-[3px] border-black rounded-md shadow-[4px_4px_0_#000]"
              >
                {/* Comic Sunburst Radial Lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 rounded-sm"
                  style={{
                    background:
                      "repeating-conic-gradient(from 0deg, #000 0deg 15deg, transparent 15deg 30deg)",
                  }}
                />

                {/* Corner Comic Clouds (Left & Right) */}
                <ComicCloud className="absolute -top-3 -left-3 sm:-top-3.5 sm:-left-3.5 w-12 h-8 sm:w-16 sm:h-10 z-20" />
                <ComicCloud className="absolute -bottom-3 -right-3 sm:-bottom-3.5 sm:-right-3.5 w-12 h-8 sm:w-16 sm:h-10 z-20" />

                {/* ORIGIN! ⚡ ACTION STICKER */}
                <motion.div
                  variants={stampFadePop}
                  className="absolute -top-3 right-2.5 sm:-top-3.5 sm:right-4 z-30 bg-spider-yellow text-spider-black border-2 border-black font-black text-[9px] xs:text-[10px] sm:text-xs tracking-wider sm:tracking-widest px-2 sm:px-3 py-0.5 sm:py-1 rounded shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] rotate-6"
                >
                  ORIGIN! ⚡
                </motion.div>

                {/* Inner Comic Caption Box */}
                <div className="relative z-10 bg-white text-comic-ink p-3.5 sm:p-5 border-2 border-black rounded shadow-[2.5px_2.5px_0_#000] sm:shadow-[3px_3px_0_#000]">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <span className="bg-spider-yellow text-spider-black px-1.5 sm:px-2 py-0.5 text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-wider border border-black">
                      CAPTION #01
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase text-spider-red">
                      THE MULTIDISCIPLINARY ARCHITECT
                    </span>
                  </div>

                  <p className="text-[11px] xs:text-xs sm:text-sm font-semibold leading-relaxed mb-1.5 sm:mb-2 text-comic-ink">
                    Hi! I&apos;m <strong className="text-spider-red font-black">Ferrel Rashad Akeyla</strong>,
                    a digital creator crafting solutions across{" "}
                    <strong className="text-spider-blue font-black">
                      Full Stack Web Development, Video Editing, 3D Modeling, and Game Development
                    </strong>
                    .
                  </p>
                  <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-semibold leading-relaxed text-comic-ink/85">
                    Every project is treated as an opportunity to build memorable experiences, from responsive web platforms to cinematic 3D worlds.
                  </p>
                </div>
              </motion.div>

              {/* TIER 3: BOTTOM SPLIT PANELS (YELLOW ZAP! & BLUE ZOOM!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* BOTTOM LEFT: SPIDER-YELLOW PANEL WITH ZAP! ⚡ */}
                <motion.div
                  variants={panelFadeSlideUp}
                  className="relative bg-spider-yellow text-spider-black p-3.5 xs:p-4 sm:p-5 border-2 sm:border-[3px] border-black rounded-md shadow-[3px_3px_0_#000] flex flex-col justify-between"
                >
                  <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />

                  {/* ZAP! ⚡ ACTION STICKER */}
                  <motion.div
                    variants={stampFadePopLeft}
                    className="absolute -top-3 right-2.5 sm:-top-3.5 sm:right-3.5 z-30 bg-spider-red text-white border-2 border-black font-black text-[8px] xs:text-[9px] tracking-wider px-2 sm:px-2.5 py-0.5 rounded shadow-[2px_2px_0_#000] -rotate-6"
                  >
                    ZAP! ⚡
                  </motion.div>

                  <div className="relative z-10 pr-6 sm:pr-8">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 text-spider-black">
                      <Code2 size={16} strokeWidth={2.8} className="shrink-0" />
                      <h4 className="font-black text-xs xs:text-sm uppercase tracking-tight">
                        Web &amp; 60 FPS Motion
                      </h4>
                    </div>

                    <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-bold leading-relaxed mb-2.5 sm:mb-3 text-spider-black/90">
                      React 19, Next.js, and TypeScript architectures paired with fluid Framer physics.
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t-2 border-black/15">
                    {["React 19", "Next.js", "TypeScript", "Motion"].map((tech, i) => (
                      <span
                        key={i}
                        className="text-[7.5px] xs:text-[8.5px] font-black px-1.5 sm:px-2 py-0.5 bg-white border border-black rounded shadow-[1px_1px_0_#000]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* BOTTOM RIGHT: SPIDER-BLUE PANEL WITH ZOOM! 🎮 */}
                <motion.div
                  variants={panelFadeSlideUp}
                  className="relative bg-spider-blue text-white p-3.5 xs:p-4 sm:p-5 border-2 sm:border-[3px] border-black rounded-md shadow-[3px_3px_0_#000] flex flex-col justify-between"
                >
                  <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />

                  {/* ZOOM! 🎮 ACTION STICKER */}
                  <motion.div
                    variants={stampFadePop}
                    className="absolute -top-3 right-2.5 sm:-top-3.5 sm:right-3.5 z-30 bg-spider-yellow text-spider-black border-2 border-black font-black text-[8px] xs:text-[9px] tracking-wider px-2 sm:px-2.5 py-0.5 rounded shadow-[2px_2px_0_#000] rotate-6"
                  >
                    ZOOM! 🎮
                  </motion.div>

                  <div className="relative z-10 pr-6 sm:pr-8">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 text-white">
                      <Gamepad2 size={16} strokeWidth={2.8} className="shrink-0" />
                      <h4 className="font-black text-xs xs:text-sm uppercase tracking-tight">
                        Game Mechanics
                      </h4>
                    </div>

                    <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-bold leading-relaxed mb-2.5 sm:mb-3 text-white/95">
                      Blender 3D stylized modeling and Unity C# arcade combat game mechanics.
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t-2 border-white/20">
                    {["Blender 3D", "Unity C#", "Video Pacing", "Physics"].map((tech, i) => (
                      <span
                        key={i}
                        className="text-[7.5px] xs:text-[8.5px] font-black px-1.5 sm:px-2 py-0.5 bg-white text-comic-ink border border-black rounded shadow-[1px_1px_0_#000]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* TIER 4: DIALOGUE SPEECH BUBBLE & ACTION BUTTONS STRIP */}
              <motion.div
                variants={panelFadeSlideUp}
                className="bg-[#FAF8F5] p-3 xs:p-3.5 sm:p-4 border-2 sm:border-[3px] border-black rounded-md shadow-[3px_3px_0_#000] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              >
                {/* Comic Speech Bubble */}
                <div className="relative bg-white border-2 border-black px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-[2px_2px_0_#000] w-full sm:max-w-sm">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-emerald-700">
                      STATUS: READY FOR MISSIONS
                    </span>
                  </div>
                  <p className="text-[10.5px] xs:text-[11px] sm:text-xs font-black text-comic-ink leading-tight">
                    &ldquo;Standing by for production web builds, interactive 3D media, or freelance contracts!&rdquo;
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto justify-end">
                  {onOpenDailyBugle && (
                    <button
                      type="button"
                      onClick={onOpenDailyBugle}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#F4EBD9] text-black border-2 border-black hover:bg-white comic-chip px-3 py-2 text-[9px] xs:text-[9.5px] sm:text-[10px] font-black tracking-wider uppercase transition-all shadow-[2px_2px_0_#000] hover:scale-105 active:scale-95 cursor-pointer w-full xs:w-auto"
                    >
                      <Newspaper size={13} />
                      <span>Daily Bugle</span>
                    </button>
                  )}
                  <a
                    href="#projects"
                    onClick={() => soundFX.playPunch()}
                    className="inline-flex items-center justify-center gap-1.5 bg-spider-yellow text-spider-black border-2 border-black hover:bg-spider-red hover:text-white comic-chip px-3 py-2 text-[9px] xs:text-[9.5px] sm:text-[10px] font-black tracking-wider uppercase transition-all shadow-[2px_2px_0_#000] hover:scale-105 active:scale-95 cursor-pointer w-full xs:w-auto"
                  >
                    <span>View Missions</span>
                    <ArrowRight size={13} strokeWidth={2.8} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
