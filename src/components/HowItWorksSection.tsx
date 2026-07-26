"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Cpu, FileCheck, Sprout } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Image",
    description:
      "Take a clear photo of the affected leaf and upload it through our drag-and-drop interface.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Analysis",
    description:
      "Our trained neural network processes the image, identifying disease patterns invisible to the human eye.",
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Get Results",
    description:
      "Receive the disease name, confidence score, severity level, and detailed treatment recommendations.",
  },
  {
    icon: Sprout,
    number: "04",
    title: "Treat & Recover",
    description:
      "Follow the guided treatment plan and watch your plants recover to full health.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Four simple steps to
            <br />
            <span className="text-gradient">healthier plants</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-3xl glass h-full">
                <div className="absolute -top-4 -right-4 text-6xl font-bold text-white/[0.03] group-hover:text-emerald-500/10 transition-colors duration-500">
                  {step.number}
                </div>
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}