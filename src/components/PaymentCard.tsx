import React from 'react';
import { Calendar, Phone, DollarSign, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Payment {
  id: string;
  playerId: string;
  playerName: string;
  category: string;
  photo: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string | null;
  guardian: string;
  phone: string;
}

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  const getStatusIcon = () => {
    switch (payment.status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (payment.status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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

  const getDaysOverdue = () => {
    if (payment.status !== 'overdue') return 0;
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    return Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={payment.photo}
            alt={payment.playerName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {payment.playerName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(payment.category)}`}>
                {payment.category}
              </span>
            </div>
          </div>
        </div>

        {/* Amount and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${payment.amount}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {payment.feeType}
        </p>
      </div>

      {/* Payment Details */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Due: {formatDate(payment.dueDate)}</span>
        </div>
        
        {payment.paidDate && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Paid: {formatDate(payment.paidDate)}</span>
          </div>
        )}

        {payment.paymentMethod && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CreditCard className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>via {payment.paymentMethod}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{payment.guardian}</span>
        </div>

        {payment.status === 'overdue' && (
          <div className="flex items-center text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{getDaysOverdue()} days overdue</span>
          </div>
        )}
      </div>

      {/* Guardian Contact */}
      <div className="px-6 pb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Guardian Contact:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{payment.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex space-x-2">
          {payment.status === 'paid' ? (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Receipt
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Send Receipt
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Record Payment
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                Send Reminder
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;