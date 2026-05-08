import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = React.useState(() => {
    // 1. Check local storage
    const saved = localStorage.getItem('kubiku_lang');
    if (saved && (saved === 'en' || saved === 'pt')) return saved;

    // 2. Guess from browser
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('pt')) return 'pt';

    // 3. Default
    return 'en';
  });

  // Persist language choice
  React.useEffect(() => {
    localStorage.setItem('kubiku_lang', lang);
  }, [lang]);

  const translations = {
    en: {
      modes: { live: 'LIVE', stay: 'STAY' },
      navLive: ['Buy', 'Sell', 'Rent'],
      navStay: ['Hotels', 'Apartments', 'Guesthouses', 'Hostels'],
      hero: {
        title: 'Find a place to live...',
        tabs: ['Buy', 'Rent', 'Sell'],
        placeholder: 'Neighborhood, City, or Condo in Luanda...',
        search: 'Search'
      },
      stay: {
        title: 'Find a place to stay...',
        tabs: ['🏨 Hotels', '🏠 Guest Houses', '🏢 Apartments', '🛏️ Rooms'],
        placeholder: 'Where are you going? (e.g. Talatona, Ilha)',
        search: 'Search Stays'
      },
      landing: {
        title: 'KUBIKU has the solution for you',
        subtitle: 'What are you looking for today?',
        stay: {
          title: 'Find a place to stay',
          desc: 'Short-term rentals, vacation stays, and unique local experiences.',
          button: 'Explore Stays'
        },
        live: {
          title: 'Find a place to live',
          desc: 'Buy or rent premium homes, luxury condos, and long-term residences.',
          button: 'Get Started'
        }
      },
      browse: {
        title: 'Browse homes in Luanda, Angola',
        subtitle: 'Discover premium properties in Talatona, Kilamba, and the stunning Ilha do Cabo.',
        explore: 'Explore all categories',
        categories: [
          { title: 'New Listings', count: 42 },
          { title: 'Luxury Condos', count: 18 },
          { title: 'Open Houses', count: 5 },
          { title: 'Talatona Rentals', count: 89 }
        ]
      },
      cta: {
        title: 'Selling your home? Find the best experts in Luanda.',
        subtitle: 'We matched you with premium agents in Luanda. Enter your address to review and compare agents.',
        button1: 'Compare agents',
        button2: 'Learn more'
      },
      auth: {
        manage: 'Manage',
        advertise: 'Advertise',
        login: 'Log in',
        signup: 'Sign up',
        email: 'Email Address',
        password: 'Password',
        fullName: 'Full Name',
        forgotPassword: 'Forgot password?',
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: 'Already have an account?',
        signInButton: 'Sign In',
        signUpButton: 'Create Account',
        loginTitle: 'Welcome back',
        registerTitle: 'Create your account',
        loginSubtitle: 'Enter your credentials to access your premium dashboard.',
        registerSubtitle: 'Join the most exclusive real estate community in Angola.',
        error: 'Authentication failed. Please check your credentials.',
        success: 'Welcome to Kubiku!'
      },
      footer: {
        tagline: 'The most trusted platform for premium real estate discovery in Angola.',
        sections: [
          { title: 'Platform', links: ['How it works', 'Pricing'] },
          { title: 'Support', links: ['Help Center', 'Contact'] }
        ]
      }
    },
    pt: {
      modes: { live: 'MORAR', stay: 'HOSPEDAR' },
      navLive: ['Comprar', 'Vender', 'Alugar'],
      navStay: ['Hotéis', 'Apartamentos', 'Pousadas', 'Hostels'],
      hero: {
        title: 'Encontre um lugar para morar...',
        tabs: ['Comprar', 'Alugar', 'Vender'],
        placeholder: 'Bairro, Cidade ou Condomínio em Luanda...',
        search: 'Pesquisar'
      },
      stay: {
        title: 'Encontre um lugar para se hospedar...',
        tabs: ['🏨 Hotéis', '🏠 Pousadas', '🏢 Apartamentos', '🛏️ Quartos'],
        placeholder: 'Para onde vai? (ex: Talatona, Ilha)',
        search: 'Pesquisar Estadias'
      },
      landing: {
        title: 'A KUBIKU tem solução para si',
        subtitle: 'O que procura hoje?',
        stay: {
          title: 'Encontre um lugar para se hospedar',
          desc: 'Alugueres de curta duração, estadias de férias e experiências locais.',
          button: 'Explorar Estadias'
        },
        live: {
          title: 'Encontre um lugar para morar',
          desc: 'Compre ou alugue casas de luxo, apartamentos e residências de longo prazo.',
          button: 'Começar Agora'
        }
      },
      browse: {
        title: 'Ver casas em Luanda, Angola',
        subtitle: 'Descubra propriedades exclusivas em Talatona, Kilamba e na deslumbrante Ilha do Cabo.',
        explore: 'Ver todas as categorias',
        categories: [
          { title: 'Novos Imóveis', count: 42 },
          { title: 'Condomínios de Luxo', count: 18 },
          { title: 'Casas Abertas', count: 5 },
          { title: 'Alugueres em Talatona', count: 89 }
        ]
      },
      cta: {
        title: 'Quer vender a sua casa? Encontre os melhores especialistas em Luanda.',
        subtitle: 'Encontrámos os melhores agentes em Luanda para si. Introduza a sua morada para comparar agentes.',
        button1: 'Comparar agentes',
        button2: 'Saber mais'
      },
      auth: {
        manage: 'Gestão',
        advertise: 'Anunciar',
        login: 'Entrar',
        signup: 'Registar',
        email: 'Endereço de Email',
        password: 'Palavra-passe',
        fullName: 'Nome Completo',
        forgotPassword: 'Esqueceu a palavra-passe?',
        dontHaveAccount: 'Não tem uma conta?',
        alreadyHaveAccount: 'Já tem uma conta?',
        signInButton: 'Entrar',
        signUpButton: 'Criar Conta',
        loginTitle: 'Bem-vindo de volta',
        registerTitle: 'Crie a sua conta',
        loginSubtitle: 'Introduza as suas credenciais para aceder ao seu dashboard premium.',
        registerSubtitle: 'Junte-se à comunidade imobiliária mais exclusiva de Angola.',
        error: 'Falha na autenticação. Por favor verifique as suas credenciais.',
        success: 'Bem-vindo à Kubiku!'
      },
      footer: {
        tagline: 'A plataforma mais fiável para a descoberta de imóveis premium em Angola.',
        sections: [
          { title: 'Plataforma', links: ['Como funciona', 'Preços'] },
          { title: 'Suporte', links: ['Centro de Ajuda', 'Contacto'] }
        ]
      }
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
