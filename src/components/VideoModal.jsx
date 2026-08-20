"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Film } from "lucide-react";

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

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

  const embedUrl = getEmbedUrl(video.link);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[300] bg-spider-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-comic-panel border-4 border-spider-black comic-chip pop-shadow-red overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-spider-red border-b-4 border-spider-black px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-comic-ink font-black text-xs uppercase tracking-widest">
              <Film size={16} className="text-spider-yellow" />
              <span className="truncate">{video.title}</span>
            </div>
            <button
              onClick={onClose}
              className="text-comic-ink hover:text-spider-yellow p-1 shrink-0 transition-colors"
            >
              <X size={20} strokeWidth={2.8} />
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
              <div className="flex items-center justify-center h-full text-comic-ink/60 text-xs uppercase font-bold">
                Video Preview Unavailable
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
