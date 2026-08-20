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

const SecretIdentityCard = () => {
  // Mobile tap-to-toggle (tidak ada hover di mobile)
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={`group relative w-full aspect-[4/5] comic-panel overflow-hidden cursor-pointer select-none ${
        revealed ? "force-reveal" : ""
      }`}
      style={{ borderRadius: "4px" }}
      onClick={() => setRevealed((r) => !r)}
      onTouchEnd={(e) => {
        e.preventDefault();
        setRevealed((r) => !r);
      }}
    >
      {/* HANGING SPIDEY (Attached right at the top frame border) */}
      <div className="absolute top-0 right-5 z-30 pointer-events-none">
        <HangingSpidey />
      </div>

      {/* GLOW RING SAAT DI-HOVER / TER-REVEAL */}
      <div className="identity-glow-ring" style={{ borderRadius: "4px" }} />

      {/* LAYER 1 (BASE): FOTO ASLI FERREL */}
      <div className="identity-photo-base w-full h-full">
        <img
          src={FERREL_PORTRAIT_URL}
          alt="Ferrel Rashad Akeyla - Secret Identity"
          className="w-full h-full object-cover grayscale contrast-110"
          onError={(e) => {
            // Fallback jika file ferrel-portrait.jpg belum ada
            e.currentTarget.src =
              "https://picsum.photos/seed/ferrel-rashad-portrait/800/1000";
          }}
        />
        {/* Inner vignette + subtle halftone di atas foto */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(10,10,10,0.35) 100%)",
          }}
        />
      </div>

      {/* LAYER 2: DIAGONAL YELLOW SLASH WIPE */}
      <div className="identity-slash" style={{ borderRadius: "inherit" }} />

      {/* LAYER 3: 4 TRIANGULAR SUIT PIECES (Diagonal Slash — Opsi A) */}
      {/* Top-Left Triangle */}
      <div
        className="suit-piece suit-piece-tl"
        style={{
          backgroundImage: `url(${SPIDER_SUIT_URL})`,
        }}
      />
      {/* Top-Right Triangle */}
      <div
        className="suit-piece suit-piece-tr"
        style={{
          backgroundImage: `url(${SPIDER_SUIT_URL})`,
        }}
      />
      {/* Bottom-Left Triangle */}
      <div
        className="suit-piece suit-piece-bl"
        style={{
          backgroundImage: `url(${SPIDER_SUIT_URL})`,
        }}
      />
      {/* Bottom-Right Triangle */}
      <div
        className="suit-piece suit-piece-br"
        style={{
          backgroundImage: `url(${SPIDER_SUIT_URL})`,
        }}
      />

      {/* HALFTONE OVERLAY di seluruh card */}
      <div
        className="absolute inset-0 z-[8] pointer-events-none opacity-30 mix-blend-overlay"
        aria-hidden="true"
      >
        <div className="w-full h-full halftone-overlay-sm" />
      </div>

      {/* ===== TOP LEFT BADGE — Identity Label Swap ===== */}
      <div className="absolute top-4 left-4 z-[10] overflow-hidden h-[38px]">
        {/* IDLE state badge: SPIDER-MAN */}
        <div className="identity-label label-idle">
          <span className="inline-block bg-spider-red comic-chip text-comic-ink px-3 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase">
            Spider-Man
          </span>
        </div>
        {/* REVEAL state badge: FERREL */}
        <div className="identity-label label-active">
          <span className="inline-block bg-spider-blue comic-chip text-comic-ink px-3 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase">
            Ferrel Rashad
          </span>
        </div>
      </div>

      {/* ===== BOTTOM RIGHT BADGE — Classified / Revealed ===== */}
      <div className="absolute bottom-4 right-4 z-[10] overflow-hidden h-[38px]">
        {/* IDLE: CLASSIFIED */}
        <div className="identity-label label-idle">
          <span className="inline-block bg-spider-yellow comic-chip text-spider-black px-3 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase blink-soft">
            Classified
          </span>
        </div>
        {/* REVEAL: IDENTITY REVEALED */}
        <div className="identity-label label-active">
          <span className="inline-block bg-comic-ink comic-chip text-spider-black px-3 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase">
            Identity Revealed
          </span>
        </div>
      </div>

      {/* ===== INSTRUCTION TEXT BELOW BADGE ===== */}
      <div className="absolute bottom-4 left-4 z-[10]">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-comic-ink/80 comic-stroke-thin">
          [ Hover / Tap to Unmask ]
        </p>
      </div>

      {/* Mobile force-reveal CSS: jika state revealed=true, pakai style inline override */}
      {revealed && (
        <style>{`
          .force-reveal .suit-piece-tl { transform: translate(-25%, -25%) rotate(-10deg); opacity: 0.2 !important; }
          .force-reveal .suit-piece-tr { transform: translate(25%, -25%) rotate(10deg); opacity: 0.2 !important; }
          .force-reveal .suit-piece-bl { transform: translate(-25%, 25%) rotate(10deg); opacity: 0.2 !important; }
          .force-reveal .suit-piece-br { transform: translate(25%, 25%) rotate(-10deg); opacity: 0.2 !important; }
          .force-reveal .identity-slash { opacity: 1; transform: translateX(100%) !important; }
          .force-reveal .label-idle { opacity: 0; transform: translateY(-12px) !important; }
          .force-reveal .label-active { opacity: 1; transform: translateY(-100%) !important; }
          .force-reveal .identity-glow-ring { opacity: 1 !important; }
        `}</style>
      )}
    </div>
  );
};

const About = () => {
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
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background halftone panel texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full halftone-overlay" />
      </div>

      {/* Red & blue corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 90% 20%, rgba(255,30,38,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 30% at 10% 80%, rgba(22,93,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER — No eyebrow (hero only punya eyebrow) */}
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-5 tracking-tighter uppercase">
            Beyond The{" "}
            <span className="text-spider-red comic-stroke drop-shadow-[3px_3px_0_var(--color-ink-stroke)]">
              Mask
            </span>
          </h2>
          <p className="text-comic-ink/50 max-w-md mx-auto font-medium text-sm sm:text-base">
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
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.18em] uppercase text-comic-ink/60">
              <span className="w-2 h-2 bg-spider-red comic-chip" />
              <span>Secret Identity Protocol — SHIELD Class A</span>
              <span className="w-2 h-2 bg-spider-blue comic-chip" />
            </div>
          </motion.div>

          {/* RIGHT — ORIGIN STORY TEXT */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            {/* Real Name chip */}
            <div>
              <span className="inline-block bg-spider-blue comic-chip text-comic-ink px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase mb-5 sm:mb-6 pop-shadow-sm">
                Real Name - Ferrel Rashad Akeyla
              </span>
            </div>

            {/* Comic Caption Box */}
            <div className="comic-caption p-5 sm:p-7 rounded-sm">
              <p className="text-sm sm:text-lg text-comic-ink/85 mb-4 sm:mb-5 leading-relaxed font-medium">
                Hi! I&apos;m <strong className="text-spider-yellow">Ferrel Rashad Akeyla</strong>,
                a multidisciplinary digital creator based in Indonesia. With expertise spanning{" "}
                <strong className="text-spider-red">
                  Full Stack Web Development, Video Editing, 3D Modeling, and Game Development
                </strong>
                , I deliver creative solutions that blend visual aesthetics with technical excellence.
              </p>
              <p className="text-sm sm:text-lg text-comic-ink/85 leading-relaxed font-medium">
                I believe every project is an opportunity to create unique and immersive experiences,
                whether through responsive web applications, cinematic video storytelling,
                detailed 3D models, or interactive gaming worlds.
              </p>
            </div>

            {/* Small signature banner */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 bg-spider-yellow comic-chip text-spider-black px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase">
                Alignment — Hero
              </span>
              <span className="inline-flex items-center gap-2 bg-comic-panel comic-chip text-comic-ink px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase">
                Sector — West Java, Indonesia
              </span>
              <span className="inline-flex items-center gap-2 bg-spider-red comic-chip text-comic-ink px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase">
                Status — Available
              </span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: POWER STATS (3 Comic Stat Blocks) */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`comic-panel p-5 sm:p-7 md:p-8 relative overflow-hidden border-t-4 ${stat.accent}`}
              style={{ borderRadius: "2px" }}
            >
              {/* Small spider icon corner */}
              <div className="absolute top-3 right-3 text-spider-red/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 5v2M12 17v2M5 12h2M17 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              {/* Halftone pattern bg inside card */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-full h-full halftone-overlay-sm" />
              </div>
              <p className="relative text-4xl sm:text-5xl font-black text-spider-yellow comic-stroke-thin mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="relative text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-comic-ink/70">
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
