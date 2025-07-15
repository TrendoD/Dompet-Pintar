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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Bulan Ini');
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
      title: 'Rata-rata Pendapatan Bulanan',
      value: `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(avgMonthlyIncome))}`,
      change: '+4.3%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Rata-rata Pengeluaran Bulanan',
      value: `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(avgMonthlyExpenses))}`,
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown
    },
    {
      title: 'Tingkat Tabungan',
      value: `${savingsRate}%`,
      change: '+2.5%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Kategori Pengeluaran Terbesar',
      value: 'Makanan & Minum',
      change: '32.5% dari total',
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analitik</h1>
          <p className="text-gray-600 mt-1">Wawasan mendalam tentang pola dan tren keuangan Anda</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>Bulan Ini</option>
            <option>3 Bulan Terakhir</option>
            <option>6 Bulan Terakhir</option>
            <option>Tahun Ini</option>
          </select>
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Ekspor Laporan</span>
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
              <h3 className="text-lg font-semibold text-gray-900">Tren Pendapatan vs Pengeluaran</h3>
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
              <ResponsiveContainer width="100%" height={320}>
                <BarChart 
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="income" name="Pendapatan" fill="#14b8a6" />
                  <Bar dataKey="expenses" name="Pengeluaran" fill="#f43f5e" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <div className="text-gray-500">Visualisasi diagram lingkaran akan diimplementasikan di sini</div>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Kategori Pengeluaran</h3>
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
              <h3 className="text-lg font-semibold text-gray-900">Ringkasan Bulan Ini</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pendapatan</span>
                <span className="font-semibold text-green-600">+{formatCurrency(currentMonthTotals.income)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pengeluaran</span>
                <span className="font-semibold text-red-600">-{formatCurrency(currentMonthTotals.expenses)}</span>
              </div>
              <div className="border-t border-teal-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Tabungan Bersih</span>
                  <span className="font-bold text-teal-600">+{formatCurrency(currentMonthTotals.balance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Skor Kesehatan Keuangan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Tingkat Tabungan',
              score: 75,
              description: `Bagus! Anda menabung ${savingsRate}% dari pendapatan.`,
              color: 'text-green-600',
              bgColor: 'bg-green-500'
            },
            {
              title: 'Kontrol Pengeluaran',
              score: 80,
              description: 'Pengeluaran terkelola dengan baik untuk anggaran mahasiswa.',
              color: 'text-green-600',
              bgColor: 'bg-green-500'
            },
            {
              title: 'Ketaatan Anggaran',
              score: 85,
              description: 'Kerja bagus dalam menjaga batas anggaran Anda!',
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