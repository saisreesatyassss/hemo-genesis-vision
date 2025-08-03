import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, AlertTriangle, CheckCircle, MessageCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

const GeneticRisk = () => {
  const [parent1Status, setParent1Status] = useState("");
  const [parent2Status, setParent2Status] = useState("");
  const [riskResult, setRiskResult] = useState<{
    level: "high" | "low" | null;
    percentage: string;
    advice: string;
  }>({ level: null, percentage: "", advice: "" });

  const calculateRisk = () => {
    if (!parent1Status || !parent2Status) {
      alert("Please select carrier status for both parents");
      return;
    }

    let result: { level: "high" | "low", percentage: string, advice: string } = { level: "low", percentage: "0%", advice: "" };

    if (parent1Status === "yes" && parent2Status === "yes") {
      result = {
        level: "high",
        percentage: "25%",
        advice: "High risk: 25% chance of Thalassemia major. Immediate genetic counseling and prenatal testing recommended."
      };
    } else if ((parent1Status === "yes" && parent2Status === "no") || (parent1Status === "no" && parent2Status === "yes")) {
      result = {
        level: "low",
        percentage: "0%",
        advice: "Low risk: 0% chance of Thalassemia major, but 50% chance of carrier children. Consider genetic counseling."
      };
    } else {
      result = {
        level: "low",
        percentage: "0%",
        advice: "Very low risk: No immediate concern for Thalassemia major in offspring."
      };
    }

    setRiskResult(result);
  };

  const faqData = [
    {
      question: "What is Thalassemia?",
      answer: "Thalassemia is an inherited blood disorder characterized by abnormal formation of hemoglobin. It can cause anemia and requires regular blood transfusions in severe cases."
    },
    {
      question: "How is Thalassemia inherited?",
      answer: "Thalassemia follows an autosomal recessive pattern. Both parents must carry the gene for a child to have Thalassemia major."
    },
    {
      question: "What does being a carrier mean?",
      answer: "Carriers have one copy of the Thalassemia gene. They usually don't have symptoms but can pass the gene to their children."
    },
    {
      question: "How can I get tested?",
      answer: "Simple blood tests can detect Thalassemia carrier status. Tests include Complete Blood Count (CBC) and Hemoglobin Electrophoresis."
    }
  ];

  const testingCenters = [
    {
      name: "National Institute of Immunohaematology (NIIH)",
      location: "Mumbai",
      contact: "022-2796-1815",
      cost: "₹200-500"
    },
    {
      name: "Apollo Diagnostics",
      location: "Multiple Cities",
      contact: "1860-500-1066",
      cost: "₹400-800"
    },
    {
      name: "Dr. Lal PathLabs",
      location: "Pan India",
      contact: "1800-103-3939",
      cost: "₹350-600"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Genetic Risk Awareness</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your family's Thalassemia risk and get personalized guidance for prevention and early detection.
          </p>
        </div>

        {/* Risk Calculator */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="text-primary" size={24} />
              Thalassemia Risk Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Parent 1 Carrier Status</label>
                <Select value={parent1Status} onValueChange={setParent1Status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes (Carrier)</SelectItem>
                    <SelectItem value="no">No (Not Carrier)</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Parent 2 Carrier Status</label>
                <Select value={parent2Status} onValueChange={setParent2Status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes (Carrier)</SelectItem>
                    <SelectItem value="no">No (Not Carrier)</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={calculateRisk} className="w-full" size="lg">
              Calculate Risk
            </Button>

            {riskResult.level && (
              <Card className={`border-2 ${riskResult.level === "high" ? "border-destructive" : "border-success"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {riskResult.level === "high" ? (
                      <AlertTriangle className="text-destructive" size={24} />
                    ) : (
                      <CheckCircle className="text-success" size={24} />
                    )}
                    <Badge className={riskResult.level === "high" ? "bg-destructive" : "bg-success"}>
                      {riskResult.level === "high" ? "High Risk" : "Low Risk"}
                    </Badge>
                    <span className="text-2xl font-bold">{riskResult.percentage}</span>
                  </div>
                  <p className="text-sm">{riskResult.advice}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Testing Centers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Affordable Testing Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testingCenters.map((center, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{center.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location: </span>
                      {center.location}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contact: </span>
                      {center.contact}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost: </span>
                      <span className="text-primary font-semibold">{center.cost}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <ExternalLink size={16} className="mr-2" />
                    Book Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible>
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* AI Chatbot Widget */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="text-primary" size={24} />
              AI Awareness Chatbot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get instant answers about Thalassemia, genetic testing, and prevention strategies from our AI-powered chatbot.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="text-muted-foreground mx-auto mb-2" size={48} />
                <p className="text-muted-foreground">Chatbot will be loaded here</p>
                <p className="text-sm text-muted-foreground">Ask questions about Thalassemia prevention</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Start Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneticRisk;