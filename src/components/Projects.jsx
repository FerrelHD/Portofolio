import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Play, Box, Gamepad2 } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";
import finesserShop from "../assets/Shop.png";
import streetRush from "../assets/street-rush.png";
import gunungGede from "../assets/image-1784710274754.webp";

const projects = [
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
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={isHovered ? {
        rotateY: mousePos.x * 20,
        rotateX: -mousePos.y * 20,
        y: -10,
        scale: 1.02,
      } : { rotateY: 0, rotateX: 0, y: 0, scale: 1 }}
      style={{ perspective: 1000 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-dark/5 shadow-sm hover:shadow-2xl transition-shadow duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        {/* Category Badge */}
        <div className="absolute top-6 left-6 z-20">
          <span className="px-4 py-1.5 rounded-full bg-dark/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-xl">
            {project.category}
          </span>
        </div>

        {/* Image Thumbnail */}
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isHovered ? 'scale-110 blur-[2px] brightness-50' : 'scale-100'}`}
        />

        {/* Video Preview */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-40' : 'opacity-0'}`}
          />
        )}
        
        {/* Overlay Content (Links) */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {project.link && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-white text-dark flex items-center justify-center shadow-2xl hover:bg-primary hover:text-white transition-colors group/btn"
            >
              {project.category === "Video" ? <Play size={24} fill="currentColor" /> : project.isRoblox ? <Gamepad2 size={24} /> : project.category === "3D" ? <Box size={24} /> : <ExternalLink size={24} />}
            </motion.a>
          )}
          {project.github && (
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.github} 
              className="w-14 h-14 rounded-2xl bg-white text-dark flex items-center justify-center shadow-2xl hover:bg-primary hover:text-white transition-colors"
            >
              <Github size={24} />
            </motion.a>
          )}
        </div>
      </div>

      <div className="p-8 relative bg-white">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t, idx) => (
            <motion.span 
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="text-[9px] font-black uppercase tracking-widest text-dark/40 bg-off-white px-3 py-1.5 rounded-lg border border-dark/5 group-hover:border-primary/20 group-hover:text-primary transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
        <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">
          {project.title}
        </h3>
        
        {/* Decorative arrow that appears on hover */}
        <div className={`absolute bottom-8 right-8 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <ExternalLink size={20} className="text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

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
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div variants={fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
              Portfolio <span className="text-primary">Showcase</span>
            </h2>
            <p className="text-dark/50 max-w-md font-medium">
              A curated selection of my work across web development, video editing, 3D modeling, and game design. Hover over cards to see a preview.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
