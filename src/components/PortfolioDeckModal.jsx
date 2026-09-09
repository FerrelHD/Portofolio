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
import robloxSentiment from "../assets/roblox-sentiment-analysis.webp";
import streetRush from "../assets/street-rush.webp";
import gunungGede from "../assets/image-1784710274754.webp";
import seismicTracker from "../assets/nusantar-seismic-tracker.webp";
import leclercPreview from "../assets/leclerc-preview.webp";
import spideyDevPortfolio from "../assets/spidey-dev-portfolio.webp";

const SLIDES = [
  {
    id: 1,
    category: "CANDIDATE DOSSIER",
    title: "Ferrel Rashad Akeyla",
    subtitle: "Software Engineer · Creative Technologist · Product Explorer",
    tagline: "Building intuitive interfaces and data-driven solutions rooted in real-world human impact.",
    type: "cover",
  },
  {
    id: 2,
    category: "01 // CORE COMPETENCIES",
    title: "Technical Craft & Creative Foundations",
    subtitle: "Bridging human-centered interaction design with scalable frontend architecture and applied machine learning.",
    type: "skills",
  },
  {
    id: 3,
    category: "02 // FLAGSHIP CASE STUDIES",
    title: "Impact-Driven & Data Telemetry Systems",
    subtitle: "Real-time natural disaster tracking and data-driven community sentiment analysis.",
    type: "flagship-cases",
  },
  {
    id: 4,
    category: "03 // INTERACTIVE EXPERIENCES",
    title: "Immersive 3D Environments & Web Ecosystems",
    subtitle: "Exploring performant graphics, spatial simulations, and scalable web solutions.",
    type: "interactive-systems",
  },
  {
    id: 5,
    category: "04 // ASPIRATION & JOURNEY",
    title: "Why Apple Developer Academy?",
    subtitle: "Harnessing the intersection of technology, design, and collaborative problem-solving to build for iOS.",
    type: "academy-aspiration",
  },
];

const PortfolioDeckModal = ({ isOpen, onClose, isPrintOnly = false }) => {
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
    if (!isOpen || isPrintOnly) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPrintOnly, nextSlide, prevSlide, onClose]);

  if (!isOpen && !isPrintOnly) return null;

  if (isPrintOnly) {
    return (
      <div id="pdf-deck-standalone" className="w-[1200px] mx-auto bg-[#EDEAE2] text-[#1A1A1A] print-deck-root">
        {SLIDES.map((slide, index) => (
          <div
            key={`standalone-slide-${slide.id}`}
            className="print-slide-page w-[1200px] h-[675px] p-8 box-border flex flex-col justify-between bg-[#EDEAE2] text-[#1A1A1A] relative"
            style={{
              pageBreakAfter: index === SLIDES.length - 1 ? "avoid" : "always",
              breakAfter: index === SLIDES.length - 1 ? "avoid" : "page",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/20 pb-2.5">
              <div className="flex items-center gap-3">
                <span className="bg-[#FFD500] text-[#1A1A1A] px-3 py-0.5 text-xs font-black uppercase tracking-widest rounded-sm border-2 border-[#1A1A1A]">
                  {slide.category}
                </span>
                <span className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
                  ACADEMY ADMISSION &amp; PORTFOLIO DECK
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
              <span>Ferrel Rashad Akeyla — Digital Portfolio Deck</span>
              <span>Depok, West Java, Indonesia | 2026 Edition</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {/* MODAL WRAPPER */}
      <div
        className="fixed inset-0 z-[9990] bg-[#0A0B0E]/95 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 md:p-6 overflow-hidden select-none modal-wrapper-deck print:static print:p-0 print:m-0 print:overflow-visible print:bg-transparent"
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
                ACADEMY PORTFOLIO // SLIDE {currentSlide + 1} OF {SLIDES.length}
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
            {currentSlide < 3 && (
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
            )}

            {/* Slide Header Tag */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-comic-ink/20 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-spider-yellow text-spider-black px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest comic-chip">
                  {SLIDES[currentSlide].category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-comic-ink/50 uppercase tracking-wider hidden sm:inline">
                  APPLE DEVELOPER ACADEMY CANDIDATE DOSSIER
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
                <span>Ferrel Rashad Akeyla — Academy Portfolio Deck</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Depok, West Java, Indonesia</span>
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

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 sm:gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`transition-all ${idx === currentSlide
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

        {/* DEDICATED FULL PRINT & AUTO-DOWNLOAD DECK CONTAINER */}
        <div
          id="pdf-deck-export-source"
          className="fixed -left-[9999px] top-0 w-[1200px] z-[-100] pointer-events-none opacity-100 print:opacity-100 print:pointer-events-auto print:static print:left-auto print:w-full print:h-auto print-deck-root"
        >
          {SLIDES.map((slide, index) => (
            <div
              key={`print-slide-${slide.id}`}
              className="pdf-slide-break print-slide-page w-[1200px] h-[675px] print:w-[100vw] print:h-[100vh] p-8 box-border flex flex-col justify-between bg-[#EDEAE2] text-[#1A1A1A] relative"
              style={{
                pageBreakAfter: index === SLIDES.length - 1 ? "avoid" : "always",
                breakAfter: index === SLIDES.length - 1 ? "avoid" : "page",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
                backgroundImage: "none",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/20 pb-2.5">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFD500] text-[#1A1A1A] px-3 py-0.5 text-xs font-black uppercase tracking-widest rounded-sm border-2 border-[#1A1A1A]">
                    {slide.category}
                  </span>
                  <span className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
                    ACADEMY ADMISSION &amp; PORTFOLIO DECK
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
                <span>Ferrel Rashad Akeyla — Academy Portfolio Deck</span>
                <span>Depok, West Java, Indonesia | 2026 Edition</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

/* =========================================================================
   HELPER: RENDER SLIDE CONTENT BY TYPE (ALIGNED WITH APPLE ACADEMY VALUES)
   ========================================================================= */
function renderSlideContent(slide) {
  switch (slide.type) {
    case "cover":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
            <div className="inline-flex items-center gap-2 bg-spider-red text-white px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              <span className="w-2 h-2 rounded-full bg-spider-yellow animate-ping" />
              APPLICANT DOSSIER &amp; PORTFOLIO
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-comic-ink comic-stroke-thin leading-none">
              FERREL RASHAD <span className="text-spider-red">AKEYLA</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-spider-red tracking-wide">
              Software Engineer · Creative Technologist · Product Explorer
            </p>
            <p className="text-xs sm:text-sm text-comic-ink/85 max-w-2xl leading-relaxed">
              Information Systems graduate with a passion for creative web development, high-performance visual computing, and applied AI. Dedicated to transforming complex data into humane, accessible, and meaningful digital tools.
            </p>

            {/* Strategic Value Pillars */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-red uppercase">01 // Human-Centered Impact</div>
                <div className="text-[10px] text-comic-ink/80 font-medium">Solving community problems through real-time open data and accessibility.</div>
              </div>
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-blue uppercase">02 // Technical Craftsmanship</div>
                <div className="text-[10px] text-comic-ink/80 font-medium">60 FPS vector rendering, deep learning NLP, and interactive state management.</div>
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
                <span>Depok, West Java, Indonesia</span>
              </span>
            </div>
          </div>

          {/* Right Column: Profile & Academy Readiness Card */}
          <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center select-none">
            <div className="bg-[#FEFAE8] text-[#212121] border-[3.5px] border-[#212121] rounded-2xl p-3.5 shadow-[6px_6px_0_#212121] w-full max-w-[290px]">
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
                    Gunadarma Univ. (GPA 3.69)
                  </div>
                </div>
              </div>

              <div className="relative w-full h-20 rounded-lg border-2 border-[#212121] bg-[#165DFF] overflow-hidden shadow-[2px_2px_0_#000] mb-2 flex flex-col items-center justify-center p-2 text-center">
                <div className="absolute top-1.5 right-1.5 bg-spider-red text-white text-[8px] font-black px-1.5 py-0.5 border border-black rounded-xs uppercase">
                  ACADEMY 2026
                </div>
                <div className="relative z-10">
                  <span className="bg-[#0D0D11] text-spider-yellow text-[8px] font-black px-2 py-0.5 border border-black rounded-xs uppercase tracking-widest inline-block mb-1">
                    FOCUS DOMAIN
                  </span>
                  <div className="text-[11px] font-black text-white uppercase tracking-wider text-shadow">
                    TECH · DESIGN · COLLABORATION
                  </div>
                </div>
              </div>

              <div className="bg-[#EDEAE2] border-2 border-[#212121] rounded-lg p-2 text-[9.5px] font-extrabold text-[#212121] leading-tight mb-2 shadow-[1.5px_1.5px_0_#000]">
                <span className="text-spider-red font-black">MISSION STATEMENT:</span> Eager to merge rigorous engineering with Apple's human-interface ethos to craft purposeful iOS products.
              </div>

              <div className="grid grid-cols-3 gap-1 text-[8px] font-black uppercase text-center">
                <div className="bg-spider-yellow text-spider-black py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  CBL READY
                </div>
                <div className="bg-white text-spider-black py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  PEER MENTOR
                </div>
                <div className="bg-spider-red text-white py-1 border border-[#212121] shadow-[1px_1px_0_#000] rounded-xs">
                  SWIFT EAGER
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
              CHAPTER 01 // CAPABILITIES
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Technical Craftsmanship &amp; Creative Tooling
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/75">
              Disciplined foundations across system architecture, user interface design, and investigative research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Column 1: Frontend Architecture */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between border-t-4 border-t-spider-yellow shadow-[2px_2px_0_#000]">
              <div>
                <div className="flex items-center gap-1.5 text-spider-red font-black text-xs uppercase tracking-wider mb-2">
                  <Code2 size={16} />
                  <span>UI &amp; Interactions</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> React 19 &amp; Next.js</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> TypeScript / Modern JS</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> GSAP &amp; Framer Motion</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Fluid Scroll &amp; Micro-animations</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-red">
                → Fluid, accessible, and responsive user interfaces.
              </div>
            </div>

            {/* Column 2: Architecture & Data */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between border-t-4 border-t-spider-blue shadow-[2px_2px_0_#000]">
              <div>
                <div className="flex items-center gap-1.5 text-spider-blue font-black text-xs uppercase tracking-wider mb-2">
                  <Cpu size={16} />
                  <span>Architecture &amp; Data</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Supabase &amp; PostgreSQL</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> REST APIs &amp; Live Telemetry</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Laravel 11 Backend</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue font-bold">★</span> Haversine &amp; Geodesic Logic</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-blue">
                → Reliable pipelines connecting raw data to interface.
              </div>
            </div>

            {/* Column 3: Applied AI & Research */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between border-t-4 border-t-spider-red shadow-[2px_2px_0_#000]">
              <div>
                <div className="flex items-center gap-1.5 text-spider-red font-black text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck size={16} />
                  <span>Applied AI &amp; Research</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> IndoBERT &amp; Transformers</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Sentiment NLP Classification</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Python, Scikit-learn, PyTorch</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red font-bold">★</span> Streamlit Analytics Dashboards</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-red">
                → Extracting human insights and feedback patterns.
              </div>
            </div>

            {/* Column 4: Product & Teamwork */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between border-t-4 border-t-emerald-600 shadow-[2px_2px_0_#000]">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                  <Gamepad2 size={16} />
                  <span>Product &amp; Teamwork</span>
                </div>
                <ul className="space-y-1 text-[11px] text-comic-ink/85">
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Figma Prototyping &amp; Design</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> 3D Spatial Systems (Unity/Blender)</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Peer Mentoring &amp; Lab Tutoring</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-700 font-bold">★</span> Cross-Functional Collaboration</li>
                </ul>
              </div>
              <div className="mt-2.5 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-emerald-700">
                → Empathy for team dynamics and end-user clarity.
              </div>
            </div>
          </div>
        </div>
      );

    case "flagship-cases":
      return (
        <div className="space-y-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
                Flagship Case Studies: Challenge-Based Solutions
              </h2>
              <p className="text-[11px] sm:text-xs text-comic-ink/75">
                Investigating real problems to deliver accessible, high-performance community tools.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase bg-spider-yellow text-black px-2 py-0.5 border border-black">
              CBL STUDY CASES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Study Case 1: Nusantara Crustal Observatory */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-28 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={seismicTracker}
                    alt="Nusantara Observatory Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-red text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Social Impact / Open Data
                  </span>
                  <span className="text-[9px] font-mono font-bold text-comic-ink/60">React 19 · Canvas 2D · Telemetry</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-red mb-1">
                  Nusantara Crustal Observatory &amp; Hazard Tracker
                </h3>
                <div className="text-[10px] text-comic-ink/85 space-y-1.5 mb-2 leading-relaxed">
                  <p>
                    <strong>The Problem (Engage):</strong> Indonesian citizens frequently receive fragmented, anxiety-inducing disaster alerts scattered across social media without contextual proximity.
                  </p>
                  <p>
                    <strong>Investigation &amp; Solution (Investigate &amp; Act):</strong> Unified live feeds from USGS, BMKG AutoGempa, NASA FIRMS, and PVMBG into a custom-built 60 FPS Canvas 2D vector map. Integrated Haversine geodesic calculation so users instantly know their danger clearance radius.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-comic-ink/10 flex items-center justify-between">
                <span className="text-[9px] font-black text-spider-red">✓ 60 FPS Zero-Lag Mobile Visualization</span>
                <span className="text-[8px] font-mono text-comic-ink/60">Canvas 2D · TypeScript · Supabase</span>
              </div>
            </div>

            {/* Study Case 2: Roblox Sentiment Thesis */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-28 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[1px_1px_0_#000] bg-black">
                  <img
                    src={robloxSentiment}
                    alt="Analisis Sentimen Ulasan Roblox: SVM vs IndoBERT"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-blue text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Undergraduate Thesis / NLP
                  </span>
                  <span className="text-[9px] font-mono font-bold text-comic-ink/60">IndoBERT vs SVM · Streamlit</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-blue mb-1">
                  Analisis Sentimen Ulasan Roblox: SVM vs IndoBERT
                </h3>
                <div className="text-[10px] text-comic-ink/85 space-y-1.5 mb-2 leading-relaxed">
                  <p>
                    <strong>The Problem (Engage):</strong> Sharp fluctuations and sudden waves of negative reviews hit the community between February and April 2026, leaving unclear root causes behind the vocal backlash.
                  </p>
                  <p>
                    <strong>Investigation &amp; Solution (Investigate &amp; Act):</strong> Fine-tuned IndoBERT (achieving 87.61% accuracy against informal slang) and built an exploratory dashboard cross-referencing complaint clusters with official developer changelogs to pinpoint the policy disruption.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-comic-ink/10 flex items-center justify-between">
                <span className="text-[9px] font-black text-spider-blue">✓ 87.61% Accuracy on Informal Language</span>
                <span className="text-[8px] font-mono text-comic-ink/60">PyTorch · IndoBERT · Streamlit</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "interactive-systems":
      return (
        <div className="space-y-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
                Interactive Systems &amp; Digital Experiences
              </h2>
              <p className="text-[11px] sm:text-xs text-comic-ink/75">
                Demonstrating passion for graphic fidelity, physics, and smooth client-side interaction.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase bg-spider-blue text-white px-2 py-0.5 border border-black">
              INTERACTION &amp; 3D
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            {/* Leclerc Showcase */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img src={leclercPreview} alt="Charles Leclerc Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-red text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Interactive Web
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">GSAP / Physics</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Monaco GP Telemetry
                </h3>
                <p className="text-[9px] text-comic-ink/80 leading-tight mb-1.5">
                  Fluid Ribbon Trail Bézier physics and dynamic telemetry HUD recreating real-world racing metrics.
                </p>
              </div>
              <span className="text-[8px] font-bold text-spider-red">Sub-step physics at 60–120 FPS</span>
            </div>

            {/* Gunung Gede Trail */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img src={gunungGede} alt="Gunung Gede Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-emerald-600 text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Simulation &amp; 3D
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Roblox / Luau</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Gunung Gede Trail (3D)
                </h3>
                <p className="text-[9px] text-comic-ink/80 leading-tight mb-1.5">
                  Realistic topographic terrain modeling, dynamic weather systems, and stamina physics reaching 4M+ visits.
                </p>
              </div>
              <span className="text-[8px] font-bold text-emerald-700">Team production &amp; environment design</span>
            </div>

            {/* Street Rush */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img src={streetRush} alt="Street Rush Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-yellow text-black px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Mobile Physics
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Unity / C#</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Street Rush (3D)
                </h3>
                <p className="text-[9px] text-comic-ink/80 leading-tight mb-1.5">
                  Fast-paced runner with custom collision matrices, procedural obstacle spawners, and mobile optimization.
                </p>
              </div>
              <span className="text-[8px] font-bold text-spider-ink">Optimized mobile runtime</span>
            </div>

            {/* Fersya Shop & Platform */}
            <div className="bg-comic-surface border-2 border-comic-ink p-2.5 rounded-sm flex flex-col justify-between shadow-[2px_2px_0_#000]">
              <div>
                <div className="w-full h-18 sm:h-20 overflow-hidden border-2 border-black rounded-sm mb-1.5 shadow-[1px_1px_0_#000] bg-black">
                  <img src={fersyaShop} alt="Fersya Shop Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8.5px] font-black bg-spider-blue text-white px-1.5 py-0.2 uppercase tracking-wider rounded-sm">
                    Web Platform
                  </span>
                  <span className="text-[8px] font-mono font-bold text-comic-ink/60">Laravel / Filament</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-spider-red mb-0.5 truncate">
                  Fersya Platform
                </h3>
                <p className="text-[9px] text-comic-ink/80 leading-tight mb-1.5">
                  Streamlined administrative controls for small business owners with real-time stock sync and clean mobile layouts.
                </p>
              </div>
              <span className="text-[8px] font-bold text-spider-blue">Usability for non-tech merchants</span>
            </div>
          </div>
        </div>
      );

    case "academy-aspiration":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
            <div className="inline-block bg-spider-yellow text-spider-black px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              LEARNING ASPIRATION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-comic-ink tracking-tight leading-tight">
              Ready to Learn, Collaborate, &amp; <span className="text-spider-red">Create</span>
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/85 leading-relaxed">
              I view software development not merely as writing code, but as a medium to solve real challenges. My objective at the Apple Developer Academy is to absorb iOS design standards, collaborate across multidisciplinary teams, and build products that empower communities.
            </p>

            {/* Value Points */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-red uppercase">🤝 Collaborative Growth</div>
                <div className="text-[10px] text-comic-ink/80">Experienced tutor and lab assistant eager to share technical insights and learn design thinking.</div>
              </div>
              <div className="bg-white/80 border border-black/20 p-2 rounded-sm shadow-[1px_1px_0_#000]">
                <div className="text-[10px] font-black text-spider-blue uppercase">🍎 Swift &amp; Apple Ecosystem</div>
                <div className="text-[10px] text-comic-ink/80">Excited to translate Canvas 2D and reactive web architectures into native SwiftUI and CoreML.</div>
              </div>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-1.5 pt-1 text-xs font-bold text-comic-ink">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-spider-yellow text-spider-black flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">@</div>
                <span>ferrelrashadakeyla2014@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-spider-blue text-white flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">GH</div>
                <span>github.com/FerrelHD</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-spider-red text-white flex items-center justify-center rounded-sm font-black text-xs shadow-[1px_1px_0_#000]">IN</div>
                <span>linkedin.com/in/ferrel-rashad-8a165514b/</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-comic-surface border-4 border-spider-black p-4 sm:p-5 comic-chip space-y-2.5 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-2 text-spider-red font-black text-xs uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Academy Alignment</span>
            </div>
            <div className="space-y-2 text-xs font-bold text-comic-ink/85">
              <div className="pb-1.5 border-b border-comic-ink/10">
                <span className="text-comic-ink/60 block text-[10px] uppercase">Primary Role in Academy</span>
                <span className="text-spider-red text-xs">Coder / Tech Explorer</span>
              </div>
              <div className="pb-1.5 border-b border-comic-ink/10">
                <span className="text-comic-ink/60 block text-[10px] uppercase">Complementary Interests</span>
                <span className="text-comic-ink text-xs">Human Interface Design &amp; Product Strategy</span>
              </div>
              <div className="pb-1.5 border-b border-comic-ink/10">
                <span className="text-comic-ink/60 block text-[10px] uppercase">Learning Objective</span>
                <span className="text-comic-ink text-xs">Mastering SwiftUI, CoreML, and Apple Design Guidelines</span>
              </div>
            </div>
            <div className="pt-2 text-center bg-[#FFD500] border-2 border-black p-1.5 rounded-sm shadow-[1px_1px_0_#000]">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">
                READY FOR CHALLENGE-BASED LEARNING
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