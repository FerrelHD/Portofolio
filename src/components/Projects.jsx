import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Gamepad2 } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";
import finesserShop from "../assets/Shop.png";
import fersyaShop from "../assets/fersya-shop.png";
import streetRush from "../assets/street-rush.png";
import gunungGede from "../assets/image-1784710274754.webp";
import studentLife from "../assets/student-life.jpg";

const projects = [
  {
    id: 8,
    title: "Fersya Shop",
    category: "Web",
    image: fersyaShop,
    video: null,
    tech: ["Laravel", "Filament", "Tailwind"],
    link: "https://github.com/FerrelHD/Fersya-Shop",
    github: "https://github.com/FerrelHD/Fersya-Shop"
  },
  {
    id: 1,
    title: "Finesser Shop",
    category: "Web",
    image: finesserShop,
    video: null,
    tech: ["Laravel", "Bootstrap"],
    link: null,
    github: null
  },
  {
    id: 7,
    title: "Student Life",
    category: "Web",
    image: studentLife,
    video: null,
    tech: ["React", "TypeScript", "Supabase"],
    link: "https://ferrelhd.github.io/Student-Life/",
    github: "https://github.com/FerrelHD/Student-Life"
  },
  {
    id: 2,
    title: "Street Rush",
    category: "Game",
    image: streetRush,
    video: null,
    tech: ["Unity", "C#"],
    link: "https://github.com/FerrelHD/Street-Rush-Unity",
    github: null
  },
  {
    id: 3,
    title: "Trouble - Frank Ocean",
    category: "Video",
    image: "https://img.youtube.com/vi/WMrnRucy0qs/maxresdefault.jpg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    tech: ["Vegas Pro 18"],
    link: "https://youtu.be/WMrnRucy0qs?si=AUsYV0JtfbiurBRP",
    github: null
  },
  {
    id: 4,
    title: "Gunung Gede Via Gunung Putri",
    category: "Game",
    image: gunungGede,
    video: "https://assets.mixkit.co/videos/preview/mixkit-person-playing-a-first-person-shooter-video-game-close-up-34533-large.mp4",
    tech: ["Luau", "Roblox Studio"],
    link: "https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri",
    github: null,
    isRoblox: true
  },
  {
    id: 6,
    title: "New Tank - Playboy Carti AMV",
    category: "Video",
    image: "https://img.youtube.com/vi/-3f378UHMZE/maxresdefault.jpg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-creative-workspace-with-computer-and-plants-close-up-1731-large.mp4",
    tech: ["Vegas Pro 18"],
    link: "https://youtu.be/-3f378UHMZE?si=n5UXtmRgw1766rHe",
    github: null
  }
];

const ProjectCard = ({ project }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const linkIcon = project.category === "Video"
    ? <Play size={18} fill="currentColor" />
    : project.isRoblox
    ? <Gamepad2 size={18} />
    : <ArrowUpRight size={18} />;

  const actionText = !project.link
    ? "No Live Demo"
    : project.category === "Video"
    ? "Watch Video"
    : project.category === "Game"
    ? "Play Game"
    : "View Project";

  return (
    <div style={{ perspective: "1000px" }} className="w-full flex justify-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[380px] w-full sm:h-[420px] rounded-2xl bg-transparent shadow-2xl border border-dark/10 overflow-hidden"
      >
        <CardWrapper
          href={project.link}
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 rounded-2xl overflow-hidden block"
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-b from-black/30 via-transparent to-black/90" />

          <div className="relative flex h-full flex-col justify-between rounded-2xl p-5 text-white z-10">
            <div className="flex items-start justify-between">
              <span
                style={{ transform: "translateZ(40px)" }}
                className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]"
              >
                {project.category}
              </span>
              {project.link && (
                <motion.span
                  whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View ${project.title}`}
                  style={{ transform: "translateZ(60px)" }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/30"
                >
                  {linkIcon}
                </motion.span>
              )}
            </div>

            <div>
              <div
                style={{ transform: "translateZ(30px)" }}
                className="mb-3 flex flex-wrap gap-1.5"
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold uppercase tracking-widest text-white/80 bg-white/15 px-2.5 py-1 rounded-md backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3
                style={{ transform: "translateZ(50px)" }}
                className="text-xl font-black leading-tight mb-3 group-hover:text-primary transition-colors"
              >
                {project.title}
              </h3>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ transform: "translateZ(40px)" }}
                className="w-full rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors"
              >
                {actionText}
              </motion.div>
            </div>
          </div>
        </CardWrapper>
      </motion.div>
    </div>
  );
};

const CardWrapper = ({ href, children, ...props }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <div {...props}>{children}</div>
  );

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web", "Video", "Game"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <motion.section 
      id="projects" 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tighter uppercase">
              Portfolio <span className="text-primary">Showcase</span>
            </h2>
            <p className="text-dark/50 max-w-md font-medium text-sm sm:text-base">
              A curated selection of my work across web development, video editing, 3D modeling, and game design.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  filter === cat 
                    ? "bg-dark text-white" 
                    : "bg-off-white text-dark/40 hover:bg-dark/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
