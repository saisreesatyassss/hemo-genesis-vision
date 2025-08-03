import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, TrendingUp, Bell } from "lucide-react";
import { useState } from "react";

const DigitalTwin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");

  const predictedDonors = [
    {
      name: "John Doe",
      lastDonation: "Feb 10, 2024",
      predictedNext: "Apr 15, 2024",
      likelihood: "High",
      location: "Mumbai, Maharashtra",
      bloodType: "O+"
    },
    {
      name: "Priya Sharma",
      lastDonation: "Jan 25, 2024",
      predictedNext: "Apr 20, 2024",
      likelihood: "Medium",
      location: "Delhi",
      bloodType: "B+"
    },
    {
      name: "Rajesh Kumar",
      lastDonation: "Mar 5, 2024",
      predictedNext: "May 2, 2024",
      likelihood: "High",
      location: "Bangalore, Karnataka",
      bloodType: "A+"
    }
  ];

  const handleNotificationSignup = () => {
    if (email) {
      alert("Thank you! You'll be notified when matching donors are available.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Twin Donor Prediction</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered prediction system that forecasts blood donor availability with 95% accuracy,
            helping patients find donors when they need them most.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="text-primary" size={24} />
              Find Predicted Donors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter donor name, ID, location, or blood type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search size={20} />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Predicted Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {predictedDonors.map((donor, index) => (
            <Card key={index} className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{donor.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {donor.location}
                    </div>
                  </div>
                  <Badge className={`${
                    donor.likelihood === "High" 
                      ? "bg-success text-success-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {donor.likelihood}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Blood Type:</span>
                    <span className="font-semibold text-primary">{donor.bloodType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Donation:</span>
                    <span className="text-sm">{donor.lastDonation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Predicted Next:</span>
                    <span className="text-sm font-semibold">{donor.predictedNext}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <TrendingUp size={16} className="mr-2" />
                      View Prediction Graph
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notification Signup */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center">
              <Bell className="text-primary" size={24} />
              Get Notified When Donors Are Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-6">
              Enter your email to receive notifications when predicted donors matching your requirements become available.
            </p>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleNotificationSignup}>
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">How Our Prediction Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We analyze historical donation patterns, health records, and behavioral data
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI Modeling</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms predict donation likelihood and timing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous learning and updates provide 95% accuracy predictions
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalTwin;