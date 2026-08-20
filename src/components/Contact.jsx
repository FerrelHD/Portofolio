"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, X, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";

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
    "w-full px-4 sm:px-5 py-3 sm:py-4 bg-comic-surface comic-chip transition-all outline-none font-black text-sm placeholder:text-comic-ink/30";

  return (
    <motion.section
      id="contact"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="py-16 md:py-28 relative overflow-hidden"
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

      {/* Red & Blue Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 8% 15%, rgba(255,30,38,0.1) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 92% 85%, rgba(22,93,255,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER — Comic Sound Effect Style */}
        <motion.div
          variants={fadeUp}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 tracking-tighter uppercase relative inline-block">
            <span className="comic-stroke text-comic-ink">Activate The </span>
            <span className="relative">
              <span className="comic-stroke text-spider-red drop-shadow-[3px_3px_0_var(--color-ink-stroke)] italic">
                Spider-Signal
              </span>
              <span className="absolute -top-3 -right-10 hidden sm:inline-block bg-spider-red comic-chip text-comic-ink px-2.5 py-1 text-[9px] font-black tracking-[0.18em] uppercase animate-pulse">
                POW!
              </span>
            </span>
            <span className="comic-stroke text-comic-ink">!</span>
          </h2>
          <p className="text-comic-ink/50 max-w-xl mx-auto font-medium text-sm sm:text-base">
            Have a mission in mind? Fire the signal and let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* MAIN LAYOUT 50/50 split */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-start">
          {/* ============= LEFT: CONTACT INFO CARDS ============= */}
          <div className="z-10 w-full min-w-0 space-y-4 sm:space-y-5">
            <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
              <span className="inline-block bg-spider-red comic-chip text-comic-ink px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase pop-shadow-sm">
                Direct Signal Channels
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info, i) => {
                const c = ACCENT_MAP[info.accent] || ACCENT_MAP["spider-red"];
                const isCopied = !!copiedMap[info.label];
                const isLocation = info.label === "Location";
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    onClick={(e) => handleCopyCard(info, e)}
                    variants={fadeUp}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative comic-panel p-4 sm:p-5 transition-all duration-250 hover:-translate-y-1 hover:pop-shadow-sm overflow-hidden cursor-pointer ${
                      isCopied ? "ring-2 ring-spider-yellow" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {/* Colored accent bar at top-left corner */}
                    <div className={`absolute top-0 left-0 w-32 h-1.5 ${c.accentBar}`} />
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
                    {/* Icon */}
                    <div
                      className={`mb-3 sm:mb-4 w-11 h-11 flex items-center justify-center comic-chip group-hover:scale-110 transition-transform origin-top-left ${c.iconBg} ${c.iconText}`}
                    >
                      {info.icon}
                    </div>
                    {/* Label chip */}
                    <p className="mb-1.5 inline-block bg-spider-black comic-chip text-comic-ink/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]">
                      {info.label}
                      {!isLocation && (
                        <span className="ml-1.5 text-comic-ink/40 normal-case tracking-normal font-bold">
                          (click to copy)
                        </span>
                      )}
                      {isLocation && (
                        <span className="ml-1.5 text-comic-ink/40 normal-case tracking-normal font-bold">
                          (open maps)
                        </span>
                      )}
                    </p>
                    {/* Value */}
                    <p className="font-black text-[12px] sm:text-sm leading-snug break-all">
                      {info.value}
                    </p>
                  </motion.a>
                );
              })}
            </div>

            {/* Signature Banner below info cards */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 pt-2"
            >
              <span className="inline-flex items-center gap-2 bg-comic-panel comic-chip text-comic-ink px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase">
                Response Time — Under 24h
              </span>
              <span className="inline-flex items-center gap-2 bg-spider-blue comic-chip text-comic-ink px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase">
                Freelance Slots — Open
              </span>
            </motion.div>
          </div>

          {/* ============= RIGHT: MISSION BRIEF FORM ============= */}
          <motion.div variants={fadeUp} className="relative">
            <div
              className="comic-panel p-5 sm:p-7 md:p-10 text-comic-ink relative overflow-hidden"
              style={{ borderRadius: "3px" }}
            >
              {/* Halftone pattern subtle inside form */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-full h-full halftone-overlay-sm" />
              </div>

              {/* Form header chip */}
              <div className="mb-6 sm:mb-8 relative z-10">
                <span className="inline-block bg-spider-yellow comic-chip text-spider-black px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase pop-shadow-sm">
                  Mission Brief Transmitter
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10 no-validate">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                      <span>Full Name</span>
                      {errors.name && (
                        <span className="text-spider-red normal-case tracking-normal font-bold text-[10px] animate-pulse">
                          ⚠ {errors.name}
                        </span>
                      )}
                    </label>
                    <input
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
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                      <span>Email Address</span>
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

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-comic-ink/60 flex items-center justify-between">
                    <span>Mission Details</span>
                    {errors.message && (
                      <span className="text-spider-red normal-case tracking-normal font-bold text-[10px] animate-pulse">
                        ⚠ {errors.message}
                      </span>
                    )}
                  </label>
                  <textarea
                    rows="5"
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Describe your mission brief — scope, goals, timeline..."
                    className={`${inputBase} resize-none focus:border-spider-red focus:ring-2 focus:ring-spider-yellow focus:ring-offset-2 focus:ring-offset-spider-black ${
                      errors.message ? "input-error" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                    disabled={submitting}
                  />
                </div>

                {/* SUBMIT BUTTON: FIRE THE SIGNAL */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-spider-red comic-chip text-comic-ink py-4 sm:py-5 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 group hover:bg-spider-yellow hover:text-spider-black pop-shadow-red hover:pop-shadow-active transition-all active:pop-shadow-active text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ borderRadius: "2px" }}
                >
                  {submitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="text-base sm:text-lg inline-block"
                      >
                        🕸️
                      </motion.span>
                      <span>Transmitting Signal…</span>
                    </>
                  ) : (
                    <>
                      <span className="text-base sm:text-lg">🔥</span>
                      <span>Fire The Signal</span>
                      <Send
                        size={18}
                        strokeWidth={2.5}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
