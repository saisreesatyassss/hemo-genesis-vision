import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Cpu, Heart, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Sources",
      description: "Comprehensive collection from blood banks, genetic labs, and healthcare partners",
      details: [
        "Global blood bank databases",
        "Genetic testing laboratories", 
        "Patient medical records",
        "Population health studies"
      ]
    },
    {
      icon: Cpu,
      title: "AI Models",
      description: "Advanced machine learning algorithms process complex biological patterns",
      details: [
        "Deep learning neural networks",
        "Genetic pattern recognition",
        "Predictive compatibility modeling",
        "Real-time data processing"
      ]
    },
    {
      icon: Heart,
      title: "User Benefits",
      description: "Personalized insights delivered through intuitive interfaces",
      details: [
        "Instant compatibility matching",
        "Genetic risk assessments",
        "Personalized recommendations",
        "24/7 AI-powered support"
      ]
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "AI systems continuously improve through new data and outcomes",
      details: [
        "Outcome tracking & analysis",
        "Model refinement & updates",
        "Predictive accuracy improvement",
        "Global knowledge integration"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform seamlessly integrates data sources, advanced 
            algorithms, and user-friendly interfaces to deliver life-changing insights.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="text-center group hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2 text-sm">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-muted/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">AI Processing Pipeline</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-primary-foreground font-bold">1</div>
                <p className="font-medium">Data Ingestion</p>
                <p className="text-sm text-muted-foreground">Real-time collection</p>
              </div>
              <div className="hidden md:block text-primary">→</div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-primary-foreground font-bold">2</div>
                <p className="font-medium">AI Analysis</p>
                <p className="text-sm text-muted-foreground">Pattern recognition</p>
              </div>
              <div className="hidden md:block text-primary">→</div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-primary-foreground font-bold">3</div>
                <p className="font-medium">Prediction</p>
                <p className="text-sm text-muted-foreground">Compatibility matching</p>
              </div>
              <div className="hidden md:block text-primary">→</div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-primary-foreground font-bold">4</div>
                <p className="font-medium">Action</p>
                <p className="text-sm text-muted-foreground">Personalized results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;