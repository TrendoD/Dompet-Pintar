// API utility functions for waitlist

export interface SignupResponse {
  success: boolean;
  message?: string;
  position?: number;
  error?: string;
}

export interface CountResponse {
  success: boolean;
  count: number;
  message: string;
}

export interface AdminSignup {
  email: string;
  timestamp: string;
  source: string;
  userAgent: string;
}

export interface AdminData {
  totalCount: number;
  todayCount: number;
  signups: AdminSignup[];
  dailyStats: Record<string, number>;
}

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://dompet-pintar.vercel.app/api' 
  : 'http://localhost:3000/api';

export const waitlistApi = {
  // Join waitlist
  signup: async (email: string): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          honeypot: '' // Always send empty honeypot from legitimate requests
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get waitlist count
  getCount: async (): Promise<CountResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/count`);
      const data = await response.json();
      return data;
    } catch (error) {
      // Return default on error
      return {
        success: false,
        count: 0,
        message: 'Join our waitlist'
      };
    }
  },

  // Admin functions
  admin: {
    getSignups: async (password: string): Promise<AdminData> => {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password,
          action: 'getSignups'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch admin data');
      }

      const data = await response.json();
      return data.data;
    },

    exportCSV: async (password: string): Promise<Blob> => {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password,
          action: 'exportCSV'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to export data');
      }

      return response.blob();
    },

    clearWaitlist: async (password: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password,
          action: 'clearWaitlist',
          confirmClear: true
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to clear waitlist');
      }
    }
  }
};