import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Smartphone, Battery, Droplets, Unlock, Cpu, Plug, Camera, Speaker, Shield, Clock, Award, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

import BookingForm from '../components/BookingForm';

const Services = () => {
    const [prices, setPrices] = useState({});

    // Static definition of services with design assets
    const serviceList = [
        { id: 'screen', title: "Phone screen replacement", icon: <Smartphone size={32} />, desc: "Cracked screen? We replace it with premium quality parts.", color: "bg-blue-50 text-blue-600" },
        { id: 'battery', title: "Battery replacement", icon: <Battery size={32} />, desc: "Restore your device's power with a brand new battery.", color: "bg-green-50 text-green-600" },
        { id: 'water', title: "Water Damage repair", icon: <Droplets size={32} />, desc: "Expert cleaning and diagnostic for liquid damaged devices.", color: "bg-cyan-50 text-cyan-600" },
        { id: 'unlock', title: "Unlock phone", icon: <Unlock size={32} />, desc: "Freedom to use any carrier. Safe and permanent unlocking.", color: "bg-purple-50 text-purple-600" },
        { id: 'software', title: "Software repair", icon: <Cpu size={32} />, desc: "Fix boot loops, crashes, and software glitches.", color: "bg-indigo-50 text-indigo-600" },
        { id: 'charging', title: "Charging port repair", icon: <Plug size={32} />, desc: "Device not charging? We fix loose or broken ports.", color: "bg-orange-50 text-orange-600" },
        { id: 'camera', title: "Camera repair", icon: <Camera size={32} />, desc: "Blurry photos? Focus issues? We restore your camera clarity.", color: "bg-pink-50 text-pink-600" },
        { id: 'speaker', title: "Speaker repair", icon: <Speaker size={32} />, desc: "Fix low volume, crackling sounds, or no audio issues.", color: "bg-teal-50 text-teal-600" }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const res = await axios.get('/api/services');
            // Map title -> price for easy lookup
            const priceMap = {};
            res.data.forEach(s => {
                priceMap[s.title] = s.price;
            });
            setPrices(priceMap);
        } catch (err) {
            console.error("Failed to fetch prices", err);
        }
    };

    const benefits = [
        { icon: <Award size={32} />, title: "10 Years Experience", desc: "Expert technicians you can trust." },
        { icon: <Shield size={32} />, title: "3 Months Warranty", desc: "Peace of mind on every repair." },
        { icon: <Clock size={32} />, title: "Fast Service", desc: "Most repairs done in 30 minutes." },
        { icon: <DollarSign size={32} />, title: "Competitive Prices", desc: "Best value for premium service." }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Professional Mobile Repairs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
                    >
                        Fast, reliable, and affordable. We bring your devices back to life with genuine parts and expert care.
                    </motion.p>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {benefits.map((b, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="text-blue-400 mb-3 flex justify-center">{b.icon}</div>
                                <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                                <p className="text-sm text-slate-400">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Price List */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase">Transparent Pricing</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Our Services</h2>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                            Comprehensive repair solutions for all your device needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {serviceList.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 flex-grow">{service.desc}</p>

                                <div className="w-full pt-4 border-t border-slate-100">
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Starts from</div>
                                    <div className="text-2xl font-bold text-primary">
                                        {prices[service.title] || <span className="text-slate-300 text-lg">Contact for Price</span>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section id="book-appointment" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900">Ready to Fix Your Device?</h2>
                            <p className="text-slate-500 mt-4">Book an appointment online and save time.</p>
                        </div>
                        <BookingForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
