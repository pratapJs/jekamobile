import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const BookingForm = ({ serviceTitle, initialModel = '', className = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        deviceModel: initialModel,
        description: serviceTitle ? `Enquiry about: ${serviceTitle}` : ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        if (!formData.email && !formData.phone) {
            setStatus({ type: 'error', msg: 'Please provide either Email or Phone number.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const message = `${serviceTitle ? `Service: ${serviceTitle}\n` : ''}Device Model: ${formData.deviceModel}\nDetails: ${formData.description}`;

            await axios.post('/api/contact/message', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: message
            });

            setStatus({ type: 'success', msg: 'Booking request sent! We will contact you shortly.' });
            setFormData({ name: '', email: '', phone: '', deviceModel: '', description: '' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Failed to send request. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-lg border border-primary/10 ${className}`}>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Book a Repair</h3>
            <p className="text-sm text-slate-500 mb-6">Schedule your appointment now for priority service.</p>

            {status.msg && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary bg-slate-50"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-xs text-slate-500 -mb-2">
                        * Please provide at least one contact method
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary bg-slate-50"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary bg-slate-50"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Device Model"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary bg-slate-50"
                    value={formData.deviceModel}
                    onChange={e => setFormData({ ...formData, deviceModel: e.target.value })}
                    required
                />
                <textarea
                    rows="3"
                    placeholder="Additional Details..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary bg-slate-50"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Sending...' : <>Request Booking <ArrowRight size={20} /></>}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
