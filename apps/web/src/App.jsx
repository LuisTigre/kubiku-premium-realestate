import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LiveHero from './features/realestate/components/LiveHero';
import PropertyBrowseGrid from './features/realestate/components/PropertyBrowseGrid';
import PropertyDetails from './features/realestate/pages/PropertyDetails';
import StayHero from './features/hospitality/components/StayHero';
import StayBrowseGrid from './features/hospitality/components/StayBrowseGrid';
import StayDetails from './features/hospitality/pages/StayDetails';
import MyBookings from './features/hospitality/pages/MyBookings';
import PartnerDashboard from './features/hospitality/pages/PartnerDashboard';
import AgentDashboard from './features/realestate/pages/AgentDashboard';
import LivePage from './features/realestate/pages/LivePage';
import BrowsePage from './features/realestate/pages/BrowsePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './features/auth/AuthContext';
import Logo from './components/ui/Logo';

import MobileNav from './components/layout/MobileNav';

// Wrapper to handle layout visibility based on route
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuth = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');
  const isPropertyDetail = location.pathname.startsWith('/property/');
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-cobalt/10 selection:text-brand-cobalt">
      {!isLanding && !isAuth && <Header />}
      
      <main className={`flex-grow ${!isPropertyDetail ? 'pb-20 md:pb-0' : ''}`}>
        {children}
      </main>

      {!isLanding && !isAuth && <Footer />}
      {!isAuth && !isPropertyDetail && <MobileNav />}
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
              <Route path="/live" element={<LivePage />} />
              <Route path="/browse" element={<BrowsePage />} />
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

export default App;
