import React from 'react';
import { Smartphone, Tablet, Battery, Plug, Unlock, Droplets, Camera, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceGrid = () => {
    const services = [
        { icon: <Smartphone size={40} />, title: "Phone Screen Replacement", desc: "Cracked screen? We replace it fast with premium quality parts for all major brands.", link: "/services" },
        { icon: <Tablet size={40} />, title: "Tablet Screen Repair", desc: "iPad, Samsung Tab or any Android tablet — we fix screens and digitizers.", link: "/services" },
        { icon: <Battery size={40} />, title: "Battery Replacement", desc: "Restore your device's battery life. Same-day service available.", link: "/services" },
        { icon: <Droplets size={40} />, title: "Water Damage Repair", desc: "Expert cleaning and diagnostic for liquid damaged phones and tablets.", link: "/services" },
        { icon: <Plug size={40} />, title: "Charging Port Repair", desc: "Device not charging? We fix loose or broken ports quickly.", link: "/services" },
        { icon: <Camera size={40} />, title: "Camera Repair", desc: "Blurry photos or broken lens? We restore your camera to full clarity.", link: "/services" },
        { icon: <Truck size={40} />, title: "Home Pickup & Delivery", desc: "We come to you! Book a pickup, we fix your device & deliver it back — good as new.", link: "/contact" },
    ];

    return (
        <section id="services" className="py-20 bg-secondary text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-[#b88746] font-bold tracking-wider uppercase text-sm">What We Fix</span>
                    <h2 className="text-3xl font-bold text-white mt-2 mb-4">Expert Repair Services</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        We specialise in fixing phones and tablets of all brands. Fast, affordable, and backed by our quality guarantee. <strong className="text-[#fdf5a6]">Home pickup &amp; delivery available.</strong>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800 p-8 rounded-2xl hover:shadow-lg transition-all border border-slate-700/50 group text-center hover:-translate-y-1"
                        >
                            <Link to={service.link} className="w-16 h-16 bg-[#191919] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-[#fdf5a6] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                {service.icon}
                            </Link>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-slate-400 mb-6 text-sm leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* View all services CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#b88746] hover:bg-[#a1753a] text-white rounded-full font-bold transition-colors shadow-lg"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
