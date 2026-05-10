import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';
import { useLanguage } from '../../../context/LanguageContext';

const PropertyBrowseGrid = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();

    const t = {
        promoted: lang === 'en' ? 'Promoted' : 'Promovido',
        beds: lang === 'en' ? 'Beds' : 'Quartos',
        baths: lang === 'en' ? 'Baths' : 'Casas de Banho',
        area: 'm²',
        viewDetails: lang === 'en' ? 'View Details' : 'Ver Detalhes',
        contact: lang === 'en' ? 'Contact' : 'Contactar'
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await PropertyService.getAllProperties();
                if (data && Array.isArray(data) && data.length > 0) {
                    setProperties(data);
                } else {
                    throw new Error('No properties found');
                }
            } catch (err) {
                console.warn('Backend fetch failed or returned empty, using mock data for visual demo:', err);
                const mockProperties = [
                    {
                        id: 1,
                        price: 37900000,
                        promoted: true,
                        listing: {
                            title: lang === 'en' ? 'Modern Luxury Villa in Talatona' : 'Vivenda de Luxo Moderna em Talatona',
                            locationName: 'Talatona, Luanda',
                            images: JSON.stringify(['/assets/hero.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 5, baths: 4, sqft: 450, type: lang === 'en' ? 'Villa' : 'Vivenda' })
                    },
                    {
                        id: 2,
                        price: 150000000,
                        promoted: true,
                        listing: {
                            title: lang === 'en' ? 'Exclusive Penthouse Ilha' : 'Penthouse Exclusiva na Ilha',
                            locationName: 'Ilha do Cabo, Luanda',
                            images: JSON.stringify(['/assets/recently_sold.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 3, baths: 3, sqft: 280, type: lang === 'en' ? 'Penthouse' : 'Cobertura' })
                    },
                    {
                        id: 3,
                        price: 85000000,
                        listing: {
                            title: lang === 'en' ? 'Family House Kilamba' : 'Casa Familiar no Kilamba',
                            locationName: 'Kilamba, Luanda',
                            images: JSON.stringify(['/assets/open_houses.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 4, baths: 2, sqft: 180, type: lang === 'en' ? 'House' : 'Casa' })
                    },
                    {
                        id: 4,
                        price: 45000000,
                        listing: {
                            title: lang === 'en' ? 'Cozy Apartment Viana' : 'Apartamento Aconchegante em Viana',
                            locationName: 'Viana, Luanda',
                            images: JSON.stringify(['/assets/new_listings.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 2, baths: 1, sqft: 90, type: lang === 'en' ? 'Apartment' : 'Apartamento' })
                    }
                ];
                setProperties(mockProperties);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, [lang]);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 py-12">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse flex flex-col md:flex-row bg-white rounded-[2rem] h-[250px] overflow-hidden">
                        <div className="w-full md:w-[350px] bg-gray-200 h-full"></div>
                        <div className="flex-grow p-8">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                            <div className="flex gap-4">
                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 py-12">
            {properties.map((property) => {
                if (!property) return null;

                const features = property.propertyFeatures 
                    ? (typeof property.propertyFeatures === 'string' ? JSON.parse(property.propertyFeatures) : property.propertyFeatures)
                    : {};
                
                const listing = property.listing || {};
                const images = listing.images 
                    ? (typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images)
                    : [];

                return (
                    <div 
                        key={property.id} 
                        className={`group bg-white rounded-[2rem] overflow-hidden border transition-all duration-500 flex flex-col md:flex-row hover:shadow-2xl hover:border-brand-cobalt/20 ${property.promoted ? 'border-brand-cobalt/20 bg-brand-cobalt/[0.02]' : 'border-gray-100 shadow-sm'}`}
                    >
                        {/* Image Side */}
                        <div className="relative w-full md:w-[350px] h-[250px] overflow-hidden">
                            <img 
                                src={images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} 
                                alt={listing.title || 'Property'}
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'; }}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {property.promoted && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-cobalt text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
                                        {t.promoted}
                                    </span>
                                </div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {images?.length || 1}
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="flex-grow p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-brand-cobalt font-black text-xs uppercase tracking-widest mb-1">
                                        {features?.type || 'Property'}
                                    </p>
                                    <Link to={`/property/${property.id}`}>
                                        <h3 className="text-2xl font-black text-[#1A2B3C] group-hover:text-brand-cobalt transition-colors">
                                            {listing.title || 'Untitled Property'}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-400 font-bold text-sm flex items-center mt-1">
                                        <svg className="w-4 h-4 mr-1 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {listing.locationName || 'Unknown Location'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-[#1A2B3C]">
                                        Kz {property.price?.toLocaleString() || '0'}
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                        {Math.round(property.price / features?.sqft || 0).toLocaleString()} Kz/m²
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">{t.beds}</p>
                                        <p className="text-sm font-black text-[#1A2B3C]">{features?.beds || 0}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">{t.baths}</p>
                                        <p className="text-sm font-black text-[#1A2B3C]">{features?.baths || 0}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#1A2B3C]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">{t.area}</p>
                                        <p className="text-sm font-black text-[#1A2B3C]">{features?.sqft || 0} m²</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" alt="Agent" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">Private seller</p>
                                        <p className="text-xs font-black text-[#1A2B3C]">Kubiku Agent</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-black text-[#1A2B3C] hover:bg-gray-50 transition-all">
                                        {t.contact}
                                    </button>
                                    <Link 
                                        to={`/property/${property.id}`}
                                        className="px-6 py-2.5 rounded-xl bg-[#1A2B3C] text-white text-sm font-black hover:bg-brand-cobalt transition-all shadow-lg hover:shadow-brand-cobalt/20"
                                    >
                                        {t.viewDetails}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PropertyBrowseGrid;
