import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import LiveHero from './features/realestate/components/LiveHero';
import LiveBrowseGrid from './features/realestate/components/LiveBrowseGrid';
import StayHero from './features/hospitality/components/StayHero';
import StayBrowseGrid from './features/hospitality/components/StayBrowseGrid';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './features/auth/AuthContext';
import Logo from './components/ui/Logo';

// Wrapper to handle layout visibility based on route
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuth = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-cobalt/10 selection:text-brand-cobalt">
      {!isLanding && !isAuth && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>

      {!isLanding && !isAuth && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/live" element={
                <>
                  <LiveHero />
                  <LiveBrowseGrid />
                  <CtaSection />
                </>
              } />
              <Route path="/stay" element={
                <>
                  <StayHero />
                  <StayBrowseGrid />
                  <CtaSection />
                </>
              } />
            </Routes>
          </AppLayout>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

const CtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-24">
      <div className="bg-[#1A1A2E] rounded-[3.5rem] p-20 text-white overflow-hidden relative group shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cobalt/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-brand-cobalt/20 group-hover:scale-125"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -ml-24 -mb-24"></div>
        
        <div className="max-w-3xl relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight font-display text-balance">
            {t.cta.title}
          </h2>
          <p className="text-white/60 text-xl md:text-2xl mb-12 font-medium leading-relaxed text-balance">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-wrap gap-5">
            <button className="bg-brand-cobalt hover:bg-brand-navy text-white px-12 py-5 rounded-full font-black text-lg transition-all shadow-[0_10px_30px_-10px_rgba(26,82,204,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(26,82,204,0.6)] transform hover:-translate-y-1 active:scale-95">
              {t.cta.button1}
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-full font-black text-lg transition-all backdrop-blur-md border border-white/10 hover:border-white/30">
              {t.cta.button2}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useLanguage();
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-20 mt-12">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-10 w-auto mb-6" />
            <p className="text-gray-500 text-lg max-w-sm leading-relaxed">
              {lang === 'en' 
                ? 'The most trusted platform for premium real estate discovery in Angola.' 
                : 'A plataforma mais fiável para a descoberta de imóveis premium em Angola.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{lang === 'en' ? 'Platform' : 'Plataforma'}</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'How it works' : 'Como funciona'}</a></li>
              <li><a href="#" className="hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Pricing' : 'Preços'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{lang === 'en' ? 'Support' : 'Suporte'}</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Help Center' : 'Centro de Ajuda'}</a></li>
              <li><a href="#" className="hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Contact' : 'Contacto'}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-400 tracking-tight">
          <div>&copy; {new Date().getFullYear()} Kubiku Angola.</div>
        </div>
      </div>
    </footer>
  );
};

export default App;
