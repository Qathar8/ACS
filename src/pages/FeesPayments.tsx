import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, Calendar, Download, Upload, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
import PaymentCard from '../components/PaymentCard';
import AddPaymentModal from '../components/AddPaymentModal';

const FeesPayments: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'U9', 'U10', 'U12', 'U15', 'U20'];
  const statuses = ['All', 'Paid', 'Pending', 'Overdue'];

  const payments = [
    {
      id: '1',
      playerId: '1',
      playerName: 'James Ochieng',
      category: 'U15',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      feeType: 'Monthly Training',
      amount: 50,
      dueDate: '2024-01-31',
      paidDate: '2024-01-28',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      guardian: 'Mary Ochieng',
      phone: '+254 700 123 456'
    },
    {
      id: '2',
      playerId: '2',
      playerName: 'Kevin Mwangi',
      category: 'U12',
      photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      feeType: 'Monthly Training',
      amount: 40,
      dueDate: '2024-01-31',
      paidDate: null,
      status: 'overdue',
      paymentMethod: null,
      guardian: 'Peter Mwangi',
      phone: '+254 722 345 678'
    },
    {
      id: '3',
      playerId: '3',
      playerName: 'Sarah Wanjiku',
      category: 'U20',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      feeType: 'Tournament Fee',
      amount: 75,
      dueDate: '2024-02-15',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      guardian: 'Jane Wanjiku',
      phone: '+254 733 567 890'
    },
    {
      id: '4',
      playerId: '4',
      playerName: 'David Kipchoge',
      category: 'U9',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      feeType: 'Registration Fee',
      amount: 30,
      dueDate: '2024-02-10',
      paidDate: '2024-01-25',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      guardian: 'Ruth Kipchoge',
      phone: '+254 744 789 012'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesCategory = selectedCategory === 'All' || payment.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || payment.status === selectedStatus;
    const matchesSearch = payment.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter(p => p.status === 'paid').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fees & Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">Track academy fees, payments, and financial reports in USD</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import Payments
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
            Record Payment
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalRevenue}</p>
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
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${pendingAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${overdueAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid This Month</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{paidCount}</p>
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
                placeholder="Search by player or guardian name..."
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

      {/* Payments grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPayments.map(payment => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <AddPaymentModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(paymentData) => {
            console.log('Saving payment:', paymentData);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default FeesPayments;