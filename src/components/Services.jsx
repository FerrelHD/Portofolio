"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Gamepad2, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";

const services = [
  {
    id: "web-dev",
    eyebrow: "SUPERPOWER #01",
    title: "Full-Stack Web Dev",
    subtitle: "Custom Web Applications & APIs",
    description:
      "Membangun aplikasi web berperforma tinggi, aman, dan scalable menggunakan React, Next.js, Laravel, dan database modern.",
    accent: "spider-red",
    accentBg: "bg-spider-red",
    shadowClass: "pop-shadow-red",
    icon: <Code2 size={24} strokeWidth={2.5} />,
    features: [
      "Custom React & Next.js Frontend",
      "Laravel / Node.js Robust Backend",
      "Database & REST API Integration",
      "SEO & High Performance Core Vitals",
    ],
  },
  {
    id: "ui-motion",
    eyebrow: "SUPERPOWER #02",
    title: "Interactive UI & Motion",
    subtitle: "Engaging & High-Converting Design",
    description:
      "Merancang antarmuka web interaktif yang responsif di semua device (Mobile & Desktop) dengan sentuhan mikro-animasi memukau.",
    accent: "spider-blue",
    accentBg: "bg-spider-blue",
    shadowClass: "pop-shadow-blue",
    icon: <Sparkles size={24} strokeWidth={2.5} />,
    features: [
      "100% Mobile Responsive Layout",
      "Smooth Micro-Animations & FX",
      "Clean UI/UX & High Clarity",
      "Accessible & Modern Aesthetics",
    ],
  },
  {
    id: "creative-crafts",
    eyebrow: "SUPERPOWER #03",
    title: "Multiverse & Game Crafts",
    subtitle: "3D, Video & Interactive Media",
    description:
      "Pengembangan game mechanics (Unity/C#), editing video cinematic, serta pembuatan aset 3D untuk media interaktif unik.",
    accent: "spider-yellow",
    accentBg: "bg-spider-yellow",
    shadowClass: "pop-shadow-yellow",
    icon: <Gamepad2 size={24} strokeWidth={2.5} />,
    features: [
      "Unity Game Dev & Logic",
      "Cinematic Video Editing",
      "3D Modeling Assets (Blender)",
      "Interactive Canvas & WebGL",
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
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="inline-block py-1.5 px-4 bg-spider-yellow comic-chip text-spider-black text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase pop-shadow-sm">
              SUPERPOWERS / CLIENT SERVICES
            </span>
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-comic-ink comic-stroke tracking-tight mb-4"
          >
            WHAT I CAN BUILD FOR YOU
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-comic-ink/70 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Solusi pengembangan digital ujung-ke-ujung (End-to-End) yang siap membantu ide bisnis atau proyek Anda tampil unggul dan berkesan.
          </motion.p>
        </motion.div>

        {/* Services Grid (1-Col Mobile, 3-Col Desktop) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              className={`group bg-comic-card comic-panel p-6 sm:p-7 rounded-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 ${service.shadowClass}`}
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-comic-surface border-2 border-comic-ink text-comic-ink">
                    {service.eyebrow}
                  </span>
                  <div
                    className={`w-12 h-12 ${service.accentBg} comic-chip flex items-center justify-center text-comic-ink shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-black text-comic-ink tracking-tight mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-spider-blue mb-4 uppercase tracking-wider">
                  {service.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-comic-ink/80 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t-2 border-comic-ink/10">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        strokeWidth={2.5}
                        className="text-spider-red shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-comic-ink/90">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link to Contact */}
              <a
                href="#contact"
                className="mt-2 inline-flex items-center justify-between w-full py-2.5 px-4 bg-comic-surface hover:bg-spider-yellow hover:text-spider-black border-2 border-comic-ink font-black text-xs uppercase tracking-wider transition-colors group/btn"
              >
                <span>Discuss Project</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="group-hover/btn:translate-x-1 transition-transform"
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
          className="mt-12 text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 py-2 px-4 bg-comic-panel border-2 border-comic-ink text-comic-ink text-xs font-bold rounded-full shadow-sm">
            <ShieldCheck size={16} className="text-spider-red shrink-0" />
            <span>Clear Code • Timely Delivery • 100% Mobile Optimized</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
