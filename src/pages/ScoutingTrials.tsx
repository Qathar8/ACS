import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Users, Star, Download, Upload, MapPin, Clock } from 'lucide-react';
import TrialEventCard from '../components/TrialEventCard';
import AddTrialModal from '../components/AddTrialModal';
import TrialistCard from '../components/TrialistCard';

const ScoutingTrials: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'trialists'>('events');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];
  const statuses = ['All', 'Scheduled', 'Completed', 'Cancelled'];

  const trialEvents = [
    {
      id: '1',
      title: 'U15 Open Trials',
      category: 'U15',
      date: '2024-02-10',
      time: '09:00-12:00',
      location: 'Academy Ground',
      maxParticipants: 30,
      registeredCount: 18,
      status: 'scheduled',
      description: 'Open trials for U15 age category. Focus on technical skills and tactical awareness.',
      requirements: ['Birth certificate', 'Medical clearance', 'Guardian consent'],
      scouts: ['Coach Michael', 'Coach Sarah']
    },
    {
      id: '2',
      title: 'U12 Talent Search',
      category: 'U12',
      date: '2024-01-28',
      time: '14:00-17:00',
      location: 'Training Ground A',
      maxParticipants: 25,
      registeredCount: 25,
      status: 'completed',
      description: 'Talent identification program for promising U12 players.',
      requirements: ['Birth certificate', 'Medical clearance'],
      scouts: ['Coach James', 'Coach Mary']
    },
    {
      id: '3',
      title: 'U20 Elite Selection',
      category: 'U20',
      date: '2024-02-15',
      time: '16:00-19:00',
      location: 'Main Field',
      maxParticipants: 20,
      registeredCount: 12,
      status: 'scheduled',
      description: 'Elite level trials for U20 category with focus on match readiness.',
      requirements: ['Birth certificate', 'Medical clearance', 'Previous club records'],
      scouts: ['Coach Michael', 'External Scout']
    }
  ];

  const trialists = [
    {
      id: '1',
      name: 'Peter Kamau',
      age: 14,
      category: 'U15',
      position: 'Midfielder',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'Grace Kamau',
      phone: '+254 700 999 888',
      trialDate: '2024-02-10',
      eventId: '1',
      status: 'registered',
      evaluation: null,
      previousClub: 'Lions Youth FC',
      notes: 'Strong technical skills, good vision'
    },
    {
      id: '2',
      name: 'Alice Wanjiru',
      age: 11,
      category: 'U12',
      position: 'Forward',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'John Wanjiru',
      phone: '+254 722 777 666',
      trialDate: '2024-01-28',
      eventId: '2',
      status: 'evaluated',
      evaluation: {
        technical: 8,
        physical: 7,
        tactical: 6,
        mental: 8,
        overall: 7.5,
        recommendation: 'Accept'
      },
      previousClub: 'None',
      notes: 'Natural goal scorer, needs tactical development'
    }
  ];

  const filteredEvents = trialEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const filteredTrialists = trialists.filter(trialist => {
    const matchesCategory = selectedCategory === 'All' || trialist.category === selectedCategory;
    return matchesCategory;
  });

  const upcomingEvents = trialEvents.filter(e => e.status === 'scheduled').length;
  const totalTrialists = trialists.length;
  const evaluatedTrialists = trialists.filter(t => t.status === 'evaluated').length;
  const acceptedTrialists = trialists.filter(t => t.evaluation?.recommendation === 'Accept').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Scouting & Trials</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize trial events and evaluate potential recruits</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import Trialists
          </button>
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'events' ? 'Add Trial Event' : 'Add Trialist'}
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Events</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Trialists</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTrialists}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <Star className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Evaluated</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{evaluatedTrialists}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{acceptedTrialists}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Trial Events
            </button>
            <button
              onClick={() => setActiveTab('trialists')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trialists'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Trialists
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {activeTab === 'events' && (
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'events' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <TrialEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrialists.map(trialist => (
                <TrialistCard key={trialist.id} trialist={trialist} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Trial Modal */}
      {showAddModal && (
        <AddTrialModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          type={activeTab}
          onSave={(data) => {
            console.log('Saving:', data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ScoutingTrials;