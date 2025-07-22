import React from 'react';
import { Calendar, MapPin, Phone, Trophy, Target, Star, Heart, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  age: number;
  category: string;
  position: string;
  photo: string;
  guardian: string;
  phone: string;
  joinDate: string;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
  medicalStatus: 'cleared' | 'pending' | 'expired';
  feeStatus: 'paid' | 'overdue' | 'pending';
}

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const getMedicalStatusIcon = () => {
    switch (player.medicalStatus) {
      case 'cleared': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getFeeStatusColor = () => {
    switch (player.feeStatus) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getCategoryColor = () => {
    const colors = {
      'U9': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'U10': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'U12': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'U15': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'U20': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[player.category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header with photo and basic info */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4">
          <img
            src={player.photo}
            alt={player.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {player.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {player.position} • Age {player.age}
            </p>
          </div>
        </div>

        {/* Category and status badges */}
        <div className="flex items-center justify-between mt-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
            {player.category}
          </span>
          <div className="flex items-center space-x-2">
            {getMedicalStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFeeStatusColor()}`}>
              {player.feeStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{player.goals}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Goals</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{player.assists}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Assists</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-4 h-4 text-green-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{player.rating}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="px-6 pb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{player.guardian}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Joined {new Date(player.joinDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            View Profile
          </button>
          <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;