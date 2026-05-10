import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, LayoutGrid, User, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const MobileNav = () => {
  const { lang } = useLanguage();

  const navItems = [
    { icon: Home, label: lang === 'en' ? 'Home' : 'Início', path: '/' },
    { icon: Search, label: lang === 'en' ? 'Explore' : 'Explorar', path: '/browse' },
    { icon: LayoutGrid, label: lang === 'en' ? 'Live' : 'Live', path: '/live' },
    { icon: User, label: lang === 'en' ? 'Profile' : 'Perfil', path: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 z-50 flex justify-between items-center safe-area-bottom">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-cobalt' : 'text-gray-400'}`}
        >
          <item.icon className="w-6 h-6 stroke-[2]" />
          <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
