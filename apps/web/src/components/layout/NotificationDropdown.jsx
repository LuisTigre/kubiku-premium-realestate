import React, { useState, useEffect, useRef } from 'react';
import { NotificationService } from '../../services/NotificationService';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../features/auth/AuthContext';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const { profile, authenticated, token } = useAuth();

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const [data, count] = await Promise.all([
                NotificationService.getMyNotifications(token),
                NotificationService.getUnreadCount(token)
            ]);
            setNotifications(data);
            setUnreadCount(count);
        } catch (err) {
            console.error('Failed to fetch notifications', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authenticated || !token) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [authenticated, token]);

    const markAsRead = async (id) => {
        try {
            await NotificationService.markAsRead(id, token);
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-400 hover:text-brand-cobalt transition-colors group"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-[10px] font-black text-white flex items-center justify-center ring-2 ring-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50 transform origin-top-right animate-in fade-in zoom-in duration-200">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-black text-gray-900">Notifications</h3>
                        <span className="text-[10px] font-black text-brand-cobalt uppercase tracking-widest bg-brand-cobalt/5 px-3 py-1 rounded-full">
                            {unreadCount} New
                        </span>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 font-bold italic">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map(notif => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer relative group ${!notif.read ? 'bg-brand-cobalt/[0.02]' : ''}`}
                                    >
                                        {!notif.read && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-cobalt"></div>
                                        )}
                                        <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                                            {notif.title}
                                            {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-brand-cobalt ml-2"></div>}
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-2">{notif.message}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-gray-50 text-center">
                        <button className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-brand-cobalt transition-colors">
                            Clear all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
