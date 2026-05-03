import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { formatOpeningHours } from '../utils/formatters';

import Logo from './BrandLogo';

const Footer = () => {
    const [contactInfo, setContactInfo] = useState({
        address: 'Deanside VIC 3336',
        phone: '0431305009',
        email: 'instafixmobilerepair@gmail.com',
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
                    {/* Brand Column */}
                    <div>
                        <div className="mb-6">
                            <Logo dark={true} />
                        </div>
                        <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                            Your trusted local expert for fast, affordable mobile &amp; tablet repairs, refurbished smartphones and accessories in Deanside, Melton VIC.
                        </p>
                        <p className="text-[#b88746] font-bold italic text-sm mb-6">
                            "Fixed in a Flash — That's the Instafix Promise."
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=61588838410219" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href={`https://wa.me/61${contactInfo.phone.replace(/^0/, '')}`} className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Repair Services</Link></li>
                            <li><Link to="/shop?category=mobile" className="hover:text-primary transition-colors">Refurbished Phones</Link></li>
                            <li><Link to="/shop?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">We Also Buy</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="text-[#b88746] mt-0.5">✓</span> Old phones &amp; tablets
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#b88746] mt-0.5">✓</span> Broken phones (any condition)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#b88746] mt-0.5">✓</span> Water-damaged devices
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#b88746] mt-0.5">✓</span> iPhones &amp; Android phones
                            </li>
                        </ul>
                        <div className="mt-5 bg-[#b88746]/10 border border-[#b88746]/30 rounded-xl p-3 text-sm">
                            <p className="text-[#fdf5a6] font-bold mb-1">🚗 Home Pickup &amp; Delivery</p>
                            <p className="text-slate-400 text-xs">We come to you — book a pickup &amp; get your device back good as new!</p>
                        </div>
                        <div className="mt-3">
                            <Link to="/contact" className="inline-block bg-[#b88746] hover:bg-[#a1753a] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
                                Get a Quote
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 hover:text-primary transition-colors"
                                >
                                    <MapPin className="text-primary mt-0.5 shrink-0" size={16} />
                                    <span>{contactInfo.address}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Phone className="text-primary shrink-0" size={16} />
                                    <span>{contactInfo.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Mail className="text-primary shrink-0" size={16} />
                                    <span className="break-all">{contactInfo.email}</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instafixmobilerepair.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Globe className="text-primary shrink-0" size={16} />
                                    <span>www.instafixmobilerepair.com.au</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="text-primary mt-0.5 shrink-0" size={16} />
                                <div>
                                    <span className="text-green-400 font-bold">Mon – Sat: 7:00 AM – 7:00 PM</span>
                                    <p className="text-slate-500 text-xs mt-0.5">Sunday: By appointment</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Instafix Mobile Repairs. All rights reserved.</p>
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
