/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Heart, Droplets, Users, Shield, Mail, Lock, Chrome, UserPlus, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // make sure to install axios: npm i axios
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [userType, setUserType] = useState<string>("patient");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      role: userType.charAt(0).toUpperCase() + userType.slice(1), // "Patient" or "Donor"
    };

    try {
      setLoading(true);
            // Remove old cookies


      const res = await axios.post("https://hemobackned.azurewebsites.net/api/auth/register", payload);
      console.log("Registration success:", res.data);
  // Store user ID and token in cookies

        Cookies.remove("userId");
      Cookies.remove("token");
      Cookies.set("userId", res.data.user.id, { expires: 7 }); // expires in 7 days
      Cookies.set("token", res.data.token, { expires: 7 });      
      alert("Registration successful!");
      navigate("/complete-profile");

      // optionally redirect to login page
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="relative">
                  <Droplets className="h-12 w-12 text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">HemoGenesis AI</h1>
              </div>
              
              {/* Animated Connection Illustration */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full animate-pulse" />
                
                {/* Central Heart */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <HeartHandshake className="h-16 w-16 text-primary animate-pulse" fill="currentColor" />
                </div>
                
                {/* Orbiting Icons */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-[spin_20s_linear_infinite]">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-[spin_20s_linear_infinite_reverse]">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 animate-[spin_15s_linear_infinite]">
                  <Droplets className="h-8 w-8 text-red-600" />
                </div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                
                {/* Connecting Lines */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full animate-pulse" viewBox="0 0 320 320">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="160"
                      cy="160"
                      r="120"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className="animate-[spin_30s_linear_infinite]"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r="80"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      className="animate-[spin_25s_linear_infinite_reverse]"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Join Our Community.</h2>
              <h3 className="text-xl text-primary font-medium">Help Save Lives.</h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Whether you're a patient seeking support or a donor ready to help, together 
                we can prevent Thalassemia and save lives through AI-powered connections.
              </p>
            </div>
            
            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 animate-bounce" style={{animationDelay: '0s'}}>
                <span className="text-sm font-medium text-primary">10k+ Community</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-blue-200 animate-bounce" style={{animationDelay: '0.5s'}}>
                <span className="text-sm font-medium text-blue-600">AI Matching</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-green-200 animate-bounce" style={{animationDelay: '1s'}}>
                <span className="text-sm font-medium text-green-600">Hope Together</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
            <CardHeader className="relative text-center space-y-4 pb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <UserPlus className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-bold">Join HemoGenesis</CardTitle>
              </div>
              <CardDescription className="text-base">
                Create your account and become part of our life-saving community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-6 px-8 pb-8">
                <form className="space-y-5" onSubmit={handleSubmit}>
                
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I am joining as:</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patient" id="patient" />
                      <Label htmlFor="patient" className="text-sm font-medium cursor-pointer flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-primary" />
                        <span>Patient</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donor" id="donor" />
                      <Label htmlFor="donor" className="text-sm font-medium cursor-pointer flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span>Donor</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="sai"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-11 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="sree"        value={lastName}
        onChange={(e) => setLastName(e.target.value)}

                      className="h-11 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"      value={email}
        onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"        value={password}
        onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-border/50 text-primary focus:ring-primary/20 mt-1" />
                  <span className="text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
                
                <Button
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  type="submit" // important: triggers form submission
                  disabled={loading} // optional: disables while backend request is in progress
                >
                  {userType === "donor" ? "Join as Donor" : "Join as Patient"}
                  {userType === "donor" ? (
                    <Droplets className="ml-2 h-4 w-4" />
                  ) : (
                    <Heart className="ml-2 h-4 w-4" />
                  )}
                </Button>

              </form>
              
 
              
 
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in here
                </Link>
              </div>
              
              {/* Trust Badge */}
              <div className="flex items-center justify-center space-x-2 pt-4 border-t border-border/20">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Secured by enterprise-grade encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Mobile Hero Text */}
        <div className="lg:hidden text-center space-y-4 order-first">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Droplets className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-foreground">HemoGenesis AI</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Join Our Community.</h2>
          <h3 className="text-lg text-primary font-medium">Help Save Lives.</h3>
        </div>
      </div>
    </div>
  );
};

export default Signup;