import React, { useState } from 'react';
import { PropertyService } from '../services/PropertyService';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';

const LeadForm = ({ propertyId, agentName }) => {
    const { session } = useAuth();
    const { lang } = useLanguage();
    
    const t = {
        title: lang === 'en' ? 'Interested in this property?' : 'Interessado neste imóvel?',
        subtitle: lang === 'en' ? 'Send a message to our agent' : 'Envie uma mensagem ao nosso agente',
        name: lang === 'en' ? 'Full Name' : 'Nome Completo',
        email: lang === 'en' ? 'Email' : 'E-mail',
        phone: lang === 'en' ? 'Phone' : 'Telefone',
        message: lang === 'en' ? 'Message' : 'Mensagem',
        placeholderMessage: lang === 'en' 
            ? 'Hello, I am interested in this property and would like to receive more information. Thank you!'
            : 'Olá, estou interessado neste imóvel e gostaria de receber mais informações. Obrigado!',
        button: lang === 'en' ? 'Send Message' : 'Enviar Mensagem',
        sending: lang === 'en' ? 'Sending...' : 'Enviando...',
        successTitle: lang === 'en' ? 'Sent!' : 'Enviado!',
        successSub: lang === 'en' 
            ? 'Our agent will contact you soon.'
            : 'O nosso agente entrará em contacto brevemente.',
        terms: lang === 'en'
            ? 'By sending, you agree to our terms.'
            : 'Ao enviar, você concorda com os nossos termos.'
    };

    const [formData, setFormData] = useState({
        contactName: session?.user?.user_metadata?.full_name || '',
        contactEmail: session?.user?.email || '',
        contactPhone: '',
        message: t.placeholderMessage
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await PropertyService.submitLead({
                ...formData,
                propertyId
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-black text-[#1A2B3C] mb-2">{t.successTitle}</h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed">{t.successSub}</p>
                <button 
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-brand-cobalt font-black text-[10px] uppercase tracking-widest hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
            <div className="mb-8">
                <h3 className="text-xl font-black text-[#1A2B3C] mb-1">{t.title}</h3>
                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{t.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.name}</label>
                    <input 
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-black text-[#1A2B3C] text-sm"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.email}</label>
                        <input 
                            type="email"
                            required
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-black text-[#1A2B3C] text-sm"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.phone}</label>
                        <input 
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-black text-[#1A2B3C] text-sm"
                            placeholder="+244..."
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.message}</label>
                    <textarea 
                        rows="3"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-black text-[#1A2B3C] text-sm resize-none"
                    ></textarea>
                </div>

                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}

                <button 
                    disabled={loading}
                    className="w-full bg-brand-cobalt text-white py-4 rounded-2xl font-black text-sm hover:bg-[#1A2B3C] transition-all shadow-lg shadow-brand-cobalt/20 active:scale-[0.98] disabled:opacity-50 mt-4 uppercase tracking-widest"
                >
                    {loading ? t.sending : t.button}
                </button>
                <p className="text-[9px] text-center text-gray-300 font-black px-4 leading-tight">
                    {t.terms}
                </p>
            </form>
        </div>
    );
};

export default LeadForm;
