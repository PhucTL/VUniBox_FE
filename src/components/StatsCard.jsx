import React from 'react';

const StatsCard = ({ title, value, subtitle, progressValue, progressColor = "blue", icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-blue-600">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {icon && (
          <div className="text-3xl text-blue-500">
            {icon}
          </div>
        )}
      </div>
      
      {progressValue !== undefined && (
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Đã sử dụng</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-${progressColor}-600 transition-all duration-300`}
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;