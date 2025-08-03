import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-medical-ai.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-section-gradient overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="HemoGenesis AI Technology" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              HemoGenesis AI
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Revolutionizing Thalassemia Prevention Through
              <span className="block mt-2 text-accent font-semibold">
                Artificial Intelligence & Genetic Innovation
              </span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Explore Our Innovation
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Partner With Us
            </Button>
          </div>
          
          {/* Floating stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-primary-foreground/80">Prediction Accuracy</div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-primary-foreground/80">Lives Impacted</div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-primary-foreground/80">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;