import React from 'react';
import { Calendar, Phone, Mail, Users, Award, Clock, CheckCircle } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  photo: string;
  ageGroups: string[];
  specialization: string;
  experience: string;
  qualifications: string[];
  joinDate: string;
  status: 'active' | 'inactive';
  availability: 'Full-time' | 'Part-time';
}

interface StaffCardProps {
  staff: Staff;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const getRoleColor = () => {
    switch (staff.role.toLowerCase()) {
      case 'head coach': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'coach': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'assistant coach': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'physio': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'admin': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getAvailabilityColor = () => {
    return staff.availability === 'Full-time' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={staff.photo}
            alt={staff.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {staff.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor()}`}>
                {staff.role}
              </span>
              {staff.status === 'active' && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
        </div>

        {/* Availability and Experience */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor()}`}>
            {staff.availability}
          </span>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{staff.experience}</span>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{staff.email}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{staff.phone}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Joined: {formatDate(staff.joinDate)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Age Groups: {staff.ageGroups.join(', ')}</span>
        </div>
      </div>

      {/* Specialization and Qualifications */}
      <div className="px-6 pb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{staff.specialization}</p>
          </div>
          
          {staff.qualifications.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Qualifications:</p>
              <div className="flex flex-wrap gap-1">
                {staff.qualifications.map((qualification, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    <Award className="w-3 h-3 mr-1" />
                    {qualification}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
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

export default StaffCard;