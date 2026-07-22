import React, { useEffect, useRef } from "react";
import anime from "animejs";

const AnimeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create random shapes
    const container = containerRef.current;
    const numShapes = 15;
    
    for (let i = 0; i < numShapes; i++) {
      const shape = document.createElement("div");
      shape.className = "anime-shape";
      
      // Random styles
      const size = Math.random() * 50 + 20;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.position = "absolute";
      shape.style.backgroundColor = "rgba(59, 130, 246, 0.1)"; // primary color with low opacity
      shape.style.borderRadius = Math.random() > 0.5 ? "50%" : "20%";
      shape.style.pointerEvents = "none";
      shape.style.zIndex = "0";
      
      container.appendChild(shape);
    }

    // Anime.js animation
    anime({
      targets: ".anime-shape",
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      rotate: () => anime.random(0, 360),
      scale: () => [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5],
      duration: () => anime.random(3000, 6000),
      delay: () => anime.random(0, 2000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });

    return () => {
      // Cleanup
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimeBackground;
