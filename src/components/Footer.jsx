import React, { useState } from "react";
import CaseStudyModal from "./CaseStudyModal";

const NEXT_ISSUE = { num: 2, progress: 40, nextUp: "Case Studies / Blog Section" };

const Footer = () => {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  return (
    <footer
      className="relative overflow-hidden py-8 sm:py-12 bg-spider-red text-white border-t-[3.5px] border-black"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ============ MAIN FOOTER: 3 COLUMNS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8 text-center md:text-left mb-8 md:mb-10">
          {/* LEFT COLUMN: Copyright + Logo Mark */}
          <div className="flex items-center gap-3 justify-center md:justify-start order-2 md:order-1">
            {/* Spider Icon Chip */}
            <span className="inline-flex items-center justify-center w-10 h-10 bg-white comic-chip text-spider-red shadow-[2px_2px_0_#000]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-white leading-tight">
              © 2026 Ferrel Rashad.
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              All Rights Reserved.
            </p>
          </div>

          {/* CENTER COLUMN: Social Links */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center order-1 md:order-2">
            {[
              {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/ferrel-rashad-8a165514b/",
              },
              {
                name: "GitHub",
                href: "https://github.com/FerrelHD",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white text-spider-black comic-chip px-5 py-2.5 hover:bg-spider-yellow hover:text-spider-black hover:pop-shadow-active transition-all active:pop-shadow-active shadow-[3px_3px_0_#000]"
              >
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
