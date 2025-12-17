import React from 'react';
import Card from '../components/ui/Card';
import { TrendingUp, Receipt, AlertTriangle, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  // Dummy data
  const kpiData = [
    {
      title: 'Today Sales',
      value: '₹12,450',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Bills Today',
      value: '24',
      change: '+8.3%',
      trend: 'up',
      icon: Receipt,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Low Stock',
      value: '8',
      change: '-3',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      title: 'Expiry Alerts',
      value: '5',
      change: '+2',
      trend: 'up',
      icon: Calendar,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  const recentBills = [
    { id: '#BILL-001', customer: 'John Doe', amount: '₹1,250', time: '2 mins ago', status: 'paid' },
    { id: '#BILL-002', customer: 'Jane Smith', amount: '₹850', time: '15 mins ago', status: 'paid' },
    { id: '#BILL-003', customer: 'Mike Johnson', amount: '₹2,100', time: '32 mins ago', status: 'paid' },
    { id: '#BILL-004', customer: 'Sarah Williams', amount: '₹650', time: '1 hour ago', status: 'paid' },
    { id: '#BILL-005', customer: 'David Brown', amount: '₹1,800', time: '2 hours ago', status: 'paid' },
  ];

  // Simple sales chart data (last 7 days)
  const salesData = [
    { day: 'Mon', sales: 8500 },
    { day: 'Tue', sales: 10200 },
    { day: 'Wed', sales: 9800 },
    { day: 'Thu', sales: 12450 },
    { day: 'Fri', sales: 11200 },
    { day: 'Sat', sales: 15800 },
    { day: 'Sun', sales: 13200 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-soft-lg transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        kpi.trend === 'up'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">vs yesterday</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Sales Overview (Last 7 Days)
          </h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative h-48">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary-dark cursor-pointer"
                    style={{ height: `${(item.sales / maxSales) * 100}%` }}
                    title={`${item.day}: ₹${item.sales.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {item.day}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  ₹{(item.sales / 1000).toFixed(1)}k
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Bills */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Bills
          </h2>
          <div className="space-y-3">
            {recentBills.map((bill) => (
              <div
                key={bill.id}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {bill.id}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {bill.customer}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {bill.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {bill.time}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    {bill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
