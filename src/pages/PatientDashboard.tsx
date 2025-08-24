import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Users, Droplets, MapPin, Activity, Heart, Clock, UserCheck, AlertCircle, Filter, X, Loader, RefreshCw, Search } from 'lucide-react';
import ActivityLogger from './ActivityLogger';

const PatientDashboard = () => {
  const [allDonors, setAllDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  
  const [filters, setFilters] = useState({
    gender: '',
    bloodGroup: '',
    role: '',
    donorType: '',
    eligibilityStatus: '',
    userStatus: '',
    searchLocation: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data from API
  const fetchDonors = async (page = 1, limit = 50) => {
    try {
      setLoading(true);
      const response = await fetch(`https://hemobackned.azurewebsites.net/api/donors?limit=${limit}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (page === 1) {
        setAllDonors(data.donors || []);
      } else {
        setAllDonors(prev => [...prev, ...(data.donors || [])]);
      }
      
      setTotalPages(data.totalPages || 0);
      setTotalDonors(data.total || 0);
      setCurrentPage(page);
      
    } catch (err) {
      console.error('Error fetching donors:', err);
      setError(`Failed to load donor data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load more data (pagination)
  const loadMoreDonors = async () => {
    if (currentPage < totalPages && !loading) {
      await fetchDonors(currentPage + 1, 50);
    }
  };

  // Initial load and load more data automatically
  useEffect(() => {
    fetchDonors(1, 100); // Load first 100 donors
  }, []);

  // Auto-load more data if we have less than 200 donors and there are more pages
  useEffect(() => {
    if (allDonors.length < 200 && allDonors.length > 0 && currentPage < totalPages && !loading) {
      const timer = setTimeout(() => {
        loadMoreDonors();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allDonors.length, currentPage, totalPages, loading]);

  // Filter donors based on selected filters
  const filteredDonors = useMemo(() => {
    return allDonors.filter(donor => {
      const matchesGender = !filters.gender || donor.gender === filters.gender;
      const matchesBloodGroup = !filters.bloodGroup || donor.blood_group === filters.bloodGroup;
      const matchesRole = !filters.role || donor.role === filters.role;
      const matchesDonorType = !filters.donorType || donor.donor_type === filters.donorType;
      const matchesEligibility = !filters.eligibilityStatus || donor.eligibility_status === filters.eligibilityStatus;
      const matchesUserStatus = !filters.userStatus || donor.user_donation_active_status === filters.userStatus;
      
      return matchesGender && matchesBloodGroup && matchesRole && matchesDonorType && matchesEligibility && matchesUserStatus;
    });
  }, [allDonors, filters]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalFiltered = filteredDonors.length;
    const eligibleDonors = filteredDonors.filter(d => d.eligibility_status === 'eligible').length;
    const activeDonors = filteredDonors.filter(d => d.user_donation_active_status === 'Active').length;
    const emergencyDonors = filteredDonors.filter(d => d.role === 'Emergency Donor').length;
    const bridgeDonors = filteredDonors.filter(d => d.role === 'Bridge Donor').length;
    const averageDonations = filteredDonors.reduce((sum, d) => sum + (d.donations_till_date || 0), 0) / totalFiltered || 0;

    // Blood group distribution
    const bloodGroupStats = {};
    filteredDonors.forEach(donor => {
      const group = donor.blood_group;
      if (!bloodGroupStats[group]) {
        bloodGroupStats[group] = { total: 0, eligible: 0, active: 0 };
      }
      bloodGroupStats[group].total++;
      if (donor.eligibility_status === 'eligible') bloodGroupStats[group].eligible++;
      if (donor.user_donation_active_status === 'Active') bloodGroupStats[group].active++;
    });

    // Gender distribution
    const genderStats = {};
    filteredDonors.forEach(donor => {
      const gender = donor.gender;
      if (!genderStats[gender]) {
        genderStats[gender] = { total: 0, eligible: 0 };
      }
      genderStats[gender].total++;
      if (donor.eligibility_status === 'eligible') genderStats[gender].eligible++;
    });

    // Location-based analysis (based on lat/lng proximity)
    const locationGroups = {};
    filteredDonors.forEach(donor => {
      const lat = Math.round(donor.latitude * 100) / 100; // Round to 2 decimals
      const lng = Math.round(donor.longitude * 100) / 100;
      const locationKey = `${lat},${lng}`;
      locationGroups[locationKey] = (locationGroups[locationKey] || 0) + 1;
    });

    return {
      totalFiltered,
      totalFromAPI: totalDonors,
      eligibleDonors,
      activeDonors,
      emergencyDonors,
      bridgeDonors,
      averageDonations,
      bloodGroupStats,
      genderStats,
      locationGroups,
      eligibilityRate: (eligibleDonors / totalFiltered) * 100 || 0,
      activityRate: (activeDonors / totalFiltered) * 100 || 0
    };
  }, [filteredDonors, totalDonors]);

  // Chart data preparations
// 1. Define the interface for a single blood group's stats
interface BloodGroupStats {
  total: number;
  eligible: number;
  active: number;
}

// 2. Define the interface for the entire bloodGroupStats object
interface BloodGroupStatsMap {
  [key: string]: BloodGroupStats;
}

// 3. Cast the analytics.bloodGroupStats object to the defined interface
const bloodGroupChartData = Object.entries(analytics.bloodGroupStats as BloodGroupStatsMap)
  .map(([group, stats]) => ({
    bloodGroup: group,
    total: stats.total,
    eligible: stats.eligible,
    active: stats.active,
  }))
  .sort((a, b) => b.total - a.total);
  
  // const genderChartData = Object.entries(analytics.genderStats).map(([gender, stats]) => ({
  //   gender,
  //   total: stats.total,
  //   eligible: stats.eligible
  // }));

  const eligibilityData = [
    { name: 'Eligible', value: analytics.eligibleDonors, color: '#059669' },
    { name: 'Not Eligible', value: analytics.totalFiltered - analytics.eligibleDonors, color: '#dc2626' }
  ];

  const activeStatusData = [
    { name: 'Active', value: analytics.activeDonors, color: '#2563eb' },
    { name: 'Inactive', value: analytics.totalFiltered - analytics.activeDonors, color: '#64748b' }
  ];

  const roleData = [
    { name: 'Emergency Donor', value: analytics.emergencyDonors, color: '#dc2626' },
    { name: 'Bridge Donor', value: analytics.bridgeDonors, color: '#7c3aed' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      gender: '',
      bloodGroup: '',
      role: '',
      donorType: '',
      eligibilityStatus: '',
      userStatus: '',
      searchLocation: ''
    });
  };

  const refreshData = () => {
    setAllDonors([]);
    setCurrentPage(1);
    fetchDonors(1, 100);
  };

  const activeFiltersCount = Object.values(filters).filter(f => f !== '').length;

  // Get unique values for dropdowns
  const uniqueBloodGroups = [...new Set(allDonors.map(d => d.blood_group))].sort();
  const uniqueRoles = [...new Set(allDonors.map(d => d.role))].sort();
  const uniqueDonorTypes = [...new Set(allDonors.map(d => d.donor_type))].sort();

  if (loading && allDonors.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Blood Donor Data</h2>
          <p className="text-gray-600">Fetching real-time donor information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Droplets className="text-red-600 h-8 w-8" />
                </div>
                Blood Donor Finder
              </h1>
              <p className="text-gray-600 text-lg">Find compatible blood donors in your area</p>
              <p className="text-sm text-gray-500 mt-1">
                Showing {analytics.totalFiltered.toLocaleString()} of {analytics.totalFromAPI.toLocaleString()} donors
                {loading && <span className="ml-2 text-blue-600">Loading more...</span>}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 font-medium"
              >
                <Filter className="h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="h-5 w-5 text-red-600" />
                Find Your Compatible Donors
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {/* Gender Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">Gender Preference</label>
                <div className="space-y-2">
                  {['Male', 'Female'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => handleFilterChange('gender', gender)}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filters.gender === gender
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blood Group Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">Blood Group Needed</label>
                <select
                  value={filters.bloodGroup}
                  onChange={(e) => setFilters(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Blood Types</option>
                  {uniqueBloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">Donor Type</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {uniqueRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Eligibility Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">Availability</label>
                <select
                  value={filters.eligibilityStatus}
                  onChange={(e) => setFilters(prev => ({ ...prev, eligibilityStatus: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Donors</option>
                  <option value="eligible">✅ Available Now</option>
                  <option value="ineligible">⏳ Not Available</option>
                </select>
              </div>

              {/* Activity Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">Activity Status</label>
                <select
                  value={filters.userStatus}
                  onChange={(e) => setFilters(prev => ({ ...prev, userStatus: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Active">🟢 Active Donors</option>
                  <option value="Inactive">🔴 Inactive</option>
                </select>
              </div>

              {/* Clear Button */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics - Patient Focused */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Available Donors</p>
                <p className="text-3xl font-bold text-green-600">{analytics.eligibleDonors.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">
                  {analytics.eligibilityRate.toFixed(1)}% ready to donate
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Emergency Donors</p>
                <p className="text-3xl font-bold text-red-600">{analytics.emergencyDonors.toLocaleString()}</p>
                <p className="text-sm text-red-600 font-medium">For urgent cases</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Active Donors</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.activeDonors.toLocaleString()}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {analytics.activityRate.toFixed(1)}% actively donating
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Donors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalFiltered.toLocaleString()}</p>
                <p className="text-sm text-purple-600 font-medium">In database</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid - Patient Focused */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Blood Group Availability */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-full"></div>
              Blood Group Availability
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={bloodGroupChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bloodGroup" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#1f2937',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="eligible" fill="#059669" radius={[3, 3, 0, 0]} name="Available" />
                <Bar dataKey="total" fill="#e5e7eb" radius={[3, 3, 0, 0]} name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donor Roles */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
              Donor Categories
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#1f2937',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donor Directory - Most Important for Patients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
              Available Donors Directory
            </h3>
            {currentPage < totalPages && (
              <button
                onClick={loadMoreDonors}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 text-left text-gray-700 font-semibold">Blood Type</th>
                  <th className="pb-4 text-left text-gray-700 font-semibold">Donor Info</th>
                  <th className="pb-4 text-left text-gray-700 font-semibold">Experience</th>
                  <th className="pb-4 text-left text-gray-700 font-semibold">Availability</th>
                  <th className="pb-4 text-left text-gray-700 font-semibold">Status</th>
                  <th className="pb-4 text-left text-gray-700 font-semibold">Last Donation</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.slice(0, 20).map((donor, index) => (
                  <tr key={donor._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Droplets className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="font-bold text-gray-900">{donor.blood_group}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-900">{donor.gender} • {donor.role}</p>
                        <p className="text-sm text-gray-500">{donor.donor_type}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{donor.donations_till_date || 0} donations</p>
                        <p className="text-sm text-gray-500">
                          {donor.calls_to_donations_ratio ? `${donor.calls_to_donations_ratio.toFixed(1)}:1 ratio` : 'No ratio data'}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        donor.eligibility_status === 'eligible' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {donor.eligibility_status === 'eligible' ? '✅ Available' : '⏳ Not Available'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        donor.user_donation_active_status === 'Active' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {donor.user_donation_active_status === 'Active' ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                    </td>
                    <td className="py-4 text-gray-700">
                      {donor.days_since_last_donation 
                        ? `${donor.days_since_last_donation} days ago` 
                        : 'No record'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {Math.min(20, filteredDonors.length)} of {filteredDonors.length.toLocaleString()} filtered donors
            </p>
            {filteredDonors.length > 20 && (
              <p className="text-sm text-gray-500">
                Scroll up and use "Load More" to see additional donors
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;