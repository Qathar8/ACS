import React from 'react';
import { Calendar, Clock, MapPin, Users, User, CheckCircle, AlertCircle } from 'lucide-react';

interface TrainingSession {
  id: string;
  title: string;
  category: string;
  coach: string;
  date: string;
  time: string;
  location: string;
  focus: string;
  attendees: number;
  maxAttendees: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard: React.FC<TrainingSessionCardProps> = ({ session }) => {
  const getStatusIcon = () => {
    switch (session.status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (session.status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'U9': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'U10': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'U12': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'U15': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'U20': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const attendanceRate = (session.attendees / session.maxAttendees) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
            {session.category}
          </span>
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {session.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {session.focus}
        </p>
      </div>

      {/* Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{formatDate(session.date)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{session.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{session.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <User className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{session.coach}</span>
        </div>
      </div>

      {/* Attendance */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            <span>Attendance</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {session.attendees}/{session.maxAttendees}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              attendanceRate >= 80 ? 'bg-green-600' : 
              attendanceRate >= 60 ? 'bg-orange-600' : 'bg-red-600'
            }`}
            style={{ width: `${Math.min(attendanceRate, 100)}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            {session.status === 'scheduled' ? 'Take Attendance' : 'View Details'}
          </button>
          <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingSessionCard;