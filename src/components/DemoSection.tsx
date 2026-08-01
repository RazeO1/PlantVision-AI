"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Droplets,
  Thermometer,
  Clock,
  Hash,
  Tag,
  Sprout,
  Bug,
  ChevronDown,
} from "lucide-react";
import { predictDisease } from "@/lib/api";

// ─── Types matching your backend exactly ─────────────────────────────
interface TreatmentDetail {
  disease: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  severity: string;
}

interface BackendResponse {
  success: boolean;
  prediction: string;
  plant: string;
  disease: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  treatment: TreatmentDetail;
  processing_time_ms: number;
  model_version: string;
  request_id: string;
}

interface DetectionResult {
  prediction: string;
  plant: string;
  disease: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  description: string;
  symptoms: string[];
  causes: string[];
  treatmentSteps: string[];
  prevention: string[];
  processingTimeMs: number;
  modelVersion: string;
  requestId: string;
}

// ─── Component ───────────────────────────────────────────────────────
export function DemoSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
    if (file && file.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    []
  );

  const processFile = (file: File) => {
    setError(null);
    setResult(null);
    setPendingFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (uploadedImage && pendingFile && !isAnalyzing && !result) {
      analyzeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage, pendingFile]);

  const analyzeImage = async () => {
    if (!pendingFile) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data: BackendResponse = await predictDisease(pendingFile);

      setResult({
        prediction: data.prediction,
        plant: data.plant,
        disease: data.disease,
        confidence: Math.round(data.confidence * 100) / 100,
        severity: data.severity,
        description: data.treatment.description,
        symptoms: data.treatment.symptoms,
        causes: data.treatment.causes,
        treatmentSteps: data.treatment.treatment,
        prevention: data.treatment.prevention,
        processingTimeMs: Math.round(data.processing_time_ms),
        modelVersion: data.model_version,
        requestId: data.request_id,
      });
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setUploadedImage(null);
    setPendingFile(null);
    setResult(null);
    setIsAnalyzing(false);
    setError(null);
    setExpandedSection(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Low":
        return <ShieldCheck className="w-4 h-4" />;
      case "Moderate":
        return <AlertTriangle className="w-4 h-4" />;
      case "High":
        return <Activity className="w-4 h-4" />;
      case "Critical":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionCard = ({
    title,
    icon: Icon,
    children,
    sectionKey,
    items,
  }: {
    title: string;
    icon: React.ElementType;
    children?: React.ReactNode;
    sectionKey: string;
    items?: string[];
  }) => (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-500/10">
            <Icon className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-white/80">{title}</span>
          {items && (
            <span className="text-xs text-white/30 px-2 py-0.5 rounded-full bg-white/10">
              {items.length}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: expandedSection === sectionKey ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expandedSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="demo" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
              {/* ── Upload Zone ── */}
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
                  {/* Uploaded image preview */}
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

                  {/* Error banner */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4"
                    >
                      {error}
                    </motion.div>
                  )}

                  <AnimatePresence mode="wait">
                    {/* ── Analyzing ── */}
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
                      /* ── Full Result ── */
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5"
                      >
                        {/* Top row: Plant + Disease */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                              <Sprout className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40 uppercase tracking-wider">
                                Plant
                              </p>
                              <p className="text-lg font-bold">{result.plant}</p>
                            </div>
                          </div>
                          <div className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                              <Leaf className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40 uppercase tracking-wider">
                                Disease
                              </p>
                              <p className="text-lg font-bold">
                                {result.disease}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Confidence bar */}
                        <div className="p-4 rounded-2xl bg-white/5">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/60">
                              Model Confidence
                            </span>
                            <span className="text-emerald-400 font-bold">
                              {result.confidence}%
                            </span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(result.confidence, 100)}%`,
                              }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-white/30">
                            <span>Model: v{result.modelVersion}</span>
                            <span className="font-mono">{result.requestId}</span>
                          </div>
                        </div>

                        {/* Severity badge */}
                        <div
                          className={`flex items-center justify-between p-4 rounded-2xl border ${getSeverityColor(
                            result.severity
                          )}`}
                        >
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(result.severity)}
                            <span className="text-sm font-medium">
                              Severity Level
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-black/20">
                            {result.severity}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="p-4 rounded-2xl bg-white/5 space-y-2">
                          <p className="text-xs text-white/40 uppercase tracking-wider">
                            Description
                          </p>
                          <p className="text-sm text-white/70 leading-relaxed">
                            {result.description}
                          </p>
                        </div>

                        {/* Collapsible sections */}
                        <div className="space-y-3">
                          <SectionCard
                            title="Symptoms"
                            icon={Bug}
                            sectionKey="symptoms"
                            items={result.symptoms}
                          >
                            <ul className="space-y-2">
                              {result.symptoms.map((s, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-white/70"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </SectionCard>

                          <SectionCard
                            title="Causes"
                            icon={Droplets}
                            sectionKey="causes"
                            items={result.causes}
                          >
                            <ul className="space-y-2">
                              {result.causes.map((c, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-white/70"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </SectionCard>

                          <SectionCard
                            title="Treatment Steps"
                            icon={CheckCircle2}
                            sectionKey="treatment"
                            items={result.treatmentSteps}
                          >
                            <ol className="space-y-2">
                              {result.treatmentSteps.map((t, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-sm text-white/70"
                                >
                                  <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                                    {i + 1}
                                  </span>
                                  {t}
                                </li>
                              ))}
                            </ol>
                          </SectionCard>

                          <SectionCard
                            title="Prevention"
                            icon={ShieldCheck}
                            sectionKey="prevention"
                            items={result.prevention}
                          >
                            <ul className="space-y-2">
                              {result.prevention.map((p, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-white/70"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </SectionCard>
                        </div>

                        {/* Footer metadata */}
                        <div className="flex items-center justify-between pt-2 text-xs text-white/20">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>
                              Processed in {result.processingTimeMs}ms
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              v{result.modelVersion}
                            </span>
                            <span className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {result.requestId.slice(-8)}
                            </span>
                          </div>
                        </div>

                        {/* Reset button */}
                        <button
                          onClick={reset}
                          className="w-full py-3 glass rounded-xl text-sm font-medium hover:bg-white/10 transition-all mt-2"
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