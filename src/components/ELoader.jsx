import React from 'react';
import { motion } from 'framer-motion';

const leafPath =
  "M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z";

const ELoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Leaf Spinner */}
        <motion.svg
          className="mx-auto mb-6"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#15803d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
          <motion.path
            d={leafPath}
            fill="#22c55e"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.svg>

        {/* Pulsing Text */}
        <motion.p
          className="text-green-800 text-lg font-semibold select-none"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          Loading UREWASTE ideas...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ELoader;
