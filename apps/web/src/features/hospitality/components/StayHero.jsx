import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const StayHero = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(t.stay.tabs[0]);

  return (
    <section className="relative w-full h-[65vh] min-h-[550px] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Luxury beach villa at sunset" 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop" 
        />
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center text-white">
        <h1 className="text-3xl md:text-6xl font-extrabold mb-10 drop-shadow-2xl tracking-[-0.03em] font-display">
          {t.stay.title.split('KUBIKU').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="!text-[#3A7AFF]">KUBIKU</span>}
            </React.Fragment>
          ))}
        </h1>

        {/* Search Interface Container (Stay Version) */}
        <div className="w-full max-w-4xl mx-auto" data-purpose="stay-search-container">
          {/* Search Tabs */}
          <div className="flex flex-wrap justify-center space-x-8 mb-6 font-bold text-[17px] overflow-x-auto pb-2 scrollbar-hide">
            {t.stay.tabs.map((tab) => (
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

          {/* Stay Search Bar with Date Pickers UI */}
          <div className="bg-white rounded-[2rem] p-2 shadow-2xl flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 group focus-within:ring-8 focus-within:ring-white/10 transition-all duration-500">
            {/* Location */}
            <div className="w-full md:w-1/3 px-6 py-4 text-left">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Localização</label>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 text-[16px] placeholder:text-gray-400 font-bold p-0" 
                placeholder={t.stay.placeholder} 
                type="text" 
              />
            </div>

            {/* Check-in / Check-out */}
            <div className="w-full md:w-1/3 px-6 py-4 text-left">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Datas</label>
              <div className="text-gray-900 text-[16px] font-bold cursor-pointer hover:text-brand-cobalt transition-colors">
                Selecionar datas
              </div>
            </div>

            {/* Guests */}
            <div className="w-full md:w-1/3 px-6 py-4 flex items-center justify-between">
              <div className="text-left">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Hóspedes</label>
                <div className="text-gray-900 text-[16px] font-bold">1 hóspede</div>
              </div>
              
              <button className="bg-brand-cobalt hover:bg-brand-navy text-white h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 group ml-2 flex-shrink-0">
                <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayHero;
