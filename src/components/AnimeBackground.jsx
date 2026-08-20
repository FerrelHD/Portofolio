import React from "react";

const AnimeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer 1: Halftone Dot Pattern (Comic Print) */}
      <div
        className="absolute inset-0 halftone-overlay opacity-50"
        aria-hidden="true"
      />

      {/* Layer 2: Halftone Dot Small */}
      <div
        className="absolute inset-0 halftone-overlay-sm opacity-80"
        aria-hidden="true"
      />

      {/* Layer 3: Horizontal Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Red-Blue Radial Spotlights (NYC Night Vignette) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(255,30,38,0.22) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(22,93,255,0.22) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4B: Comic Action Burst Rays (Faint Comic Sunburst) */}
      <div
        className="absolute inset-0 opacity-[0.035] burst-bg mix-blend-screen"
        aria-hidden="true"
      />

      {/* Layer 4C: Comic Book Ink Vignette Edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 100px rgba(10, 10, 10, 0.85)",
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Subtle Comic Grain / Noise (SVG inline data) */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Layer 6: Subtle Diagonal Web Pattern Corner (Top-Right) */}
      <svg
        className="absolute -top-[8%] -right-[8%] w-[45%] h-[45%] opacity-[0.04]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" className="text-comic-ink">
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
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(22.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(45 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(67.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-22.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-45 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-67.5 400 0)" />
        </g>
      </svg>

      {/* Layer 7: Subtle Diagonal Web Pattern Corner (Bottom-Left) */}
      <svg
        className="absolute -bottom-[8%] -left-[8%] w-[45%] h-[45%] opacity-[0.04] rotate-180"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" className="text-comic-ink">
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
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(22.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(45 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(67.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-22.5 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-45 400 0)" />
          <line x1="400" y1="0" x2="0" y2="-400" transform="rotate(-67.5 400 0)" />
        </g>
      </svg>
    </div>
  );
};

export default AnimeBackground;
