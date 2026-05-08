import React, { useState, useEffect, useContext } from 'react';
import { LeadService } from '../services/LeadService';
import { PropertyService } from '../services/PropertyService';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../auth/AuthContext';

const AgentDashboard = () => {
    const { lang } = useLanguage();
    const [leads, setLeads] = useState([]);
    const [properties, setProperties] = useState([]);
    const [activeTab, setActiveTab] = useState('leads');
    const [loading, setLoading] = useState(true);
    const { profile, authenticated, token } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);
            const [leadsData, propsData] = await Promise.all([
                LeadService.getAgentLeads(token),
                PropertyService.getAgentProperties(token)
            ]);
            setLeads(leadsData);
            setProperties(propsData);
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authenticated && token) {
            fetchData();
        }
    }, [authenticated, token]);

    const handleStatusUpdate = async (leadId, newStatus) => {
        try {
            await LeadService.updateLeadStatus(leadId, newStatus, token);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading && authenticated) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-cobalt border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 max-w-lg">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v3m0-3h3m-3 0H9m12 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Unauthorized Access</h2>
                    <p className="text-gray-500 font-bold mb-8">Please login as an agent to access the management dashboard.</p>
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="bg-brand-cobalt text-white px-10 py-4 rounded-2xl font-black transition-all hover:bg-brand-navy shadow-lg shadow-brand-cobalt/20"
                    >
                        Login to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="h-24"></div>
            <main className="max-w-[1440px] mx-auto px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Agent Dashboard</h1>
                        <p className="text-gray-500 font-bold text-lg">Manage your sales pipeline and property listings</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Leads</p>
                            <p className="text-3xl font-black text-gray-900">{leads.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Listings</p>
                            <p className="text-3xl font-black text-brand-cobalt">{properties.length}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <button 
                        onClick={() => setActiveTab('leads')}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'leads' ? 'text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Leads
                        {activeTab === 'leads' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cobalt rounded-full"></div>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('properties')}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'properties' ? 'text-brand-cobalt' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        My Properties
                        {activeTab === 'properties' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cobalt rounded-full"></div>}
                    </button>
                </div>

                {activeTab === 'leads' ? (
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Property</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Message</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {leads.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold italic text-lg">
                                                No inquiries yet. Keep promoting your properties!
                                            </td>
                                        </tr>
                                    ) : (
                                        leads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="font-black text-gray-900">{lead.property.listing.title}</div>
                                                    <div className="text-gray-400 text-xs font-bold uppercase">{lead.property.listing.locationName}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-gray-900">{lead.contactName}</div>
                                                    <div className="text-gray-400 text-xs">{lead.contactEmail}</div>
                                                    <div className="text-gray-400 text-xs">{lead.contactPhone}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm text-gray-600 max-w-xs line-clamp-2">{lead.message}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        lead.status === 'NEW' ? 'bg-brand-cobalt/10 text-brand-cobalt' : 
                                                        lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <select 
                                                        value={lead.status}
                                                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                                                        className="text-xs font-bold border-none bg-gray-50 rounded-xl px-4 py-2 focus:ring-0 cursor-pointer"
                                                    >
                                                        <option value="NEW">New</option>
                                                        <option value="QUALIFIED">Qualified</option>
                                                        <option value="LOST">Lost</option>
                                                        <option value="CLOSED">Closed</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <div key={property.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/30 border border-gray-100 group hover:translate-y-[-4px] transition-all duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={property.listing.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"} 
                                        alt={property.listing.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-brand-cobalt uppercase">
                                        {property.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-black text-gray-900 mb-1">{property.listing.title}</h3>
                                    <p className="text-gray-400 text-sm font-bold mb-4">{property.listing.locationName}</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                        <span className="text-brand-cobalt font-black">Kz {property.price.toLocaleString()}</span>
                                        <button className="text-gray-300 hover:text-brand-cobalt transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AgentDashboard;
