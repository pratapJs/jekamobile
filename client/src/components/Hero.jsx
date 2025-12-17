import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "/hero-new.jpg",
            title: "EXPERT",
            highlight: "MOBILE REPAIRS",
            subtitle: "Fast, reliable, and professional repairs for all your mobile devices. Screen replacements in under 30 minutes.",
            ctaText: "Book a Repair",
            ctaLink: "/services",
            colorData: "from-blue-400 to-emerald-400"
        },
        {
            id: 2,
            image: "/hero-new.jpg", // Reusing image for demo, can be changed later
            title: "PREMIUM",
            highlight: "ACCESSORIES",
            subtitle: "Protect and enhance your device with our curated collection of high-quality cases, chargers, and more.",
            ctaText: "Shop Accessories",
            ctaLink: "/shop?category=accessories",
            colorData: "from-[#b88746] to-[#fdf5a6]"
        },
        {
            id: 3,
            image: "/hero-new.jpg",
            title: "LATEST",
            highlight: "SMARTPHONES",
            subtitle: "Discover the latest flagship devices from top brands like Apple and Samsung at competitive prices.",
            ctaText: "View Mobiles",
            ctaLink: "/shop?category=mobile",
            colorData: "from-purple-400 to-pink-400"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative bg-slate-900 overflow-hidden h-[600px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
                    <img
                        src={slides[currentSlide].image}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-80"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
                <div className="max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                                {slides[currentSlide].title} <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].colorData}`}>
                                    {slides[currentSlide].highlight}
                                </span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                                {slides[currentSlide].subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <MotionLink
                                    to={slides[currentSlide].ctaLink}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-8 py-4 bg-gradient-to-r ${slides[currentSlide].colorData} text-white rounded-full font-bold hover:shadow-lg transition-shadow flex items-center gap-2`}
                                >
                                    {slides[currentSlide].ctaText} <ArrowRight size={20} />
                                </MotionLink>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
