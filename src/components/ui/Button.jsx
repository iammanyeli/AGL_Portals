import React from 'react';

const Button = ({ className, size, children, ...props }) => {
  const sizeClasses = size === 'lg' ? 'px-8 py-3 text-base' : 'px-4 py-2 text-sm';
  return (
    <button className={`inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1B365F] dark:bg-[#EED58E] dark:hover:bg-[#EED58E]/90 text-white dark:text-[#1B365F] hover:bg-[#1B365F]/90 ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
