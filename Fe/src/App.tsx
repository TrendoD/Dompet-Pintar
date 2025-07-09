import React, { useState } from 'react';
import LandingPageV2 from './components/LandingPageV2';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'auth' | 'admin'>('landing');

  const handleNavigate = (page: string) => {
    if (page === 'auth') {
      // For now, navigate to dashboard when auth is clicked
      // In a real app, this would go to an authentication page
      setCurrentPage('dashboard');
    } else if (page === 'dashboard') {
      setCurrentPage('dashboard');
    } else if (page === 'admin') {
      setCurrentPage('admin');
    }
  };

  // Check for admin route on initial load
  React.useEffect(() => {
    if (window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' ? (
        <LandingPageV2 onNavigate={handleNavigate} />
      ) : currentPage === 'admin' ? (
        <AdminPanel />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;