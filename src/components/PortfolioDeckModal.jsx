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
import streetRush from "../assets/street-rush.webp";
import gunungGede from "../assets/image-1784710274754.webp";


const SLIDES = [
  {
    id: 1,
    category: "EXECUTIVE BRIEF",
    title: "Ferrel Rashad Akeyla",
    subtitle: "Full-Stack Web Developer & Game Designer",
    tagline: "Bridging creative cinematic storytelling with modern, high-performance software engineering.",
    type: "cover",
  },
  {
    id: 2,
    category: "01 // CORE ARSENAL",
    title: "Technical Capabilities & Stack",
    subtitle: "End-to-end engineering from reactive frontends to game physics & media pipelines.",
    type: "skills",
  },
  {
    id: 3,
    category: "02 // WEB MISSIONS",
    title: "Featured Web Applications",
    subtitle: "Production-ready platforms built for performance, conversion, and fluid UX.",
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
    subtitle: "Available for full-stack web roles, freelance projects, and creative collaborations.",
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
              <span>Print</span>
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
            className="w-full aspect-[16/9] max-h-[75vh] bg-[#111318] border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden relative flex flex-col p-5 sm:p-8 md:p-10 justify-between text-comic-ink"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(255,30,38,0.1) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(22,93,255,0.1) 0%, transparent 40%)",
            }}
          >
            {/* Slide Halftone Background Accent */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #FFF 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Slide Header Tag */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-comic-ink/15 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-spider-yellow text-spider-black px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest comic-chip">
                  {SLIDES[currentSlide].category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-comic-ink/50 uppercase tracking-wider hidden sm:inline">
                  CONFIDENTIAL DOSSIER
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

            {/* Slide Footer */}
            <div className="relative z-10 flex items-center justify-between border-t-2 border-comic-ink/15 pt-2 text-[9px] sm:text-[11px] font-bold text-comic-ink/60">
              <div className="flex items-center gap-2">
                <span className="text-spider-yellow">★</span>
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
            className="flex items-center gap-1.5 bg-spider-yellow text-spider-black hover:bg-spider-red hover:text-comic-ink px-3 sm:px-4 py-1.5 text-xs font-black uppercase tracking-wider comic-chip transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* =========================================================================
            DEDICATED FULL PRINT & AUTO-DOWNLOAD DECK CONTAINER
            - Offscreen in normal viewport for instant html2pdf.js capturing
            - Block & full-size in @media print
           ========================================================================= */}
        <div
          id="pdf-deck-export-source"
          className="fixed -left-[9999px] top-0 w-[1200px] z-[-100] pointer-events-none opacity-100 print:opacity-100 print:pointer-events-auto print:static print:left-auto print:w-full print:h-auto print-deck-root"
        >
          {SLIDES.map((slide, index) => (
            <div
              key={`print-slide-${slide.id}`}
              className="pdf-slide-break print-slide-page w-[1200px] h-[675px] print:w-[100vw] print:h-[100vh] p-10 box-border flex flex-col justify-between bg-[#111318] text-[#F0EDE3] relative"
              style={{
                pageBreakAfter: "always",
                breakAfter: "page",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#F0EDE3]/20 pb-3">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFD500] text-[#0D0D11] px-3 py-0.5 text-xs font-black uppercase tracking-widest rounded-sm">
                    {slide.category}
                  </span>
                  <span className="text-xs font-bold text-[#F0EDE3]/60 uppercase tracking-widest">
                    MISSION BRIEF & PORTFOLIO DECK
                  </span>
                </div>
                <span className="text-sm font-black text-[#FF1E26]">
                  0{index + 1} / 0{SLIDES.length}
                </span>
              </div>

              {/* Main Slide Content */}
              <div className="flex-1 flex flex-col justify-center my-6">
                {renderSlideContent(slide)}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t-2 border-[#F0EDE3]/20 pt-3 text-xs font-bold text-[#F0EDE3]/60">
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
   HELPER: RENDER SLIDE CONTENT BY TYPE
   ========================================================================= */
function renderSlideContent(slide) {
  switch (slide.type) {
    case "cover":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-block bg-spider-red text-white px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              MISSION BRIEF & EXECUTIVE DOSSIER
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-comic-ink comic-stroke-thin leading-none">
              FERREL RASHAD <span className="text-spider-red">AKEYLA</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-spider-yellow tracking-wide">
              Full-Stack Web Developer & Game Designer | Multidisciplinary Digital Creator
            </p>
            <p className="text-xs sm:text-sm text-comic-ink/80 max-w-2xl leading-relaxed">
              Crafting immersive web platforms, interactive game environments, and cinematic multimedia with high aesthetic fidelity and clean engineering.
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] sm:text-xs font-bold">
              <span className="bg-comic-surface border border-comic-ink/20 px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                <Mail size={13} className="text-spider-yellow" />
                <span>ferrelrashadakeyla2014@gmail.com</span>
              </span>
              <span className="bg-comic-surface border border-comic-ink/20 px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                <Github size={13} className="text-spider-blue" />
                <span>github.com/FerrelHD</span>
              </span>
              <span className="bg-comic-surface border border-comic-ink/20 px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                <MapPin size={13} className="text-spider-red" />
                <span>West Java, Indonesia</span>
              </span>
            </div>
          </div>

          {/* Right Column: Big Handsome Spotlight Portrait */}
          <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center">
            <div className="bg-comic-surface border-3 border-comic-ink p-3 comic-chip shadow-[6px_6px_0px_#FF1E26] w-full max-w-[260px] text-center">
              <div className="w-full h-44 sm:h-52 border-2 border-spider-yellow overflow-hidden bg-black mb-2.5 shadow-[2px_2px_0_#000]">
                <img
                  src={ferrelPortrait}
                  alt="Ferrel Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-[9px] font-black text-spider-yellow uppercase tracking-wider block">
                  AGENT DOSSIER #001
                </span>
                <span className="text-[8px] font-black bg-emerald-500 text-black px-1.5 py-0.5 uppercase tracking-wider rounded-xs">
                  ACTIVE
                </span>
              </div>
              <span className="text-sm font-black text-comic-ink block uppercase">
                Ferrel Rashad Akeyla
              </span>
              <span className="text-[10px] font-bold text-comic-ink/60 block mt-0.5">
                Full-Stack & Game Systems Specialist
              </span>
            </div>
          </div>
        </div>
      );


    case "skills":
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Technical Arsenal & Core Stack
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/70">
              Modern full-stack toolchains tailored for rapid deployment, high performance, and fluid user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Column 1: Frontend */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-spider-yellow font-black text-xs uppercase tracking-wider mb-2">
                  <Code2 size={16} />
                  <span>Frontend</span>
                </div>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-comic-ink/80">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> React 19 & Next.js</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> TypeScript / Modern JS</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Tailwind CSS v4 & Vite</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Framer Motion (60 FPS)</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-yellow">
                Fluid & Reactive Interfaces
              </div>
            </div>

            {/* Column 2: Backend */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-spider-blue font-black text-xs uppercase tracking-wider mb-2">
                  <Cpu size={16} />
                  <span>Backend & Data</span>
                </div>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-comic-ink/80">
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue">•</span> Laravel 11 & PHP</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue">•</span> Filament Admin Panels</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue">•</span> Supabase & PostgreSQL</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-blue">•</span> REST APIs & Webhooks</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-blue">
                Scalable Backend Logic
              </div>
            </div>

            {/* Column 3: Game Dev */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-spider-red font-black text-xs uppercase tracking-wider mb-2">
                  <Gamepad2 size={16} />
                  <span>Game Dev</span>
                </div>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-comic-ink/80">
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Unity 3D & C# Scripting</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Rigidbody & Physics Engine</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Roblox Studio (Luau)</li>
                  <li className="flex items-center gap-1.5"><span className="text-spider-red">•</span> Gameplay Mechanics & UI</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-spider-red">
                Interactive Simulation & Fun
              </div>
            </div>

            {/* Column 4: Multimedia & Design */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3.5 sm:p-4 rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider mb-2">
                  <Video size={16} />
                  <span>Multimedia & UI</span>
                </div>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-comic-ink/80">
                  <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> Vegas Pro 18 Video Editing</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> Blender 3D Assets</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> Figma Design Systems</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> Agentic AI & Automations</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-comic-ink/10 text-[9px] font-bold text-emerald-400">
                Cinematic Visual Storytelling
              </div>
            </div>
          </div>
        </div>
      );

    case "web-projects":
      return (
        <div className="space-y-2.5 sm:space-y-3">
          <div className="mb-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Featured Web Engineering Missions
            </h2>
            <p className="text-[11px] sm:text-xs text-comic-ink/70">
              Robust e-commerce, real-time productivity platforms, and scalable digital storefronts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Project 1: Fersya Shop */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
                  <img
                    src={fersyaShop}
                    alt="Fersya Shop Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-red text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    E-Commerce
                  </span>
                  <span className="text-[9px] font-bold text-comic-ink/50">Full-Stack</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Fersya Shop
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  Modern e-commerce platform for healthy foods and organic body care products.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Filament admin panel for stock & webhooks.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-spider-red text-white px-1.5 py-0.5 rounded-xs border border-black">Laravel 11</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-yellow text-black px-1.5 py-0.5 rounded-xs border border-black">Filament 3</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-blue text-white px-1.5 py-0.5 rounded-xs border border-black">Tailwind</span>
              </div>
            </div>

            {/* Project 2: Student Life */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
                  <img
                    src={studentLife}
                    alt="Student Life Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-blue text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Productivity
                  </span>
                  <span className="text-[9px] font-bold text-comic-ink/50">React + Supabase</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Student Life
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  Task management and academic schedule tracking suite for high-efficiency students.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Real-time task sync & Supabase auth.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-[#00D8FF] text-black px-1.5 py-0.5 rounded-xs border border-black">React 19</span>
                <span className="text-[8.5px] font-black uppercase bg-[#3178C6] text-white px-1.5 py-0.5 rounded-xs border border-black">TypeScript</span>
                <span className="text-[8.5px] font-black uppercase bg-[#10B981] text-black px-1.5 py-0.5 rounded-xs border border-black">Supabase</span>
              </div>
            </div>

            {/* Project 3: Finesser Shop */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
                  <img
                    src={finesserShop}
                    alt="Finesser Shop Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-yellow text-black px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Storefront
                  </span>
                  <span className="text-[9px] font-bold text-comic-ink/50">Full-Stack</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Finesser Shop
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  Digital asset marketplace offering templates, design kits, and creative tools.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Instant licensing delivery pipelines.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-spider-red text-white px-1.5 py-0.5 rounded-xs border border-black">Laravel</span>
                <span className="text-[8.5px] font-black uppercase bg-[#00758F] text-white px-1.5 py-0.5 rounded-xs border border-black">MySQL</span>
                <span className="text-[8.5px] font-black uppercase bg-[#A259FF] text-white px-1.5 py-0.5 rounded-xs border border-black">Bootstrap</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "game-projects":
      return (
        <div className="space-y-2.5 sm:space-y-3">
          <div className="mb-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-comic-ink tracking-tight">
              Interactive Game Systems & Multimedia
            </h2>
            <p className="text-[11px] sm:text-xs text-comic-ink/70">
              3D gameplay engineering, atmospheric trail simulations, and rhythmic motion video production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Item 1: Street Rush */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
                  <img
                    src={streetRush}
                    alt="Street Rush Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-spider-red text-white px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Unity 3D Game
                  </span>
                  <span className="text-[9px] font-bold text-comic-ink/50">C# Physics</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Street Rush
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  Fast-paced 3D arcade runner game engineered with Unity and custom C# physics.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Steady 60 FPS mobile performance.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-white text-black px-1.5 py-0.5 rounded-xs border border-black">Unity Engine</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-blue text-white px-1.5 py-0.5 rounded-xs border border-black">C# Physics</span>
                <span className="text-[8.5px] font-black uppercase bg-emerald-500 text-black px-1.5 py-0.5 rounded-xs border border-black">60 FPS</span>
              </div>
            </div>

            {/* Item 2: Gunung Gede Simulation */}
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
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
                  <span className="text-[9px] font-bold text-comic-ink/50">Luau Code</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Gunung Gede Trail
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  Immersive 3D hiking simulation recreating Mount Gede's Gunung Putri trail.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Realistic terrain & day/night lighting.</span>
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
            <div className="bg-comic-surface border-2 border-comic-ink p-3 rounded-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-20 sm:h-24 overflow-hidden border-2 border-black rounded-sm mb-2 shadow-[2px_2px_0_#000] bg-black">
                  <img
                    src="https://img.youtube.com/vi/WMrnRucy0qs/maxresdefault.jpg"
                    alt="Cinematic AMV Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black bg-emerald-500 text-black px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Video & Motion
                  </span>
                  <span className="text-[9px] font-bold text-comic-ink/50">Vegas Pro</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-spider-yellow mb-0.5">
                  Cinematic AMVs
                </h3>
                <p className="text-[10px] text-comic-ink/80 mb-2 leading-relaxed line-clamp-2">
                  High-tempo anime music videos featuring precise audio-visual beat sync.
                </p>
                <div className="space-y-1 text-[10px] text-comic-ink/70 mb-2">
                  <div className="flex items-start gap-1">
                    <CheckCircle2 size={12} className="text-spider-yellow shrink-0 mt-0.5" />
                    <span>Frank Ocean & Playboi Carti vocal sync.</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-comic-ink/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[8.5px] font-black uppercase bg-emerald-500 text-black px-1.5 py-0.5 rounded-xs border border-black">Vegas Pro 18</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-red text-white px-1.5 py-0.5 rounded-xs border border-black">Beat Timing</span>
                <span className="text-[8.5px] font-black uppercase bg-spider-yellow text-black px-1.5 py-0.5 rounded-xs border border-black">Color Grade</span>
              </div>
            </div>
          </div>
        </div>
      );


    case "contact":
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-block bg-spider-yellow text-spider-black px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border-2 border-black rounded-sm shadow-[2px_2px_0_#000]">
              READY FOR DEPLOYMENT
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-comic-ink tracking-tight leading-tight">
              Let's Build Something <span className="text-spider-red">Extraordinary</span>
            </h2>
            <p className="text-xs sm:text-sm text-comic-ink/80 leading-relaxed">
              Whether you're looking for a dedicated Full-Stack Web Developer, a Game Programmer, or a Creative Technical Partner, I'm ready to bring your vision to life.
            </p>

            {/* Direct Contact List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-comic-ink">
                <div className="w-7 h-7 bg-spider-yellow text-spider-black flex items-center justify-center rounded-sm font-black text-xs">
                  @
                </div>
                <span>ferrelrashadakeyla2014@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-comic-ink">
                <div className="w-7 h-7 bg-spider-blue text-white flex items-center justify-center rounded-sm font-black text-xs">
                  GH
                </div>
                <span>github.com/FerrelHD</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-comic-ink">
                <div className="w-7 h-7 bg-spider-red text-white flex items-center justify-center rounded-sm font-black text-xs">
                  IN
                </div>
                <span>linkedin.com/in/ferrel-rashad-8a165514b/</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-comic-surface border-4 border-spider-black p-5 sm:p-6 comic-chip space-y-3">
            <div className="flex items-center gap-2 text-spider-yellow font-black text-xs uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Status: Open for Opportunities</span>
            </div>
            <div className="space-y-2 text-xs font-bold text-comic-ink/80">
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span>Roles:</span>
                <span className="text-spider-yellow">Full-Stack / Frontend / Game</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span>Work Model:</span>
                <span className="text-comic-ink">Remote / Hybrid / Full-Time</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-comic-ink/10">
                <span>Timezone:</span>
                <span className="text-comic-ink">WIB (UTC+7)</span>
              </div>
            </div>
            <div className="pt-2 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-spider-red">
                ⚡ FAST RESPONSE GUARANTEE
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
