import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const KnowledgeHub = () => {
  const { lang } = useLanguage();

  const articles = [
    {
      id: 1,
      title: lang === 'en' ? 'Agent Trust Code 2.0 – Credibility sells faster than price' : 'Código de Confiança do Agente 2.0 – Credibilidade vende mais rápido que o preço',
      date: '8/05/2026',
      img: '/assets/stay_landing.png'
    },
    {
      id: 2,
      title: lang === 'en' ? 'How to Get Rid of Snails from Your Garden? Proven (and Natural) Methods' : 'Como se livrar dos caracóis do seu jardim? Métodos comprovados (e naturais)',
      date: '5/05/2026',
      img: '/assets/recently_sold.png'
    },
    {
      id: 3,
      title: lang === 'en' ? 'Luanda under Kz 2,000,000 per square meter. Record apartment prices in April.' : 'Luanda abaixo de 2.000.000 Kz por metro quadrado. Preços recordes de apartamentos em Abril.',
      date: '30/04/2026',
      img: '/assets/live_landing.png'
    },
    {
      id: 4,
      title: lang === 'en' ? 'Barbecuing on the Balcony – What\'s Allowed and What\'s Not? A Legal Guide' : 'Churrasco na Varanda – O que é permitido e o que não é? Um guia jurídico',
      date: '30/04/2026',
      img: '/assets/open_houses.png'
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#0B1A2A]">
              {lang === 'en' ? 'Latest articles' : 'Artigos recentes'}
            </h2>
            <a href="#" className="text-[#1A2B3C] font-black underline underline-offset-8 hover:text-brand-cobalt transition-colors">
              {lang === 'en' ? 'View All' : 'Ver Todos'}
            </a>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all text-[#1A2B3C]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all text-[#1A2B3C]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm font-bold">{article.date}</span>
                </div>
                <h3 className="text-base font-black text-[#1A2B3C] group-hover:text-brand-cobalt transition-colors leading-snug line-clamp-3">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
