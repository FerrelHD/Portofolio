import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Video, Box, Gamepad2, Database } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";

const skillCategories = [
  {
    title: "Web Development",
    icon: <Layout className="text-primary" />,
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Node.js / Express", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "TypeScript", level: 80 },
    ]
  },
  {
    title: "Creative Arts",
    icon: <Video className="text-primary" />,
    skills: [
      { name: "Video Editing", level: 88 },
      { name: "3D Modeling (Blender)", level: 82 },
      { name: "Color Grading", level: 85 },
      { name: "Motion Graphics", level: 75 },
    ]
  },
  {
    title: "Game Development",
    icon: <Gamepad2 className="text-primary" />,
    skills: [
      { name: "Unity / C#", level: 80 },
      { name: "Unreal Engine", level: 70 },
      { name: "Game Design", level: 85 },
      { name: "Level Building", level: 78 },
    ]
  }
];

const Skills = () => {
  return (
    <motion.section 
      id="skills" 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-off-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tighter uppercase">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
          <p className="text-dark/50 max-w-lg mx-auto font-medium text-sm sm:text-base">
            A comprehensive overview of my technical skills and proficiency in various creative and technical fields.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-dark/5 border border-dark/5"
            >
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">{cat.title}</h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {cat.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-dark/60">{skill.name}</span>
                      <span className="text-xs sm:text-sm font-black text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-off-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
