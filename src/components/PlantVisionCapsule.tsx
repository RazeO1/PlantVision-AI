"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Scan, Activity, Zap } from "lucide-react";
import { useMemo } from "react";

export function PlantVisionCapsule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Auto-flip every 8-10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      triggerFlip();
    }, 9000);
    return () => clearInterval(interval);
  }, [isFlipped]);

  const triggerFlip = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsFlipped((prev) => !prev);
      setTimeout(() => setIsScanning(false), 1200);
    }, 600);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[380px] mx-auto"
      style={{ perspective: "1400px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow behind capsule */}
      <motion.div
        className="absolute -inset-24 rounded-full pointer-events-none"
        animate={{
          background: isFlipped
            ? "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 1.5 }}
      />

      {/* Floating particles around capsule */}
      <FloatingParticles isFlipped={isFlipped} />

      {/* 3D Capsule Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Breathing float animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main Capsule */}
          <div className="relative w-[280px] h-[480px] mx-auto">
            {/* Capsule Flip Container */}
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* FRONT SIDE - Healthy */}
              <div
                className="absolute inset-0 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <CapsuleFace
                  type="healthy"
                  isScanning={isScanning}
                />
              </div>

              {/* BACK SIDE - Diseased */}
              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <CapsuleFace
                  type="diseased"
                  isScanning={isScanning}
                />
              </div>
            </motion.div>

            {/* Glass rim overlay (always on top) */}
            <div
              className="absolute inset-0 rounded-[60px] pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)",
                boxShadow: `
                  inset 0 1px 1px rgba(255,255,255,0.2),
                  inset 0 -1px 1px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(255,255,255,0.08)
                `,
              }}
            />

            {/* Scanning beam overlay */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-30 rounded-[60px] overflow-hidden pointer-events-none"
                >
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                    style={{ boxShadow: "0 0 20px rgba(16,185,129,0.6)" }}
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floor shadow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[50%] h-[16px] rounded-full blur-xl opacity-40"
            style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 80%)" }}
          />
        </motion.div>
      </motion.div>

      {/* Floating text labels */}
      <FloatingLabels isFlipped={isFlipped} />
    </div>
  );
}

/* ============================================
   CAPSULE FACE COMPONENT
   ============================================ */
function CapsuleFace({
  type,
  isScanning,
}: {
  type: "healthy" | "diseased";
  isScanning: boolean;
}) {
  const isHealthy = type === "healthy";

  return (
    <div
      className="relative w-full h-full rounded-[60px] overflow-hidden"
      style={{
        background: isHealthy
          ? "linear-gradient(180deg, #0d2818 0%, #052e16 40%, #022c22 100%)"
          : "linear-gradient(180deg, #2a1810 0%, #1a1008 40%, #0f0804 100%)",
        boxShadow: `
          inset 0 0 60px ${isHealthy ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)"},
          0 20px 60px -10px ${isHealthy ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.15)"}
        `,
      }}
    >
      {/* Inner glass layer */}
      <div
        className="absolute inset-2 rounded-[52px] overflow-hidden"
        style={{
          background: isHealthy
            ? "linear-gradient(180deg, rgba(16,185,129,0.08) 0%, transparent 50%, rgba(5,46,22,0.3) 100%)"
            : "linear-gradient(180deg, rgba(239,68,68,0.05) 0%, transparent 50%, rgba(69,10,10,0.2) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Plant illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlantIllustration type={type} isScanning={isScanning} />
        </div>

        {/* Neural nodes overlay */}
        <NeuralNodes isHealthy={isHealthy} />

        {/* Confidence ring */}
        <ConfidenceRing isHealthy={isHealthy} isScanning={isScanning} />

        {/* Scanner brackets */}
        <ScannerBrackets isScanning={isScanning} />

        {/* Bottom info bar */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isHealthy ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}
            />
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
              {isHealthy ? "Healthy" : "Diseased"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-white/30" />
            <span className="text-[10px] text-white/30">
              {isHealthy ? "98.4%" : "96.7%"}
            </span>
          </div>
        </div>
      </div>

      {/* Gloss reflection */}
      <div
        className="absolute inset-0 rounded-[60px] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 50%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ============================================
   PLANT ILLUSTRATION (SVG)
   ============================================ */
function PlantIllustration({
  type,
  isScanning,
}: {
  type: "healthy" | "diseased";
  isScanning: boolean;
}) {
  const isHealthy = type === "healthy";

  return (
    <motion.div
      className="relative w-48 h-64"
      animate={{
        scale: isScanning ? [1, 1.02, 1] : 1,
        filter: isScanning
          ? ["brightness(1)", "brightness(1.3)", "brightness(1)"]
          : "brightness(1)",
      }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 200 280"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
      >
        {/* Stem */}
        <path
          d="M100,260 Q100,200 100,150 Q100,100 100,50"
          stroke={isHealthy ? "#059669" : "#78350f"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Leaf 1 - Left */}
        <motion.path
          d={isHealthy
            ? "M100,180 Q60,160 40,130 Q30,100 50,80 Q70,70 90,90 Q100,110 100,130"
            : "M100,180 Q60,165 42,135 Q33,105 52,85 Q70,75 88,95 Q98,115 100,135"}
          fill={isHealthy ? "#10b981" : "#92400e"}
          opacity={isHealthy ? 0.9 : 0.7}
          animate={isScanning ? { opacity: [0.9, 0.5, 0.9] } : {}}
          transition={{ duration: 0.6 }}
        />
        {!isHealthy && (
          <path
            d="M55,110 Q65,105 75,115 Q70,125 60,120Z"
            fill="#451a03"
            opacity={0.6}
          />
        )}

        {/* Leaf 2 - Right */}
        <motion.path
          d={isHealthy
            ? "M100,140 Q140,120 160,90 Q170,60 150,40 Q130,30 110,50 Q100,70 100,90"
            : "M100,140 Q140,125 158,95 Q168,65 148,45 Q130,35 110,55 Q100,75 100,95"}
          fill={isHealthy ? "#34d399" : "#a16207"}
          opacity={isHealthy ? 0.85 : 0.65}
          animate={isScanning ? { opacity: [0.85, 0.4, 0.85] } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        {!isHealthy && (
          <>
            <path
              d="M130,70 Q140,65 145,75 Q138,82 130,78Z"
              fill="#451a03"
              opacity={0.5}
            />
            <circle cx="125" cy="85" r="3" fill="#7c2d12" opacity={0.4} />
          </>
        )}

        {/* Leaf 3 - Top */}
        <motion.path
          d={isHealthy
            ? "M100,80 Q80,50 85,25 Q90,10 100,5 Q110,10 115,25 Q120,50 100,80"
            : "M100,80 Q82,52 87,28 Q92,12 100,8 Q108,12 112,28 Q117,52 100,80"}
          fill={isHealthy ? "#6ee7b7" : "#b45309"}
          opacity={isHealthy ? 0.8 : 0.6}
          animate={isScanning ? { opacity: [0.8, 0.3, 0.8] } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {!isHealthy && (
          <path
            d="M95,35 Q100,30 105,38 Q100,45 95,40Z"
            fill="#451a03"
            opacity={0.5}
          />
        )}

        {/* Veins */}
        <path
          d="M100,180 Q80,170 60,160 M100,140 Q120,130 140,120 M100,80 Q90,60 85,40"
          stroke={isHealthy ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"}
          strokeWidth="1"
          fill="none"
        />

        {/* Healthy glow dots */}
        {isHealthy && (
          <>
            <circle cx="60" cy="110" r="2" fill="#34d399" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="140" cy="80" r="1.5" fill="#6ee7b7" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="95" cy="30" r="2" fill="#a7f3d0" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Disease spots */}
        {!isHealthy && (
          <>
            <circle cx="55" cy="115" r="4" fill="#451a03" opacity="0.5" />
            <circle cx="135" cy="75" r="5" fill="#7c2d12" opacity="0.4" />
            <circle cx="98" cy="40" r="3" fill="#451a03" opacity="0.6" />
            <ellipse cx="70" cy="140" rx="6" ry="4" fill="#92400e" opacity="0.3" transform="rotate(-20 70 140)" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

/* ============================================
   NEURAL NODES
   ============================================ */
function NeuralNodes({ isHealthy }: { isHealthy: boolean }) {
  const nodes = [
    { x: "15%", y: "20%", delay: 0 },
    { x: "80%", y: "15%", delay: 0.5 },
    { x: "10%", y: "60%", delay: 1 },
    { x: "85%", y: "55%", delay: 1.5 },
    { x: "50%", y: "10%", delay: 2 },
    { x: "20%", y: "85%", delay: 0.8 },
    { x: "75%", y: "80%", delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="15%" y1="20%" x2="50%" y2="50%" stroke={isHealthy ? "#10b981" : "#ef4444"} strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="80%" y1="15%" x2="50%" y2="50%" stroke={isHealthy ? "#10b981" : "#ef4444"} strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="10%" y1="60%" x2="50%" y2="50%" stroke={isHealthy ? "#10b981" : "#ef4444"} strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="85%" y1="55%" x2="50%" y2="50%" stroke={isHealthy ? "#10b981" : "#ef4444"} strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${isHealthy ? "bg-emerald-400" : "bg-red-400"}`}
            style={{ boxShadow: `0 0 8px ${isHealthy ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)"}` }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================
   CONFIDENCE RING
   ============================================ */
function ConfidenceRing({
  isHealthy,
  isScanning,
}: {
  isHealthy: boolean;
  isScanning: boolean;
}) {
  return (
    <div className="absolute top-6 right-6 w-10 h-10 pointer-events-none">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <motion.circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={isHealthy ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="100"
          animate={{
            strokeDashoffset: isScanning ? [100, 0, 0] : 15,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Zap className={`w-3 h-3 ${isHealthy ? "text-emerald-400" : "text-red-400"}`} />
      </div>
    </div>
  );
}

/* ============================================
   SCANNER BRACKETS
   ============================================ */
function ScannerBrackets({ isScanning }: { isScanning: boolean }) {
  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-4 rounded-[48px] pointer-events-none z-10"
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-400/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400/60 rounded-br-lg" />

          {/* Scanning label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-sm">
              <Scan className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-[8px] font-medium text-emerald-400 uppercase tracking-wider">
                Scanning
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function FloatingParticles({ isFlipped }: { isFlipped: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: `${10 + (i * 73) % 80}%`,
    y: `${15 + (i * 41) % 70}%`,
    size: 2 + (i % 3),
    duration: 3 + (i % 4),
    delay: i * 0.2,
}));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: isFlipped
              ? "rgba(239,68,68,0.2)"
              : "rgba(16,185,129,0.2)",
            boxShadow: isFlipped
              ? `0 0 ${p.size * 3}px rgba(239,68,68,0.3)`
              : `0 0 ${p.size * 3}px rgba(16,185,129,0.3)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================
   FLOATING LABELS
   ============================================ */
function FloatingLabels({ isFlipped }: { isFlipped: boolean }) {
  return (
    <div className="absolute -bottom-16 left-0 right-0 text-center">
      <AnimatePresence mode="wait">
        {isFlipped ? (
          <motion.div
            key="diseased"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-white/80">
              Is your plant <span className="text-red-400">sick</span>?
            </p>
            <p className="text-sm text-white/40 mt-1">
              Upload an image and let AI identify the problem in seconds.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="healthy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-white/80">
              Keep your plants <span className="text-emerald-400">healthy</span>.
            </p>
            <p className="text-sm text-white/40 mt-1">
              Detect diseases before they spread using AI-powered analysis.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}