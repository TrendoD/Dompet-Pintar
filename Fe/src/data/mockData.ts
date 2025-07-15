// Centralized mock data for student budget demo (Rp 2.5 million monthly income)

export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  time: string;
  description: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: number;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: string;
  startDate: string;
  endDate: string;
  icon: string;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

// Current month transactions for student budget
export const transactions: Transaction[] = [
  // Income transactions
  {
    id: 1,
    title: 'Transfer dari Orang Tua',
    category: 'Income',
    amount: 2500000,
    date: '2024-12-01',
    time: '09:00',
    description: 'Uang bulanan dari orang tua',
    type: 'income'
  },
  // Food expenses (majority of spending)
  {
    id: 2,
    title: 'Warteg Bahari',
    category: 'Food & Dining',
    amount: -15000,
    date: '2024-12-15',
    time: '12:30',
    description: 'Lunch - nasi + ayam + sayur',
    type: 'expense'
  },
  {
    id: 3,
    title: 'Indomaret',
    category: 'Food & Dining',
    amount: -25000,
    date: '2024-12-15',
    time: '19:00',
    description: 'Snacks and drinks',
    type: 'expense'
  },
  {
    id: 4,
    title: 'Bakso Pak Kumis',
    category: 'Food & Dining',
    amount: -18000,
    date: '2024-12-14',
    time: '13:00',
    description: 'Bakso special jumbo',
    type: 'expense'
  },
  {
    id: 5,
    title: 'KFC',
    category: 'Food & Dining',
    amount: -45000,
    date: '2024-12-13',
    time: '19:30',
    description: 'Dinner with friends',
    type: 'expense'
  },
  {
    id: 6,
    title: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: -55000,
    date: '2024-12-12',
    time: '15:00',
    description: 'Coffee and snacks while studying',
    type: 'expense'
  },
  {
    id: 7,
    title: 'Mie Instan Bulk',
    category: 'Food & Dining',
    amount: -100000,
    date: '2024-12-10',
    time: '10:00',
    description: 'Stock for late night study',
    type: 'expense'
  },
  {
    id: 8,
    title: 'Street Food',
    category: 'Food & Dining',
    amount: -30000,
    date: '2024-12-09',
    time: '20:00',
    description: 'Evening snacks',
    type: 'expense'
  },
  {
    id: 9,
    title: 'Restaurant Date',
    category: 'Food & Dining',
    amount: -80000,
    date: '2024-12-08',
    time: '18:00',
    description: 'Dinner out',
    type: 'expense'
  },
  {
    id: 10,
    title: 'Grocery Shopping',
    category: 'Food & Dining',
    amount: -120000,
    date: '2024-12-05',
    time: '11:00',
    description: 'Weekly groceries, mostly snacks and drinks',
    type: 'expense'
  },
  // Transportation
  {
    id: 11,
    title: 'Gojek to Campus',
    category: 'Transportation',
    amount: -12000,
    date: '2024-12-15',
    time: '07:30',
    description: 'Morning ride to campus',
    type: 'expense'
  },
  {
    id: 12,
    title: 'Transjakarta Card Top-up',
    category: 'Transportation',
    amount: -50000,
    date: '2024-12-12',
    time: '16:00',
    description: 'Monthly bus card top-up',
    type: 'expense'
  },
  // Education
  {
    id: 13,
    title: 'Fotokopi & Print Tugas',
    category: 'Education',
    amount: -35000,
    date: '2024-12-11',
    time: '14:00',
    description: 'Print laporan and fotokopi materi',
    type: 'expense'
  },
  // Entertainment
  {
    id: 14,
    title: 'Spotify Premium',
    category: 'Entertainment',
    amount: -35000,
    date: '2024-12-09',
    time: '00:00',
    description: 'Monthly subscription',
    type: 'expense'
  },
  // Utilities
  {
    id: 15,
    title: 'Pulsa & Kuota Internet',
    category: 'Utilities',
    amount: -50000,
    date: '2024-12-07',
    time: '10:00',
    description: 'Monthly phone and data package',
    type: 'expense'
  },
  // Others
  {
    id: 16,
    title: 'Laundry',
    category: 'Others',
    amount: -30000,
    date: '2024-12-06',
    time: '09:00',
    description: 'Weekly laundry service',
    type: 'expense'
  }
];

// Calculate current month totals from transactions
export const getCurrentMonthTotals = () => {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  return { income, expenses, balance: income - expenses };
};

// Monthly data for last 6 months (student budget scale)
export const monthlyData: MonthlyData[] = [
  { month: 'Jul', income: 2300000, expenses: 1850000 },
  { month: 'Aug', income: 2500000, expenses: 2100000 },
  { month: 'Sep', income: 2400000, expenses: 1900000 },
  { month: 'Oct', income: 2600000, expenses: 2200000 },
  { month: 'Nov', income: 2500000, expenses: 2000000 },
  { month: 'Dec', income: 2500000, expenses: 700000 } // Current month
];

// Budget allocations for student
export const budgets: Budget[] = [
  {
    id: 1,
    category: 'Food & Dining',
    budgetAmount: 1000000,
    spentAmount: 488000, // Sum of food expenses from transactions
    period: 'Monthly',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    icon: '🍽️'
  },
  {
    id: 2,
    category: 'Transportation',
    budgetAmount: 400000,
    spentAmount: 62000,
    period: 'Monthly',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    icon: '🚗'
  },
  {
    id: 3,
    category: 'Education',
    budgetAmount: 500000,
    spentAmount: 35000,
    period: 'Monthly',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    icon: '📚'
  },
  {
    id: 4,
    category: 'Entertainment',
    budgetAmount: 300000,
    spentAmount: 35000,
    period: 'Monthly',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    icon: '🎬'
  },
  {
    id: 5,
    category: 'Utilities & Others',
    budgetAmount: 300000,
    spentAmount: 80000,
    period: 'Monthly',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    icon: '📱'
  }
];

// Realistic student financial goals
export const goals: Goal[] = [
  {
    id: 1,
    title: 'Emergency Fund',
    description: 'Build emergency savings for 3 months expenses',
    targetAmount: 6000000,
    currentAmount: 3500000,
    targetDate: '2025-06-30',
    category: 'Emergency',
    priority: 'high',
    icon: '🆘'
  },
  {
    id: 2,
    title: 'New Laptop for Study',
    description: 'Save for laptop upgrade for programming projects',
    targetAmount: 8000000,
    currentAmount: 4500000,
    targetDate: '2025-03-15',
    category: 'Education',
    priority: 'high',
    icon: '💻'
  },
  {
    id: 3,
    title: 'Liburan Semester',
    description: 'Weekend trip to Yogyakarta with friends',
    targetAmount: 2000000,
    currentAmount: 1200000,
    targetDate: '2025-01-31',
    category: 'Travel',
    priority: 'medium',
    icon: '✈️'
  },
  {
    id: 4,
    title: 'Online Course Fund',
    description: 'Professional certification in web development',
    targetAmount: 3000000,
    currentAmount: 800000,
    targetDate: '2025-08-31',
    category: 'Education',
    priority: 'medium',
    icon: '📖'
  },
  {
    id: 5,
    title: 'Graduation Preparation',
    description: 'Save for wisuda expenses and celebration',
    targetAmount: 5000000,
    currentAmount: 1500000,
    targetDate: '2025-12-31',
    category: 'Others',
    priority: 'low',
    icon: '🎓'
  }
];

// Category breakdown for expenses
export const expenseCategories = [
  { category: 'Makanan & Minuman', amount: 447000, percentage: 68.8, color: 'bg-red-500' },
  { category: 'Transportasi', amount: 62000, percentage: 9.5, color: 'bg-purple-500' },
  { category: 'Pendidikan', amount: 35000, percentage: 5.4, color: 'bg-blue-500' },
  { category: 'Hiburan', amount: 35000, percentage: 5.4, color: 'bg-pink-500' },
  { category: 'Utilitas', amount: 50000, percentage: 7.7, color: 'bg-orange-500' },
  { category: 'Lainnya', amount: 30000, percentage: 4.6, color: 'bg-gray-500' }
];

// Helper function to get recent transactions
export const getRecentTransactions = (limit: number = 5) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Helper function to calculate savings rate
export const getSavingsRate = () => {
  const totals = getCurrentMonthTotals();
  const savingsRate = ((totals.income - totals.expenses) / totals.income) * 100;
  return savingsRate.toFixed(1);
};