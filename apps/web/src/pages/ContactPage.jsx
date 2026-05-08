import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
    const { lang } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate API call
        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="h-24"></div>
            
            {/* Header Section */}
            <div className="bg-gray-50 py-24 border-b border-gray-100">
                <div className="max-w-[1440px] mx-auto px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-black text-gray-900 tracking-tight mb-8 leading-tight">
                            {lang === 'en' ? "Let's connect and build the future of living." : "Vamos conectar e construir o futuro do habitar."}
                        </h1>
                        <p className="text-xl text-gray-500 font-bold leading-relaxed">
                            {lang === 'en' 
                                ? "Whether you're looking for a premium stay or a lifetime investment, our dedicated team is here to guide you." 
                                : "Quer esteja à procura de uma estadia premium ou de um investimento para a vida, a nossa equipa dedicada está aqui para o guiar."}
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="space-y-16">
                        <div>
                            <h3 className="text-[11px] font-black text-brand-cobalt uppercase tracking-[0.2em] mb-6">HQ Address</h3>
                            <p className="text-3xl font-black text-gray-900 leading-tight">
                                Edifício Sky Center, Piso 4<br />
                                Luanda, Angola
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black text-brand-cobalt uppercase tracking-[0.2em] mb-6">Contact Details</h3>
                            <div className="space-y-4">
                                <p className="text-2xl font-black text-gray-900">hello@kubiku.ao</p>
                                <p className="text-2xl font-black text-gray-900">+244 923 000 000</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black text-brand-cobalt uppercase tracking-[0.2em] mb-6">Social</h3>
                            <div className="flex gap-8">
                                {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                                    <a key={social} href="#" className="text-lg font-black text-gray-400 hover:text-brand-cobalt transition-colors">{social}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-4">{lang === 'en' ? 'Message Sent!' : 'Mensagem Enviada!'}</h2>
                                <p className="text-gray-500 font-bold">{lang === 'en' ? "We'll get back to you within 24 hours." : "Entraremos em contacto consigo em 24 horas."}</p>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="mt-12 text-brand-cobalt font-black uppercase tracking-widest text-sm hover:underline"
                                >
                                    {lang === 'en' ? 'Send another message' : 'Enviar outra mensagem'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input 
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                    <select 
                                        value={formData.subject}
                                        onChange={e => setFormData({...formData, subject: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all cursor-pointer"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Property Listing</option>
                                        <option>Stay Partnership</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea 
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={sending}
                                    className="w-full bg-brand-cobalt text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-brand-cobalt/20 hover:bg-brand-navy transition-all disabled:opacity-50"
                                >
                                    {sending ? 'Sending...' : (lang === 'en' ? 'Send Message' : 'Enviar Mensagem')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
