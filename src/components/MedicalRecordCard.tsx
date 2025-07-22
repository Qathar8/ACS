import React from 'react';
import { Calendar, Phone, AlertTriangle, CheckCircle, Clock, Heart, FileText } from 'lucide-react';

interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  category: string;
  photo: string;
  clearanceStatus: 'cleared' | 'pending' | 'expired';
  clearanceExpiry: string;
  lastCheckup: string;
  injuries: Array<{
    type: string;
    date: string;
    status: 'active' | 'recovering' | 'recovered';
  }>;
  conditions: string[];
  vaccinations: string[];
  emergencyContact: string;
}

interface MedicalRecordCardProps {
  record: MedicalRecord;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({ record }) => {
  const getStatusIcon = () => {
    switch (record.clearanceStatus) {
      case 'cleared': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (record.clearanceStatus) {
      case 'cleared': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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

  const isExpiringSoon = () => {
    const expiryDate = new Date(record.clearanceExpiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const activeInjuries = record.injuries.filter(injury => injury.status === 'active').length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={record.photo}
            alt={record.playerName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {record.playerName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(record.category)}`}>
                {record.category}
              </span>
            </div>
          </div>
        </div>

        {/* Status and expiry warning */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {record.clearanceStatus.charAt(0).toUpperCase() + record.clearanceStatus.slice(1)}
            </span>
          </div>
          {isExpiringSoon() && (
            <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-medium">Expiring Soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Medical Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Clearance expires: {formatDate(record.clearanceExpiry)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Last checkup: {formatDate(record.lastCheckup)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Emergency: {record.emergencyContact}</span>
        </div>

        {activeInjuries > 0 && (
          <div className="flex items-center text-sm text-red-600 dark:text-red-400">
            <Heart className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{activeInjuries} active injury(ies)</span>
          </div>
        )}
      </div>

      {/* Medical Summary */}
      <div className="px-6 pb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
          {record.conditions.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Conditions:</p>
              <div className="flex flex-wrap gap-1">
                {record.conditions.map((condition, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Vaccinations:</p>
            <div className="flex flex-wrap gap-1">
              {record.vaccinations.map((vaccination, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {vaccination}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            View Full Record
          </button>
          <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordCard;