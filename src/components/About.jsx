"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animation";
import HangingSpidey from "./HangingSpidey";

/* ================================================================
   SECRET IDENTITY REVEAL CARD — OPSI A: DIAGONAL COMIC SLASH
   ----------------------------------------------------------------
   Mechanic:
   - IDLE: 4 triangular pieces of Spider-Man suit cover the photo
   - HOVER (desktop) / TAP (mobile): 4 triangles fly outward diagonally
     + yellow slash wipes across + real photo revealed with glow
   ================================================================= */

const SPIDER_SUIT_URL =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close%20up%20portrait%20of%20The%20Amazing%20Spider-Man%20wearing%20classic%20red%20and%20blue%20costume%2C%20cinematic%20comic%20book%20style%2C%20bold%20shadows%2C%20head%20and%20shoulders%20shot%2C%20looking%20at%20camera&image_size=portrait_4_3";

/* 
  NOTE: Letakkan foto asli Ferrel di src/assets/ferrel-portrait.jpg
  Jika belum ada, akan fallback ke Picsum seed placeholder.
  (User sudah upload foto B&W profile, nanti kita save di step asset-prep)
*/
const FERREL_PORTRAIT_URL = new URL("../assets/ferrel-portrait.jpg", import.meta.url)
  .href;

/* Animated Stat Counter: counts 0 → target when in view */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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

      // Hitung progress drag kanan/kiri
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
      // Single tap toggle
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
        className="group relative w-full aspect-[4/5] comic-panel overflow-hidden cursor-pointer select-none border-3 sm:border-4 border-black rounded-xl shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#FF1E26] transition-shadow duration-300"
      >
        {/* HANGING SPIDEY (Attached right at top right) */}
        <div className="absolute top-0 right-5 z-40 pointer-events-none">
          <HangingSpidey />
        </div>

        {/* GLOW ENERGY BORDER ON REVEAL */}
        <div
          className={`absolute inset-0 z-30 pointer-events-none border-2 border-spider-yellow transition-opacity duration-300 ${
            isRevealed ? "opacity-100 shadow-[inset_0_0_20px_rgba(255,213,0,0.5)]" : "opacity-0"
          }`}
        />

        {/* LAYER 1: BASE PHOTO (Ferrel's Portrait) */}
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

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(10,10,10,0.6) 100%)",
            }}
          />

          {/* Spider-Verse Chromatic Glitch lines */}
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

        {/* SOLID IDLE COVER (Guarantees 100% seamless cover when idle with zero pixel gaps) */}
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

        {/* ===== TOP LEFT BADGE: Identity Flip Badge ===== */}
        <div className="absolute top-4 left-4 z-30 overflow-hidden h-[34px]">
          <motion.div
            animate={{ y: isRevealed ? -34 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-[34px] flex items-center">
              <span className="bg-spider-red text-white border-2 border-black px-3 py-1 text-[9.5px] sm:text-[10px] font-black tracking-[0.2em] uppercase rounded-md shadow-[2px_2px_0_#000]">
                SPIDERMAN
              </span>
            </div>
            <div className="h-[34px] flex items-center">
              <span className="bg-spider-blue text-white border-2 border-black px-3 py-1 text-[9.5px] sm:text-[10px] font-black tracking-[0.2em] uppercase rounded-md shadow-[2px_2px_0_#000]">
                FERREL RASHAD
              </span>
            </div>
          </motion.div>
        </div>

        {/* ===== BOTTOM RIGHT BADGE: Status Dossier ===== */}
        <div className="absolute bottom-4 right-4 z-30 overflow-hidden h-[34px]">
          <motion.div
            animate={{ y: isRevealed ? -34 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-[34px] flex items-center">
              <span className="bg-spider-yellow text-spider-black border-2 border-black px-2.5 py-1 text-[9px] sm:text-[9.5px] font-black tracking-[0.18em] uppercase rounded-md shadow-[2px_2px_0_#000] blink-soft">
                CLASSIFIED
              </span>
            </div>
            <div className="h-[34px] flex items-center">
              <span className="bg-emerald-500 text-black border-2 border-black px-2.5 py-1 text-[9px] sm:text-[9.5px] font-black tracking-[0.18em] uppercase rounded-md shadow-[2px_2px_0_#000]">
                UNMASKED 100%
              </span>
            </div>
          </motion.div>
        </div>

        {/* ===== BOTTOM LEFT CUE ===== */}
        <div className="absolute bottom-4 left-4 z-30">
          <p className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-[0.18em] text-white/90 drop-shadow-[0_1px_2px_#000]">
            {isRevealed ? "[ IDENTITY UNLOCKED ]" : "[ 🖐️ SWIPE / TAP TO UNMASK ]"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const About = ({ onOpenDailyBugle }) => {
  const stats = [
    { label: "Years Active", value: 1, suffix: "+", accent: "border-t-spider-red" },
    { label: "Missions Done", value: 5, suffix: "+", accent: "border-t-spider-blue" },
    { label: "Certifications", value: 2, suffix: "", accent: "border-t-spider-yellow" },
  ];

  return (
    <motion.section
      id="about"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 sm:py-28 relative overflow-hidden bg-spider-red text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER */}
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-5 tracking-tighter uppercase text-white">
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
          <p className="text-white/90 max-w-md mx-auto font-medium text-sm sm:text-base">
            The man behind the suit. Origins of a multidisciplinary digital creator.
          </p>
        </motion.div>

        {/* MAIN SPLIT LAYOUT: 40% Identity Card / 60% Origin Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-14 md:mb-20">
          {/* LEFT — SECRET IDENTITY CARD WITH HANGING SPIDEY */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 max-w-[440px] mx-auto w-full lg:mx-0 lg:sticky lg:top-32 relative"
          >
            <SecretIdentityCard />
            {/* Comic credit chip */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.18em] uppercase text-white/90">
              <span className="w-2.5 h-2.5 bg-spider-yellow border border-black inline-block rounded-full" />
              <span>Secret Identity Protocol — SHIELD Class A</span>
              <span className="w-2.5 h-2.5 bg-white border border-black inline-block rounded-full" />
            </div>
          </motion.div>

          {/* RIGHT — ORIGIN STORY TEXT */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            {/* Real Name chip */}
            <div>
              <span className="inline-block bg-spider-yellow border-2 border-black comic-chip text-spider-black px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase mb-5 sm:mb-6 shadow-[3px_3px_0_#000]">
                Real Name - Ferrel Rashad Akeyla
              </span>
            </div>

            {/* Comic Caption Box — Pure White Container with High Contrast */}
            <div className="bg-white text-comic-ink p-6 sm:p-8 rounded-sm border-3 border-black shadow-[6px_6px_0_#000]">
              <p className="text-sm sm:text-base text-comic-ink mb-4 leading-relaxed font-semibold">
                Hi! I&apos;m <strong className="text-spider-red font-black">Ferrel Rashad Akeyla</strong>,
                a multidisciplinary digital creator based in Indonesia. With expertise spanning{" "}
                <strong className="text-spider-blue font-black">
                  Full Stack Web Development, Video Editing, 3D Modeling, and Game Development
                </strong>
                , I deliver creative solutions that blend visual aesthetics with technical excellence.
              </p>
              <p className="text-sm sm:text-base text-comic-ink leading-relaxed font-semibold">
                I believe every project is an opportunity to create unique and immersive experiences,
                whether through responsive web applications, cinematic video storytelling,
                detailed 3D models, or interactive gaming worlds.
              </p>
            </div>

            {/* Small signature banner & Daily Bugle Newspaper Launcher */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 bg-spider-yellow border-2 border-black comic-chip text-spider-black px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase shadow-[2px_2px_0_#000]">
                Alignment — Hero
              </span>
              <span className="inline-flex items-center gap-2 bg-white border-2 border-black comic-chip text-spider-black px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase shadow-[2px_2px_0_#000]">
                Sector — West Java, Indonesia
              </span>
              {onOpenDailyBugle && (
                <button
                  type="button"
                  onClick={onOpenDailyBugle}
                  className="inline-flex items-center gap-2 bg-[#F4EBD9] text-black border-2 border-black hover:bg-white comic-chip px-4 py-2 text-[10px] font-black tracking-[0.15em] uppercase transition-all shadow-[2px_2px_0_#000] hover:scale-105 active:scale-95"
                >
                  <span>📰 Read Daily Bugle Report</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: POWER STATS (3 Comic Stat Blocks) */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white text-comic-ink p-5 sm:p-7 md:p-8 relative overflow-hidden border-3 border-black shadow-[6px_6px_0_#000] ${stat.accent}`}
              style={{ borderRadius: "2px" }}
            >
              {/* Halftone pattern bg inside card */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-full h-full halftone-overlay-sm" />
              </div>
              <p className="relative text-4xl sm:text-5xl font-black text-spider-red mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="relative text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-comic-ink">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
