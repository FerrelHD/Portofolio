import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Play, Gamepad2 } from "lucide-react";
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

const ProjectCard = ({ project, onHoverChange }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHoverChange?.(false);
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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative h-[380px] w-[240px] sm:h-[420px] sm:w-[280px] rounded-2xl shadow-xl"
    >
      <div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="absolute inset-3 rounded-xl overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark/80" />

        <div className="relative flex h-full flex-col justify-between p-4 text-white">
          <div className="flex items-start justify-between">
            <span
              style={{ transform: "translateZ(30px)" }}
              className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {project.category}
            </span>
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: "8deg" }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Open ${project.title}`}
                style={{ transform: "translateZ(50px)" }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-primary"
              >
                {linkIcon}
              </motion.a>
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
                  className="text-[9px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-1 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 style={{ transform: "translateZ(40px)" }} className="text-lg font-black leading-tight mb-3">
              {project.title}
            </h3>
            <div
              style={{ transform: "translateZ(30px)" }}
              className="w-full rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md group-hover:bg-primary transition-colors"
            >
              {actionText}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function useResponsiveRadius(desktop, mobile) {
  const [radius, setRadius] = useState(desktop);

  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 768 ? mobile : desktop);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktop, mobile]);

  return radius;
}

const RadialItem = ({ project, x, y, rotationAngle, isActive, onHoverChange }) => {
  return (
    <li
      className="absolute top-1/2 left-1/2"
      style={{
        zIndex: isActive ? 20 : 10,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`,
      }}
    >
      {/* Cancels this item's static spoke angle so the card itself is upright. */}
      <div style={{ transform: `rotate(${-rotationAngle}deg)` }}>
        {/* Cancels the wheel's spin via a same-duration CSS animation - pure CSS
            keeps this in lockstep with the wheel, and pauses with it on
            :hover (see index.css) with zero JS timing involved. */}
        <div className="wheel-counter-spin">
          <motion.div
            animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -20 : 0 }}
          >
            <ProjectCard project={project} onHoverChange={onHoverChange} />
          </motion.div>
        </div>
      </div>
    </li>
  );
};

const RadialProjectGallery = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const radius = useResponsiveRadius(340, 160);
  const count = projects.length;

  if (count === 0) return null;

  return (
    <div
      className="relative h-[420px] sm:h-[520px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, transparent 0%, black 35%, black 100%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 35%, black 100%)",
      }}
    >
      {/* Wheel pauses on :hover natively (index.css) - no JS pause/resume timing to get wrong. */}
      <ul
        className="wheel-spin absolute left-1/2 -translate-x-1/2 m-0 p-0 list-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          bottom: -(radius * 2 * 0.55),
        }}
      >
        {projects.map((project, index) => {
          const angle = (index / count) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const rotationAngle = (angle * 180) / Math.PI + 90;

          return (
            <RadialItem
              key={project.id}
              project={project}
              x={x}
              y={y}
              rotationAngle={rotationAngle}
              isActive={hoveredIndex === index}
              onHoverChange={(hovered) => setHoveredIndex(hovered ? index : null)}
            />
          );
        })}
      </ul>
    </div>
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
              A curated selection of my work across web development, video editing, 3D modeling, and game design. Hover a card to pause and take a closer look.
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

        <RadialProjectGallery projects={filteredProjects} />
      </div>
    </motion.section>
  );
};

export default Projects;
