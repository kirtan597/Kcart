import React from 'react';

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend, 
  description,
  className = "" 
}) => {
  const isPositive = changeType === 'positive';
  
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-black text-white rounded-lg">
          {icon}
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            <span>{isPositive ? '↗' : '↘'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-1">
          {value}
        </h3>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-500 text-xs">{description}</p>
      )}

      {/* Trend Line */}
      {trend && (
        <div className="mt-4 h-8">
          <svg className="w-full h-full" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth="2"
              points={trend.map((point, index) => 
                `${(index / (trend.length - 1)) * 100},${30 - (point / Math.max(...trend)) * 25}`
              ).join(' ')}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;