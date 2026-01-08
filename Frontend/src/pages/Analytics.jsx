import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '../components/LoadingSpinner';

const COLORS = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const Analytics = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { analyticsData, isLoading, fetchAnalytics } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (code) {
      setIsVisible(false);
      fetchAnalytics(code);
    }
  }, [code, fetchAnalytics]);

  useEffect(() => {
    if (!isLoading && analyticsData) {
      setIsVisible(true);
    }
  }, [isLoading, analyticsData]);

  const data = analyticsData || {};

  // Transform data for charts
  const countryChartData = data.countryData
    ? Object.entries(data.countryData).map(([name, value]) => ({ name, value }))
    : [];
  
  const regionChartData = data.regionData
    ? Object.entries(data.regionData).map(([name, value]) => ({ name, value }))
    : [];
  
  const deviceChartData = data.deviceData
    ? Object.entries(data.deviceData).map(([name, value]) => ({ name, value }))
    : [];
  
  const browserChartData = data.browserData
    ? Object.entries(data.browserData).map(([name, value]) => ({ name, value }))
    : [];
  
  const cityChartData = data.cityData
    ? Object.entries(data.cityData).map(([name, value]) => ({ name, value }))
    : [];
  
  const osChartData = data.osData
    ? Object.entries(data.osData).map(([name, value]) => ({ name, value }))
    : [];
  
  const timeChartData = data.timeData
    ? Object.entries(data.timeData).map(([name, value]) => ({ name, value }))
    : [];
  
  const dateChartData = data.dateData
    ? Object.entries(data.dateData).map(([name, value]) => ({ name, value }))
    : [];
  
  const refererChartData = data.refererData
    ? Object.entries(data.refererData).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className={`min-h-screen pb-20 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LoadingSpinner fullScreen={false} />
        </div>
      )}

      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-primary-300 hover:text-primary-200 transition"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 bg-clip-text text-transparent">
              Analytics for {code}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Total Clicks</p>
                  <p className="text-4xl font-bold text-white">{data.clickCount || 0}</p>
                </div>
                <div className="p-3 bg-primary-500/20 rounded-full">
                  <TrendingUp size={32} className="text-primary-400" />
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Unique Clicks</p>
                  <p className="text-4xl font-bold text-white">{data.uniqueClickCount || 0}</p>
                </div>
                <div className="p-3 bg-accent-500/20 rounded-full">
                  <Users size={32} className="text-accent-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid - All Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Countries */}
            {countryChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Top Countries</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={countryChartData.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Regions */}
            {regionChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Top Regions</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionChartData.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Cities */}
            {cityChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Top Cities</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityChartData.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Devices */}
            {deviceChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Device Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={deviceChartData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {deviceChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Browsers */}
            {browserChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Top Browsers</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={browserChartData.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#d946ef" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* OS */}
            {osChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Operating Systems</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={osChartData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {osChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Time */}
            {timeChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Clicks by Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeChartData.slice(0, 24)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Line type="monotone" dataKey="value" stroke="#0ea5e9" dot={{ fill: '#0ea5e9' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Date */}
            {dateChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Clicks by Date</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dateChartData.slice(0, 30)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Line type="monotone" dataKey="value" stroke="#d946ef" dot={{ fill: '#d946ef' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Referrers */}
            {refererChartData.length > 0 && (
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Top Referrers</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={refererChartData.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
