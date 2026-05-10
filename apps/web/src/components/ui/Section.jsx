import React from 'react';

const Section = ({ children, className = '', spacing = 'lg' }) => {
  const spacings = {
    sm: 'py-6 md:py-8',
    md: 'py-10 md:py-14',
    lg: 'py-16 md:py-24',
  };

  return (
    <section className={`${spacings[spacing]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
