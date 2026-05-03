import React from 'react';
import { Star, ExternalLink, MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

const GOOGLE_REVIEW_URL = 'https://share.google/VnNX6fa4hc8WteYWC';

const Testimonials = () => {
    return (
        <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#b88746]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-[#b88746] font-bold tracking-wider uppercase text-sm">Customer Reviews</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-slate-900">What Our Customers Say</h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-lg">
                        We're just getting started! Be among our first customers to share your experience.
                    </p>
                </div>

                {/* Empty state — invite first reviews */}
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-slate-50 to-[#b88746]/5 border border-[#b88746]/20 rounded-3xl p-10 text-center shadow-sm"
                    >
                        {/* Star display */}
                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={36} className="text-[#FBBC05]" fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>

                        <MessageSquarePlus size={48} className="text-[#b88746] mx-auto mb-5" />

                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Your Review Matters!</h3>
                        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                            Had a great experience with us? Leave a genuine review on Google and help other customers find us. 
                            Every review helps us grow!
                        </p>

                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#b88746] hover:bg-[#a1753a] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl group"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google"
                                className="w-5 h-5 bg-white rounded-full p-0.5"
                            />
                            Leave a Review on Google
                            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        <p className="text-slate-400 text-sm mt-5">
                            Takes less than a minute · Helps us a lot 🙏
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
