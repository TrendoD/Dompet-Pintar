import React from 'react';
import {
  House,
  CurrencyCircleDollar,
  ChartLine,
  PiggyBank,
  Target,
  Sparkle,
  ChatCircleDots,
  Lightbulb,
  CreditCard,
  Gear,
  Wallet,
  CaretDown,
  List,
  X,
  ArrowLeft
} from '@phosphor-icons/react';
import { DashboardView } from './Dashboard';

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  isOpen: boolean;
  onToggle: () => void;
  onNavigateToLanding: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  isOpen, 
  onToggle,
  onNavigateToLanding
}) => {
  const menuItems = [
    { id: 'home' as DashboardView, icon: House, label: 'Dashboard' },
    { id: 'transactions' as DashboardView, icon: CurrencyCircleDollar, label: 'Transactions' },
    { id: 'analytics' as DashboardView, icon: ChartLine, label: 'Analytics' },
    { id: 'budgets' as DashboardView, icon: PiggyBank, label: 'Budgets' },
    { id: 'goals' as DashboardView, icon: Target, label: 'Goals' },
  ];

  const aiItems = [
    { id: 'ai-insights' as DashboardView, icon: Sparkle, label: 'AI Insights' },
    { id: 'chat' as DashboardView, icon: ChatCircleDots, label: 'Chat Assistant' },
    { id: 'recommendations' as DashboardView, icon: Lightbulb, label: 'Recommendations' },
  ];

  const settingsItems = [
    { id: 'connected-accounts' as DashboardView, icon: CreditCard, label: 'Connected Accounts' },
    { id: 'settings' as DashboardView, icon: Gear, label: 'Preferences' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg p-2 shadow-lg border"
      >
        {isOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-[10px] flex items-center justify-center">
              <Wallet weight="fill" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Dompet Pintar</span>
          </a>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-5">
          {/* Main Menu */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.5px] mb-3 px-2">
              Main Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                    font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Features */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.5px] mb-3 px-2">
              AI Features
            </div>
            {aiItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                    font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.5px] mb-3 px-2">
              Settings
            </div>
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                    font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Back to Landing Button */}
        <div className="px-5 pb-3">
          <button
            onClick={onNavigateToLanding}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        {/* Sidebar Footer - User Profile */}
        <div className="p-5 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold">
              AR
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Ahmad Rizki</div>
              <div className="text-xs text-gray-500">ahmad.rizki@email.com</div>
            </div>
            <CaretDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;