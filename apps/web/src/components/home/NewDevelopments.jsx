import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const NewDevelopments = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cobalt/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-brand-cobalt text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 shadow-lg">
              {lang === 'en' ? 'Primary Market' : 'Mercado Primário'}
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
              {lang === 'en' ? 'Invest in the future of Angola' : 'Invista no futuro de Angola'}
            </h2>
            <p className="text-white/60 text-xl font-medium leading-relaxed mb-12 max-w-lg">
              {lang === 'en' 
                ? 'Discover exclusive new builds and modern developments with high ROI potential.' 
                : 'Descubra novos empreendimentos exclusivos e construções modernas com elevado potencial de ROI.'}
            </p>
            <button className="bg-white text-brand-navy px-10 py-5 rounded-full font-black text-lg transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 active:scale-95">
              {lang === 'en' ? 'View New Projects' : 'Ver Novos Projetos'}
            </button>
          </div>
          
          <div className="relative group">
            <div className="h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
              <img 
                src="/assets/live_landing.png" 
                alt="New Development" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl text-brand-navy max-w-xs transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-cobalt/10 flex items-center justify-center text-brand-cobalt text-2xl">🏗️</div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest">{lang === 'en' ? 'Phase 1' : 'Fase 1'}</h4>
                  <p className="text-gray-400 font-bold text-[10px]">{lang === 'en' ? '80% Sold' : '80% Vendido'}</p>
                </div>
              </div>
              <p className="font-black text-lg mb-2">Talatona Plaza</p>
              <div className="flex justify-between items-center">
                <span className="text-brand-cobalt font-black">15% ROI</span>
                <span className="text-gray-400 font-bold text-xs">Estimated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewDevelopments;
