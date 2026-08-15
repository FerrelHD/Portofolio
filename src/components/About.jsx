import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animation";

const About = () => {
  const stats = [
    { label: "Years Exp", value: "1+" },
    { label: "Projects", value: "5+" },
    { label: "Certifications", value: "2" },
  ];

  return (
    <motion.section 
      id="about" 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-off-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tighter uppercase">
            Beyond the <br /> <span className="text-primary">Pixels & Code</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-dark/70 mb-6 sm:mb-8 leading-relaxed">
            Hi! I'm <strong>Ferrel Rashad Akeyla</strong>, a multidisciplinary digital creator based in Indonesia. With expertise spanning <strong>Full Stack Web Development, Video Editing, 3D Modeling, and Game Development</strong>, I deliver creative solutions that blend visual aesthetics with technical excellence.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-dark/70 mb-8 sm:mb-12 leading-relaxed">
            I believe every project is an opportunity to create unique and immersive experiences, whether through responsive web applications, cinematic video storytelling, detailed 3D models, or interactive gaming worlds.
          </motion.p>

          <div className="grid grid-cols-3 gap-2 sm:gap-8 bg-white/50 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-dark/5 sm:border-none">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
              >
                <p className="text-3xl sm:text-4xl font-black text-primary mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-dark/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
