import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { monthlyData, expenseCategories, getCurrentMonthTotals, getSavingsRate } from '../data/mockData';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const currentMonthTotals = getCurrentMonthTotals();
  const savingsRate = getSavingsRate();

  // Calculate average monthly income and expenses
  const avgMonthlyIncome = monthlyData.reduce((sum, d) => sum + d.income, 0) / monthlyData.length;
  const avgMonthlyExpenses = monthlyData.reduce((sum, d) => sum + d.expenses, 0) / monthlyData.length;

  // Use imported category data
  const categoryData = expenseCategories;

  const kpiData = [
    {
      title: 'Average Monthly Income',
      value: `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(avgMonthlyIncome))}`,
      change: '+4.3%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Average Monthly Expenses',
      value: `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(avgMonthlyExpenses))}`,
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      change: '+2.5%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Largest Expense Category',
      value: 'Food & Dining',
      change: '32.5% of total',
      trend: 'neutral',
      icon: PieChart
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getMaxValue = () => {
    const allValues = monthlyData.flatMap(d => [d.income, d.expenses]);
    return Math.max(...allValues);
  };

  const maxValue = getMaxValue();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Deep insights into your financial patterns and trends</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <Icon className="h-6 w-6 text-teal-500" />
                </div>
                {kpi.trend !== 'neutral' && (
                  <div className={`flex items-center space-x-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{kpi.change}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                {kpi.trend === 'neutral' && (
                  <p className="text-sm text-gray-500 mt-1">{kpi.change}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Income vs Expenses Chart */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Income vs Expenses Trend</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'bar' 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'pie' 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                </button>
              </div>
            </div>

            {chartType === 'bar' ? (
              <div className="h-80">
                <div className="h-64 flex items-end justify-between space-x-4 mb-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                      <div className="w-full flex justify-center space-x-1">
                        <div
                          className="bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-sm transition-all hover:opacity-80"
                          style={{ 
                            height: `${(data.income / maxValue) * 200}px`,
                            width: '20px'
                          }}
                          title={`Income: ${formatCurrency(data.income)}`}
                        />
                        <div
                          className="bg-gradient-to-t from-red-500 to-pink-400 rounded-t-sm transition-all hover:opacity-80"
                          style={{ 
                            height: `${(data.expenses / maxValue) * 200}px`,
                            width: '20px'
                          }}
                          title={`Expenses: ${formatCurrency(data.expenses)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-4 text-sm text-gray-600">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="text-center">{data.month}</div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-emerald-400 rounded"></div>
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-400 rounded"></div>
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <div className="text-gray-500">Pie chart visualization would be implemented here</div>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h3>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-5 w-5 text-teal-500" />
              <h3 className="text-lg font-semibold text-gray-900">This Month Summary</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Income</span>
                <span className="font-semibold text-green-600">+{formatCurrency(currentMonthTotals.income)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses</span>
                <span className="font-semibold text-red-600">-{formatCurrency(currentMonthTotals.expenses)}</span>
              </div>
              <div className="border-t border-teal-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Net Savings</span>
                  <span className="font-bold text-teal-600">+{formatCurrency(currentMonthTotals.balance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Savings Rate',
              score: 75,
              description: `Good! You're saving ${savingsRate}% of your income.`,
              color: 'text-green-600',
              bgColor: 'bg-green-500'
            },
            {
              title: 'Expense Control',
              score: 80,
              description: 'Well managed expenses for a student budget.',
              color: 'text-green-600',
              bgColor: 'bg-green-500'
            },
            {
              title: 'Budget Adherence',
              score: 85,
              description: 'Great job staying within your budget limits!',
              color: 'text-green-600',
              bgColor: 'bg-green-500'
            }
          ].map((metric, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${metric.score}, 100`}
                    className={metric.color}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{metric.score}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{metric.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;