import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Trophy, 
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { goals as mockGoals } from '../data/mockData';

const Goals: React.FC = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getGoalStatus = (current: number, target: number, targetDate: string) => {
    const percentage = (current / target) * 100;
    const daysRemaining = Math.ceil((new Date(targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (percentage >= 95) return 'almost-complete';
    if (percentage >= 80 && daysRemaining > 30) return 'ahead';
    if (percentage < 50 && daysRemaining < 60) return 'behind';
    return 'on-track';
  };

  const getGoalColor = (category: string) => {
    switch (category) {
      case 'Emergency': 
      case 'Dana Darurat': return 'red';
      case 'Travel': 
      case 'Liburan': return 'blue';
      case 'Education': 
      case 'Pendidikan': return 'indigo';
      case 'Others': 
      case 'Lainnya': return 'gray';
      case 'Transportation':
      case 'Transportasi': return 'yellow';
      case 'Investment':
      case 'Investasi': return 'green';
      case 'Home':
      case 'Rumah': return 'purple';
      default: return 'teal';
    }
  };

  const goals = mockGoals.map(goal => ({
    ...goal,
    color: getGoalColor(goal.category),
    status: getGoalStatus(goal.currentAmount, goal.targetAmount, goal.targetDate)
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'on-track':
        return { icon: Target, color: 'text-blue-500', bg: 'bg-blue-50', text: 'Sesuai Target' };
      case 'ahead':
        return { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', text: 'Lebih Cepat' };
      case 'behind':
        return { icon: Clock, color: 'text-red-500', bg: 'bg-red-50', text: 'Terlambat' };
      case 'almost-complete':
        return { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', text: 'Hampir Selesai' };
      default:
        return { icon: Target, color: 'text-gray-500', bg: 'bg-gray-50', text: 'Tidak Diketahui' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(g => g.status === 'almost-complete').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Target Keuangan</h1>
          <p className="text-gray-600 mt-1">Pantau kemajuan Anda dalam mencapai tujuan keuangan</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all mt-4 lg:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Target Baru</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Target Keuangan</p>
              <p className="text-2xl font-bold">{formatCurrency(totalGoalAmount)}</p>
            </div>
            <Target className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Terkumpul</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSaved)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Target Tercapai</p>
              <p className="text-2xl font-bold">{completedGoals}/{goals.length}</p>
            </div>
            <Trophy className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Kemajuan Keseluruhan</h3>
          <span className="text-sm text-gray-500">
            {((totalSaved / totalGoalAmount) * 100).toFixed(1)}% Selesai
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {formatCurrency(totalSaved)} of {formatCurrency(totalGoalAmount)}
            </span>
            <span className="font-medium">
              {formatCurrency(totalGoalAmount - totalSaved)} tersisa
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(totalSaved / totalGoalAmount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const StatusIcon = getStatusInfo(goal.status).icon;
          const statusInfo = getStatusInfo(goal.status);
          const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          
          return (
            <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{goal.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    Prioritas {goal.priority === 'high' ? 'Tinggi' : goal.priority === 'medium' ? 'Sedang' : 'Rendah'}
                  </span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{statusInfo.text}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                  <span className="text-sm text-gray-500">
                    of {formatCurrency(goal.targetAmount)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progressPercentage.toFixed(1)}% tercapai</span>
                    <span>{formatCurrency(goal.targetAmount - goal.currentAmount)} lagi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className={`text-sm font-medium ${
                    daysRemaining < 30 ? 'text-red-600' : 
                    daysRemaining < 90 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {daysRemaining > 0 ? `${daysRemaining} hari lagi` : 'Terlambat'}
                  </div>
                </div>

                {goal.status === 'almost-complete' && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-800">
                        Hampir sampai! Tinggal {formatCurrency(goal.targetAmount - goal.currentAmount)} lagi. Terus semangat!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Buat Target Baru</h3>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Target</label>
                <input
                  type="text"
                  placeholder="Masukkan judul target"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  placeholder="Deskripsikan target Anda"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Target</label>
                <input
                  type="number"
                  placeholder="Masukkan jumlah target"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Saat Ini</label>
                <input
                  type="number"
                  placeholder="Masukkan jumlah yang sudah terkumpul"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Target</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Pilih kategori</option>
                  <option>Dana Darurat</option>
                  <option>Liburan</option>
                  <option>Transportasi</option>
                  <option>Investasi</option>
                  <option>Rumah</option>
                  <option>Pendidikan</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioritas</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Tinggi</option>
                  <option>Sedang</option>
                  <option>Rendah</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Buat Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;