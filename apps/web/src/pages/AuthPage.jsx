import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/ui/Logo';

const AuthPage = () => {
  const { t, lang, setLang } = useLanguage();
  const { login, register, authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine mode from path or state
  const isLoginMode = location.pathname.includes('/login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (authenticated) {
      navigate('/live');
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError(lang === 'en' ? 'Password must be at least 6 characters.' : 'A palavra-passe deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await register(email, password, { full_name: fullName });
      }
      // Success is handled by the useEffect redirect
    } catch (err) {
      console.error(err);
      setError(err.message || t.auth.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      {/* Language Switcher */}
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
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-brand-cobalt/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-brand-sapphire/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
            <Logo className="h-10 w-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {isLoginMode ? t.auth.loginTitle : t.auth.registerTitle}
          </h1>
          <p className="text-gray-500 font-medium tracking-tight">
            {isLoginMode ? t.auth.loginSubtitle : t.auth.registerSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div>
                <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  {t.auth.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-cobalt/10 focus:border-brand-cobalt focus:bg-white transition-all outline-none font-medium text-gray-900"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                {t.auth.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-cobalt/10 focus:border-brand-cobalt focus:bg-white transition-all outline-none font-medium text-gray-900"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest">
                  {t.auth.password}
                </label>
                {isLoginMode && (
                  <a href="#" className="text-[12px] font-bold text-brand-cobalt hover:underline">
                    {t.auth.forgotPassword}
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-cobalt/10 focus:border-brand-cobalt focus:bg-white transition-all outline-none font-medium text-gray-900"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-500 text-sm font-bold rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-brand-cobalt hover:bg-brand-navy text-white font-black rounded-2xl shadow-xl shadow-brand-cobalt/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLoginMode ? t.auth.signInButton : t.auth.signUpButton
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-bold tracking-tight">
              {isLoginMode ? t.auth.dontHaveAccount : t.auth.alreadyHaveAccount}{' '}
              <Link 
                to={isLoginMode ? '/register' : '/login'} 
                className="text-brand-cobalt hover:underline"
                onClick={() => setError('')}
              >
                {isLoginMode ? t.auth.signup : t.auth.login}
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-gray-400 text-[10px] font-bold tracking-widest uppercase opacity-40">
        &copy; {new Date().getFullYear()} KUBIKU ANGOLA &bull; PREMIUM AUTHENTICATION
      </div>
    </div>
  );
};

export default AuthPage;
