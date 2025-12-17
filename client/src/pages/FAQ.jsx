import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('/api/faqs')
            .then(res => setFaqs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h1>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Plus size={20} className="text-primary" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 ml-7 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
