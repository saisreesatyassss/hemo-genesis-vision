import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import DigitalTwin from "./pages/DigitalTwin";
import GeneticRisk from "./pages/GeneticRisk";
import PatientsNGOs from "./pages/PatientsNGOs";
import PatientDashboard from "./pages/PatientDashboard";
import BloodMatchFinder from "./pages/BloodMatchFinder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MultiStepSignup from "./pages/MultiStepSignup";
import EmergencySOS from "./pages/EmergencySOS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/genetic-risk" element={<GeneticRisk />} />
          <Route path="/patients-ngos" element={<PatientsNGOs />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/blood-match-finder" element={<BloodMatchFinder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<MultiStepSignup />} />
          <Route path="/emergency-sos" element={<EmergencySOS />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
