import React from 'react';

const ListingCard = ({ title, count, image }) => {
  return (
    <div className="group cursor-pointer rounded-xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-700 relative aspect-[1.4/1] sm:aspect-[4/3] bg-gray-100">
      <img 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
        src={image} 
      />
      
      {/* Subtle top gradient for readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent"></div>
      
      {/* Top Content */}
      <div className="absolute top-3 inset-x-3 sm:top-5 sm:inset-x-6 flex justify-between items-start pointer-events-none">
        <h3 className="text-white font-extrabold text-[14px] sm:text-[22px] tracking-tight drop-shadow-md leading-tight max-w-[75%]">
          {title}
        </h3>
        <div className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] sm:text-[13px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-cobalt group-hover:text-white">
          {count}
        </div>
      </div>

      {/* Bottom Glow on Hover */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl transition-all duration-500 group-hover:ring-brand-red/30"></div>
      
      {/* Interactive hover overlay */}
      <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-colors duration-700"></div>
    </div>
  );
};

export default ListingCard;
