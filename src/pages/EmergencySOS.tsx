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
import Cookies from "js-cookie";

const EmergencySOS = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const [statusUpdates, setStatusUpdates] = useState([]);
    // This is the function called when the user confirms the emergency request.

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

    const handleEmergencyRequest = async () => {
        // Close the dialog and set the emergency state to active
//        setIsDialogOpen(false);
        setIsEmergencyActive(true);

        const userId = Cookies.get("userId");
        if (!userId) {
            console.error("User not logged in! Please log in to make an emergency request.");
            // You might want to redirect to the login page here
            return;
        }

        console.log('Submitting emergency request for userId:', userId);

        try {
            // First, call the initial SOS endpoint to notify donors
            const sosEndpoint = `https://hemobackned.azurewebsites.net/api/auth/${userId}/sos`;
            const response = await fetch(sosEndpoint, {
                method: 'POST', // Assuming this is a POST request
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add any necessary body data here, e.g., user's location
                // body: JSON.stringify({ latitude: ..., longitude: ... })
            });

            if (!response.ok) {
                throw new Error(`Failed to send SOS request: ${response.statusText}`);
            }

            console.log('Emergency request sent successfully.');
            
            // Add an initial message to the status updates
            setStatusUpdates([{
                id: Date.now(),
                message: 'Emergency request sent. Notifying verified donors nearby...',
                time: 'Now',
                type: 'info'
            }]);

        } catch (error) {
            console.error('Error sending emergency request:', error);
            setStatusUpdates(prev => [...prev, {
                id: Date.now(),
                message: 'Failed to send emergency request. Please try again.',
                time: 'Now',
                type: 'error'
            }]);
            setIsEmergencyActive(false); // Deactivate if the initial request fails
        }
    };

    // Use a useEffect hook to manage the polling logic
    useEffect(() => {
        let pollingInterval = null;

        if (isEmergencyActive) {
            const userId = Cookies.get("userId");
            if (!userId) {
                console.error("User not logged in, cannot poll for responses.");
                setIsEmergencyActive(false); // Stop if no userId is found
                return;
            }

            // Start polling for responses every 3 seconds
            pollingInterval = setInterval(async () => {
                try {
                    const responsesEndpoint = `https://hemobackned.azurewebsites.net/api/auth/sos/responses/${userId}`;
                    const response = await fetch(responsesEndpoint);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch responses: ${response.statusText}`);
                    }

                    const data = await response.json();
                    
                    if (data.responses && data.responses.length > 0) {
                        // Check for new responses that are not already in our state
                        data.responses.forEach(res => {
                            if (!statusUpdates.some(update => update.id === res._id)) {
                                let message;
                                let type;
                                if (res.response.startsWith('accept')) {
                                    const timeMatch = res.response.match(/coming(\d+)min/);
                                    const eta = timeMatch ? `(ETA: ${timeMatch[1]} minutes)` : '';
                                    message = `A donor accepted your request and is on the way ${eta}.`;
                                    type = 'success';
                                } else if (res.response.startsWith('reject')) {
                                    message = 'A donor was unable to help at this time.';
                                    type = 'info';
                                } else {
                                    message = `New response received: ${res.response}`;
                                    type = 'info';
                                }

                                setStatusUpdates(prev => [...prev, {
                                    id: res._id,
                                    message: message,
                                    time: 'Just now', // You can refine this logic
                                    type: type
                                }]);
                            }
                        });
                    }

                } catch (error) {
                    console.error("Error fetching SOS responses:", error);
                    // You might want to handle this more gracefully
                }
            }, 3000); // Poll every 3 seconds
        }

        // Cleanup function to clear the interval when the component unmounts
        // or when isEmergencyActive becomes false
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [isEmergencyActive, statusUpdates]); // Dependencies of the effect


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
        {isEmergencyActive && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🚨 Emergency Status</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {statusUpdates.map((update, index) => (
          <div
            key={update.id}
            className={`p-4 rounded-lg border transition-all duration-300 animate-slide-up ${
              update.type === "success"
                ? "border-green-300 bg-green-50 text-green-800"
                : update.type === "info"
                ? "border-blue-300 bg-blue-50 text-blue-800"
                : "border-red-300 bg-red-50 text-red-800"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-sm font-medium">{update.message}</p>
            <p className="text-xs mt-1 opacity-75">{update.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
)}

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