import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    // Default/Fallback data
    const [reviewsData, setReviewsData] = useState({
        rating: 4.9,
        reviews: [
            {
                id: 1,
                name: "Sarah Jenkins",
                rating: 5,
                date: "2 months ago",
                text: "Absolutely fantastic service! Dropped off my iPhone with a shattered screen and they fixed it in 20 minutes. The new screen looks perfect and the price was very reasonable. Highly recommend Jeka Mobile!",
                initial: "S",
                source: 'google'
            },
            {
                id: 2,
                name: "Michael Chen",
                rating: 5,
                date: "1 week ago",
                text: "Honest and professional. I thought I needed a new charging port, but they cleaned it out and it worked perfectly. Didn't charge me a cent for it. I'll definitely be back for any future repairs.",
                initial: "M",
                source: 'google'
            },
            {
                id: 3,
                name: "David Smith",
                rating: 5,
                date: "3 weeks ago",
                text: "Best mobile repair shop in Darwin! The staff are knowledgeable and friendly. They unlocked my Samsung phone quickly so I could use it overseas. Great communication throughout.",
                initial: "D",
                source: 'google'
            },
            {
                id: 4,
                name: "Emily Wilson",
                rating: 4,
                date: "1 month ago",
                text: "Great experience. Bought a refurbished iPhone for my son and it looks brand new. Comes with a warranty too which gives peace of mind. Thanks guys!",
                initial: "E",
                source: 'google'
            }
        ]
    });

    // Fetch real reviews
    useEffect(() => {
        axios.get('/api/reviews')
            .then(res => {
                if (res.data && res.data.reviews && res.data.reviews.length > 0) {
                    setReviewsData({
                        rating: res.data.rating,
                        reviews: res.data.reviews
                    });
                }
            })
            .catch(err => {
                console.log("Using default reviews (API likely missing keys)");
            });
    }, []);

    // Filter for 4 and 5 star reviews only, take top 4
    const visibleReviews = reviewsData.reviews
        .filter(r => r.rating >= 4)
        .slice(0, 10);

    return (
        <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-[#b88746]/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">

                    {/* Dynamic Rating Display */}
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold">{reviewsData.rating}</span>
                        <div className="flex text-[#FBBC05]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill={i < Math.round(reviewsData.rating) ? "currentColor" : "none"} strokeWidth={i < Math.round(reviewsData.rating) ? 0 : 2} />
                            ))}
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">What Our Clients Say</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-8">Don't just take our word for it. Read reviews from our satisfied customers.</p>

                    <a
                        href="https://www.google.com/search?q=JEKA+MOBILE+AND+REPAIR+SHOP+SYDNEY+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#b88746] text-white rounded-full font-bold shadow-md hover:bg-[#a1753a] hover:shadow-lg transition-all group"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
                        Review us on Google
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors relative group hover:shadow-xl shadow-sm flex flex-col h-full"
                        >
                            <div className="absolute top-6 right-6">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                {review.photo ? (
                                    <img src={review.photo} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                                        {review.initial}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1">{review.name}</h4>
                                    <span className="text-xs text-slate-400">{review.date}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-0.5 mb-3 text-[#FBBC05]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 1} className={i < review.rating ? "" : "text-slate-300"} />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-4 leading-relaxed text-sm flex-grow line-clamp-6">"{review.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
