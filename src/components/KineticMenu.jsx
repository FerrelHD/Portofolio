"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Printer } from "lucide-react";
import MotionToggle from "./MotionToggle";
import { soundFX } from "../lib/soundFx";

/* ═══════════════════════════════════════════════════════════
   NAV LINKS — Spider-Man Comic Edition
   ═══════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: "ORIGINS", href: "#about", shape: 1 },
  { label: "ARSENAL", href: "#services", shape: 2 },
  { label: "CLASSIFIED OPS", href: "#projects", shape: 3 },
  { label: "SKILL MATRIX", href: "#skills", shape: 4 },
  { label: "SPIDER-SIGNAL", href: "#contact", shape: 5 },
];

/* ═══════════════════════════════════════════════════════════
   AMBIENT SVG SHAPES (unique per menu item)
   ═══════════════════════════════════════════════════════════ */
const AmbientShape1 = () => (
  <svg className="kinetic-shape" viewBox="0 0 400 400" fill="none">
    {/* Radial spider web lines */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line key={angle} x1="200" y1="200"
        x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
        y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
        className="shape-el" stroke="rgba(211,31,31,0.15)" strokeWidth="2" />
    ))}
    {[60, 120, 180].map((r) => (
      <circle key={r} cx="200" cy="200" r={r} className="shape-el"
        stroke="rgba(211,31,31,0.1)" strokeWidth="1.5" fill="none" />
    ))}
  </svg>
);

const AmbientShape2 = () => (
  <svg className="kinetic-shape" viewBox="0 0 400 400" fill="none">
    <circle className="shape-el" cx="100" cy="150" r="50" stroke="rgba(22,93,255,0.18)" strokeWidth="3" fill="none" />
    <circle className="shape-el" cx="280" cy="120" r="35" stroke="rgba(211,31,31,0.15)" strokeWidth="3" fill="none" />
    <rect className="shape-el" x="200" y="220" width="80" height="80" rx="8" stroke="rgba(22,93,255,0.15)" strokeWidth="2.5" fill="none" transform="rotate(15 240 260)" />
    <circle className="shape-el" cx="120" cy="300" r="25" stroke="rgba(255,213,0,0.2)" strokeWidth="2.5" fill="none" />
  </svg>
);

const AmbientShape3 = () => (
  <svg className="kinetic-shape" viewBox="0 0 400 400" fill="none">
    {/* Crosshair / reticle */}
    <circle className="shape-el" cx="200" cy="200" r="80" stroke="rgba(211,31,31,0.15)" strokeWidth="2" strokeDasharray="8 4" fill="none" />
    <circle className="shape-el" cx="200" cy="200" r="140" stroke="rgba(211,31,31,0.1)" strokeWidth="1.5" strokeDasharray="12 6" fill="none" />
    <line className="shape-el" x1="200" y1="40" x2="200" y2="360" stroke="rgba(211,31,31,0.1)" strokeWidth="1.5" />
    <line className="shape-el" x1="40" y1="200" x2="360" y2="200" stroke="rgba(211,31,31,0.1)" strokeWidth="1.5" />
    <circle className="shape-el" cx="200" cy="200" r="6" fill="rgba(211,31,31,0.2)" />
  </svg>
);

const AmbientShape4 = () => (
  <svg className="kinetic-shape" viewBox="0 0 400 400" fill="none">
    {/* Polygonal web rings */}
    {[80, 140, 200].map((r) => {
      const pts = Array.from({ length: 8 }, (_, i) => {
        const a = (i * 360) / 8 * (Math.PI / 180);
        return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon key={r} className="shape-el" points={pts}
        stroke="rgba(22,93,255,0.12)" strokeWidth="1.5" fill="none" />;
    })}
  </svg>
);

const AmbientShape5 = () => (
  <svg className="kinetic-shape" viewBox="0 0 400 400" fill="none">
    {/* Projector beam cone */}
    <path className="shape-el" d="M200 350 L80 80 L320 80 Z" fill="rgba(255,213,0,0.08)" stroke="rgba(255,213,0,0.15)" strokeWidth="2" />
    <circle className="shape-el" cx="200" cy="130" r="30" fill="rgba(211,31,31,0.1)" stroke="rgba(211,31,31,0.15)" strokeWidth="2" />
    <line className="shape-el" x1="200" y1="350" x2="200" y2="80" stroke="rgba(255,213,0,0.1)" strokeWidth="1" strokeDasharray="6 4" />
  </svg>
);

const SHAPE_COMPONENTS = [null, AmbientShape1, AmbientShape2, AmbientShape3, AmbientShape4, AmbientShape5];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
const KineticMenu = ({ isOpen, onClose, onOpenDeck, onOpenDailyBugle }) => {
  const wrapperRef = useRef(null);
  const tlRef = useRef(null);
  const prevOpenRef = useRef(false);

  // Smooth scroll to section & close
  const handleNav = useCallback((href) => {
    onClose();
    soundFX.playBeep(440);
    // Small delay so GSAP close animation starts before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [onClose]);

  // GSAP open/close timeline
  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const overlay = wrapper.querySelector(".kinetic-overlay");
    const panels = wrapper.querySelectorAll(".kinetic-backdrop");
    const links = wrapper.querySelectorAll(".kinetic-link");
    const faders = wrapper.querySelectorAll("[data-fade]");

    // Kill previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (!isOpen) wrapper.style.display = "none";
      },
    });
    tlRef.current = tl;

    if (isOpen) {
      // OPEN
      wrapper.style.display = "block";
      document.body.style.overflow = "hidden";
      soundFX.playThwip();

      tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(panels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.5 }, "<")
        .fromTo(links, { yPercent: 120, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.06, duration: 0.55 }, "<+=0.25")
        .fromTo(faders, { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.4 }, "<+=0.15");
    } else if (prevOpenRef.current) {
      // CLOSE (only if was previously open)
      document.body.style.overflow = "";
      soundFX.playPunch();

      tl.to(overlay, { autoAlpha: 0, duration: 0.3 })
        .to(panels, { xPercent: 101, stagger: 0.06, duration: 0.4 }, "<")
        .set(wrapper, { display: "none" });
    } else {
      // Initial mount: hidden
      wrapper.style.display = "none";
    }

    prevOpenRef.current = isOpen;

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Shape hover handlers (GSAP)
  const handleShapeEnter = useCallback((shapeIndex) => {
    if (!wrapperRef.current) return;
    const container = wrapperRef.current.querySelector(".kinetic-shapes-container");
    if (!container) return;

    // Deactivate all
    container.querySelectorAll(".kinetic-shape").forEach((s) => {
      gsap.to(s.querySelectorAll(".shape-el"), { scale: 0.6, opacity: 0, duration: 0.2, overwrite: "auto" });
    });

    // Activate target
    const target = container.querySelector(`.kinetic-shape-${shapeIndex}`);
    if (!target) return;
    const els = target.querySelectorAll(".shape-el");
    gsap.fromTo(els,
      { scale: 0.5, opacity: 0, rotation: -8 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.06, ease: "back.out(1.5)", overwrite: "auto" }
    );
  }, []);

  const handleShapeLeave = useCallback((shapeIndex) => {
    if (!wrapperRef.current) return;
    const container = wrapperRef.current.querySelector(".kinetic-shapes-container");
    if (!container) return;
    const target = container.querySelector(`.kinetic-shape-${shapeIndex}`);
    if (!target) return;
    gsap.to(target.querySelectorAll(".shape-el"), {
      scale: 0.6, opacity: 0, duration: 0.25, ease: "power2.in", overwrite: "auto",
    });
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[60]" style={{ display: "none" }}>
      {/* Dark overlay */}
      <div className="kinetic-overlay absolute inset-0 bg-black/60 cursor-pointer" onClick={onClose} />

      {/* 3-Layer Backdrop */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[54%] 2xl:w-[48%] pointer-events-none">
        {/* Layer 1: Daily Bugle Gold */}
        <div className="kinetic-backdrop absolute inset-0 bg-[#FFD500] pointer-events-auto" />
        {/* Layer 2: Spider Red */}
        <div className="kinetic-backdrop absolute inset-0 bg-[#D31F1F] pointer-events-auto" />
        {/* Layer 3: Comic Newsprint Content */}
        <div className="kinetic-backdrop absolute inset-0 bg-[#F7F4EE] border-l-0 sm:border-l-4 border-[#1A1A1A] pointer-events-auto overflow-y-auto overflow-x-hidden">
          {/* Halftone overlay */}
          <div className="absolute inset-0 halftone-overlay opacity-[0.06] pointer-events-none" />

          {/* Ambient shapes container */}
          <div className="kinetic-shapes-container absolute inset-0 pointer-events-none overflow-hidden">
            {SHAPE_COMPONENTS.map((Shape, i) =>
              Shape ? (
                <div key={i} className={`kinetic-shape-${i} absolute inset-0 flex items-center justify-center`}>
                  <Shape />
                </div>
              ) : null
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between min-h-full px-5 xs:px-7 sm:px-10 md:px-12 lg:px-14 py-12 xs:py-14 sm:py-16 md:py-20">
            {/* Close button top-right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-none hover:bg-[#D31F1F] active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_rgba(0,0,0,0.3)] z-20"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                <path d="M3.17 3.17a.75.75 0 011.06 0L8 6.94l3.77-3.77a.75.75 0 111.06 1.06L9.06 8l3.77 3.77a.75.75 0 11-1.06 1.06L8 9.06l-3.77 3.77a.75.75 0 01-1.06-1.06L6.94 8 3.17 4.23a.75.75 0 010-1.06z" />
              </svg>
            </button>

            {/* Nav Links */}
            <nav className="flex flex-col gap-0.5 sm:gap-1.5 md:gap-2 mt-4 sm:mt-6">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    onMouseEnter={() => handleShapeEnter(item.shape)}
                    onMouseLeave={() => handleShapeLeave(item.shape)}
                    className="kinetic-link group relative flex items-baseline gap-2.5 sm:gap-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 cursor-pointer select-none"
                  >
                    {/* Red hover highlight bar */}
                    <span className="absolute inset-0 bg-[#D31F1F] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                    <span className="relative text-[9px] xs:text-[10px] sm:text-xs font-body font-bold text-[#1A1A1A]/40 group-hover:text-[#FFD500] tracking-widest tabular-nums select-none transition-colors duration-300 z-10 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative z-10 overflow-hidden block whitespace-nowrap">
                      {/* Default text — slides up & out on hover */}
                      <span className="font-display font-black text-xl xs:text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] uppercase tracking-tight text-[#1A1A1A] block group-hover:-translate-y-full transition-transform duration-300 ease-out leading-tight sm:leading-none whitespace-nowrap">
                        {item.label}
                      </span>
                      {/* Yellow duplicate — slides up from below on hover */}
                      <span className="font-display font-black text-xl xs:text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] uppercase tracking-tight text-[#FFD500] absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out leading-tight sm:leading-none whitespace-nowrap" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2.5 sm:gap-3 mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 sm:border-t-3 border-[#1A1A1A]/15">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3" data-fade>
                {onOpenDeck && (
                  <button
                    onClick={() => { onClose(); onOpenDeck(); }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#1A1A1A] text-white px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] hover:bg-[#D31F1F] active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_rgba(0,0,0,0.2)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.2)]"
                  >
                    <Printer size={13} strokeWidth={2.5} className="sm:w-[14px] sm:h-[14px]" />
                    Pitch Deck
                  </button>
                )}
                {onOpenDailyBugle && (
                  <button
                    onClick={() => { onClose(); onOpenDailyBugle(); }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFD500] text-[#1A1A1A] px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] hover:bg-white active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_rgba(0,0,0,0.2)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.2)]"
                  >
                    📰 Daily Bugle
                  </button>
                )}
              </div>
              <div data-fade className="mt-1">
                <MotionToggle isMobile={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KineticMenu;
