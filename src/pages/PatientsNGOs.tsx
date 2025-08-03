import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Activity, TrendingUp, Heart, Shield, Database } from "lucide-react";

const PatientsNGOs = () => {
  const integrationFeatures = [
    {
      name: "Blood Warriors",
      description: "Direct integration with India's largest blood donation network",
      status: "Active",
      icon: Heart
    },
    {
      name: "e-RaktKosh",
      description: "Government blood bank management system connectivity",
      status: "Active",
      icon: Database
    },
    {
      name: "Blood Bridge",
      description: "Real-time blood availability and request management",
      status: "Active",
      icon: Activity
    }
  ];

  const dashboardFeatures = [
    {
      title: "Donor Management",
      description: "Track and manage your network of blood donors with AI predictions",
      icon: Users,
      benefits: ["Real-time donor availability", "Predictive analytics", "Automated notifications"]
    },
    {
      title: "Request Tracking",
      description: "Monitor blood requests and match them with available donors",
      icon: TrendingUp,
      benefits: ["Instant matching", "Priority-based allocation", "Success rate tracking"]
    },
    {
      title: "Awareness Campaigns",
      description: "Launch and monitor genetic awareness programs in your community",
      icon: Shield,
      benefits: ["Campaign analytics", "Outreach tracking", "Educational resources"]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">For Patients & NGOs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive platform for healthcare organizations, NGOs, and patient communities to manage blood donation networks and genetic awareness programs.
          </p>
        </div>

        <Tabs defaultValue="integrations" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integrations">Blood Bridge Integration</TabsTrigger>
            <TabsTrigger value="dashboard">Management Dashboard</TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Our Integration Partners</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Seamlessly connected with India's leading blood donation and healthcare systems
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {integrationFeatures.map((integration, index) => {
                      const Icon = integration.icon;
                      return (
                        <Card key={index} className="text-center">
                          <CardContent className="p-6">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Icon className="text-primary" size={32} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {integration.description}
                            </p>
                            <Badge className="bg-success text-success-foreground">
                              {integration.status}
                            </Badge>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How Blood Bridge Integration Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">Data Sync</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time synchronization with blood bank databases
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">AI Prediction</h4>
                      <p className="text-sm text-muted-foreground">
                        Smart algorithms predict donor availability
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">Auto Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic matching of patients with donors
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <h4 className="font-semibold mb-2">Notification</h4>
                      <p className="text-sm text-muted-foreground">
                        Instant alerts to relevant stakeholders
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Management Dashboard Features</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Comprehensive tools for NGOs and healthcare organizations
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {dashboardFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                              <Icon className="text-primary" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {feature.description}
                            </p>
                            <ul className="space-y-1">
                              {feature.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Preview</CardTitle>
                  <p className="text-muted-foreground">
                    See how our platform helps organizations manage their operations
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="text-muted-foreground mx-auto mb-4" size={64} />
                      <h3 className="text-xl font-semibold mb-2">Interactive Dashboard</h3>
                      <p className="text-muted-foreground mb-4">
                        Real-time analytics, donor management, and campaign tracking
                      </p>
                      <Button>Request Demo Access</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>For NGOs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Manage volunteer blood donors efficiently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Run genetic awareness campaigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Track impact and success metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Access funding and partnership opportunities</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4">Register Your NGO</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>For Healthcare Organizations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Integrate with existing blood bank systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Predictive analytics for blood availability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Patient management tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">Compliance and reporting features</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4">Schedule Integration</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientsNGOs;