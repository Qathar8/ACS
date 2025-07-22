import React from 'react';
import { BarChart3 } from 'lucide-react';

const PlayerPerformanceChart: React.FC = () => {
  const data = [
    { category: 'U9', players: 28, avgGoals: 1.2, avgAssists: 0.8 },
    { category: 'U10', players: 32, avgGoals: 1.5, avgAssists: 1.0 },
    { category: 'U12', players: 45, avgGoals: 2.1, avgAssists: 1.4 },
    { category: 'U15', players: 52, avgGoals: 2.8, avgAssists: 1.9 },
    { category: 'U20', players: 38, avgGoals: 3.2, avgAssists: 2.3 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance by Age Category</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average goals and assists per player this season</p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{item.category}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.players} players</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Goals: {item.avgGoals} • Assists: {item.avgAssists}
                </p>
              </div>
            </div>
            
            {/* Simple progress bars */}
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Goals</span>
                  <span>{item.avgGoals}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.avgGoals / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Assists</span>
                  <span>{item.avgAssists}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.avgAssists / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPerformanceChart;