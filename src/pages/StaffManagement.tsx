import React, { useState } from 'react';
import { Plus, Search, Filter, Users, UserCog, Calendar, Phone, Download, Upload } from 'lucide-react';
import StaffCard from '../components/StaffCard';
import AddStaffModal from '../components/AddStaffModal';

const StaffManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = ['All', 'Coach', 'Assistant Coach', 'Physio', 'Admin', 'Groundskeeper'];
  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];

  const staff = [
    {
      id: '1',
      name: 'Michael Otieno',
      role: 'Head Coach',
      email: 'michael.otieno@academy.co.ke',
      phone: '+254 700 111 222',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      ageGroups: ['U15', 'U20'],
      specialization: 'Tactical Training',
      experience: '8 years',
      qualifications: ['UEFA B License', 'Sports Science Degree'],
      joinDate: '2020-03-15',
      status: 'active',
      availability: 'Full-time'
    },
    {
      id: '2',
      name: 'Sarah Wanjiku',
      role: 'Assistant Coach',
      email: 'sarah.wanjiku@academy.co.ke',
      phone: '+254 722 333 444',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      ageGroups: ['U12', 'U15'],
      specialization: 'Technical Skills',
      experience: '5 years',
      qualifications: ['CAF C License', 'First Aid Certified'],
      joinDate: '2021-08-20',
      status: 'active',
      availability: 'Part-time'
    },
    {
      id: '3',
      name: 'James Mwangi',
      role: 'Physio',
      email: 'james.mwangi@academy.co.ke',
      phone: '+254 733 555 666',
      photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      ageGroups: ['All'],
      specialization: 'Sports Medicine',
      experience: '10 years',
      qualifications: ['Physiotherapy Degree', 'Sports Medicine Cert'],
      joinDate: '2019-11-10',
      status: 'active',
      availability: 'Full-time'
    },
    {
      id: '4',
      name: 'Mary Njeri',
      role: 'Coach',
      email: 'mary.njeri@academy.co.ke',
      phone: '+254 744 777 888',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      ageGroups: ['U9', 'U10'],
      specialization: 'Youth Development',
      experience: '6 years',
      qualifications: ['CAF D License', 'Child Psychology Cert'],
      joinDate: '2022-01-05',
      status: 'active',
      availability: 'Full-time'
    }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesRole = selectedRole === 'All' || member.role.includes(selectedRole);
    const matchesCategory = selectedCategory === 'All' || 
      member.ageGroups.includes(selectedCategory) || 
      member.ageGroups.includes('All');
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesCategory && matchesSearch;
  });

  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const fullTimeStaff = staff.filter(s => s.availability === 'Full-time').length;
  const coaches = staff.filter(s => s.role.toLowerCase().includes('coach')).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage coaches, administrators, and support staff</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import Staff
          </button>
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalStaff}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <UserCog className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{activeStaff}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Full-time</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{fullTimeStaff}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <UserCog className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coaches</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{coaches}</p>
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
                placeholder="Search staff by name or role..."
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
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
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
      </div>

      {/* Staff grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map(member => (
          <StaffCard key={member.id} staff={member} />
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <AddStaffModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(staffData) => {
            console.log('Saving staff:', staffData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default StaffManagement;