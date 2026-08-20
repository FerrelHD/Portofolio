"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Gamepad2, Zap } from "lucide-react";
import { soundFX } from "../lib/soundFx";
import { achievementManager } from "../lib/achievements";

const BUG_TYPES = [
  { text: "404", color: "#FF1E26", points: 10, speed: 2.2 },
  { text: "NaN", color: "#FFD500", points: 15, speed: 2.6 },
  { text: "TypeError", color: "#FF007A", points: 20, speed: 3.0 },
  { text: "SyntaxErr", color: "#FF5722", points: 25, speed: 3.4 },
  { text: "Leak()", color: "#00E5FF", points: 30, speed: 4.0 },
];

const SpideyBugHunter = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("start"); // "start" | "playing" | "gameover"
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);

  // Game Engine Refs
  const engineRef = useRef({
    spideyX: 200,
    webs: [],
    bugs: [],
    particles: [],
    keys: {},
    lastSpawn: 0,
    animationId: null,
    score: 0,
    time: 30,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("spidey_high_score");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch (e) {}
  }, []);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
    soundFX.playBeep(640);

    const eng = engineRef.current;
    eng.score = 0;
    eng.time = 30;
    eng.webs = [];
    eng.bugs = [];
    eng.particles = [];
    eng.spideyX = 220;
    eng.lastSpawn = performance.now();
  }, []);

  // Web Shoot
  const shootWeb = useCallback(() => {
    if (gameState !== "playing") return;
    const eng = engineRef.current;
    eng.webs.push({
      x: eng.spideyX,
      y: 350,
      radius: 5,
      speed: 8,
    });
    soundFX.playThwip();
  }, [gameState]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const eng = engineRef.current;

    // Timer interval
    const timerInterval = setInterval(() => {
      eng.time -= 1;
      setTimeLeft(eng.time);
      if (eng.time <= 0) {
        clearInterval(timerInterval);
        setGameState("gameover");
        soundFX.playFanfare();
        achievementManager.unlock("bug_squasher");
        // Save highscore
        try {
          const currentHigh = parseInt(localStorage.getItem("spidey_high_score") || "0", 10);
          if (eng.score > currentHigh) {
            localStorage.setItem("spidey_high_score", eng.score.toString());
            setHighScore(eng.score);
          }
        } catch (e) {}
      }
    }, 1000);

    // Keyboard listeners
    const handleKeyDown = (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") eng.keys["left"] = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") eng.keys["right"] = true;
      if (e.code === "Space") {
        e.preventDefault();
        shootWeb();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") eng.keys["left"] = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") eng.keys["right"] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Render loop
    let lastTime = performance.now();
    const render = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      // Update Spidey movement
      if (eng.keys["left"]) eng.spideyX = Math.max(25, eng.spideyX - 6);
      if (eng.keys["right"]) eng.spideyX = Math.min(canvas.width - 25, eng.spideyX + 6);

      // Spawn bugs
      if (now - eng.lastSpawn > 750) {
        const bugTemplate = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
        eng.bugs.push({
          x: 20 + Math.random() * (canvas.width - 60),
          y: -20,
          type: bugTemplate,
          width: 50,
          height: 22,
        });
        eng.lastSpawn = now;
      }

      // Update webs
      eng.webs.forEach((w) => {
        w.y -= w.speed;
      });
      eng.webs = eng.webs.filter((w) => w.y > -10);

      // Update bugs & collisions
      eng.bugs.forEach((bug) => {
        bug.y += bug.type.speed;

        // Check collision with webs
        eng.webs.forEach((web) => {
          if (
            web.x > bug.x &&
            web.x < bug.x + bug.width &&
            web.y > bug.y &&
            web.y < bug.y + bug.height
          ) {
            // Hit!
            bug.hit = true;
            web.y = -100;
            eng.score += bug.type.points;
            setScore(eng.score);
            soundFX.playPunch();

            // Spawn explosion particles
            for (let i = 0; i < 8; i++) {
              eng.particles.push({
                x: bug.x + bug.width / 2,
                y: bug.y + bug.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: bug.type.color,
                life: 1,
              });
            }
          }
        });
      });

      eng.bugs = eng.bugs.filter((b) => !b.hit && b.y < canvas.height + 20);

      // Update particles
      eng.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      eng.particles = eng.particles.filter((p) => p.life > 0);

      // Draw background
      ctx.fillStyle = "#0D1117";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Halftone grid dots on canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let x = 10; x < canvas.width; x += 20) {
        for (let y = 10; y < canvas.height; y += 20) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw webs
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.5;
      eng.webs.forEach((w) => {
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#165DFF";
        ctx.fill();
        ctx.stroke();
        // Web tail
        ctx.beginPath();
        ctx.moveTo(w.x, w.y);
        ctx.lineTo(w.x, w.y + 12);
        ctx.stroke();
      });

      // Draw bugs
      eng.bugs.forEach((bug) => {
        ctx.fillStyle = bug.type.color;
        ctx.fillRect(bug.x, bug.y, bug.width, bug.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(bug.x, bug.y, bug.width, bug.height);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(bug.type.text, bug.x + bug.width / 2, bug.y + 15);
      });

      // Draw particles
      eng.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw Spidey Player at bottom
      ctx.fillStyle = "#FF1E26";
      ctx.beginPath();
      ctx.arc(eng.spideyX, 365, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Spidey eyes
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(eng.spideyX - 5, 363, 4, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(eng.spideyX + 5, 363, 4, 7, 0.3, 0, Math.PI * 2);
      ctx.fill();

      if (eng.time > 0) {
        eng.animationId = requestAnimationFrame(render);
      }
    };

    eng.animationId = requestAnimationFrame(render);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (eng.animationId) cancelAnimationFrame(eng.animationId);
    };
  }, [isOpen, gameState, shootWeb]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-[#12161F] border-3 border-spider-red rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,30,38,0.35)] p-5 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-spider-red animate-pulse" size={22} />
              <div>
                <h3 className="font-black text-base uppercase tracking-wider text-white">
                  Spidey Bug Hunter
                </h3>
                <p className="text-[10px] text-zinc-400">Squash runtime errors before timer expires!</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Top Scorebar */}
          <div className="flex justify-between items-center bg-[#090C10] px-4 py-2 rounded-xl border border-zinc-800 mb-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-spider-yellow font-bold">
              <Zap size={14} />
              <span>SCORE: {score}</span>
            </div>
            <div className="flex items-center gap-1.5 text-spider-red font-black">
              <span>TIME: {timeLeft}s</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
              <Trophy size={12} className="text-yellow-400" />
              <span>BEST: {highScore}</span>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div className="relative w-full h-[380px] bg-black rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={420}
              height={380}
              onClick={shootWeb}
              onMouseMove={(e) => {
                if (gameState === "playing") {
                  const rect = canvasRef.current?.getBoundingClientRect();
                  if (rect) {
                    engineRef.current.spideyX = Math.max(25, Math.min(395, e.clientX - rect.left));
                  }
                }
              }}
              onTouchMove={(e) => {
                if (gameState === "playing" && e.touches[0]) {
                  const rect = canvasRef.current?.getBoundingClientRect();
                  if (rect) {
                    engineRef.current.spideyX = Math.max(25, Math.min(395, e.touches[0].clientX - rect.left));
                  }
                }
              }}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {/* Start Screen Overlay */}
            {gameState === "start" && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-spider-red/20 border border-spider-red flex items-center justify-center text-2xl mb-3 shadow-[0_0_20px_rgba(255,30,38,0.5)]">
                  🕷️
                </div>
                <h4 className="text-xl font-black uppercase tracking-wider text-white mb-1">
                  Ready To Slay Bugs?
                </h4>
                <p className="text-xs text-zinc-400 mb-5 max-w-[260px]">
                  Use Mouse / Left-Right Arrows to Move. Click or Spacebar to shoot webs.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="flex items-center gap-2 bg-spider-red hover:bg-red-600 text-white font-black uppercase text-sm px-6 py-2.5 rounded-xl shadow-[0_8px_20px_rgba(255,30,38,0.4)] transition-all hover:scale-105"
                >
                  <Play size={16} fill="white" />
                  <span>Start 30s Mission</span>
                </button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-black/92 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="text-3xl mb-2">🎉 🏆 🕸️</div>
                <h4 className="text-xl font-black uppercase tracking-wider text-spider-yellow mb-1">
                  Mission Complete!
                </h4>
                <p className="text-sm font-bold text-white mb-1">
                  Final Score: <span className="text-spider-red text-lg">{score}</span> Points
                </p>
                <p className="text-xs text-zinc-400 mb-5">
                  {score > 150 ? "Rank S: Master Bug Slayer!" : "Rank A: Reliable Production Hero!"}
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={startGame}
                    className="flex items-center gap-2 bg-spider-red hover:bg-red-600 text-white font-black uppercase text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    <RotateCcw size={14} />
                    <span>Play Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold uppercase text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Tap to Shoot helper */}
          <div className="mt-3 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
            <span>Controls: [A / D / Arrow Keys] Move • [Space / Tap] Shoot</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpideyBugHunter;
