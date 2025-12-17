import React, { useState, useEffect } from 'react';
import { PersonStanding, Plus, Minus, RotateCcw, Eye, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 100, // percentage
        highContrast: false,
        grayscale: false
    });
    const [contactInfo, setContactInfo] = useState({
        address: 'JEKA MOBILE AND REPAIR SHOP, SYDNEY, AUSTRALIA',
        phone: '0410186566',
        shopName: 'JEKA MOBILE'
    });

    useEffect(() => {
        // Fetch contact info for voice feature
        axios.get('/api/contact').then(res => {
            if (res.data) {
                setContactInfo(prev => ({
                    ...prev,
                    address: res.data.address || prev.address,
                    phone: res.data.phone || prev.phone
                }));
            }
        }).catch(console.error);
    }, []);

    // Apply Styles
    useEffect(() => {
        // Font Size
        document.documentElement.style.fontSize = `${settings.fontSize}%`;

        // Filters
        const body = document.body;
        if (settings.highContrast) body.classList.add('high-contrast');
        else body.classList.remove('high-contrast');

        if (settings.grayscale) body.classList.add('grayscale-mode');
        else body.classList.remove('grayscale-mode');

    }, [settings]);

    const handleReset = () => {
        setSettings({ fontSize: 100, highContrast: false, grayscale: false });
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
    };

    const handleSpeak = () => {
        window.speechSynthesis.cancel(); // Stop previous
        const text = `Welcome to ${contactInfo.shopName}. We are located at ${contactInfo.address}. Contact us at ${contactInfo.phone.split('').join(' ')}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Accessibility Menu"
            >
                {isOpen ? <X size={28} /> : <PersonStanding size={28} />}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 bg-white p-6 rounded-2xl shadow-2xl w-72 border border-slate-200"
                    >
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <PersonStanding size={20} className="text-primary" />
                            Accessibility Tools
                        </h3>

                        <div className="space-y-6">
                            {/* Font Size */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Text Size</label>
                                <div className="flex items-center justify-between bg-slate-100 rounded-lg p-2">
                                    <button
                                        onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(80, s.fontSize - 10) }))}
                                        className="p-2 hover:bg-white rounded-md transition-colors"
                                        aria-label="Decrease Font Size"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-bold text-slate-700 w-12 text-center">{settings.fontSize}%</span>
                                    <button
                                        onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(150, s.fontSize + 10) }))}
                                        className="p-2 hover:bg-white rounded-md transition-colors"
                                        aria-label="Increase Font Size"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Contrast & Grayscale */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-600">Visuals</label>
                                <button
                                    onClick={() => setSettings(s => ({ ...s, highContrast: !s.highContrast }))}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${settings.highContrast ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <span className="flex items-center gap-2"><Eye size={18} /> High Contrast</span>
                                    <div className={`w-4 h-4 rounded-full border ${settings.highContrast ? 'bg-yellow-400 border-yellow-400' : 'border-slate-300'}`}></div>
                                </button>

                                <button
                                    onClick={() => setSettings(s => ({ ...s, grayscale: !s.grayscale }))}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${settings.grayscale ? 'bg-slate-500 text-white border-slate-500' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <span className="flex items-center gap-2"><Eye size={18} /> Grayscale</span>
                                    <div className={`w-4 h-4 rounded-full border ${settings.grayscale ? 'bg-white border-white' : 'border-slate-300'}`}></div>
                                </button>
                            </div>

                            {/* Voice */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Audio</label>
                                <button
                                    onClick={handleSpeak}
                                    className="w-full flex items-center justify-center gap-2 bg-[#b88746] text-white p-3 rounded-lg hover:bg-[#a1753a] transition-colors font-semibold"
                                >
                                    <Volume2 size={18} /> Read Shop Info
                                </button>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={handleReset}
                                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm py-2"
                            >
                                <RotateCcw size={14} /> Reset all settings
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccessibilityWidget;
