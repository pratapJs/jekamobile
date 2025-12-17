import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

import Logo from './BrandLogo';

const Footer = () => {
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
                            <a href="https://www.facebook.com/profile.php?id=100057349364248" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="https://www.facebook.com/profile.php?id=100057349364248" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/profile.php?id=100057349364248" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/shop?category=mobile" className="hover:text-primary transition-colors">Mobiles</a></li>
                            <li><a href="/shop?category=accessories" className="hover:text-primary transition-colors">Accessories</a></li>
                            <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Customer Care</h4>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">Warranty Policy</Link></li>
                            <li><Link to="/login" className="hover:text-primary transition-colors">Admin Login</Link></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary mt-1" size={20} />
                                <span>JEKA MOBILE AND REPAIR SHOP, SYDNEY, AUSTRALIA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary" size={20} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary" size={20} />
                                <span>jekamobilerepair@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Pratap Creation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
