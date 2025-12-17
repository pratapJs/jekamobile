import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './BrandLogo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                setSearchQuery(''); // clear after search or keep it? usually better to keep or clear depending on UX. Let's clear for now or keep sync. Actually standard is to keep it if we are on the page, but since we navigate, clearing is fine or we can leave it.
            }
        }
    };

    // Helper to determine if a link is active considering query params
    const isLinkActive = (path) => {
        // If the path has a query string (e.g. /shop?category=mobile)
        if (path.includes('?')) {
            const [basePath, search] = path.split('?');
            // Check if pathname matches AND search string matches (partially or fully)
            // Using includes since location.search might have extra params in future
            return location.pathname === basePath && location.search.includes(search);
        }
        // For standard paths, strict match
        // Exception: if we are on /shop but no category selected, maybe don't highlight specific categories?
        // But for Home '/', strict match is good.
        // For '/services', strict match or startsWith.
        // Let's go with strict match for top level items to be cleanest
        return location.pathname === path;
    };

    const getLinkClass = (path) => {
        const active = isLinkActive(path);
        return `text-lg font-bold transition-colors tracking-wide ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-primary'}`;
    };

    const getMobileLinkClass = (path) => {
        const active = isLinkActive(path);
        return `text-lg font-bold transition-colors ${active ? 'text-[#b88746]' : 'text-slate-700 hover:text-primary'}`;
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-slate-900 text-white py-2 text-xs md:text-sm">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#b88746]" />
                            <span>099999999</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-[#b88746]" />
                            <span>jekamobilerepair@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#b88746]" />
                        <span>Sydney, Australia</span>
                    </div>
                </div>
            </div>

            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/">
                            <Logo />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={getLinkClass('/')}>Home</Link>
                            <Link to="/shop?category=mobile" className={getLinkClass('/shop?category=mobile')}>Mobiles</Link>
                            <Link to="/shop?category=accessories" className={getLinkClass('/shop?category=accessories')}>Accessories</Link>
                            <Link to="/services" className={getLinkClass('/services')}>Services</Link>
                            <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
                            <Link to="/faq" className={getLinkClass('/faq')}>FAQ</Link>
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 focus:w-64 transition-all duration-300"
                                />
                                <Search
                                    className="absolute left-3 top-2.5 text-slate-400 cursor-pointer hover:text-primary transition-colors"
                                    size={18}
                                    onClick={handleSearch}
                                />
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
                                <Link to="/shop?category=mobile" className={getMobileLinkClass('/shop?category=mobile')} onClick={() => setIsOpen(false)}>Mobiles</Link>
                                <Link to="/shop?category=accessories" className={getMobileLinkClass('/shop?category=accessories')} onClick={() => setIsOpen(false)}>Accessories</Link>
                                <Link to="/services" className={getMobileLinkClass('/services')} onClick={() => setIsOpen(false)}>Services</Link>
                                <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
                                <Link to="/faq" className={getMobileLinkClass('/faq')} onClick={() => setIsOpen(false)}>FAQ</Link>

                                {/* Mobile Search */}
                                <div className="relative group pt-2">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') setIsOpen(false);
                                            handleSearch(e);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                                    />
                                    <Search
                                        className="absolute left-3 top-4.5 text-slate-400"
                                        size={18}
                                    />
                                </div>

                                <hr />
                                {/* Mobile Top Bar Info */}
                                <div className="space-y-3 pt-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-3">
                                        <Phone size={16} className="text-[#b88746]" />
                                        <span>0450 123 456</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-[#b88746]" />
                                        <span>jekamobilerepair@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={16} className="text-[#b88746]" />
                                        <span>Sydney, Australia</span>
                                    </div>
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
