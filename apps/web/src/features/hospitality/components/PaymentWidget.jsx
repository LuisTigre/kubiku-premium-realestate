import React, { useState } from 'react';
import { PaymentService } from '../services/PaymentService';
import { useAuth } from '../../auth/AuthContext';

const PaymentWidget = ({ booking, onPaymentSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        try {
            await PaymentService.processMockPayment(booking.id, token);
            if (onPaymentSuccess) onPaymentSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-brand-cobalt/10 shadow-2xl shadow-brand-cobalt/5">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total to Pay</p>
                    <h3 className="text-3xl font-black text-gray-900">Kz {booking.totalPrice?.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <span className="text-sm font-bold text-gray-400">Booking ID</span>
                    <span className="text-sm font-black text-gray-900">#{booking.id.substring(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <span className="text-sm font-bold text-gray-400">Payment Method</span>
                    <div className="flex items-center text-brand-cobalt font-black text-sm">
                        <span className="mr-2">Multicaixa Express</span>
                        <div className="w-2 h-2 bg-brand-cobalt rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}

            <button
                disabled={loading}
                onClick={handlePayment}
                className="w-full bg-brand-cobalt text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-navy transition-all shadow-xl shadow-brand-cobalt/20 active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Confirm and Pay'}
            </button>
            
            <p className="text-[10px] text-center text-gray-400 font-bold mt-6 px-4">
                Payments are processed securely. Your booking will be confirmed immediately after transaction completion.
            </p>
        </div>
    );
};

export default PaymentWidget;
