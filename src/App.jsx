import React, { useState, useEffect, useRef, useCallback } from "react";
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
import ShortcutsModal from "./components/ShortcutsModal";
import ScrollFX from "./components/ScrollFX";
import SmoothScroll from "./components/SmoothScroll";
import CommandPalette from "./components/CommandPalette";
import SpiderGadgetDrawer from "./components/SpiderGadgetDrawer";
import ComicActionFX from "./components/ComicActionFX";
import AchievementToast from "./components/AchievementToast";
import DailyBugleModal from "./components/DailyBugleModal";
import SpideyBugHunter from "./components/SpideyBugHunter";
import ComicTicker from "./components/ComicTicker";
import { achievementManager } from "./lib/achievements";
import { soundFX } from "./lib/soundFx";

function App() {
  const [spiderSense, setSpiderSense] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [dailyBugleOpen, setDailyBugleOpen] = useState(false);
  const [bugHunterOpen, setBugHunterOpen] = useState(false);
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

      // Hotkey 1 - 6 untuk navigasi cepat antar section
      const sectionKeys = {
        "1": "#about",
        "2": "#about",
        "3": "#services",
        "4": "#projects",
        "5": "#skills",
        "6": "#contact",
      };

      if (!e.metaKey && !e.ctrlKey && !e.altKey && sectionKeys[e.key]) {
        const targetEl = document.querySelector(sectionKeys[e.key]);
        if (targetEl) {
          soundFX.playBeep(420 + parseInt(e.key, 10) * 40);
          targetEl.scrollIntoView({ behavior: "smooth" });
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
      <ComicActionFX />
      <AchievementToast />
      <DailyBugleModal isOpen={dailyBugleOpen} onClose={() => setDailyBugleOpen(false)} />
      <SpideyBugHunter isOpen={bugHunterOpen} onClose={() => setBugHunterOpen(false)} />

      {/* Existing Modals */}
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenDailyBugle={() => setDailyBugleOpen(true)}
        onOpenBugHunter={() => setBugHunterOpen(true)}
        triggerSpiderSense={triggerSpiderSense}
      />

      <a href="#about" className="skip-link">
        Skip to Story!
      </a>
      <AnimeBackground />
      <Navbar />

      <main>
        <Hero />
        <ComicTicker
          items={[
            "📰 THE DAILY BUGLE: WHO IS THIS DEVELOPER?",
            "🕷️ WEB-SLINGING FULLSTACK ENGINEER IN ACTION",
            "⚡ CRAFTING ULTRA-FAST NEXT.JS & REACT APPS",
            "💥 200 OK • ZERO PRODUCTION CRIMES",
            "🕸️ THWIP! HIGH-PERFORMANCE CODE ARCHITECTURES",
            "🚀 READY FOR MISSION-CRITICAL DEPLOYMENTS",
          ]}
          rotate="-rotate-1"
          variant="daily-bugle"
        />
        <About onOpenDailyBugle={() => setDailyBugleOpen(true)} />
        <Services />
        <Projects />
        <ComicTicker
          items={[
            "🔥 HIGH-PERFORMANCE TECH MATRIX LOADED",
            "⚛️ REACT 19 & NEXT.JS MASTERED",
            "🌊 TAILWIND CSS STYLED TO PERFECTION",
            "🎮 60 FPS INTERACTIVE WEB & GAME SYSTEMS",
            "🧊 3D BLENDER MULTIVERSE COMPUTING",
            "🤖 MODERN AGENTIC DX ACTIVATED",
          ]}
          rotate="rotate-1"
          reverse={true}
          variant="daily-bugle"
        />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <SpiderGadgetDrawer
        onOpenBugHunter={() => setBugHunterOpen(true)}
        onOpenDailyBugle={() => setDailyBugleOpen(true)}
      />
      <BackToTop />
    </div>
  );
}

export default App;
