import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';
import { useLanguage } from '../../../context/LanguageContext';
import LeadForm from '../components/LeadForm';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';
import Section from '../../../components/ui/Section';
import { 
  ChevronLeft, 
  Share2, 
  Heart, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Calculator,
  Info,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

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
                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest animate-pulse">Loading Premium Property...</p>
            </div>
        </div>
    );

    const images = typeof property.listing.images === 'string' ? JSON.parse(property.listing.images) : property.listing.images || [];
    const features = typeof property.propertyFeatures === 'string' ? JSON.parse(property.propertyFeatures) : property.propertyFeatures || {};

    const handleImageError = (e) => {
        e.target.src = '/assets/hero.png';
    };

    const t = {
        back: lang === 'en' ? 'Back' : 'Voltar',
        share: lang === 'en' ? 'Share' : 'Partilhar',
        save: lang === 'en' ? 'Save' : 'Guardar',
        surface: lang === 'en' ? 'Surface' : 'Área Útil',
        rooms: lang === 'en' ? 'Rooms' : 'Quartos',
        floor: lang === 'en' ? 'Floor' : 'Andar',
        condition: lang === 'en' ? 'Condition' : 'Estado',
        built: lang === 'en' ? 'Built' : 'Construção',
        available: lang === 'en' ? 'Available' : 'Disponível',
        description: lang === 'en' ? 'Description' : 'Descrição',
        location: lang === 'en' ? 'Location' : 'Localização',
        agent: lang === 'en' ? 'Real Estate Agent' : 'Agente Imobiliário',
        calculator: lang === 'en' ? 'Mortgage' : 'Hipoteca',
        monthly: lang === 'en' ? 'Monthly' : 'Mensal',
        similar: lang === 'en' ? 'Similar Properties' : 'Imóveis Semelhantes',
        contact: lang === 'en' ? 'Contact Agent' : 'Contactar Agente'
    };

    return (
        <div className="min-h-screen bg-white md:bg-gray-50/50 flex flex-col font-sans">
            {/* Mobile Header Toolbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 flex items-center justify-between px-4">
                <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-[#1A2B3C]">
                    <ChevronLeft className="w-5 h-5 stroke-[3]" />
                </button>
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-[#1A2B3C]">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-[#1A2B3C]">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Desktop Header Toolbar */}
            <div className="hidden md:block bg-white border-b border-gray-100 sticky top-0 z-50 h-20">
                <Container className="h-full flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate(-1)} icon={ChevronLeft}>
                        {t.back}
                    </Button>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" icon={Share2}>{t.share}</Button>
                        <Button variant="outline" icon={Heart}>{t.save}</Button>
                    </div>
                </Container>
            </div>

            <main className="flex-grow pb-32 md:pb-24">
                {/* Image Gallery - Mobile Slider / Desktop Grid */}
                <Section spacing="none" className="md:pt-8">
                    <Container clean className="md:px-4 lg:px-8">
                        <div className="md:rounded-[2.5rem] overflow-hidden shadow-2xl md:h-[550px] bg-gray-100">
                            {/* Mobile: Horizontal Scroll Snap */}
                            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[400px]">
                                {images.map((img, i) => (
                                    <div key={i} className="min-w-full h-full snap-center">
                                        <img 
                                            src={img} 
                                            onError={handleImageError} 
                                            className="w-full h-full object-cover" 
                                            alt={`Property ${i}`} 
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Desktop: Premium Grid */}
                            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-full">
                                <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
                                    <img src={images[0] || '/assets/hero.png'} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>
                                </div>
                                {images.slice(1, 4).map((img, i) => (
                                    <div key={i} className="relative group cursor-pointer overflow-hidden">
                                        <img src={img} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Room ${i}`} />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>
                                    </div>
                                ))}
                                <div className="relative group cursor-pointer overflow-hidden">
                                    <img src={images[4]} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Last" />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white font-black group-hover:bg-black/60 transition-all">
                                        <Sparkles className="w-6 h-6 mb-2" />
                                        <span className="text-lg">+{images.length > 5 ? images.length - 5 : 0} photos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>

                <Container className="mt-8 md:mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                        {/* Left Column - Main Info */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Property Header */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="bg-brand-cobalt/10 text-brand-cobalt px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-brand-cobalt rounded-full animate-pulse"></div>
                                        {features.type || 'Apartment'}
                                    </span>
                                    <span className="bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" />
                                        Promoted
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black text-[#1A2B3C] leading-tight">
                                    {property.listing.title}
                                </h1>
                                <div className="flex items-center text-gray-400 font-bold text-lg">
                                    <MapPin className="w-5 h-5 mr-2 text-brand-cobalt" />
                                    {property.listing.locationName}
                                </div>
                                <div className="md:hidden text-3xl font-black text-brand-cobalt pt-2">
                                    Kz {property.price.toLocaleString()}
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 md:gap-8 py-8 border-y border-gray-100">
                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <Bed className="w-6 h-6 stroke-[2.5]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t.rooms}</p>
                                        <p className="text-xl font-black text-[#1A2B3C]">{features.beds || 0}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <Bath className="w-6 h-6 stroke-[2.5]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t.rooms}</p>
                                        <p className="text-xl font-black text-[#1A2B3C]">{features.baths || 0}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <Square className="w-6 h-6 stroke-[2.5]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t.surface}</p>
                                        <p className="text-xl font-black text-[#1A2B3C]">{features.sqft || 0} m²</p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Specs Table */}
                            <div className="bg-white md:rounded-[2.5rem] md:p-10 md:border md:border-gray-100 md:shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <Info className="w-6 h-6 text-brand-cobalt" />
                                    <h2 className="text-2xl font-black text-[#1A2B3C]">Property Details</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                                    {[
                                        { label: t.surface, value: `${features.sqft} m²`, icon: Square },
                                        { label: t.rooms, value: features.beds, icon: Bed },
                                        { label: t.floor, value: `${features.floor}/${features.totalFloors}`, icon: Layers },
                                        { label: t.condition, value: features.condition, icon: Sparkles },
                                        { label: t.built, value: features.yearBuilt, icon: Calendar },
                                        { label: t.available, value: features.availableFrom, icon: Calendar }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-5 border-b border-gray-50 last:border-0 md:last:border-b">
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-4 h-4 text-gray-300" />
                                                <span className="text-gray-400 font-black text-xs uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            <span className="text-[#1A2B3C] font-black">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white md:rounded-[2.5rem] md:p-10 md:border md:border-gray-100 md:shadow-sm">
                                <h2 className="text-2xl font-black text-[#1A2B3C] mb-6">{t.description}</h2>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium whitespace-pre-line">
                                    {property.listing.description}
                                </p>
                            </div>

                            {/* Location Map Placeholder */}
                            <div className="bg-white md:rounded-[2.5rem] md:p-10 md:border md:border-gray-100 md:shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between mb-8 px-4 md:px-0">
                                    <h2 className="text-2xl font-black text-[#1A2B3C]">{t.location}</h2>
                                    <button className="text-brand-cobalt font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:underline">
                                        Open Maps <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="aspect-[16/10] md:aspect-video bg-gray-100 md:rounded-3xl overflow-hidden relative group">
                                    <img 
                                        src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200`} 
                                        className="w-full h-full object-cover opacity-50 grayscale transition-all group-hover:scale-105 group-hover:grayscale-0" 
                                        alt="Map Placeholder" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <div className="bg-white px-8 py-5 rounded-2xl shadow-2xl border border-gray-100 text-center max-w-sm">
                                            <MapPin className="w-8 h-8 text-brand-cobalt mx-auto mb-3" />
                                            <p className="font-black text-[#1A2B3C] text-lg">{property.listing.locationName}</p>
                                            <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">Exact location available after booking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Agent Card */}
                            <div className="bg-[#1A2B3C] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150"></div>
                                <div className="flex items-center gap-6 mb-8 relative z-10">
                                    <div className="w-20 h-20 rounded-2xl bg-white/10 overflow-hidden border border-white/20 p-1">
                                        <img src={property.agent.avatar} className="w-full h-full object-cover rounded-xl" alt={property.agent.fullName} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black">{property.agent.fullName}</h3>
                                        <p className="text-brand-cobalt font-black text-[10px] uppercase tracking-widest">{t.agent}</p>
                                    </div>
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <button className="w-full h-[56px] bg-white text-[#1A2B3C] rounded-2xl font-black text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-3">
                                        <Phone className="w-4 h-4 stroke-[3]" />
                                        {property.agent.phone}
                                    </button>
                                    <button className="w-full h-[56px] bg-white/10 border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                                        <Mail className="w-4 h-4 stroke-[3]" />
                                        {property.agent.email}
                                    </button>
                                </div>
                            </div>

                            {/* Lead Form */}
                            <div className="hidden md:block sticky top-24">
                                <LeadForm propertyId={property.id} agentName={property.agent.fullName} />
                            </div>

                            {/* Mortgage Calculator */}
                            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-[#1A2B3C]">{t.calculator}</h3>
                                    <Calculator className="w-6 h-6 text-brand-cobalt" />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <span>Loan Amount</span>
                                            <span className="text-[#1A2B3C]">Kz {loanAmount.toLocaleString()}</span>
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
                                    <div className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.monthly}</p>
                                        <p className="text-2xl font-black text-brand-cobalt">Kz {Math.round(loanAmount * 0.008).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Similar Properties Section */}
                <Section>
                    <Container>
                        <h2 className="text-3xl font-black text-[#1A2B3C] mb-12 px-4 md:px-0">{t.similar}</h2>
                        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-6 px-4 md:px-0 no-scrollbar">
                            {[1, 2, 3, 4].map((i) => {
                                const localImages = ['/assets/new_listings.png', '/assets/recently_sold.png', '/assets/price_reduced.png', '/assets/open_houses.png'];
                                return (
                                    <Link key={i} to={`/property/${i}`} className="min-w-[280px] snap-center group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <img 
                                                src={localImages[i-1] || '/assets/hero.png'} 
                                                onError={handleImageError}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                alt="Similar" 
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1A2B3C] px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                                                Kz 45M
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-brand-cobalt font-black text-[10px] uppercase tracking-widest mb-1">Apartment</p>
                                            <h4 className="font-black text-[#1A2B3C] group-hover:text-brand-cobalt transition-colors truncate">Luxury Unit {i} in Talatona</h4>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </Container>
                </Section>
            </main>

            {/* Mobile Sticky Action Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 z-40 flex items-center justify-between safe-area-bottom">
                <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">Total Price</p>
                    <p className="text-xl font-black text-[#1A2B3C]">Kz {property.price.toLocaleString()}</p>
                </div>
                <Button className="px-8">{t.contact}</Button>
            </div>
        </div>
    );
};

export default PropertyDetails;
