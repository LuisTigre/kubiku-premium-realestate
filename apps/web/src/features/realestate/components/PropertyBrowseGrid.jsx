import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropertyService } from '../services/PropertyService';
import { useLanguage } from '../../../context/LanguageContext';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Sparkles,
  Camera
} from 'lucide-react';

const PropertyBrowseGrid = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const { lang } = useLanguage();

    const t = {
        promoted: lang === 'en' ? 'Promoted' : 'Promovido',
        beds: lang === 'en' ? 'bd' : 'qt',
        baths: lang === 'en' ? 'ba' : 'wc',
        viewDetails: lang === 'en' ? 'View' : 'Ver',
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await PropertyService.getAllProperties();
                if (data && Array.isArray(data) && data.length > 0) {
                    setProperties(data);
                } else {
                    throw new Error('No properties found');
                }
            } catch (err) {
                console.warn('Backend fetch failed, using mock data:', err);
                const mockProperties = [
                    {
                        id: 1,
                        price: 37900000,
                        promoted: true,
                        listing: {
                            title: lang === 'en' ? 'Modern Luxury Villa in Talatona' : 'Vivenda de Luxo Moderna em Talatona',
                            locationName: 'Talatona, Luanda',
                            images: JSON.stringify(['/assets/hero.png', '/assets/new_listings.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 5, baths: 4, sqft: 450, type: lang === 'en' ? 'Villa' : 'Vivenda' })
                    },
                    {
                        id: 2,
                        price: 150000000,
                        promoted: true,
                        listing: {
                            title: lang === 'en' ? 'Exclusive Penthouse Ilha' : 'Penthouse Exclusiva na Ilha',
                            locationName: 'Ilha do Cabo, Luanda',
                            images: JSON.stringify(['/assets/recently_sold.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 3, baths: 3, sqft: 280, type: lang === 'en' ? 'Penthouse' : 'Cobertura' })
                    },
                    {
                        id: 3,
                        price: 85000000,
                        listing: {
                            title: lang === 'en' ? 'Family House Kilamba' : 'Casa Familiar no Kilamba',
                            locationName: 'Kilamba, Luanda',
                            images: JSON.stringify(['/assets/open_houses.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 4, baths: 2, sqft: 180, type: lang === 'en' ? 'House' : 'Casa' })
                    },
                    {
                        id: 4,
                        price: 45000000,
                        listing: {
                            title: lang === 'en' ? 'Cozy Apartment Viana' : 'Apartamento Aconchegante em Viana',
                            locationName: 'Viana, Luanda',
                            images: JSON.stringify(['/assets/new_listings.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 2, baths: 1, sqft: 90, type: lang === 'en' ? 'Apartment' : 'Apartamento' })
                    },
                    {
                        id: 5,
                        price: 210000000,
                        promoted: true,
                        listing: {
                            title: lang === 'en' ? 'Waterfront Estate Mussulo' : 'Propriedade à Beira-Mar Mussulo',
                            locationName: 'Mussulo, Luanda',
                            images: JSON.stringify(['/assets/hero.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 6, baths: 5, sqft: 650, type: lang === 'en' ? 'Estate' : 'Propriedade' })
                    },
                    {
                        id: 6,
                        price: 28000000,
                        listing: {
                            title: lang === 'en' ? 'Studio Apartment Maianga' : 'Estúdio no Maianga',
                            locationName: 'Maianga, Luanda',
                            images: JSON.stringify(['/assets/open_houses.png'])
                        },
                        propertyFeatures: JSON.stringify({ beds: 1, baths: 1, sqft: 45, type: lang === 'en' ? 'Studio' : 'Estúdio' })
                    }
                ];
                setProperties(mockProperties);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, [lang]);

    const toggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return `Kz ${(price / 1000000).toFixed(1)}M`;
        }
        return `Kz ${price?.toLocaleString()}`;
    };

    // Loading skeleton — mobile-optimized
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-6 md:py-10">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-[16/10] bg-gray-200 rounded-2xl md:rounded-3xl"></div>
                        <div className="space-y-2 pt-3 px-1">
                            <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded-lg w-1/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-6 md:py-10">
            {properties.map((property) => {
                if (!property) return null;

                const features = property.propertyFeatures 
                    ? (typeof property.propertyFeatures === 'string' ? JSON.parse(property.propertyFeatures) : property.propertyFeatures)
                    : {};
                
                const listing = property.listing || {};
                const images = listing.images 
                    ? (typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images)
                    : [];

                const isFav = favorites.has(property.id);

                return (
                    <Link 
                        key={property.id} 
                        to={`/property/${property.id}`}
                        className="group block"
                    >
                        {/* Image Container — Airbnb-style rounded card */}
                        <div className="relative aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden mb-2.5 md:mb-3">
                            <img 
                                src={images?.[0] || '/assets/hero.png'} 
                                alt={listing.title}
                                onError={(e) => { e.target.src = '/assets/hero.png'; }}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            
                            {/* Top-left badges */}
                            <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 flex items-center gap-1.5">
                                {property.promoted && (
                                    <span className="bg-brand-cobalt text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                                        <Sparkles className="w-2.5 h-2.5" />
                                        {t.promoted}
                                    </span>
                                )}
                                <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    {features.type || 'Property'}
                                </span>
                            </div>

                            {/* Favorite button */}
                            <button 
                                onClick={(e) => toggleFavorite(e, property.id)}
                                className={`absolute top-2.5 right-2.5 md:top-3 md:right-3 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                                    isFav 
                                        ? 'bg-white text-red-500' 
                                        : 'bg-black/20 backdrop-blur-sm text-white hover:bg-white hover:text-red-500'
                                }`}
                            >
                                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                            </button>

                            {/* Photo count */}
                            {images?.length > 1 && (
                                <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                    <Camera className="w-3 h-3" />
                                    {images.length}
                                </div>
                            )}

                            {/* Gradient overlay at bottom for depth */}
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Content — compact and info-dense for mobile */}
                        <div className="px-0.5">
                            {/* Title & Price */}
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-[15px] md:text-base font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-brand-cobalt transition-colors">
                                    {listing.title}
                                </h3>
                            </div>

                            {/* Location */}
                            <p className="text-gray-500 text-[13px] font-medium flex items-center mb-1.5">
                                <MapPin className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                                {listing.locationName}
                            </p>

                            {/* Features row — compact inline */}
                            <div className="flex items-center gap-3 text-gray-500 text-[12px] font-medium mb-1.5">
                                <span className="flex items-center gap-1">
                                    <Bed className="w-3.5 h-3.5 text-gray-400" />
                                    {features.beds || 0} {t.beds}
                                </span>
                                <span className="text-gray-300">·</span>
                                <span className="flex items-center gap-1">
                                    <Bath className="w-3.5 h-3.5 text-gray-400" />
                                    {features.baths || 0} {t.baths}
                                </span>
                                <span className="text-gray-300">·</span>
                                <span className="flex items-center gap-1">
                                    <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                                    {features.sqft || 0} m²
                                </span>
                            </div>

                            {/* Price — bold, prominent */}
                            <p className="text-[15px] md:text-base font-black text-gray-900">
                                {formatPrice(property.price)}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default PropertyBrowseGrid;
