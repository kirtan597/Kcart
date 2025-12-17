import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MobileStats = ({ stats, onStatClick }) => {
  return (
    <div className="md:hidden space-y-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onStatClick && onStatClick(stat)}
          className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-white rounded-lg">
              {stat.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {stat.change && (
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MobileStats;