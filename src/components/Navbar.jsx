"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import MotionToggle from "./MotionToggle";
import SuitSelector from "./SuitSelector";
import { Command } from "lucide-react";

const SECTION_IDS = ["about", "services", "projects", "skills", "contact"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 300, damping: 40 });
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const lastActiveRef = useRef(null);
  const [showThwip, setShowThwip] = useState(false);
  const thwipTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const nextId = visible.target.id;
          const prev = lastActiveRef.current;
          if (prev && prev !== nextId) {
            // Section berubah: trigger THWIP! badge
            setShowThwip(false);
            // force re-mount animasi
            requestAnimationFrame(() => {
              setShowThwip(true);
              if (thwipTimer.current) clearTimeout(thwipTimer.current);
              thwipTimer.current = setTimeout(() => setShowThwip(false), 900);
            });

            // Dispatch event untuk Page Flip Divider
            document.dispatchEvent(
              new CustomEvent("comic:section-change", {
                detail: { from: prev, to: nextId },
              })
            );
          }
          lastActiveRef.current = nextId;
          setActiveId(nextId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      if (thwipTimer.current) clearTimeout(thwipTimer.current);
    };
  }, []);

  const backgroundColor = useTransform(
    smoothScrollY,
    [0, 80],
    ["rgba(20, 20, 20, 0)", "rgba(20, 20, 20, 0.92)"]
  );
  const backdropBlur = useTransform(
    smoothScrollY,
    [0, 80],
    ["blur(0px)", "blur(14px)"]
  );
  const borderColor = useTransform(
    smoothScrollY,
    [0, 80],
    ["rgba(10, 10, 10, 0)", "rgba(255, 30, 38, 0.5)"]
  );
  const borderWidth = useTransform(smoothScrollY, [0, 80], ["0px", "2px"]);
  const paddingY = useTransform(smoothScrollY, [0, 80], [28, 14]);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Works", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottomColor: borderColor,
        borderBottomWidth: borderWidth,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b-solid"
    >
      {/* THWIP! Badge saat ganti section */}
      <AnimatePresence>
        {showThwip && (
          <motion.span
            key={`thwip-${lastActiveRef.current || activeId || Date.now()}`}
            className="thwip-badge hidden lg:block"
            initial={{ opacity: 0, y: -12, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.7, rotate: 6 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
          >
            THWIP!
          </motion.span>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-5 sm:px-6 relative flex items-center justify-between">
        {/* LOGO: Ferrel + spider dot with comic stroke */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg sm:text-xl lg:text-2xl font-display font-black tracking-tighter shrink-0 select-none"
        >
          <span className="text-comic-ink comic-stroke-thin">FERREL RASHAD</span>
          <span className="text-spider-red drop-shadow-[1px_1px_0_var(--color-ink-stroke)]">
            .
          </span>
        </motion.a>

        {/* CENTER NAV (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-5 xl:space-x-7">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative text-[11px] xl:text-xs font-bold uppercase tracking-[0.18em] px-2.5 py-1 transition-all duration-200 ${
                activeId === link.id
                  ? "text-spider-black bg-spider-yellow comic-chip"
                  : "text-comic-ink/80 hover:text-spider-black hover:bg-spider-yellow hover:comic-chip"
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* RIGHT: Motion Toggle + CTA + Mobile Burger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <MotionToggle />
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.04,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:inline-block bg-spider-red comic-chip text-comic-ink px-4 sm:px-6 py-2 text-[11px] sm:text-xs font-black tracking-[0.15em] uppercase pop-shadow-sm hover:pop-shadow-active transition-all active:pop-shadow-active"
          >
            Swing Into Action
          </motion.a>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-1.5 text-comic-ink comic-chip bg-spider-black hover:bg-spider-red transition-colors"
          >
            {isOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden overflow-hidden bg-comic-surface border-t-2 border-spider-red"
          >
            <div
              className="container mx-auto px-5 sm:px-6 py-6 flex flex-col gap-3 relative"
            >
              {/* Halftone bg inside mobile menu */}
              <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none" />

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative z-10 text-sm font-black uppercase tracking-[0.18em] py-2.5 px-4 comic-chip ${
                    activeId === link.id
                      ? "bg-spider-yellow text-spider-black"
                      : "bg-comic-panel text-comic-ink/90 hover:bg-spider-blue hover:text-comic-ink"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="relative z-10 mt-1 text-center bg-spider-red comic-chip text-comic-ink px-6 py-3.5 text-sm font-black tracking-[0.18em] uppercase pop-shadow-sm hover:pop-shadow-active transition-all"
              >
                Swing Into Action
              </a>

              <div className="relative z-10 mt-2">
                <MotionToggle isMobile={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
