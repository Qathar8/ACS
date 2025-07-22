import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface TrialEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  description: string;
  requirements: string[];
  scouts: string[];
}

interface TrialEventCardProps {
  event: TrialEvent;
}

const TrialEventCard: React.FC<TrialEventCardProps> = ({ event }) => {
  const getStatusIcon = () => {
    switch (event.status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (event.status) {
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
      day: 'numeric',
      year: 'numeric'
    });
  };

  const registrationRate = (event.registeredCount / event.maxParticipants) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Registration Progress */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            <span>Registration</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {event.registeredCount}/{event.maxParticipants}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              registrationRate >= 80 ? 'bg-red-600' : 
              registrationRate >= 60 ? 'bg-orange-600' : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(registrationRate, 100)}%` }}
          />
        </div>
      </div>

      {/* Requirements and Scouts */}
      <div className="px-6 pb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Requirements:</p>
            <div className="flex flex-wrap gap-1">
              {event.requirements.map((req, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <FileText className="w-3 h-3 mr-1" />
                  {req}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Scouts:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{event.scouts.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          {event.status === 'scheduled' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Manage Registration
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Edit Event
              </button>
            </>
          ) : event.status === 'completed' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Results
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Export Report
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Reschedule
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialEventCard;