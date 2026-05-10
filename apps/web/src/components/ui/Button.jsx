import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black transition-all duration-300 rounded-2xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none min-h-[48px] px-6 text-sm uppercase tracking-widest';
  
  const variants = {
    primary: 'bg-[#1A2B3C] text-white hover:bg-brand-cobalt shadow-lg hover:shadow-brand-cobalt/20',
    secondary: 'bg-brand-cobalt text-white hover:bg-brand-navy shadow-lg hover:shadow-brand-cobalt/20',
    outline: 'border-2 border-gray-100 text-[#1A2B3C] hover:border-brand-cobalt hover:text-brand-cobalt bg-white',
    ghost: 'text-[#1A2B3C] hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 stroke-[2.5]" />}
      {children}
    </button>
  );
};

export default Button;
