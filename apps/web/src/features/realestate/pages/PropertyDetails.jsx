import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';
import { useLanguage } from '../../../context/LanguageContext';
import LeadForm from '../components/LeadForm';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loanAmount, setLoanAmount] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await PropertyService.getPropertyById(id);
                if (data && data.listing) {
                    setProperty(data);
                    setLoanAmount(data.price || 0);
                } else {
                    throw new Error('Property not found');
                }
            } catch (err) {
                console.warn('Backend fetch failed, using mock data for visual demo:', err);
                const mockProperty = {
                    id: id,
                    price: 49500000,
                    promoted: true,
                    listing: {
                        title: lang === 'en' ? 'Modern 3-Bedroom Apartment with Terrace' : 'Apartamento Moderno T3 com Terraço',
                        locationName: 'Talatona, Luanda',
                        description: lang === 'en' 
                            ? 'Stunning, fully equipped 3-room apartment (90 m²) with a large balcony (12 m²). Apartment is located in the luxury Talatona Sands district. High ceiling (2.8m), floor-to-ceiling windows, and premium finishes throughout.'
                            : 'Deslumbrante apartamento de 3 assoalhadas (90 m²) totalmente equipado com uma grande varanda (12 m²). O apartamento está localizado no luxuoso distrito de Talatona Sands. Pé direito alto (2.8m), janelas do chão ao teto e acabamentos premium em toda a parte.',
                        images: JSON.stringify([
                            '/assets/new_listings.png',
                            '/assets/recently_sold.png',
                            '/assets/price_reduced.png',
                            '/assets/open_houses.png',
                            '/assets/hero.png'
                        ])
                    },
                    propertyFeatures: JSON.stringify({
                        beds: 3,
                        baths: 2,
                        sqft: 90,
                        floor: 4,
                        totalFloors: 12,
                        yearBuilt: 2022,
                        type: lang === 'en' ? 'Apartment' : 'Apartamento',
                        condition: lang === 'en' ? 'New' : 'Novo',
                        availableFrom: '2024-06-01'
                    }),
                    agent: {
                        fullName: 'Isabel dos Santos',
                        phone: '+244 923 000 000',
                        email: 'isabel@kubiku.co.ao',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=agent'
                    }
                };
                setProperty(mockProperty);
                setLoanAmount(mockProperty.price);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, lang]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black text-xs uppercase tracking-widest animate-pulse">Loading Premium Property...</p>
            </div>
        </div>
    );

    const images = typeof property.listing.images === 'string' ? JSON.parse(property.listing.images) : property.listing.images || [];
    const features = typeof property.propertyFeatures === 'string' ? JSON.parse(property.propertyFeatures) : property.propertyFeatures || {};

    // Fallback image helper using local asset
    const handleImageError = (e) => {
        e.target.src = '/assets/hero.png';
    };

    const t = {
        back: lang === 'en' ? 'Back' : 'Voltar',
        share: lang === 'en' ? 'Share' : 'Partilhar',
        save: lang === 'en' ? 'Save' : 'Guardar',
        surface: lang === 'en' ? 'Surface' : 'Área Útil',
        rooms: lang === 'en' ? 'Number of rooms' : 'Número de quartos',
        floor: lang === 'en' ? 'Floor' : 'Andar',
        condition: lang === 'en' ? 'Condition' : 'Estado',
        built: lang === 'en' ? 'Year built' : 'Ano de construção',
        available: lang === 'en' ? 'Available from' : 'Disponível desde',
        description: lang === 'en' ? 'Description' : 'Descrição',
        location: lang === 'en' ? 'Location' : 'Localização',
        agent: lang === 'en' ? 'Property Agent' : 'Agente Imobiliário',
        calculator: lang === 'en' ? 'Mortgage Calculator' : 'Calculadora de Hipoteca',
        monthly: lang === 'en' ? 'Monthly Payment' : 'Pagamento Mensal',
        similar: lang === 'en' ? 'Similar Properties' : 'Imóveis Semelhantes'
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-brand-cobalt/10">
            {/* Header Spacer */}
            <div className="h-20 bg-white"></div>

            {/* Top Toolbar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center text-sm font-black text-[#1A2B3C] hover:text-brand-cobalt transition-colors group">
                        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t.back}
                    </button>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-black text-[#1A2B3C] hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            {t.share}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-black text-[#1A2B3C] hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            {t.save}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-[1440px] mx-auto px-6 py-8 w-full">
                {/* Premium Gallery Grid */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-8 rounded-[2rem] overflow-hidden shadow-2xl">
                    <div className="col-span-2 row-span-2 relative group cursor-pointer">
                        <img 
                            src={images[0] || '/assets/hero.png'} 
                            onError={handleImageError}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <div className="relative group cursor-pointer overflow-hidden">
                        <img src={images[1] || '/assets/recently_sold.png'} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Room 1" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <div className="relative group cursor-pointer overflow-hidden">
                        <img src={images[2] || '/assets/new_listings.png'} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Room 2" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <div className="relative group cursor-pointer overflow-hidden">
                        <img src={images[3] || '/assets/open_houses.png'} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Room 3" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <div className="relative group cursor-pointer overflow-hidden">
                        <img src={images[4] || '/assets/price_reduced.png'} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Room 4" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-black text-lg group-hover:bg-black/60 transition-all">
                            +{images.length > 5 ? images.length - 5 : 0} photos
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column (8 units) */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Title & Price Section */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                            <p className="text-brand-cobalt font-black text-sm uppercase tracking-widest mb-2">
                                {features.type} • {property.promoted ? 'Promoted' : 'Featured'}
                            </p>
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-black text-[#1A2B3C] leading-tight">{property.listing.title}</h1>
                                    <p className="text-gray-400 font-bold text-lg flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {property.listing.locationName}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-[#1A2B3C]">Kz {property.price?.toLocaleString()}</div>
                                    <p className="text-sm font-black text-gray-400 mt-1 uppercase tracking-widest">
                                        {Math.round(property.price / (features.sqft || 1)).toLocaleString()} Kz / m²
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Property Specs Table */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-black text-[#1A2B3C] mb-8">{features.type} Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {[
                                    { label: t.surface, value: `${features.sqft} m²` },
                                    { label: t.rooms, value: features.beds },
                                    { label: t.floor, value: `${features.floor}/${features.totalFloors}` },
                                    { label: t.condition, value: features.condition },
                                    { label: t.built, value: features.yearBuilt },
                                    { label: t.available, value: features.availableFrom }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-400 font-black text-xs uppercase tracking-widest">{item.label}</span>
                                        <span className="text-[#1A2B3C] font-black">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-black text-[#1A2B3C] mb-6">{t.description}</h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium whitespace-pre-line">
                                {property.listing.description}
                            </p>
                        </div>

                        {/* Location / Map Placeholder */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-black text-[#1A2B3C] mb-6">{t.location}</h2>
                            <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden relative">
                                <img 
                                    src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200`} 
                                    className="w-full h-full object-cover opacity-50 grayscale" 
                                    alt="Map Placeholder" 
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white px-8 py-4 rounded-2xl shadow-xl border border-gray-100 text-center">
                                        <p className="font-black text-[#1A2B3C]">{property.listing.locationName}</p>
                                        <button className="text-brand-cobalt font-black text-[10px] uppercase tracking-widest mt-2 hover:underline">Open in Google Maps</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (4 units) - Sticky Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Agent Card */}
                        <div className="bg-[#1A2B3C] rounded-[2rem] p-8 text-white shadow-xl">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 overflow-hidden border border-white/20">
                                    <img src={property.agent.avatar} className="w-full h-full object-cover" alt={property.agent.fullName} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">{property.agent.fullName}</h3>
                                    <p className="text-brand-cobalt font-black text-[10px] uppercase tracking-widest">{t.agent}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <button className="w-full py-4 bg-white text-[#1A2B3C] rounded-2xl font-black text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    {property.agent.phone}
                                </button>
                                <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {property.agent.email}
                                </button>
                            </div>
                        </div>

                        {/* Contact Form (LeadForm) */}
                        <div className="sticky top-24">
                            <LeadForm propertyId={property.id} agentName={property.agent.fullName} />
                        </div>

                        {/* Mortgage Calculator */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-[#1A2B3C]">{t.calculator}</h3>
                                <svg className="w-6 h-6 text-brand-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <span>Loan Amount</span>
                                        <span>Kz {loanAmount.toLocaleString()}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1000000" 
                                        max={property.price * 1.5} 
                                        step="1000000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-cobalt" 
                                    />
                                </div>
                                <div className="p-6 bg-gray-50 rounded-2xl text-center">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.monthly}</p>
                                    <p className="text-2xl font-black text-brand-cobalt">Kz {Math.round(loanAmount * 0.008).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Properties Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-black text-[#1A2B3C] mb-8">{t.similar}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => {
                            const localImages = ['/assets/new_listings.png', '/assets/recently_sold.png', '/assets/price_reduced.png', '/assets/open_houses.png'];
                            return (
                                <Link key={i} to={`/property/${i}`} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src={localImages[i-1] || '/assets/hero.png'} 
                                            onError={handleImageError}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                            alt="Similar" 
                                        />
                                    </div>
                                    <div className="p-6">
                                    <p className="text-brand-cobalt font-black text-[10px] uppercase tracking-widest mb-1">Apartment</p>
                                    <h4 className="font-black text-[#1A2B3C] group-hover:text-brand-cobalt transition-colors truncate">Luxury Unit {i} in Talatona</h4>
                                    <div className="text-lg font-black text-[#1A2B3C] mt-2">Kz 45.000.000</div>
                                </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PropertyDetails;
