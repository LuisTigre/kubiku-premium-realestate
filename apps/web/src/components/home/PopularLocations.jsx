import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PopularLocations = () => {
  const { lang } = useLanguage();

  const locations = [
    { id: 1, name: 'Talatona', count: '450', img: '/assets/recently_sold.png' },
    { id: 2, name: 'Ilha do Cabo', count: '120', img: '/assets/hero.png' },
    { id: 3, name: 'Kilamba', count: '310', img: '/assets/live_landing.png' },
    { id: 4, name: 'Mussulo', count: '85', img: '/assets/stay_landing.png' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            {lang === 'en' ? 'Popular' : 'Popular'} <br />
            <span className="text-brand-cobalt">{lang === 'en' ? 'Locations' : 'Localizações'}</span>
          </h2>
          <p className="text-gray-400 font-bold text-right hidden md:block">
            {lang === 'en' ? 'Find your spot in the city' : 'Encontre o seu lugar na cidade'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div key={loc.id} className="group relative h-[300px] rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <img src={loc.img} alt={loc.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-brand-cobalt transition-colors">{loc.name}</h3>
                <p className="text-white/60 font-bold text-xs uppercase tracking-widest">
                  {loc.count} {lang === 'en' ? 'properties' : 'imóveis'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;
