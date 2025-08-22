import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone, 
  Send,
  Star,
  Shield,
  CheckCircle2,
  Car,
  UserCheck
} from 'lucide-react';

const EmergencySOS = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState<Array<{id: number, message: string, time: string, type: 'info' | 'success' | 'warning'}>>([]);
  
  const mockDonors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      photo: '/placeholder.svg',
      bloodType: 'B+',
      distance: '0.8 km',
      lastDonation: '2 weeks ago',
      isRecommended: true,
      verificationLevel: 'Hospital Verified',
      responseTime: '< 5 min'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      photo: '/placeholder.svg',
      bloodType: 'B+',
      distance: '1.2 km',
      lastDonation: '3 weeks ago',
      isRecommended: true,
      verificationLevel: 'Medical Verified',
      responseTime: '< 10 min'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      photo: '/placeholder.svg',
      bloodType: 'O+',
      distance: '2.1 km',
      lastDonation: '1 month ago',
      isRecommended: false,
      verificationLevel: 'ID Verified',
      responseTime: '< 15 min'
    },
    {
      id: 4,
      name: 'James Wilson',
      photo: '/placeholder.svg',
      bloodType: 'B+',
      distance: '2.8 km',
      lastDonation: '2 months ago',
      isRecommended: false,
      verificationLevel: 'Medical Verified',
      responseTime: '< 20 min'
    }
  ];

  const handleEmergencyRequest = () => {
    setIsEmergencyActive(true);
    
    // Simulate status updates
    const updates = [
      { id: 1, message: 'Emergency request sent to 12 verified donors nearby...', time: 'Now', type: 'info' as const },
      { id: 2, message: 'Dr. Sarah Chen accepted your request', time: '2 min ago', type: 'success' as const },
      { id: 3, message: 'Ahmed Hassan is on the way (ETA: 8 minutes)', time: '5 min ago', type: 'success' as const },
      { id: 4, message: 'Backup donor Maria Rodriguez is on standby', time: '7 min ago', type: 'info' as const }
    ];
    
    updates.forEach((update, index) => {
      setTimeout(() => {
        setStatusUpdates(prev => [...prev, update]);
      }, index * 3000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Emergency Blood Request</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In critical situations, every second counts. Our AI connects you with the nearest verified donors instantly.
          </p>
        </div>

        {/* Main SOS Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-destructive/20 shadow-lg">
            <CardContent className="p-12 text-center">
              {!isEmergencyActive ? (
                <div className="space-y-8">
                  <div className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="lg"
                          className="w-48 h-48 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground text-2xl font-bold shadow-2xl animate-pulse-sos"
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <AlertTriangle size={48} />
                            <span>SOS</span>
                            <span className="text-sm font-normal">Emergency Blood Request</span>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <AlertTriangle className="text-destructive" size={24} />
                            <span>Confirm Emergency Request</span>
                          </DialogTitle>
                          <DialogDescription className="text-base">
                            Are you sure? This will immediately notify all verified donors within 5km of your location.
                            <div className="mt-3 p-3 bg-muted rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                ⚡ 12 verified donors nearby<br/>
                                🩸 Blood type: B+ compatible<br/>
                                📍 Location sharing: Enabled
                              </p>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button
                            variant="destructive"
                            onClick={handleEmergencyRequest}
                            className="flex items-center space-x-2"
                          >
                            <Send size={16} />
                            <span>Send Emergency Alert</span>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Shield size={16} />
                    <p className="text-sm">Only verified donors will be notified. Your info is secure.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle2 className="text-success" size={32} />
                    <h2 className="text-2xl font-bold text-success">Emergency Alert Sent!</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Your request has been sent to 12 verified donors nearby. Help is on the way.
                  </p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active Emergency Request
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Donors */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="text-primary" size={24} />
                <span>Available Donors Nearby</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDonors.map((donor, index) => (
                <div
                  key={donor.id}
                  className={`p-4 rounded-lg border transition-all duration-300 animate-slide-up ${
                    donor.isRecommended 
                      ? 'border-success/30 bg-success/5' 
                      : 'border-border bg-card'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={donor.photo} alt={donor.name} />
                      <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{donor.name}</h3>
                          {donor.isRecommended && (
                            <Badge className="bg-success text-success-foreground">
                              <Star size={12} className="mr-1" />
                              AI Recommended
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {donor.bloodType}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{donor.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{donor.responseTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {donor.verificationLevel} • Last: {donor.lastDonation}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone size={14} className="mr-1" />
                            Call
                          </Button>
                          <Button size="sm" className="bg-primary">
                            <Send size={14} className="mr-1" />
                            Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Status Feed */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="text-primary" size={24} />
                <span>Live Status Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statusUpdates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Status updates will appear here once you send an emergency request.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {statusUpdates.map((update, index) => (
                    <div
                      key={update.id}
                      className="flex items-start space-x-3 animate-slide-up"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        update.type === 'success' ? 'bg-success' : 
                        update.type === 'warning' ? 'bg-destructive' : 
                        'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{update.message}</p>
                        <p className="text-xs text-muted-foreground">{update.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="text-success flex-shrink-0 mt-1" size={20} />
                <div className="space-y-2">
                  <h3 className="font-semibold text-success">Your Security & Privacy</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Only verified medical donors receive your emergency alerts</li>
                    <li>• Your precise location is shared only during active emergencies</li>
                    <li>• All communications are encrypted and HIPAA compliant</li>
                    <li>• Emergency services are automatically notified in critical cases</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;