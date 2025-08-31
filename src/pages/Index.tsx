import Hero from "@/components/Hero";
import DimensionsSection from "@/components/DimensionsSection";
import ScenarioSection from "@/components/ScenarioSection";
import ManifestoSection from "@/components/ManifestoSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DimensionsSection />
      <ScenarioSection />
      <ManifestoSection />
    </div>
  );
};

export default Index;