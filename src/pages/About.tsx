import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/placeholder.svg",
      bio: "Hematologist with 15+ years in Thalassemia research"
    },
    {
      name: "Raj Patel",
      role: "AI/ML Lead",
      image: "/placeholder.svg",
      bio: "Former Microsoft AI researcher, specialized in healthcare ML"
    },
    {
      name: "Priya Sharma",
      role: "Blood Bridge Director",
      image: "/placeholder.svg",
      bio: "10+ years in blood bank management and donor relations"
    }
  ];

  const partners = [
    {
      name: "Blood Warriors",
      type: "Implementation Partner",
      logo: "/placeholder.svg"
    },
    {
      name: "Microsoft Azure",
      type: "Technology Partner",
      logo: "/placeholder.svg"
    },
    {
      name: "Blend360 India",
      type: "Data Science Partner",
      logo: "/placeholder.svg"
    },
    {
      name: "SVP India",
      type: "Social Impact Partner",
      logo: "/placeholder.svg"
    }
  ];

  const milestones = [
    {
      year: "2022",
      event: "HemoGenesis AI Founded",
      description: "Initial concept development after encountering Thalassemia families"
    },
    {
      year: "2023",
      event: "AI Model Development",
      description: "First successful donor prediction algorithm with 85% accuracy"
    },
    {
      year: "2024",
      event: "Blood Warriors Partnership",
      description: "Strategic partnership for platform integration and deployment"
    },
    {
      year: "2024",
      event: "95% Accuracy Achieved",
      description: "AI model refinement reaches 95% prediction accuracy"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About HemoGenesis AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our mission is to create a Thalassemia-free India by 2035 through innovative AI technology and comprehensive genetic awareness programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base">
              <Target className="mr-2" size={16} />
              Thalassemia-free India by 2035
            </Badge>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-primary" size={24} />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To revolutionize Thalassemia prevention and blood donation management through 
                AI-powered prediction systems and genetic risk awareness programs, ensuring 
                every patient gets the care they need when they need it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-primary" size={24} />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where Thalassemia is prevented through early awareness, genetic counseling, 
                and where patients have guaranteed access to blood donors through predictive AI technology.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              HemoGenesis AI was born from a deeply personal encounter with families affected by Thalassemia. 
              Our founders witnessed firsthand the daily struggles of parents rushing between hospitals, 
              desperately searching for blood donors while their children waited in pain.
            </p>
            <p className="text-muted-foreground mb-4">
              This moment of realization sparked a mission: what if we could predict when donors would be 
              available? What if we could prevent future Thalassemia cases through better genetic awareness? 
              What if technology could bridge the gap between need and availability?
            </p>
            <p className="text-muted-foreground">
              Today, our AI platform connects thousands of donors with patients, while our genetic risk 
              awareness programs educate couples about prevention. We're not just building technology – 
              we're building hope for a Thalassemia-free future.
            </p>
          </CardContent>
        </Card>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="text-muted-foreground" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">LOGO</div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
                  <p className="text-xs text-muted-foreground">{partner.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;