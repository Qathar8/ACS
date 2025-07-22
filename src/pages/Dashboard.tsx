import React from 'react';
import { Users, Calendar, Trophy, TrendingUp, DollarSign, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RecentActivities from '../components/RecentActivities';
import UpcomingMatches from '../components/UpcomingMatches';
import PlayerPerformanceChart from '../components/PlayerPerformanceChart';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Players',
      value: '247',
      change: '+12',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Coaches',
      value: '18',
      change: '+2',
      changeType: 'increase' as const,
      icon: Users,
      color: 'green'
    },
    {
      title: 'This Month Training',
      value: '84',
      change: '+6',
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Matches Played',
      value: '32',
      change: '+4',
      changeType: 'increase' as const,
      icon: Trophy,
      color: 'orange'
    },
    {
      title: 'Revenue (USD)',
      value: '$24,500',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Medical Clearances',
      value: '234',
      change: '-2',
      changeType: 'decrease' as const,
      icon: Heart,
      color: 'red'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Medical Clearance Expiring',
      message: '5 players have medical clearances expiring this week',
      time: '2 hours ago'
    },
    {
      type: 'info',
      title: 'New Trial Session',
      message: 'U15 trial session scheduled for this Saturday',
      time: '4 hours ago'
    },
    {
      type: 'success',
      title: 'Payment Received',
      message: '$2,400 payment received from U12 group fees',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening at your academy.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />}
              {alert.type === 'info' && <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />}
              {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{alert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <RecentActivities />
        
        {/* Upcoming Matches */}
        <UpcomingMatches />
      </div>

      {/* Performance Chart */}
      <PlayerPerformanceChart />
    </div>
  );
};

export default Dashboard;