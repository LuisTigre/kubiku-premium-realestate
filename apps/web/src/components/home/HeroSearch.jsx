import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const HeroSearch = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero.png" 
          alt="Luxury Real Estate Angola" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 drop-shadow-2xl font-display leading-tight">
          {lang === 'en' ? 'We address dreams' : 'Endereçamos sonhos'}
          <br />
          <span className="text-brand-cobalt">{lang === 'en' ? 'Find a home that calls you' : 'Encontre a casa que o chama'}</span>
        </h1>

        {/* Search Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b border-gray-100 pb-2">
            <button 
              onClick={() => setActiveTab('search')}
              className={`text-sm font-black uppercase tracking-widest pb-2 transition-all ${activeTab === 'search' ? 'text-brand-cobalt border-b-2 border-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {lang === 'en' ? 'Search' : 'Pesquisar'}
            </button>
            <button 
              onClick={() => setActiveTab('developers')}
              className={`text-sm font-black uppercase tracking-widest pb-2 transition-all ${activeTab === 'developers' ? 'text-brand-cobalt border-b-2 border-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {lang === 'en' ? 'Developer Offers' : 'Ofertas de Promotores'}
            </button>
          </div>

          {/* Filter Rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <select className="w-full h-14 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20 transition-all">
                <option>{lang === 'en' ? 'All apartments' : 'Todos os apartamentos'}</option>
                <option>{lang === 'en' ? 'Houses' : 'Casas'}</option>
                <option>{lang === 'en' ? 'Plots' : 'Terrenos'}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder={lang === 'en' ? 'Enter location' : 'Introduza a localização'} 
                className="w-full h-14 pl-4 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20 transition-all"
              />
            </div>

            <div className="relative">
              <select className="w-full h-14 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20 transition-all">
                <option>+ 0 km</option>
                <option>+ 5 km</option>
                <option>+ 10 km</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2 flex gap-2">
              <input type="text" placeholder={lang === 'en' ? 'Price from' : 'Preço desde'} className="w-1/2 h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20" />
              <input type="text" placeholder={lang === 'en' ? 'to' : 'até'} className="w-1/2 h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20" />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <input type="text" placeholder={lang === 'en' ? 'Area from' : 'Área desde'} className="w-1/2 h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20" />
              <input type="text" placeholder={lang === 'en' ? 'to' : 'até'} className="w-1/2 h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/20" />
            </div>
            <button 
              onClick={() => navigate('/browse')}
              className="h-14 bg-brand-cobalt hover:bg-brand-navy text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {lang === 'en' ? 'Search' : 'Pesquisar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
