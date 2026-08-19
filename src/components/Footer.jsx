const NEXT_ISSUE = { num: 2, progress: 40, nextUp: "Case Studies / Blog Section" };

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden py-8 sm:py-12 bg-spider-black border-t-[3px] border-spider-yellow"
    >
      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full halftone-overlay-sm" />
      </div>

      {/* Subtle web pattern in corner */}
      <svg
        className="absolute -top-[60%] -right-[5%] w-[45%] h-[200%] opacity-[0.05] pointer-events-none rotate-180"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" className="text-spider-yellow">
          <circle cx="400" cy="0" r="40" />
          <circle cx="400" cy="0" r="80" />
          <circle cx="400" cy="0" r="120" />
          <circle cx="400" cy="0" r="160" />
          <circle cx="400" cy="0" r="200" />
          <circle cx="400" cy="0" r="240" />
          <circle cx="400" cy="0" r="280" />
          <circle cx="400" cy="0" r="320" />
          <line x1="400" y1="0" x2="400" y2="-400" />
          <line x1="400" y1="0" x2="800" y2="0" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(30 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(60 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-30 400 0)" />
        </g>
      </svg>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ============ MAIN FOOTER: 3 COLUMNS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8 text-center md:text-left mb-8 md:mb-10">
          {/* LEFT COLUMN: Copyright + Logo Mark */}
          <div className="flex items-center gap-3 justify-center md:justify-start order-2 md:order-1">
            {/* Spider Icon Chip */}
            <span className="inline-flex items-center justify-center w-10 h-10 bg-spider-red comic-chip">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-comic-ink">
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-comic-ink/70 leading-tight">
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
                accent: "bg-spider-blue",
              },
              {
                name: "GitHub",
                href: "https://github.com/FerrelHD",
                accent: "bg-comic-panel",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${link.accent} comic-chip px-4 py-2 text-comic-ink hover:bg-spider-yellow hover:text-spider-black hover:pop-shadow-active transition-all active:pop-shadow-active`}
              >
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em]">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT COLUMN: Build Credit */}
          <div className="flex items-center gap-2 justify-center md:justify-end order-3">
            <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-comic-ink/70">
              Built With
            </span>
            <span className="inline-flex items-center gap-1.5 bg-spider-red comic-chip text-comic-ink px-2.5 py-1">
              <span className="w-1.5 h-1.5 bg-spider-yellow comic-chip" />
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
                React + Framer
              </span>
            </span>
          </div>
        </div>

        {/* ============ PROGRESS TRACKER STRIP (FITUR #12) ============ */}
        <div
          className="border-t-2 border-comic-panel pt-5 sm:pt-6 overflow-hidden relative"
        >
          {/* Diagonal speed lines (comic) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-25deg, transparent 0px, transparent 16px, var(--color-spider-yellow) 16px, var(--color-spider-yellow) 17px)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 1. Kiri: ISSUE Badge */}
            <span className="inline-flex items-center gap-2 bg-spider-red comic-chip text-comic-ink px-3 py-1 font-black text-[10px] tracking-[0.24em] uppercase shrink-0 pop-shadow-sm">
              <span className="w-1.5 h-1.5 bg-spider-yellow comic-chip animate-pulse" />
              ISSUE #{String(NEXT_ISSUE.num).padStart(3, "0")}
            </span>

            {/* 2. Tengah: Progress Bar */}
            <div className="w-full md:w-[260px] lg:w-[320px] flex items-center gap-3">
              <div className="loader-progress-track h-4 flex-1">
                <div
                  className="loader-progress-fill"
                  style={{
                    width: `${NEXT_ISSUE.progress}%`,
                    background: "linear-gradient(90deg, var(--color-spider-blue), var(--color-spider-yellow))",
                  }}
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-spider-yellow tabular-nums shrink-0">
                {NEXT_ISSUE.progress}%
              </span>
            </div>

            {/* 3. Kanan: Next Up Status */}
            <div className="flex items-center gap-2 text-center md:text-right shrink-0">
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase text-comic-ink/80">
                Next: <span className="text-spider-yellow">{NEXT_ISSUE.nextUp}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
