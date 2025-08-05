import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Heart, Brain, TrendingUp, Shield, Activity, Droplets, BarChart3, Dna } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/90 to-destructive overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-150"></div>
        </div>

        <div className="container mx-auto px-4 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Side - Content */}
            <div className="text-white space-y-8 animate-fade-in">
              {/* Animated Blood Drop Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Droplets className="w-12 h-12 text-white animate-pulse" />
                  <div className="absolute inset-0 w-12 h-12">
                    <Droplets className="w-12 h-12 text-white/50 animate-ping" />
                  </div>
                </div>
                <div className="text-sm font-medium opacity-90">HemoGenesis AI</div>
              </div>

              {/* Main Tagline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in delay-200">
                  Saving Lives Today,
                  <span className="block text-accent-foreground">
                    Preventing Thalassemia Tomorrow
                  </span>
                </h1>
                <p className="text-xl md:text-2xl opacity-90 animate-fade-in delay-300">
                  AI-powered donor prediction and genetic risk awareness platform.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-500">
                <Link to="/digital-twin">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4 hover-scale">
                    Check Donor Prediction
                    <BarChart3 className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/genetic-risk">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary hover-scale">
                    Assess Genetic Risk
                    <Dna className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>

              {/* Floating Quick Stats */}
              <div className="flex flex-wrap gap-3 animate-fade-in delay-700">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  🤖 Predictive Donor AI
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  🧬 Genetic Awareness Bot
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  🩸 Blood Bridge Ready
                </div>
              </div>
            </div>

            {/* Right Side - Dynamic Illustration */}
            <div className="relative animate-fade-in delay-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                {/* AI Chart Mockup */}
                <div className="space-y-6">
                  <div className="text-white font-semibold text-lg mb-4">Live Donor Prediction</div>
                  
                  {/* Chart Bars */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-sm text-white/80">Mon</div>
                      <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent-foreground to-secondary h-full w-3/4 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-sm text-white font-medium">85%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-sm text-white/80">Tue</div>
                      <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent-foreground to-secondary h-full w-1/2 rounded-full animate-pulse delay-100"></div>
                      </div>
                      <div className="text-sm text-white font-medium">60%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-sm text-white/80">Wed</div>
                      <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent-foreground to-secondary h-full w-5/6 rounded-full animate-pulse delay-200"></div>
                      </div>
                      <div className="text-sm text-white font-medium">92%</div>
                    </div>
                  </div>

                  {/* DNA Risk Calculator Mockup */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="text-white font-semibold text-lg mb-4">Genetic Risk Calculator</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 rounded-lg p-4 text-center">
                        <Dna className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-sm text-white/80">Parent 1</div>
                        <div className="text-xs text-accent-foreground font-medium">Carrier</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 text-center">
                        <Dna className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-sm text-white/80">Parent 2</div>
                        <div className="text-xs text-accent-foreground font-medium">Non-Carrier</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-gradient-to-r from-secondary/20 to-accent-foreground/20 rounded-lg p-4 text-center border border-white/30">
                      <div className="text-2xl font-bold text-accent-foreground">25%</div>
                      <div className="text-sm text-white/80">Risk Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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