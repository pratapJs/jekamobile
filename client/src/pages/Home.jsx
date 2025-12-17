import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ServiceGrid from '../components/ServiceGrid';
import Testimonials from '../components/Testimonials';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

import BookingForm from '../components/BookingForm';
import NoticeBanner from '../components/NoticeBanner';
import { formatOpeningHours } from '../utils/formatters';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [contactInfo, setContactInfo] = useState({
        address: 'JEKA MOBILE AND REPAIR SHOP, SYDNEY, AUSTRALIA',
        phone: '0410186566',
        email: 'jekamobilerepair@gmail.com',
        openingHours: []
    });

    useEffect(() => {
        // Fetch featured products
        axios.get('/api/products?featured=true')
            .then(res => {
                setFeaturedProducts(res.data.slice(0, 8));
            })
            .catch(err => console.error(err));

        // Fetch contact info
        axios.get('/api/contact').then(res => {
            if (res.data) {
                setContactInfo(prev => ({
                    ...prev,
                    address: res.data.address || prev.address,
                    phone: res.data.phone || prev.phone,
                    email: res.data.email || prev.email,
                    openingHours: res.data.openingHours || prev.openingHours
                }));
            }
        }).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <NoticeBanner />
            <Hero />
            {/* Featured Products */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-semibold mb-2 block uppercase tracking-wider text-sm">Top Picks</span>
                            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
                        </div>
                        <Link to="/shop" className="text-slate-600 hover:text-primary font-medium flex items-center gap-1 group">
                            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onAdd={() => { }} />
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-12 text-slate-500">
                                Loading products...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Service Highlights Grid */}
            <ServiceGrid />

            {/* Book Appointment Section */}
            <section id="book-appointment" className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Book Your Repair Today</h2>
                            <p className="text-slate-600 mb-6 text-lg">
                                Don't let a broken device slow you down. Schedule an appointment with our expert technicians for fast, reliable service.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                    <span>Same-day repairs for most devices</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                    <span>Free diagnostics and quote</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                    <span>Warranty on all parts and labor</span>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <BookingForm className="shadow-2xl border-primary/5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Find Us Section */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Info */}
                        <div className="lg:w-1/3 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Visit Our Shop</h2>
                                <p className="text-slate-400 text-lg">
                                    We are conveniently located in {contactInfo.address.split(',')[1] || 'Sydney'}. Come visit us for all your mobile needs.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 group cursor-pointer"
                                >
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-[#b88746] transition-colors">Our Location</h3>
                                        <p className="text-slate-400 max-w-xs">{contactInfo.address}</p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-start gap-4 group cursor-pointer"
                                >
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-[#b88746] transition-colors">Phone Number</h3>
                                        <p className="text-slate-400">{contactInfo.phone}</p>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-start gap-4 group cursor-pointer"
                                >
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-[#b88746] transition-colors">Email Address</h3>
                                        <p className="text-slate-400">{contactInfo.email}</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746]">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Opening Hours</h3>
                                        <div className="text-slate-400 text-sm space-y-1">
                                            {formatOpeningHours(contactInfo.openingHours)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="lg:w-2/3 h-[400px] bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700">
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />
        </div>
    );
};

export default Home;
