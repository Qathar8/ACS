import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const PerformanceChart: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', goals: 28, assists: 18, matches: 12 },
    { month: 'Feb', goals: 32, assists: 22, matches: 14 },
    { month: 'Mar', goals: 45, assists: 31, matches: 16 },
    { month: 'Apr', goals: 38, assists: 28, matches: 15 },
    { month: 'May', goals: 52, assists: 35, matches: 18 },
    { month: 'Jun', goals: 41, assists: 29, matches: 16 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.goals, d.assists, d.matches * 3)));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Monthly goals, assists, and match statistics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Goals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Assists</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Matches</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <div className="flex items-end justify-between h-full space-x-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center space-x-1 mb-2" style={{ height: '240px' }}>
                {/* Goals bar */}
                <div className="relative group">
                  <div 
                    className="w-6 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                    style={{ height: `${(data.goals / maxValue) * 240}px` }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.goals} goals
                  </div>
                </div>
                
                {/* Assists bar */}
                <div className="relative group">
                  <div 
                    className="w-6 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(data.assists / maxValue) * 240}px` }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.assists} assists
                  </div>
                </div>
                
                {/* Matches bar (scaled) */}
                <div className="relative group">
                  <div 
                    className="w-6 bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600"
                    style={{ height: `${((data.matches * 3) / maxValue) * 240}px` }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.matches} matches
                  </div>
                </div>
              </div>
              
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {monthlyData.reduce((sum, d) => sum + d.goals, 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {monthlyData.reduce((sum, d) => sum + d.assists, 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Assists</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {monthlyData.reduce((sum, d) => sum + d.matches, 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Matches</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;