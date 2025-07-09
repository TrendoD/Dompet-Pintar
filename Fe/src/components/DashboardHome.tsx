import React, { useState } from 'react';
import { 
  Wallet, 
  TrendUp, 
  TrendDown, 
  ArrowDown, 
  ArrowUp, 
  PiggyBank,
  MagnifyingGlass,
  Bell,
  Hamburger,
  Motorcycle,
  Bank,
  ShoppingBag,
  FilmStrip,
  Sparkle,
  Plus,
  ChartPie,
  Download,
  ChatCircleDots,
  Book,
  Phone
} from '@phosphor-icons/react';
import { StatCard, Transaction, AIInsight, QuickAction, ChartData } from '../types/dashboard';
import { getCurrentMonthTotals, getRecentTransactions, getSavingsRate } from '../data/mockData';

const DashboardHome: React.FC = () => {
  const [chartFilter, setChartFilter] = useState<'week' | 'month' | 'year'>('week');

  const monthlyTotals = getCurrentMonthTotals();
  const savingsRate = getSavingsRate();

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const stats: StatCard[] = [
    {
      title: 'Total Balance',
      value: `Rp ${formatRupiah(monthlyTotals.balance)}`,
      change: `${savingsRate}% savings rate`,
      trend: 'up',
      icon: 'wallet',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Income Bulan Ini',
      value: `Rp ${formatRupiah(monthlyTotals.income)}`,
      change: 'Stable income',
      trend: 'up',
      icon: 'arrow-down',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Expense Bulan Ini',
      value: `Rp ${formatRupiah(monthlyTotals.expenses)}`,
      change: '80% of income',
      trend: 'up',
      icon: 'arrow-up',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Total Saving',
      value: `Rp ${formatRupiah(monthlyTotals.balance)}`,
      change: `${savingsRate}% of income`,
      trend: 'up',
      icon: 'piggy-bank',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  const recentTransactions = getRecentTransactions(5);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Dining': return 'hamburger';
      case 'Transportation': return 'motorcycle';
      case 'Income': return 'bank';
      case 'Education': return 'book';
      case 'Entertainment': return 'film-strip';
      case 'Utilities': return 'phone';
      default: return 'shopping-bag';
    }
  };

  const getCategoryColors = (category: string) => {
    switch (category) {
      case 'Food & Dining': return { bg: 'bg-food-icon', color: 'text-food-icon' };
      case 'Transportation': return { bg: 'bg-transport-icon', color: 'text-transport-icon' };
      case 'Income': return { bg: 'bg-income-icon', color: 'text-income-icon' };
      case 'Education': return { bg: 'bg-blue-100', color: 'text-blue-600' };
      case 'Entertainment': return { bg: 'bg-entertainment-icon', color: 'text-entertainment-icon' };
      case 'Utilities': return { bg: 'bg-orange-100', color: 'text-orange-600' };
      default: return { bg: 'bg-shopping-icon', color: 'text-shopping-icon' };
    }
  };

  const transactions: Transaction[] = recentTransactions.map(t => ({
    id: t.id,
    name: t.title,
    category: t.category,
    amount: t.amount,
    icon: getCategoryIcon(t.category),
    iconBg: getCategoryColors(t.category).bg,
    iconColor: getCategoryColors(t.category).color
  }));

  const aiInsights: AIInsight[] = [
    {
      id: 1,
      emoji: '💡',
      text: 'Pengeluaran makananmu Rp 650rb bulan ini. Coba masak sendiri 2x seminggu untuk hemat Rp 150rb'
    },
    {
      id: 2,
      emoji: '📈',
      text: `Savings rate kamu ${savingsRate}%! Bagus untuk mahasiswa. Target ideal 20-30%`
    },
    {
      id: 3,
      emoji: '🎯',
      text: 'Transportasi sudah 83% dari budget. Coba gunakan Transjakarta lebih sering'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'add-transaction',
      label: 'Add Transaction',
      icon: 'plus',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'set-budget',
      label: 'Set Budget',
      icon: 'chart-pie',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'download',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 'chat-ai',
      label: 'Chat AI',
      icon: 'chat-dots',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  ];

  const chartData: ChartData[] = [
    { value: 60 },
    { value: 80 },
    { value: 45 },
    { value: 70 },
    { value: 90 },
    { value: 55 },
    { value: 75 }
  ];

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formatted = new Intl.NumberFormat('id-ID').format(Math.abs(amount));
    return `${isNegative ? '-' : '+'}Rp ${formatted}`;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'wallet': return <Wallet weight="fill" className="w-6 h-6" />;
      case 'arrow-down': return <ArrowDown weight="fill" className="w-6 h-6" />;
      case 'arrow-up': return <ArrowUp weight="fill" className="w-6 h-6" />;
      case 'piggy-bank': return <PiggyBank weight="fill" className="w-6 h-6" />;
      case 'hamburger': return <Hamburger weight="fill" className="w-5 h-5" />;
      case 'motorcycle': return <Motorcycle weight="fill" className="w-5 h-5" />;
      case 'bank': return <Bank weight="fill" className="w-5 h-5" />;
      case 'shopping-bag': return <ShoppingBag weight="fill" className="w-5 h-5" />;
      case 'film-strip': return <FilmStrip weight="fill" className="w-5 h-5" />;
      case 'book': return <Book weight="fill" className="w-5 h-5" />;
      case 'phone': return <Phone weight="fill" className="w-5 h-5" />;
      case 'plus': return <Plus className="w-5 h-5" />;
      case 'chart-pie': return <ChartPie className="w-5 h-5" />;
      case 'download': return <Download className="w-5 h-5" />;
      case 'chat-dots': return <ChatCircleDots className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <header className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center -mx-8 -mt-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <MagnifyingGlass className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-xs ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <TrendUp className="w-4 h-4" />
                      ) : (
                        <TrendDown className="w-4 h-4" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <div className={stat.iconColor}>
                      {getIcon(stat.icon)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spending Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Spending Overview</h2>
              <div className="flex gap-2">
                {(['week', 'month', 'year'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setChartFilter(filter)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      chartFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-3 bg-gray-50 rounded-lg p-5">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-600 rounded-t transition-all hover:opacity-90"
                  style={{ height: `${data.value}%` }}
                />
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                See All
              </a>
            </div>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${transaction.iconBg} flex items-center justify-center`}>
                      <div className={transaction.iconColor}>
                        {getIcon(transaction.icon)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <span className={`text-base font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkle weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold">AI Insights Hari Ini</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="bg-white/10 rounded-lg p-4 text-sm leading-relaxed">
                  {insight.emoji} {insight.text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex flex-col items-center gap-2 p-5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-600 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center`}>
                    <div className={action.iconColor}>
                      {getIcon(action.icon)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;