"use client";
import React from "react";
import { motion } from "framer-motion";
import spideyHangingGif from "../assets/spideyhanging.gif";

const HangingSpidey = () => {
  return (
    <motion.div
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative origin-top select-none pointer-events-none z-30"
    >
      <img
        src={spideyHangingGif}
        alt="Hanging Spider-Man Easter Egg"
        className="w-16 h-auto sm:w-20 object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      />
    </motion.div>
  );
};

export default HangingSpidey;
