import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Download, TrendingUp, DollarSign, Receipt, BarChart3 } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  // Dummy report data
  const reportStats = [
    {
      title: 'Total Sales',
      value: '₹1,25,450',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Total Bills',
      value: '342',
      change: '+8.5%',
      trend: 'up',
      icon: Receipt,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Average Bill Value',
      value: '₹367',
      change: '+6.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Top Selling Product',
      value: 'Paracetamol',
      change: '120 units',
      trend: 'neutral',
      icon: BarChart3,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const salesData = [
    { date: '2024-01-01', sales: 12500, bills: 35 },
    { date: '2024-01-02', sales: 15200, bills: 42 },
    { date: '2024-01-03', sales: 13800, bills: 38 },
    { date: '2024-01-04', sales: 16800, bills: 45 },
    { date: '2024-01-05', sales: 14500, bills: 40 },
    { date: '2024-01-06', sales: 19200, bills: 52 },
    { date: '2024-01-07', sales: 17800, bills: 48 },
  ];

  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <div className="space-y-6 pb-20 lg:pb-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View detailed sales reports and analytics
          </p>
        </div>
        <Button  variant="primary"
          size="lg"
          className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <Button  variant="primary"
          size="md"
          className="flex items-center justify-center gap-2 whitespace-nowrap">
            <Calendar className="w-4 h-4 mr-2" />
            Apply Filter
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-soft-lg transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p
                      className={`text-sm font-medium ${
                        stat.trend === 'up'
                          ? 'text-green-600 dark:text-green-400'
                          : stat.trend === 'down'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sales Chart */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Sales Trend (Last 7 Days)
        </h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {salesData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative h-48">
                <div
                  className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary-dark cursor-pointer"
                  style={{ height: `${(item.sales / maxSales) * 100}%` }}
                  title={`${new Date(item.date).toLocaleDateString()}: ₹${item.sales.toLocaleString()} (${item.bills} bills)`}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                ₹{(item.sales / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-soft-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Sales Report
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed sales breakdown
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-soft-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Product Report
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Top selling products
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-soft-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Profit Report
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Profit & loss analysis
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

