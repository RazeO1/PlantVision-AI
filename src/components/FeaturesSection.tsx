"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scan, Zap, Shield, BarChart3, Globe, Brain } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Instant Detection",
    description:
      "Our AI model analyzes leaf images in under 2 seconds, identifying diseases with 90%+ accuracy before they spread.",
  },
  {
    icon: Brain,
    title: "Deep Learning",
    description:
      "Trained on 50,000+ images across 38 disease classes and 14 plant species using state-of-the-art convolutional neural networks.",
  },
  {
    icon: Shield,
    title: "Early Prevention",
    description:
      "Catch diseases in their earliest stages. Early detection means better treatment outcomes and higher crop yields.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    description:
      "Every prediction comes with a detailed confidence score and severity assessment to guide your treatment decisions.",
  },
  {
    icon: Zap,
    title: "Treatment Guide",
    description:
      "Get actionable treatment recommendations including organic and chemical solutions tailored to each detected disease.",
  },
  {
    icon: Globe,
    title: "Works Offline",
    description:
      "Once loaded, the model runs entirely in your browser. No internet required for predictions in remote farming areas.",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
            Features
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Everything you need to
            <br />
            <span className="text-gradient">protect your crops</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Built with modern AI to give farmers and gardeners the tools they need
            for healthier plants and better yields.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl glass hover:bg-white/[0.08] transition-all duration-500"
            >
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}