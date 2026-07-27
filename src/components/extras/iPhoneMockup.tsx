"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Leaf, Upload, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export function iPhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for subtle parallax inside the screen when tilted
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !isHovered) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[260px] mx-auto"
      style={{ perspective: "1400px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-16 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* 3D Phone */}
      <motion.div
        animate={{
          rotateY: isHovered ? 0 : 18,
          rotateX: isHovered ? 0 : -6,
          rotateZ: isHovered ? 0 : -2,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120, mass: 0.8 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* iPhone Frame */}
          <div
            className="relative rounded-[40px] p-[7px]"
            style={{
              background: "linear-gradient(165deg, #3a3a3c 0%, #1c1c1e 30%, #0a0a0a 70%, #2a2a2c 100%)",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.06),
                0 35px 70px -15px rgba(0,0,0,0.9),
                0 0 0 2px rgba(255,255,255,0.02),
                inset 0 1px 0 rgba(255,255,255,0.12),
                inset 0 -1px 0 rgba(0,0,0,0.5)
              `,
            }}
          >
            {/* Side buttons */}
            <div className="absolute -left-[2px] top-[90px] w-[2px] h-[22px] rounded-l bg-[#3a3a3c]" />
            <div className="absolute -left-[2px] top-[120px] w-[2px] h-[42px] rounded-l bg-[#3a3a3c]" />
            <div className="absolute -left-[2px] top-[172px] w-[2px] h-[42px] rounded-l bg-[#3a3a3c]" />
            <div className="absolute -right-[2px] top-[130px] w-[2px] h-[70px] rounded-r bg-[#3a3a3c]" />

            {/* Inner bezel */}
            <div
              className="relative rounded-[34px] overflow-hidden"
              style={{
                background: "#000",
                boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.04)",
              }}
            >
              {/* Screen */}
              <div className="relative w-[246px] h-[520px] bg-[#050505] overflow-hidden">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-[44px] z-30 flex items-end justify-between px-7 pb-1.5">
                  <span className="text-[10px] font-semibold text-white/90 tracking-wide">9:41</span>
                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5">
                    {/* Dynamic Island */}
                    <div className="w-[78px] h-[24px] bg-black rounded-full flex items-center justify-center gap-1">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a] ring-1 ring-white/5" />
                      <div className="w-[6px] h-[6px] rounded-full bg-[#0d3b1e] ring-1 ring-emerald-500/20" />
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <svg className="w-3.5 h-3.5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
                    </svg>
                    <svg className="w-3.5 h-3.5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                    </svg>
                  </div>
                </div>

                {/* Scrollable Content */}
                <motion.div
                  className="h-full overflow-y-auto scrollbar-hide pt-[44px] pb-6"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  animate={{
                    cursor: isHovered ? "grab" : "default",
                  }}
                >
                  {/* App Header */}
                  <div className="px-4 pt-3 pb-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold tracking-tight">PlantVision AI</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight mt-1.5">
                      Detect <span className="text-emerald-400">Disease</span>
                    </h2>
                    <p className="text-[10px] text-white/30 mt-0.5">Upload a leaf photo for instant analysis</p>
                  </div>

                  {/* Upload Card */}
                  <div className="mx-3.5 p-4 rounded-2xl bg-white/[0.035] border border-white/[0.06] border-dashed">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-medium text-center text-white/80">Tap to Upload</p>
                    <p className="text-[9px] text-center text-white/25 mt-0.5">PNG · JPG · JPEG</p>
                  </div>

                  {/* Detection Result Card */}
                  <div className="mx-3.5 mt-3 p-3.5 rounded-2xl bg-white/[0.035] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[9px] uppercase tracking-wider text-white/25">Latest Result</span>
                      <span className="text-[9px] text-emerald-400">Just now</span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">Tomato Early Blight</p>
                        <p className="text-[9px] text-white/25">Alternaria solani</p>
                      </div>
                    </div>

                    {/* Confidence */}
                    <div className="space-y-1 mb-2.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/30">Confidence</span>
                        <span className="text-emerald-400 font-semibold">98.4%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[98.4%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] mb-2">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-white/25" />
                        <span className="text-[10px] text-white/30">Severity</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/12 text-yellow-400 text-[9px] font-medium border border-yellow-500/15">
                        Moderate
                      </span>
                    </div>

                    {/* Treatment */}
                    <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/8">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[9px] font-medium text-emerald-400">Treatment</span>
                      </div>
                      <p className="text-[9px] text-white/40 leading-relaxed">
                        Apply copper fungicide. Remove infected leaves. Ensure air circulation.
                      </p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="mx-3.5 mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: "Accuracy", value: "90%" },
                      { label: "Diseases", value: "38+" },
                      { label: "Speed", value: "<2s" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-2.5 rounded-xl bg-white/[0.035] text-center">
                        <p className="text-base font-bold text-emerald-400">{stat.value}</p>
                        <p className="text-[8px] text-white/25 uppercase tracking-wider mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Extra scroll content for demo */}
                  <div className="mx-3.5 mt-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-[10px] font-medium text-white/50 mb-2">Recent Scans</p>
                    {[
                      { name: "Potato Late Blight", conf: "96.7%", time: "5m ago" },
                      { name: "Corn Common Rust", conf: "94.2%", time: "12m ago" },
                      { name: "Grape Black Rot", conf: "97.1%", time: "18m ago" },
                    ].map((scan, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                        <div>
                          <p className="text-[10px] text-white/70">{scan.name}</p>
                          <p className="text-[8px] text-white/20">{scan.time}</p>
                        </div>
                        <span className="text-[10px] font-medium text-emerald-400">{scan.conf}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-4" />
                </motion.div>

                {/* Glossy glass reflection overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: `
                      linear-gradient(115deg, 
                        rgba(255,255,255,0.18) 0%, 
                        rgba(255,255,255,0.05) 25%, 
                        transparent 35%, 
                        transparent 65%, 
                        rgba(255,255,255,0.03) 75%, 
                        rgba(255,255,255,0.1) 100%
                      )
                    `,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Top edge shine */}
                <div
                  className="absolute top-0 left-4 right-4 h-[1px] z-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/25 rounded-full z-30" />
            </div>
          </div>

          {/* Floor shadow */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-[12px] rounded-full blur-lg opacity-50"
            style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 80%)" }}
          />
        </motion.div>
      </motion.div>

      {/* Hover hint */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/20 whitespace-nowrap"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Hover to interact
      </motion.div>
    </div>
  );
}