import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, MessageCircle, Zap, Clock, Star, Shield, AlertTriangle, Navigation, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const BloodMatchFinder = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState('A+');
  const [searchRadius, setSearchRadius] = useState(5);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const nearbyDonors = [
    {
      id: 1,
      name: 'Alex Johnson',
      bloodType: 'A+',
      distance: 0.8,
      lastDonation: '2 months ago',
      aiConfidence: 98,
      matchScore: 95,
      availability: 'Available Now',
      verified: true,
      emergencyDonor: true,
      location: { lat: 40.7128, lng: -74.0060 },
      phone: '+1 (555) 123-4567',
      notes: 'Frequent donor, excellent health records'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      bloodType: 'A+',
      distance: 1.2,
      lastDonation: '6 weeks ago',
      aiConfidence: 94,
      matchScore: 92,
      availability: 'Available Today',
      verified: true,
      emergencyDonor: false,
      location: { lat: 40.7580, lng: -73.9855 },
      phone: '+1 (555) 987-6543',
      notes: 'Regular donor, excellent compatibility history'
    },
    {
      id: 3,
      name: 'David Chen',
      bloodType: 'A+',
      distance: 2.1,
      lastDonation: '1 month ago',
      aiConfidence: 89,
      matchScore: 88,
      availability: 'Available Tomorrow',
      verified: true,
      emergencyDonor: true,
      location: { lat: 40.7834, lng: -73.9662 },
      phone: '+1 (555) 456-7890',
      notes: 'Healthcare professional, fast response time'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      bloodType: 'A+',
      distance: 3.5,
      lastDonation: '3 weeks ago',
      aiConfidence: 85,
      matchScore: 82,
      availability: 'Available This Week',
      verified: true,
      emergencyDonor: false,
      location: { lat: 40.6892, lng: -74.0445 },
      phone: '+1 (555) 321-0987',
      notes: 'Young donor, excellent health profile'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.0060, 40.7128], // NYC
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for donors
    nearbyDonors.forEach((donor) => {
      const el = document.createElement('div');
      el.className = `w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold cursor-pointer transition-all hover:scale-110 ${
        donor.emergencyDonor 
          ? 'bg-primary text-primary-foreground border-primary shadow-glow' 
          : 'bg-card text-card-foreground border-primary/50'
      }`;
      el.innerHTML = donor.bloodType;
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-bold text-sm">${donor.name}</h3>
          <p class="text-xs text-gray-600">${donor.distance} miles away</p>
          <p class="text-xs text-gray-600">${donor.availability}</p>
          <div class="mt-2">
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              ${donor.aiConfidence}% Match
            </span>
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([donor.location.lng, donor.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    setMapInitialized(true);
  };

  useEffect(() => {
    if (mapboxToken && !mapInitialized) {
      initializeMap();
    }
  }, [mapboxToken, mapInitialized]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-success';
    if (confidence >= 85) return 'text-primary';
    if (confidence >= 75) return 'text-primary/70';
    return 'text-muted-foreground';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 95) return 'bg-success/10 border-success/20';
    if (confidence >= 85) return 'bg-primary/10 border-primary/20';
    if (confidence >= 75) return 'bg-primary/5 border-primary/10';
    return 'bg-muted/10 border-border';
  };

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
  };

  const handleContactDonor = (donor: any) => {
    // In a real app, this would trigger a contact flow
    console.log('Contacting donor:', donor.name);
  };

  const handleRequestBlood = (donor: any) => {
    // In a real app, this would trigger a blood request
    console.log('Requesting blood from:', donor.name);
  };

  return (
    <div className="min-h-screen bg-section-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blood Match Finder
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            AI-powered donor matching to save lives faster
          </p>
          
          {/* Emergency Mode Toggle */}
          <Button 
            variant={emergencyMode ? "destructive" : "outline"}
            size="lg"
            onClick={handleEmergencyToggle}
            className={`mb-6 ${emergencyMode ? 'animate-pulse' : ''}`}
          >
            <Zap className="mr-2 h-5 w-5" />
            {emergencyMode ? 'Emergency Mode Active' : 'Activate Emergency Mode'}
          </Button>
        </div>

        {/* Emergency Alert */}
        {emergencyMode && (
          <Alert className="mb-6 border-destructive bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              Emergency mode activated. Prioritizing immediate available donors and fastest response times.
            </AlertDescription>
          </Alert>
        )}

        {/* Mapbox Token Input (temporary for demo) */}
        {!mapInitialized && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Setup Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                To view the interactive map, please enter your Mapbox public token. 
                Get one free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your Mapbox public token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={initializeMap} disabled={!mapboxToken}>
                  Initialize Map
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bloodType">Blood Type Needed</Label>
                <select 
                  id="bloodType"
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="radius">Search Radius (miles)</Label>
                <Input
                  id="radius"
                  type="number"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  min="1"
                  max="50"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Nearby Donors Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <div ref={mapContainer} className="absolute inset-0" />
                {!mapInitialized && (
                  <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Map will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Emergency Donors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-card border border-primary/50"></div>
                  <span>Regular Donors</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donor List */}
          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Top AI Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {nearbyDonors.map((donor) => (
                  <div key={donor.id} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-card ${
                    emergencyMode && donor.emergencyDonor 
                      ? 'border-primary bg-primary/5 shadow-glow' 
                      : 'border-border bg-card/50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{donor.bloodType}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            {donor.name}
                            {donor.verified && <Shield className="h-4 w-4 text-success" />}
                            {donor.emergencyDonor && <Zap className="h-4 w-4 text-primary" />}
                          </h3>
                          <p className="text-sm text-muted-foreground">{donor.distance} miles away</p>
                        </div>
                      </div>
                      <Badge className={getConfidenceBg(donor.aiConfidence)}>
                        <span className={getConfidenceColor(donor.aiConfidence)}>
                          {donor.aiConfidence}% AI Match
                        </span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Availability:</span>
                        <p className="font-medium text-foreground">{donor.availability}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Donation:</span>
                        <p className="font-medium text-foreground">{donor.lastDonation}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4">{donor.notes}</p>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleRequestBlood(donor)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Request Blood
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactDonor(donor)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-muted-foreground">Compatible Donors Found</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Highest AI Confidence</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">0.8</div>
              <p className="text-sm text-muted-foreground">Miles to Nearest</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <p className="text-sm text-muted-foreground">Emergency Donors</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Every Second Counts
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Our AI-powered matching system finds the most compatible donors in your area, 
            ensuring faster, safer transfusions when you need them most.
          </p>
          <Button size="lg" className="animate-glow">
            <Zap className="mr-2 h-5 w-5" />
            Find Emergency Donors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BloodMatchFinder;