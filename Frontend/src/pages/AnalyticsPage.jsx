import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, TrendingUp, Users, Globe, Smartphone, LogOut } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '../components/LoadingSpinner';

const Analytics = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { analyticsData, isLoading, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    if (code) {
      fetchAnalytics(code);
    }
  }, [code]);

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 text-lg">No analytics data available</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const data = analyticsData.data;

  return (
    <div className="min-h-screen pb-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg hover:bg-white/15 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Conversion Rate</p>
                <p className="text-4xl font-bold text-white">
                  {data.uniqueClickCount && data.clickCount
                    ? Math.round((data.uniqueClickCount / data.clickCount) * 100)
                    : 0}%
                </p>
              </div>
              <div className="p-3 bg-success-500/20 rounded-full">
                <Globe size={32} className="text-success-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Countries */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe size={24} className="text-primary-400" />
              Top Countries
            </h2>
            {data.countryData && Object.entries(data.countryData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.countryData)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([country, count], index) => (
                    <div key={country} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-8">{index + 1}.</span>
                      <span className="flex-1 text-gray-300">{country || 'Unknown'}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-vibrant"
                          style={{
                            width: `${Math.min(
                              (count / Math.max(...Object.values(data.countryData))) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-primary-300 font-semibold w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No country data available</p>
            )}
          </div>

          {/* Top Devices */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Smartphone size={24} className="text-accent-400" />
              Top Devices
            </h2>
            {data.deviceData && Object.entries(data.deviceData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.deviceData)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([device, count], index) => (
                    <div key={device} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-8">{index + 1}.</span>
                      <span className="flex-1 text-gray-300">{device || 'Unknown'}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                          style={{
                            width: `${Math.min(
                              (count / Math.max(...Object.values(data.deviceData))) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-primary-300 font-semibold w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No device data available</p>
            )}
          </div>

          {/* Top Browsers */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <LogOut size={24} className="text-success-400" />
              Top Browsers
            </h2>
            {data.browserData && Object.entries(data.browserData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.browserData)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([browser, count], index) => (
                    <div key={browser} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-8">{index + 1}.</span>
                      <span className="flex-1 text-gray-300">{browser || 'Unknown'}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-500 to-accent-400"
                          style={{
                            width: `${Math.min(
                              (count / Math.max(...Object.values(data.browserData))) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-accent-300 font-semibold w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No browser data available</p>
            )}
          </div>

          {/* Top Cities */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe size={24} className="text-warning-400" />
              Top Cities
            </h2>
            {data.cityData && Object.entries(data.cityData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.cityData)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([city, count], index) => (
                    <div key={city} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-8">{index + 1}.</span>
                      <span className="flex-1 text-gray-300">{city || 'Unknown'}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-warning-500 to-warning-400"
                          style={{
                            width: `${Math.min(
                              (count / Math.max(...Object.values(data.cityData))) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-warning-300 font-semibold w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No city data available</p>
            )}
          </div>

          {/* Operating Systems */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Smartphone size={24} className="text-info-400" />
              Operating Systems
            </h2>
            {data.osData && Object.entries(data.osData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(data.osData)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([os, count], index) => (
                    <div key={os} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-8">{index + 1}.</span>
                      <span className="flex-1 text-gray-300">{os || 'Unknown'}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-info-500 to-info-400"
                          style={{
                            width: `${Math.min(
                              (count / Math.max(...Object.values(data.osData))) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-info-300 font-semibold w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No OS data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
