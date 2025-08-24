/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Text, Sphere, Box, Cylinder } from '@react-three/drei';
// import { useState, useRef } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Heart, Activity, Droplets, Brain, User, Shield } from 'lucide-react';

// interface PatientData {
//   name: string;
//   bloodType: string;
//   lastTransfusion: string;
//   ironLevels: string;
//   hemoglobin: string;
//   donorMatchProbability: string;
//   nextAppointment: string;
//   riskLevel: string;
// }

// interface BodyPartInfo {
//   name: string;
//   info: string;
//   value: string;
//   status: 'normal' | 'warning' | 'critical';
//   icon: React.ReactNode;
// }

// const patientData: PatientData = {
//   name: "Sarah Chen",
//   bloodType: "B+ Thalassemia Major",
//   lastTransfusion: "5 days ago",
//   ironLevels: "1,247 μg/L (High)",
//   hemoglobin: "8.2 g/dL (Low)",
//   donorMatchProbability: "87% Match Available",
//   nextAppointment: "March 15, 2024",
//   riskLevel: "Moderate"
// };

// const bodyPartData: { [key: string]: BodyPartInfo } = {
//   heart: {
//     name: "Cardiovascular System",
//     info: "Iron overload affecting heart function",
//     value: "Ejection Fraction: 55%",
//     status: 'warning',
//     icon: <Heart className="text-warning" size={16} />
//   },
//   liver: {
//     name: "Liver Function",
//     info: "Elevated iron levels detected",
//     value: "Iron: 1,247 μg/L",
//     status: 'critical',
//     icon: <Activity className="text-destructive" size={16} />
//   },
//   blood: {
//     name: "Hematology",
//     info: "Current hemoglobin levels",
//     value: "Hgb: 8.2 g/dL",
//     status: 'critical',
//     icon: <Droplets className="text-destructive" size={16} />
//   },
//   brain: {
//     name: "Neurological",
//     info: "Cognitive function normal",
//     value: "No complications",
//     status: 'normal',
//     icon: <Brain className="text-success" size={16} />
//   }
// };

// const HumanModel = ({ onPartHover, hoveredPart }: { 
//   onPartHover: (part: string | null) => void;
//   hoveredPart: string | null;
// }) => {
//   return (
//     <group>
//       {/* Head */}
//       <Sphere
//         args={[0.5, 32, 32]}
//         position={[0, 2.5, 0]}
//         onPointerOver={() => onPartHover('brain')}
//         onPointerOut={() => onPartHover(null)}
//       >
//         <meshStandardMaterial 
//           color={hoveredPart === 'brain' ? "#60a5fa" : "#e2e8f0"} 
//           transparent
//           opacity={0.8}
//           emissive={hoveredPart === 'brain' ? "#1e40af" : "#000000"}
//           emissiveIntensity={hoveredPart === 'brain' ? 0.3 : 0}
//         />
//       </Sphere>

//       {/* Torso */}
//       <Box
//         args={[1.2, 1.5, 0.6]}
//         position={[0, 1, 0]}
//         onPointerOver={() => onPartHover('heart')}
//         onPointerOut={() => onPartHover(null)}
//       >
//         <meshStandardMaterial 
//           color={hoveredPart === 'heart' ? "#f87171" : "#e2e8f0"} 
//           transparent
//           opacity={0.8}
//           emissive={hoveredPart === 'heart' ? "#dc2626" : "#000000"}
//           emissiveIntensity={hoveredPart === 'heart' ? 0.3 : 0}
//         />
//       </Box>

//       {/* Liver area */}
//       <Box
//         args={[0.8, 0.6, 0.4]}
//         position={[0.3, 0.3, 0]}
//         onPointerOver={() => onPartHover('liver')}
//         onPointerOut={() => onPartHover(null)}
//       >
//         <meshStandardMaterial 
//           color={hoveredPart === 'liver' ? "#fbbf24" : "#e2e8f0"} 
//           transparent
//           opacity={0.8}
//           emissive={hoveredPart === 'liver' ? "#d97706" : "#000000"}
//           emissiveIntensity={hoveredPart === 'liver' ? 0.3 : 0}
//         />
//       </Box>

//       {/* Blood circulation (arms) */}
//       <Cylinder
//         args={[0.15, 0.15, 1.2]}
//         position={[-0.8, 1, 0]}
//         onPointerOver={() => onPartHover('blood')}
//         onPointerOut={() => onPartHover(null)}
//       >
//         <meshStandardMaterial 
//           color={hoveredPart === 'blood' ? "#ef4444" : "#e2e8f0"} 
//           transparent
//           opacity={0.8}
//           emissive={hoveredPart === 'blood' ? "#dc2626" : "#000000"}
//           emissiveIntensity={hoveredPart === 'blood' ? 0.3 : 0}
//         />
//       </Cylinder>

//       <Cylinder
//         args={[0.15, 0.15, 1.2]}
//         position={[0.8, 1, 0]}
//         onPointerOver={() => onPartHover('blood')}
//         onPointerOut={() => onPartHover(null)}
//       >
//         <meshStandardMaterial 
//           color={hoveredPart === 'blood' ? "#ef4444" : "#e2e8f0"} 
//           transparent
//           opacity={0.8}
//           emissive={hoveredPart === 'blood' ? "#dc2626" : "#000000"}
//           emissiveIntensity={hoveredPart === 'blood' ? 0.3 : 0}
//         />
//       </Cylinder>

//       {/* Legs */}
//       <Cylinder
//         args={[0.2, 0.2, 1.5]}
//         position={[-0.3, -0.5, 0]}
//       >
//         <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
//       </Cylinder>

//       <Cylinder
//         args={[0.2, 0.2, 1.5]}
//         position={[0.3, -0.5, 0]}
//       >
//         <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
//       </Cylinder>

//       {/* Holographic grid effect */}
//       <mesh position={[0, 0, -1]}>
//         <planeGeometry args={[6, 6]} />
//         <meshBasicMaterial 
//           color="#0ea5e9" 
//           transparent 
//           opacity={0.1}
//           wireframe
//         />
//       </mesh>
//     </group>
//   );
// };

// const PatientDigitalTwin = () => {
//   const [hoveredPart, setHoveredPart] = useState<string | null>(null);
//   const [selectedPatient, setSelectedPatient] = useState(patientData);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'normal': return 'text-success';
//       case 'warning': return 'text-warning';
//       case 'critical': return 'text-destructive';
//       default: return 'text-muted-foreground';
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'normal': return 'bg-success/20 text-success border-success/30';
//       case 'warning': return 'bg-warning/20 text-warning border-warning/30';
//       case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
//       default: return 'bg-muted/20 text-muted-foreground border-muted/30';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
//       {/* Header */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
//             Patient Digital Twin
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Advanced 3D holographic visualization of patient health data powered by AI
//           </p>
//           <Badge className="mt-4 bg-primary/10 text-primary border-primary/30">
//             <Shield className="mr-2" size={14} />
//             Secure • HIPAA Compliant • Real-time
//           </Badge>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* 3D Model */}
//           <div className="lg:col-span-2">
//             <Card className="h-[600px] bg-card/50 backdrop-blur border-primary/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="text-primary" size={24} />
//                   {selectedPatient.name} - Interactive Health Model
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="h-[500px]">
//                 <div className="relative w-full h-full rounded-lg overflow-hidden border border-primary/20">
//                   <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//                     <ambientLight intensity={0.5} />
//                     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//                     <pointLight position={[-10, -10, -10]} />
                    
//                     <HumanModel 
//                       onPartHover={setHoveredPart} 
//                       hoveredPart={hoveredPart}
//                     />
                    
//                     <OrbitControls 
//                       enablePan={true} 
//                       enableZoom={true} 
//                       enableRotate={true}
//                       autoRotate
//                       autoRotateSpeed={1}
//                     />

//                     {/* Floating labels */}
//                     {hoveredPart && (
//                       <Text
//                         position={[2, 2, 0]}
//                         fontSize={0.3}
//                         color="#0ea5e9"
//                         anchorX="center"
//                         anchorY="middle"
//                       >
//                         {bodyPartData[hoveredPart]?.name}
//                       </Text>
//                     )}
//                   </Canvas>

//                   {/* Holographic UI overlay */}
//                   <div className="absolute top-4 left-4">
//                     <div className="bg-primary/10 backdrop-blur border border-primary/30 rounded-lg p-3">
//                       <p className="text-xs text-primary font-mono">SCANNING...</p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
//                         <span className="text-xs text-muted-foreground">360° Analysis Active</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-4 right-4">
//                     <Badge className="bg-success/20 text-success border-success/30">
//                       <Activity className="mr-1" size={12} />
//                       Live Data
//                     </Badge>
//                   </div>
//                 </div>

//                 <p className="text-sm text-muted-foreground mt-4 text-center">
//                   Hover over body parts for detailed information • Click and drag to rotate • Scroll to zoom
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Patient Info Panel */}
//           <div className="space-y-6">
//             {/* Basic Info */}
//             <Card className="bg-card/50 backdrop-blur border-primary/20">
//               <CardHeader>
//                 <CardTitle className="text-lg">Patient Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Blood Type</p>
//                     <p className="font-semibold text-primary">{selectedPatient.bloodType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Risk Level</p>
//                     <Badge className={getStatusBadge('warning')}>
//                       {selectedPatient.riskLevel}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">Last Transfusion</p>
//                   <p className="font-semibold">{selectedPatient.lastTransfusion}</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">Next Appointment</p>
//                   <p className="font-semibold">{selectedPatient.nextAppointment}</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">Donor Match</p>
//                   <p className="font-semibold text-success">{selectedPatient.donorMatchProbability}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Detailed Info (appears on hover) */}
//             {hoveredPart && bodyPartData[hoveredPart] && (
//               <Card className="bg-card/70 backdrop-blur border-primary/30 animate-scale-in">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-lg">
//                     {bodyPartData[hoveredPart].icon}
//                     {bodyPartData[hoveredPart].name}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Status</p>
//                       <Badge className={getStatusBadge(bodyPartData[hoveredPart].status)}>
//                         {bodyPartData[hoveredPart].status.toUpperCase()}
//                       </Badge>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Current Value</p>
//                       <p className={`font-semibold ${getStatusColor(bodyPartData[hoveredPart].status)}`}>
//                         {bodyPartData[hoveredPart].value}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Analysis</p>
//                       <p className="text-sm">{bodyPartData[hoveredPart].info}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* AI Insights */}
//             <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-lg">
//                   <Brain className="text-accent" size={20} />
//                   AI Health Insights
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
//                     <p className="text-sm font-medium text-warning">Iron Overload Alert</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Consider chelation therapy adjustment
//                     </p>
//                   </div>
//                   <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
//                     <p className="text-sm font-medium text-primary">Transfusion Recommendation</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Next transfusion recommended within 7 days
//                     </p>
//                   </div>
//                   <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
//                     <p className="text-sm font-medium text-success">Donor Match Available</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       High compatibility match found nearby
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <Button className="w-full" size="lg">
//                 <Heart className="mr-2" size={18} />
//                 Request Emergency Transfusion
//               </Button>
//               <Button variant="outline" className="w-full">
//                 <Activity className="mr-2" size={18} />
//                 Schedule Consultation
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDigitalTwin;

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Heart, Activity, Droplets, Brain, User, Shield, Calendar, MapPin, Clock } from 'lucide-react';

// API data interfaces
interface ActivityData {
  type: string;
  data: {
    hbLevel?: number;
    unit?: string;
    labName?: string;
    notes?: string;
    hospital?: string;
    unitsGiven?: number;
    bloodGroup?: string;
    doctor?: string;
    nextDueDate?: string;
  };
  _id: string;
  timestamp: string;
}

interface PatientData {
  name: string;
  bloodType: string;
  activities: ActivityData[];
  currentHb?: number;
  lastTransfusion?: ActivityData;
  nextTransfusion?: string;
  riskLevel: string;
}

interface BodyPartInfo {
  name: string;
  info: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}

// Optimized 3D Human Model with better performance
const OptimizedHumanModel = ({ 
  onPartHover, 
  hoveredPart, 
  hbLevel 
}: { 
  onPartHover: (part: string | null) => void;
  hoveredPart: string | null;
  hbLevel: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  
  // Optimize renderer settings
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  // Smooth rotation animation
  useFrame((state, delta) => {
    if (groupRef.current && !hoveredPart) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Optimized materials with reuse
  const materials = React.useMemo(() => {
    const skinColor = hbLevel < 9 ? 0xFFD4B5 : hbLevel < 11 ? 0xFFDBB5 : 0xFFE2C5;
    
    return {
      skin: new THREE.MeshLambertMaterial({
        color: skinColor,
        transparent: true,
        opacity: 0.85
      }),
      bone: new THREE.MeshLambertMaterial({
        color: 0xF5F5DC,
        transparent: true,
        opacity: 0.7
      }),
      blood: new THREE.MeshLambertMaterial({
        color: hbLevel < 9 ? 0x8B0000 : hbLevel < 11 ? 0xDC143C : 0xFF0000,
        transparent: true,
        opacity: 0.8
      }),
      organ: new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        transparent: true,
        opacity: 0.7
      }),
      heart: new THREE.MeshPhongMaterial({
        color: hbLevel < 9 ? 0xFF6B6B : hbLevel < 11 ? 0xFF8E8E : 0xFF4444,
        transparent: true,
        opacity: 0.8
      })
    };
  }, [hbLevel]);

  const getHoverEffect = (part: string, baseMaterial: THREE.Material) => {
    if (hoveredPart === part) {
      return new THREE.MeshPhongMaterial({
        ...(baseMaterial as any),
        emissive: new THREE.Color(0x444444),
        emissiveIntensity: 0.3
      });
    }
    return baseMaterial;
  };

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Optimized Head */}
      <mesh
        position={[0, 3.5, 0]}
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); onPartHover('head'); }}
        onPointerOut={() => onPartHover(null)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <primitive object={getHoverEffect('head', materials.skin)} />
      </mesh>

      {/* Neck - simplified */}
      <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
        <primitive object={materials.skin} />
      </mesh>

      {/* Torso - main body */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.6, 0.6]} />
        <primitive object={materials.skin} />
      </mesh>

      {/* Heart - interactive */}
      <mesh
        position={[-0.15, 2.1, 0.25]}
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); onPartHover('heart'); }}
        onPointerOut={() => onPartHover(null)}
      >
        <sphereGeometry args={[0.18, 12, 12]} />
        <primitive object={getHoverEffect('heart', materials.heart)} />
      </mesh>

      {/* Liver - interactive */}
      <mesh
        position={[0.25, 1.6, 0.2]}
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); onPartHover('liver'); }}
        onPointerOut={() => onPartHover(null)}
      >
        <boxGeometry args={[0.4, 0.3, 0.35]} />
        <primitive object={getHoverEffect('liver', materials.organ)} />
      </mesh>

      {/* Blood vessels - simplified */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); onPartHover('bloodSystem'); }}
        onPointerOut={() => onPartHover(null)}
      >
        <mesh position={[-0.5, 1.8, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.8, 6]} />
          <primitive object={getHoverEffect('bloodSystem', materials.blood)} />
        </mesh>
        <mesh position={[0.5, 1.8, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.8, 6]} />
          <primitive object={getHoverEffect('bloodSystem', materials.blood)} />
        </mesh>
      </group>

      {/* Arms - simplified */}
      <mesh position={[-0.8, 1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} />
        <primitive object={materials.skin} />
      </mesh>
      <mesh position={[0.8, 1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} />
        <primitive object={materials.skin} />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.5, 0.6]} />
        <primitive object={materials.skin} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.18, 2.6, 8]} />
        <primitive object={materials.skin} />
      </mesh>
      <mesh position={[0.25, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.18, 2.6, 8]} />
        <primitive object={materials.skin} />
      </mesh>

      {/* Holographic base */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.2, 24]} />
        <meshBasicMaterial 
          color={0x00ccff} 
          transparent 
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Health indicator ring */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.35, 32]} />
        <meshBasicMaterial 
          color={hbLevel < 9 ? 0xff4444 : hbLevel < 11 ? 0xffaa44 : 0x44ff44}
          transparent 
          opacity={hoveredPart ? 0.8 : 0.5}
        />
      </mesh>
    </group>
  );
};

// Timeline component for activities
const ActivityTimeline = ({ activities }: { activities: ActivityData[] }) => {
  const sortedActivities = activities.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hb_test':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'transfusion':
        return <Droplets className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'hb_test':
        return 'border-blue-200 bg-blue-50';
      case 'transfusion':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {sortedActivities.map((activity, index) => (
        <div key={activity._id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full border-2 ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            {index !== sortedActivities.length - 1 && (
              <div className="w-px h-8 bg-gray-200 my-1"></div>
            )}
          </div>
          
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-sm capitalize">
                {activity.type.replace('_', ' ')}
              </h4>
              <span className="text-xs text-gray-500">
                {formatDate(activity.timestamp)}
              </span>
            </div>
            
            {activity.type === 'hb_test' && (
              <div className="text-sm text-gray-600">
                <p><strong>Level:</strong> {activity.data.hbLevel} {activity.data.unit}</p>
                <p><strong>Lab:</strong> {activity.data.labName}</p>
                {activity.data.notes && <p><strong>Notes:</strong> {activity.data.notes}</p>}
              </div>
            )}
            
            {activity.type === 'transfusion' && (
              <div className="text-sm text-gray-600">
                <p><strong>Hospital:</strong> {activity.data.hospital}</p>
                <p><strong>Units:</strong> {activity.data.unitsGiven}</p>
                <p><strong>Blood Group:</strong> {activity.data.bloodGroup}</p>
                <p><strong>Doctor:</strong> {activity.data.doctor}</p>
                {activity.data.nextDueDate && (
                  <p><strong>Next Due:</strong> {formatDate(activity.data.nextDueDate)}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Utility components
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Button = ({ 
  children, 
  className = "", 
  variant = "default",
  size = "default",
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: string;
  size?: string;
  onClick?: () => void;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = variant === "outline" 
    ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" 
    : "bg-blue-600 text-white hover:bg-blue-700";
  const sizeClasses = size === "lg" ? "px-8 py-3 text-base" : "px-4 py-2 text-sm";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Main component
const PatientDigitalTwin = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hemobackned.azurewebsites.net/api/auth/68aa0601be394aab95787939/activities');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const activities: ActivityData[] = await response.json();
        
        // Process the data
        const latestHbTest = activities
          .filter(a => a.type === 'hb_test')
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
          
        const latestTransfusion = activities
          .filter(a => a.type === 'transfusion')
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

        const currentHb = latestHbTest?.data.hbLevel || 8.0;
        const riskLevel = currentHb < 9 ? 'Critical' : currentHb < 11 ? 'Moderate' : 'Normal';

        setPatientData({
          name: "Patient",
          bloodType: latestTransfusion?.data.bloodGroup || "B+",
          activities,
          currentHb,
          lastTransfusion: latestTransfusion,
          nextTransfusion: latestTransfusion?.data.nextDueDate,
          riskLevel
        });
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  // Generate body part data based on current health
  const getBodyPartData = (hbLevel: number): { [key: string]: BodyPartInfo } => ({
    head: {
      name: "Neurological System",
      info: hbLevel < 9 ? "Low oxygen delivery may cause fatigue" : "Normal brain function",
      value: `Brain Oxygenation: ${hbLevel < 9 ? 'Reduced' : hbLevel < 11 ? 'Fair' : 'Good'}`,
      status: hbLevel < 9 ? 'warning' : 'normal',
      icon: <Brain className={hbLevel < 9 ? "text-yellow-500" : "text-green-500"} size={16} />
    },
    heart: {
      name: "Cardiovascular System",
      info: hbLevel < 9 ? "Heart working harder to pump blood" : "Normal cardiac function",
      value: `Cardiac Stress: ${hbLevel < 9 ? 'High' : hbLevel < 11 ? 'Moderate' : 'Normal'}`,
      status: hbLevel < 9 ? 'critical' : hbLevel < 11 ? 'warning' : 'normal',
      icon: <Heart className={hbLevel < 9 ? "text-red-500" : hbLevel < 11 ? "text-yellow-500" : "text-green-500"} size={16} />
    },
    liver: {
      name: "Liver Function",
      info: "Monitoring for iron overload from transfusions",
      value: "Iron Storage: Monitored",
      status: 'warning',
      icon: <Activity className="text-yellow-500" size={16} />
    },
    bloodSystem: {
      name: "Hematology",
      info: `Hemoglobin level: ${hbLevel} g/dL`,
      value: `Hb: ${hbLevel} g/dL`,
      status: hbLevel < 9 ? 'critical' : hbLevel < 11 ? 'warning' : 'normal',
      icon: <Droplets className={hbLevel < 9 ? "text-red-500" : hbLevel < 11 ? "text-yellow-500" : "text-green-500"} size={16} />
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-700 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading Patient Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!patientData) return null;

  const bodyPartData = getBodyPartData(patientData.currentHb || 8.0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Patient Digital Twin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time 3D health visualization with live medical data
          </p>
          <Badge className="mt-4 bg-blue-100 text-blue-700 border border-blue-200">
            <Shield className="mr-2" size={14} />
            Live Data • HIPAA Compliant • AI Powered
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-white/80 backdrop-blur border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-blue-600" size={24} />
                  {patientData.name} - Interactive Health Model
                  <Badge className={`ml-auto ${getStatusBadge(patientData.riskLevel.toLowerCase())}`}>
                    {patientData.riskLevel} Risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[500px] relative">
                <div className="w-full h-full rounded-lg overflow-hidden border border-blue-200 bg-gradient-to-b from-blue-50 to-indigo-100">
                  <Canvas 
                    camera={{ position: [0, 1, 6], fov: 50 }}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    dpr={[1, 2]}
                    performance={{ min: 0.5 }}
                  >
                    <ambientLight intensity={0.6} />
                    <spotLight 
                      position={[10, 10, 10]} 
                      angle={0.3} 
                      penumbra={1} 
                      intensity={1}
                      castShadow
                      shadow-mapSize-width={1024}
                      shadow-mapSize-height={1024}
                    />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} />
                    
                    <OptimizedHumanModel 
                      onPartHover={setHoveredPart} 
                      hoveredPart={hoveredPart}
                      hbLevel={patientData.currentHb || 8.0}
                    />
                  </Canvas>

                  {/* UI Overlays */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-900/20 backdrop-blur border border-blue-300/50 rounded-lg p-3">
                      <p className="text-xs text-blue-700 font-mono font-semibold">LIVE MONITORING</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600">Hb: {patientData.currentHb} g/dL</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <Badge className={`${getStatusBadge(patientData.riskLevel.toLowerCase())}`}>
                      <Activity className="mr-1" size={12} />
                      {patientData.riskLevel} Status
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    {hoveredPart && bodyPartData[hoveredPart] && (
                      <div className="bg-white/95 backdrop-blur border border-gray-300 rounded-lg p-3 max-w-xs animate-fadeIn">
                        <div className="flex items-center gap-2 mb-1">
                          {bodyPartData[hoveredPart].icon}
                          <span className="font-semibold text-sm">{bodyPartData[hoveredPart].name}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{bodyPartData[hoveredPart].value}</p>
                        <p className="text-xs text-gray-500">{bodyPartData[hoveredPart].info}</p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  Interactive 3D model • Hover over organs for details • Color coding shows health status
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Patient Info Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="bg-white/90 backdrop-blur border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Hemoglobin Level</p>
                    <p className={`font-bold text-lg ${getStatusColor(patientData.currentHb && patientData.currentHb < 9 ? 'critical' : patientData.currentHb && patientData.currentHb < 11 ? 'warning' : 'normal')}`}>
                      {patientData.currentHb} g/dL
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="font-semibold text-blue-700">{patientData.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Risk Level</p>
                    <Badge className={getStatusBadge(patientData.riskLevel.toLowerCase())}>
                      {patientData.riskLevel}
                    </Badge>
                  </div>
                  {patientData.lastTransfusion && (
                    <div>
                      <p className="text-sm text-gray-500">Last Transfusion</p>
                      <p className="font-semibold">
                        {new Date(patientData.lastTransfusion.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600">
                        at {patientData.lastTransfusion.data.hospital}
                      </p>
                    </div>
                  )}
                  {patientData.nextTransfusion && (
                    <div>
                      <p className="text-sm text-gray-500">Next Due</p>
                      <p className="font-semibold text-orange-600">
                        {new Date(patientData.nextTransfusion).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="bg-white/90 backdrop-blur border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="text-blue-600" size={20} />
                  Medical Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-auto">
                <ActivityTimeline activities={patientData.activities} />
              </CardContent>
            </Card>

            {/* Detailed Info for Hovered Part */}
            {hoveredPart && bodyPartData[hoveredPart] && (
              <Card className="bg-white/95 backdrop-blur border-blue-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {bodyPartData[hoveredPart].icon}
                    {bodyPartData[hoveredPart].name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge className={getStatusBadge(bodyPartData[hoveredPart].status)}>
                        {bodyPartData[hoveredPart].status.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Value</p>
                      <p className={`font-semibold ${getStatusColor(bodyPartData[hoveredPart].status)}`}>
                        {bodyPartData[hoveredPart].value}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Analysis</p>
                      <p className="text-sm">{bodyPartData[hoveredPart].info}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Health Insights */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="text-purple-600" size={20} />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientData.currentHb && patientData.currentHb < 9 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-700">Critical Anemia Alert</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Immediate transfusion recommended - Hb level critically low
                      </p>
                    </div>
                  )}
                  
                  {patientData.currentHb && patientData.currentHb >= 9 && patientData.currentHb < 11 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700">Moderate Anemia</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Monitor closely - May need transfusion soon
                      </p>
                    </div>
                  )}

                  {patientData.activities.length > 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Treatment Pattern</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {patientData.activities.filter(a => a.type === 'transfusion').length} transfusions,{' '}
                        {patientData.activities.filter(a => a.type === 'hb_test').length} Hb tests recorded
                      </p>
                    </div>
                  )}

                  {patientData.nextTransfusion && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Next Appointment Scheduled</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(patientData.nextTransfusion).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {patientData.currentHb && patientData.currentHb < 9 && (
                <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                  <Heart className="mr-2" size={18} />
                  Request Emergency Transfusion
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => window.location.reload()}
              >
                <Activity className="mr-2" size={18} />
                Refresh Data
              </Button>
              
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2" size={18} />
                Schedule Consultation
              </Button>
            </div>

            {/* Data Source Info */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="py-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Data Source: Live API</span>
                  <span>Last Updated: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="mt-1">
                  <Badge className="bg-green-100 text-green-600 text-xs">
                    <div className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Health Metrics */}
        <div className="mt-8">
          <Card className="bg-white/90 backdrop-blur border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-blue-600" size={24} />
                Health Metrics Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Droplets className="mx-auto mb-2 text-blue-600" size={24} />
                  <h4 className="font-semibold text-gray-900">Hemoglobin</h4>
                  <p className={`text-2xl font-bold ${getStatusColor(patientData.currentHb && patientData.currentHb < 9 ? 'critical' : patientData.currentHb && patientData.currentHb < 11 ? 'warning' : 'normal')}`}>
                    {patientData.currentHb} g/dL
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Normal: 12-15 g/dL
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Heart className="mx-auto mb-2 text-green-600" size={24} />
                  <h4 className="font-semibold text-gray-900">Transfusions</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {patientData.activities.filter(a => a.type === 'transfusion').length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Total recorded
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Brain className="mx-auto mb-2 text-purple-600" size={24} />
                  <h4 className="font-semibold text-gray-900">Risk Level</h4>
                  <p className={`text-2xl font-bold ${getStatusColor(patientData.riskLevel.toLowerCase())}`}>
                    {patientData.riskLevel}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on current Hb
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <Clock className="mx-auto mb-2 text-orange-600" size={24} />
                  <h4 className="font-semibold text-gray-900">Last Test</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {patientData.activities.filter(a => a.type === 'hb_test').length > 0 ? 
                      Math.floor((Date.now() - new Date(patientData.activities
                        .filter(a => a.type === 'hb_test')
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]?.timestamp || Date.now()).getTime()) / (1000 * 60 * 60 * 24))
                      : 0}d
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Days ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDigitalTwin;