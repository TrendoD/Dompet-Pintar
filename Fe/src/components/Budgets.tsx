import React, { useState } from 'react';
import { 
  PlusCircle, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Edit3,
  Trash2
} from 'lucide-react';
import { budgets as mockBudgets } from '../data/mockData';

const Budgets: React.FC = () => {
  const [showAddBudget, setShowAddBudget] = useState(false);

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'over-budget';
    if (percentage >= 90) return 'warning';
    if (percentage <= 50) return 'under-budget';
    return 'on-track';
  };

  const getBudgetColor = (category: string) => {
    switch (category) {
      case 'Food & Dining': return 'red';
      case 'Makanan & Kuliner': return 'red';
      case 'Transportation': return 'blue';
      case 'Transportasi': return 'blue';
      case 'Education': return 'indigo';
      case 'Pendidikan': return 'indigo';
      case 'Entertainment': return 'purple';
      case 'Hiburan': return 'purple';
      case 'Utilities & Others': return 'orange';
      case 'Utilitas & Lainnya': return 'orange';
      default: return 'gray';
    }
  };

  const budgets = mockBudgets.map(budget => ({
    ...budget,
    color: getBudgetColor(budget.category),
    status: getBudgetStatus(budget.spentAmount, budget.budgetAmount)
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'on-track':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', text: 'Sesuai Target' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50', text: 'Peringatan' };
      case 'over-budget':
        return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', text: 'Melebihi Anggaran' };
      case 'under-budget':
        return { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', text: 'Di Bawah Anggaran' };
      default:
        return { icon: Target, color: 'text-gray-500', bg: 'bg-gray-50', text: 'Tidak Diketahui' };
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'over-budget':
        return 'bg-red-500';
      case 'under-budget':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const onTrackBudgets = budgets.filter(b => b.status === 'on-track' || b.status === 'under-budget').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Anggaran</h1>
          <p className="text-gray-600 mt-1">Lacak dan kelola batas pengeluaran Anda berdasarkan kategori</p>
        </div>
        <button
          onClick={() => setShowAddBudget(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all mt-4 lg:mt-0"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Buat Anggaran</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Anggaran</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
            <Target className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Terpakai</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Anggaran Sesuai Target</p>
              <p className="text-2xl font-bold">{onTrackBudgets}/{budgets.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progress Anggaran Keseluruhan</h3>
          <span className="text-sm text-gray-500">Desember 2024</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
            </span>
            <span className="font-medium">
              {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                (totalSpent / totalBudget) > 0.9 ? 'bg-red-500' :
                (totalSpent / totalBudget) > 0.75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const StatusIcon = getStatusInfo(budget.status).icon;
          const statusInfo = getStatusInfo(budget.status);
          const progressPercentage = getProgressPercentage(budget.spentAmount, budget.budgetAmount);
          
          return (
            <div key={budget.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{budget.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{budget.category}</h3>
                    <p className="text-sm text-gray-500">Anggaran {budget.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{statusInfo.text}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit3 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(budget.spentAmount)}
                  </span>
                  <span className="text-sm text-gray-500">
                    of {formatCurrency(budget.budgetAmount)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(budget.status)}`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progressPercentage.toFixed(1)}% terpakai</span>
                    <span>
                      {budget.budgetAmount - budget.spentAmount > 0 
                        ? `${formatCurrency(budget.budgetAmount - budget.spentAmount)} tersisa`
                        : `${formatCurrency(budget.spentAmount - budget.budgetAmount)} melebihi anggaran`
                      }
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>1 Des - 31 Des</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.ceil((new Date('2024-12-31').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari tersisa
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Buat Anggaran Baru</h3>
              <button
                onClick={() => setShowAddBudget(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Pilih kategori</option>
                  <option>Makanan & Kuliner</option>
                  <option>Transportasi</option>
                  <option>Hiburan</option>
                  <option>Belanja</option>
                  <option>Kesehatan & Kebugaran</option>
                  <option>Utilitas</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Anggaran</label>
                <input
                  type="number"
                  placeholder="Masukkan jumlah"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Bulanan</option>
                  <option>Mingguan</option>
                  <option>Tahunan</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBudget(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Buat Anggaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;