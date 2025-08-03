const VisionSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Our Bold Vision
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>
        
        <div className="bg-section-gradient rounded-2xl p-12 border border-primary/20 shadow-glow">
          <blockquote className="text-2xl md:text-3xl font-light text-foreground leading-relaxed mb-8 italic">
            "By 2030, we will prevent 500,000 new thalassemia cases globally 
            through AI-powered genetic awareness and eliminate transfusion 
            uncertainty for every patient through predictive donor matching."
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2030</div>
              <p className="text-muted-foreground">Zero preventable thalassemia cases</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Prediction accuracy goal</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Global</div>
              <p className="text-muted-foreground">Healthcare transformation</p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-lg text-foreground font-medium mb-2">
              Tomorrow's Thalassemia Prevention Starts Today
            </p>
            <p className="text-muted-foreground">
              Every genetic test we analyze, every donor match we predict, and every 
              family we counsel brings us closer to a world where thalassemia is 
              no longer a source of uncertainty, but a condition we can predict, 
              prevent, and manage with precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;