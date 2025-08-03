import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import InnovationsSection from "@/components/InnovationsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CallToActionSection from "@/components/CallToActionSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <StorySection />
      <InnovationsSection />
      <HowItWorksSection />
      <CallToActionSection />
      <VisionSection />
      <Footer />
    </div>
  );
};

export default Index;