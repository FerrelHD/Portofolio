import React from "react";
import { motion } from "framer-motion";
import { Github, Code2, Briefcase, Zap, Cpu } from "lucide-react";
import { fadeUp, slideUp, staggerContainer } from "../lib/animation";

const Hero = () => {
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.section 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Watermark Background */}
      <div className="watermark-text">
        RASHAD
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="mb-4 sm:mb-6">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              Ferrel Rashad Akeyla
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tighter flex flex-col items-center"
          >
            <div className="overflow-hidden px-4 -mx-4 py-1 -my-1">
              <motion.span variants={slideUp} className="inline-block">DIGITAL</motion.span>
            </div>
            <div className="overflow-hidden px-4 -mx-4 py-1 -my-1">
              <motion.span variants={slideUp} className="text-primary italic inline-block">CREATOR</motion.span>
            </div>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-dark/60 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium px-2"
          >
            Full Stack Web Developer, Video Editor, 3D Modeler, and Game Developer building immersive digital experiences.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 sm:px-0 max-w-xs sm:max-w-none mx-auto">
            <a href="#projects" className="bg-dark text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-primary transition-all hover:scale-105 active:scale-95 shadow-xl shadow-dark/10 text-center">
              View My Work
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv.pdf`}
              download="CV_Ferrel_Rashad_Akeyla.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-dark/5 px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:border-primary transition-all hover:scale-105 active:scale-95 text-center"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Floating Info Cards */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[15%] right-[5%] hidden xl:block"
        >
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-dark/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Code2 size={24} />
            </div>
            <div>
              <p className="text-xs text-dark/40 font-bold uppercase tracking-wider">Web Dev</p>
              <p className="font-bold">Full Stack</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute bottom-[15%] left-[2%] hidden xl:block"
        >
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-dark/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-xs text-dark/40 font-bold uppercase tracking-wider">Creative</p>
              <p className="font-bold">Video & 3D</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-[25%] right-[2%] hidden xl:block"
        >
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-dark/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-dark/5 flex items-center justify-center text-dark">
              <Cpu size={24} />
            </div>
            <div>
              <p className="text-xs text-dark/40 font-bold uppercase tracking-wider">Gaming</p>
              <p className="font-bold">Game Dev</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
