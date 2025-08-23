import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Cylinder } from '@react-three/drei';
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Droplets, Brain, User, Shield } from 'lucide-react';

interface PatientData {
  name: string;
  bloodType: string;
  lastTransfusion: string;
  ironLevels: string;
  hemoglobin: string;
  donorMatchProbability: string;
  nextAppointment: string;
  riskLevel: string;
}

interface BodyPartInfo {
  name: string;
  info: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const patientData: PatientData = {
  name: "Sarah Chen",
  bloodType: "B+ Thalassemia Major",
  lastTransfusion: "5 days ago",
  ironLevels: "1,247 μg/L (High)",
  hemoglobin: "8.2 g/dL (Low)",
  donorMatchProbability: "87% Match Available",
  nextAppointment: "March 15, 2024",
  riskLevel: "Moderate"
};

const bodyPartData: { [key: string]: BodyPartInfo } = {
  heart: {
    name: "Cardiovascular System",
    info: "Iron overload affecting heart function",
    value: "Ejection Fraction: 55%",
    status: 'warning',
    icon: <Heart className="text-warning" size={16} />
  },
  liver: {
    name: "Liver Function",
    info: "Elevated iron levels detected",
    value: "Iron: 1,247 μg/L",
    status: 'critical',
    icon: <Activity className="text-destructive" size={16} />
  },
  blood: {
    name: "Hematology",
    info: "Current hemoglobin levels",
    value: "Hgb: 8.2 g/dL",
    status: 'critical',
    icon: <Droplets className="text-destructive" size={16} />
  },
  brain: {
    name: "Neurological",
    info: "Cognitive function normal",
    value: "No complications",
    status: 'normal',
    icon: <Brain className="text-success" size={16} />
  }
};

const HumanModel = ({ onPartHover, hoveredPart }: { 
  onPartHover: (part: string | null) => void;
  hoveredPart: string | null;
}) => {
  return (
    <group>
      {/* Head */}
      <Sphere
        args={[0.5, 32, 32]}
        position={[0, 2.5, 0]}
        onPointerOver={() => onPartHover('brain')}
        onPointerOut={() => onPartHover(null)}
      >
        <meshStandardMaterial 
          color={hoveredPart === 'brain' ? "#60a5fa" : "#e2e8f0"} 
          transparent
          opacity={0.8}
          emissive={hoveredPart === 'brain' ? "#1e40af" : "#000000"}
          emissiveIntensity={hoveredPart === 'brain' ? 0.3 : 0}
        />
      </Sphere>

      {/* Torso */}
      <Box
        args={[1.2, 1.5, 0.6]}
        position={[0, 1, 0]}
        onPointerOver={() => onPartHover('heart')}
        onPointerOut={() => onPartHover(null)}
      >
        <meshStandardMaterial 
          color={hoveredPart === 'heart' ? "#f87171" : "#e2e8f0"} 
          transparent
          opacity={0.8}
          emissive={hoveredPart === 'heart' ? "#dc2626" : "#000000"}
          emissiveIntensity={hoveredPart === 'heart' ? 0.3 : 0}
        />
      </Box>

      {/* Liver area */}
      <Box
        args={[0.8, 0.6, 0.4]}
        position={[0.3, 0.3, 0]}
        onPointerOver={() => onPartHover('liver')}
        onPointerOut={() => onPartHover(null)}
      >
        <meshStandardMaterial 
          color={hoveredPart === 'liver' ? "#fbbf24" : "#e2e8f0"} 
          transparent
          opacity={0.8}
          emissive={hoveredPart === 'liver' ? "#d97706" : "#000000"}
          emissiveIntensity={hoveredPart === 'liver' ? 0.3 : 0}
        />
      </Box>

      {/* Blood circulation (arms) */}
      <Cylinder
        args={[0.15, 0.15, 1.2]}
        position={[-0.8, 1, 0]}
        onPointerOver={() => onPartHover('blood')}
        onPointerOut={() => onPartHover(null)}
      >
        <meshStandardMaterial 
          color={hoveredPart === 'blood' ? "#ef4444" : "#e2e8f0"} 
          transparent
          opacity={0.8}
          emissive={hoveredPart === 'blood' ? "#dc2626" : "#000000"}
          emissiveIntensity={hoveredPart === 'blood' ? 0.3 : 0}
        />
      </Cylinder>

      <Cylinder
        args={[0.15, 0.15, 1.2]}
        position={[0.8, 1, 0]}
        onPointerOver={() => onPartHover('blood')}
        onPointerOut={() => onPartHover(null)}
      >
        <meshStandardMaterial 
          color={hoveredPart === 'blood' ? "#ef4444" : "#e2e8f0"} 
          transparent
          opacity={0.8}
          emissive={hoveredPart === 'blood' ? "#dc2626" : "#000000"}
          emissiveIntensity={hoveredPart === 'blood' ? 0.3 : 0}
        />
      </Cylinder>

      {/* Legs */}
      <Cylinder
        args={[0.2, 0.2, 1.5]}
        position={[-0.3, -0.5, 0]}
      >
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
      </Cylinder>

      <Cylinder
        args={[0.2, 0.2, 1.5]}
        position={[0.3, -0.5, 0]}
      >
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
      </Cylinder>

      {/* Holographic grid effect */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
};

const PatientDigitalTwin = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState(patientData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-success/20 text-success border-success/30';
      case 'warning': return 'bg-warning/20 text-warning border-warning/30';
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Patient Digital Twin
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced 3D holographic visualization of patient health data powered by AI
          </p>
          <Badge className="mt-4 bg-primary/10 text-primary border-primary/30">
            <Shield className="mr-2" size={14} />
            Secure • HIPAA Compliant • Real-time
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary" size={24} />
                  {selectedPatient.name} - Interactive Health Model
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-primary/20">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    
                    <HumanModel 
                      onPartHover={setHoveredPart} 
                      hoveredPart={hoveredPart}
                    />
                    
                    <OrbitControls 
                      enablePan={true} 
                      enableZoom={true} 
                      enableRotate={true}
                      autoRotate
                      autoRotateSpeed={1}
                    />

                    {/* Floating labels */}
                    {hoveredPart && (
                      <Text
                        position={[2, 2, 0]}
                        fontSize={0.3}
                        color="#0ea5e9"
                        anchorX="center"
                        anchorY="middle"
                      >
                        {bodyPartData[hoveredPart]?.name}
                      </Text>
                    )}
                  </Canvas>

                  {/* Holographic UI overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary/10 backdrop-blur border border-primary/30 rounded-lg p-3">
                      <p className="text-xs text-primary font-mono">SCANNING...</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">360° Analysis Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-success/20 text-success border-success/30">
                      <Activity className="mr-1" size={12} />
                      Live Data
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Hover over body parts for detailed information • Click and drag to rotate • Scroll to zoom
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Patient Info Panel */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Patient Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-semibold text-primary">{selectedPatient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <Badge className={getStatusBadge('warning')}>
                      {selectedPatient.riskLevel}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Last Transfusion</p>
                  <p className="font-semibold">{selectedPatient.lastTransfusion}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="font-semibold">{selectedPatient.nextAppointment}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Donor Match</p>
                  <p className="font-semibold text-success">{selectedPatient.donorMatchProbability}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Info (appears on hover) */}
            {hoveredPart && bodyPartData[hoveredPart] && (
              <Card className="bg-card/70 backdrop-blur border-primary/30 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {bodyPartData[hoveredPart].icon}
                    {bodyPartData[hoveredPart].name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusBadge(bodyPartData[hoveredPart].status)}>
                        {bodyPartData[hoveredPart].status.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className={`font-semibold ${getStatusColor(bodyPartData[hoveredPart].status)}`}>
                        {bodyPartData[hoveredPart].value}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Analysis</p>
                      <p className="text-sm">{bodyPartData[hoveredPart].info}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="text-accent" size={20} />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm font-medium text-warning">Iron Overload Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider chelation therapy adjustment
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">Transfusion Recommendation</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Next transfusion recommended within 7 days
                    </p>
                  </div>
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm font-medium text-success">Donor Match Available</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      High compatibility match found nearby
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Heart className="mr-2" size={18} />
                Request Emergency Transfusion
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="mr-2" size={18} />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDigitalTwin;