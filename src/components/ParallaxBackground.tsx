"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Abstract leaf SVG paths - organic, flowing shapes
const leafPaths = [
  // Large flowing leaf
  "M50,10 C20,30 5,60 15,90 C25,120 60,130 80,110 C100,90 110,60 95,35 C80,10 60,0 50,10Z",
  // Medium pointed leaf
  "M50,5 C35,25 20,50 25,80 C30,110 45,120 50,125 C55,120 70,110 75,80 C80,50 65,25 50,5Z",
  // Small rounded leaf
  "M50,15 C30,25 20,45 25,65 C30,85 45,95 50,100 C55,95 70,85 75,65 C80,45 70,25 50,15Z",
  // Fern-like frond
  "M50,5 C40,20 30,40 35,60 C38,75 45,85 50,90 C55,85 62,75 65,60 C70,40 60,20 50,5 M35,35 L50,45 L65,35 M32,50 L50,60 L68,50",
  // Abstract organic shape
  "M50,8 C25,20 10,45 18,75 C25,105 45,115 50,118 C55,115 75,105 82,75 C90,45 75,20 50,8Z",
];

function LeafShape({
  path,
  color,
  size,
  x,
  y,
  rotate,
  opacity,
}: {
  path: string;
  color: string;
  size: number;
  x: string;
  y: string;
  rotate: number;
  opacity: number;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size * 1.3,
        left: x,
        top: y,
        opacity,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <path d={path} fill={color} />
    </svg>
  );
}

function ParallaxLayer({
  speed,
  children,
}: {
  speed: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speed * 300]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="absolute inset-0 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Layer 1: Large faint silhouettes (slowest - deep background) */}
      <ParallaxLayer speed={0.15}>
        <LeafShape
          path={leafPaths[0]}
          color="rgba(16, 185, 129, 0.03)"
          size={500}
          x="-10%"
          y="10%"
          rotate={-15}
          opacity={0.6}
        />
        <LeafShape
          path={leafPaths[3]}
          color="rgba(20, 184, 166, 0.025)"
          size={600}
          x="60%"
          y="40%"
          rotate={25}
          opacity={0.5}
        />
        <LeafShape
          path={leafPaths[1]}
          color="rgba(52, 211, 153, 0.02)"
          size={450}
          x="30%"
          y="70%"
          rotate={-30}
          opacity={0.4}
        />
      </ParallaxLayer>

      {/* Layer 2: Medium shapes with subtle color (medium speed) */}
      <ParallaxLayer speed={0.35}>
        <LeafShape
          path={leafPaths[2]}
          color="rgba(16, 185, 129, 0.05)"
          size={280}
          x="75%"
          y="5%"
          rotate={45}
          opacity={0.7}
        />
        <LeafShape
          path={leafPaths[4]}
          color="rgba(20, 184, 166, 0.04)"
          size={320}
          x="5%"
          y="55%"
          rotate={-20}
          opacity={0.6}
        />
        <LeafShape
          path={leafPaths[0]}
          color="rgba(52, 211, 153, 0.035)"
          size={250}
          x="50%"
          y="85%"
          rotate={60}
          opacity={0.5}
        />
        <LeafShape
          path={leafPaths[1]}
          color="rgba(16, 185, 129, 0.03)"
          size={200}
          x="85%"
          y="65%"
          rotate={-40}
          opacity={0.5}
        />
      </ParallaxLayer>

      {/* Layer 3: Small accent leaves (faster - foreground depth) */}
      <ParallaxLayer speed={0.6}>
        <LeafShape
          path={leafPaths[2]}
          color="rgba(16, 185, 129, 0.06)"
          size={120}
          x="15%"
          y="25%"
          rotate={15}
          opacity={0.5}
        />
        <LeafShape
          path={leafPaths[4]}
          color="rgba(20, 184, 166, 0.05)"
          size={100}
          x="70%"
          y="35%"
          rotate={-55}
          opacity={0.4}
        />
        <LeafShape
          path={leafPaths[1]}
          color="rgba(52, 211, 153, 0.045)"
          size={90}
          x="40%"
          y="50%"
          rotate={35}
          opacity={0.5}
        />
        <LeafShape
          path={leafPaths[3]}
          color="rgba(16, 185, 129, 0.04)"
          size={110}
          x="90%"
          y="15%"
          rotate={-10}
          opacity={0.4}
        />
        <LeafShape
          path={leafPaths[0]}
          color="rgba(20, 184, 166, 0.035)"
          size={80}
          x="25%"
          y="80%"
          rotate={70}
          opacity={0.3}
        />
        <LeafShape
          path={leafPaths[2]}
          color="rgba(52, 211, 153, 0.03)"
          size={70}
          x="60%"
          y="90%"
          rotate={-25}
          opacity={0.3}
        />
      </ParallaxLayer>

      {/* Layer 4: Tiny floating particles (fastest) */}
      <ParallaxLayer speed={0.9}>
        {/* Dot particles */}
        {[
          { x: "20%", y: "15%", size: 4 },
          { x: "80%", y: "20%", size: 3 },
          { x: "45%", y: "35%", size: 5 },
          { x: "10%", y: "45%", size: 3 },
          { x: "65%", y: "50%", size: 4 },
          { x: "30%", y: "65%", size: 3 },
          { x: "85%", y: "70%", size: 5 },
          { x: "55%", y: "75%", size: 3 },
          { x: "15%", y: "85%", size: 4 },
          { x: "75%", y: "90%", size: 3 },
          { x: "50%", y: "10%", size: 3 },
          { x: "90%", y: "55%", size: 4 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              background: "rgba(16, 185, 129, 0.15)",
              boxShadow: `0 0 ${dot.size * 3}px rgba(16, 185, 129, 0.2)`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </ParallaxLayer>

      {/* Subtle vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Bottom fade for seamless section transitions */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </div>
  );
}