"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Upload, X, Leaf, AlertTriangle, CheckCircle2 } from "lucide-react";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  treatment: string;
  description: string;
}

const mockResults: Record<string, DetectionResult> = {
  "tomato-early-blight": {
    disease: "Tomato Early Blight",
    confidence: 98.4,
    severity: "Moderate",
    treatment:
      "Apply copper-based fungicide. Remove infected lower leaves. Ensure proper spacing for air circulation. Water at the base, avoid wetting foliage.",
    description:
      "Early blight is caused by the fungus Alternaria solani. It appears as dark brown spots with concentric rings on older leaves.",
  },
  "potato-late-blight": {
    disease: "Potato Late Blight",
    confidence: 96.7,
    severity: "Critical",
    treatment:
      "Apply fungicide immediately. Destroy all infected plant material. Avoid overhead irrigation. Plant resistant varieties next season.",
    description:
      "Late blight is caused by Phytophthora infestans. It causes dark, water-soaked lesions on leaves and stems.",
  },
  "corn-common-rust": {
    disease: "Corn Common Rust",
    confidence: 94.2,
    severity: "Low",
    treatment:
      "Apply fungicide if severity exceeds 5%. Plant resistant hybrids. Scout fields regularly during humid conditions.",
    description:
      "Common rust is caused by Puccinia sorghi. It appears as small, reddish-brown pustules on leaf surfaces.",
  },
  "grape-black-rot": {
    disease: "Grape Black Rot",
    confidence: 97.1,
    severity: "High",
    treatment:
      "Prune and destroy infected canes and mummified berries. Apply fungicide during bloom and fruit development. Improve air circulation.",
    description:
      "Black rot is caused by Guignardia bidwellii. It causes circular reddish-brown spots on leaves and shriveled black berries.",
  },
};

export function DemoSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    []
  );

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      analyzeImage();
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const keys = Object.keys(mockResults);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setResult(mockResults[randomKey]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const reset = () => {
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-400";
      case "Moderate":
        return "bg-yellow-500/20 text-yellow-400";
      case "High":
        return "bg-orange-500/20 text-orange-400";
      case "Critical":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-emerald-500/20 text-emerald-400";
    }
  };

  return (
    <section id="demo" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
            Try It Now
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Upload a leaf image
            <br />
            <span className="text-gradient">See AI in action</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            No signup required. Drag and drop any leaf image to get instant
            disease detection results powered by our AI model.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-2">
            <div className="bg-black/40 rounded-2xl overflow-hidden">
              {!uploadedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative p-12 cursor-pointer transition-all duration-500 ${
                    isDragging
                      ? "bg-emerald-500/10 border-2 border-dashed border-emerald-400"
                      : "border-2 border-dashed border-white/10 hover:border-white/20"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                      className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center"
                    >
                      <Upload className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-white/80">
                        {isDragging
                          ? "Drop your image here"
                          : "Drag & Drop Leaf Image"}
                      </p>
                      <p className="text-sm text-white/40 mt-1">
                        or click to browse your computer
                      </p>
                      <p className="text-xs text-white/30 mt-2">
                        PNG · JPG · JPEG · WebP
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative w-full max-w-xs mx-auto">
                      <img
                        src={uploadedImage}
                        alt="Uploaded leaf"
                        className="w-full rounded-2xl object-cover aspect-square"
                      />
                      <button
                        onClick={reset}
                        className="absolute -top-2 -right-2 p-2 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                      <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full mx-auto mb-4"
                        />
                        <p className="text-white/60">Analyzing image...</p>
                        <p className="text-sm text-white/30 mt-1">
                          Running neural network inference
                        </p>
                      </motion.div>
                    ) : result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-500/10 rounded-xl">
                            <Leaf className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">
                              Prediction
                            </p>
                            <p className="text-xl font-bold">
                              {result.disease}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-white/60">Confidence</span>
                              <span className="text-emerald-400 font-bold">
                                {result.confidence}%
                              </span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${result.confidence}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-white/40" />
                              <span className="text-sm text-white/60">
                                Severity
                              </span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                                result.severity
                              )}`}
                            >
                              {result.severity}
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/5 space-y-2">
                            <p className="text-sm text-white/40">
                              Description
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {result.description}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <p className="text-sm font-medium text-emerald-400">
                                Recommended Treatment
                              </p>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {result.treatment}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={reset}
                          className="w-full py-3 glass rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
                        >
                          Analyze Another Image
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}