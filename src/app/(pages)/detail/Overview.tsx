import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Gauge, Map, Bed, Bath, Ruler, Key } from 'lucide-react';

const Overview = ({overViewArray}:{overViewArray: [{id: number, Overview_item_heading: string, Overview_description: string}]}) => {
  const getIcon = (index: number) => {
    const icons = [Building2, Home, Gauge, Map, Bed, Bath, Ruler, Key];
    return icons[index % icons.length];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overview-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8"
    >
      <div className="bg-bgBlue text-white rounded-[30px] p-4 sm:p-6 lg:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overViewArray?.map((item, index) => {
            const IconComponent = getIcon(index);
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-xl 
                  bg-white/5 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm font-medium">
                    {item?.Overview_item_heading}
                  </p>
                  <p className="text-white/70 text-xs">
                    {item?.Overview_description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;