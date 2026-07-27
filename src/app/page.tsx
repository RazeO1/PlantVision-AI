import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DemoSection } from "@/components/DemoSection";
import { PredictionShowcase } from "@/components/PredictionShowcase";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParallaxBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <PredictionShowcase />
      <StatsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}