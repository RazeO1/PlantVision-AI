"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, TrendingUp, ArrowUpRight, Pause, Play } from "lucide-react";

interface PredictionCard {
  id: number;
  plant: string;
  disease: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  date: string;
  image: string;
  gradient: string;
}

const predictions: PredictionCard[] = [
  {
    id: 1,
    plant: "Tomato",
    disease: "Early Blight",
    confidence: 98.4,
    severity: "Moderate",
    date: "2 min ago",
    image: "/images/showcase/1.jpg",
    gradient: "from-emerald-900/80 to-teal-900/80",
  },
  {
    id: 2,
    plant: "Potato",
    disease: "Late Blight",
    confidence: 96.7,
    severity: "Critical",
    date: "5 min ago",
    image: "/images/showcase/2.jpg",
    gradient: "from-red-900/80 to-orange-900/80",
  },
  {
    id: 3,
    plant: "Corn",
    disease: "Common Rust",
    confidence: 94.2,
    severity: "Low",
    date: "12 min ago",
    image: "/images/showcase/3.jpg",
    gradient: "from-yellow-900/80 to-amber-900/80",
  },
  {
    id: 4,
    plant: "Grape",
    disease: "Black Rot",
    confidence: 97.1,
    severity: "High",
    date: "18 min ago",
    image: "/images/showcase/4.jpg",
    gradient: "from-purple-900/80 to-pink-900/80",
  },
  {
    id: 5,
    plant: "Apple",
    disease: "Scab Disease",
    confidence: 95.8,
    severity: "Moderate",
    date: "24 min ago",
    image: "/images/showcase/5.jpg",
    gradient: "from-green-900/80 to-emerald-900/80",
  },
  {
    id: 6,
    plant: "Pepper",
    disease: "Bacterial Spot",
    confidence: 93.5,
    severity: "High",
    date: "31 min ago",
    image: "/images/showcase/6.jpg",
    gradient: "from-orange-900/80 to-red-900/80",
  },
  {
    id: 7,
    plant: "Strawberry",
    disease: "Leaf Scorch",
    confidence: 91.2,
    severity: "Low",
    date: "45 min ago",
    image: "/images/showcase/7.jpg",
    gradient: "from-pink-900/80 to-rose-900/80",
  },
  {
    id: 8,
    plant: "Peach",
    disease: "Bacterial Spot",
    confidence: 89.7,
    severity: "Moderate",
    date: "1 hr ago",
    image: "/images/showcase/8.jpg",
    gradient: "from-amber-900/80 to-yellow-900/80",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30";
    case "Moderate":
      return "bg-yellow-400/20 text-yellow-300 ring-1 ring-yellow-400/30";
    case "High":
      return "bg-orange-400/20 text-orange-300 ring-1 ring-orange-400/30";
    case "Critical":
      return "bg-red-400/20 text-red-300 ring-1 ring-red-400/30";
    default:
      return "bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30";
  }
};

function PredictionCardComponent({
  card,
  index,
}: {
  card: PredictionCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative flex-shrink-0 w-[280px] cursor-pointer"
    >
      <div className="relative h-[380px] rounded-[28px] overflow-hidden bg-[#141414] shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/50 group-hover:-translate-y-2">
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={card.image}
            alt={card.disease}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Gloss reflection */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
          }}
        />

        {/* Top badge */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">
              {card.plant}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-bold text-white/90">{card.confidence}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">
            {card.disease}
          </h3>

          {/* Progress bar */}
          <div className="mt-3 mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Confidence</span>
              <span className="text-xs font-semibold text-emerald-400">{card.confidence}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                initial={{ width: 0 }}
                whileInView={{ width: `${card.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + index * 0.08 }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${getSeverityColor(card.severity)}`}>
              {card.severity}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PredictionShowcase() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Duplicate for seamless loop
  const allCards = [...predictions, ...predictions, ...predictions];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
              Live Predictions
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              Recent <span className="text-gradient">detections</span>
            </h2>
            <p className="mt-4 text-lg text-white/40 max-w-xl">
              Real-time disease detection results from our AI model. Hover over
              cards to interact.
            </p>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white/60 hover:text-white backdrop-blur-xl"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5" /> Resume
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track - CSS animation for seamless pause/resume */}
        <div className="overflow-hidden py-4">
          <div
            className="flex gap-6 w-max"
            style={{
              animation: "marquee 50s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {allCards.map((card, index) => (
              <PredictionCardComponent
                key={`${card.id}-${index}`}
                card={card}
                index={index % predictions.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 mt-14"
      >
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Live detection active</span>
          </div>
          <div className="hidden sm:block text-white/10">|</div>
          <div>1,247 predictions today</div>
          <div className="hidden sm:block text-white/10">|</div>
          <div>98.2% average accuracy</div>
        </div>
      </motion.div>

      {/* Inject marquee keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}