import React, { useState, useMemo, useEffect } from 'react';
import { transactions, budgets, goals, getCurrentMonthTotals, monthlyData } from '../data/mockData';
import { 
  Lightbulb, 
  Gamepad2, 
  Sparkle, 
  TrendingUp, 
  Trophy, 
  Brain, 
  Heart, 
  Coffee, 
  ShoppingBag,
  Target,
  Flame,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Zap,
  Gift,
  Star,
  Lock,
  Info,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface Insight {
  id: string;
  type: 'warning' | 'tip' | 'achievement' | 'info';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: React.ElementType;
  progress: number;
  maxProgress: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const AIInsights: React.FC = () => {
  const [whatIfSpending, setWhatIfSpending] = useState(100);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [selectedInsightFilter, setSelectedInsightFilter] = useState<'all' | 'warning' | 'tip' | 'achievement'>('all');
  const streakDays = 7;
  const userLevel = 12;
  const userXP = 2150;
  const nextLevelXP = 3000;

  // Calculate Financial Health Score
  const healthScore = useMemo(() => {
    const totals = getCurrentMonthTotals();
    const savingsRate = ((totals.income - totals.expenses) / totals.income) * 100;
    
    const savingsScore = Math.min(savingsRate * 2, 40);
    const budgetScores = budgets.map(b => {
      const adherence = b.spentAmount <= b.budgetAmount ? 1 : (b.budgetAmount / b.spentAmount);
      return adherence * 6;
    });
    const budgetScore = Math.min(budgetScores.reduce((a, b) => a + b, 0), 30);
    
    const goalScores = goals.map(g => (g.currentAmount / g.targetAmount) * 6);
    const goalScore = Math.min(goalScores.reduce((a, b) => a + b, 0), 30);
    
    const totalScore = Math.round(savingsScore + budgetScore + goalScore);
    
    return {
      score: totalScore,
      components: {
        savings: Math.round(savingsScore),
        budgets: Math.round(budgetScore),
        goals: Math.round(goalScore)
      }
    };
  }, []);

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= healthScore.score) {
            clearInterval(interval);
            return healthScore.score;
          }
          return prev + 1;
        });
      }, 20);
    }, 500);
    return () => clearTimeout(timer);
  }, [healthScore.score]);

  // Get mood emoji based on score
  const getMoodEmoji = (score: number) => {
    if (score >= 80) return { emoji: '😎', text: 'Luar Biasa!' };
    if (score >= 60) return { emoji: '😊', text: 'Bagus Sekali!' };
    if (score >= 40) return { emoji: '😐', text: 'Lumayan' };
    if (score >= 20) return { emoji: '😟', text: 'Perlu Perbaikan' };
    return { emoji: '😨', text: 'Darurat Keuangan!' };
  };

  // Calculate days money will last
  const moneyWillLastDays = useMemo(() => {
    const totals = getCurrentMonthTotals();
    const dailySpending = totals.expenses / 15;
    const remainingBalance = totals.balance;
    const adjustedDailySpending = dailySpending * (whatIfSpending / 100);
    
    return Math.max(0, Math.floor(remainingBalance / adjustedDailySpending));
  }, [whatIfSpending]);

  // Prepare chart data
  const spendingTrendData = monthlyData.map(m => ({
    month: m.month,
    spending: m.expenses,
    income: m.income,
    savings: m.income - m.expenses
  }));

  // Generate Smart Insights
  const insights: Insight[] = useMemo(() => {
    const insights: Insight[] = [];
    
    const foodTransactions = transactions.filter(t => t.category === 'Food & Dining' && t.type === 'expense');
    const coffeeTransactions = transactions.filter(t => 
      t.title.toLowerCase().includes('coffee') || t.title.toLowerCase().includes('starbucks')
    );
    
    if (coffeeTransactions.length > 2) {
      const totalCoffee = coffeeTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      insights.push({
        id: 'coffee-alert',
        type: 'warning',
        title: 'Kopi Alert! ☕',
        description: `Bro, kamu udah spend Rp ${totalCoffee.toLocaleString('id-ID')} buat kopi minggu ini! Coba kurangi jadi 2x seminggu, bisa hemat Rp ${(totalCoffee * 0.6).toLocaleString('id-ID')} 😅`,
        icon: Coffee,
        color: 'text-orange-600',
        priority: 'high',
        action: 'Set Coffee Budget'
      });
    }
    
    const expensiveMeals = foodTransactions.filter(t => Math.abs(t.amount) > 50000);
    if (expensiveMeals.length > 2) {
      insights.push({
        id: 'stress-eating',
        type: 'info',
        title: 'Stress Spending Detected',
        description: `Ada ${expensiveMeals.length} makan mahal minggu ini. Lagi stress ujian ya? Coba alternatif lain buat release stress 🤗`,
        icon: Heart,
        color: 'text-purple-600',
        priority: 'medium',
        action: 'View Tips'
      });
    }
    
    const totals = getCurrentMonthTotals();
    const potentialSavings = totals.expenses * 0.2;
    insights.push({
      id: 'savings-tip',
      type: 'tip',
      title: 'Tips Nabung Laptop Baru 💻',
      description: `Kalo kamu kurangi spending 20% (sekitar Rp ${potentialSavings.toLocaleString('id-ID')}/bulan), laptop baru bisa kebeli 2 bulan lebih cepat! 🎯`,
      icon: Lightbulb,
      color: 'text-blue-600',
      priority: 'high',
      action: 'Calculate Savings'
    });
    
    if (healthScore.score > 70) {
      insights.push({
        id: 'good-score',
        type: 'achievement',
        title: 'Financial Health Mantap! 🏆',
        description: 'Score kamu di atas rata-rata mahasiswa! Keep it up, future millionaire! 💪',
        icon: Trophy,
        color: 'text-green-600',
        priority: 'low',
        action: 'Share Achievement'
      });
    }
    
    insights.push({
      id: 'peer-comparison',
      type: 'info',
      title: 'Peer Insight 👥',
      description: 'Spending makanan kamu 15% lebih rendah dari rata-rata mahasiswa se-Jakarta. Great job managing your food budget!',
      icon: Info,
      color: 'text-indigo-600',
      priority: 'low'
    });
    
    return insights;
  }, [healthScore.score]);

  // Filter insights
  const filteredInsights = insights.filter(insight => 
    selectedInsightFilter === 'all' || insight.type === selectedInsightFilter
  );

  // Daily Challenges with progress
  const challenges: Challenge[] = [
    {
      id: 'no-coffee',
      title: 'No Coffee Day ☕',
      description: 'Skip beli kopi hari ini',
      points: 50,
      completed: false,
      icon: Coffee,
      progress: 0,
      maxProgress: 1,
      difficulty: 'easy'
    },
    {
      id: 'cook-home',
      title: 'MasterChef Challenge 👨‍🍳',
      description: 'Masak sendiri untuk lunch',
      points: 100,
      completed: false,
      icon: ShoppingBag,
      progress: 1,
      maxProgress: 3,
      difficulty: 'medium'
    },
    {
      id: 'walk-campus',
      title: 'Walking Champion 🚶',
      description: 'Jalan kaki ke kampus instead of Gojek',
      points: 75,
      completed: true,
      icon: Heart,
      progress: 5,
      maxProgress: 5,
      difficulty: 'easy'
    },
    {
      id: 'budget-warrior',
      title: 'Budget Warrior 💪',
      description: 'Stay under daily budget limit',
      points: 150,
      completed: false,
      icon: Target,
      progress: 3,
      maxProgress: 7,
      difficulty: 'hard'
    }
  ];

  // Achievements
  const achievements: Achievement[] = [
    {
      id: 'first-savings',
      title: 'First Savings',
      description: 'Save your first Rp 100k',
      icon: Star,
      unlocked: true,
      rarity: 'common'
    },
    {
      id: 'budget-master',
      title: 'Budget Master',
      description: 'Stay under budget for 30 days',
      icon: Trophy,
      unlocked: true,
      rarity: 'rare'
    },
    {
      id: 'coffee-free',
      title: 'Coffee Free Week',
      description: 'No coffee purchases for 7 days',
      icon: Coffee,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 'millionaire',
      title: 'Future Millionaire',
      description: 'Save Rp 1 million',
      icon: Zap,
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header with AI Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wawasan AI</h1>
          <p className="text-gray-600">Financial intelligence untuk hidup lebih pintar</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg"
        >
          <Sparkle className="w-5 h-5" />
          <span className="font-medium">AI Powered</span>
        </motion.div>
      </motion.div>

      {/* Financial Health Score - Redesigned */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-32 translate-y-32" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Brain className="w-8 h-8" />
                Financial Health Score
              </h2>
              
              <div className="flex items-center gap-8 mt-6">
                {/* Circular Progress */}
                <div className="w-36 h-36">
                  <CircularProgressbar
                    value={animatedScore}
                    text={`${animatedScore}`}
                    styles={buildStyles({
                      textSize: '28px',
                      pathColor: '#fff',
                      textColor: '#fff',
                      trailColor: 'rgba(255, 255, 255, 0.2)',
                      pathTransitionDuration: 0.5,
                    })}
                  />
                </div>
                
                {/* Mood and Status */}
                <div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-2"
                  >
                    {getMoodEmoji(healthScore.score).emoji}
                  </motion.div>
                  <p className="text-xl font-semibold">{getMoodEmoji(healthScore.score).text}</p>
                </div>
              </div>

              {/* Component Breakdown */}
              <div className="mt-8 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pengendalian Spending</span>
                    <span>{healthScore.components.savings}/40</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(healthScore.components.savings / 40) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Discipline</span>
                    <span>{healthScore.components.budgets}/30</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(healthScore.components.budgets / 30) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Goal Progress</span>
                    <span>{healthScore.components.goals}/30</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(healthScore.components.goals / 30) * 100}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="hidden lg:block w-64 h-32 ml-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendingTrendData.slice(-4)}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#fff" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#fff" 
                    fill="url(#colorSavings)" 
                    strokeWidth={2}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        return (
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                            <p className="text-sm font-medium text-gray-900">
                              Savings: Rp {payload[0].value?.toLocaleString('id-ID')}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>

      {/* XP and Level Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {userLevel}
            </div>
            <div>
              <p className="text-sm text-gray-600">Financial Wizard Level</p>
              <p className="font-semibold text-gray-900">Level {userLevel} • {userXP} / {nextLevelXP} XP</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">{streakDays} Day Streak</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Rewards
            </motion.button>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(userXP / nextLevelXP) * 100}%` }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Analytics - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            Prediksi Keuangan
          </h2>
          
          {/* Money Duration Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Dengan pola spending saat ini:</p>
                <motion.div 
                  key={moneyWillLastDays}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold text-gray-900"
                >
                  {moneyWillLastDays} Hari
                </motion.div>
                <p className="text-sm mt-2">
                  {moneyWillLastDays < 15 ? (
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Perlu hemat sekarang!
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Aman sampai akhir bulan
                    </span>
                  )}
                </p>
              </div>
              
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={moneyWillLastDays > 30 ? 100 : (moneyWillLastDays / 30) * 100}
                  text={`${Math.min(100, Math.round((moneyWillLastDays / 30) * 100))}%`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathColor: moneyWillLastDays < 15 ? '#EF4444' : '#10B981',
                    textColor: '#1F2937',
                    trailColor: '#E5E7EB',
                  })}
                />
              </div>
            </div>
          </div>

          {/* Spending Trend Mini Chart */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Trend Pengeluaran 6 Bulan</p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrendData}>
                  <Line 
                    type="monotone" 
                    dataKey="spending" 
                    stroke="#6366F1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366F1', r: 4 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        return (
                          <div className="bg-white p-2 rounded-lg shadow-lg border">
                            <p className="text-sm font-medium">
                              {payload[0].payload.month}: Rp {payload[0].value?.toLocaleString('id-ID')}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* What-if Slider */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-3">
              <span>What-if Scenario</span>
              <span className="text-indigo-600">{whatIfSpending}% spending</span>
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={whatIfSpending}
              onChange={(e) => setWhatIfSpending(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${(whatIfSpending - 50) / 100 * 50}%, #EF4444 ${(whatIfSpending - 50) / 100 * 50}%, #EF4444 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Hemat 50%</span>
              <span>Normal</span>
              <span>Boros 150%</span>
            </div>
          </div>
        </motion.div>

        {/* Smart Daily Insights - Redesigned */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              Smart Insights
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'warning', 'tip', 'achievement'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedInsightFilter(filter as 'all' | 'warning' | 'tip' | 'achievement')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedInsightFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            <AnimatePresence>
              {filteredInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      insight.type === 'warning' ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200' :
                      insight.type === 'tip' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' :
                      insight.type === 'achievement' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
                      'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                    }`}
                  >
                    {/* Priority Badge */}
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(insight.priority)}`}>
                      {insight.priority}
                    </span>
                    
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        insight.type === 'warning' ? 'bg-orange-200' :
                        insight.type === 'tip' ? 'bg-blue-200' :
                        insight.type === 'achievement' ? 'bg-green-200' :
                        'bg-purple-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${insight.color} mb-1`}>{insight.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                        {insight.action && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                          >
                            {insight.action}
                            <ChevronRight className="w-3 h-3" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Gamification Section - Completely Redesigned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Challenges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-purple-600" />
            </div>
            Daily Challenges
          </h2>
          
          <div className="space-y-4">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;
              
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    challenge.completed 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
                        challenge.completed ? 'bg-green-200' : 'bg-purple-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${challenge.completed ? 'text-green-600' : 'text-purple-600'}`} />
                        {challenge.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold ${challenge.completed ? 'text-green-600' : 'text-purple-600'}`}>
                        +{challenge.points} XP
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {!challenge.completed && challenge.maxProgress > 1 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Daily Reward */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border border-purple-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-900">Daily Reward Available!</p>
                  <p className="text-sm text-gray-600">Complete all challenges for bonus XP</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700"
              >
                Claim +500 XP
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            Achievements
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                  className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                    achievement.unlocked 
                      ? 'cursor-pointer' 
                      : 'opacity-50 grayscale'
                  }`}
                  style={{
                    borderColor: achievement.unlocked ? 'transparent' : '#E5E7EB',
                    background: achievement.unlocked 
                      ? `linear-gradient(135deg, ${getRarityColor(achievement.rarity).split(' ')[1]} 0%, ${getRarityColor(achievement.rarity).split(' ')[3]} 100%)`
                      : '#F9FAFB'
                  }}
                >
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                    achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {achievement.unlocked ? (
                      <Icon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className={`font-semibold text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs mt-1 ${achievement.unlocked ? 'text-white/80' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                    >
                      <Star className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Achievement Progress */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Achievement Progress</span>
              <span className="text-sm font-bold text-gray-900">2/4 Unlocked</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 1, delay: 1.2 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating AI Assistant Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-purple-500/25"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AIInsights;