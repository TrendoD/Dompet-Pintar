import React, { useState } from 'react';
import { Wallet } from '@phosphor-icons/react';
import LandingPageV2 from './components/LandingPageV2';
import Dashboard from './components/Dashboard';
import AboutMe from './components/AboutMe';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'auth' | 'about'>('landing');

  const handleNavigate = (page: string) => {
    if (page === 'auth') {
      // For now, navigate to dashboard when auth is clicked
      // In a real app, this would go to an authentication page
      setCurrentPage('dashboard');
    } else if (page === 'dashboard') {
      setCurrentPage('dashboard');
    } else if (page === 'landing') {
      setCurrentPage('landing');
    } else if (page === 'about') {
      setCurrentPage('about');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' ? (
        <LandingPageV2 onNavigate={handleNavigate} />
      ) : currentPage === 'about' ? (
        <div className="min-h-screen bg-white">
          {/* Navigation bar for About page */}
          <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-center py-4">
                <button 
                  onClick={() => handleNavigate('landing')}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-[10px] flex items-center justify-center">
                    <Wallet size={24} className="text-white" weight="fill" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Dompet Pintar</span>
                </button>
                
                <button 
                  onClick={() => handleNavigate('landing')}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  ← Kembali ke Beranda
                </button>
              </div>
            </div>
          </nav>
          
          {/* About page content */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-6">
              <AboutMe />
            </div>
          </div>
        </div>
      ) : (
        <Dashboard onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;