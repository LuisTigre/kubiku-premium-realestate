import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';

const PropertyBrowseGrid = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await PropertyService.getAllProperties();
                setProperties(data);
            } catch (err) {
                console.error('Error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 aspect-[4/3] rounded-[2.5rem] mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {properties.map((property) => {
                const features = typeof property.propertyFeatures === 'string' 
                    ? JSON.parse(property.propertyFeatures) 
                    : property.propertyFeatures;
                
                const images = typeof property.listing.images === 'string'
                    ? JSON.parse(property.listing.images)
                    : property.listing.images;

                return (
                    <Link 
                        key={property.id} 
                        to={`/property/${property.id}`}
                        className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand-cobalt/10 transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img 
                                src={images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6199f7e099?auto=format&fit=crop&q=80'} 
                                alt={property.listing.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[12px] font-black text-brand-cobalt shadow-lg">
                                    FOR SALE
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-cobalt transition-colors mb-1">
                                        {property.listing.title}
                                    </h3>
                                    <p className="text-gray-400 font-bold text-sm flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-brand-cobalt/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {property.listing.locationName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 mb-6">
                                <div className="flex items-center text-gray-500">
                                    <span className="text-gray-900 font-black mr-2">{features?.beds || 0}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Beds</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <span className="text-gray-900 font-black mr-2">{features?.baths || 0}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Baths</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <span className="text-gray-900 font-black mr-2">{features?.sqft || 0}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">m²</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="text-2xl font-black text-gray-900">
                                    Kz {property.price?.toLocaleString()}
                                </div>
                                <div className="w-10 h-10 rounded-2xl bg-brand-cobalt/5 flex items-center justify-center text-brand-cobalt group-hover:bg-brand-cobalt group-hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default PropertyBrowseGrid;
