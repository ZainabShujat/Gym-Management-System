import { memo } from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:p-6 transition-colors ${className}`}>
      {children}
    </div>
  );
};

export default memo(Card);
