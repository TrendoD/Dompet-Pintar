import React, { useState, useMemo, useEffect } from 'react';
import { transactions, budgets, goals, getCurrentMonthTotals, monthlyData } from '../data/mockData';
import { 
  Lightbulb, 
  TrendingUp, 
  Trophy, 
  Brain, 
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Star,
  Target,
  BarChart3,
  Activity,
  Settings,
  Info,
  Clock,
  Shield,
  Award,
  Users,
  DollarSign,
  Wallet,
  PiggyBank,
  BookOpen,
  Zap
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
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Insight {
  id: string;
  type: 'warning' | 'tip' | 'achievement' | 'info';
  title: string;
  description: string;
  icon: React.ElementType;
  priority: 'high' | 'medium' | 'low';
  action?: string;
  timestamp: string;
}

interface FinancialMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  target: number;
  icon: React.ElementType;
}

interface HabitRing {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  color: string;
  icon: React.ElementType;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  unlockedAt?: string;
  category: string;
}

const AIInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'analytics'>('overview');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [selectedInsightFilter, setSelectedInsightFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [gamificationEnabled, setGamificationEnabled] = useState(true);

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

  // Get status text based on score
  const getStatusText = (score: number) => {
    if (score >= 80) return { text: 'Excellent Financial Health', color: 'text-green-600' };
    if (score >= 60) return { text: 'Good Financial Standing', color: 'text-blue-600' };
    if (score >= 40) return { text: 'Needs Improvement', color: 'text-yellow-600' };
    if (score >= 20) return { text: 'Requires Attention', color: 'text-orange-600' };
    return { text: 'Critical Financial Status', color: 'text-red-600' };
  };

  // Generate Professional Insights
  const insights: Insight[] = useMemo(() => {
    const insights: Insight[] = [];
    
    const totals = getCurrentMonthTotals();
    const savingsRate = ((totals.income - totals.expenses) / totals.income) * 100;
    
    if (savingsRate < 20) {
      insights.push({
        id: 'low-savings',
        type: 'warning',
        title: 'Low Savings Rate Detected',
        description: `Current savings rate is ${savingsRate.toFixed(1)}%. Consider reducing discretionary spending to achieve the recommended 20% savings rate.`,
        icon: AlertCircle,
        priority: 'high',
        action: 'View Optimization Tips',
        timestamp: '2 hours ago'
      });
    }
    
    const foodBudget = budgets.find(b => b.category === 'Food & Dining');
    if (foodBudget && foodBudget.spentAmount > foodBudget.budgetAmount * 0.8) {
      insights.push({
        id: 'food-budget',
        type: 'warning',
        title: 'Food Budget Approaching Limit',
        description: `You've spent ${((foodBudget.spentAmount / foodBudget.budgetAmount) * 100).toFixed(1)}% of your food budget. Consider meal planning to optimize remaining expenses.`,
        icon: Target,
        priority: 'medium',
        action: 'Set Food Budget Alert',
        timestamp: '4 hours ago'
      });
    }
    
    const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount * 0.8);
    if (completedGoals.length > 0) {
      insights.push({
        id: 'goal-progress',
        type: 'achievement',
        title: 'Goal Achievement Progress',
        description: `Excellent progress on ${completedGoals[0].title}. You're 80% closer to your target and on track for completion.`,
        icon: Trophy,
        priority: 'low',
        action: 'View Goal Details',
        timestamp: '1 day ago'
      });
    }
    
    insights.push({
      id: 'spending-optimization',
      type: 'tip',
      title: 'Spending Optimization Opportunity',
      description: 'Analysis shows potential savings of 15% through category reallocation. Focus on optimizing transportation and entertainment expenses.',
      icon: Lightbulb,
      priority: 'medium',
      action: 'Generate Savings Plan',
      timestamp: '6 hours ago'
    });

    insights.push({
      id: 'peer-comparison',
      type: 'info',
      title: 'Performance Benchmark',
      description: 'Your financial discipline ranks in the top 25% compared to similar demographic profiles. Continue maintaining current habits.',
      icon: Users,
      priority: 'low',
      timestamp: '1 day ago'
    });
    
    return insights;
  }, []);

  // Filter insights
  const filteredInsights = insights.filter(insight => 
    selectedInsightFilter === 'all' || insight.priority === selectedInsightFilter
  );

  // Financial Journey Milestones
  const financialMilestones: FinancialMilestone[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Complete first budget setup',
      completed: true,
      progress: 100,
      target: 100,
      icon: BookOpen
    },
    {
      id: 'saver',
      title: 'Saver',
      description: 'Achieve 10% savings rate',
      completed: true,
      progress: 100,
      target: 100,
      icon: PiggyBank
    },
    {
      id: 'smart-spender',
      title: 'Smart Spender',
      description: 'Stay within budget for 3 months',
      completed: false,
      progress: 67,
      target: 100,
      icon: Wallet
    },
    {
      id: 'investment-ready',
      title: 'Investment Ready',
      description: 'Build emergency fund',
      completed: false,
      progress: 25,
      target: 100,
      icon: TrendingUp
    },
    {
      id: 'master',
      title: 'Master',
      description: 'Achieve all financial goals',
      completed: false,
      progress: 0,
      target: 100,
      icon: Award
    }
  ];

  // Habit Rings (Apple Watch inspired)
  const habitRings: HabitRing[] = [
    {
      id: 'budget',
      title: 'Budget',
      description: 'Track daily expenses',
      progress: 85,
      target: 100,
      color: '#1e40af',
      icon: DollarSign
    },
    {
      id: 'track',
      title: 'Track',
      description: 'Log all transactions',
      progress: 92,
      target: 100,
      color: '#10b981',
      icon: Activity
    },
    {
      id: 'save',
      title: 'Save',
      description: 'Meet savings target',
      progress: 78,
      target: 100,
      color: '#ef4444',
      icon: Target
    }
  ];

  // Achievement System
  const achievements: Achievement[] = [
    {
      id: 'first-budget',
      title: 'First Budget',
      description: 'Created your first budget category',
      icon: Target,
      unlocked: true,
      unlockedAt: 'Nov 2024',
      category: 'Getting Started'
    },
    {
      id: 'savings-streak',
      title: 'Savings Streak',
      description: 'Maintained positive savings for 30 days',
      icon: Zap,
      unlocked: true,
      unlockedAt: 'Dec 2024',
      category: 'Habits'
    },
    {
      id: 'goal-achiever',
      title: 'Goal Achiever',
      description: 'Completed your first financial goal',
      icon: Trophy,
      unlocked: false,
      category: 'Milestones'
    },
    {
      id: 'budget-master',
      title: 'Budget Master',
      description: 'Stayed under budget for 3 consecutive months',
      icon: Shield,
      unlocked: false,
      category: 'Discipline'
    }
  ];

  // Prepare chart data
  const spendingTrendData = monthlyData.map(m => ({
    month: m.month,
    spending: m.expenses,
    income: m.income,
    savings: m.income - m.expenses
  }));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertCircle;
      case 'tip': return Lightbulb;
      case 'achievement': return Trophy;
      case 'info': return Info;
      default: return Info;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Financial Health Score Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Health Score</h2>
            <p className="text-gray-600">15% better than last month</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 mb-1">{animatedScore}</div>
            <div className={`text-sm font-medium ${getStatusText(healthScore.score).color}`}>
              {getStatusText(healthScore.score).text}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="w-32 h-32 mx-auto">
              <CircularProgressbar
                value={animatedScore}
                maxValue={100}
                text={`${animatedScore}`}
                styles={buildStyles({
                  textSize: '24px',
                  pathColor: '#1e40af',
                  textColor: '#111827',
                  trailColor: '#f3f4f6',
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Spending Control</span>
              <span className="text-sm text-gray-500">{healthScore.components.savings}/40</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(healthScore.components.savings / 40) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Budget Adherence</span>
              <span className="text-sm text-gray-500">{healthScore.components.budgets}/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(healthScore.components.budgets / 30) * 100}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-green-600 h-2 rounded-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Goal Progress</span>
              <span className="text-sm text-gray-500">{healthScore.components.goals}/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(healthScore.components.goals / 30) * 100}%` }}
                transition={{ duration: 1, delay: 0.9 }}
                className="bg-purple-600 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Supporting Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Savings</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {((getCurrentMonthTotals().income - getCurrentMonthTotals().expenses) / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((budgets.reduce((sum, b) => sum + (b.budgetAmount - b.spentAmount), 0) / budgets.reduce((sum, b) => sum + b.budgetAmount, 0)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Goals Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((goals.reduce((sum, g) => sum + g.currentAmount, 0) / goals.reduce((sum, g) => sum + g.targetAmount, 0)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gamification Elements */}
      {gamificationEnabled && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Journey */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Journey</h3>
            <div className="space-y-4">
              {financialMilestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <milestone.icon className={`w-5 h-5 ${
                      milestone.completed ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        milestone.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {milestone.title}
                      </span>
                      <span className="text-sm text-gray-500">{milestone.progress}%</span>
                    </div>
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                    {!milestone.completed && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Habit Rings */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Habits</h3>
            <div className="grid grid-cols-3 gap-4">
              {habitRings.map((habit) => (
                <div key={habit.id} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2">
                    <CircularProgressbar
                      value={habit.progress}
                      styles={buildStyles({
                        pathColor: habit.color,
                        trailColor: '#f3f4f6',
                        strokeLinecap: 'round',
                      })}
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{habit.title}</h4>
                  <p className="text-xs text-gray-500">{habit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
        <div className="flex gap-2">
          {(['all', 'high', 'medium', 'low'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedInsightFilter(filter)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedInsightFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredInsights.slice(0, 5).map((insight, index) => {
            const Icon = getTypeIcon(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${getPriorityColor(insight.priority)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <span className="text-xs text-gray-500">{insight.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                    {insight.action && (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        {insight.action}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredInsights.length > 5 && (
        <div className="text-center">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Show More Insights
          </button>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrendData}>
                <Line 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#1e40af" 
                  strokeWidth={2}
                  dot={{ fill: '#1e40af', r: 4 }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border">
                          <p className="text-sm font-medium text-gray-900">
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
        </motion.div>

        {gamificationEnabled && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <achievement.icon className={`w-4 h-4 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </span>
                      {achievement.unlocked && (
                        <span className="text-xs text-gray-500">{achievement.unlockedAt}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            <p className="text-gray-600">Financial intelligence for smart decisions</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setGamificationEnabled(!gamificationEnabled)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Gamification</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'insights' | 'analytics')}
                className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {renderOverview()}
            </motion.div>
          )}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {renderInsights()}
            </motion.div>
          )}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {renderAnalytics()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIInsights;