import React from 'react';
import { Phone, Calendar, MapPin, Star, CheckCircle, Clock, User } from 'lucide-react';

interface Trialist {
  id: string;
  name: string;
  age: number;
  category: string;
  position: string;
  photo: string;
  guardian: string;
  phone: string;
  trialDate: string;
  eventId: string;
  status: 'registered' | 'evaluated' | 'accepted' | 'rejected';
  evaluation: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
    overall: number;
    recommendation: 'Accept' | 'Reject' | 'Review';
  } | null;
  previousClub: string;
  notes: string;
}

interface TrialistCardProps {
  trialist: Trialist;
}

const TrialistCard: React.FC<TrialistCardProps> = ({ trialist }) => {
  const getStatusIcon = () => {
    switch (trialist.status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <CheckCircle className="w-4 h-4 text-red-500" />;
      case 'evaluated': return <Star className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (trialist.status) {
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'evaluated': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
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
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getOverallRating = () => {
    if (!trialist.evaluation) return null;
    const rating = trialist.evaluation.overall;
    if (rating >= 8) return { color: 'text-green-600 dark:text-green-400', label: 'Excellent' };
    if (rating >= 6) return { color: 'text-orange-600 dark:text-orange-400', label: 'Good' };
    return { color: 'text-red-600 dark:text-red-400', label: 'Needs Work' };
  };

  const overallRating = getOverallRating();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={trialist.photo}
            alt={trialist.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {trialist.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {trialist.position} • Age {trialist.age}
            </p>
          </div>
        </div>

        {/* Category and Status */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(trialist.category)}`}>
            {trialist.category}
          </span>
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {trialist.status.charAt(0).toUpperCase() + trialist.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Trialist Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Trial: {formatDate(trialist.trialDate)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{trialist.guardian}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <User className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Previous: {trialist.previousClub}</span>
        </div>
      </div>

      {/* Evaluation (if available) */}
      {trialist.evaluation && (
        <div className="px-6 pb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Evaluation Scores:</p>
              {overallRating && (
                <span className={`text-sm font-semibold ${overallRating.color}`}>
                  {trialist.evaluation.overall}/10 - {overallRating.label}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Technical:</span>
                <span className="font-medium text-gray-900 dark:text-white">{trialist.evaluation.technical}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Physical:</span>
                <span className="font-medium text-gray-900 dark:text-white">{trialist.evaluation.physical}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tactical:</span>
                <span className="font-medium text-gray-900 dark:text-white">{trialist.evaluation.tactical}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Mental:</span>
                <span className="font-medium text-gray-900 dark:text-white">{trialist.evaluation.mental}/10</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Recommendation:</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  trialist.evaluation.recommendation === 'Accept' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  trialist.evaluation.recommendation === 'Reject' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                }`}>
                  {trialist.evaluation.recommendation}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {trialist.notes && (
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            "{trialist.notes}"
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          {trialist.status === 'registered' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Evaluate
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Contact
              </button>
            </>
          ) : trialist.status === 'evaluated' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Make Decision
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Re-evaluate
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Profile
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Contact Guardian
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialistCard;