import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatOpeningHours } from '../utils/formatters';

import Logo from './BrandLogo';

const Footer = () => {
    const [contactInfo, setContactInfo] = useState({
        address: 'Loading...',
        phone: 'Loading...',
        email: 'Loading...',

        openingHours: []
    });

    useEffect(() => {
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
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="mb-6">
                            <Logo dark={true} />
                        </div>
                        <p className="text-slate-400 mb-6">
                            Your one-stop destination for the latest mobile phones, premium accessories, and expert repair services.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=100057349364248" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="https://www.facebook.com/profile.php?id=100057349364248" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/shop?category=mobile" className="hover:text-primary transition-colors">Mobiles</a></li>
                            <li><a href="/shop?category=accessories" className="hover:text-primary transition-colors">Accessories</a></li>
                            <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Customer Care</h4>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">Warranty Policy</Link></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 hover:text-primary transition-colors"
                                >
                                    <MapPin className="text-primary mt-1" size={20} />
                                    <span>{contactInfo.address}</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary" size={20} />
                                <span>{contactInfo.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-3 hover:text-primary transition-colors"
                                >
                                    <Mail className="text-primary" size={20} />
                                    <span>{contactInfo.email}</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Jeka Mobile & Repair Shop. All rights reserved.</p>
                    <p className="mt-4 text-xs font-medium text-slate-500">
                        Website developed by:
                        <span className="text-[#b88746] font-bold text-sm ml-2">
                            Pratap @ GenApp Creation
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
