import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import Transactions from './Transactions';
import Analytics from './Analytics';
import Budgets from './Budgets';
import Goals from './Goals';
import AboutMe from './AboutMe';

export type DashboardView = 'home' | 'transactions' | 'analytics' | 'budgets' | 'goals' | 'ai-insights' | 'chat' | 'recommendations' | 'connected-accounts' | 'settings' | 'about';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome />;
      case 'transactions':
        return <Transactions />;
      case 'analytics':
        return <Analytics />;
      case 'budgets':
        return <Budgets />;
      case 'goals':
        return <Goals />;
      case 'about':
        return <AboutMe />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavigateToLanding={() => onNavigate('landing')}
      />
      <div className="flex-1 lg:ml-[260px]">
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;