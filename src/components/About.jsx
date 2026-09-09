"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Newspaper, Code2, Gamepad2, Cpu, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFX } from "../lib/soundFx";
import HangingSpidey from "./HangingSpidey";

gsap.registerPlugin(ScrollTrigger);

const SPIDER_SUIT_URL = new URL(
  "../assets/spidermancomicnew_Nero_AI_Image_Upscaler_Photo_Face.webp",
  import.meta.url
).href;

const FERREL_PORTRAIT_URL = new URL("../assets/ferrel-portrait.jpg", import.meta.url).href;

/* ENTRANCE ANIMATIONS */
const comicPanelStampLeft = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 260, mass: 0.7, delay: 0.04 },
  },
};

const comicPanelStampRight = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 260, mass: 0.7, delay: 0.14 },
  },
};

/* Animated Counter */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    let rafId;
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(target * eased));
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

const SHARDS = [
  { id: "tl-eye", clip: "polygon(0 0, 50% 0, 50% 50%, 0 35%)", exit: { x: "-35%", y: "-35%", rotate: -15, z: 45, opacity: 0.15 }, delay: 0 },
  { id: "tr-eye", clip: "polygon(50% 0, 100% 0, 100% 35%, 50% 50%)", exit: { x: "35%", y: "-35%", rotate: 15, z: 45, opacity: 0.15 }, delay: 0.02 },
  { id: "ml-web", clip: "polygon(0 35%, 50% 50%, 0 70%)", exit: { x: "-45%", y: "0%", rotate: -10, z: 35, opacity: 0.1 }, delay: 0.04 },
  { id: "mr-web", clip: "polygon(50% 50%, 100% 35%, 100% 70%)", exit: { x: "45%", y: "0%", rotate: 10, z: 35, opacity: 0.1 }, delay: 0.03 },
  { id: "bl-chin", clip: "polygon(0 70%, 50% 50%, 50% 100%, 0 100%)", exit: { x: "-30%", y: "35%", rotate: 12, z: 40, opacity: 0.15 }, delay: 0.05 },
  { id: "br-chin", clip: "polygon(50% 50%, 100% 70%, 100% 100%, 50% 100%)", exit: { x: "30%", y: "35%", rotate: -12, z: 40, opacity: 0.15 }, delay: 0.01 },
];

/* ORIGINAL REVEAL IMAGE (PRESERVED 100%) */
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
      } catch (_) { }
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
        <div className="absolute top-0 right-3 sm:right-5 z-40 pointer-events-none">
          <HangingSpidey />
        </div>

        <div
          className={`absolute inset-0 z-30 pointer-events-none border-2 border-spider-yellow transition-opacity duration-300 ${isRevealed ? "opacity-100 shadow-[inset_0_0_20px_rgba(255,213,0,0.5)]" : "opacity-0"
            }`}
        />

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
            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${isRevealed ? "opacity-30 mix-blend-color-dodge bg-gradient-to-r from-cyan-500 via-transparent to-red-500" : "opacity-0"
              }`}
          />
        </div>

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

        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-30 max-w-[55%] truncate">
          <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white/90 drop-shadow-[0_1px_2px_#000]">
            {isRevealed ? "[ IDENTITY UNLOCKED ]" : "[ 🖐️ TAP TO UNMASK ]"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* HUD DIAGNOSTICS */
const SpiderSuitHUDWidget = () => {
  const [fluidLevel, setFluidLevel] = useState(4);
  const [isReloading, setIsReloading] = useState(false);

  const handleShootWeb = (e) => {
    e.stopPropagation();
    if (isReloading) return;

    if (fluidLevel > 1) {
      setFluidLevel((prev) => prev - 1);
      soundFX.playThwip();
    } else {
      setFluidLevel(0);
      soundFX.playThwip();
      setIsReloading(true);
      setTimeout(() => {
        setFluidLevel(4);
        setIsReloading(false);
        soundFX.playBeep(440);
      }, 1000);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-comic-ink p-3 border-2 sm:border-3 border-black rounded-xl shadow-[4px_4px_0_#000] select-none">
      <div className="flex items-center justify-between border-b-2 border-black/15 pb-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8.5px] font-black uppercase tracking-wider">
            SUIT DIAGNOSTICS // HUD
          </span>
        </div>
        <span className="bg-spider-yellow text-spider-black text-[7.5px] font-black uppercase px-1.5 py-0.5 border border-black rounded shadow-[1px_1px_0_#000]">
          ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div
          onClick={handleShootWeb}
          className="p-2 border-2 border-black rounded shadow-[2px_2px_0_#000] cursor-pointer bg-white hover:bg-spider-yellow/20 transition-colors"
        >
          <div className="flex items-center justify-between text-[7.5px] font-black uppercase tracking-wider mb-1">
            <span>WEB FLUID</span>
            <span className={fluidLevel <= 1 ? "text-spider-red" : "text-spider-blue"}>
              {isReloading ? "RELOAD" : `${fluidLevel * 25}%`}
            </span>
          </div>
          <div className="w-full bg-black/15 h-2 rounded overflow-hidden border border-black flex gap-0.5 p-0.5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`h-full flex-1 rounded-xs transition-colors ${bar <= fluidLevel ? "bg-spider-blue" : "bg-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-2 border-2 border-black rounded shadow-[2px_2px_0_#000] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7.5px] font-black uppercase tracking-wider">
            <span>RADAR STATUS</span>
            <span className="text-emerald-600">ONLINE</span>
          </div>
          <p className="text-[7.5px] font-black uppercase text-comic-ink truncate mt-1">
            READY FOR DEPLOYMENT
          </p>
        </div>
      </div>
    </div>
  );
};

const About = ({ onOpenDailyBugle }) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  const stats = [
    { label: "Years Active", value: 1, suffix: "+", accent: "border-t-spider-red" },
    { label: "Missions Done", value: 5, suffix: "+", accent: "border-t-spider-blue" },
    { label: "Certifications", value: 2, suffix: "", accent: "border-t-spider-yellow" },
  ];

  const techArsenal = [
    { label: "React 19", icon: Code2, color: "text-spider-blue" },
    { label: "TypeScript", icon: Code2, color: "text-spider-blue" },
    { label: "Laravel 11", icon: Layers, color: "text-spider-red" },
    { label: "Machine Learning", icon: Cpu, color: "text-spider-yellow" },
    { label: "Unity C#", icon: Gamepad2, color: "text-spider-red" },
  ];

  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".split-word");
        gsap.fromTo(
          words,
          { y: "120%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="-mt-5 sm:-mt-7 md:-mt-8 pt-24 sm:pt-32 pb-14 relative overflow-hidden bg-spider-red text-white [clip-path:polygon(0_2vw,100%_0,100%_calc(100%-2vw),0_100%)]"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tighter uppercase text-white leading-tight"
          >
            {["Beyond", "The"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-1 -my-1">
                <span className="split-word inline-block">{word}</span>
              </span>
            ))}{" "}
            <span className="inline-block overflow-hidden pt-1 pb-2 px-2 -mt-1 -mb-2 -mx-2">
              <span
                className="split-word text-spider-yellow italic inline-block select-none"
                style={{
                  textShadow:
                    "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 2px 4px 0 #165DFF, 3px 6px 0 #000",
                }}
              >
                Mask
              </span>
            </span>
          </h2>
          <p ref={subtitleRef} className="text-white/90 max-w-md mx-auto font-medium text-xs sm:text-sm">
            The man behind the suit. Origins of a multidisciplinary digital creator.
          </p>
        </div>

        {/* 2-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          {/* SISI KIRI: Secret Identity Card + Stats + HUD */}
          <motion.div
            variants={comicPanelStampLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 max-w-[400px] mx-auto w-full lg:mx-0 flex flex-col gap-3.5"
          >
            <SecretIdentityCard />

            <div className="flex items-center justify-center gap-2 text-[9px] xs:text-[10px] font-black tracking-[0.14em] uppercase text-white/90">
              <span className="w-2 h-2 bg-spider-yellow border border-black inline-block rounded-full" />
              <span>Secret Identity Protocol — SHIELD Class A</span>
              <span className="w-2 h-2 bg-white border border-black inline-block rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`bg-white text-comic-ink p-2.5 relative overflow-hidden border-2 border-black rounded-lg shadow-[3px_3px_0_#000] text-center ${stat.accent}`}
                >
                  <p className="text-2xl font-black text-spider-red mb-0.5 leading-none">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[7.5px] font-black uppercase tracking-wider text-comic-ink leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <SpiderSuitHUDWidget />
          </motion.div>

          {/* SISI KANAN: SOLUSI A (PUNCHY HEADER + MANIFESTO LEAD + ARSENAL CHIPS) */}
          <motion.div
            variants={comicPanelStampRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 bg-white text-comic-ink p-6 sm:p-8 md:p-9 border-3 sm:border-4 border-black rounded-xl shadow-[6px_6px_0_#000] sm:shadow-[8px_8px_0_#000] flex flex-col justify-between"
          >
            <div className="space-y-4 sm:space-y-5">
              {/* Header Strip */}
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-spider-red text-white border-2 border-black flex items-center justify-center font-black text-xs shadow-[1.5px_1.5px_0_#000]">
                    ★
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-comic-ink leading-none">
                      FERREL RASHAD AKEYLA
                    </h4>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-spider-red mt-0.5">
                      ORIGIN DOSSIER // ISSUE #001
                    </p>
                  </div>
                </div>

                <span className="text-[8.5px] sm:text-[9px] font-mono font-black uppercase tracking-wider px-2 py-1 bg-spider-yellow border-2 border-black shadow-[2px_2px_0_#000]">
                  DEP // 2026
                </span>
              </div>

              {/* Punchy Comic Title */}
              <div>
                <span className="inline-block bg-spider-yellow text-spider-black px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider border border-black rounded shadow-[1.5px_1.5px_0_#000] mb-2">
                  [ MISSION STATEMENT ]
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-comic-ink leading-tight">
                  ENGINEERING MEETS VISUAL STORYTELLING.
                </h3>
              </div>

              {/* Manifesto Lead Paragraph (Sentence Case yang Elegan & Nyaman Dibaca) */}
              <p className="text-xs sm:text-[13.5px] md:text-sm font-semibold leading-relaxed text-comic-ink/90 border-l-4 border-spider-red pl-3 sm:pl-3.5 py-0.5 bg-[#FAF8F5]">
                Combining rigorous software engineering with creative visual storytelling, I take ideas from concept to production-ready deployment across web, 3D, and interactive media.
              </p>

              {/* Dossier Detail: 2 Kolom (Tag Kiri + Narasi Kanan) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3.5 pt-1">
                <div className="sm:col-span-3">
                  <span className="inline-block bg-black text-white px-2 py-1 text-[8.5px] font-mono font-black uppercase tracking-wider rounded">
                    ABOUT ME
                  </span>
                </div>
                <div className="sm:col-span-9 space-y-2 text-xs sm:text-[12.5px] leading-relaxed text-comic-ink/85 font-medium">
                  <p>
                    I am <strong className="text-comic-ink font-black">Ferrel Rashad Akeyla</strong>, a multidisciplinary digital creator specializing in high-performance Full-Stack Web Applications, Machine Learning quantitative systems, Unity C# game loops, and cinematic visual media.
                  </p>
                  <p className="text-comic-ink/75">
                    Based in <strong className="text-spider-red font-bold">Depok, Jawa Barat</strong>, I focus on building applications that are blazingly fast, aesthetically memorable, and engineered with precision.
                  </p>
                </div>
              </div>

              {/* Tech Arsenal Chips (Mengembalikan Tekstur Visual Flat Neo-Brutalist) */}
              <div className="pt-1">
                <span className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-comic-ink/70 block mb-2">
                  TACTICAL LOADOUT &amp; TECH:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {techArsenal.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.label}
                        className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0_#000]"
                      >
                        <Icon size={12} className={tech.color} strokeWidth={2.5} />
                        <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider text-comic-ink">
                          {tech.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Uncle Ben's Easter Egg */}
              <div
                onClick={() => soundFX.playPunch()}
                className="bg-[#FFF9EE] border-2 border-black border-dashed hover:border-solid hover:border-spider-red p-2.5 rounded-lg text-center cursor-pointer transition-all shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#FF1E26] select-none"
                title="Click for Easter Egg sound!"
              >
                <p className="text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-comic-ink flex items-center justify-center gap-1.5">
                  <span className="text-spider-red">🕷️</span>
                  <span>&ldquo;WITH GREAT POWER COMES GREAT RESPONSIBILITY&rdquo;</span>
                  <span className="text-spider-red">🕷️</span>
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-3.5 border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-emerald-700">
                  STATUS: STANDING BY FOR MISSIONS
                </span>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {onOpenDailyBugle && (
                  <button
                    type="button"
                    onClick={onOpenDailyBugle}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#FAF8F5] text-black border-2 border-black px-3.5 py-2 text-[10px] font-black tracking-wider uppercase transition-all shadow-[2px_2px_0_#000] hover:bg-white active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <Newspaper size={13} />
                    <span>Daily Bugle</span>
                  </button>
                )}
                <a
                  href="#projects"
                  onClick={() => soundFX.playPunch()}
                  className="inline-flex items-center justify-center gap-1.5 bg-spider-yellow text-spider-black border-2 border-black px-3.5 py-2 text-[10px] font-black tracking-wider uppercase transition-all shadow-[2px_2px_0_#000] hover:bg-spider-red hover:text-white active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <span>View Missions</span>
                  <ArrowRight size={13} strokeWidth={2.8} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;