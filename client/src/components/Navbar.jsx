import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './BrandLogo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        phone: 'Loading...',
        email: 'Loading...',
        address: 'Loading...'
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            if (res.data) {
                setContactInfo(prev => ({
                    ...prev,
                    phone: res.data.phone || prev.phone,
                    email: res.data.email || prev.email,
                    address: res.data.address || prev.address
                }));
            }
        }).catch(err => console.error(err));
    }, []);



    // Helper to determine if a link is active considering query params
    const isLinkActive = (path) => {
        if (path.includes('?')) {
            const [basePath, search] = path.split('?');
            return location.pathname === basePath && location.search.includes(search);
        }
        return location.pathname === path;
    };

    const getLinkClass = (path) => {
        const active = isLinkActive(path);
        return `relative text-lg font-bold transition-colors tracking-wide group ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-primary'}`;
    };

    const LinkUnderline = () => (
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b88746] transition-all duration-300 group-hover:w-full"></span>
    );

    const getMobileLinkClass = (path) => {
        const active = isLinkActive(path);
        return `text-lg font-bold transition-colors ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-primary'}`;
    };

    return (
        <>


            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center h-full">
                        {/* Logo */}
                        <Link to="/">
                            <Logo />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={getLinkClass('/')}>
                                Home
                                <LinkUnderline />
                            </Link>
                            <Link to="/shop?category=mobile" className={getLinkClass('/shop?category=mobile')}>
                                Mobiles
                                <LinkUnderline />
                            </Link>
                            <Link to="/shop?category=accessories" className={getLinkClass('/shop?category=accessories')}>
                                Accessories
                                <LinkUnderline />
                            </Link>



                            <Link to="/services" className={getLinkClass('/services')}>
                                Services
                                <LinkUnderline />
                            </Link>

                            <Link to="/contact" className={getLinkClass('/contact')}>
                                Contact Us
                                <LinkUnderline />
                            </Link>


                        </div>

                        {/* Actions */}
                        <div className="hidden lg:flex items-center space-x-6">


                            {/* Contact Info - Inline */}
                            <div className="hidden xl:flex items-center gap-6 text-slate-700 font-medium">
                                <div className="flex items-center gap-2">
                                    <Phone size={18} className="text-[#b88746]" />
                                    <span>{contactInfo.phone}</span>
                                </div>

                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#b88746] transition-colors">
                                    <MapPin size={18} className="text-[#b88746]" />
                                    <span>{contactInfo.address}</span>
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-slate-100"
                        >
                            <div className="px-6 py-4 flex flex-col space-y-4">
                                <Link to="/" className={getMobileLinkClass('/')} onClick={() => setIsOpen(false)}>Home</Link>

                                <Link to="/services" className={getMobileLinkClass('/services')} onClick={() => setIsOpen(false)}>Services</Link>
                                <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
                                <Link to="/faq" className={getMobileLinkClass('/faq')} onClick={() => setIsOpen(false)}>FAQ</Link>



                                <hr />
                                {/* Mobile Top Bar Info */}
                                <div className="space-y-4 pt-4 text-lg font-medium text-slate-700">
                                    <div className="flex items-center gap-3">
                                        <Phone size={16} className="text-[#b88746]" />
                                        <span>{contactInfo.phone}</span>
                                    </div>

                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 hover:text-[#b88746] transition-colors"
                                    >
                                        <MapPin size={16} className="text-[#b88746]" />
                                        <span>{contactInfo.address}</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
