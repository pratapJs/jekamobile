import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NoticeBanner = () => {
    const [notice, setNotice] = useState({ text: '', show: false });
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            if (res.data) {
                setNotice({
                    text: res.data.noticeText || '',
                    show: res.data.showNotice || false
                });
            }
        }).catch(err => console.error(err));
    }, []);

    if (!notice.show || !notice.text || !visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white relative overflow-hidden z-20"
            >
                <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="bg-white/20 p-1.5 rounded-full shrink-0 animate-pulse">
                            <Megaphone size={16} className="text-white" />
                        </div>
                        <div className="flex-1 overflow-hidden relative h-6">
                            {/* Marquee effect for long text, static for short? For now simple infinite scroll if it overflows is tricky without measuring. 
                                Let's standard scrolling marquee if text is long, or just centered text.
                                The user asked for "moving or highlighted". Let's do a subtle slide up/in or just a marquee if we want to be safe.
                                Actually, a clean scrolling marquee is often best for notices.
                            */}
                            <div className="animate-marquee whitespace-nowrap font-medium">
                                {notice.text} &nbsp; • &nbsp; {notice.text} &nbsp; • &nbsp; {notice.text} &nbsp; • &nbsp; {notice.text}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setVisible(false)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
                        aria-label="Close notice"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* CSS for marquee */}
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: inline-block;
                        animation: marquee 20s linear infinite;
                    }
                    /* On hover pause */
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
};

export default NoticeBanner;
