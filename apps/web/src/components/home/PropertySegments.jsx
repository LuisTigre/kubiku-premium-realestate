import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const PropertySegments = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sale');

  const saleTypes = [
    { id: 'apts', name: lang === 'en' ? 'Apartments' : 'Apartamentos', img: '/assets/new_listings.png' },
    { id: 'houses', name: lang === 'en' ? 'Houses' : 'Casas', img: '/assets/recently_sold.png' },
    { id: 'plots', name: lang === 'en' ? 'Plots' : 'Terrenos', img: '/assets/plots_segment.png' },
    { id: 'comm', name: lang === 'en' ? 'Commercial premises' : 'Espaços comerciais', img: '/assets/commercial_segment.png' },
  ];

  const rentTypes = [
    { id: 'apts', name: lang === 'en' ? 'Apartments' : 'Apartamentos', img: '/assets/stay_landing.png' },
    { id: 'houses', name: lang === 'en' ? 'Houses' : 'Casas', img: '/assets/open_houses.png' },
    { id: 'rooms', name: lang === 'en' ? 'Rooms' : 'Quartos', img: '/assets/price_reduced.png' },
    { id: 'comm', name: lang === 'en' ? 'Commercial premises' : 'Espaços comerciais', img: '/assets/commercial_segment.png' },
  ];

  const currentTypes = activeTab === 'sale' ? saleTypes : rentTypes;

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-[#0B1A2A] mb-8">
          {lang === 'en' ? 'Types of real estate' : 'Tipos de imóveis'}
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button 
            onClick={() => setActiveTab('sale')}
            className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all duration-300 ${activeTab === 'sale' ? 'bg-[#1A2B3C] text-white shadow-lg' : 'bg-white text-[#1A2B3C] border border-gray-200 hover:bg-gray-50'}`}
          >
            {lang === 'en' ? 'For sale' : 'Para venda'}
          </button>
          <button 
            onClick={() => setActiveTab('rent')}
            className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all duration-300 ${activeTab === 'rent' ? 'bg-[#1A2B3C] text-white shadow-lg' : 'bg-white text-[#1A2B3C] border border-gray-200 hover:bg-gray-50'}`}
          >
            {lang === 'en' ? 'For rent' : 'Para alugar'}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTypes.map((type) => (
            <div 
              key={type.id} 
              onClick={() => navigate('/browse')}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={type.img} 
                  alt={type.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-black text-[#1A2B3C] group-hover:text-brand-cobalt transition-colors">
                  {type.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySegments;
