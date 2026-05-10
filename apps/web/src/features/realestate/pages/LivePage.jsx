import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Header from '../../../components/layout/Header';
import HeroSearch from '../../../components/home/HeroSearch';
import PromotedAds from '../../../components/home/PromotedAds';
import PropertySegments from '../../../components/home/PropertySegments';
import NewDevelopments from '../../../components/home/NewDevelopments';
import KnowledgeHub from '../../../components/home/KnowledgeHub';
import FaqAccordion from '../../../components/home/FaqAccordion';
import PopularLocations from '../../../components/home/PopularLocations';
import Footer from '../../../components/layout/Footer';

const LivePage = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Integration */}
      <Header />

      <main>
        {/* Section 1: Hero & Global Search */}
        <HeroSearch />

        {/* Section 2: Promoted Ads */}
        <PromotedAds />

        {/* Section 3: Property Type Segmentation */}
        <PropertySegments />

        {/* Section 4: Primary Market */}
        <NewDevelopments />

        {/* Section 5: Knowledge Hub */}
        <KnowledgeHub />

        {/* Section 6: FAQ Accordion */}
        <FaqAccordion />

        {/* Section 7: Popular Locations */}
        <PopularLocations />

        {/* Section 8: Fat Footer */}
        <Footer />

        {/* Floating Language Switcher */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex bg-white shadow-2xl border border-gray-100 rounded-full p-1.5 backdrop-blur-md">
            <button 
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-full text-[10px] font-black transition-all duration-300 ${lang === 'en' ? 'bg-brand-cobalt text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('pt')}
              className={`px-4 py-2 rounded-full text-[10px] font-black transition-all duration-300 ${lang === 'pt' ? 'bg-brand-cobalt text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              PT
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LivePage;
