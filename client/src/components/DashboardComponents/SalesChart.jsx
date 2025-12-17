import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

const SalesChart = ({ data, title = "Sales Overview" }) => {
  const [timeframe, setTimeframe] = useState('7d');
  const [chartType, setChartType] = useState('revenue');

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const chartTypes = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'orders', label: 'Orders' },
    { value: 'customers', label: 'Customers' }
  ];

  // Generate sample data based on timeframe
  const generateData = () => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
      customers: Math.floor(Math.random() * 30) + 5
    }));
  };

  const chartData = generateData();
  const maxValue = Math.max(...chartData.map(d => d[chartType]));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  chartType === type.value
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  timeframe === tf.value
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-1 mb-4">
        {chartData.map((item, index) => (
          <motion.div
            key={`${timeframe}-${chartType}-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: `${(item[chartType] / maxValue) * 100}%`,
              opacity: 1 
            }}
            transition={{ 
              delay: index * 0.02,
              duration: 0.5,
              ease: "easeOut"
            }}
            className="flex-1 bg-gradient-to-t from-black to-gray-600 rounded-t-sm min-h-[4px] relative group cursor-pointer"
          >
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">
                {chartType === 'revenue' ? `$${item[chartType].toLocaleString()}` : item[chartType]}
              </div>
              <div className="text-gray-300">{item.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        {chartData.filter((_, i) => i % Math.ceil(chartData.length / 6) === 0).map((item, index) => (
          <span key={index}>{item.date}</span>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-bold text-black">
            {chartType === 'revenue' 
              ? `$${chartData.reduce((sum, item) => sum + item[chartType], 0).toLocaleString()}`
              : chartData.reduce((sum, item) => sum + item[chartType], 0).toLocaleString()
            }
          </div>
          <div className="text-xs text-gray-500">Total {chartTypes.find(t => t.value === chartType)?.label}</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-black">
            {chartType === 'revenue' 
              ? `$${Math.round(chartData.reduce((sum, item) => sum + item[chartType], 0) / chartData.length).toLocaleString()}`
              : Math.round(chartData.reduce((sum, item) => sum + item[chartType], 0) / chartData.length).toLocaleString()
            }
          </div>
          <div className="text-xs text-gray-500">Average</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +12.5%
          </div>
          <div className="text-xs text-gray-500">Growth</div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;