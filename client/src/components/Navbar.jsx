import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './BrandLogo';

// Static business contact info — no API needed for the navbar
const PHONE = '0431 305 009';
const ADDRESS = 'Deanside VIC 3336';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isLinkActive = (path) => {
        if (path.includes('?')) {
            const [basePath, search] = path.split('?');
            return location.pathname === basePath && location.search.includes(search);
        }
        return location.pathname === path;
    };

    const getLinkClass = (path) => {
        const active = isLinkActive(path);
        return `relative text-base font-bold transition-colors tracking-wide group ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-[#b88746]'}`;
    };

    const LinkUnderline = () => (
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b88746] transition-all duration-300 group-hover:w-full"></span>
    );

    const getMobileLinkClass = (path) => {
        const active = isLinkActive(path);
        return `text-lg font-bold transition-colors ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-[#b88746]'}`;
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">

                        {/* Logo */}
                        <Link to="/" className="shrink-0">
                            <Logo />
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center space-x-7">
                            <Link to="/" className={getLinkClass('/')}>
                                Home
                                <LinkUnderline />
                            </Link>
                            <Link to="/shop?category=mobile" className={getLinkClass('/shop?category=mobile')}>
                                Refurbished Phones
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

                        {/* Desktop CTA — phone + call button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="tel:0431305009"
                                className="flex items-center gap-2 text-slate-700 font-semibold hover:text-[#b88746] transition-colors text-sm"
                            >
                                <Phone size={16} className="text-[#b88746]" />
                                {PHONE}
                            </a>
                            <a
                                href="tel:0431305009"
                                className="bg-[#b88746] hover:bg-[#a1753a] text-white text-sm font-bold px-4 py-2 rounded-full transition-colors shadow"
                            >
                                Call Now
                            </a>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden text-slate-800"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
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
                            <div className="px-6 py-5 flex flex-col space-y-4">
                                <Link to="/" className={getMobileLinkClass('/')} onClick={() => setIsOpen(false)}>Home</Link>
                                <Link to="/shop?category=mobile" className={getMobileLinkClass('/shop?category=mobile')} onClick={() => setIsOpen(false)}>Refurbished Phones</Link>
                                <Link to="/shop?category=accessories" className={getMobileLinkClass('/shop?category=accessories')} onClick={() => setIsOpen(false)}>Accessories</Link>
                                <Link to="/services" className={getMobileLinkClass('/services')} onClick={() => setIsOpen(false)}>Services</Link>
                                <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsOpen(false)}>Contact Us</Link>

                                <hr className="border-slate-100" />

                                {/* Quick contact in mobile menu */}
                                <a href="tel:0431305009" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-[#b88746] transition-colors">
                                    <Phone size={16} className="text-[#b88746]" />
                                    {PHONE}
                                </a>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Deanside+VIC+3336"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-slate-700 font-semibold hover:text-[#b88746] transition-colors"
                                >
                                    <MapPin size={16} className="text-[#b88746]" />
                                    {ADDRESS}
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
