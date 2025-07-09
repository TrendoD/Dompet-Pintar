import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Users, 
  Download, 
  RefreshCw, 
  Calendar,
  TrendingUp,
  Mail,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { waitlistApi, AdminSignup, AdminData } from '../utils/api';

const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await waitlistApi.admin.getSignups(password);
      setAdminData(data);
      setIsAuthenticated(true);
      // Store password in session for subsequent requests
      sessionStorage.setItem('adminPass', password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    if (!password && !sessionStorage.getItem('adminPass')) return;
    
    setRefreshing(true);
    try {
      const pass = password || sessionStorage.getItem('adminPass') || '';
      const data = await waitlistApi.admin.getSignups(pass);
      setAdminData(data);
    } catch (err) {
      console.error('Failed to refresh data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleExport = async () => {
    try {
      const pass = password || sessionStorage.getItem('adminPass') || '';
      const blob = await waitlistApi.admin.exportCSV(pass);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `waitlist-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export data');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Auto-refresh every 30 seconds when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key size={32} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your admin password to view waitlist data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Waitlist Admin</h1>
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {adminData && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Signups</h3>
                <Users size={20} className="text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{adminData.totalCount}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Today's Signups</h3>
                <Calendar size={20} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{adminData.todayCount}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Growth Rate</h3>
                <TrendingUp size={20} className="text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {adminData.todayCount > 0 ? '+' : ''}{((adminData.todayCount / Math.max(adminData.totalCount - adminData.todayCount, 1)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Daily Stats Chart (Simple) */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Signups (Last 7 Days)</h3>
            <div className="flex items-end gap-2 h-40">
              {Object.entries(adminData.dailyStats)
                .slice(-7)
                .map(([date, count]) => {
                  const maxCount = Math.max(...Object.values(adminData.dailyStats));
                  const height = (count / maxCount) * 100;
                  return (
                    <div key={date} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full">
                        <div
                          className="bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-700"
                          style={{ height: `${height}px` }}
                        />
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                          {count}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Signups Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Signups</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Signup Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminData.signups.slice(0, 20).map((signup, index) => (
                    <tr key={`${signup.email}-${signup.timestamp}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{signup.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(signup.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {signup.source === 'direct' ? 'Direct' : new URL(signup.source).hostname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle size={14} className="mr-1" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {adminData.signups.length > 20 && (
              <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600 text-center">
                Showing 20 of {adminData.signups.length} signups. Export CSV to see all.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;