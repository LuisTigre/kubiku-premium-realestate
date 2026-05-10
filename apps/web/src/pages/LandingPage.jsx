import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/ui/Logo';

const LandingPage = () => {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Premium Language Toggle (Fixed Top) */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex bg-white/80 backdrop-blur-md border border-gray-100 rounded-full p-1 shadow-xl">
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-tighter transition-all duration-300 ${lang === 'en' ? 'bg-brand-cobalt text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('pt')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-tighter transition-all duration-300 ${lang === 'pt' ? 'bg-brand-cobalt text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-20 md:py-32 relative">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] bg-brand-cobalt/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-brand-sapphire/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Logo className="scale-[1.5] md:scale-[2]" />
        </div>

        <div className="max-w-4xl w-full text-center mb-16 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <h1 className="text-4xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight font-display text-balance leading-[1] md:leading-[0.9]">
            {t.landing.title.split('KUBIKU').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && <span className="text-brand-cobalt inline-block transform hover:scale-110 transition-transform">KUBIKU</span>}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-gray-500 text-lg md:text-2xl font-medium tracking-tight max-w-2xl mx-auto">
            {t.landing.subtitle}
          </p>
        </div>

        {/* Dynamic Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl relative z-10 px-4 md:px-0">
          {/* LIVE Card */}
          <Link 
            to="/live" 
            className="group relative h-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01] hover:-translate-y-2 border border-white/20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500"
          >
            <img 
              src="/assets/live_landing.png" 
              alt={t.landing.live.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-10 left-8 right-8 md:bottom-12 md:left-12">
              <div className="inline-flex items-center px-4 py-1.5 bg-brand-cobalt text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                KUBIKU LIVE
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-[1.1] drop-shadow-2xl">{t.landing.live.title}</h2>
              <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-[280px] group-hover:text-white transition-colors">
                {t.landing.live.desc}
              </p>
              <div className="flex items-center text-white font-black text-xs md:text-sm uppercase tracking-widest group/btn">
                <span className="mr-3 border-b-2 border-white/20 group-hover/btn:border-white transition-all pb-1">{t.landing.live.button}</span>
                <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-brand-cobalt transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* STAY Card */}
          <Link 
            to="/stay" 
            className="group relative h-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01] hover:-translate-y-2 border border-white/20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700"
          >
            <img 
              src="/assets/stay_landing.png" 
              alt={t.landing.stay.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2A]/95 via-[#0B1A2A]/40 to-transparent"></div>
            
            <div className="absolute bottom-10 left-8 right-8 md:bottom-12 md:left-12">
              <div className="inline-flex items-center px-4 py-1.5 bg-brand-sapphire text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                KUBIKU STAY
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-[1.1] drop-shadow-2xl">{t.landing.stay.title}</h2>
              <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-[280px] group-hover:text-white transition-colors">
                {t.landing.stay.desc}
              </p>
              <div className="flex items-center text-white font-black text-xs md:text-sm uppercase tracking-widest group/btn">
                <span className="mr-3 border-b-2 border-white/20 group-hover/btn:border-white transition-all pb-1">{t.landing.stay.button}</span>
                <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-brand-sapphire transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Modern Footer Minimal */}
      <footer className="py-12 border-t border-gray-50 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
          <div className="text-gray-900 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} KUBIKU ANGOLA</span>
            <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
            <span>PREMIUM REAL ESTATE</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black tracking-widest uppercase">
            <a href="#" className="hover:text-brand-cobalt transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-cobalt transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-cobalt transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
