import React from 'react';
import { Calendar, Heart, Bell, TrendingUp, Users, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PatientDashboard = () => {
  const upcomingTransfusions = [
    {
      id: 1,
      date: '2024-08-25',
      time: '10:00 AM',
      location: 'City General Hospital - Wing A',
      type: 'Regular Transfusion',
      status: 'confirmed',
      daysUntil: 4
    },
    {
      id: 2,
      date: '2024-09-15',
      time: '2:30 PM',
      location: 'Metro Blood Center',
      type: 'Follow-up Transfusion',
      status: 'scheduled',
      daysUntil: 25
    }
  ];

  const donorAvailability = [
    {
      bloodType: 'O+',
      availability: 'High',
      trustLevel: 95,
      donors: 24,
      trend: 'up'
    },
    {
      bloodType: 'A+',
      availability: 'Moderate',
      trustLevel: 78,
      donors: 12,
      trend: 'stable'
    },
    {
      bloodType: 'B-',
      availability: 'Low',
      trustLevel: 65,
      donors: 3,
      trend: 'down'
    }
  ];

  const reminders = [
    {
      id: 1,
      type: 'medication',
      title: 'Iron Chelation Therapy',
      message: 'Take your evening medication with dinner',
      time: '2 hours ago',
      priority: 'medium',
      icon: Heart
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Pre-transfusion Check',
      message: 'Blood work scheduled for tomorrow at 8:00 AM',
      time: '6 hours ago',
      priority: 'high',
      icon: Calendar
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Hydration Reminder',
      message: 'Remember to stay well hydrated before your next visit',
      time: '1 day ago',
      priority: 'low',
      icon: CheckCircle2
    }
  ];

  const getTrustLevelColor = (level: number) => {
    if (level >= 90) return 'text-success';
    if (level >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getAvailabilityBadge = (availability: string) => {
    const colors = {
      'High': 'bg-success/10 text-success border-success/20',
      'Moderate': 'bg-primary/10 text-primary border-primary/20',
      'Low': 'bg-muted text-muted-foreground border-border'
    };
    return colors[availability as keyof typeof colors] || colors.Low;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'border-l-primary bg-primary/5',
      'medium': 'border-l-primary/60 bg-primary/3',
      'low': 'border-l-muted-foreground bg-muted/20'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="min-h-screen bg-section-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome back, <span className="text-primary">Sarah</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your health journey continues with hope and support
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-sm text-muted-foreground">Total Transfusions</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">12.8</div>
              <p className="text-sm text-muted-foreground">Hemoglobin Level</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">156</div>
              <p className="text-sm text-muted-foreground">Community Members</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <p className="text-sm text-muted-foreground">Days Until Next</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Transfusions */}
          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Transfusions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTransfusions.map((transfusion) => (
                  <div key={transfusion.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border bg-card/50 hover:shadow-card transition-all duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-foreground">{transfusion.type}</h3>
                        <Badge className={transfusion.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}>
                          {transfusion.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {transfusion.date} at {transfusion.time}
                      </p>
                      <p className="text-xs text-muted-foreground">{transfusion.location}</p>
                      <div className="mt-2">
                        <span className="text-xs font-medium text-primary">
                          {transfusion.daysUntil} days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* AI Donor Availability */}
          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                AI Donor Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donorAvailability.map((donor, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-primary">{donor.bloodType}</div>
                        <Badge className={getAvailabilityBadge(donor.availability)}>
                          {donor.availability}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{donor.donors} donors</div>
                        <div className={`text-xs font-medium ${getTrustLevelColor(donor.trustLevel)}`}>
                          {donor.trustLevel}% confidence
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${donor.trustLevel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-primary">AI Prediction:</span> Based on historical data and current trends, donor availability looks promising for your upcoming appointments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gentle Reminders */}
        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Gentle Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.map((reminder) => {
                const IconComponent = reminder.icon;
                return (
                  <div key={reminder.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(reminder.priority)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground mb-1">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{reminder.message}</p>
                        <p className="text-xs text-muted-foreground">{reminder.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-primary mb-4 animate-float">
            <Heart className="h-6 w-6" />
            <span className="text-lg font-medium">Every Drop Counts. Every Life Matters.</span>
            <Heart className="h-6 w-6" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            You're not alone in this journey. Our community of patients, donors, and healthcare professionals is here to support you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;