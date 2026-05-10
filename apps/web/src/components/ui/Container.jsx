import React from 'react';

const Container = ({ children, className = '', clean = false }) => {
  return (
    <div className={`max-w-7xl mx-auto ${clean ? '' : 'px-4 md:px-6 lg:px-8'} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
