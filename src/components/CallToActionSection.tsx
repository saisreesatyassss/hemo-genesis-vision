import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Heart, Users, Handshake } from "lucide-react";

const CallToActionSection = () => {
  const partners = [
    {
      icon: Building2,
      title: "NGOs & Healthcare Organizations",
      description: "Partner with us to amplify your impact and reach more communities in need.",
      cta: "Join Our Network",
      benefits: ["Enhanced patient outcomes", "Advanced screening tools", "Community outreach support"]
    },
    {
      icon: Heart,
      title: "Blood Donors",
      description: "Your donation could save lives. Register and let our AI find the perfect match.",
      cta: "Become a Donor",
      benefits: ["Smart matching technology", "Real-time impact tracking", "Flexible scheduling"]
    },
    {
      icon: Users,
      title: "Couples & Families",
      description: "Take control of your family's future with personalized genetic insights.",
      cta: "Get Tested",
      benefits: ["Comprehensive risk assessment", "Genetic counseling support", "Family planning guidance"]
    },
    {
      icon: Handshake,
      title: "Strategic Partners",
      description: "Collaborate with us to advance thalassemia research and care globally.",
      cta: "Partner With Us",
      benefits: ["Technology licensing", "Research collaboration", "Global market access"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-hero-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Together, we can transform thalassemia care and prevention. Whether you're 
            an NGO, donor, couple, or strategic partner, there's a place for you in 
            our mission to save lives through AI innovation.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <Card key={index} className="bg-background/95 backdrop-blur-sm border-primary-foreground/20 hover:bg-background">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{partner.title}</CardTitle>
                  <CardDescription className="text-base">{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="default" className="w-full">
                    {partner.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main CTA */}
        <div className="text-center bg-background/10 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/20">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-lg text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Join thousands of individuals and organizations already part of the 
            HemoGenesis AI community. Together, we're building a future where 
            thalassemia is preventable and manageable for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="text-lg px-8 py-4">
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;