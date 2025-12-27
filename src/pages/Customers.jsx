import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import { Search, Plus, User, Phone, ShoppingBag, Award } from 'lucide-react';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Dummy customer data
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
      totalPurchases: 15,
      totalSpent: 12500,
      loyaltyPoints: 1250,
      lastPurchase: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+91 98765 43211',
      email: 'jane.smith@example.com',
      totalPurchases: 8,
      totalSpent: 8500,
      loyaltyPoints: 850,
      lastPurchase: '2024-01-14',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      phone: '+91 98765 43212',
      email: 'mike.j@example.com',
      totalPurchases: 22,
      totalSpent: 24500,
      loyaltyPoints: 2450,
      lastPurchase: '2024-01-15',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      phone: '+91 98765 43213',
      email: 'sarah.w@example.com',
      totalPurchases: 5,
      totalSpent: 3200,
      loyaltyPoints: 320,
      lastPurchase: '2024-01-10',
    },
    {
      id: 5,
      name: 'David Brown',
      phone: '+91 98765 43214',
      email: 'david.b@example.com',
      totalPurchases: 12,
      totalSpent: 9800,
      loyaltyPoints: 980,
      lastPurchase: '2024-01-13',
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {value.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{value}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Phone className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{row.phone}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'totalPurchases',
      label: 'Purchases',
      render: (value) => (
        <div className="flex items-center gap-1">
          <ShoppingBag className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
        </div>
      ),
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (value) => (
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'loyaltyPoints',
      label: 'Loyalty Points',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {value.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: 'lastPurchase',
      label: 'Last Purchase',
      render: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCustomer(row)}
          >
            View History
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Customer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage customers, view purchase history, and track loyalty points
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </Button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {customers.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Points</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {customers.reduce((sum, c) => sum + c.loyaltyPoints, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Customer Table */}
      <Card>
        <Table columns={columns} data={filteredCustomers} />
      </Card>

      {/* Customer Details Modal (can be expanded) */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Purchase History - {selectedCustomer.name}
              </h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Purchase history details will be displayed here...
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Customers;

