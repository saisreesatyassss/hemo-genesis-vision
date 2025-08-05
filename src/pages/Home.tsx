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

      {/* Live Donor Availability */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Donor Availability</h2>
            <p className="text-muted-foreground">Real-time predictions for your area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold">Mumbai Central</div>
                  <div className="text-2xl font-bold text-green-600">92%</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">15 donors predicted available today</div>
                <Link to="/digital-twin">
                  <Button size="sm" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold">Delhi NCR</div>
                  <div className="text-2xl font-bold text-yellow-600">68%</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">8 donors predicted available today</div>
                <Link to="/digital-twin">
                  <Button size="sm" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold">Bangalore</div>
                  <div className="text-2xl font-bold text-green-600">85%</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">12 donors predicted available today</div>
                <Link to="/digital-twin">
                  <Button size="sm" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Genetic Risk Assessment */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Quick Genetic Risk Check</h2>
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Parent 1 Status</label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>Select status</option>
                      <option>Carrier</option>
                      <option>Non-carrier</option>
                      <option>Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Parent 2 Status</label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>Select status</option>
                      <option>Carrier</option>
                      <option>Non-carrier</option>
                      <option>Unknown</option>
                    </select>
                  </div>
                </div>
                <Link to="/genetic-risk">
                  <Button size="lg" className="w-full">
                    Calculate Detailed Risk Assessment
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive risk analysis and personalized recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Blood Request */}
      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-destructive text-white p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Emergency Blood Request</h2>
              <p className="text-xl mb-6 opacity-90">
                Need blood urgently? Our AI will instantly connect you with available donors
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Request Blood Now
                  <Heart className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-destructive">
                  Register as Donor
                  <Users className="ml-2" size={20} />
                </Button>
              </div>
            </div>
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

      {/* Success Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold">Priya & Raj</div>
                      <div className="text-sm text-muted-foreground">Mumbai</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "HemoGenesis AI helped us understand our genetic risk before marriage. 
                    We're now proud parents of a healthy baby, thanks to early awareness and proper planning."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Sharma</div>
                      <div className="text-sm text-muted-foreground">Thalassemia Care Center</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The donor prediction accuracy is incredible. We've reduced waiting times by 70% 
                    and can now plan treatments more effectively for our patients."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-muted-foreground">Trusted by Leading Organizations</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm">Microsoft Azure</div>
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm">Blood Warriors</div>
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm">Blend360 India</div>
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm">SVP India</div>
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm">e-RaktKosh</div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get latest updates on donor availability and genetic awareness in your area
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">HemoGenesis AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Revolutionizing thalassemia prevention through AI-powered donor prediction and genetic risk awareness.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">Twitter</Button>
                <Button variant="ghost" size="sm">LinkedIn</Button>
                <Button variant="ghost" size="sm">Facebook</Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/digital-twin" className="block text-muted-foreground hover:text-primary transition-colors">
                  Donor Prediction
                </Link>
                <Link to="/genetic-risk" className="block text-muted-foreground hover:text-primary transition-colors">
                  Genetic Risk Assessment
                </Link>
                <Link to="/patients-ngos" className="block text-muted-foreground hover:text-primary transition-colors">
                  For NGOs
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h4 className="font-semibold mb-4">Emergency Support</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Blood Emergency: <span className="text-destructive font-bold">1800-XXX-XXXX</span></div>
                <div>Genetic Counseling: <span className="text-primary font-bold">1800-XXX-YYYY</span></div>
                <div>Technical Support: support@hemogenesis.ai</div>
                <div>24/7 Available</div>
              </div>
            </div>

            {/* App Downloads */}
            <div>
              <h4 className="font-semibold mb-4">Get Our App</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📱</span> Download for Android
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🍎</span> Download for iOS
                </Button>
                <div className="text-sm text-muted-foreground mt-4">
                  Available in English, Hindi, Telugu, Tamil
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-muted mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-muted-foreground text-sm">
                © 2024 HemoGenesis AI. All rights reserved. | Privacy Policy | Terms of Service
              </div>
              <div className="text-muted-foreground text-sm mt-4 md:mt-0">
                Powered by AI, Built with ❤️ for Thalassemia Prevention
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;