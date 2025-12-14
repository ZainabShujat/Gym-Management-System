'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { payments, members } from '@/data/mockData';
import toast from 'react-hot-toast';

export default function Payments() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);

  const handleRecordPayment = () => {
    toast.success('Payment recorded successfully!');
    setIsRecordPaymentModalOpen(false);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'Failed': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Payments" />
      
      <div className="p-4 lg:p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-2">Pending Amount</p>
            <p className="text-3xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString('en-IN')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-2">Completed</p>
            <p className="text-3xl font-bold text-primary">
              {payments.filter(p => p.status === 'Completed').length}
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-2">Failed</p>
            <p className="text-3xl font-bold text-red-600">
              {payments.filter(p => p.status === 'Failed').length}
            </p>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by member name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <Button onClick={() => setIsRecordPaymentModalOpen(true)}>+ Record Payment</Button>
            </div>
          </div>
        </Card>

        {/* Payments Table */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{payment.id}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.memberName}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.type}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadge(payment.status)}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button className="text-primary hover:text-primary/80">View</button>
                        {payment.status === 'Pending' && (
                          <button className="text-green-600 hover:text-green-700">Approve</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No payments found</p>
            </div>
          )}
        </Card>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <h3 className="text-lg font-bold mb-4">Recent Completed</h3>
            <div className="space-y-3">
              {payments
                .filter(p => p.status === 'Completed')
                .slice(0, 5)
                .map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.memberName}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <p className="font-bold text-green-600">₹{payment.amount.toLocaleString('en-IN')}</p>
                  </div>
                ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4">Pending Payments</h3>
            <div className="space-y-3">
              {payments
                .filter(p => p.status === 'Pending')
                .map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.memberName}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-600">₹{payment.amount.toLocaleString('en-IN')}</p>
                      <Button variant="success" className="text-xs mt-1 py-1">
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              {payments.filter(p => p.status === 'Pending').length === 0 && (
                <p className="text-gray-500 text-center py-4">No pending payments</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
