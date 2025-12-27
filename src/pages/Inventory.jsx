import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import { Search, Plus, AlertTriangle, Calendar } from 'lucide-react';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy inventory data
  const inventoryData = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      batch: 'BATCH-001',
      expiry: '2025-12-31',
      stock: 150,
      mrp: 25,
      purchasePrice: 18,
      hsn: '30049090',
      status: 'in-stock',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      batch: 'BATCH-002',
      expiry: '2025-10-15',
      stock: 8,
      mrp: 45,
      purchasePrice: 32,
      hsn: '30041010',
      status: 'low-stock',
    },
    {
      id: 3,
      name: 'Cough Syrup 100ml',
      batch: 'BATCH-003',
      expiry: '2026-03-20',
      stock: 45,
      mrp: 120,
      purchasePrice: 85,
      hsn: '30049090',
      status: 'in-stock',
    },
    {
      id: 4,
      name: 'Bandage 5cm',
      batch: 'BATCH-004',
      expiry: '2027-01-01',
      stock: 200,
      mrp: 15,
      purchasePrice: 10,
      hsn: '30059090',
      status: 'in-stock',
    },
    {
      id: 5,
      name: 'Antibiotic Cream 30g',
      batch: 'BATCH-005',
      expiry: '2024-12-01',
      stock: 12,
      mrp: 85,
      purchasePrice: 60,
      hsn: '30042090',
      status: 'expired',
    },
    {
      id: 6,
      name: 'Vitamin D3 60k',
      batch: 'BATCH-006',
      expiry: '2025-11-20',
      stock: 5,
      mrp: 150,
      purchasePrice: 110,
      hsn: '30045000',
      status: 'expiring-soon',
    },
  ];

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  const isExpired = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  const getStockStatus = (item) => {
    if (isExpired(item.expiry)) return 'expired';
    if (isExpiringSoon(item.expiry)) return 'expiring-soon';
    if (item.stock < 20) return 'low-stock';
    return 'in-stock';
  };

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.hsn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = inventoryData.filter((item) => item.stock < 20).length;
  const expiryAlertsCount = inventoryData.filter(
    (item) => isExpiringSoon(item.expiry) || isExpired(item.expiry)
  ).length;

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">HSN: {row.hsn}</p>
        </div>
      ),
    },
    {
      key: 'batch',
      label: 'Batch',
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'expiry',
      label: 'Expiry Date',
      render: (value) => {
        const expiry = new Date(value);
        const isExp = isExpired(value);
        const isExpSoon = isExpiringSoon(value);
        return (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                isExp
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : isExpSoon
                  ? 'text-orange-600 dark:text-orange-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {expiry.toLocaleDateString()}
            </span>
            {isExp && (
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-medium">
                Expired
              </span>
            )}
            {isExpSoon && !isExp && (
              <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs font-medium">
                Expiring Soon
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (value, row) => {
        const status = getStockStatus(row);
        return (
          <div>
            <span
              className={`font-semibold ${
                status === 'low-stock' || status === 'expired' || status === 'expiring-soon'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {value}
            </span>
            {status === 'low-stock' && (
              <AlertTriangle className="w-4 h-4 text-orange-500 inline-block ml-1" />
            )}
          </div>
        );
      },
    },
    {
      key: 'mrp',
      label: 'MRP',
      render: (value) => (
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          ₹{value}
        </span>
      ),
    },
    {
      key: 'purchasePrice',
      label: 'Purchase Price',
      render: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">₹{value}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
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
            Inventory Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your stock, track expiry dates, and monitor low stock items
          </p>
        </div>
        <Button  variant="primary"
          size="md"
          className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {lowStockCount}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Expiry Alerts
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {expiryAlertsCount}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by product name, batch, or HSN code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md">
              Filter
            </Button>
            <Button variant="outline" size="md">
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <Table columns={columns} data={filteredData} />
      </Card>
    </div>
  );
};

export default Inventory;

