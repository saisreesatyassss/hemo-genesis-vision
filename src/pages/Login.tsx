/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Droplets, Users, Shield, Mail, Lock, Chrome } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const [error, setError] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://hemobackned.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        // Save token or user info
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        // Navigate to dashboard or next page
                navigate("/");

        // e.g., using react-router: navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
                  <Heart className="h-16 w-16 text-primary animate-pulse" fill="currentColor" />
                </div>
                
                {/* Orbiting Donor Icons */}
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
              <h2 className="text-2xl font-semibold text-foreground">Every Drop Counts.</h2>
              <h3 className="text-xl text-primary font-medium">Every Life Matters.</h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Join our community of donors, patients, and healthcare advocates working together 
                to save lives and prevent Thalassemia through AI-powered prediction and awareness.
              </p>
            </div>
            
            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 animate-bounce" style={{animationDelay: '0s'}}>
                <span className="text-sm font-medium text-primary">10k+ Lives Saved</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-blue-200 animate-bounce" style={{animationDelay: '0.5s'}}>
                <span className="text-sm font-medium text-blue-600">AI Predictions</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-green-200 animate-bounce" style={{animationDelay: '1s'}}>
                <span className="text-sm font-medium text-green-600">Hope Network</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
            <CardHeader className="relative text-center space-y-4 pb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Droplets className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              </div>
              <CardDescription className="text-base">
                Sign in to your HemoGenesis AI account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-6 px-8 pb-8">
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 h-12 rounded-xl border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border/50 text-primary focus:ring-primary/20" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>

                </div>
                
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-medium"
              >
                {loading ? "Signing In..." : "Sign In"}
                <Heart className="ml-2 h-4 w-4" />
              </Button>
              </form>
              
   
              
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign up here
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
          <h2 className="text-xl font-semibold text-foreground">Every Drop Counts.</h2>
          <h3 className="text-lg text-primary font-medium">Every Life Matters.</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;