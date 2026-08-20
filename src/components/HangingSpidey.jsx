"use client";
import React from "react";
import { motion } from "framer-motion";
import spideyGif from "../assets/spidey.gif";

const HangingSpidey = () => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none z-30">
      {/* Web Line attached right to the top border of the photo frame */}
      <div
        className="w-[2px] bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"
        style={{ height: "40px" }}
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
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(255,30,38,0.5)]"
        />
      </motion.div>
    </div>
  );
};

export default HangingSpidey;
