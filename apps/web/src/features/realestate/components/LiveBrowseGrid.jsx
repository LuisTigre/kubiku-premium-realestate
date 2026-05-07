import React from 'react';
import ListingCard from '../../../components/ui/ListingCard';
import { useLanguage } from '../../../context/LanguageContext';

const BrowseGrid = () => {
  const { t } = useLanguage();

  const categories = t.browse.categories.map((cat, index) => {
    const images = [
      '/assets/new_listings.png',
      '/assets/price_reduced.png',
      '/assets/open_houses.png',
      '/assets/recently_sold.png'
    ];
    return { ...cat, image: images[index] || images[0] };
  });

  return (
    <main className="max-w-[1440px] mx-auto px-6 sm:px-8 py-10 -mt-24 relative z-20">
      <div className="flex items-end justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="text-[24px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight font-display mb-2">
            {t.browse.title}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed">
            {t.browse.subtitle}
          </p>
        </div>
        <button className="hidden md:flex items-center space-x-2 text-brand-cobalt font-bold hover:text-brand-navy transition-all group pb-1 border-b-2 border-brand-cobalt/10 hover:border-brand-cobalt">
          <span>{t.browse.explore}</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <div className="flex flex-nowrap sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 overflow-x-auto sm:overflow-x-visible pb-8 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <div key={cat.title} className="min-w-[240px] w-[70vw] sm:min-w-0 sm:w-auto flex-shrink-0 snap-start">
            <ListingCard
              title={cat.title}
              count={cat.count}
              image={cat.image}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrowseGrid;
