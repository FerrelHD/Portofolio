"use client";
import React from "react";
import { motion } from "framer-motion";
import spideyGif from "../assets/spidey.gif";

const HangingSpidey = () => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Web Line dangling from top */}
      <div
        className="w-[2px] bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"
        style={{ height: "90px" }}
      />

      {/* Hanging Upside Down Pixel Spidey with Pendulum Swing */}
      <motion.div
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative -mt-1 origin-top flex flex-col items-center"
      >
        <img
          src={spideyGif}
          alt="Hanging Spider-Man Easter Egg"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(255,30,38,0.4)]"
        />
      </motion.div>
    </div>
  );
};

export default HangingSpidey;
