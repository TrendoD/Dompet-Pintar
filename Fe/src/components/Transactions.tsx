import React, { useState } from 'react';
import { 
  Plus,
  Filter,
  Search,
  Download,
  ShoppingCart,
  Car,
  Utensils,
  TrendingUp,
  Calendar,
  ChevronDown,
  BookOpen,
  Smartphone,
  Film,
  MoreHorizontal
} from 'lucide-react';
import { transactions as mockTransactions, getCurrentMonthTotals } from '../data/mockData';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'Food & Dining': return Utensils;
      case 'Transportation': return Car;
      case 'Income': return TrendingUp;
      case 'Education': return BookOpen;
      case 'Entertainment': return Film;
      case 'Utilities': return Smartphone;
      case 'Shopping': return ShoppingCart;
      default: return MoreHorizontal;
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Food & Dining': return { color: 'text-red-500', bgColor: 'bg-red-100' };
      case 'Transportation': return { color: 'text-blue-500', bgColor: 'bg-blue-100' };
      case 'Income': return { color: 'text-green-500', bgColor: 'bg-green-100' };
      case 'Education': return { color: 'text-indigo-500', bgColor: 'bg-indigo-100' };
      case 'Entertainment': return { color: 'text-purple-500', bgColor: 'bg-purple-100' };
      case 'Utilities': return { color: 'text-orange-500', bgColor: 'bg-orange-100' };
      case 'Shopping': return { color: 'text-pink-500', bgColor: 'bg-pink-100' };
      default: return { color: 'text-gray-500', bgColor: 'bg-gray-100' };
    }
  };

  const transactions = mockTransactions.map(t => ({
    ...t,
    icon: getTransactionIcon(t.category),
    ...getCategoryStyle(t.category),
    status: 'completed'
  }));

  const categories = ['All', 'Income', 'Food & Dining', 'Transportation', 'Education', 'Entertainment', 'Utilities', 'Others'];
  const periods = ['This Week', 'This Month', 'Last Month', 'Last 3 Months', 'This Year'];

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
    return isNegative ? `-${formatted}` : `+${formatted}`;
  };

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${time}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${time}`;
    } else {
      return `${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, ${time}`;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const monthlyTotals = getCurrentMonthTotals();
  const totalIncome = monthlyTotals.income;
  const totalExpenses = monthlyTotals.expenses;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Track and manage all your financial transactions</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Income</p>
              <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-200 rotate-180" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Net Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(totalIncome - totalExpenses)}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Period Filter */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${transaction.bgColor}`}>
                      <Icon className={`h-6 w-6 ${transaction.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{transaction.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-400">
                          {formatDate(transaction.date, transaction.time)}
                        </span>
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${transaction.category === 'Income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                          }
                        `}>
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="flex items-center justify-end mt-1">
                      <div className={`
                        w-2 h-2 rounded-full mr-2
                        ${transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}
                      `} />
                      <span className="text-xs text-gray-500 capitalize">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;