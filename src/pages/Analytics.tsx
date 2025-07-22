import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Trophy, Target, Calendar, Filter, Download } from 'lucide-react';
import PerformanceChart from '../components/PerformanceChart';
import PlayerStatsTable from '../components/PlayerStatsTable';

const Analytics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('season');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];
  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'season', label: 'This Season' },
    { value: 'year', label: 'This Year' }
  ];

  const overallStats = [
    {
      title: 'Total Goals',
      value: '342',
      change: '+23',
      changeType: 'increase' as const,
      icon: Target,
      color: 'green'
    },
    {
      title: 'Total Assists',
      value: '198',
      change: '+15',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Matches Played',
      value: '156',
      change: '+8',
      changeType: 'increase' as const,
      icon: Trophy,
      color: 'orange'
    },
    {
      title: 'Win Rate',
      value: '68%',
      change: '+5%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const categoryPerformance = [
    { category: 'U9', players: 28, goals: 45, assists: 32, matches: 24, winRate: 62 },
    { category: 'U10', players: 32, goals: 58, assists: 41, matches: 28, winRate: 71 },
    { category: 'U12', players: 45, goals: 89, assists: 67, matches: 32, winRate: 75 },
    { category: 'U15', players: 52, goals: 98, assists: 72, matches: 36, winRate: 69 },
    { category: 'U20', players: 38, goals: 76, assists: 54, matches: 30, winRate: 73 }
  ];

  const topPerformers = [
    { name: 'James Ochieng', category: 'U15', goals: 18, assists: 12, rating: 4.8 },
    { name: 'Sarah Wanjiku', category: 'U20', goals: 2, assists: 15, rating: 4.7 },
    { name: 'Kevin Mwangi', category: 'U12', goals: 14, assists: 8, rating: 4.5 },
    { name: 'David Kipchoge', category: 'U9', goals: 8, assists: 6, rating: 4.3 },
    { name: 'Mary Njeri', category: 'U15', goals: 12, assists: 10, rating: 4.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track player performance, team statistics, and growth metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-300`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Category Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance by Age Category</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Players</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Goals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Assists</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Matches</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {categoryPerformance.map((category, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900 dark:text-white">{category.category}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{category.players}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{category.goals}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{category.assists}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{category.matches}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      category.winRate >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      category.winRate >= 60 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {category.winRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPerformers.map((player, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{player.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{player.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{player.goals}</p>
                  <p className="text-gray-600 dark:text-gray-400">Goals</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{player.assists}</p>
                  <p className="text-gray-600 dark:text-gray-400">Assists</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{player.rating}</p>
                  <p className="text-gray-600 dark:text-gray-400">Rating</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;