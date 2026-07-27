import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const SECTION_IDS = ["about", "projects", "skills", "contact"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 300, damping: 40 });
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
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
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropBlur = useTransform(
    smoothScrollY,
    [0, 80],
    ["blur(0px)", "blur(12px)"]
  );
  const borderColor = useTransform(
    smoothScrollY,
    [0, 80],
    ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.05)"]
  );
  const paddingY = useTransform(smoothScrollY, [0, 80], [32, 16]);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Works", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderBottomColor: borderColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="container mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter justify-self-start"
        >
          FERREL RASHAD<span className="text-primary">.</span>
        </motion.a>

        <div className="hidden md:flex space-x-8 justify-self-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest ${
                activeId === link.id ? "text-primary" : ""
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:inline-block bg-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary transition-colors"
          >
            Hire Me
          </motion.a>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-dark/5"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium uppercase tracking-widest ${
                    activeId === link.id ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
