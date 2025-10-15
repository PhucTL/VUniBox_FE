import React, { useState, useEffect } from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color, trend }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [value]);

  const formatValue = () => {
    if (typeof value === 'number') {
      return displayValue.toLocaleString('vi-VN');
    }
    return value;
  };

  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-header">
        <div className="stats-card-icon">
          <i className={icon}></i>
        </div>
        <div className="stats-card-title">
          {title}
        </div>
      </div>
      
      <div className="stats-card-body">
        <div className="stats-card-value">
          {formatValue()}
        </div>
        
        {trend && (
          <div className={`stats-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <i className={`fas ${trend.isPositive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
            <span>{Math.abs(trend.value).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;