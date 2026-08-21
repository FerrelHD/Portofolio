"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Gamepad2,
  Radio,
  MapPin,
  X,
  Signal,
} from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";
import VideoModal from "./VideoModal";
import ProjectBriefModal from "./ProjectBriefModal";
import finesserShop from "../assets/Shop.webp";
import fersyaShop from "../assets/fersya-shop.webp";
import streetRush from "../assets/street-rush.webp";
import gunungGede from "../assets/image-1784710274754.webp";
import studentLife from "../assets/student-life.png";
import trackerSfx from "../assets/spidey_tracker_notification_sound.mp3";

const projects = [
  {
    id: 8,
    title: "Fersya Shop",
    category: "Web",
    image: fersyaShop,
    video: null,
    tech: ["Laravel", "Filament", "Tailwind"],
    link: "https://github.com/FerrelHD/Fersya-Shop",
    github: "https://github.com/FerrelHD/Fersya-Shop",
    sfx: "ZAP!",
    brief: {
      description: "E-commerce platform specializing in healthy foods, organic beverages, and body care products.",
      role: "Full-Stack Web Developer",
      highlights: [
        "Built custom Filament admin panels for real-time stock management and order webhooks in Laravel 11.",
        "Integrated responsive product showcase with tailored search and category filtering.",
        "Designed mobile-first UI with custom Tailwind CSS utility tokens."
      ]
    }
  },
  {
    id: 1,
    title: "Finesser Shop",
    category: "Web",
    image: finesserShop,
    video: null,
    tech: ["Laravel", "Bootstrap"],
    link: null,
    github: null,
    sfx: "BAM!",
    brief: {
      description: "Digital asset storefront offering high-quality templates, graphics, and design resources.",
      role: "Full-Stack Web Developer",
      highlights: [
        "Architected digital asset storefront with fast product browsing and instant downloads.",
        "Structured Laravel backend data models for digital product licensing.",
        "Implemented responsive UI layout using Bootstrap."
      ]
    }
  },
  {
    id: 7,
    title: "Student Life",
    category: "Web",
    image: studentLife,
    video: null,
    tech: ["React", "TypeScript", "Supabase"],
    link: "https://ferrelhd.github.io/Student-Life/",
    github: "https://github.com/FerrelHD/Student-Life",
    sfx: "WHAM!",
    brief: {
      description: "Web application for student productivity, task management, and academic schedule tracking.",
      role: "Frontend Developer & UI Designer",
      highlights: [
        "Developed type-safe React 19 interface with TypeScript for seamless task tracking.",
        "Connected real-time task sync and user authentication with Supabase backend.",
        "Designed clean progress dashboard with interactive calendar widgets."
      ]
    }
  },
  {
    id: 2,
    title: "Street Rush",
    category: "Game",
    image: streetRush,
    video: null,
    tech: ["Unity", "C#"],
    link: "https://github.com/FerrelHD/Street-Rush-Unity",
    github: null,
    sfx: "VROOOM!",
    brief: {
      description: "Fast-paced 3D arcade runner game engineered with Unity and C# physics.",
      role: "Game Developer & Physics Programmer",
      highlights: [
        "Optimized C# rigidbodies & obstacle spawner algorithms for mobile performance.",
        "Maintained steady 60 FPS frame rate on mobile devices.",
        "Programmed responsive player controls, score multipliers, and dynamic camera movement."
      ]
    }
  },
  {
    id: 3,
    title: "Trouble - Frank Ocean",
    category: "Video",
    image: "https://img.youtube.com/vi/WMrnRucy0qs/maxresdefault.jpg",
    video: null,
    tech: ["Vegas Pro 18"],
    link: "https://youtu.be/WMrnRucy0qs?si=AUsYV0JtfbiurBRP",
    github: null,
    sfx: "SHWIP!",
    brief: {
      description: "Cinematic anime music video edit synchronized with Frank Ocean's soundtrack.",
      role: "Video Editor & Motion Designer",
      highlights: [
        "Precision audio-visual beat matching and rhythmic cut timing.",
        "Custom speed ramping and motion blur transitions in Vegas Pro 18.",
        "Tailored color grading for immersive anime atmosphere."
      ]
    }
  },
  {
    id: 4,
    title: "Gunung Gede Via Gunung Putri",
    category: "Game",
    image: gunungGede,
    video: null,
    tech: ["Luau", "Roblox Studio"],
    link: "https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri",
    github: null,
    isRoblox: true,
    sfx: "THWIP!",
    brief: {
      description: "Immersive 3D hiking simulation game in Roblox Studio recreating Mount Gede's trail.",
      role: "Game Designer & Luau Programmer",
      highlights: [
        "Modelled realistic mountain terrain and atmospheric weather effects.",
        "Programmed custom hiking stamina mechanics, checkpoints, and inventory system in Luau.",
        "Published live on Roblox platform with active community player base."
      ]
    }
  },
  {
    id: 6,
    title: "New Tank - Playboy Carti AMV",
    category: "Video",
    image: "https://img.youtube.com/vi/-3f378UHMZE/maxresdefault.jpg",
    video: null,
    tech: ["Vegas Pro 18"],
    link: "https://youtu.be/-3f378UHMZE?si=n5UXtmRgw1766rHe",
    github: null,
    sfx: "KABOOM!",
    brief: {
      description: "High-tempo anime music video with aggressive rhythm cuts and stylized motion graphics.",
      role: "Video Editor & Sound Designer",
      highlights: [
        "Fast-paced frame timing matched to Playboi Carti's vocal cadence.",
        "Dynamic camera shakes, flash transitions, and custom sound design.",
        "Rendered in full 1080p 60 FPS for maximum visual punch."
      ]
    }
  },
];

const CATEGORY_COLORS = {
  Web: { bg: "bg-spider-blue", text: "text-comic-ink", pin: "#165DFF" },
  Video: { bg: "bg-spider-yellow", text: "text-spider-black", pin: "#FFD500" },
  Game: { bg: "bg-spider-red", text: "text-comic-ink", pin: "#FF1E26" },
};

const CATEGORY_ICONS = {
  Web: <Signal size={12} strokeWidth={2.5} />,
  Video: <Play size={12} fill="currentColor" strokeWidth={2.5} />,
  Game: <MapPin size={12} strokeWidth={2.5} />,
};

const ProjectCard = ({ project, onHover, onSelectVideo, onSelectBrief }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
    onHover && onHover(project.title);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHover && onHover(null);
  };

  const linkIcon =
    project.category === "Video" ? (
      <Play size={16} fill="currentColor" strokeWidth={2.5} />
    ) : project.isRoblox ? (
      <Gamepad2 size={16} strokeWidth={2.5} />
    ) : (
      <ArrowUpRight size={16} strokeWidth={2.5} />
    );

  const actionText = !project.link
    ? "No Live Demo"
    : project.category === "Video"
    ? "Watch Video"
    : project.category === "Game"
    ? "Play Mission"
    : "View Mission";

  const catColor = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.Web;

  return (
    <div style={{ perspective: "1000px" }} className="w-full flex justify-center p-2">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-[380px] sm:h-[450px] w-full max-w-[360px] sm:max-w-none tracker-card rounded-sm"
      >
        <CardWrapper
          project={project}
          onSelectVideo={onSelectVideo}
          href={project.link}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 block w-full h-full"
        >
          {/* TRACKER PIN MARKER */}
          <div
            className="tracker-pin"
            style={{
              backgroundColor: catColor.pin,
              boxShadow: `0 0 12px ${catColor.pin}`,
            }}
          >
            {CATEGORY_ICONS[project.category] || <MapPin size={12} />}
          </div>

          {/* SFX BUBBLE ON HOVER & TAP */}
          {project.sfx && (
            <div
              className="sfx-bubble absolute top-3 right-14 z-[20] pointer-events-none scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100 transition-all duration-200 ease-out origin-bottom-left"
              style={{ transform: "translateZ(75px) rotate(-6deg)" }}
            >
              <span className="inline-block bg-spider-yellow text-spider-black comic-chip px-2.5 py-1 text-[10px] sm:text-[11px] font-black italic tracking-widest uppercase pop-shadow-sm">
                {project.sfx}
              </span>
            </div>
          )}

          <div
            className="w-full h-full relative overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            {/* IMAGE */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.95) 100%)",
              }}
            />

            {/* HALFTONE DOT OVERLAY */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-ink-stroke) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            />

            {/* INNER BORDERS */}
            <div
              className="absolute inset-2 border-[1.5px] border-spider-black/70 pointer-events-none z-[7]"
              style={{ borderRadius: "1px" }}
            />

            {/* TOP-LEFT: CATEGORY BADGE */}
            <div className="absolute top-4 left-4 z-[10]">
              <span
                className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] comic-chip ${catColor.bg} ${catColor.text}`}
                style={{ transform: "translateZ(50px)" }}
              >
                {project.category}
              </span>
            </div>

            {/* TOP-RIGHT: LINK ICON */}
            {project.link && (
              <motion.span
                whileHover={{ scale: 1.12, rotate: "3deg" }}
                whileTap={{ scale: 0.92 }}
                aria-label={`View ${project.title}`}
                className="absolute top-4 right-4 z-[10] flex h-9 w-9 items-center justify-center comic-chip bg-white text-spider-black hover:bg-spider-yellow hover:text-spider-black transition-colors shadow-[2px_2px_0_#000]"
                style={{ transform: "translateZ(60px)" }}
              >
                {linkIcon}
              </motion.span>
            )}

            {/* BOTTOM CONTENT ZONE */}
            <div
              className="relative flex h-full flex-col justify-between p-5 sm:p-6 z-10 text-white"
              style={{ borderRadius: "inherit" }}
            >
              <div />

              <div style={{ transform: "translateZ(30px)" }}>
                {/* TECH STACK CHIPS */}
                <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-black uppercase tracking-[0.18em] text-spider-black bg-white border-2 border-black shadow-[1.5px_1.5px_0_#000] px-2.5 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* PROJECT TITLE */}
                <h3 className="text-xl sm:text-2xl font-black leading-[1.05] mb-4 text-white group-hover:text-spider-yellow transition-colors tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {project.title}
                </h3>

                {/* DUAL ACTION BUTTON ROW */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectBrief(project);
                    }}
                    className="flex-1 py-2.5 text-center text-[10px] font-black uppercase tracking-[0.15em] comic-chip bg-spider-yellow text-spider-black pop-shadow-sm hover:pop-shadow-active transition-colors z-20"
                  >
                    MISSION BRIEF
                  </button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 py-2.5 text-center text-[10px] font-black uppercase tracking-[0.15em] comic-chip transition-colors ${
                      project.link
                        ? "bg-spider-red text-white hover:bg-spider-yellow hover:text-spider-black pop-shadow-sm hover:pop-shadow-active"
                        : "bg-white text-spider-black/50 border-2 border-black/30 cursor-not-allowed"
                    }`}
                  >
                    {actionText}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </motion.div>
    </div>
  );
};

const CardWrapper = ({ project, onSelectVideo, children, ...props }) =>
  project.category === "Video" ? (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onSelectVideo(project);
      }}
      className="absolute inset-0 block w-full h-full text-left cursor-pointer"
      {...props}
    >
      {children}
    </button>
  ) : project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <div {...props}>{children}</div>
  );

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [justOpened, setJustOpened] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const audioRef = useRef(null);
  const categories = ["All", "Web", "Video", "Game"];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const playSfx = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleOpen = () => {
    playSfx();
    setIsOpen(true);
    setJustOpened(true);
    setTimeout(() => setJustOpened(false), 600);
  };

  const handleClose = () => {
    playSfx();
    setIsOpen(false);
  };

  const activeCount = filteredProjects.length;

  return (
    <motion.section
      id="projects"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 sm:py-28 relative overflow-hidden bg-spider-red text-white"
    >
      <audio ref={audioRef} src={trackerSfx} preload="auto" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 tracking-tighter uppercase text-white">
              Mission{" "}
              <span className="text-spider-yellow drop-shadow-[3px_3px_0_#000] italic">
                Archives
              </span>
            </h2>
            <p className="text-white/90 max-w-md font-medium text-sm sm:text-base">
              Curated missions across web development, video editing, 3D modeling, and game design.
            </p>
          </motion.div>
        </div>

        {/* SPIDEY TRACKER FRAME */}
        <motion.div
          variants={fadeUp}
          className={`tracker-frame ${justOpened ? "tracker-frame-on" : ""}`}
        >
          {/* TOP BAR */}
          <div className="tracker-bar bg-[#1A1A1A] text-white">
            <div className="flex items-center gap-3 min-w-0">
              <Radio size={18} strokeWidth={2.5} className="text-spider-yellow flex-shrink-0" />
              <span className="font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white truncate">
                Mission Archives Tracker
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:block font-black text-[10px] tracking-[0.18em] uppercase text-white/90">
                {isOpen ? `Active: ${activeCount}` : "Terminal Locked"}
              </span>
              <div
                className={`tracker-status-dot ${
                  isOpen ? "tracker-status-online" : "tracker-status-offline"
                }`}
              />
              <span
                className={`font-black text-[10px] tracking-[0.18em] uppercase ${
                  isOpen ? "text-spider-yellow" : "text-white/70"
                }`}
              >
                {isOpen ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
          </div>

          {/* INNER DISPLAY */}
          <div className="tracker-inner-display p-4 sm:p-6 md:p-10">
            {isOpen && <div className="tracker-sweep" />}

            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* STATE: OFFLINE — Open Button + Spidey menunjuk tombol */
                <motion.div
                  key="offline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-16 sm:py-24 relative z-10"
                >
                  <div className="flex flex-col items-center gap-8">
                    <div className="tracker-radar" />
                    <div className="text-center max-w-md">
                      <p className="text-comic-ink font-black text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                        Terminal Status: Locked
                      </p>
                      <p className="text-[#6B6661] text-[11px] sm:text-xs mb-8 tracking-wide font-medium">
                        Enter clearance key to display active mission archives
                      </p>
                      <button
                        onClick={handleOpen}
                        className="tracker-open-btn"
                      >
                        Activate Tracker
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* STATE: ONLINE — Filter + Project Cards + Spidey pojok kiri atas */
                <motion.div
                  key="online"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  {/* Filter Chips */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 md:mb-10 justify-center">
                    {categories.map((cat) => {
                      const isActive = filter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className={`px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] comic-chip transition-all ${
                            isActive
                              ? "bg-spider-yellow text-spider-black pop-shadow-sm hover:pop-shadow-active"
                              : "bg-white text-spider-black hover:bg-spider-yellow border-2 border-black"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  {/* PROJECT GRID */}
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project, idx) => (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9, y: 12 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { delay: idx * 0.06 },
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: -8 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <ProjectCard
                            project={project}
                            onHover={setHovered}
                            onSelectVideo={setActiveVideo}
                            onSelectBrief={setSelectedBrief}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER BAR */}
          <div className="tracker-footer">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Radio
                size={14}
                strokeWidth={2.5}
                className="text-spider-yellow flex-shrink-0"
              />
              <span className="truncate text-white font-bold tracking-wider">
                {!isOpen
                  ? "SELECTED: None — Awaiting activation"
                  : hovered
                  ? `LOCKED: ${hovered}`
                  : `Scanning ${activeCount} mission signatures...`}
              </span>
            </div>
            {isOpen && (
              <button
                onClick={handleClose}
                className="tracker-close-btn flex-shrink-0"
                title="Close Tracker"
              >
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* VIDEO MODAL PLAYER */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* PROJECT BRIEF MODAL */}
      <ProjectBriefModal project={selectedBrief} onClose={() => setSelectedBrief(null)} />
    </motion.section>
  );
};

export default Projects;
