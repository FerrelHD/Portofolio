import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimeBackground from "./components/AnimeBackground";
import BackToTop from "./components/BackToTop";
import PageLoader from "./components/PageLoader";
import ScrollFX from "./components/ScrollFX";
import SmoothScroll from "./components/SmoothScroll";
import AchievementToast from "./components/AchievementToast";
import ComicTicker from "./components/ComicTicker";
import StickyComicTicker from "./components/StickyComicTicker";
import { achievementManager } from "./lib/achievements";
import { soundFX } from "./lib/soundFx";

// Lazy Loaded Modal & Heavy Canvas Game Components (Code Splitting for Fast Initial Load)
const DailyBugleModal = lazy(() => import("./components/DailyBugleModal"));
const SpideyBugHunter = lazy(() => import("./components/SpideyBugHunter"));
const ShortcutsModal = lazy(() => import("./components/ShortcutsModal"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const SpiderGadgetDrawer = lazy(() => import("./components/SpiderGadgetDrawer"));
const ComicActionFX = lazy(() => import("./components/ComicActionFX"));
const PortfolioDeckModal = lazy(() => import("./components/PortfolioDeckModal"));
const KineticMenu = lazy(() => import("./components/KineticMenu"));
const ParkerLabTerminal = lazy(() => import("./components/ParkerLabTerminal"));


// Skill Real Asset Icons
import reactIcon from "./assets/React-icon.svg.webp";
import tailwindIcon from "./assets/tailwind.svg";
import typescriptIcon from "./assets/typescript-logo-png-svg.webp";
import nodejsIcon from "./assets/nodejs.webp";
import videoEditIcon from "./assets/video-editing-icon.webp";
import framerIcon from "./assets/framer-motion-icon.png";
import blenderIcon from "./assets/Blender_logo_no_text.svg.webp";
import unityIcon from "./assets/unityicon.png";
import figmaIcon from "./assets/figma-logo-png-svg.webp";
import sqlIcon from "./assets/sql icon 2.png";
import aiAgentIcon from "./assets/ai-agent-removebg-preview.png";
import spiderEmblem from "./assets/spideyicon.png";

const HERO_TICKER_ITEMS = [
  { text: "THE DAILY BUGLE: WHO IS THIS FULLSTACK HERO?", icon: spiderEmblem },
  { text: "CRAFTING PRODUCTION-GRADE REACT & NEXT.JS APPS", icon: reactIcon },
  { text: "CLEAN ARCHITECTURES & ROBUST TYPE-SAFETY", icon: typescriptIcon },
  { text: "HIGH-PERFORMANCE BACKEND API PIPELINES", icon: nodejsIcon },
  { text: "CINEMATIC PACING & VIRAL VIDEO PRODUCTION", icon: videoEditIcon },
  { text: "60 FPS INTERACTIVE FLUID UI MOTION", icon: framerIcon },
];

const TECH_TICKER_ITEMS = [
  { text: "REACT 19 & NEXT.JS FULLSTACK MASTERY", icon: reactIcon },
  { text: "TAILWIND CSS STYLED TO PERFECTION", icon: tailwindIcon },
  { text: "TYPESCRIPT PRODUCTION EXCELLENCE", icon: typescriptIcon },
  { text: "3D BLENDER MULTIVERSE VISUAL ASSETS", icon: blenderIcon },
  { text: "UNITY ARCADE COMBAT GAME SYSTEMS", icon: unityIcon },
  { text: "FIGMA COMIC UI/UX SYSTEM ARCHITECTURE", icon: figmaIcon },
  { text: "SCALABLE SQL & NOSQL DATA STRUCTURES", icon: sqlIcon },
  { text: "NEXT-GEN AGENTIC AI WORKFLOWS", icon: aiAgentIcon },
];

function App() {
  const [spiderSense, setSpiderSense] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [dailyBugleOpen, setDailyBugleOpen] = useState(false);
  const [bugHunterOpen, setBugHunterOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [kineticMenuOpen, setKineticMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("spidey-view-mode") || "hero";
    }
    return "hero";
  });
  const senseTimer = useRef(null);

  const triggerSpiderSense = useCallback(() => {
    if (senseTimer.current) return; // throttle: tidak trigger lagi sambil aktif
    setSpiderSense(true);
    soundFX.playSenseBuzz();
    achievementManager.unlock("spider_sense");

    if (typeof document !== "undefined") {
      document.body.classList.add("spider-sense-active");
    }
    // Durasi: 6 x 0.35s = 2.1s (sesuai CSS animation-iteration-count: 6)
    senseTimer.current = setTimeout(() => {
      setSpiderSense(false);
      if (typeof document !== "undefined") {
        document.body.classList.remove("spider-sense-active");
      }
      senseTimer.current = null;
    }, 2200);
  }, []);

  // Track scrolling to unlock True Believer achievement
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
        if (scrolledToBottom) {
          achievementManager.unlock("true_believer");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync viewMode to body attribute & localStorage
  useEffect(() => {
    document.body.setAttribute("data-view-mode", viewMode);
    localStorage.setItem("spidey-view-mode", viewMode);
  }, [viewMode]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "hero" ? "executive" : "hero"));
  }, []);

  // Listen to custom spidey:open-deck event
  useEffect(() => {
    const onOpenDeck = () => setDeckOpen(true);
    window.addEventListener("spidey:open-deck", onOpenDeck);
    return () => window.removeEventListener("spidey:open-deck", onOpenDeck);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      // Jangan tangkap event jika user sedang mengetik di input / textarea
      const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
      const editable =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        (e.target && typeof e.target.isContentEditable === "boolean" && e.target.isContentEditable);

      // ESC: close all modals
      if (e.key === "Escape") {
        setShortcutsOpen(false);
        setCmdOpen(false);
        setDailyBugleOpen(false);
        setBugHunterOpen(false);
        setDeckOpen(false);
        setTerminalOpen(false);
        return;
      }

      // Cmd + K or Ctrl + K: open Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
        return;
      }

      if (editable) return;

      // ? or Shift + / (US keyboard) = open shortcuts
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
        return;
      }

      // S (huruf s saja tanpa modifier) = Spider Sense
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "s" || e.key === "S")) {
        triggerSpiderSense();
        return;
      }

      // N or B = Daily Bugle Newspaper
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        setDailyBugleOpen((prev) => !prev);
        return;
      }

      // G = Spidey Bug Hunter Game
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "g" || e.key === "G")) {
        e.preventDefault();
        setBugHunterOpen((prev) => !prev);
        return;
      }

      // E = Portfolio Pitch Deck & PDF Generator
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "e" || e.key === "E")) {
        e.preventDefault();
        setDeckOpen((prev) => !prev);
        return;
      }


      // P = Toggle Play / Pause BGM
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("spidey:toggle-bgm"));
        return;
      }

      // M = Toggle Mute / Unmute Audio
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("spidey:toggle-mute"));
        return;
      }

      // D = Toggle Spider Gadget Dock
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "d" || e.key === "D")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("spidey:toggle-dock"));
        return;
      }

      // T = Toggle Parker Lab Terminal
      if (!e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      // Hotkey 1 - 6 untuk navigasi cepat antar section
      const sectionKeys = {
        "1": "#hero",
        "2": "#about",
        "3": "#services",
        "4": "#projects",
        "5": "#skills",
        "6": "#contact",
      };

      if (!e.metaKey && !e.ctrlKey && !e.altKey && sectionKeys[e.key]) {
        if (e.key === "1") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          soundFX.playBeep(450);
        } else {
          const targetEl = document.querySelector(sectionKeys[e.key]);
          if (targetEl) {
            soundFX.playBeep(420 + parseInt(e.key, 10) * 40);
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (senseTimer.current) clearTimeout(senseTimer.current);
      if (typeof document !== "undefined") {
        document.body.classList.remove("spider-sense-active");
      }
    };
  }, [triggerSpiderSense]);

  return (
    <div className="relative">
      <SmoothScroll />
      <ScrollFX />
      <PageLoader />

      {/* Global Interactive Overlays */}
      <AchievementToast />

      {/* Lazy Loaded Interactive Overlays & Modals */}
      <Suspense fallback={null}>
        <ComicActionFX />
        {dailyBugleOpen && (
          <DailyBugleModal isOpen={dailyBugleOpen} onClose={() => setDailyBugleOpen(false)} />
        )}
        {bugHunterOpen && (
          <SpideyBugHunter isOpen={bugHunterOpen} onClose={() => setBugHunterOpen(false)} />
        )}
        {deckOpen && (
          <PortfolioDeckModal isOpen={deckOpen} onClose={() => setDeckOpen(false)} />
        )}
        {shortcutsOpen && (
          <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
        )}
        {cmdOpen && (
          <CommandPalette
            open={cmdOpen}
            onClose={() => setCmdOpen(false)}
            onOpenDailyBugle={() => setDailyBugleOpen(true)}
            onOpenBugHunter={() => setBugHunterOpen(true)}
            onOpenDeck={() => setDeckOpen(true)}
            onOpenTerminal={() => { setCmdOpen(false); setTerminalOpen(true); }}
            onToggleViewMode={toggleViewMode}
            viewMode={viewMode}
            triggerSpiderSense={triggerSpiderSense}
          />
        )}
        <SpiderGadgetDrawer
          onOpenBugHunter={() => setBugHunterOpen(true)}
          onOpenDailyBugle={() => setDailyBugleOpen(true)}
          onOpenDeck={() => setDeckOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        {terminalOpen && (
          <ParkerLabTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
        )}
      </Suspense>

      <a href="#about" className="skip-link">
        Skip to Story!
      </a>
      <AnimeBackground />
      <Navbar
        onOpenDeck={() => setDeckOpen(true)}
        onToggleMenu={() => setKineticMenuOpen((v) => !v)}
        isMenuOpen={kineticMenuOpen}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
      />
      <Suspense fallback={null}>
        <KineticMenu
          isOpen={kineticMenuOpen}
          onClose={() => setKineticMenuOpen(false)}
          onOpenDeck={() => { setKineticMenuOpen(false); setDeckOpen(true); }}
          onOpenDailyBugle={() => { setKineticMenuOpen(false); setDailyBugleOpen(true); }}
        />
      </Suspense>

      <main>
        <Hero viewMode={viewMode} />
        <ComicTicker
          items={HERO_TICKER_ITEMS}
          rotate="-rotate-1"
          variant="daily-bugle"
        />
        <About onOpenDailyBugle={() => setDailyBugleOpen(true)} />
        <Services />
        <Projects />
        <ComicTicker
          items={TECH_TICKER_ITEMS}
          rotate="rotate-1"
          reverse={true}
          variant="daily-bugle"
        />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <StickyComicTicker />
      <BackToTop />
    </div>
  );
}

export default App;
