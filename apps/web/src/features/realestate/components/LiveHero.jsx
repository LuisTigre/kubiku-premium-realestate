import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(t.hero.tabs[0]);

  const handleSearch = () => {
    navigate('/browse');
  };

  return (
    <section className="relative w-full h-[58vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Luxury home at dusk" 
          className="w-full h-full object-cover" 
          src="/assets/hero.png" 
        />
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center text-white">
        <h1 className="text-3xl md:text-6xl font-extrabold mb-10 drop-shadow-2xl tracking-[-0.03em] font-display">
          {t.hero.title.split('KUBIKU').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="!text-[#3A7AFF]">KUBIKU</span>}
            </React.Fragment>
          ))}
        </h1>

        {/* Search Interface Container */}
        <div className="w-full max-w-3xl mx-auto" data-purpose="search-container">
          {/* Search Tabs */}
          <div className="flex flex-wrap justify-center space-x-8 mb-6 font-bold text-[17px] overflow-x-auto pb-2 scrollbar-hide">
            {t.hero.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-all duration-300 relative pb-2 whitespace-nowrap tracking-tight ${
                  activeTab === tab 
                  ? 'text-white border-b-[5px] border-brand-sapphire' 
                  : 'text-white/80 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-2xl group focus-within:ring-8 focus-within:ring-white/10 transition-all duration-500">
            <input 
              className="w-full pl-8 pr-40 py-5 rounded-full border-none focus:ring-0 text-gray-900 text-[19px] placeholder:text-gray-400 font-medium" 
              placeholder={t.hero.placeholder} 
              type="text" 
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-2 bg-brand-cobalt hover:bg-brand-navy text-white px-10 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg active:scale-95 group"
            >
              <span className="font-extrabold text-[17px]">{t.hero.search}</span>
              <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
