import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Phone,
  Calendar,
  FileText,
  Baby,
  Shield
} from 'lucide-react';

interface RiskResult {
  thalassemiaMajor: number;
  carrier: number;
  normal: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendation: string;
  counselingUrgency: 'routine' | 'recommended' | 'urgent';
}

const GeneticRisk = () => {
  const [partner1Carrier, setPartner1Carrier] = useState<boolean | null>(null);
  const [partner2Carrier, setPartner2Carrier] = useState<boolean | null>(null);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateRisk = (p1Carrier: boolean, p2Carrier: boolean): RiskResult => {
    if (p1Carrier && p2Carrier) {
      return {
        thalassemiaMajor: 25,
        carrier: 50,
        normal: 25,
        riskLevel: 'high',
        recommendation: 'Prenatal testing and genetic counseling strongly recommended',
        counselingUrgency: 'urgent'
      };
    } else if (p1Carrier || p2Carrier) {
      return {
        thalassemiaMajor: 0,
        carrier: 50,
        normal: 50,
        riskLevel: 'moderate',
        recommendation: 'Genetic counseling recommended for family planning',
        counselingUrgency: 'recommended'
      };
    } else {
      return {
        thalassemiaMajor: 0,
        carrier: 0,
        normal: 100,
        riskLevel: 'low',
        recommendation: 'No increased risk for Thalassemia',
        counselingUrgency: 'routine'
      };
    }
  };

  useEffect(() => {
    if (partner1Carrier !== null && partner2Carrier !== null) {
      const result = calculateRisk(partner1Carrier, partner2Carrier);
      setRiskResult(result);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [partner1Carrier, partner2Carrier]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-destructive';
      case 'moderate': return 'text-yellow-600';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'moderate': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const reset = () => {
    setPartner1Carrier(null);
    setPartner2Carrier(null);
    setRiskResult(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="text-primary" size={32} />
            <Heart className="text-destructive" size={24} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Thalassemia Genetic Risk Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plan your family's future with confidence. Get instant genetic risk analysis 
            and personalized recommendations for Thalassemia prevention.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Partner Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Partner 1 */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Users size={24} className="text-primary" />
                  <span>Partner 1</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Are you a Thalassemia carrier?
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant={partner1Carrier === true ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setPartner1Carrier(true)}
                    >
                      Yes, I am a carrier
                    </Button>
                    <Button
                      variant={partner1Carrier === false ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setPartner1Carrier(false)}
                    >
                      No, I am not a carrier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-muted-foreground"
                      onClick={() => setPartner1Carrier(null)}
                    >
                      Not sure / Need testing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partner 2 */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Heart size={24} className="text-destructive" />
                  <span>Partner 2</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Are you a Thalassemia carrier?
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant={partner2Carrier === true ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setPartner2Carrier(true)}
                    >
                      Yes, I am a carrier
                    </Button>
                    <Button
                      variant={partner2Carrier === false ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setPartner2Carrier(false)}
                    >
                      No, I am not a carrier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-muted-foreground"
                      onClick={() => setPartner2Carrier(null)}
                    >
                      Not sure / Need testing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Results */}
          {showResults && riskResult && (
            <div className="animate-fade-in">
              <Card className={`shadow-lg border-2 ${
                riskResult.riskLevel === 'high' ? 'border-destructive/30' :
                riskResult.riskLevel === 'moderate' ? 'border-yellow-500/30' :
                'border-success/30'
              }`}>
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {riskResult.riskLevel === 'high' ? (
                      <AlertTriangle className="text-destructive" size={28} />
                    ) : riskResult.riskLevel === 'moderate' ? (
                      <Info className="text-yellow-600" size={28} />
                    ) : (
                      <CheckCircle2 className="text-success" size={28} />
                    )}
                    <CardTitle className="text-2xl">Genetic Risk Analysis</CardTitle>
                  </div>
                  <Badge variant={getRiskBadgeVariant(riskResult.riskLevel)} className="text-sm">
                    {riskResult.riskLevel.toUpperCase()} RISK
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Risk Percentages */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {riskResult.thalassemiaMajor > 0 && (
                      <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="text-3xl font-bold text-destructive mb-2">
                          {riskResult.thalassemiaMajor}%
                        </div>
                        <div className="text-sm font-medium text-destructive-foreground">
                          Thalassemia Major
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Requires lifelong care
                        </div>
                      </div>
                    )}
                    
                    {riskResult.carrier > 0 && (
                      <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30">
                        <div className="text-3xl font-bold text-yellow-600 mb-2">
                          {riskResult.carrier}%
                        </div>
                        <div className="text-sm font-medium">
                          Carrier (Thalassemia Minor)
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Mild symptoms, genetic testing needed
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                      <div className="text-3xl font-bold text-success mb-2">
                        {riskResult.normal}%
                      </div>
                      <div className="text-sm font-medium text-success-foreground">
                        Normal (No Thalassemia)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Healthy, no genetic risk
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="text-primary" size={20} />
                      <h3 className="text-lg font-semibold">Recommendations</h3>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${
                      riskResult.riskLevel === 'high' ? 'bg-destructive/5 border-destructive/20' :
                      riskResult.riskLevel === 'moderate' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30' :
                      'bg-success/5 border-success/20'
                    }`}>
                      <p className={`font-medium ${getRiskColor(riskResult.riskLevel)}`}>
                        {riskResult.recommendation}
                      </p>
                    </div>

                    {riskResult.counselingUrgency === 'urgent' && (
                      <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="text-destructive flex-shrink-0 mt-1" size={20} />
                          <div>
                            <h4 className="font-semibold text-destructive mb-2">Urgent Action Recommended</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• Schedule genetic counseling immediately</li>
                              <li>• Consider prenatal testing (CVS or amniocentesis)</li>
                              <li>• Discuss family planning options with specialists</li>
                              <li>• Learn about preimplantation genetic testing (PGT)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button className="flex-1 flex items-center space-x-2">
                      <Phone size={16} />
                      <span>Book Genetic Counseling</span>
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Schedule Testing</span>
                    </Button>
                    <Button variant="ghost" onClick={reset}>
                      Reset Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Information Cards */}
          {!showResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Baby className="text-primary" size={24} />
                    <span>About Thalassemia Inheritance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Thalassemia is inherited</strong> when both parents carry the genetic trait.</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Both carriers:</strong> 25% risk of Thalassemia Major per pregnancy</li>
                    <li>• <strong>One carrier:</strong> 50% chance child will be a carrier</li>
                    <li>• <strong>No carriers:</strong> No risk of Thalassemia</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="text-success" size={24} />
                    <span>Prevention & Early Detection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Early planning</strong> can prevent Thalassemia Major through:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Carrier screening before pregnancy</li>
                    <li>• Prenatal testing (CVS, amniocentesis)</li>
                    <li>• Preimplantation genetic testing (PGT-M)</li>
                    <li>• Genetic counseling and family planning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy Notice */}
          <Card className="border-muted bg-muted/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="text-muted-foreground flex-shrink-0 mt-1" size={20} />
                <div className="text-sm text-muted-foreground">
                  <p><strong>Privacy & Security:</strong> This assessment provides educational information only. 
                  All data is processed locally and not stored. Always consult qualified genetic counselors 
                  and healthcare providers for medical decisions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneticRisk;