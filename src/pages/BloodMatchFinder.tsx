/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Heart, Phone, MapPin, Calendar, Activity, Users, Badge, AlertCircle } from 'lucide-react';
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { InteractiveBrowserCredential } from "@azure/identity";
import { AzureOpenAI } from "openai";

import Cookies from "js-cookie";

interface UserData {
  success: boolean;
  user: {
    generalInfo: {
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
      bloodGroup: string;
      stateOfResidence: string;
      city: string;
    };
    patientInfo: {
      emergencyContact: {
        name: string;
        phone: string;
      };
      condition: string;
      transfusionFrequency: string;
      lastTransfusionDate: string;
      expectedNextTransfusionDate: string;
      hospital: string;
    };
    donorInfo: {
      lastDonationDate: string;
      nextEligibleDate: string;
      registrationDate: string;
      lastContactedDate: string;
      donorType: string;
      willingToDonate: boolean;
      preferredDonationCenter: string;
      availabilityWindow: string;
      medicalRestrictions: boolean;
      quantityRequired: number;
      donationsTillDate: number;
      cycleOfDonations: number;
      totalCalls: number;
      frequencyInDays: number;
    };
    coupleInfo: {
      partnerName: string;
      partnerAge: number;
      partnerBloodGroup: string;
      carrierStatusSelf: string;
      carrierStatusPartner: string;
    };
    aiTracker: {
      predictedNextDonationDate: string;
      bridgeGender: string;
      bridgeBloodGroup: string;
      roleStatus: boolean;
      bridgeStatus: boolean;
      statusOfBridge: boolean;
      userDonationActiveStatus: string;
      status: string;
      latitude: number;
      longitude: number;
    };
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    badges: string[];
    streakCount: number;
    hasSOS: boolean;
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DonorData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  donors: Array<{
    _id: string;
    role: string;
    blood_group: string;
    gender: string;
    latitude: number;
    longitude: number;
    donor_type: string;
    donations_till_date: number;
    eligibility_status: string;
    status: string;
    days_since_last_donation: number;
    days_until_next_eligible: number;
  }>;
}

const BloodMatchFinder: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [donorData, setDonorData] = useState<DonorData | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Blood Match Assistant. I can help you find compatible donors, answer questions about blood donation, and provide personalized recommendations based on your profile. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
              const userId = Cookies.get("userId");
        // Get userId from cookies (you'll need to implement Cookies.get)
        // For now using direct userId, replace with: const userId = Cookies.get("userId");
        // const userId = "68aa0601be394aab95787939";
        
        if (!userId) {
          throw new Error("User not logged in!");
        }
        
        console.log('Fetching data for userId:', userId);
        
        // Fetch current user data
        const userResponse = await fetch(`https://hemobackned.azurewebsites.net/api/auth/${userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        console.log('User data:', userData);
        setUserData(userData);
        
        // Fetch donors data (starting with page 1, you can add pagination later)
        const donorsResponse = await fetch('https://hemobackned.azurewebsites.net/api/donors?limit=10&page=1');
        if (!donorsResponse.ok) {
          throw new Error('Failed to fetch donors data');
        }
        const donorsData = await donorsResponse.json();
        console.log('Donors data:', donorsData);
        setDonorData(donorsData);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // const callAzureAIAgent = async (userMessage: string): Promise<string> => {
  //   try {
  //     // Here you would integrate with your Azure AI Agent
  //     // For now, I'll create intelligent responses based on actual user and donor data
      
  //     await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
  //     // Generate contextual responses based on real data
  //     const userBloodGroup = userData?.user.generalInfo.bloodGroup;
  //     const userCondition = userData?.user.patientInfo.condition;
  //     const totalDonors = donorData?.total || 0;
  //     const eligibleDonors = donorData?.donors.filter(d => d.eligibility_status === 'eligible').length || 0;
      
  //     const contextualResponses = [
  //       `I've analyzed the donor database with ${totalDonors.toLocaleString()} registered donors. For your ${userBloodGroup} blood type and ${userCondition} condition, I found ${eligibleDonors} currently eligible donors in your area. Your next transfusion is scheduled for ${new Date(userData?.user.patientInfo.expectedNextTransfusionDate || '').toLocaleDateString()}.`,
        
  //       `Based on your donor profile, you've completed ${userData?.user.donorInfo.donationsTillDate} donations as a ${userData?.user.donorInfo.donorType} donor. Your next eligible donation date is ${new Date(userData?.user.donorInfo.nextEligibleDate || '').toLocaleDateString()}. I can help you find compatible recipients who urgently need ${userBloodGroup} blood.`,
        
  //       `Your AI health tracker indicates optimal donation timing for ${new Date(userData?.user.aiTracker.predictedNextDonationDate || '').toLocaleDateString()}. With your bridge donor status and ${userBloodGroup} blood type, you can help ${userData?.user.aiTracker.bridgeBloodGroup} recipients through our bridge program.`,
        
  //       `Emergency alert capability activated! As a ${userBloodGroup} donor, you're critical for emergency cases. I'm monitoring ${totalDonors.toLocaleString()} donors across Hyderabad. Your location data shows you're in the optimal zone for rapid response donations.`,
        
  //       `Analyzing compatibility matrix: Your ${userBloodGroup} blood type is compatible with multiple recipient types. Current database shows ${eligibleDonors} active donors, with ${donorData?.donors.filter(d => d.days_until_next_eligible <= 0).length} immediately available for emergency requests.`
  //     ];
      
  //     // You can enhance this further by integrating the actual Azure AI Agent code:
  //     /*
  //     const response = await project.agents.runs.create_and_process({
  //       thread_id: thread.id,
  //       agent_id: agent.id
  //     });
  //     return response.content;
  //     */
      
  //     return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
      
  //   } catch (error) {
  //     console.error('AI Agent Error:', error);
  //     return "I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, you can contact your healthcare provider for immediate assistance.";
  //   }
  // };

const callAzureAIAgent = async (userMessage: string): Promise<string> => {
  try {
    // Azure OpenAI configuration - hardcoded values


     const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT!;
    const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY!;
    const apiVersion = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_VERSION!;
    const deployment = process.env.NEXT_PUBLIC_AZURE_OPENAI_DEPLOYMENT!;
    // Initialize Azure OpenAI client
    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment,
dangerouslyAllowBrowser: true // Note: Use with caution in production
    });

    // Validate input
    if (!userMessage || userMessage.trim().length === 0) {
      throw new Error("User message is required and cannot be empty");
    }

    // Prepare request options (without temperature for gpt-5-mini compatibility)
    const requestOptions = {
 model: "gpt-5-mini-2",
      messages: [
        {
          role: "system" as const,
          content: "You are an AI assistant that helps people find information."
        },
        {
          role: "user" as const,
          content: userMessage.trim()
        }
      ],
      max_completion_tokens: 16384
    };

    // Call Azure OpenAI API
    const result = await client.chat.completions.create(requestOptions);

    // Extract and return the response
    const response = result.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response generated from Azure OpenAI");
    }

    return response;

  } catch (error: any) {
    // Enhanced error handling
    if (error.status) {
      throw new Error(`Azure OpenAI API Error (${error.status}): ${error.message || 'Unknown API error'}`);
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Network error: Unable to connect to Azure OpenAI service');
    }
    
    if (error.message) {
      throw new Error(`Azure OpenAI Error: ${error.message}`);
    }
    
    throw new Error('Unknown error occurred while calling Azure OpenAI');
  }
};
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call the actual Azure AI Agent or enhanced AI response
      const aiResponse = await callAzureAIAgent(inputMessage);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your blood match data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-4">
      <div className="max-w-7xl mx-auto flex gap-6 h-[calc(100vh-2rem)]">
        {/* User Profile Sidebar */}
        <div className="w-80 bg-white rounded-2xl shadow-lg border border-red-100 p-6 overflow-y-auto">
          {/* Profile Header */}
          <div className="text-center mb-6 pb-4 border-b border-red-100">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">
                {userData.user.firstName.charAt(0)}{userData.user.lastName.charAt(0)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{userData.user.firstName} {userData.user.lastName}</h2>
            <span className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {userData.user.role}
            </span>
          </div>

          {/* General Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">General Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Blood Group</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  {userData.user.generalInfo.bloodGroup}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Gender</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.generalInfo.gender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Location</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.generalInfo.city}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Phone</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.generalInfo.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">Patient Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Condition</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.patientInfo.condition}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Frequency</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.patientInfo.transfusionFrequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Hospital</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.patientInfo.hospital}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Next Transfusion</span>
                <span className="text-xs font-medium text-red-600">{formatDate(userData.user.patientInfo.expectedNextTransfusionDate)}</span>
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">Donor Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Type</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.donorInfo.donorType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Donations</span>
                <span className="text-xs font-medium text-gray-800">{userData.user.donorInfo.donationsTillDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Next Eligible</span>
                <span className="text-xs font-medium text-green-600">{formatDate(userData.user.donorInfo.nextEligibleDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Status</span>
                <span className={`text-xs font-medium ${userData.user.donorInfo.willingToDonate ? 'text-green-600' : 'text-yellow-600'}`}>
                  {userData.user.donorInfo.willingToDonate ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Tracker */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">AI Insights</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Predicted Next</span>
                <span className="text-xs font-medium text-blue-600">{formatDate(userData.user.aiTracker.predictedNextDonationDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Bridge Status</span>
                <span className={`text-xs font-medium ${userData.user.aiTracker.bridgeStatus ? 'text-green-600' : 'text-gray-600'}`}>
                  {userData.user.aiTracker.bridgeStatus ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          {userData.user.badges.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {userData.user.badges.map((badge, index) => (
                  <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Chat Interface */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-red-100 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI Blood Match Assistant</h1>
                <p className="text-red-100 text-sm">Trained on {donorData?.total.toLocaleString()} donor profiles</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    {message.role === 'user' && (
                      <User className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-red-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about compatible donors, donation eligibility, or get personalized recommendations..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                'Find compatible donors near me',
                'When is my next eligible donation?',
                'Emergency blood request',
                'My transfusion schedule'
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(suggestion)}
                  className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodMatchFinder;