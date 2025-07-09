export interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface AIInsight {
  id: number;
  emoji: string;
  text: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}

export interface ChartData {
  value: number;
  label?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}