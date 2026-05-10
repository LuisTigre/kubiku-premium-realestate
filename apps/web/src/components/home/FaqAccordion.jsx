import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FaqAccordion = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: lang === 'en' ? 'Is Kubiku safe to use?' : 'A Kubiku é segura para usar?',
      answer: lang === 'en' 
        ? 'Yes, we verify all primary market developers and premium listings to ensure the highest standards of safety and transparency.' 
        : 'Sim, verificamos todos os promotores do mercado primário e anúncios premium para garantir os mais elevados padrões de segurança e transparência.'
    },
    {
      question: lang === 'en' ? 'How can I list my property?' : 'Como posso anunciar o meu imóvel?',
      answer: lang === 'en'
        ? 'You can list your property by creating an account and selecting "Add Listing". We offer free and premium promotion options.'
        : 'Pode anunciar o seu imóvel criando uma conta e selecionando "Adicionar Anúncio". Oferecemos opções de promoção gratuitas e premium.'
    },
    {
      question: lang === 'en' ? 'Are there any hidden fees?' : 'Existem taxas ocultas?',
      answer: lang === 'en'
        ? 'No, our pricing model is transparent. Listing is free, and we only charge for premium visibility packages.'
        : 'Não, o nosso modelo de preços é transparente. Anunciar é gratuito e apenas cobramos por pacotes de visibilidade premium.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 text-center">
          {lang === 'en' ? 'Questions? Answers.' : 'Dúvidas? Respostas.'}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center gap-4"
              >
                <span className="text-lg font-black text-gray-900">{faq.question}</span>
                <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-brand-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
