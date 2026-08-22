"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, Printer } from "lucide-react";
import ViewModeToggle from "./ViewModeToggle";


const SECTION_IDS = ["about", "services", "projects", "skills", "contact"];

const Navbar = ({ onOpenDeck, onToggleMenu, isMenuOpen, viewMode, onToggleViewMode }) => {

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 300, damping: 40 });
  const lastActiveRef = useRef(null);

  // Section change event dispatch (kept for comic:section-change custom event)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const nextId = visible.target.id;
          const prev = lastActiveRef.current;
          if (prev && prev !== nextId) {
            document.dispatchEvent(
              new CustomEvent("comic:section-change", {
                detail: { from: prev, to: nextId },
              })
            );
          }
          lastActiveRef.current = nextId;
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
      <div className="container mx-auto px-3 sm:px-6 relative flex items-center justify-between gap-1.5 sm:gap-4">
        {/* LOGO */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-display font-black tracking-tighter shrink-0 select-none"
        >
          <span className="text-comic-ink comic-stroke-thin">FERREL RASHAD</span>
          <span className="text-spider-red drop-shadow-[1px_1px_0_var(--color-ink-stroke)]">
            .
          </span>
        </motion.a>

        {/* RIGHT: Deck Button + CTA + Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
          {/* View Mode Toggle */}
          {onToggleViewMode && (
            <ViewModeToggle viewMode={viewMode} onToggle={onToggleViewMode} />
          )}

          {onOpenDeck && (
            <motion.button
              type="button"
              onClick={onOpenDeck}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-spider-yellow text-spider-black comic-chip w-8 h-8 sm:w-9 sm:h-9 pop-shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer"
              title="Open Portfolio Pitch Deck & PDF Export (Hotkey: E)"
            >
              <Printer size={14} strokeWidth={2.5} className="sm:w-[15px] sm:h-[15px]" />
            </motion.button>
          )}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.04,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-block bg-spider-red border-2 border-black comic-chip text-white px-3 xl:px-4 py-1.5 text-[10px] xl:text-[11px] font-black tracking-[0.12em] uppercase shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] hover:bg-spider-yellow hover:text-spider-black transition-all whitespace-nowrap"
          >
            Swing Into Action
          </motion.a>

          {/* Menu Toggle Button — visible on ALL screen sizes */}
          <button
            onClick={onToggleMenu}
            aria-label="Toggle menu"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-spider-yellow text-spider-black border-2 border-black comic-chip hover:bg-spider-red hover:text-white transition-all shadow-[2px_2px_0_#000] active:scale-95 cursor-pointer shrink-0"
          >
            {isMenuOpen ? <X size={16} strokeWidth={3} className="sm:w-[18px] sm:h-[18px]" /> : <Menu size={16} strokeWidth={3} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
