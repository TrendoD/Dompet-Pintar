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
  const [displayCount, setDisplayCount] = useState(0);
  
  // Static count - update this value as needed
  const STATIC_COUNT = 12;

  useEffect(() => {
    // Animate counter on mount
    let currentCount = 0;
    const increment = Math.ceil(STATIC_COUNT / 20);
    
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= STATIC_COUNT) {
        setDisplayCount(STATIC_COUNT);
        clearInterval(timer);
      } else {
        setDisplayCount(currentCount);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Users size={18} className="text-blue-600" />
      <span className="font-semibold text-gray-900">
        {displayCount.toLocaleString()}
      </span>
      {showLabel && (
        <span className="text-gray-600">
          {displayCount === 1 ? 'orang dalam' : 'orang dalam'} waitlist
        </span>
      )}
    </div>
  );
};

export default WaitlistCounter;