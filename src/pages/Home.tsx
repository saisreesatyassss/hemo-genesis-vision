import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Heart, Brain, TrendingUp, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Predictive Blood Donation & Genetic Risk Awareness
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Proactively connecting Thalassemia patients with blood donors & preventing future Thalassemia cases using AI
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4"
              onClick={() => {
                document.getElementById("quick-links")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Donors Predicted</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Patients Supported</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Couples Aware</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quick-links" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Digital Twin Donor Prediction</h3>
                <p className="text-muted-foreground mb-6">
                  AI-powered prediction of blood donor availability with 95% accuracy
                </p>
                <Link to="/digital-twin">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore Predictions
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Genetic Risk Awareness</h3>
                <p className="text-muted-foreground mb-6">
                  Calculate Thalassemia risk for couples and get personalized guidance
                </p>
                <Link to="/genetic-risk">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Check Risk
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Blood Bridge Integration</h3>
                <p className="text-muted-foreground mb-6">
                  Seamless connection with Blood Warriors and e-RaktKosh systems
                </p>
                <Link to="/patients-ngos">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Learn More
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-section-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Creating a Thalassemia-free India by 2035 through AI-powered blood donation prediction 
            and comprehensive genetic risk awareness programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about">
              <Button variant="default" size="lg">
                Learn Our Story
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Join Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;