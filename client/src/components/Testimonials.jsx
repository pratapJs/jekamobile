import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Jenkins",
            rating: 5,
            date: "2 months ago",
            text: "Absolutely fantastic service! Dropped off my iPhone with a shattered screen and they fixed it in 20 minutes. The new screen looks perfect and the price was very reasonable. Highly recommend Jeka Mobile!",
            initial: "S"
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 5,
            date: "1 week ago",
            text: "Honest and professional. I thought I needed a new charging port, but they cleaned it out and it worked perfectly. Didn't charge me a cent for it. I'll definitely be back for any future repairs.",
            initial: "M"
        },
        {
            id: 3,
            name: "David Smith",
            rating: 5,
            date: "3 weeks ago",
            text: "Best mobile repair shop in Darwin! The staff are knowledgeable and friendly. They unlocked my Samsung phone quickly so I could use it overseas. Great communication throughout.",
            initial: "D"
        },
        {
            id: 4,
            name: "Emily Wilson",
            rating: 4,
            date: "1 month ago",
            text: "Great experience. Bought a refurbished iPhone for my son and it looks brand new. Comes with a warranty too which gives peace of mind. Thanks guys!",
            initial: "E"
        }
    ];

    return (
        <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-[#b88746]/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-6 border border-slate-200">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
                        <div className="flex text-[#b88746]">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">4.9 Rating</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">What Our Clients Say</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">Don't just take our word for it. Read reviews from our satisfied customers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors relative group hover:shadow-lg"
                        >
                            <Quote className="absolute top-6 right-6 text-slate-300 group-hover:text-primary/20 transition-colors" size={40} />

                            <div className="flex items-center gap-1 mb-4 text-[#b88746]">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">"{review.text}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-primary font-bold">
                                    {review.initial}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                                    <span className="text-xs text-slate-500">{review.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
