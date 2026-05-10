import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import PropertyBrowseGrid from '../components/PropertyBrowseGrid';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const BrowsePage = () => {
    const { lang } = useLanguage();
    const [activeFilter, setActiveFilter] = useState(null);

    const t = {
        title: lang === 'en' ? 'Properties' : 'Imóveis',
        subtitle: lang === 'en' ? '124 results' : '124 resultados',
        filters: {
            price: lang === 'en' ? 'Price' : 'Preço',
            type: lang === 'en' ? 'Type' : 'Tipo',
            rooms: lang === 'en' ? 'Rooms' : 'Quartos',
            size: lang === 'en' ? 'Size' : 'Área',
        },
        allFilters: lang === 'en' ? 'Filters' : 'Filtros',
    };

    const filters = [
        { key: 'price', label: t.filters.price },
        { key: 'type', label: t.filters.type },
        { key: 'rooms', label: t.filters.rooms },
        { key: 'size', label: t.filters.size },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <main className="flex-grow">
                {/* Compact Sticky Filter Bar */}
                <div className="bg-white border-b border-gray-100 shadow-sm sticky top-[80px] z-40">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-5">
                        {/* Title Row */}
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h1 className="text-lg md:text-2xl font-black text-gray-900 leading-tight">
                                    {t.title}
                                </h1>
                                <p className="text-gray-400 font-bold text-[11px] md:text-xs uppercase tracking-widest mt-0.5">
                                    {t.subtitle}
                                </p>
                            </div>

                            {/* Mobile filter toggle */}
                            <button className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-700 active:scale-95 transition-transform">
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                {t.allFilters}
                            </button>
                        </div>

                        {/* Filter Pills — horizontal scroll on mobile, flex-wrap on desktop */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap pb-1 md:pb-0">
                            {filters.map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(activeFilter === filter.key ? null : filter.key)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] md:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 border ${
                                        activeFilter === filter.key
                                            ? 'bg-brand-cobalt text-white border-brand-cobalt shadow-md shadow-brand-cobalt/20'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 active:bg-gray-50'
                                    }`}
                                >
                                    {filter.label}
                                    {activeFilter === filter.key ? (
                                        <X className="w-3 h-3" />
                                    ) : (
                                        <ChevronDown className="w-3 h-3 text-gray-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 md:pb-12">
                    <PropertyBrowseGrid />
                </div>
            </main>
        </div>
    );
};

export default BrowsePage;
