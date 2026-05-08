import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import LiveHero from './features/realestate/components/LiveHero';
import PropertyBrowseGrid from './features/realestate/components/PropertyBrowseGrid';
import PropertyDetails from './features/realestate/pages/PropertyDetails';
import StayHero from './features/hospitality/components/StayHero';
import StayBrowseGrid from './features/hospitality/components/StayBrowseGrid';
import StayDetails from './features/hospitality/pages/StayDetails';
import MyBookings from './features/hospitality/pages/MyBookings';
import PartnerDashboard from './features/hospitality/pages/PartnerDashboard';
import AgentDashboard from './features/realestate/pages/AgentDashboard';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
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
                <div className="bg-white">
                  <LiveHero />
                  <div className="max-w-[1440px] mx-auto px-8">
                    <PropertyBrowseGrid />
                  </div>
                  <CtaSection />
                </div>
              } />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/stay" element={
                <>
                  <StayHero />
                  <StayBrowseGrid />
                  <CtaSection />
                </>
              } />
               <Route path="/stay/:id" element={<StayDetails />} />
               <Route path="/my-bookings" element={<MyBookings />} />
               <Route path="/dashboard" element={<PartnerDashboard />} />
               <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
             </Routes>
          </AppLayout>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

const CtaSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
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
            <button 
              onClick={() => navigate('/register')}
              className="bg-brand-cobalt hover:bg-brand-navy text-white px-12 py-5 rounded-full font-black text-lg transition-all shadow-[0_10px_30px_-10px_rgba(26,82,204,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(26,82,204,0.6)] transform hover:-translate-y-1 active:scale-95"
            >
              {t.cta.button1}
            </button>
            <button 
              onClick={() => navigate('/stay')}
              className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-full font-black text-lg transition-all backdrop-blur-md border border-white/10 hover:border-white/30"
            >
              {t.cta.button2}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <Logo className="h-10 w-auto mb-8" />
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
              {lang === 'en' 
                ? 'Redefining real estate and hospitality across Angola with premium discovery and seamless management.' 
                : 'Redefinindo o imobiliário e a hospitalidade em Angola com descoberta premium e gestão sem falhas.'}
            </p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-cobalt hover:text-white transition-all cursor-pointer">
                   <div className="w-4 h-4 bg-current rounded-sm"></div>
                 </div>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Marketplace' : 'Mercado'}
            </h4>
            <ul className="space-y-4">
              {['Live', 'Stay', 'Invest', 'Premium'].map(item => (
                <li key={item}>
                  <button 
                    onClick={() => navigate(`/${item.toLowerCase()}`)}
                    className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Company' : 'Empresa'}
            </h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('/contact')} className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'About Us' : 'Sobre Nós'}</button></li>
              <li><button onClick={() => navigate('/contact')} className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Contact' : 'Contacto'}</button></li>
              <li><button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Careers' : 'Carreiras'}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Support' : 'Suporte'}
            </h4>
            <ul className="space-y-4">
              <li><button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Help Center' : 'Centro de Ajuda'}</button></li>
              <li><button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Terms of Service' : 'Termos de Serviço'}</button></li>
              <li><button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{lang === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-sm tracking-tight">
            &copy; {new Date().getFullYear()} Kubiku Group. {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </p>
          <div className="flex gap-8">
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Designed in Luanda</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
