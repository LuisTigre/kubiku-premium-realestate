import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import { BookingService } from '../features/hospitality/services/BookingService';
import { LeadService } from '../features/realestate/services/LeadService';
import { useAuth } from '../features/auth/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const ProfilePage = () => {
    const { t } = useLanguage();
    const { profile, syncProfile } = useAuth();
    const [userData, setUserData] = useState({
        fullName: '',
        phoneNumber: ''
    });
    const [stats, setStats] = useState({
        bookings: 0,
        leads: 0
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [user, bookings, leads] = await Promise.all([
                    UserService.getCurrentUser(),
                    BookingService.getMyBookings(),
                    LeadService.getAgentLeads().catch(() => []) // Might fail if not agent, so fallback
                ]);
                
                setUserData({
                    fullName: user.fullName || '',
                    phoneNumber: user.phoneNumber || ''
                });
                
                setStats({
                    bookings: bookings.length,
                    leads: leads.length
                });
            } catch (err) {
                console.error('Failed to fetch profile data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        
        try {
            await UserService.updateProfile(userData);
            await syncProfile(); // Sync local auth context
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="h-24"></div>
            <main className="max-w-[1000px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
                            <div className="w-24 h-24 bg-brand-cobalt text-white rounded-full mx-auto flex items-center justify-center text-3xl font-black mb-6 shadow-lg shadow-brand-cobalt/20">
                                {userData.fullName.charAt(0)}
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">{userData.fullName}</h2>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-8">{profile?.role}</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bookings</p>
                                    <p className="text-xl font-black text-gray-900">{stats.bookings}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inquiries</p>
                                    <p className="text-xl font-black text-gray-900">{stats.leads}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <h1 className="text-3xl font-black text-gray-900 mb-8">Personal Information</h1>
                            
                            {message.text && (
                                <div className={`mb-8 p-4 rounded-2xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input 
                                            type="text"
                                            value={userData.fullName}
                                            onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input 
                                            type="tel"
                                            value={userData.phoneNumber}
                                            onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-brand-cobalt transition-all"
                                            placeholder="+244 ..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address (Read-only)</label>
                                    <input 
                                        type="email"
                                        value={profile?.email}
                                        disabled
                                        className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold text-gray-400 cursor-not-allowed"
                                    />
                                    <p className="text-[10px] text-gray-400 italic ml-1">Email changes must be verified via security settings.</p>
                                </div>

                                <div className="pt-6">
                                    <button 
                                        type="submit"
                                        disabled={saving}
                                        className="w-full md:w-auto px-12 py-4 bg-brand-cobalt text-white font-black rounded-2xl shadow-lg shadow-brand-cobalt/20 hover:bg-brand-navy transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Saving...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-12 pt-12 border-t border-gray-50">
                                <h3 className="text-xl font-black text-gray-900 mb-4">Security</h3>
                                <p className="text-gray-500 text-sm mb-6">Want to change your password or update your authentication methods?</p>
                                <button className="text-brand-cobalt font-black text-sm hover:underline">
                                    Manage Security Settings &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
