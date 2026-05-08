import React, { useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';

const BookingWidget = ({ roomUnit }) => {
    const { profile, session } = useAuth();
    const { t } = useLanguage();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Calculate total price
    const calculateTotal = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
        return (nights * (roomUnit?.basePrice || 0)).toFixed(2);
    };

    // Check availability when dates change
    useEffect(() => {
        if (checkIn && checkOut && roomUnit?.id) {
            const check = async () => {
                setLoading(true);
                try {
                    const available = await BookingService.checkAvailability(roomUnit.id, checkIn, checkOut);
                    setIsAvailable(available);
                } catch (err) {
                    console.error('Availability check failed:', err);
                } finally {
                    setLoading(false);
                }
            };
            check();
        }
    }, [checkIn, checkOut, roomUnit?.id]);

    const handleBooking = async () => {
        if (!profile) {
            alert('Please login to request a booking');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const request = {
                roomUnitId: roomUnit.id,
                checkIn,
                checkOut
            };
            await BookingService.requestBooking(request, session.access_token);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.booking.requestSent}</h3>
                <p className="text-gray-600">{t.booking.requestSentDesc}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 sticky top-24">
            <div className="flex items-baseline justify-between mb-8">
                <div>
                    <span className="text-3xl font-black text-gray-900">Kz {roomUnit?.basePrice?.toLocaleString()}</span>
                    <span className="text-gray-500 font-bold ml-1">{t.booking.perNight}</span>
                </div>
                <div className="flex items-center text-sm font-bold text-brand-cobalt">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9 · 12 reviews
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-2xl overflow-hidden group focus-within:border-brand-cobalt transition-colors">
                    <div className="p-4 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.booking.checkIn}</label>
                        <input 
                            type="date" 
                            className="w-full bg-transparent text-gray-900 font-bold focus:outline-none"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.booking.checkOut}</label>
                        <input 
                            type="date" 
                            className="w-full bg-transparent text-gray-900 font-bold focus:outline-none"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors group focus-within:border-brand-cobalt">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.booking.guests}</label>
                    <select className="w-full bg-transparent text-gray-900 font-bold focus:outline-none appearance-none">
                        <option>1 {t.booking.guests.toLowerCase().slice(0, -1)}</option>
                        <option>2 {t.booking.guests.toLowerCase()}</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                    </select>
                </div>
            </div>

            {isAvailable === false && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-6 flex items-center animate-pulse">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.booking.fullyBooked}
                </div>
            )}

            <button 
                onClick={handleBooking}
                disabled={loading || isAvailable === false || !checkIn || !checkOut}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl transform active:scale-95 ${
                    isAvailable === false 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-brand-cobalt hover:bg-brand-navy text-white shadow-brand-cobalt/30 hover:shadow-brand-cobalt/40 hover:-translate-y-1'
                }`}
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    isAvailable === false ? t.booking.notAvailable : t.booking.requestToBook
                )}
            </button>

            {error && <p className="text-red-500 text-xs font-bold mt-4 text-center">{error}</p>}

            <p className="text-gray-400 text-sm font-medium mt-6 text-center">{t.booking.wontBeCharged}</p>

            {checkIn && checkOut && isAvailable !== false && (
                <div className="mt-8 space-y-4 pt-8 border-t border-gray-100">
                    <div className="flex justify-between text-gray-600 font-medium">
                        <span className="underline italic">Kz {roomUnit?.basePrice?.toLocaleString()} x {Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} {Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) === 1 ? 'night' : 'nights'}</span>
                        <span>Kz {calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                        <span className="underline italic">{t.booking.serviceFee}</span>
                        <span>Kz 0</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-black text-xl pt-4 border-t border-gray-100">
                        <span>{t.booking.total}</span>
                        <span>Kz {calculateTotal()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingWidget;
