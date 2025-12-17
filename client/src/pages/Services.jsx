import React from 'react';
import { Smartphone, Monitor, Battery, Plug, Unlock, Droplets, Wrench, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    // Aligned with ServiceGrid.jsx
    const services = [
        { icon: <Smartphone size={40} />, title: "Screen Repair", desc: "Cracked screen replacement for all major brands.", price: "From $89" },
        { icon: <Battery size={40} />, title: "Battery Replacement", desc: "New life for your device with premium batteries.", price: "From $49" },
        { icon: <Plug size={40} />, title: "Charging Port", desc: "Fix charging issues and loose ports quickly.", price: "From $59" },
        { icon: <Unlock size={40} />, title: "Phone Unlocking", desc: "Fast unlocking for iPhones and Android devices.", price: "From $39" },
        { icon: <Droplets size={40} />, title: "Water Damage", desc: "Expert cleaning and revival for water damaged phones.", price: "Assessment $49" },
        { icon: <Monitor size={40} />, title: "Camera Repair", desc: "Blurry photos? We replace faulty cameras.", price: "From $69" },
    ];

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-semibold uppercase tracking-wider text-sm">Expert Care</span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Professional Repair Services</h2>
                    <p className="text-slate-500">
                        Fast, reliable, and affordable repairs for all your devices. We use only high-quality parts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {services.map((s, i) => (
                        <div key={i} className="p-8 border border-slate-100 rounded-2xl text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="text-primary bg-blue-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                            <p className="text-primary font-semibold text-lg">{s.price}</p>
                            <p className="text-sm text-slate-500 mt-2">{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Booking Section */}
                <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Book a Repair</h3>
                            <p className="text-slate-500 mb-6">
                                Fill out the form to schedule a repair service. Our technicians will contact you shortly.
                            </p>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
                                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
                                </div>
                                <input type="text" placeholder="Device Model" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
                                <textarea rows="4" placeholder="Describe the issue" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary"></textarea>
                                <button className="btn-primary w-full">Schedule Appointment</button>
                            </form>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src="/technician.jpg"
                                alt="Repair Service"
                                className="rounded-xl shadow-lg w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
