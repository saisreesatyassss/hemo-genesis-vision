import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Droplet, 
  User, 
  Calendar, 
  Hospital, 
  Shield,
  Award,
  Activity,
  Clock,
  Users,
  Target,
  AlertCircle,
  Star
} from 'lucide-react';
import Cookies from "js-cookie";

const BloodProfileDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bloodDrops, setBloodDrops] = useState([]);

  // Generate floating blood drops animation
  useEffect(() => {
    const drops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 30
    }));
    setBloodDrops(drops);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from cookies (you'll need to add js-cookie)
const userId = Cookies.get("userId");
        if (!userId) {
  // Handle the case where the user is not logged in
  console.error("User ID cookie not found.");
}
        const response = await fetch(`https://hemo-genesis-ai-backend.vercel.app/api/auth/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Profile Not Found</h2>
          <p className="text-red-500">Unable to load your profile data.</p>
        </div>
      </div>
    );
  }

  const { generalInfo, patientInfo, donorInfo, coupleInfo, aiTracker } = userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 relative overflow-hidden">
      {/* Animated Blood Drops Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bloodDrops.map(drop => (
          <div
            key={drop.id}
            className="absolute text-red-400/20 animate-bounce"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              fontSize: `${drop.size}px`,
              top: '-50px'
            }}
          >
            <Droplet className="drop-shadow-lg animate-pulse" />
          </div>
        ))}
      </div>

      {/* Floating Blood Cells */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-300/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-red-400/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-red-300/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 shadow-2xl border-2 border-red-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">
                  {userData.firstName} {userData.lastName}
                </h1>
                <div className="flex items-center space-x-4 text-red-100">
                  <span className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    {userData.role}
                  </span>
                  <span className="flex items-center">
                    <Droplet className="w-5 h-5 mr-2" />
                    {generalInfo?.bloodGroup}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Streak: {userData.streakCount}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex flex-wrap gap-2">
                  {userData.badges?.map((badge, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/30">
                      <Award className="w-4 h-4 inline mr-2" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* General Information Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-800">General Info</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-red-500 mr-3" />
                <span className="font-medium">{generalInfo?.phoneNumber}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 text-red-500 mr-3" />
                <span>{new Date(generalInfo?.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 text-red-500 mr-3" />
                <span>{generalInfo?.gender}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 text-red-500 mr-3" />
                <span>{generalInfo?.city}, {generalInfo?.stateOfResidence}</span>
              </div>
            </div>
          </div>

          {/* Patient Information Card */}
          {patientInfo && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Hospital className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-red-800">Patient Info</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-red-600">Condition</span>
                  <p className="font-semibold text-red-800">{patientInfo.condition}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <Activity className="w-5 h-5 text-red-500 mr-3" />
                  <span>{patientInfo.transfusionFrequency} transfusions</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Hospital className="w-5 h-5 text-red-500 mr-3" />
                  <span>{patientInfo.hospital}</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-red-600">Emergency Contact</span>
                  <p className="font-semibold">{patientInfo.emergencyContact?.name}</p>
                  <p className="text-sm text-gray-600">{patientInfo.emergencyContact?.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Donor Information Card */}
          {donorInfo && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-red-800">Donor Info</h2>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-red-600">{donorInfo.donationsTillDate}</p>
                    <p className="text-sm text-red-500">Total Donations</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-red-600">{donorInfo.quantityRequired}</p>
                    <p className="text-sm text-red-500">ML Required</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Target className="w-5 h-5 text-red-500 mr-3" />
                  <span>{donorInfo.donorType} Donor</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 text-red-500 mr-3" />
                  <span>{donorInfo.availabilityWindow}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-red-500 mr-3" />
                  <span>{donorInfo.preferredDonationCenter}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Couple Information Card */}
          {coupleInfo && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-red-800">Partner Info</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Partner Name:</span>
                  <span className="font-semibold">{coupleInfo.partnerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Partner Age:</span>
                  <span className="font-semibold">{coupleInfo.partnerAge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Partner Blood Group:</span>
                  <span className="font-semibold text-red-600">{coupleInfo.partnerBloodGroup}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Your Status</p>
                    <p className={`font-bold ${coupleInfo.carrierStatusSelf === 'Yes' ? 'text-red-600' : 'text-green-600'}`}>
                      {coupleInfo.carrierStatusSelf === 'Yes' ? 'Carrier' : 'Non-Carrier'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Partner Status</p>
                    <p className={`font-bold ${coupleInfo.carrierStatusPartner === 'Yes' ? 'text-red-600' : 'text-green-600'}`}>
                      {coupleInfo.carrierStatusPartner === 'Yes' ? 'Carrier' : 'Non-Carrier'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Tracker Card */}
          {aiTracker && (
            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-xl p-6 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">AI Health Tracker</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm opacity-90">Predicted Next Donation</p>
                  <p className="text-lg font-semibold">
                    {new Date(aiTracker.predictedNextDonationDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm opacity-90">Status</p>
                    <p className="font-bold capitalize">{aiTracker.status}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-90">Location</p>
                    <p className="font-bold">{aiTracker.latitude.toFixed(2)}, {aiTracker.longitude.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${aiTracker.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                  <span className="text-sm">
                    {aiTracker.userDonationActiveStatus === 'active' ? 'Active Donor' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

     <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default BloodProfileDashboard;