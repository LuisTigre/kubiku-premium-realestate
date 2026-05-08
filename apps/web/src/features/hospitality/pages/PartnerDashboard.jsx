import React, { useState, useEffect } from 'react';
import { PartnerService } from '../services/PartnerService';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';

const PartnerDashboard = () => {
    const { session } = useAuth();
    const { t, lang } = useLanguage();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await PartnerService.getBookings(session.access_token);
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.access_token) {
            fetchBookings();
        }
    }, [session?.access_token]);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await PartnerService.updateBookingStatus(bookingId, newStatus, session.access_token);
            // Refresh list
            fetchBookings();
        } catch (err) {
            alert(err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'REQUESTED': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header Spacing */}
            <div className="h-24"></div>

            <main className="max-w-[1440px] mx-auto px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Partner Dashboard</h1>
                        <p className="text-gray-500 font-bold text-lg">Manage your property bookings and requests</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Bookings</p>
                            <p className="text-3xl font-black text-gray-900">{bookings.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Requests</p>
                            <p className="text-3xl font-black text-brand-cobalt">
                                {bookings.filter(b => b.status === 'REQUESTED').length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-2xl font-black text-gray-900">Recent Activity</h2>
                        <button className="text-brand-cobalt font-bold text-sm hover:underline">Download CSV</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Property & Unit</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Guest</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Stay Period</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Price</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold italic text-lg">
                                            No bookings found yet. Your properties are waiting for their first guests!
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="font-black text-gray-900">{booking.roomUnit?.listing?.title}</div>
                                                <div className="text-gray-400 text-xs font-bold uppercase">{booking.roomUnit?.type}</div>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-gray-600">
                                                {booking.user?.fullName || 'Guest'}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</div>
                                                <div className="text-gray-400 text-xs font-medium">to {new Date(booking.checkOut).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-8 py-6 font-black text-gray-900">
                                                Kz {booking.totalPrice?.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[11px] font-black border ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                {booking.status === 'REQUESTED' ? (
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => handleStatusUpdate(booking.id, 'APPROVED')}
                                                            className="bg-brand-cobalt text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-brand-navy transition-all shadow-lg shadow-brand-cobalt/20 active:scale-95"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusUpdate(booking.id, 'REJECTED')}
                                                            className="bg-white text-red-600 border border-red-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-50 transition-all active:scale-95"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PartnerDashboard;
