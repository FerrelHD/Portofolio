import React, { useState } from "react";
import CaseStudyModal from "./CaseStudyModal";
import spiderEmblem from "../assets/spiderman-emblem.png";

const NEXT_ISSUE = { num: 2, progress: 40, nextUp: "Case Studies / Blog Section" };

const Footer = () => {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  return (
    <footer
      id="footer"
      className="relative overflow-hidden pt-10 sm:pt-14 pb-16 sm:pb-20 bg-[#2B2D2F] text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ============ MAIN FOOTER: 3 COLUMNS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8 text-center md:text-left mb-8 md:mb-10">
          {/* LEFT COLUMN: Copyright + Spider Emblem */}
          <div className="flex items-center gap-3 justify-center md:justify-start order-2 md:order-1">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-white comic-chip shadow-[2px_2px_0_#000] shrink-0 p-1.5">
              <img
                src={spiderEmblem}
                alt="Spider Emblem"
                className="w-full h-full object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(4678%) hue-rotate(352deg) brightness(88%) contrast(96%)" }}
              />
            </span>
            <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-white leading-tight">
              © 2026 Ferrel Rashad.
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              All Rights Reserved.
            </p>
          </div>

          {/* CENTER COLUMN: Social Links with icons */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center order-1 md:order-2">
            {[
              {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/ferrel-rashad-8a165514b/",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                name: "GitHub",
                href: "https://github.com/FerrelHD",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white text-spider-black comic-chip px-5 py-2.5 hover:bg-spider-yellow hover:text-spider-black hover:pop-shadow-active transition-all active:pop-shadow-active shadow-[3px_3px_0_#000] inline-flex items-center gap-2"
              >
                {link.icon}
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em]">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT COLUMN: Build Credit */}
          <div className="flex items-center gap-2 justify-center md:justify-end order-3">
            <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-white/90">
              Built With
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white text-spider-red comic-chip px-3 py-1 shadow-[2px_2px_0_#000]">
              <span className="w-1.5 h-1.5 bg-spider-yellow comic-chip" />
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
                React + Framer
              </span>
            </span>
          </div>
        </div>

        {/* ============ PROGRESS TRACKER STRIP (FITUR #12) ============ */}
        <div
          className="border-t-2 border-white/20 pt-5 sm:pt-6 overflow-hidden relative"
        >
          <div
            onClick={() => setCaseStudyOpen(true)}
            className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer group"
          >
            {/* 1. Kiri: ISSUE Badge */}
            <span className="inline-flex items-center gap-2 bg-spider-yellow text-spider-black comic-chip px-3.5 py-1.5 font-black text-[10px] tracking-[0.24em] uppercase shrink-0 pop-shadow-sm group-hover:bg-white transition-colors">
              <span className="w-1.5 h-1.5 bg-spider-red comic-chip animate-pulse" />
              ISSUE #{String(NEXT_ISSUE.num).padStart(3, "0")} • Click to Read
            </span>

            {/* 2. Kanan: Next Up Status */}
            <div className="flex items-center gap-2 text-center md:text-right shrink-0">
              <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-white">
                Coming Next: <span className="text-spider-yellow underline decoration-spider-yellow/60 underline-offset-4">{NEXT_ISSUE.nextUp}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <CaseStudyModal open={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} />
    </footer>
  );
};

export default Footer;
