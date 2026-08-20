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
import AudioPlayer from "./components/AudioPlayer";
import SmoothScroll from "./components/SmoothScroll";
import CommandPalette from "./components/CommandPalette";

function App() {
  const [spiderSense, setSpiderSense] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const senseTimer = useRef(null);

  const triggerSpiderSense = useCallback(() => {
    if (senseTimer.current) return; // throttle: tidak trigger lagi sambil aktif
    setSpiderSense(true);
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

  useEffect(() => {
    const onKey = (e) => {
      // Jangan tangkap event jika user sedang mengetik di input / textarea
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
      const editable = tag === "input" || tag === "textarea" || tag === "select" ||
        (e.target && typeof e.target.isContentEditable === "boolean" && e.target.isContentEditable);

      // ESC: close modals
      if (e.key === "Escape") {
        setShortcutsOpen(false);
        setCmdOpen(false);
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
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <a href="#about" className="skip-link">
        Skip to Story!
      </a>
      <AnimeBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <AudioPlayer />
      <BackToTop />
    </div>
  );
}

export default App;
