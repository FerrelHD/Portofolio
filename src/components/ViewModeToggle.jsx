"use client";
import { motion } from "framer-motion";
import { soundFX } from "../lib/soundFx";
import spidermanEmblem from "../assets/spiderman-emblem.jpg";
import { Briefcase } from "lucide-react";

const ViewModeToggle = ({ viewMode, onToggle }) => {
  const isExecutive = viewMode === "executive";

  return (
    <motion.button
      type="button"
      onClick={() => {
        soundFX.playBeep(isExecutive ? 400 : 600);
        onToggle();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center gap-1 comic-chip border-2 border-black transition-all cursor-pointer select-none shrink-0
        w-8 h-8 sm:w-auto sm:h-9 sm:px-2.5
        ${
          isExecutive
            ? "bg-white text-comic-ink shadow-[2px_2px_0_#165DFF]"
            : "bg-spider-yellow text-spider-black shadow-[2px_2px_0_#000]"
        }
      `}
      title={isExecutive ? "Switch to Hero Mode 🕷️" : "Switch to Executive Mode 💼"}
      aria-label={isExecutive ? "Switch to Hero Mode" : "Switch to Executive Mode"}
    >
      {isExecutive ? (
        <>
          <img
            src={spidermanEmblem}
            alt="Hero"
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full object-cover border border-black"
          />
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider">
            Hero
          </span>
        </>
      ) : (
        <>
          <Briefcase size={14} strokeWidth={2.5} className="sm:w-[15px] sm:h-[15px]" />
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider">
            Exec
          </span>
        </>
      )}
    </motion.button>
  );
};

export default ViewModeToggle;
