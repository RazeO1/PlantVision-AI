"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { iPhoneMockup as IPhoneMockup } from "./iPhoneMockup";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-powered Plant Disease Detection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Early Detection.
              <br />
              Healthier Crops.
              <br />
              <span className="text-gradient">Smarter Farming.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-white/50 max-w-lg leading-relaxed"
            >
              Upload a leaf image and receive AI-powered disease detection,
              confidence scores, and treatment recommendations in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#demo"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Upload Image
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://github.com/RazeO1/PlantVision-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-xl"
              >
                View GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-8 pt-8 border-t border-white/10"
            >
              {[
                { value: "90%", label: "Model Accuracy" },
                { value: "38+", label: "Disease Classes" },
                { value: "14", label: "Plant Species" },
                { value: "<2s", label: "Inference" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl font-bold text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D iPhone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <IPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}