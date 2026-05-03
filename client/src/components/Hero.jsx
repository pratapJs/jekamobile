import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "/shop-cover.jpg",
            title: "INSTAFIX",
            highlight: "MOBILE REPAIRS",
            subtitle: "Your device, fixed instantly. Expert repairs for all phones & tablets — screen, battery, charging port and more. Local area home pickup & delivery available!",
            ctaText: "Book a Repair",
            ctaLink: "#book-appointment",
            colorData: "from-[#b88746] to-[#fdf5a6]"
        },
        {
            id: 2,
            image: "/hero-new.jpg",
            title: "FAST &",
            highlight: "RELIABLE FIXES",
            subtitle: "Cracked screen? Dead battery? Water damage? We bring your devices back to life with genuine parts and expert care.",
            ctaText: "View Our Services",
            ctaLink: "/services",
            colorData: "from-blue-400 to-emerald-400"
        },
        {
            id: 3,
            image: "/broken-phone-1.jpg",
            title: "WE BUY",
            highlight: "OLD & BROKEN PHONES",
            subtitle: "Don't throw away that damaged device! We pay cash for old, broken, or unwanted phones and tablets. Get an instant quote today.",
            ctaText: "Get a Quote",
            ctaLink: "/contact",
            colorData: "from-emerald-400 to-cyan-400"
        },
        {
            id: 4,
            image: "/mobile-hero.jpg",
            title: "QUALITY",
            highlight: "REFURBISHED PHONES",
            subtitle: "Affordable, certified refurbished smartphones from top brands like Apple, Samsung & more. All tested, all guaranteed.",
            ctaText: "Shop Refurbished",
            ctaLink: "/shop?category=mobile",
            colorData: "from-purple-400 to-pink-400"
        },
        {
            id: 5,
            image: "/accessories-hero.jpg",
            title: "PREMIUM",
            highlight: "ACCESSORIES",
            subtitle: "Protect and enhance your device with our curated collection of high-quality cases, chargers, screen protectors and more.",
            ctaText: "Shop Accessories",
            ctaLink: "/shop?category=accessories",
            colorData: "from-amber-400 to-orange-400"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleScroll = (e, link) => {
        if (link.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

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
                    <div className="absolute inset-0 bg-slate-900/65 z-10"></div>
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
                                    onClick={(e) => handleScroll(e, slides[currentSlide].ctaLink)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-8 py-4 bg-gradient-to-r ${slides[currentSlide].colorData} text-white rounded-full font-bold hover:shadow-lg transition-shadow flex items-center gap-2`}
                                >
                                    {slides[currentSlide].ctaText} <ArrowRight size={20} />
                                </MotionLink>
                                <a
                                    href="tel:0431305009"
                                    className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm"
                                >
                                    📞 0431 305 009
                                </a>
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
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
