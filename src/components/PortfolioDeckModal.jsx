"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  ChevronLeft,
  ChevronRight,
  Code2,
  Gamepad2,
  Video,
  Github,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { soundFX } from "../lib/soundFx";

import ferrelPortrait from "../assets/ferrel-portrait.jpg";
import fersyaShop from "../assets/fersya-shop.webp";
import studentLife from "../assets/student-life.png";
import finesserShop from "../assets/Shop.webp";
import stockPrediction from "../assets/stock-prediction.png";
import streetRush from "../assets/street-rush.webp";
import gunungGede from "../assets/image-1784710274754.webp";


const SLIDES = [
  {
    id: 1,
    category: "EXECUTIVE BRIEF",
    title: "Ferrel Rashad Akeyla",
    subtitle: "Full-Stack Web Developer · Quant ML Builder · Creative Technologist",
    tagline: "Bridging modern web architectures, quantitative intelligence, and immersive digital experiences.",
    type: "cover",
  },
  {
    id: 2,
    category: "01 // CORE ARSENAL",
    title: "Technical Capabilities & Stack",
    subtitle: "End-to-end engineering from reactive frontends & ML pipelines to robust backends & 3D systems.",
    type: "skills",
  },
  {
    id: 3,
    category: "02 // FEATURED SYSTEMS",
    title: "Featured Web & Quant Systems",
    subtitle: "Production-ready platforms built for performance, business impact, and zero-latency UX.",
    type: "web-projects",
  },
  {
    id: 4,
    category: "03 // INTERACTIVE & 3D",
    title: "Game Systems & Multimedia",
    subtitle: "Real-time physics engines, simulation worlds, and high-impact motion media.",
    type: "game-projects",
  },
  {
    id: 5,
    category: "04 // CONTACT & DISPATCH",
    title: "Let's Build Something Great",
    subtitle: "Available for full-stack engineering roles, freelance software development, and client collaborations.",
    type: "contact",
  },
];

const PortfolioDeckModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % SLIDES.length;
      soundFX.playBeep(450 + next * 30);
      return next;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev - 1 + SLIDES.length) % SLIDES.length;
      soundFX.playBeep(420 + next * 30);
      return next;
    });
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    soundFX.playBeep(450 + index * 30);
  };

  const handlePrint = () => {
    soundFX.playBeep(600);
    window.print();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextSlide, prevSlide, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* MODAL WRAPPER */}
      <div
        className="fixed inset-0 z-[9990] bg-[#0A0B0E]/95 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 md:p-6 overflow-hidden select-none"
        onClick={onClose}
      >
        {/* TOP BAR / CONTROLS (Hidden during print) */}
        <div
          className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 py-2 px-3 sm:px-4 bg-comic-panel border-2 border-spider-black comic-chip text-comic-ink z-20 shrink-0 print:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-3 h-3 bg-spider-red rounded-full animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-spider-yellow">
                PITCH DECK // SLIDE {currentSlide + 1} OF {SLIDES.length}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-comic-ink/70">
                {SLIDES[currentSlide].title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Instant Download PDF Link */}
            <a
              href={`${import.meta.env.BASE_URL}Ferrel_Rashad_Portfolio_Deck.pdf`}
              download="Ferrel_Rashad_Portfolio_Deck.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playBeep(600)}
              className="flex items-center gap-1.5 bg-spider-yellow hover:bg-white text-spider-black px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider comic-chip transition-all shadow-[2px_2px_0_#000] cursor-pointer"
              title="Download High-Res Landscape PDF Presentation Deck directly"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>

            {/* Quick Print Button */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 bg-comic-surface hover:bg-spider-red hover:text-white text-comic-ink px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider comic-chip transition-all border border-comic-ink/20"
              title="Print Dialog"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 bg-comic-surface hover:bg-spider-yellow hover:text-spider-black text-comic-ink comic-chip border border-comic-ink/30 transition-colors"
              aria-label="Close deck modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* MAIN SLIDE VIEW CONTAINER (Screen View) */}
        <div
          className="flex-1 flex items-center justify-center p-1 sm:p-3 max-w-6xl mx-auto w-full my-auto overflow-hidden print:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.97, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.97, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full aspect-[16/9] max-h-[75vh] bg-[#EDEAE2] border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden relative flex flex-col p-5 sm:p-8 md:p-10 justify-between text-comic-ink"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(211,31,31,0.06) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(22,93,255,0.05) 0%, transparent 40%)",
            }}
          >
            {/* Slide Halftone Background Accent */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* Slide Header Tag */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-comic-ink/20 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-spider-yellow text-spider-black px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest comic-chip">
                  {SLIDES[currentSlide].category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-comic-ink/50 uppercase tracking-wider hidden sm:inline">
                  CONFIDENTIAL EXECUTIVE DOSSIER
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black text-spider-red">
                0{currentSlide + 1} / 0{SLIDES.length}
              </span>
            </div>

            {/* Slide Dynamic Body Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-2 sm:my-4 overflow-y-auto">
              {renderSlideContent(SLIDES[currentSlide])}
            </div>

            <div className="relative z-10 flex items-center justify-between border-t-2 border-comic-ink/20 pt-2 text-[9px] sm:text-[11px] font-bold text-comic-ink/50">
              <div className="flex items-center gap-2">
                <span className="text-spider-red">★</span>
                <span>Ferrel Rashad Akeyla — Digital Portfolio Deck</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">West Java, Indonesia</span>
                <span className="text-spider-red font-black">2026 EDITION</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM NAVIGATION BAR (Hidden during print) */}
        <div
          className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 py-2 px-4 bg-comic-panel border-2 border-spider-black comic-chip text-comic-ink z-20 shrink-0 print:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="flex items-center gap-1.5 bg-comic-surface hover:bg-spider-yellow hover:text-spider-black px-3 sm:px-4 py-1.5 text-xs font-black uppercase tracking-wider comic-chip transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Indicator Dots / Thumbnails */}
          <div className="flex items-center gap-2 sm:gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`transition-all ${
                  idx === currentSlide
                    ? "w-7 sm:w-9 h-2.5 bg-spider-yellow border-2 border-spider-black comic-chip"
                    : "w-2.5 h-2.5 bg-comic-ink/30 hover:bg-comic-ink/60 rounded-full"
                }`}
                title={`Slide ${idx + 1}: ${s.title}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="flex items-center gap-1.5 bg-spider-yellow text-spider-black hover:bg-spider-red hover:text-white px-3 sm:px-4 py-1.5 text-xs font-black uppercase tracking-wider comic-chip transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* =========================================================================
            DEDICATED FULL PRINT & AUTO-DOWNLOAD DECK CONTAINER
            - Offscreen in normal viewport for instant capturing
            - Block & full-size in @media print
           ========================================================================= */}
        <div
          id="pdf-deck-export-source"
          className="fixed -left-[9999px] top-0 w-[1200px] z-[-100] pointer-events-none opacity-100 print:opacity-100 print:pointer-events-auto print:static print:left-auto print:w-full print:h-auto print-deck-root"
        >
          {SLIDES.map((slide, index) => (
            <div
              key={`print-slide-${slide.id}`}
              className="pdf-slide-break print-slide-page w-[1200px] h-[675px] print:w-[100vw] print:h-[100vh] p-8 box-border flex flex-col justify-between bg-[#EDEAE2] text-[#1A1A1A] relative"
              style={{
                pageBreakAfter: "always",
                breakAfter: "page",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
                backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/20 pb-2.5">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFD500] text-[#1A1A1A] px-3 py-0.5 text-xs font-black uppercase tracking-widest rounded-sm border-2 border-[#1A1A1A]">
                    {slide.category}
                  </span>
                  <span className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
                    MISSION BRIEF & PORTFOLIO DECK
                  </span>
                </div>
                <span className="text-sm font-black text-[#D31F1F]">
                  0{index + 1} / 0{SLIDES.length}
                </span>
              </div>

              {/* Main Slide Content */}
              <div className="flex-1 flex flex-col justify-center my-4">
                {renderSlideContent(slide)}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t-2 border-[#1A1A1A]/20 pt-2.5 text-xs font-bold text-[#1A1A1A]/60">
                <span>Ferrel Rashad Akeyla — Digital Portfolio Pitch Deck</span>
                <span>West Java, Indonesia | 2026 Edition</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

/* =========================================================================
   HELPER: RENDER SLIDE CONTENT BY TYPE (OPTIMIZED FOR RECRUITERS & CLIENTS)
   ========================================================================= */
function renderSlideContent(slide) {
  switch (slide.type) {
    case "cover":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
            <div className="inline-flex items-center gap-2 bg-spider-red text-white px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              <span className="w-2 h-2 rounded-full bg-spider-yellow animate-ping" />
              EXECUTIVE DOSSIER & PROFILE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-comic-ink comic-stroke-thin leading-none">
              FERREL RASHAD <span className="text-spider-red">AKEYLA</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-spider-red tracking-wide">
              Full-Stack Web Developer · Quant ML Builder · Creative Technologist
            </p>
            <p className="text-xs sm:text-sm text-comic-ink/85 max-w-2xl leading-relaxed">
              Transforming ambitious product ideas into high-converting web applications, automated business backoffices, and intelligent data systems. Proven record delivering full-stack software across React/Next.js, Laravel/Filament, Python/ML, and interactive 3D engines.
            </p>

            {/* Strategic Value Pillars */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-red uppercase">01 // High Performance</div>
                <div className="text-[10px] text-comic-ink/80 font-medium">60 FPS reactive UI & optimized server architecture</div>
              </div>
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-blue uppercase">02 // Production Ready</div>
                <div className="text-[10px] text-comic-ink/80 font-medium">End-to-end admin portals, webhooks & ML pipelines</div>
              </div>
            </div>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] sm:text-xs font-bold">
              <span className="bg-comic-surface border border-comic-ink/20 px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-[1px_1px_0_#000]">
                <Mail size={12} className="text-spider-red" />
                <span>ferrelrashadakeyla2014@gmail.com</span>
              </span>
              <span className="bg-comic-surface border border-comic-ink/20 px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-[1px_1px_0_#000]">
                <Github size={12} className="text-spider-blue" />
                <span>github.com/FerrelHD</span>
              </span>
              <span className="bg-comic-surface border border-comic-ink/20 px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-[1px_1px_0_#000]">
                <MapPin size={12} className="text-spider-red" />
                <span>West Java, Indonesia</span>
              </span>
            </div>
          </div>

          {/* Right Column: Profile & Status Card */}
          <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center select-none">
            <div className="bg-[#FEFAE8] text-[#212121] border-[3.5px] border-[#212121] rounded-2xl p-3.5 shadow-[6px_6px_0_#212121] w-full max-w-[290px]">
              {/* Header: Avatar + User Info */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-11 h-11 rounded-full border-2 border-[#212121] bg-[#165DFF] overflow-hidden shrink-0 shadow-[2px_2px_0_#000]">
                  <img
                    src={ferrelPortrait}
                    alt="Ferrel Avatar"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>
                <div>
                  <span className="inline-block bg-spider-yellow text-spider-black text-[11px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                    Ferrel Rashad
                  </span>
                  <div className="font-mono text-[9.5px] font-bold text-[#212121]/80 tracking-wider mt-0.5">
                    @FerrelHD • Spider-Dev
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="relative w-full h-22 rounded-lg border-2 border-[#212121] bg-[#165DFF] overflow-hidden shadow-[2px_2px_0_#000] mb-2 flex flex-col items-center justify-center p-2 text-center">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,rgba(0,0,0,0.35)_1.5px,transparent_1.5px)] bg-[size:8px_8px] pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 bg-spider-red text-white text-[8px] font-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000] rounded-xs uppercase">
                  OPEN ⚡
                </div>
                <div className="relative z-10">
                  <span className="bg-[#0D0D11] text-spider-yellow text-[8px] font-black px-2 py-0.5 border border-black rounded-xs uppercase tracking-widest inline-block mb-1">
                    STATUS: AVAILABLE FOR HIRE
                  </span>
                  <div className="text-[11px] font-black text-white uppercase tracking-wider text-shadow">
                    FULL-STACK / FREELANCE / ROLES
                  </div>
                </div>
              </div>

              {/* Pitch Highlight Box */}
              <div className="bg-[#EDEAE2] border-2 border-[#212121] rounded-lg p-2 text-[9.5px] font-extrabold text-[#212121] leading-tight mb-2 shadow-[1.5px_1.5px_0_#000]">
                <span className="text-spider-red font-black">EXECUTIVE SUMMARY:</span> Ready to architect responsive web apps, automated Laravel backoffices & applied machine learning dashboards.
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-1 text-[8px] font-black uppercase text-center">
                <div className="bg-spider-yellow text-spider-black py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  5+ SHIPPED
                </div>
                <div className="bg-white text-spider-black py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  60 FPS UX
                </div>
                <div className="bg-spider-red text-white py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  FULL-STACK
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "skills":
      return (
        <div className="space-y-3">
          <div className="mb-1">
            <div className="inline-block bg-spider-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0_#000] mb-1">
              CHAPTER 01 // CORE COMPETENCIES
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Technical Arsenal & Business Value Streams
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/75">
              Production-tested tech stacks curated for rapid delivery, high performance, and measurable business ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Column 1: Frontend Architecture */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between relative border-t-4 border-t-spider-yellow shadow-[2px_2px_0_#000]">
              <div className="absolute -top-2.5 right-2 bg-spider-yellow text-black font-black text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                SPEED
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-spider-red font-black text-xs uppercase tracking-wider mb-2">
                  <Code2 size={16} />
                  <span>Frontend Architecture</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> React 19 & Next.js</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> TypeScript / Modern JS</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Tailwind CSS v4 & Vite</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Framer Motion & GSAP</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-red">
                → Ultra-fast, high-converting UX with 60 FPS animations.
              </div>
            </div>

            {/* Column 2: Backend & Backoffice */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between relative border-t-4 border-t-spider-blue shadow-[2px_2px_0_#000]">
              <div className="absolute -top-2.5 right-2 bg-spider-blue text-white font-black text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                ROBUST
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-spider-blue font-black text-xs uppercase tracking-wider mb-2">
                  <Cpu size={16} />
                  <span>Backend & Backoffice</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Laravel 11 & PHP</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Filament 3 Admin Panels</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Supabase & PostgreSQL</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> REST APIs & Webhooks</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-blue">
                → Automated operations, secure auth & admin suites.
              </div>
            </div>

            {/* Column 3: Applied ML & Quant Analytics */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between relative border-t-4 border-t-spider-red shadow-[2px_2px_0_#000]">
              <div className="absolute -top-2.5 right-2 bg-spider-red text-white font-black text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                DATA ML
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-spider-red font-black text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck size={16} />
                  <span>Applied ML & Quant</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Python & Streamlit Apps</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> XGBoost & LightGBM</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Time-Series & Backtesting</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Plotly Interactive Dashboards</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-red">
                → Zero-leakage data modeling & actionable intelligence.
              </div>
            </div>

            {/* Column 4: 3D Systems & Multimedia */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between relative border-t-4 border-t-emerald-600 shadow-[2px_2px_0_#000]">
              <div className="absolute -top-2.5 right-2 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                MEDIA
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                  <Gamepad2 size={16} />
                  <span>3D Games & Multimedia</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Unity 3D & C# Scripting</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Roblox Studio & Luau</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Vegas Pro 18 Video Editing</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Figma UI/UX Design</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-emerald-700">
                → Gamified products, 60 FPS physics & motion media.
              </div>
            </div>
          </div>
        </div>
      );

    case "web-projects":
      return (
        <div className="space-y-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
                Featured Web & Analytics Systems
              </h2>
              <p className="text-[11px] sm:text-xs text-comic-ink/75">
                Structured case studies demonstrating end-to-end full-stack development, quantitative algorithms, and automated backoffices.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase bg-spider-yellow text-black px-2 py-0.5 border border-black">
              STAR CASE STUDIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            {/* Project 1: Stock Prediction System */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={stockPrediction}
                    alt="Stock Prediction System Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-red text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Quant ML
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Python / Streamlit</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Stock ML Analytics
                </h3>
                <div className="text-[9px] text-comic-ink/80 leading-tight space-y-1 mb-1.5">
                  <p><strong>Goal:</strong> Zero-leakage market direction forecasting & friction-adjusted backtesting.</p>
                  <p><strong>Solution:</strong> 20+ technical indicators, XGBoost/LightGBM, and fee simulation (0.15%).</p>
                </div>
                <div className="text-[9px] font-bold text-spider-red flex items-center gap-1">
                  <CheckCircle2 size={11} className="shrink-0" />
                  <span className="truncate">Walk-forward validation & Sharpe metrics.</span>
                </div>
              </div>
              <div className="pt-1 border-t border-comic-ink/10 flex items-center gap-1 flex-wrap mt-1">
                <span className="text-[7.5px] font-black uppercase bg-spider-yellow text-black px-1 py-0.2 rounded-xs border border-black">Python</span>
                <span className="text-[7.5px] font-black uppercase bg-[#FF4B4B] text-white px-1 py-0.2 rounded-xs border border-black">Streamlit</span>
                <span className="text-[7.5px] font-black uppercase bg-spider-blue text-white px-1 py-0.2 rounded-xs border border-black">XGBoost</span>
              </div>
            </div>

            {/* Project 2: Fersya Shop */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={fersyaShop}
                    alt="Fersya Shop Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-blue text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    E-Commerce
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Laravel 11</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Fersya Shop & Admin
                </h3>
                <div className="text-[9px] text-comic-ink/80 leading-tight space-y-1 mb-1.5">
                  <p><strong>Goal:</strong> Modern organic food storefront with streamlined non-tech admin controls.</p>
                  <p><strong>Solution:</strong> Modular Laravel 11 platform with Filament 3 backend for live stock & orders.</p>
                </div>
                <div className="text-[9px] font-bold text-spider-blue flex items-center gap-1">
                  <CheckCircle2 size={11} className="shrink-0" />
                  <span className="truncate">Automated inventory & mobile checkout.</span>
                </div>
              </div>
              <div className="pt-1 border-t border-comic-ink/10 flex items-center gap-1 flex-wrap mt-1">
                <span className="text-[7.5px] font-black uppercase bg-spider-red text-white px-1 py-0.2 rounded-xs border border-black">Laravel 11</span>
                <span className="text-[7.5px] font-black uppercase bg-spider-yellow text-black px-1 py-0.2 rounded-xs border border-black">Filament 3</span>
                <span className="text-[7.5px] font-black uppercase bg-spider-blue text-white px-1 py-0.2 rounded-xs border border-black">Tailwind</span>
              </div>
            </div>

            {/* Project 3: Student Life */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={studentLife}
                    alt="Student Life Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-emerald-600 text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Productivity SaaS
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">React 19</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Student Life App
                </h3>
                <div className="text-[9px] text-comic-ink/80 leading-tight space-y-1 mb-1.5">
                  <p><strong>Goal:</strong> Academic task planner with real-time multi-device cloud synchronization.</p>
                  <p><strong>Solution:</strong> Type-safe React 19 architecture with Supabase Auth, PostgreSQL & daily calendar.</p>
                </div>
                <div className="text-[9px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={11} className="shrink-0" />
                  <span className="truncate">Zero-latency state sync & clean UX.</span>
                </div>
              </div>
              <div className="pt-1 border-t border-comic-ink/10 flex items-center gap-1 flex-wrap mt-1">
                <span className="text-[7.5px] font-black uppercase bg-[#00D8FF] text-black px-1 py-0.2 rounded-xs border border-black">React 19</span>
                <span className="text-[7.5px] font-black uppercase bg-[#3178C6] text-white px-1 py-0.2 rounded-xs border border-black">TypeScript</span>
                <span className="text-[7.5px] font-black uppercase bg-[#10B981] text-white px-1 py-0.2 rounded-xs border border-black">Supabase</span>
              </div>
            </div>

            {/* Project 4: Spider-Dev Portfolio Platform */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={finesserShop}
                    alt="Spider-Dev Portfolio Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-yellow text-black px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Interactive Web
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Creative Tech</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Spider-Dev Platform
                </h3>
                <div className="text-[9px] text-comic-ink/80 leading-tight space-y-1 mb-1.5">
                  <p><strong>Goal:</strong> High-impact developer portfolio showcasing creative and technical excellence.</p>
                  <p><strong>Solution:</strong> GSAP ScrollTrigger 60 FPS parallax, procedural Web Audio sound, & recruiter modes.</p>
                </div>
                <div className="text-[9px] font-bold text-spider-red flex items-center gap-1">
                  <CheckCircle2 size={11} className="shrink-0" />
                  <span className="truncate">Hardware-accelerated web performance.</span>
                </div>
              </div>
              <div className="pt-1 border-t border-comic-ink/10 flex items-center gap-1 flex-wrap mt-1">
                <span className="text-[7.5px] font-black uppercase bg-spider-red text-white px-1 py-0.2 rounded-xs border border-black">React 19</span>
                <span className="text-[7.5px] font-black uppercase bg-spider-yellow text-black px-1 py-0.2 rounded-xs border border-black">GSAP</span>
                <span className="text-[7.5px] font-black uppercase bg-spider-blue text-white px-1 py-0.2 rounded-xs border border-black">Web Audio</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "game-projects":
      return (
        <div className="space-y-2.5">
          <div className="mb-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Interactive 3D Game Systems & Multimedia
            </h2>
            <p className="text-[11px] sm:text-xs text-comic-ink/75">
              Real-time physics engines, terrain simulation worlds, and precision audio-visual motion media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Item 1: Street Rush */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={streetRush}
                    alt="Street Rush Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-red text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Unity 3D Engine
                  </span>
                  <span className="text-[9px] font-mono font-bold text-comic-ink/60">C# Physics</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-red mb-0.5">
                  Street Rush (Mobile 3D)
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed">
                  Fast-paced 3D arcade runner with custom rigidbodies, dynamic obstacle spawner algorithms, and steady 60 FPS mobile performance.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-red shrink-0 mt-0.5" />
                    <span>Optimized collision matrices & memory management.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-white text-black px-1.5 py-0.5 rounded-xs border border-black">Unity Engine</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-blue text-white px-1.5 py-0.5 rounded-xs border border-black">C# Scripts</span>
                <span className="text-[8.5px] font-black uppercase bg-emerald-500 text-black px-1.5 py-0.5 rounded-xs border border-black">60 FPS</span>
              </div>
            </div>

            {/* Item 2: Gunung Gede Simulation */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={gunungGede}
                    alt="Gunung Gede Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-blue text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Roblox Simulation
                  </span>
                  <span className="text-[9px] font-mono font-bold text-comic-ink/60">Luau Code</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-red mb-0.5">
                  Gunung Gede Trail (3D)
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed">
                  Immersive 3D hiking simulation recreating Mount Gede's Gunung Putri trail with accurate elevation terrain and lighting cycles.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-red shrink-0 mt-0.5" />
                    <span>Realistic terrain physics & stamina mechanics.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-spider-blue text-white px-1.5 py-0.5 rounded-xs border border-black">Roblox Studio</span>
                <span className="text-[8.5px] font-black uppercase bg-sky-400 text-black px-1.5 py-0.5 rounded-xs border border-black">Luau Scripts</span>
                <span className="text-[8.5px] font-black uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded-xs border border-black">3D Terrain</span>
              </div>
            </div>

            {/* Item 3: Cinematic Video Production */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src="https://img.youtube.com/vi/WMrnRucy0qs/maxresdefault.jpg"
                    alt="Cinematic AMV Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Video & Motion
                  </span>
                  <span className="text-[9px] font-mono font-bold text-comic-ink/60">Vegas Pro 18</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-red mb-0.5">
                  Cinematic Motion & AMVs
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed">
                  High-tempo video edits featuring frame-accurate audio-visual beat sync, rhythm transitions, and stylized color grading.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-red shrink-0 mt-0.5" />
                    <span>Microsecond beat synchronization & speed ramping.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-emerald-600 text-white px-1.5 py-0.5 rounded-xs border border-black">Vegas Pro 18</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-red text-white px-1.5 py-0.5 rounded-xs border border-black">Beat Sync</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-yellow text-black px-1.5 py-0.5 rounded-xs border border-black">Color Grade</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
            <div className="inline-block bg-spider-yellow text-spider-black px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              COLLABORATION & DISPATCH
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-comic-ink tracking-tight leading-tight">
              Ready to Build Something <span className="text-spider-red">Extraordinary</span>?
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/85 leading-relaxed">
              Whether you need a dedicated Full-Stack Web Developer, a Quantitative/ML Builder, or a Creative Technical Partner, I deliver clean architecture and high-converting products on schedule.
            </p>

            {/* Why Hire Ferrel Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-red uppercase">⚡ High Velocity & Ownership</div>
                <div className="text-[10px] text-comic-ink/80">From wireframe & Figma to production backend & deployment.</div>
              </div>
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-blue uppercase">🛡️ Clean, Modern Code</div>
                <div className="text-[10px] text-comic-ink/80">Maintainable React 19, TypeScript, Laravel 11 & Python.</div>
              </div>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold text-comic-ink">
                <div className="w-6 h-6 bg-spider-yellow text-spider-black flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">
                  @
                </div>
                <span>ferrelrashadakeyla2014@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-comic-ink">
                <div className="w-6 h-6 bg-spider-blue text-white flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">
                  GH
                </div>
                <span>github.com/FerrelHD</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-comic-ink">
                <div className="w-6 h-6 bg-spider-red text-white flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">
                  IN
                </div>
                <span>linkedin.com/in/ferrel-rashad-8a165514b/</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-comic-surface border-4 border-spider-black p-4 sm:p-5 comic-chip space-y-2.5 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-2 text-spider-red font-black text-xs uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Status: Open for New Missions</span>
            </div>
            <div className="space-y-1.5 text-xs font-bold text-comic-ink/85">
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span className="text-comic-ink/60">Target Roles:</span>
                <span className="text-spider-red">Full-Stack / Frontend / ML</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span className="text-comic-ink/60">Engagement:</span>
                <span className="text-comic-ink">Full-Time / Contract / Freelance</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span className="text-comic-ink/60">Work Model:</span>
                <span className="text-comic-ink">Remote / Hybrid / On-site</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span className="text-comic-ink/60">Timezone:</span>
                <span className="text-comic-ink">WIB (UTC+7) · Flexible Overlap</span>
              </div>
            </div>
            <div className="pt-1.5 text-center bg-[#FFD500] border-2 border-black p-1.5 rounded-sm shadow-[1px_1px_0_#000]">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">
                ⚡ 24-HOUR RESPONSE GUARANTEE
              </span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default PortfolioDeckModal;
