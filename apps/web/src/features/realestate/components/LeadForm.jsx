import React, { useState } from 'react';
import { PropertyService } from '../services/PropertyService';
import { useAuth } from '../../auth/AuthContext';

const LeadForm = ({ propertyId, agentName }) => {
    const { session } = useAuth();
    const [formData, setFormData] = useState({
        contactName: session?.user?.user_metadata?.full_name || '',
        contactEmail: session?.user?.email || '',
        contactPhone: '',
        message: 'I am interested in this property and would like to receive more information.'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await PropertyService.submitLead({
                ...formData,
                propertyId
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 font-medium">Your inquiry has been sent to our agents. We will contact you shortly.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl shadow-gray-200/50">
            <h3 className="text-xl font-black text-gray-900 mb-6">Inquire About This Property</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input 
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-bold text-gray-900"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input 
                            type="email"
                            required
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-bold text-gray-900"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                        <input 
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-bold text-gray-900"
                            placeholder="+244..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                    <textarea 
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-cobalt outline-none transition-all font-bold text-gray-900 resize-none"
                    ></textarea>
                </div>

                {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                <button 
                    disabled={loading}
                    className="w-full bg-brand-cobalt text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-navy transition-all shadow-xl shadow-brand-cobalt/20 active:scale-[0.98] disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
                <p className="text-[10px] text-center text-gray-400 font-bold px-4">
                    By sending an inquiry, you agree to our terms of service and privacy policy.
                </p>
            </form>
        </div>
    );
};

export default LeadForm;
