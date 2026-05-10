import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Logo from '../ui/Logo';

const Footer = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <Logo className="h-10 w-auto mb-8" />
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 max-w-sm">
              {lang === 'en' 
                ? 'The most advanced real estate and hospitality platform in Angola. We connect people with premium spaces.' 
                : 'A plataforma imobiliária e de hospitalidade mais avançada de Angola. Ligamos pessoas a espaços premium.'}
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-cobalt hover:text-white transition-all cursor-pointer shadow-sm">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Listings' : 'Anúncios'}
            </h4>
            <ul className="space-y-4">
              {['Apartments', 'Houses', 'Plots', 'Commercial', 'New Developments'].map(item => (
                <li key={item}>
                  <button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Regions' : 'Regiões'}
            </h4>
            <ul className="space-y-4">
              {['Luanda', 'Talatona', 'Lubango', 'Benguela', 'Lobito'].map(item => (
                <li key={item}>
                  <button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
              {lang === 'en' ? 'Company' : 'Empresa'}
            </h4>
            <ul className="space-y-4">
              {['About Us', 'Contact', 'Blog', 'Careers', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <button className="text-gray-600 font-bold hover:text-brand-cobalt transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-sm tracking-tight">
            &copy; {new Date().getFullYear()} Kubiku Group. {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </p>
          <div className="flex gap-8">
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Luanda, Angola</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Live System</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
