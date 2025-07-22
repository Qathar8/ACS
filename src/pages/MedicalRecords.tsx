import React, { useState } from 'react';
import { Plus, Search, Filter, Heart, AlertTriangle, CheckCircle, Calendar, FileText, Download } from 'lucide-react';
import MedicalRecordCard from '../components/MedicalRecordCard';
import AddMedicalRecordModal from '../components/AddMedicalRecordModal';

const MedicalRecords: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];
  const statuses = ['All', 'Cleared', 'Under Review', 'Requires Attention'];

  const medicalRecords = [
    {
      id: '1',
      playerId: '1',
      playerName: 'James Ochieng',
      category: 'U15',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      clearanceStatus: 'cleared',
      clearanceExpiry: '2024-08-15',
      lastCheckup: '2024-01-15',
      injuries: [
        { type: 'Ankle Sprain', date: '2023-12-10', status: 'recovered' }
      ],
      conditions: [],
      vaccinations: ['COVID-19', 'Tetanus'],
      emergencyContact: '+254 700 123 456'
    },
    {
      id: '2',
      playerId: '2',
      playerName: 'Kevin Mwangi',
      category: 'U12',
      photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      clearanceStatus: 'pending',
      clearanceExpiry: '2024-03-20',
      lastCheckup: '2023-11-20',
      injuries: [],
      conditions: ['Asthma'],
      vaccinations: ['COVID-19'],
      emergencyContact: '+254 722 345 678'
    },
    {
      id: '3',
      playerId: '3',
      playerName: 'Sarah Wanjiku',
      category: 'U20',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      clearanceStatus: 'cleared',
      clearanceExpiry: '2024-09-10',
      lastCheckup: '2024-01-10',
      injuries: [],
      conditions: [],
      vaccinations: ['COVID-19', 'Tetanus', 'Hepatitis B'],
      emergencyContact: '+254 733 567 890'
    }
  ];

  const filteredRecords = medicalRecords.filter(record => {
    const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Cleared' && record.clearanceStatus === 'cleared') ||
      (selectedStatus === 'Under Review' && record.clearanceStatus === 'pending') ||
      (selectedStatus === 'Requires Attention' && record.clearanceStatus === 'expired');
    const matchesSearch = record.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const clearedCount = medicalRecords.filter(r => r.clearanceStatus === 'cleared').length;
  const pendingCount = medicalRecords.filter(r => r.clearanceStatus === 'pending').length;
  const expiredCount = medicalRecords.filter(r => r.clearanceStatus === 'expired').length;
  const totalInjuries = medicalRecords.reduce((sum, r) => sum + r.injuries.length, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage player health records, injuries, and medical clearances</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export Records
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cleared</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clearedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{expiredCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Injuries</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalInjuries}</p>
            </div>
          </div>
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
                placeholder="Search players by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
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

      {/* Medical records grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRecords.map(record => (
          <MedicalRecordCard key={record.id} record={record} />
        ))}
      </div>

      {/* Add Medical Record Modal */}
      {showAddModal && (
        <AddMedicalRecordModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(recordData) => {
            console.log('Saving medical record:', recordData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MedicalRecords;