import React from 'react';
import { Calendar, Users, Trophy, Heart } from 'lucide-react';

const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'training',
      icon: Calendar,
      title: 'Training Session Completed',
      description: 'U15 team completed tactical training',
      time: '2 hours ago',
      user: 'Coach Michael'
    },
    {
      id: 2,
      type: 'player',
      icon: Users,
      title: 'New Player Registered',
      description: 'James Ochieng joined U12 team',
      time: '4 hours ago',
      user: 'Admin'
    },
    {
      id: 3,
      type: 'match',
      icon: Trophy,
      title: 'Match Result Updated',
      description: 'U15 vs Lions FC: 3-1 victory',
      time: '1 day ago',
      user: 'Coach Sarah'
    },
    {
      id: 4,
      type: 'medical',
      icon: Heart,
      title: 'Medical Check Completed',
      description: 'Annual health check for U20 squad',
      time: '2 days ago',
      user: 'Dr. Wanjiku'
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'training': return 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300';
      case 'player': return 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300';
      case 'match': return 'text-orange-600 bg-orange-50 dark:bg-orange-900 dark:text-orange-300';
      case 'medical': return 'text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${getIconColor(activity.type)}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</span>
                <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">{activity.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivities;