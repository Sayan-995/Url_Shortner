import React from 'react';
import { TrendingUp, Users, Share2, BarChart3 } from 'lucide-react';

const StatsOverview = ({ analytics }) => {
  const stats = [
    {
      label: 'Total Clicks',
      value: analytics?.clickCount || 0,
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Unique Visitors',
      value: analytics?.uniqueClickCount || 0,
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Countries',
      value: analytics?.countryCounts?.length || 0,
      icon: Share2,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Referrers',
      value: analytics?.refererCounts?.length || 0,
      icon: BarChart3,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <Icon size={24} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
