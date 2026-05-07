import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/ui/Logo';

const LandingPage = () => {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      {/* Top Bar: Language Switcher */}
      <div className="absolute top-8 right-8 z-50">
        <div className="flex bg-gray-50 border border-gray-100 rounded-full p-1 shadow-sm">
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-black transition-all duration-300 ${lang === 'en' ? 'bg-white shadow-md text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('pt')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-black transition-all duration-300 ${lang === 'pt' ? 'bg-white shadow-md text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-brand-cobalt/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-sapphire/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="mb-12 scale-125">
        <Logo />
      </div>

      <div className="max-w-5xl w-full text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight font-display text-balance leading-[1.1]">
          {t.landing.title.split('KUBIKU').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="text-[#3A7AFF]">KUBIKU</span>}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-gray-600 text-xl md:text-2xl font-medium tracking-tight">
          {t.landing.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10">
        {/* LIVE Card */}
        <Link 
          to="/live" 
          className="group relative h-[480px] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
        >
          <img 
            src="/assets/live_landing.png" 
            alt={t.landing.live.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-12 left-10 right-10">
            <div className="inline-block px-4 py-1.5 bg-brand-cobalt text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg">
              KUBIKU LIVE
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow-xl">{t.landing.live.title}</h2>
            <p className="text-white text-lg font-medium leading-relaxed mb-8 max-w-[280px] drop-shadow-md">
              {t.landing.live.desc}
            </p>
            <div className="flex items-center text-white font-black text-sm uppercase tracking-widest group/btn">
              <span className="mr-3 border-b-2 border-white/20 group-hover/btn:border-white transition-all pb-1">{t.landing.live.button}</span>
              <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </Link>

        {/* STAY Card */}
        <Link 
          to="/stay" 
          className="group relative h-[480px] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
        >
          <img 
            src="/assets/stay_landing.png" 
            alt={t.landing.stay.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-12 left-10 right-10">
            <div className="inline-block px-4 py-1.5 bg-brand-sapphire text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg">
              KUBIKU STAY
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow-xl">{t.landing.stay.title}</h2>
            <p className="text-white text-lg font-medium leading-relaxed mb-8 max-w-[280px] drop-shadow-md">
              {t.landing.stay.desc}
            </p>
            <div className="flex items-center text-white font-black text-sm uppercase tracking-widest group/btn">
              <span className="mr-3 border-b-2 border-white/20 group-hover/btn:border-white transition-all pb-1">{t.landing.stay.button}</span>
              <svg className="h-6 w-6 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer minimal info */}
      <div className="mt-16 text-gray-400 text-[10px] font-bold tracking-widest uppercase opacity-40">
        &copy; {new Date().getFullYear()} KUBIKU ANGOLA &bull; PREMIUM REAL ESTATE
      </div>
    </div>
  );
};

export default LandingPage;
