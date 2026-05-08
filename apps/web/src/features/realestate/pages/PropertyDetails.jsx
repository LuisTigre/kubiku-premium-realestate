import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';
import LeadForm from '../components/LeadForm';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await PropertyService.getPropertyById(id);
                if (!data) navigate('/live');
                setProperty(data);
            } catch (err) {
                console.error(err);
                navigate('/live');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const images = typeof property.listing.images === 'string'
        ? JSON.parse(property.listing.images)
        : property.listing.images || [];

    const features = typeof property.propertyFeatures === 'string'
        ? JSON.parse(property.propertyFeatures)
        : property.propertyFeatures || {};

    return (
        <div className="min-h-screen bg-white">
            {/* Header Spacing */}
            <div className="h-24"></div>

            <main className="max-w-[1440px] mx-auto px-8 py-12">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-brand-cobalt transition-colors font-bold mb-8 group"
                >
                    <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Listings
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Side: Images & Info */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="mb-12">
                            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden bg-gray-100 mb-6 shadow-2xl">
                                <img 
                                    src={images[activeImage] || 'https://images.unsplash.com/photo-1600585154340-be6199f7e099?auto=format&fit=crop&q=80'} 
                                    className="w-full h-full object-cover"
                                    alt={property.listing.title}
                                />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`flex-shrink-0 w-32 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-cobalt scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div className="mb-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">{property.listing.title}</h1>
                                    <div className="flex items-center text-xl text-gray-400 font-bold">
                                        <svg className="w-6 h-6 mr-2 text-brand-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {property.listing.locationName}
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-brand-cobalt whitespace-nowrap">
                                    Kz {property.price?.toLocaleString()}
                                </div>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {[
                                    { label: 'Bedrooms', value: features.beds || 0, icon: '🛏️' },
                                    { label: 'Bathrooms', value: features.baths || 0, icon: '🚿' },
                                    { label: 'Size (m²)', value: features.sqft || 0, icon: '📐' },
                                    { label: 'Type', value: 'House', icon: '🏠' }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
                                        <div className="text-3xl mb-2">{stat.icon}</div>
                                        <div className="text-xl font-black text-gray-900">{stat.value}</div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 mb-6">Property Overview</h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium mb-12">
                                {property.listing.description || 'Experience the pinnacle of luxury living in this magnificent estate. Every detail has been meticulously crafted to provide an unparalleled lifestyle of comfort and sophistication.'}
                            </p>

                            <h2 className="text-2xl font-black text-gray-900 mb-6">Premium Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                {['Smart Home System', 'Infinity Pool', 'Private Theater', 'Gourmet Kitchen', 'Wine Cellar', 'Landscaped Garden'].map((item, i) => (
                                    <div key={i} className="flex items-center text-gray-600 font-bold">
                                        <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Lead Form & Agent */}
                    <div className="space-y-8">
                        {/* Agent Card */}
                        <div className="bg-brand-cobalt rounded-3xl p-8 text-white shadow-xl">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center font-black text-2xl">
                                    {(property.agent?.fullName || 'A').charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-black text-xl">{property.agent?.fullName || 'Senior Agent'}</h4>
                                    <p className="text-white/60 font-bold text-sm uppercase tracking-wider">Luxury Portfolio Manager</p>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm font-bold">
                                    <svg className="w-4 h-4 mr-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +244 9XX XXX XXX
                                </div>
                                <div className="flex items-center text-sm font-bold">
                                    <svg className="w-4 h-4 mr-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    agent@kubiku.co.ao
                                </div>
                            </div>
                        </div>

                        {/* Sticky Lead Form */}
                        <div className="sticky top-32">
                            <LeadForm propertyId={property.id} agentName={property.agent?.fullName} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PropertyDetails;
