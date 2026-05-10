import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PropertyBrowseGrid from '../components/PropertyBrowseGrid';

const BrowsePage = () => {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans pt-20">
            <main className="flex-grow">
                {/* Results Header / Filters */}
                <div className="bg-white border-b border-gray-100 shadow-sm sticky top-20 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl font-black text-gray-900">
                                    {lang === 'en' ? 'Property Search Results' : 'Resultados da Pesquisa de Imóveis'}
                                </h1>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                                    {lang === 'en' ? 'Found 124 properties' : 'Encontrados 124 imóveis'}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                {['Price', 'Type', 'Rooms', 'Size'].map((filter) => (
                                    <button key={filter} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black text-gray-700 hover:bg-white hover:border-brand-cobalt transition-all flex items-center gap-2">
                                        {filter}
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <PropertyBrowseGrid />
                </div>
            </main>
        </div>
    );
};

export default BrowsePage;
