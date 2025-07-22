import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Upload, User, Calendar, MapPin, Phone, FileText } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerModal';

const PlayerManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];

  const players = [
    {
      id: '1',
      name: 'James Ochieng',
      age: 14,
      category: 'U15',
      position: 'Forward',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'Mary Ochieng',
      phone: '+254 700 123 456',
      joinDate: '2023-08-15',
      goals: 12,
      assists: 8,
      matches: 18,
      rating: 4.2,
      medicalStatus: 'cleared',
      feeStatus: 'paid'
    },
    {
      id: '2',
      name: 'Kevin Mwangi',
      age: 11,
      category: 'U12',
      position: 'Midfielder',
      photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'Peter Mwangi',
      phone: '+254 722 345 678',
      joinDate: '2023-09-20',
      goals: 6,
      assists: 14,
      matches: 16,
      rating: 3.9,
      medicalStatus: 'pending',
      feeStatus: 'overdue'
    },
    {
      id: '3',
      name: 'Sarah Wanjiku',
      age: 16,
      category: 'U20',
      position: 'Goalkeeper',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'Jane Wanjiku',
      phone: '+254 733 567 890',
      joinDate: '2023-07-10',
      goals: 0,
      assists: 2,
      matches: 20,
      rating: 4.7,
      medicalStatus: 'cleared',
      feeStatus: 'paid'
    },
    {
      id: '4',
      name: 'David Kipchoge',
      age: 9,
      category: 'U9',
      position: 'Defender',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      guardian: 'Ruth Kipchoge',
      phone: '+254 744 789 012',
      joinDate: '2023-10-05',
      goals: 2,
      assists: 3,
      matches: 12,
      rating: 3.5,
      medicalStatus: 'cleared',
      feeStatus: 'paid'
    }
  ];

  const filteredPlayers = players.filter(player => {
    const matchesCategory = selectedCategory === 'All' || player.category === selectedCategory;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Player Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage player profiles, registration, and performance data</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import Excel
          </button>
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Player
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players by name or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category filter */}
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
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredPlayers.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Players</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredPlayers.filter(p => p.medicalStatus === 'cleared').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Medical Cleared</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredPlayers.filter(p => p.feeStatus === 'paid').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Fees Paid</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {filteredPlayers.reduce((sum, p) => sum + p.goals, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
          </div>
        </div>
      </div>

      {/* Players grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No players found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first player'
            }
          </p>
          {(!searchTerm && selectedCategory === 'All') && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Player
            </button>
          )}
        </div>
      )}

      {/* Add Player Modal */}
      {showAddModal && (
        <PlayerModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(playerData) => {
            console.log('Saving player:', playerData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PlayerManagement;