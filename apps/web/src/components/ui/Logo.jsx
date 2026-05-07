import React from 'react';

const Logo = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg viewBox="0 0 108 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* TOP face — pearl */}
        <polygon points="54,0 108,32 54,64 0,32" fill="#D8D8DC" />
        {/* LEFT face — deep cobalt */}
        <polygon points="0,32 54,64 54,112 0,80" fill="#1040A8" />
        {/* RIGHT face — electric blue */}
        <polygon points="54,64 108,32 108,80 54,112" fill="#2060E8" />
        {/* Left upper triangle */}
        <polygon points="0,32 54,0 54,64" fill="#1858C8" />
        {/* Right upper triangle */}
        <polygon points="54,0 108,32 54,64" fill="#4A88F8" />
        {/* Bottom kite */}
        <polygon points="0,80 54,112 108,80 54,128" fill="#0D2880" />
        
        {/* Accent lines */}
        <path d="M54 0L108 32M108 32V80M108 80L54 128M54 128L0 80M0 80V32M0 32L54 0" stroke="#0A1840" strokeWidth="0.5" strokeOpacity="0.6"/>
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-[22px] font-black tracking-tight text-gray-900 leading-none">KUBIKU</span>
          <span className="text-[8px] font-extrabold tracking-[0.3em] text-brand-cobalt uppercase mt-0.5">Casa. Sempre.</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
