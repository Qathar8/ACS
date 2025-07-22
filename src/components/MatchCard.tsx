import React from 'react';
import { Calendar, Clock, MapPin, Trophy, Users, Target, Star } from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  category: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  homeScore: number | null;
  awayScore: number | null;
  squad: string[];
  stats: any;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const getStatusColor = () => {
    switch (match.status) {
      case 'live': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getCompetitionColor = () => {
    switch (match.competition) {
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor()}`}>
            {match.competition}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{match.category}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <p className="font-semibold text-gray-900 dark:text-white text-lg">{match.homeTeam}</p>
          </div>
          
          <div className="px-6">
            {match.status === 'completed' && match.homeScore !== null && match.awayScore !== null ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">FT</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600 dark:text-gray-400">VS</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {match.status === 'live' ? 'LIVE' : formatDate(match.date)}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center">
            <p className="font-semibold text-gray-900 dark:text-white text-lg">{match.awayTeam}</p>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="px-6 pb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{formatDate(match.date)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{match.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{match.venue}</span>
        </div>

        {match.squad.length > 0 && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{match.squad.length} players selected</span>
          </div>
        )}
      </div>

      {/* Match Stats (for completed matches) */}
      {match.status === 'completed' && match.stats && (
        <div className="px-6 pb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Target className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-400">Goals: {match.stats.goals?.length || 0}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-400">Cards: {match.stats.cards?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          {match.status === 'scheduled' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Select Squad
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Edit Match
              </button>
            </>
          ) : match.status === 'live' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                Live Updates
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Record Stats
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Report
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Export
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;