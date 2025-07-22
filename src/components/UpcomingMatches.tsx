import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const UpcomingMatches: React.FC = () => {
  const matches = [
    {
      id: 1,
      homeTeam: 'Academy U15',
      awayTeam: 'Warriors FC',
      date: '2024-01-20',
      time: '15:00',
      venue: 'Academy Ground',
      type: 'League',
      homeScore: null,
      awayScore: null
    },
    {
      id: 2,
      homeTeam: 'Academy U12',
      awayTeam: 'Eagles Youth',
      date: '2024-01-22',
      time: '10:00',
      venue: 'Central Park',
      type: 'Friendly',
      homeScore: null,
      awayScore: null
    },
    {
      id: 3,
      homeTeam: 'Lions FC',
      awayTeam: 'Academy U20',
      date: '2024-01-25',
      time: '16:30',
      venue: 'Lions Stadium',
      type: 'Cup',
      homeScore: null,
      awayScore: null
    }
  ];

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'League': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Cup': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Friendly': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Matches</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchTypeColor(match.type)}`}>
                {match.type}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(match.date)}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 text-center">
                <p className="font-medium text-gray-900 dark:text-white">{match.homeTeam}</p>
              </div>
              <div className="px-4">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">VS</span>
              </div>
              <div className="flex-1 text-center">
                <p className="font-medium text-gray-900 dark:text-white">{match.awayTeam}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {match.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {match.venue}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
        View all matches
      </button>
    </div>
  );
};

export default UpcomingMatches;