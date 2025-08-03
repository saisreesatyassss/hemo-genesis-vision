import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Dna, Users, Zap } from "lucide-react";

const InnovationsSection = () => {
  return (
    <section className="py-20 px-4 bg-section-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Flagship Innovations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two groundbreaking AI technologies that are revolutionizing thalassemia care 
            and prevention, delivering unprecedented accuracy and life-changing insights.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Digital Twin Innovation */}
          <Card className="group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary">
                Digital Twin for Donor Prediction
              </CardTitle>
              <CardDescription className="text-lg">
                Revolutionary AI-powered blood compatibility matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">How It Works</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI creates virtual "digital twins" of blood profiles, analyzing 
                  complex genetic markers and compatibility factors that traditional 
                  methods might miss.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">95% Prediction Accuracy</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms deliver precise donor-patient matching
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Real-Time Matching</p>
                    <p className="text-sm text-muted-foreground">
                      Instant compatibility analysis reducing wait times from days to minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="font-semibold mb-2">Impact Today & Tomorrow</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Currently serving 50,000+ patients with life-saving donor matches. 
                  By 2030, we project preventing 200,000 transfusion complications through 
                  predictive compatibility analysis.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </CardContent>
          </Card>

          {/* Genetic Risk AI Innovation */}
          <Card className="group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Dna className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl text-secondary-foreground">
                Genetic Risk Awareness AI
              </CardTitle>
              <CardDescription className="text-lg">
                Empowering couples with personalized genetic insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold text-secondary-foreground mb-2">How It Works</h4>
                <p className="text-sm text-muted-foreground">
                  Simple genetic testing combined with AI analysis provides couples 
                  with clear, actionable insights about thalassemia risks for 
                  future children.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Personalized Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      AI analyzes genetic patterns to provide precise risk calculations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Family Planning Support</p>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive counseling and reproductive guidance
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="font-semibold mb-2">Impact Today & Tomorrow</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Empowering 25,000+ couples with genetic awareness. Our vision: 
                  prevent 80% of new thalassemia cases through informed family 
                  planning by 2035.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InnovationsSection;