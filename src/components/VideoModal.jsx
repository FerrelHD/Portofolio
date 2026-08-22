"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film } from "lucide-react";

const VideoModal = ({ video, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key listener
  useEffect(() => {
    if (!video) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, onClose]);

  if (!mounted) return null;

  // Extract YouTube embed ID
  const getEmbedUrl = (url) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  };

  const embedUrl = getEmbedUrl(video?.link);

  return createPortal(
    <AnimatePresence>
      {video && (
        <div
          className="fixed inset-0 z-[9999] bg-spider-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-comic-panel border-3 sm:border-4 border-black rounded-lg shadow-[8px_8px_0_#000] overflow-hidden select-none"
              data-lenis-prevent
            >
              {/* Header */}
              <div className="bg-spider-red text-white border-b-3 sm:border-b-4 border-black px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 shadow-[0_2px_0_#000]">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest min-w-0">
                  <Film size={18} className="text-spider-yellow shrink-0" />
                  <span className="truncate">{video.title}</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-spider-yellow text-spider-black border-2 border-black flex items-center justify-center hover:bg-white transition-all shadow-[1.5px_1.5px_0_#000] active:scale-95 cursor-pointer shrink-0 ml-2"
                  aria-label="Close video player modal"
                >
                  <X size={18} strokeWidth={2.8} />
                </button>
              </div>

              {/* Video Container (Responsive 16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-video bg-black">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60 text-xs uppercase font-bold">
                    Video Preview Unavailable
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VideoModal;
