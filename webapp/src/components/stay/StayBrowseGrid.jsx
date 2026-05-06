import React from 'react';
import ListingCard from '../ui/ListingCard';
import { useLanguage } from '../../context/LanguageContext';

const StayBrowseGrid = () => {
  const { t, lang } = useLanguage();

  // Custom stay categories
  const stayCategories = [
    { title: lang === 'en' ? '🏨 Premium Hotels' : '🏨 Hotéis de Luxo', count: 24, price: '120.000', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    { title: lang === 'en' ? '🏠 Guest Houses' : '🏠 Pousadas & Pensões', count: 32, price: '45.000', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=800&auto=format&fit=crop' },
    { title: lang === 'en' ? '🏢 Apartments' : '🏢 Apartamentos', count: 45, price: '85.000', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    { title: lang === 'en' ? '🛏️ Private Rooms' : '🛏️ Quartos Privados', count: 18, price: '15.000', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop' }
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-6 sm:px-8 py-10 -mt-24 relative z-20">
      <div className="flex items-end justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="text-[24px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight font-display mb-2">
            {lang === 'en' ? 'Explore unique stays in Angola' : 'Explore estadias únicas em Angola'}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed">
            {lang === 'en' ? 'From luxury villas in Mussulo to modern flats in Talatona.' : 'De vilas de luxo no Mussulo a apartamentos modernos em Talatona.'}
          </p>
        </div>
        <button className="hidden md:flex items-center space-x-2 text-brand-cobalt font-bold hover:text-brand-navy transition-all group pb-1 border-b-2 border-brand-cobalt/10 hover:border-brand-cobalt">
          <span>{lang === 'en' ? 'See all stays' : 'Ver todas as estadias'}</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <div className="flex flex-nowrap sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 overflow-x-auto sm:overflow-x-visible pb-8 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
        {stayCategories.map((cat) => (
          <div key={cat.title} className="min-w-[240px] w-[70vw] sm:min-w-0 sm:w-auto flex-shrink-0 snap-start group cursor-pointer">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Badge for Nightly Price */}
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">{lang === 'en' ? 'From' : 'Desde'}</div>
                <div className="text-[15px] font-black text-brand-cobalt leading-none">
                  Kz {cat.price}<span className="text-[11px] text-gray-500 font-bold ml-0.5">/noite</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-extrabold text-[22px] tracking-tight leading-tight mb-1">{cat.title}</h3>
                <div className="text-white/90 text-[13px] font-bold">{cat.count} {lang === 'en' ? 'properties' : 'imóveis'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default StayBrowseGrid;
