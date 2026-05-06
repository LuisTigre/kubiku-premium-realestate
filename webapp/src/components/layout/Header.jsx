import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Logo from '../ui/Logo';

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentMode = location.pathname.startsWith('/stay') ? 'stay' : 'live';

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left side: Logo and Mode Switcher */}
        <div className="flex items-center space-x-8 xl:space-x-12">
          <Link className="flex-shrink-0 hover:opacity-80 transition-opacity" to="/" onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Mode Toggle */}
          <div className="hidden md:flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
            <Link
              to="/live"
              className={`px-5 py-2 rounded-xl text-[13px] font-black transition-all duration-300 flex items-center space-x-2 ${currentMode === 'live'
                  ? 'bg-white shadow-md text-brand-cobalt'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${currentMode === 'live' ? 'bg-brand-cobalt animate-pulse' : 'bg-gray-300'}`}></span>
              <span>{t.modes.live}</span>
            </Link>
            <Link
              to="/stay"
              className={`px-5 py-2 rounded-xl text-[13px] font-black transition-all duration-300 flex items-center space-x-2 ${currentMode === 'stay'
                  ? 'bg-white shadow-md text-brand-sapphire'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${currentMode === 'stay' ? 'bg-brand-sapphire animate-pulse' : 'bg-gray-300'}`}></span>
              <span>{t.modes.stay}</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[15px] font-semibold text-gray-800">
            {t.nav.map((link) => (
              <a
                key={link}
                className="px-3 py-2 rounded-xl hover:bg-gray-50 hover:text-brand-cobalt transition-all duration-200 whitespace-nowrap"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side: Tools and Auth */}
        <div className="flex items-center space-x-4 xl:space-x-6">
          {/* Secondary Nav for XL screens */}
          <div className="hidden xl:flex items-center space-x-6 text-[14px] font-bold text-gray-700 mr-4">
            <a className="hover:text-brand-cobalt transition-colors whitespace-nowrap" href="#">{t.auth.manage}</a>
            <a className="hover:text-brand-cobalt transition-colors whitespace-nowrap" href="#">{t.auth.advertise}</a>
          </div>

          <div className="h-6 w-px bg-gray-100 hidden xl:block mr-2"></div>

          {/* Premium Language Switcher (Desktop) */}
          <div className="hidden sm:flex bg-gray-50 border border-gray-100 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-full text-[13px] font-black transition-all duration-300 ${lang === 'en' ? 'bg-white shadow-sm text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('pt')}
              className={`px-3 py-1.5 rounded-full text-[13px] font-black transition-all duration-300 ${lang === 'pt' ? 'bg-white shadow-sm text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
            >
              PT
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-3 ml-2">
            <a className="px-5 py-2.5 text-[15px] font-bold text-gray-900 hover:text-[#1A52CC] transition-colors" href="#">{t.auth.login}</a>
            <a className="px-5 py-2.5 text-[15px] font-bold text-[#1A52CC] hover:text-[#0D2870] transition-colors" href="#">{t.auth.signup}</a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-50 relative"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10 overflow-y-auto">
          {/* Mobile Mode Switcher */}
          <div className="flex bg-gray-50 p-1.5 rounded-[2rem] border border-gray-100 mb-10 shadow-inner">
            <Link
              to="/live"
              onClick={() => setIsMenuOpen(false)}
              className={`flex-1 py-4 rounded-[1.5rem] text-[15px] font-black transition-all duration-300 flex items-center justify-center space-x-3 ${currentMode === 'live'
                  ? 'bg-white shadow-xl text-brand-cobalt'
                  : 'text-gray-400'
                }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${currentMode === 'live' ? 'bg-brand-cobalt animate-pulse' : 'bg-gray-300'}`}></span>
              <span>{t.modes.live}</span>
            </Link>
            <Link
              to="/stay"
              onClick={() => setIsMenuOpen(false)}
              className={`flex-1 py-4 rounded-[1.5rem] text-[15px] font-black transition-all duration-300 flex items-center justify-center space-x-3 ${currentMode === 'stay'
                  ? 'bg-white shadow-xl text-brand-sapphire'
                  : 'text-gray-400'
                }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${currentMode === 'stay' ? 'bg-brand-sapphire animate-pulse' : 'bg-gray-300'}`}></span>
              <span>{t.modes.stay}</span>
            </Link>
          </div>

          {/* Mobile Main Nav */}
          <nav className="flex flex-col space-y-2 mb-10">
            {t.nav.map((link) => (
              <a
                key={link}
                className="text-[24px] font-bold text-gray-900 hover:text-brand-cobalt transition-colors py-2 border-b border-gray-50"
                href="#"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile Secondary Nav */}
          <div className="flex flex-col space-y-4 mb-10 pt-6 border-t border-gray-100">
            <a className="text-[18px] font-bold text-gray-600 hover:text-brand-cobalt transition-colors" href="#">{t.auth.manage}</a>
            <a className="text-[18px] font-bold text-gray-600 hover:text-brand-cobalt transition-colors" href="#">{t.auth.advertise}</a>
          </div>

          {/* Mobile Footer/Auth */}
          <div className="mt-auto space-y-6">
            {/* Language Switcher Mobile */}
            <div className="flex bg-gray-50 border border-gray-100 rounded-2xl p-1.5 shadow-sm w-fit">
              <button
                onClick={() => setLang('en')}
                className={`px-6 py-2 rounded-xl text-[14px] font-black transition-all duration-300 ${lang === 'en' ? 'bg-white shadow-md text-brand-cobalt' : 'text-gray-400'}`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`px-6 py-2 rounded-xl text-[14px] font-black transition-all duration-300 ${lang === 'pt' ? 'bg-white shadow-md text-brand-cobalt' : 'text-gray-400'}`}
              >
                PORTUGUÊS
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <a className="w-full py-4 text-center text-[18px] font-bold text-gray-900 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all" href="#">{t.auth.login}</a>
              <a className="w-full py-4 text-center text-[18px] font-bold text-white bg-brand-cobalt rounded-2xl hover:bg-brand-navy shadow-lg shadow-brand-cobalt/20 transition-all" href="#">{t.auth.signup}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
