import React, { useState } from 'react';
import { Plus, Calendar, Trophy, Users, MapPin, Clock, Filter, Download, Upload } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import AddMatchModal from '../components/AddMatchModal';

const MatchManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];
  const statuses = ['All', 'Scheduled', 'Live', 'Completed', 'Cancelled'];

  const matches = [
    {
      id: '1',
      homeTeam: 'Academy U15',
      awayTeam: 'Warriors FC',
      date: '2024-01-25',
      time: '15:00',
      venue: 'Academy Ground',
      competition: 'League',
      category: 'U15',
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      squad: [],
      stats: null
    },
    {
      id: '2',
      homeTeam: 'Lions FC',
      awayTeam: 'Academy U20',
      date: '2024-01-20',
      time: '16:30',
      venue: 'Lions Stadium',
      competition: 'Cup',
      category: 'U20',
      status: 'completed',
      homeScore: 1,
      awayScore: 3,
      squad: ['James Ochieng', 'Kevin Mwangi', 'Sarah Wanjiku'],
      stats: {
        goals: [
          { player: 'James Ochieng', minute: 23 },
          { player: 'Kevin Mwangi', minute: 45 },
          { player: 'Sarah Wanjiku', minute: 78 }
        ],
        cards: [
          { player: 'David Kipchoge', type: 'yellow', minute: 34 }
        ]
      }
    },
    {
      id: '3',
      homeTeam: 'Academy U12',
      awayTeam: 'Eagles Youth',
      date: '2024-01-22',
      time: '10:00',
      venue: 'Central Park',
      competition: 'Friendly',
      category: 'U12',
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      squad: [],
      stats: null
    }
  ];

  const filteredMatches = matches.filter(match => {
    const matchesCategory = selectedCategory === 'All' || match.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || match.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const upcomingMatches = matches.filter(m => m.status === 'scheduled').length;
  const completedMatches = matches.filter(m => m.status === 'completed').length;
  const totalGoals = matches.reduce((sum, match) => {
    if (match.homeScore !== null && match.awayScore !== null) {
      return sum + match.homeScore + match.awayScore;
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Match Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule fixtures, manage squads, and record match statistics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import Fixtures
          </button>
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Match
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{upcomingMatches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedMatches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Goals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalGoals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">75%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
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
        </div>
      </div>

      {/* Matches grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* Add Match Modal */}
      {showAddModal && (
        <AddMatchModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(matchData) => {
            console.log('Saving match:', matchData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MatchManagement;