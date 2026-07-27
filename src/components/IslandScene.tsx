"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Html,
  MeshDistortMaterial,
  Sparkles,
  Line,
  Billboard,
} from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   TYPES
   ============================================================ */
type DiagnosisState = "idle" | "scanning" | "infected" | "diagnosed" | "treating" | "healing" | "healthy";

/* ============================================================
   LERP HELPER (no external dependency)
   ============================================================ */
function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

function lerpColor(current: THREE.Color, target: THREE.Color, t: number) {
  current.r = lerp(current.r, target.r, t);
  current.g = lerp(current.g, target.g, t);
  current.b = lerp(current.b, target.b, t);
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */
export default function IslandScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 7], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 12, 25]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-3, 4, -3]} intensity={0.5} color="#10b981" />
      <pointLight position={[3, 2, 3]} intensity={0.3} color="#34d399" />

      <FloatingIsland />

      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.5}
        scale={12}
        blur={2.5}
        far={5}
        color="#000000"
      />
    </Canvas>
  );
}

/* ============================================================
   FLOATING ISLAND
   ============================================================ */
function FloatingIsland() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [state, setState] = useState<DiagnosisState>("idle");
  const [scanProgress, setScanProgress] = useState(0);

  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;

    const targetX = mouseRef.current.y * 0.1;
    const targetY = mouseRef.current.x * 0.05;

    rotRef.current.x = lerp(rotRef.current.x, targetX, delta * 6);
    rotRef.current.y = lerp(rotRef.current.y, targetY, delta * 6);

    groupRef.current.rotation.x = rotRef.current.x;
  });

  const runDiagnosisSequence = useCallback(async () => {
    if (state !== "idle" && state !== "healthy") return;
    setState("scanning");
    for (let i = 0; i <= 100; i += 2) {
      setScanProgress(i / 100);
      await new Promise((r) => setTimeout(r, 20));
    }
    setState("infected");
    await new Promise((r) => setTimeout(r, 800));
    setState("diagnosed");
    await new Promise((r) => setTimeout(r, 2000));
    setState("treating");
    await new Promise((r) => setTimeout(r, 1500));
    setState("healing");
    await new Promise((r) => setTimeout(r, 1500));
    setState("healthy");
    await new Promise((r) => setTimeout(r, 1000));
    setState("idle");
    setScanProgress(0);
  }, [state]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={runDiagnosisSequence}
    >
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4} floatingRange={[-0.15, 0.15]}>
        <IslandBase />
        <TomatoPlant state={state} />
        <GrassClumps />
        <Rocks />
        <Flowers />
        <Roots />
        <AINodes visible={hovered || state !== "idle"} />
        <AmbientParticles />
        {state === "scanning" && <ScanBeam progress={scanProgress} />}
        {(state === "diagnosed" || state === "treating") && (
          <HolographicLabel state={state} />
        )}
      </Float>
    </group>
  );
}

/* ============================================================
   ISLAND BASE
   ============================================================ */
function IslandBase() {
  return (
    <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
      <cylinderGeometry args={[2.2, 2.8, 1.2, 48, 4]} />
      <MeshDistortMaterial color="#1a2f1a" distort={0.15} speed={1.5} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

/* ============================================================
   TOMATO PLANT
   ============================================================ */
function TomatoPlant({ state }: { state: DiagnosisState }) {
  const isInfected = state === "infected" || state === "diagnosed" || state === "treating";
  const isHealing = state === "healing";

  const stemPath = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.05, 0.8, 0.02),
      new THREE.Vector3(-0.03, 1.6, -0.01),
      new THREE.Vector3(0.02, 2.4, 0.01),
      new THREE.Vector3(0, 3.0, 0),
    ]);
    return curve;
  }, []);

  const leaves = [
    { pos: [0.4, 1.2, 0.2] as [number, number, number], rot: [0.3, 0.5, 0.8] as [number, number, number], scale: 0.35, index: 0 },
    { pos: [-0.35, 1.8, -0.1] as [number, number, number], rot: [0.2, -0.8, -0.5] as [number, number, number], scale: 0.4, index: 1 },
    { pos: [0.2, 2.4, 0.3] as [number, number, number], rot: [-0.3, 0.3, 0.6] as [number, number, number], scale: 0.32, index: 2 },
    { pos: [-0.2, 2.0, 0.25] as [number, number, number], rot: [0.1, -0.4, -0.7] as [number, number, number], scale: 0.3, index: 3 },
    { pos: [0.3, 2.8, -0.15] as [number, number, number], rot: [-0.4, 0.6, 0.4] as [number, number, number], scale: 0.28, index: 4 },
  ];

  return (
    <group position={[0, 0.2, 0]}>
      {/* Stem */}
      <mesh castShadow>
        <tubeGeometry args={[stemPath, 20, 0.06, 8, false]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.05, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.2} />
      </mesh>

      {/* Leaves */}
      {leaves.map((leaf) => (
        <PlantLeaf
          key={leaf.index}
          position={leaf.pos}
          rotation={leaf.rot}
          scale={leaf.scale}
          isInfected={isInfected}
          isHealing={isHealing}
          isTarget={leaf.index === 2}
        />
      ))}

      {/* Tomatoes */}
      <Tomato position={[0.35, 1.6, 0.15]} scale={0.18} />
      <Tomato position={[-0.25, 2.2, 0.1]} scale={0.16} />
      <Tomato position={[0.15, 2.6, -0.2]} scale={0.15} />
    </group>
  );
}

function PlantLeaf({
  position,
  rotation,
  scale,
  isInfected,
  isHealing,
  isTarget,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  isInfected: boolean;
  isHealing: boolean;
  isTarget: boolean;
}) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    const targetColor = isTarget && isInfected
      ? new THREE.Color("#8B4513")
      : isTarget && isHealing
      ? new THREE.Color("#4ade80")
      : new THREE.Color("#22c55e");
    lerpColor(materialRef.current.color, targetColor, delta * 8);

    const targetEmissive = isTarget && isInfected
      ? new THREE.Color("#ef4444")
      : isTarget && isHealing
      ? new THREE.Color("#10b981")
      : new THREE.Color("#000000");
    lerpColor(materialRef.current.emissive, targetEmissive, delta * 8);

    const targetIntensity = isTarget && (isInfected || isHealing) ? 0.3 : 0;
    materialRef.current.emissiveIntensity = lerp(materialRef.current.emissiveIntensity, targetIntensity, delta * 8);
  });

  return (
    <mesh position={position} rotation={rotation} scale={[scale * 1.8, scale, scale * 1.5]} castShadow>
      <sphereGeometry args={[1, 12, 8]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#22c55e"
        roughness={0.7}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Tomato({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.1} emissive="#991b1b" emissiveIntensity={0.1} />
      <mesh position={[0, 0.9, 0]} scale={[0.3, 0.4, 0.3]}>
        <cylinderGeometry args={[0.3, 0.5, 1, 6]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
    </mesh>
  );
}

/* ============================================================
   ENVIRONMENT
   ============================================================ */
function GrassClumps() {
  const grass = useMemo(() => Array.from({ length: 40 }, () => ({
    x: (Math.random() - 0.5) * 3.5,
    z: (Math.random() - 0.5) * 3.5,
    h: 0.2 + Math.random() * 0.25,
    r: Math.random() * Math.PI * 2,
    t: (Math.random() - 0.5) * 0.3,
  })), []);

  return (
    <group>
      {grass.map((g, i) => (
        <mesh key={i} position={[g.x, 0.1, g.z]} rotation={[g.t, g.r, 0]} castShadow>
          <coneGeometry args={[0.03, g.h, 4]} />
          <meshStandardMaterial color="#166534" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Rocks() {
  const rocks = useMemo(() => [
    { pos: [1.2, -0.1, 0.8] as [number, number, number], s: 0.25, r: [0.2, 0.5, 0.1] as [number, number, number] },
    { pos: [-1.0, -0.15, 0.6] as [number, number, number], s: 0.18, r: [0.1, -0.3, 0.2] as [number, number, number] },
    { pos: [0.5, -0.2, -1.1] as [number, number, number], s: 0.22, r: [-0.1, 0.8, 0.05] as [number, number, number] },
    { pos: [-0.6, -0.1, -0.8] as [number, number, number], s: 0.15, r: [0.3, -0.6, -0.1] as [number, number, number] },
  ], []);

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={r.r} scale={r.s} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.95} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Flowers() {
  const flowers = useMemo(() => [
    { pos: [0.8, 0.15, -0.6] as [number, number, number], c: "#fbbf24" },
    { pos: [-0.9, 0.12, 0.4] as [number, number, number], c: "#f472b6" },
    { pos: [0.3, 0.1, 1.0] as [number, number, number], c: "#a78bfa" },
    { pos: [-0.4, 0.18, -0.9] as [number, number, number], c: "#fbbf24" },
  ], []);

  return (
    <group>
      {flowers.map((f, i) => (
        <group key={i} position={f.pos}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.16, 6]} />
            <meshStandardMaterial color="#166534" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={f.c} emissive={f.c} emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Roots() {
  const paths = useMemo(() => [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0.3, -0.8, 0.2), new THREE.Vector3(0.6, -1.0, 0.4)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(-0.25, -0.7, -0.15), new THREE.Vector3(-0.5, -0.9, -0.3)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0.1, -0.75, -0.25), new THREE.Vector3(0.2, -0.95, -0.5)]),
  ], []);

  return (
    <group position={[0, -0.5, 0]}>
      {paths.map((path, i) => (
        <mesh key={i}>
          <tubeGeometry args={[path, 12, 0.04, 6, false]} />
          <meshStandardMaterial color="#5c4033" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   AI ELEMENTS
   ============================================================ */
function AINodes({ visible }: { visible: boolean }) {
  const nodes = useMemo(() => [
    [1.5, 1.5, 1.0] as [number, number, number],
    [-1.3, 2.0, 0.8] as [number, number, number],
    [0.8, 2.8, -1.2] as [number, number, number],
    [-1.0, 1.0, -1.0] as [number, number, number],
    [1.2, 0.5, -0.8] as [number, number, number],
    [-0.5, 3.2, 0.5] as [number, number, number],
  ], []);

  return (
    <group>
      {visible && nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return (
          <Line
            key={`line-${i}`}
            points={[node, next]}
            color="#10b981"
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        );
      })}
      {nodes.map((pos, i) => (
        <AINode key={i} position={pos} visible={visible} index={i} />
      ))}
    </group>
  );
}

function AINode({ position, visible, index }: { position: [number, number, number]; visible: boolean; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.08;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = lerp(mat.opacity, visible ? 0.9 : 0, 0.05);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color="#10b981"
        emissive="#10b981"
        emissiveIntensity={0.8}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

function AmbientParticles() {
  return (
    <Sparkles
      count={60}
      scale={6}
      size={2}
      speed={0.4}
      opacity={0.4}
      color="#34d399"
      position={[0, 1.5, 0]}
    />
  );
}

/* ============================================================
   SCANNING BEAM
   ============================================================ */
function ScanBeam({ progress }: { progress: number }) {
  const y = 3.5 - progress * 5;
  return (
    <group>
      <mesh position={[0, y, 0]}>
        <planeGeometry args={[3, 0.05]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, y, 0]}>
        <planeGeometry args={[3, 0.15]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ============================================================
   HOLOGRAPHIC LABEL
   ============================================================ */
function HolographicLabel({ state }: { state: DiagnosisState }) {
  return (
    <Billboard position={[0.8, 2.2, 0.5]} follow>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          className="flex flex-col items-start gap-1"
          style={{
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {state === "diagnosed" && (
            <>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 backdrop-blur-xl border border-emerald-500/30">
                <p className="text-xs font-bold text-emerald-400">Early Blight</p>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-[10px] text-white/60">
                  Confidence: <span className="text-emerald-400 font-semibold">98.4%</span>
                </p>
              </div>
            </>
          )}
          {state === "treating" && (
            <div className="px-3 py-2 rounded-lg bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 max-w-[180px]">
              <p className="text-[10px] text-emerald-300 font-medium mb-0.5">Treatment Applied</p>
              <p className="text-[9px] text-white/50 leading-relaxed">
                Copper fungicide &bull; Remove infected leaves &bull; Improve airflow
              </p>
            </div>
          )}
        </div>
      </Html>
    </Billboard>
  );
}