"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, Printer } from "lucide-react";
import MotionToggle from "./MotionToggle";


const SECTION_IDS = ["about", "services", "projects", "skills", "contact"];

const Navbar = ({ onOpenDeck }) => {

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
    ["rgba(237, 234, 226, 0)", "rgba(237, 234, 226, 0.95)"]
  );
  const backdropBlur = useTransform(
    smoothScrollY,
    [0, 80],
    ["blur(0px)", "blur(14px)"]
  );
  const borderColor = useTransform(
    smoothScrollY,
    [0, 80],
    ["rgba(24, 24, 27, 0)", "rgba(24, 24, 27, 0.25)"]
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
      <div className="container mx-auto px-4 sm:px-6 relative flex items-center justify-between gap-2 lg:gap-4">
        {/* LOGO: Ferrel + spider dot with comic stroke */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-base sm:text-lg lg:text-xl xl:text-2xl font-display font-black tracking-tighter shrink-0 select-none"
        >
          <span className="text-comic-ink comic-stroke-thin">FERREL RASHAD</span>
          <span className="text-spider-red drop-shadow-[1px_1px_0_var(--color-ink-stroke)]">
            .
          </span>
        </motion.a>

        {/* CENTER NAV (Desktop) — Absolute center relative to full navbar */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 xl:gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeId === link.id;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative text-[10.5px] xl:text-xs font-bold uppercase tracking-[0.14em] xl:tracking-[0.18em] px-2 xl:px-2.5 py-1 transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-spider-black bg-spider-yellow comic-chip"
                    : "text-comic-ink/80 hover:text-spider-black hover:bg-spider-yellow hover:comic-chip"
                }`}
              >
                {/* THWIP! Badge pop-up tepat di atas link aktif */}
                <AnimatePresence>
                  {isActive && showThwip && (
                    <motion.span
                      key={`thwip-${link.id}`}
                      initial={{ opacity: 0, y: 8, scale: 0.5, rotate: -10 }}
                      animate={{ opacity: 1, y: -26, scale: 1, rotate: -4 }}
                      exit={{ opacity: 0, y: -32, scale: 0.6, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 450, damping: 18 }}
                      className="absolute left-1/2 -translate-x-1/2 bg-spider-yellow text-spider-black border-2 border-spider-black px-2 py-0.5 text-[9px] font-black italic tracking-widest uppercase comic-chip pop-shadow-sm pointer-events-none whitespace-nowrap z-20"
                    >
                      THWIP!
                    </motion.span>
                  )}
                </AnimatePresence>
                {link.name}
              </motion.a>
            );
          })}
        </div>

        {/* RIGHT: Deck Button + Motion Toggle + CTA + Mobile Burger */}
        <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
          {onOpenDeck && (
            <motion.button
              type="button"
              onClick={onOpenDeck}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-spider-yellow text-spider-black comic-chip w-9 h-9 pop-shadow-sm hover:bg-white transition-all cursor-pointer"
              title="Open Portfolio Pitch Deck & PDF Export (Hotkey: E)"
            >
              <Printer size={15} strokeWidth={2.5} />
            </motion.button>
          )}

          <div className="hidden 2xl:block">
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
            className="hidden sm:inline-block bg-spider-red border-2 border-black comic-chip text-white px-3 xl:px-4 py-1.5 text-[10px] xl:text-[11px] font-black tracking-[0.12em] uppercase shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] hover:bg-spider-yellow hover:text-spider-black transition-all whitespace-nowrap"
          >
            Swing Into Action
          </motion.a>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-spider-yellow text-spider-black border-2 border-black comic-chip hover:bg-spider-red hover:text-white transition-all shadow-[2px_2px_0_#000] active:scale-95 cursor-pointer shrink-0"
          >
            {isOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="lg:hidden overflow-hidden bg-[#FAF8F5] border-t-3 border-b-4 border-black shadow-[0_8px_0_rgba(0,0,0,0.4)]"
          >
            <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col gap-2.5 relative">
              {/* Halftone bg inside mobile menu */}
              <div className="absolute inset-0 halftone-overlay opacity-15 pointer-events-none" />

              {onOpenDeck && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDeck();
                  }}
                  className="relative z-10 text-center bg-spider-yellow text-spider-black border-2 border-black comic-chip px-5 py-2.5 text-xs sm:text-sm font-black tracking-[0.16em] uppercase shadow-[3px_3px_0_#000] hover:bg-white flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Printer size={16} strokeWidth={2.5} />
                  <span>Portfolio Pitch Deck / PDF</span>
                </button>
              )}

              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative z-10 text-xs sm:text-sm font-black uppercase tracking-[0.16em] py-2.5 px-4 comic-chip border-2 border-black transition-all shadow-[2px_2px_0_#000] active:scale-98 ${
                      isActive
                        ? "bg-spider-yellow text-spider-black shadow-[3px_3px_0_#000]"
                        : "bg-white text-comic-ink hover:bg-spider-blue hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="relative z-10 mt-1 text-center bg-spider-red border-2 border-black comic-chip text-white px-5 py-3 text-xs sm:text-sm font-black tracking-[0.18em] uppercase shadow-[3px_3px_0_#000] hover:bg-spider-yellow hover:text-spider-black transition-all active:scale-98"
              >
                Swing Into Action
              </a>

              <div className="relative z-10 mt-1 pt-2 border-t-2 border-black/15">
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
