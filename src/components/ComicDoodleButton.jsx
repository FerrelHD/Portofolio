"use client";
import React, { useState } from "react";
import { soundFX } from "../lib/soundFx";

const ComicDoodleButton = ({
  text = "SWING INTO ACTION",
  onClick,
  href,
  className = "",
  variant = "primary", // "primary" (yellow) | "danger" (red)
  submitted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    soundFX.playPunch();
    if (onClick) onClick(e);
  };

  const letters = text.split("");

  const content = (
    <button
      type={href ? "button" : "submit"}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFX.playBeep(480);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`comic-doodle-btn group relative select-none ${className}`}
    >
      {/* Flame Glow underneath */}
      <div className="doodle-glow" />

      {/* Main Button Body with 3-Layer RGB Shadows */}
      <div className="doodle-bg">
        {/* Shine highlight */}
        <div className="doodle-shine" />
      </div>

      {/* Floating Stars */}
      <div className="doodle-stars">
        <span className="star-left">★</span>
        <span className="star-right">★</span>
      </div>

      {/* Comic Energy Wave Lines */}
      <div className="doodle-wave" />

      {/* Content wrapper */}
      <div className="doodle-wrap">
        <div className="doodle-outline" />
        <div className="doodle-glyphs">
          <span className="doodle-text">
            {letters.map((char, index) => (
              <span
                key={index}
                data-label={char}
                style={{ "--i": index + 1 }}
                className={char === " " ? "inline-block w-2" : "inline-block"}
              >
                {char}
              </span>
            ))}
          </span>

          {/* Action Icon: ⚡ changes to ✔ upon submit/active */}
          <div className="doodle-icon-wrap">
            {!submitted ? (
              <span className="doodle-icon-zap">⚡</span>
            ) : (
              <span className="doodle-icon-check">✔</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

export default ComicDoodleButton;
