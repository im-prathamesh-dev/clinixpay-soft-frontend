import React from 'react';

/**
 * Reusable Card Component
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 */
const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-card 
        shadow-soft 
        p-4 md:p-6
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-soft-lg hover:-translate-y-0.5' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

