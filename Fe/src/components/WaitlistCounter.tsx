import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

interface WaitlistCounterProps {
  className?: string;
  showLabel?: boolean;
}

const WaitlistCounter: React.FC<WaitlistCounterProps> = ({ 
  className = '', 
  showLabel = true 
}) => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetchCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate counter
    if (count > displayCount) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => {
          const increment = Math.ceil((count - prev) / 10);
          return Math.min(prev + increment, count);
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count, displayCount]);

  const fetchCount = async () => {
    try {
      const response = await fetch('/api/count');
      const data = await response.json();
      if (data.success && data.count !== undefined) {
        setCount(data.count);
        if (loading) {
          setDisplayCount(data.count);
        }
      }
    } catch (error) {
      console.error('Failed to fetch waitlist count:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 bg-blue-200 rounded-full animate-pulse" />
        <div className="w-24 h-4 bg-blue-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Users size={18} className="text-blue-600" />
      <span className="font-semibold text-gray-900">
        {displayCount.toLocaleString()}
      </span>
      {showLabel && (
        <span className="text-gray-600">
          {displayCount === 1 ? 'person on' : 'people on'} the waitlist
        </span>
      )}
    </div>
  );
};

export default WaitlistCounter;