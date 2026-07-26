"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Code2, Users, Target } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Farmer First",
    description:
      "Built by farmers, for farmers. Every feature is designed with real agricultural workflows in mind.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description:
      "Our model and research are open source. We believe AI for agriculture should be accessible to everyone.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Powered by contributions from agronomists, data scientists, and farmers across 20+ countries.",
  },
  {
    icon: Target,
    title: "Precision Focused",
    description:
      "We prioritize accuracy over speed. Every prediction is validated against real-world agricultural data.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
              About Us
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Empowering farmers
              <br />
              with <span className="text-gradient">AI technology</span>
            </h2>
            <p className="mt-6 text-lg text-white/40 leading-relaxed">
              PlantVision AI was born from a simple observation: early disease
              detection can save entire harvests, but most farmers lack access to
              expert agronomists. We built an AI that fits in your pocket.
            </p>
            <p className="mt-4 text-lg text-white/40 leading-relaxed">
              Our mission is to democratize plant health diagnostics using
              cutting-edge computer vision, making precision agriculture
              accessible to every farmer regardless of location or resources.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl glass hover:bg-white/[0.08] transition-all duration-500 group"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}