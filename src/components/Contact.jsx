"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, X, Check } from "lucide-react";
import { fadeUp, staggerContainer, comicPop, comicStamp } from "../lib/animation";
import ComicSocialCard from "./ComicSocialCard";
import ComicDoodleButton from "./ComicDoodleButton";

/* STATIC CLASS MAPPING (supaya Tailwind JIT tidak purge class dinamis) */
const ACCENT_MAP = {
  "spider-red": {
    accentBar: "bg-spider-red",
    iconBg: "bg-spider-red",
    iconText: "text-comic-ink",
  },
  "spider-blue": {
    accentBar: "bg-spider-blue",
    iconBg: "bg-spider-blue",
    iconText: "text-comic-ink",
  },
  "spider-yellow": {
    accentBar: "bg-spider-yellow",
    iconBg: "bg-spider-yellow",
    iconText: "text-spider-black",
  },
};

/* =========================================================
   SUCCESS MODAL — Signal Received! (with confetti)
   ========================================================= */
const ConfettiPiece = ({ delay, left, color, rotate }) => (
  <motion.div
    className="confetti-piece"
    style={{
      left: `${left}%`,
      top: "-10%",
      backgroundColor: `var(--color-${color})`,
      animation: `confetti-fall 2.4s cubic-bezier(0.2, 0.7, 0.3, 1) ${delay}s forwards`,
      transform: `rotate(${rotate}deg)`,
    }}
  />
);

const SuccessModal = ({ open, onClose }) => {
  if (!open) return null;
  const confettiPieces = Array.from({ length: 36 }).map((_, i) => ({
    delay: (i % 12) * 0.035,
    left: 5 + Math.random() * 90,
    color: ["spider-red", "spider-blue", "spider-yellow", "comic-ink"][i % 4],
    rotate: Math.random() * 360,
  }));

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 40, scale: 0.9, rotate: 2 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Halftone overlay inside modal */}
        <div className="modal-halftone halftone-overlay-sm" />

        {/* Red accent bar at top */}
        <div className="h-3 w-full bg-spider-red border-b-[3px] border-spider-black" />

        {/* Confetti */}
        {confettiPieces.map((p, i) => (
          <ConfettiPiece key={i} {...p} />
        ))}

        <div className="relative p-6 sm:p-8 md:p-10 text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-spider-red comic-chip text-comic-ink hover:bg-spider-yellow hover:text-spider-black transition-colors"
          >
            <X size={18} strokeWidth={2.8} />
          </button>

          {/* Big check mark bubble */}
          <motion.div
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 14, delay: 0.1 }}
            className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6 flex items-center justify-center bg-spider-yellow comic-chip"
            style={{ borderRadius: "9999px" }}
          >
            <Check size={40} strokeWidth={3.2} className="text-spider-black" />
          </motion.div>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4"
          >
            <span className="text-comic-ink comic-stroke">Signal </span>
            <span className="text-spider-red comic-stroke italic">Received!</span>
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-comic-ink/60 font-medium text-sm sm:text-base max-w-sm mx-auto mb-6 sm:mb-8 leading-relaxed"
          >
            Mission brief successfully transmitted.
            Spider-Sense is tingling — I&apos;ll get back to you within 24 hours!
          </motion.p>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-7"
          >
            <span className="inline-flex items-center gap-1.5 bg-spider-blue comic-chip text-comic-ink px-3 py-1.5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-spider-yellow comic-chip animate-pulse" />
              Status: Queued
            </span>
            <span className="inline-flex items-center gap-1.5 bg-spider-black comic-chip text-spider-yellow px-3 py-1.5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
              ETA: 24h
            </span>
          </motion.div>

          {/* CTA close button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="w-full sm:w-auto inline-block bg-spider-red comic-chip text-comic-ink px-7 sm:px-9 py-3.5 sm:py-4 font-black uppercase tracking-[0.2em] text-sm sm:text-base pop-shadow-red hover:bg-spider-yellow hover:text-spider-black hover:pop-shadow-active active:pop-shadow-active transition-all"
          >
            Awesome — Thwip!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const contactInfo = [
  {
    icon: <Mail size={20} strokeWidth={2.5} />,
    label: "Email",
    value: "ferrelrashadakeyla2014@gmail.com",
    href: "mailto:ferrelrashadakeyla2014@gmail.com",
    accent: "spider-red",
  },
  {
    icon: <Linkedin size={20} strokeWidth={2.5} />,
    label: "LinkedIn",
    value: "linkedin.com/in/ferrel-rashad-8a165514b",
    href: "https://www.linkedin.com/in/ferrel-rashad-8a165514b/",
    accent: "spider-blue",
  },
  {
    icon: <Github size={20} strokeWidth={2.5} />,
    label: "GitHub",
    value: "github.com/FerrelHD",
    href: "https://github.com/FerrelHD",
    accent: "spider-yellow",
  },
  {
    icon: <MapPin size={20} strokeWidth={2.5} />,
    label: "Location",
    value: "Depok, Jawa Barat",
    href: "https://www.google.com/maps/search/?api=1&query=Depok%2C%20Jawa%20Barat%2C%20Indonesia",
    accent: "spider-red",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedMap, setCopiedMap] = useState({});

  const validateEmail = (e) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e).trim());

  const runValidation = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Please enter your real name";
    }
    if (!validateEmail(form.email)) {
      next.email = "Please enter a valid email address";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Mission brief needs at least 10 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleCopyCard = async (info, e) => {
    // Location: open Google Maps instead of copy
    if (info.label === "Location") {
      return; // anchor href tetap default (buka di tab yang sama)
    }
    e.preventDefault();
    let textToCopy = info.value;
    if (info.label === "Email") {
      textToCopy = info.value;
    } else if (info.label === "LinkedIn" || info.label === "GitHub") {
      textToCopy = info.href;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback: textarea + execCommand
        const ta = document.createElement("textarea");
        ta.value = textToCopy;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedMap((m) => ({ ...m, [info.label]: true }));
      setTimeout(() => {
        setCopiedMap((m) => {
          const c = { ...m };
          delete c[info.label];
          return c;
        });
      }, 1500);
    } catch (_) {
      // No-op if copy fails silently
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const ok = runValidation();
    if (!ok) return;

    setSubmitting(true);
    try {
      // Simulated async submit (~1.2s delay untuk efek loading comic)
      // Nanti bisa ganti dengan fetch() ke Formspree / Web3Forms endpoint
      await new Promise((r) => setTimeout(r, 1200));

      setShowSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#EDEAE2] border-2 border-black comic-chip transition-all outline-none font-black text-sm text-comic-ink placeholder:text-comic-ink/50";

  return (
    <section
      id="contact"
      className="py-24 sm:py-36 relative overflow-hidden bg-spider-red text-white [clip-path:polygon(0_2.5vw,100%_0,100%_100%,0_100%)]"
    >
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 tracking-tighter uppercase relative inline-block text-white">
            <span>Activate The </span>
            <span className="relative">
              <span
                className="text-spider-yellow italic inline-block px-1 select-none"
                style={{
                  textShadow:
                    "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0px -1.5px 0 #000, 0px 1.5px 0 #000, -1.5px 0px 0 #000, 1.5px 0px 0 #000, 1px 3px 0 #165DFF, 2px 4.5px 0 #165DFF, 2.5px 6px 0 #0C38A8, 3.5px 7.5px 0 #000000, 4px 10px 8px rgba(0,0,0,0.5)",
                }}
              >
                Spider-Signal
              </span>
              <span className="absolute -top-3 -right-10 hidden sm:inline-block bg-spider-yellow border border-black text-spider-black px-2.5 py-1 text-[9px] font-black tracking-[0.18em] uppercase shadow-[2px_2px_0_#000]">
                POW!
              </span>
            </span>
            <span>!</span>
          </h2>
          <p className="text-white/90 max-w-xl mx-auto font-medium text-sm sm:text-base">
            Have a mission in mind? Fire the signal and let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* MAIN BALANCED 2-COLUMN SECTION: Comic Social Post (Left) vs Mission Form (Right) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center mb-12 sm:mb-16"
        >
          {/* ============= LEFT: SPIDEY COMIC SOCIAL CARD (5 cols) ============= */}
          <motion.div
            variants={comicPop}
            className="lg:col-span-5 flex flex-col items-center justify-center w-full"
          >
            <ComicSocialCard
              onFocusContact={() => {
                const input = document.getElementById("contact-name-input");
                if (input) {
                  input.focus();
                  input.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
            />

            {/* Quick Status Chips under card */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white border-2 border-black comic-chip text-spider-black px-3 py-1.5 text-[9.5px] sm:text-[10px] font-black tracking-[0.18em] uppercase shadow-[2px_2px_0_#000]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Response: &lt; 24 Hours
              </span>
              <span className="inline-flex items-center gap-1.5 bg-spider-yellow border-2 border-black comic-chip text-spider-black px-3 py-1.5 text-[9.5px] sm:text-[10px] font-black tracking-[0.18em] uppercase shadow-[2px_2px_0_#000]">
                Freelance: Available
              </span>
            </div>
          </motion.div>

          {/* ============= RIGHT: COMIC TRANSMISSION FORM (7 cols) ============= */}
          <motion.div
            variants={comicPop}
            className="lg:col-span-7 z-10 w-full bg-white text-comic-ink border-4 border-black shadow-[8px_8px_0_#000] p-6 sm:p-8 md:p-9 relative overflow-hidden"
            style={{ borderRadius: "4px" }}
          >
            {/* Halftone Texture inside form container */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Comic Header Stamp */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b-2 border-comic-ink/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-spider-yellow comic-chip flex items-center justify-center text-spider-black">
                  <Send size={18} strokeWidth={2.8} />
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight">
                    Mission Brief Form
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/50">
                    Encrypted Web Transmission
                  </p>
                </div>
              </div>
              <span className="inline-block bg-spider-black comic-chip text-spider-yellow px-2.5 py-1 text-[9px] font-black tracking-[0.2em] uppercase">
                256-Bit SSL
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                    <span>Your Identity / Name</span>
                    {errors.name && (
                      <span className="text-spider-red normal-case tracking-normal font-bold text-[10px] animate-pulse">
                        ⚠ {errors.name}
                      </span>
                    )}
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Peter Parker"
                    className={`${inputBase} focus:border-spider-red focus:ring-2 focus:ring-spider-yellow focus:ring-offset-2 focus:ring-offset-spider-black ${
                      errors.name ? "input-error" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                    <span>Return Frequency (Email)</span>
                    {errors.email && (
                      <span className="text-spider-red normal-case tracking-normal font-bold text-[10px] animate-pulse">
                        ⚠ {errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="peter@dailybugle.com"
                    className={`${inputBase} focus:border-spider-red focus:ring-2 focus:ring-spider-yellow focus:ring-offset-2 focus:ring-offset-spider-black ${
                      errors.email ? "input-error" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                  <span>Mission Details</span>
                  {errors.message && (
                    <span className="text-spider-red normal-case tracking-normal font-bold text-[10px] animate-pulse">
                      ⚠ {errors.message}
                    </span>
                  )}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Tell me about your project goals, scope, and timeline..."
                  className={`${inputBase} resize-none focus:border-spider-red focus:ring-2 focus:ring-spider-yellow focus:ring-offset-2 focus:ring-offset-spider-black ${
                    errors.message ? "input-error" : ""
                  }`}
                  style={{ borderRadius: "2px" }}
                  disabled={submitting}
                />
              </div>

              {/* SUBMIT BUTTON: DOODLE MULTI-LAYER ACTION BUTTON */}
              <div className="pt-2 flex justify-center">
                <ComicDoodleButton
                  text={submitting ? "TRANSMITTING..." : "FIRE THE SIGNAL"}
                  submitted={submitting || showSuccess}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* ============= BOTTOM: DIRECT SIGNAL CHANNELS (4-COLUMN RELAY HUB) ============= */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="w-full pt-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-spider-yellow" />
            <span className="bg-spider-yellow comic-chip text-spider-black px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase pop-shadow-sm">
              Direct Signal Relay Channels
            </span>
            <span className="h-[2px] w-12 bg-spider-yellow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => {
              const c = ACCENT_MAP[info.accent] || ACCENT_MAP["spider-red"];
              const isCopied = !!copiedMap[info.label];
              const isLocation = info.label === "Location";
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  onClick={(e) => handleCopyCard(info, e)}
                  variants={comicPop}
                  className={`group relative bg-white text-comic-ink border-3 border-black shadow-[4px_4px_0_#000] p-4 sm:p-5 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#000] overflow-hidden cursor-pointer flex flex-col justify-between ${
                    isCopied ? "ring-2 ring-spider-yellow" : ""
                  }`}
                  style={{ borderRadius: "4px" }}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {/* Colored accent bar at top-left corner */}
                  <div className={`absolute top-0 left-0 w-24 h-1.5 ${c.accentBar}`} />

                  {/* Copied badge overlay */}
                  <AnimatePresence>
                    {isCopied && (
                      <motion.span
                        key={`copied-${info.label}`}
                        className="copy-badge"
                        initial={{ opacity: 0, y: -10, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 380, damping: 20 }}
                      >
                        ✔ Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Icon & Label */}
                  <div>
                    <div
                      className={`mb-3 w-10 h-10 flex items-center justify-center comic-chip group-hover:scale-110 transition-transform origin-top-left ${c.iconBg} ${c.iconText}`}
                    >
                      {info.icon}
                    </div>
                    <p className="mb-1 inline-block bg-spider-yellow comic-chip text-spider-black px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]">
                      {info.label}
                      {!isLocation && (
                        <span className="ml-1 text-spider-black/60 normal-case tracking-normal font-bold">
                          (copy)
                        </span>
                      )}
                      {isLocation && (
                        <span className="ml-1 text-spider-black/60 normal-case tracking-normal font-bold">
                          (maps)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Value */}
                  <p className="font-black text-[12px] sm:text-xs leading-snug break-all mt-2 text-comic-ink/90">
                    {info.value}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
