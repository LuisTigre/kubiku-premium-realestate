import React, { useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';
import PaymentWidget from '../components/PaymentWidget';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { API_URL } from '../../../config';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();
    const { authenticated, token } = useAuth();

    const fetchBookings = async () => {
        if (!authenticated || !token) return;
        try {
            setLoading(true);
            const data = await BookingService.getMyBookings(token);
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authenticated) {
            fetchBookings();
        } else {
            setBookings([]);
            setLoading(false);
        }
    }, [authenticated, token]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700';
            case 'APPROVED': return 'bg-blue-100 text-blue-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">
                    {lang === 'en' ? 'My Bookings' : 'Minhas Reservas'}
                </h1>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-gray-200/50">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-500 mb-8">Start exploring premium stays in Angola!</p>
                        <button className="bg-brand-cobalt text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-navy transition-all">
                            Browse Stays
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-100 p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-sm font-bold text-gray-400">
                                                ID: #{booking.id.substring(0, 8).toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-2xl font-black text-gray-900 mb-2">{booking.roomUnit.listing.title}</h2>
                                        <p className="text-gray-500 font-bold mb-8 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-brand-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {booking.roomUnit.listing.locationName}
                                        </p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-in</p>
                                                <p className="font-bold text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-out</p>
                                                <p className="font-bold text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                                                <p className="font-bold text-brand-cobalt">Kz {booking.totalPrice?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:border-l lg:border-gray-50 lg:pl-12 flex flex-col justify-center">
                                        {booking.status === 'APPROVED' ? (
                                            <PaymentWidget 
                                                booking={booking} 
                                                onPaymentSuccess={() => {
                                                    alert('Payment successful!');
                                                    fetchBookings();
                                                }} 
                                            />
                                        ) : booking.status === 'PAID' ? (
                                            <div className="text-center p-8 bg-green-50 rounded-[2rem] border border-green-100">
                                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <p className="text-green-700 font-black text-sm uppercase tracking-widest">Stay Confirmed</p>
                                            </div>
                                        ) : (
                                            <div className="text-center p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                                                <p className="text-gray-400 font-bold text-sm">
                                                    {booking.status === 'REQUESTED' ? 'Waiting for approval' : 'Booking closed'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
