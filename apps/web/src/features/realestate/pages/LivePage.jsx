import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import HeroSearch from '../../../components/home/HeroSearch';
import PromotedAds from '../../../components/home/PromotedAds';
import PropertySegments from '../../../components/home/PropertySegments';
import NewDevelopments from '../../../components/home/NewDevelopments';
import KnowledgeHub from '../../../components/home/KnowledgeHub';
import FaqAccordion from '../../../components/home/FaqAccordion';
import PopularLocations from '../../../components/home/PopularLocations';

const LivePage = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
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
      </main>
    </div>
  );
};

export default LivePage;
