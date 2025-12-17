import React from 'react';
import { Smartphone, Monitor, Battery, Plug, Unlock, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceGrid = () => {
    const services = [
        { icon: <Smartphone size={40} />, title: "Screen Repair", desc: "Cracked screen replacement for all major brands.", link: "/services" },
        { icon: <Battery size={40} />, title: "Battery Replacement", desc: "New life for your device with premium batteries.", link: "/services" },
        { icon: <Plug size={40} />, title: "Charging Port", desc: "Fix charging issues and loose ports quickly.", link: "/services" },
        { icon: <Unlock size={40} />, title: "Phone Unlocking", desc: "Fast unlocking for iPhones and Android devices.", link: "/services" },
        { icon: <Droplets size={40} />, title: "Water Damage", desc: "Expert cleaning and revival for water damaged phones.", link: "/services" },
        { icon: <Monitor size={40} />, title: "Camera Repair", desc: "Blurry photos? We replace faulty cameras.", link: "/services" },
    ];

    return (
        <section className="py-20 bg-[#191919] text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Expert Repair Services</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">We specialize in fixing the unfixable. From simple screen swaps to complex motherboard repairs, we handle it all.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#2a2a2a] p-8 rounded-2xl hover:shadow-lg transition-all border border-slate-700/50 group text-center hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 bg-[#191919] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-[#fdf5a6] group-hover:bg-[#b88746] group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-slate-400 mb-6 text-sm leading-relaxed">{service.desc}</p>
                            <Link to={service.link} className="text-[#b88746] font-bold text-sm uppercase tracking-wider hover:text-[#fdf5a6] transition-colors">
                                Learn More
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
