import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ServiceGrid from '../components/ServiceGrid';
import Testimonials from '../components/Testimonials';
import { ArrowRight, MapPin, Phone, Mail, Clock, CheckCircle, DollarSign, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import BookingForm from '../components/BookingForm';
import NoticeBanner from '../components/NoticeBanner';
import { formatOpeningHours } from '../utils/formatters';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [contactInfo, setContactInfo] = useState({
        address: 'Deanside VIC 3336',
        phone: '0431305009',
        email: 'instafixmobilerepair@gmail.com',
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
                            <span className="text-primary font-semibold mb-2 block uppercase tracking-wider text-sm">Quality Picks</span>
                            <h2 className="text-3xl font-bold text-slate-900">Refurbished Phones &amp; Accessories</h2>
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

            {/* ===== WE BUY OLD & BROKEN PHONES SECTION ===== */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#b88746]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-14">

                        {/* Left: Text & Benefits */}
                        <div className="lg:w-1/2">
                            <span className="inline-flex items-center gap-2 bg-[#b88746]/20 border border-[#b88746]/40 text-[#fdf5a6] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                                <DollarSign size={12} /> Cash For Your Device
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                We Buy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b88746] to-[#fdf5a6]">Old &amp; Broken</span> Phones
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Don't let that damaged device collect dust! Whether it's cracked, water-damaged, or just old — we'll give you <strong className="text-white">instant cash</strong> on the spot. Any brand, any condition.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "iPhones, Samsung, Oppo, Xiaomi & all brands",
                                    "Cracked screens & water-damaged phones welcome",
                                    "Old or non-working devices accepted",
                                    "Instant cash paid — no waiting",
                                    "Free, no-obligation valuation",
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3 text-slate-300"
                                    >
                                        <CheckCircle size={20} className="text-[#b88746] shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b88746] to-[#fdf5a6] text-slate-900 font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-[#b88746]/30 transition-all"
                                >
                                    <Zap size={18} /> Get an Instant Quote
                                </Link>
                                <a
                                    href="tel:0431305009"
                                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    📞 0431 305 009
                                </a>
                            </div>
                        </div>

                        {/* Right: Broken Phone Photos */}
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <img
                                    src="/broken-phone-1.jpg"
                                    alt="Cracked phone screen — we buy broken phones"
                                    className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-4 left-4 text-white text-sm font-bold">Cracked Screen</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="relative group mt-8"
                            >
                                <img
                                    src="/broken-phone-2.jpg"
                                    alt="Scratched phone — we buy old phones"
                                    className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-4 left-4 text-white text-sm font-bold">Any Condition</div>
                            </motion.div>

                            {/* Cash banner */}
                            <div className="col-span-2 bg-[#b88746]/20 border border-[#b88746]/40 rounded-2xl p-4 text-center">
                                <p className="text-[#fdf5a6] font-bold text-lg">💰 Walk in with a broken phone. Walk out with cash.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                    <span>Warranty on all parts and labour</span>
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
                                    Conveniently located in <strong className="text-white">Deanside VIC 3336</strong>. Come visit us Monday to Saturday, 7am–7pm. Local area home pickup &amp; delivery also available.
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

                                <a href={`tel:${contactInfo.phone}`} className="flex items-start gap-4 group cursor-pointer">
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-[#b88746] transition-colors">Phone Number</h3>
                                        <p className="text-slate-400">{contactInfo.phone}</p>
                                    </div>
                                </a>

                                <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-4 group cursor-pointer">
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-[#b88746] transition-colors">Email Address</h3>
                                        <p className="text-slate-400 break-all">{contactInfo.email}</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-3 rounded-full text-[#b88746]">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Opening Hours</h3>
                                        <p className="text-green-400 font-bold text-lg">Mon – Sat: 7:00 AM – 7:00 PM</p>
                                        <p className="text-slate-400 text-sm">Sunday: By appointment</p>
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
                                title="Instafix Mobile Repairs Location"
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
