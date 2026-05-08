import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingService } from '../services/BookingService';
import BookingWidget from '../components/BookingWidget';
import { useLanguage } from '../../../context/LanguageContext';

const StayDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const [stay, setStay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStay = async () => {
            try {
                const data = await BookingService.getStayDetails(id);
                setStay(data);
            } catch (err) {
                console.error('Failed to fetch stay:', err);
                setError('Stay not found');
                // Mock data for demo purposes if backend is empty
                setStay({
                    id,
                    title: 'Seaside Luxury Villa',
                    locationName: 'Mussulo, Luanda',
                    description: 'Experience the ultimate luxury in this stunning seaside villa. Featuring private beach access, infinity pool, and world-class amenities.',
                    images: [
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
                    ],
                    roomUnits: [
                        {
                            id: 'room-1',
                            type: 'MASTER_SUITE',
                            basePrice: 125000,
                            totalUnits: 2
                        }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStay();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header spacing */}
            <div className="h-20"></div>

            <main className="max-w-[1440px] mx-auto px-8 py-12">
                {/* Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2">
                            {stay?.title}
                        </h1>
                        <p className="text-gray-500 font-bold text-xl flex items-center">
                            <svg className="w-6 h-6 mr-2 text-brand-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {stay?.locationName}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                        <button className="p-4 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-[3.5rem] overflow-hidden mb-16 shadow-2xl">
                    <div className="md:col-span-2 h-[600px] overflow-hidden">
                        <img src={stay?.images?.[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Main" />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <div className="h-[292px] overflow-hidden">
                            <img src={stay?.images?.[1] || stay?.images?.[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Detail 1" />
                        </div>
                        <div className="h-[292px] overflow-hidden">
                            <img src={stay?.images?.[2] || stay?.images?.[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Detail 2" />
                        </div>
                        <div className="h-[292px] overflow-hidden">
                            <img src={stay?.images?.[3] || stay?.images?.[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Detail 3" />
                        </div>
                        <div className="h-[292px] overflow-hidden relative">
                            <img src={stay?.images?.[4] || stay?.images?.[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Detail 4" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white font-black text-xl">Show all photos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <div className="pb-12 border-b border-gray-100 mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">
                                {lang === 'en' ? 'About this stay' : 'Sobre esta estadia'}
                            </h2>
                            <p className="text-gray-600 text-xl leading-relaxed font-medium">
                                {stay?.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                            <div className="flex items-center gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="text-2xl">🛁</span>
                                </div>
                                <span className="font-bold text-gray-900">Private Pool</span>
                            </div>
                            <div className="flex items-center gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="text-2xl">📶</span>
                                </div>
                                <span className="font-bold text-gray-900">Fast WiFi</span>
                            </div>
                            <div className="flex items-center gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="text-2xl">❄️</span>
                                </div>
                                <span className="font-bold text-gray-900">AC</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with Booking Widget */}
                    <div className="lg:col-span-1">
                        <BookingWidget roomUnit={stay?.roomUnits?.[0]} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StayDetails;
