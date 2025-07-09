import React, { useState } from 'react';
import LandingPageV2 from './components/LandingPageV2';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'auth'>('landing');

  const handleNavigate = (page: string) => {
    if (page === 'auth') {
      // For now, navigate to dashboard when auth is clicked
      // In a real app, this would go to an authentication page
      setCurrentPage('dashboard');
    } else if (page === 'dashboard') {
      setCurrentPage('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' ? (
        <LandingPageV2 onNavigate={handleNavigate} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;