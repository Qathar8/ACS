import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import TrainingSessionCard from '../components/TrainingSessionCard';
import AddTrainingModal from '../components/AddTrainingModal';

const TrainingManagement: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];

  // Sample training sessions
  const trainingSessions = [
    {
      id: '1',
      title: 'Technical Skills Training',
      category: 'U15',
      coach: 'Coach Michael',
      date: '2024-01-20',
      time: '15:00-17:00',
      location: 'Main Field',
      focus: 'Dribbling & Ball Control',
      attendees: 18,
      maxAttendees: 20,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Tactical Training',
      category: 'U20',
      coach: 'Coach Sarah',
      date: '2024-01-21',
      time: '16:00-18:00',
      location: 'Training Ground A',
      focus: 'Formation & Positioning',
      attendees: 22,
      maxAttendees: 25,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Physical Conditioning',
      category: 'U12',
      coach: 'Coach James',
      date: '2024-01-22',
      time: '10:00-11:30',
      location: 'Fitness Center',
      focus: 'Stamina & Agility',
      attendees: 0,
      maxAttendees: 15,
      status: 'scheduled'
    }
  ];

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return trainingSessions.filter(session => {
      const matchesDate = session.date === dateStr;
      const matchesCategory = selectedCategory === 'All' || session.category === selectedCategory;
      return matchesDate && matchesCategory;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and manage training sessions for all age groups</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Session
          </button>
        </div>
      </div>

      {/* Calendar navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Week view */}
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[200px] ${
                isToday(date) ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <div className="text-center mb-4">
                <p className={`text-sm font-medium ${isToday(date) ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                  {formatDate(date)}
                </p>
                <p className={`text-lg font-bold ${isToday(date) ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'}`}>
                  {date.getDate()}
                </p>
              </div>

              <div className="space-y-2">
                {getSessionsForDate(date).map(session => (
                  <div
                    key={session.id}
                    className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {session.time}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {session.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training sessions list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trainingSessions
            .filter(session => selectedCategory === 'All' || session.category === selectedCategory)
            .map(session => (
              <TrainingSessionCard key={session.id} session={session} />
            ))}
        </div>
      </div>

      {/* Add Training Modal */}
      {showAddModal && (
        <AddTrainingModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(sessionData) => {
            console.log('Saving session:', sessionData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TrainingManagement;