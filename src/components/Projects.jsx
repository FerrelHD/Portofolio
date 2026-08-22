"use client";
import { useState, useRef } from "react";
import {
  ArrowUpRight,
  Play,
  Gamepad2,
  Radio,
  MapPin,
  Signal,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoModal from "./VideoModal";
import ProjectBriefModal from "./ProjectBriefModal";

import finesserShop from "../assets/Shop.webp";
import fersyaShop from "../assets/fersya-shop.webp";
import streetRush from "../assets/street-rush.webp";
import gunungGede from "../assets/image-1784710274754.webp";
import studentLife from "../assets/student-life.png";
import trackerSfx from "../assets/spidey_tracker_notification_sound.mp3";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 8,
    title: "Fersya Shop",
    category: "Web",
    image: fersyaShop,
    video: null,
    tech: ["Laravel 11", "Filament", "Tailwind"],
    link: "https://github.com/FerrelHD/Fersya-Shop",
    github: "https://github.com/FerrelHD/Fersya-Shop",
    sfx: "ZAP!",
    issueNumber: "ISSUE #08",
    brief: {
      description:
        "E-commerce platform specializing in healthy foods, organic beverages, and body care products.",
      role: "Full-Stack Web Developer",
      highlights: [
        "Built custom Filament admin panels for real-time stock management and order webhooks in Laravel 11.",
        "Integrated responsive product showcase with tailored search and category filtering.",
        "Designed mobile-first UI with custom Tailwind CSS utility tokens.",
      ],
    },
  },
  {
    id: 1,
    title: "Finesser Shop",
    category: "Web",
    image: finesserShop,
    video: null,
    tech: ["Laravel", "Bootstrap", "MySQL"],
    link: null,
    github: null,
    sfx: "BAM!",
    issueNumber: "ISSUE #01",
    brief: {
      description:
        "Digital asset storefront offering high-quality templates, graphics, and design resources.",
      role: "Full-Stack Web Developer",
      highlights: [
        "Architected digital asset storefront with fast product browsing and instant downloads.",
        "Structured Laravel backend data models for digital product licensing.",
        "Implemented responsive UI layout using Bootstrap.",
      ],
    },
  },
  {
    id: 7,
    title: "Student Life",
    category: "Web",
    image: studentLife,
    video: null,
    tech: ["React 19", "TypeScript", "Supabase"],
    link: "https://ferrelhd.github.io/Student-Life/",
    github: "https://github.com/FerrelHD/Student-Life",
    sfx: "WHAM!",
    issueNumber: "ISSUE #07",
    brief: {
      description:
        "Web application for student productivity, task management, and academic schedule tracking.",
      role: "Frontend Developer & UI Designer",
      highlights: [
        "Developed type-safe React 19 interface with TypeScript for seamless task tracking.",
        "Connected real-time task sync and user authentication with Supabase backend.",
        "Designed clean progress dashboard with interactive calendar widgets.",
      ],
    },
  },
  {
    id: 2,
    title: "Street Rush",
    category: "Game",
    image: streetRush,
    video: null,
    tech: ["Unity", "C#", "Mobile 3D"],
    link: "https://github.com/FerrelHD/Street-Rush-Unity",
    github: null,
    sfx: "VROOOM!",
    issueNumber: "ISSUE #02",
    brief: {
      description: "Fast-paced 3D arcade runner game engineered with Unity and C# physics.",
      role: "Game Developer & Physics Programmer",
      highlights: [
        "Optimized C# rigidbodies & obstacle spawner algorithms for mobile performance.",
        "Maintained steady 60 FPS frame rate on mobile devices.",
        "Programmed responsive player controls, score multipliers, and dynamic camera movement.",
      ],
    },
  },
  {
    id: 3,
    title: "Trouble - Frank Ocean",
    category: "Video",
    image: "https://img.youtube.com/vi/WMrnRucy0qs/maxresdefault.jpg",
    video: null,
    tech: ["Vegas Pro 18", "Color Grading"],
    link: "https://youtu.be/WMrnRucy0qs?si=AUsYV0JtfbiurBRP",
    github: null,
    sfx: "SHWIP!",
    issueNumber: "ISSUE #03",
    brief: {
      description:
        "Cinematic anime music video edit synchronized with Frank Ocean's soundtrack.",
      role: "Video Editor & Motion Designer",
      highlights: [
        "Precision audio-visual beat matching and rhythmic cut timing.",
        "Custom speed ramping and motion blur transitions in Vegas Pro 18.",
        "Tailored color grading for immersive anime atmosphere.",
      ],
    },
  },
  {
    id: 4,
    title: "Gunung Gede Via Gunung Putri",
    category: "Game",
    image: gunungGede,
    video: null,
    tech: ["Luau", "Roblox Studio", "Terrain"],
    link: "https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri",
    github: null,
    isRoblox: true,
    sfx: "THWIP!",
    issueNumber: "ISSUE #04",
    brief: {
      description:
        "Immersive 3D hiking simulation game in Roblox Studio recreating Mount Gede's trail.",
      role: "Game Designer & Luau Programmer",
      highlights: [
        "Modelled realistic mountain terrain and atmospheric weather effects.",
        "Programmed custom hiking stamina mechanics, checkpoints, and inventory system in Luau.",
        "Published live on Roblox platform with active community player base.",
      ],
    },
  },
  {
    id: 6,
    title: "New Tank - Carti AMV",
    category: "Video",
    image: "https://img.youtube.com/vi/-3f378UHMZE/maxresdefault.jpg",
    video: null,
    tech: ["Vegas Pro 18", "Motion Graphics"],
    link: "https://youtu.be/-3f378UHMZE?si=n5UXtmRgw1766rHe",
    github: null,
    sfx: "KABOOM!",
    issueNumber: "ISSUE #06",
    brief: {
      description:
        "High-tempo anime music video with aggressive rhythm cuts and stylized motion graphics.",
      role: "Video Editor & Sound Designer",
      highlights: [
        "Fast-paced frame timing matched to Playboi Carti's vocal cadence.",
        "Dynamic camera shakes, flash transitions, and custom sound design.",
        "Rendered in full 1080p 60 FPS for maximum visual punch.",
      ],
    },
  },
];

const CATEGORY_COLORS = {
  Web: { bg: "bg-spider-blue", text: "text-comic-ink", pin: "#165DFF" },
  Video: { bg: "bg-spider-yellow", text: "text-spider-black", pin: "#FFD500" },
  Game: { bg: "bg-spider-red", text: "text-white", pin: "#FF1E26" },
};

const CATEGORY_ICONS = {
  Web: <Signal size={12} strokeWidth={2.5} />,
  Video: <Play size={12} fill="currentColor" strokeWidth={2.5} />,
  Game: <MapPin size={12} strokeWidth={2.5} />,
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const bgMarqueeRef = useRef(null);
  const audioRef = useRef(null);

  const categories = ["All", "Web", "Video", "Game"];
  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // CSS Sticky + GSAP Scroll Scrub Parallax (Full Red Screen Entrance ➔ Smooth Horizontal Glide)
  useGSAP(
    () => {
      const track = horizontalTrackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 200;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Track horizontal parallax: Starts offscreen right (Full Red Screen) ➔ glides across
        gsap.fromTo(
          track,
          { x: () => window.innerWidth * 0.85 },
          {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2, // Silky smooth parallax scrub
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setScrollProgress(Math.round(self.progress * 100));
              },
            },
          }
        );

        // Background Parallax Marquee
        if (bgMarqueeRef.current) {
          gsap.fromTo(
            bgMarqueeRef.current,
            { x: -100 },
            {
              x: 300,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [filteredProjects] }
  );

  const playSfx = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.65;
        audioRef.current.play().catch(() => {});
      }
    } catch {
      // Audio playback fallback
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-spider-red text-white md:h-[350vh] h-auto select-none"
    >
      <audio ref={audioRef} src={trackerSfx} preload="auto" />

      {/* STICKY VIEWPORT CONTAINER (Native CSS Sticky for Zero-Snap Entry, Sized for All Laptops) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-3 sm:pb-4 md:pb-6">
        
        {/* BACKGROUND GIANT MARQUEE */}
        <div
          ref={bgMarqueeRef}
          className="absolute top-[28%] left-0 whitespace-nowrap pointer-events-none opacity-10 select-none z-0 will-change-transform"
        >
          <span
            className="text-[20vw] font-black uppercase tracking-tighter text-white leading-none"
            style={{ WebkitTextStroke: "3px #FFFFFF" }}
          >
            MISSION ARCHIVES • TOP CLEARANCE • 
          </span>
        </div>

        {/* TOP BAR: Header & Mission Controls */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b-2 border-white/25">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-spider-yellow text-spider-black px-2.5 py-0.5 border-2 border-black font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] mb-1.5 -rotate-1">
                <Radio size={12} className="animate-pulse text-red-600" />
                MISSION SHOWCASE
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                MISSION{" "}
                <span
                  className="text-spider-yellow italic inline-block px-1"
                  style={{
                    textShadow:
                      "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 2px 4px 0 #165DFF, 4px 6px 0 #000",
                  }}
                >
                  ARCHIVES
                </span>
              </h2>
            </div>

            {/* Filter Chips & Radar Progress */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex gap-1 bg-black/40 p-1 border-2 border-black rounded-sm backdrop-blur-sm">
                {categories.map((cat) => {
                  const isActive = filter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        playSfx();
                        setFilter(cat);
                      }}
                      className={`px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-spider-yellow text-spider-black shadow-[2px_2px_0_#000]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Radar Scroll Gauge */}
              <div className="hidden md:flex items-center gap-2 bg-white text-spider-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0_#000]">
                <span className="text-[9px] font-black tracking-widest uppercase">
                  RADAR: {scrollProgress}%
                </span>
                <div className="w-14 h-2 bg-gray-200 border border-black overflow-hidden">
                  <div
                    className="h-full bg-[#FF1E26] transition-all duration-75"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK (WITH PARALLAX ENTRANCE FROM RIGHT) */}
        <div className="w-full relative z-10 my-auto py-1 sm:py-2 overflow-hidden">
          <div
            ref={horizontalTrackRef}
            className="flex md:flex-row flex-col md:flex-nowrap gap-4 sm:gap-6 px-4 sm:px-12 md:px-16 w-full md:w-max overflow-x-auto md:overflow-visible items-stretch will-change-transform"
          >
            {/* INITIAL RECON BRIEFING CARD (PIONEER STAGE) */}
            <div className="hidden md:flex shrink-0 w-[260px] lg:w-[300px] h-[360px] sm:h-[390px] md:h-[410px] lg:h-[430px] bg-[#FAF8F5] text-comic-ink border-3 border-black shadow-[6px_6px_0_#000] p-4 sm:p-5 rounded-sm flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 halftone-overlay-sm opacity-15 pointer-events-none" />
              <div className="relative z-10">
                <span className="bg-spider-red text-white text-[8px] font-black uppercase px-2 py-0.5 border border-black rounded shadow-[1px_1px_0_#000] inline-block mb-2.5">
                  SECTOR RECON // ACTIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-comic-ink mb-2">
                  TOP-SECRET MISSION FILES
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-comic-ink/80 mb-3">
                  Traverse classified deployments across Full Stack Web, Game Engineering, and Multimedia.
                </p>
                <div className="bg-spider-yellow text-spider-black p-2.5 border-2 border-black rounded shadow-[2px_2px_0_#000]">
                  <p className="text-[9px] font-black uppercase tracking-wider">
                    👉 SCROLL TO COMMENCE RECON
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t-2 border-black/15 flex items-center justify-between text-[8.5px] font-black text-comic-ink/70">
                <span>{filteredProjects.length} DOSSIERS FOUND</span>
                <span className="text-spider-red animate-pulse">● TRACKER ONLINE</span>
              </div>
            </div>

            {/* PROJECT CARDS */}
            {filteredProjects.map((project) => {
              const catColor = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.Web;
              const linkIcon =
                project.category === "Video" ? (
                  <Play size={14} fill="currentColor" />
                ) : project.isRoblox ? (
                  <Gamepad2 size={14} />
                ) : (
                  <ArrowUpRight size={14} />
                );

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    playSfx();
                    setSelectedBrief(project);
                  }}
                  className="group relative w-full md:w-[320px] lg:w-[360px] shrink-0 h-[360px] sm:h-[390px] md:h-[410px] lg:h-[430px] bg-comic-panel border-3 border-black shadow-[6px_6px_0_#000] hover:shadow-[10px_10px_0_#000] hover:-translate-y-1 transition-all duration-200 rounded-sm overflow-hidden flex flex-col justify-between p-4 sm:p-5 cursor-pointer"
                >
                  {/* Background Card Image with Halftone */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
                        backgroundSize: "6px 6px",
                      }}
                    />
                  </div>

                  {/* Card Top: Issue Badge & SFX Pop */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="inline-block bg-black text-yellow-400 border-2 border-black px-2 py-0.5 text-[8.5px] font-black uppercase tracking-[0.2em] shadow-[1.5px_1.5px_0_#FFF]">
                        {project.issueNumber}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider border-2 border-black ${catColor.bg} ${catColor.text} shadow-[1.5px_1.5px_0_#000]`}
                      >
                        {CATEGORY_ICONS[project.category]}
                        {project.category}
                      </span>
                    </div>

                    {project.sfx && (
                      <span className="bg-spider-yellow text-spider-black px-2 py-0.5 text-[10px] font-black italic tracking-widest uppercase border-2 border-black shadow-[2px_2px_0_#000] -rotate-6 group-hover:scale-110 transition-transform">
                        {project.sfx}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom: Info & Action Buttons */}
                  <div className="relative z-10">
                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-black bg-white border border-black px-1.5 py-0.5 shadow-[1px_1px_0_#000]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight mb-2.5 sm:mb-3 group-hover:text-yellow-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {project.title}
                    </h3>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSfx();
                          setSelectedBrief(project);
                        }}
                        className="flex-1 py-2 text-center text-[9px] sm:text-[9.5px] font-black uppercase tracking-[0.15em] bg-spider-yellow hover:bg-yellow-300 text-spider-black border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                      >
                        MISSION BRIEF
                      </button>

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSfx();
                          }}
                          className="px-3.5 py-2 bg-[#FF1E26] hover:bg-red-700 text-white border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider"
                        >
                          <span>LAUNCH</span>
                          {linkIcon}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSfx();
                            setSelectedBrief(project);
                          }}
                          className="px-3 py-2 bg-white/70 text-black border-2 border-black text-[9px] font-black uppercase cursor-pointer"
                        >
                          INFO
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM RADAR TICKER (ALIGNED TO RIGHT) */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-2 border-t-2 border-white/20 flex items-center justify-end text-[11px] font-bold text-white/80">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
            TERMINAL ONLINE: SCROLL TO TRAVERSE {filteredProjects.length} MISSIONS
          </span>
        </div>
      </div>

      {/* VIDEO MODAL PLAYER */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* PROJECT BRIEF MODAL */}
      <ProjectBriefModal project={selectedBrief} onClose={() => setSelectedBrief(null)} />
    </section>
  );
}
