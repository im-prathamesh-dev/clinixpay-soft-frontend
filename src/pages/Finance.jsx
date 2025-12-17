import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { DollarSign, TrendingUp, TrendingDown, Receipt, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Finance = () => {
  const [period, setPeriod] = useState('today');

  // Dummy finance data
  const financeStats = [
    {
      title: 'Total Sales',
      value: '₹12,450',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Total Expenses',
      value: '₹8,200',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'Net Profit',
      value: '₹4,250',
      change: '+28.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Profit Margin',
      value: '34.2%',
      change: '+3.1%',
      trend: 'up',
      icon: Receipt,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  const taxBreakup = [
    { type: 'CGST', amount: 1250, rate: 5 },
    { type: 'SGST', amount: 1250, rate: 5 },
    { type: 'IGST', amount: 850, rate: 12 },
    { type: 'Total GST', amount: 3350, rate: null },
  ];

  const expenseCategories = [
    { category: 'Purchase', amount: 6200, percentage: 75.6 },
    { category: 'Rent', amount: 1200, percentage: 14.6 },
    { category: 'Utilities', amount: 500, percentage: 6.1 },
    { category: 'Other', amount: 300, percentage: 3.7 },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Finance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track sales, expenses, profit, and tax summary
          </p>
        </div>
        <div className="flex gap-2">
          {['today', 'week', 'month'].map((p) => (
            <Button
              key={p}
              variant={period === p ? 'primary' : 'outline'}
              size="md"
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Finance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financeStats.map((stat, index) => {
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
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Summary */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Tax Summary
          </h2>
          <div className="space-y-3">
            {taxBreakup.map((tax, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === taxBreakup.length - 1
                    ? 'bg-primary/10 dark:bg-primary/20 border-2 border-primary'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div>
                  <p
                    className={`font-medium ${
                      index === taxBreakup.length - 1
                        ? 'text-primary'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {tax.type}
                  </p>
                  {tax.rate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rate: {tax.rate}%
                    </p>
                  )}
                </div>
                <span
                  className={`text-lg font-bold ${
                    index === taxBreakup.length - 1
                      ? 'text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  ₹{tax.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Expense Breakdown
          </h2>
          <div className="space-y-4">
            {expenseCategories.map((expense, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {expense.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    ₹{expense.amount.toLocaleString()} ({expense.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Profit & Loss Summary */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Profit & Loss Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₹12,450
            </p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ₹8,200
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500 dark:border-blue-600">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Net Profit
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₹4,250
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Finance;

