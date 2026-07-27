"use client";

import { motion } from "framer-motion";
import { Leaf, Github, Linkedin, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold">
                PlantVision <span className="text-emerald-400">AI</span>
              </span>
            </a>
            <p className="text-white/40 max-w-sm leading-relaxed">
              AI-powered plant disease detection for healthier crops and smarter
              farming. Open source and free to use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {["Features", "How It Works", "Demo", "API"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white/40 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/RazeO1/PlantVision-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://your-portfolio.com" //Later Replace with your actual portfolio URL
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all"
                aria-label="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/yraze"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:hiiamyashraj@gmail.com"
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} PlantVision AI. All rights reserved.
          </p>
          <p className="text-sm text-white/30">
            Built with care for farmers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}