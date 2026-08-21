"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Gamepad2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { fadeUp, staggerContainer, comicPop, comicStamp } from "../lib/animation";
import { soundFX } from "../lib/soundFx";

const services = [
  {
    id: "web-dev",
    issue: "ISSUE #01 // WEB CRAFT",
    sfx: "POW! ⚡",
    sfxBg: "bg-spider-red text-white",
    title: "Full-Stack Web Dev",
    subtitle: "Custom Web Applications & APIs",
    description:
      "Building ultra-fast, secure, and production-ready web applications using React, Next.js, Laravel, and scalable database architectures.",
    accent: "spider-red",
    accentBg: "bg-spider-red",
    accentBorder: "border-spider-red",
    shadowClass: "hover:shadow-[10px_10px_0_#FF1E26]",
    icon: <Code2 size={24} strokeWidth={2.5} />,
    arsenal: [
      "React 19 & Next.js",
      "Laravel / Node.js API",
      "Database & REST Design",
      "Tailwind CSS / Styling",
      "SEO & Core Web Vitals",
      "Secure Auth & Middleware",
    ],
  },
  {
    id: "ui-motion",
    issue: "ISSUE #02 // UI & MOTION",
    sfx: "ZAP! ✨",
    sfxBg: "bg-spider-blue text-white",
    title: "Interactive UI & Motion",
    subtitle: "Engaging & High-Converting Design",
    description:
      "Crafting immersive, 60 FPS fully-responsive interfaces with physics springs, gesture controls, and stunning micro-interactions.",
    accent: "spider-blue",
    accentBg: "bg-spider-blue",
    accentBorder: "border-spider-blue",
    shadowClass: "hover:shadow-[10px_10px_0_#165DFF]",
    icon: <Sparkles size={24} strokeWidth={2.5} />,
    arsenal: [
      "Framer Motion Physics",
      "60 FPS Micro-Animations",
      "100% Mobile Responsive",
      "Clean Modern UI/UX",
      "Interactive Sound FX",
      "Halftone & Comic Effects",
    ],
  },
  {
    id: "creative-crafts",
    issue: "ISSUE #03 // 3D & GAMES",
    sfx: "BAM! 🎮",
    sfxBg: "bg-spider-yellow text-spider-black",
    title: "Multiverse & Game Crafts",
    subtitle: "3D, Video & Interactive Media",
    description:
      "Engineered game mechanics (Unity/C#), cinematic video editing, and stylized 3D asset modeling for interactive comic experiences.",
    accent: "spider-yellow",
    accentBg: "bg-spider-yellow text-spider-black",
    accentBorder: "border-spider-yellow",
    shadowClass: "hover:shadow-[10px_10px_0_#FFD500]",
    icon: <Gamepad2 size={24} strokeWidth={2.5} />,
    arsenal: [
      "Unity & C# Mechanics",
      "Cinematic Video Editing",
      "3D Blender Modeling",
      "Physics & Collision Systems",
      "Interactive Canvas & WebGL",
      "Audio Pacing & Soundtracks",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div variants={comicStamp} className="mb-3 flex justify-center">
            <span className="inline-block py-1.5 px-4 bg-spider-yellow comic-chip text-spider-black text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase pop-shadow-sm">
              SUPERPOWERS // CLIENT SERVICES
            </span>
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-comic-ink tracking-tight mb-4 select-none"
          >
            WHAT I CAN{" "}
            <span
              className="text-[#FF1E26] italic inline-block px-1"
              style={{
                textShadow:
                  "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0px -1.5px 0 #000, 0px 1.5px 0 #000, -1.5px 0px 0 #000, 1.5px 0px 0 #000, 1px 3px 0 #165DFF, 2px 4.5px 0 #165DFF, 2.5px 6px 0 #0C38A8, 3.5px 7.5px 0 #000000, 4px 10px 8px rgba(0,0,0,0.5)",
              }}
            >
              BUILD
            </span>{" "}
            FOR YOU
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-comic-ink/70 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            End-to-end digital solutions designed to help your brand, business, or creative project stand out with epic superhero flair.
          </motion.p>
        </motion.div>

        {/* Services Grid (1-Col Mobile, 3-Col Desktop) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={comicPop}
              onMouseEnter={() => soundFX.playBeep(420)}
              className={`group relative bg-white border-[3.5px] border-black p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-[6px_6px_0_#000] hover:-translate-y-2 select-none overflow-hidden text-comic-ink ${service.shadowClass}`}
            >
              {/* Comic Color Accent Bar at Top */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${service.accentBg}`} />

              {/* Hover Sound Effect Pop Sticker */}
              <div
                className={`absolute top-4 right-4 z-20 ${service.sfxBg} text-[9.5px] font-black tracking-widest px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0_#000] transform rotate-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200`}
              >
                {service.sfx}
              </div>

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center gap-3 mb-5 mt-1">
                  <div
                    className={`w-12 h-12 ${service.accentBg} rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000] group-hover:scale-105 transition-transform shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <span className="text-[9.5px] sm:text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#F7F4EE] border border-black text-comic-ink rounded">
                      {service.issue}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-black text-comic-ink tracking-tight mb-1 group-hover:text-spider-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-black text-spider-blue mb-3.5 uppercase tracking-wider">
                  {service.subtitle}
                </p>
                <p className="text-xs sm:text-[13px] text-comic-ink/75 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tech Arsenal Pills */}
                <div className="pt-4 mb-6 border-t-2 border-black/10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-comic-ink/60 mb-3 flex items-center gap-1.5">
                    <Zap size={12} className="text-spider-red" />
                    <span>Deliverables &amp; Arsenal</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.arsenal.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10.5px] sm:text-[11px] font-black px-2.5 py-1 bg-[#F7F4EE] hover:bg-spider-yellow hover:text-black border border-black/30 text-comic-ink rounded-md transition-colors shadow-[1px_1px_0_#000]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link to Contact */}
              <a
                href="#contact"
                onClick={() => soundFX.playPunch()}
                className="mt-2 inline-flex items-center justify-between w-full py-3 px-4 bg-spider-yellow text-spider-black hover:bg-spider-red hover:text-white border-[2.5px] border-black rounded-xl font-black text-xs uppercase tracking-[0.16em] shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group/btn"
              >
                <span>Initiate Mission</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.8}
                  className="group-hover/btn:translate-x-1.5 transition-transform"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Guarantee Note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 py-2.5 px-5 bg-white border-2 border-black text-comic-ink text-xs font-black rounded-xl shadow-[4px_4px_0_#000]">
            <ShieldCheck size={17} className="text-spider-red shrink-0" />
            <span>Clean Scalable Code • Fast Turnaround • 100% Mobile Optimized</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
