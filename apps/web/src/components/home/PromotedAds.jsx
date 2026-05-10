import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const PromotedAds = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const ads = [
    { id: 1, price: '379,000 Kz', location: 'Talatona, Luanda', img: '/assets/new_listings.png', tag: 'Premium' },
    { id: 2, price: '450,000 Kz', location: 'Ilha do Cabo, Luanda', img: '/assets/recently_sold.png', tag: 'Exclusive' },
    { id: 3, price: '895,000 Kz', location: 'Kilamba, Luanda', img: '/assets/price_reduced.png', tag: 'Investment' },
    { id: 4, price: '215,000 Kz', location: 'Viana, Luanda', img: '/assets/open_houses.png', tag: 'New' },
  ];

  const handleAdClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {lang === 'en' ? 'Promoted ads' : 'Anúncios em destaque'}
            </h2>
            <div className="w-12 h-1 bg-brand-cobalt rounded-full"></div>
          </div>
          <button className="text-sm font-black text-brand-cobalt hover:text-brand-navy transition-colors uppercase tracking-widest flex items-center gap-2 group">
            {lang === 'en' ? 'View all' : 'Ver todos'}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {ads.map((ad) => (
            <div 
              key={ad.id} 
              onClick={() => handleAdClick(ad.id)}
              className="min-w-[300px] md:min-w-[340px] snap-start group cursor-pointer"
            >
              <div className="relative h-[240px] rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img src={ad.img} alt={ad.location} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-brand-cobalt shadow-sm">
                  {ad.tag}
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-brand-cobalt transition-colors">{ad.price}</h3>
                <p className="text-gray-500 font-bold text-sm flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {ad.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotedAds;
