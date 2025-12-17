import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Clock } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ContactManager = () => {
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        email: '',
        openingHours: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            if (res.data) {
                // Initialize openingHours if it's missing or a string (legacy)
                let hours = res.data.openingHours;
                if (!Array.isArray(hours) || hours.length === 0) {
                    hours = DAYS.map(day => ({
                        day,
                        isOpen: true,
                        start: '09:00',
                        end: '17:00'
                    }));
                } else {
                    // Ensure all days are present (in case of partial data)
                    // This is a simple merge strategy
                    hours = DAYS.map(day => {
                        const existing = hours.find(h => h.day === day);
                        return existing || { day, isOpen: true, start: '09:00', end: '17:00' };
                    });
                }

                setFormData({
                    address: res.data.address || '',
                    phone: res.data.phone || '',
                    email: res.data.email || '',
                    openingHours: hours
                });
            }
            setLoading(false);
        });
    }, []);

    const handleDayChange = (index, field, value) => {
        const newHours = [...formData.openingHours];
        newHours[index] = { ...newHours[index], [field]: value };
        setFormData({ ...formData, openingHours: newHours });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/contact', formData);
            alert('Contact details updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update details');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-primary" /> Manage Contact & Hours
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                {/* Opening Hours Schedule */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Weekly Schedule</h3>
                    <div className="space-y-3">
                        {formData.openingHours.map((day, index) => (
                            <div key={day.day} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="w-28 font-medium text-slate-700">{day.day}</div>

                                <label className="flex items-center gap-2 cursor-pointer min-w-[100px]">
                                    <input
                                        type="checkbox"
                                        checked={day.isOpen}
                                        onChange={e => handleDayChange(index, 'isOpen', e.target.checked)}
                                        className="w-4 h-4 text-primary rounded"
                                    />
                                    <span className={`text-sm ${day.isOpen ? 'text-green-600 font-medium' : 'text-slate-400'}`}>
                                        {day.isOpen ? 'Open' : 'Closed'}
                                    </span>
                                </label>

                                {day.isOpen && (
                                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
                                        <input
                                            type="time"
                                            value={day.start}
                                            onChange={e => handleDayChange(index, 'start', e.target.value)}
                                            className="px-2 py-1 border rounded text-sm focus:border-primary outline-none"
                                        />
                                        <span className="text-slate-400">-</span>
                                        <input
                                            type="time"
                                            value={day.end}
                                            onChange={e => handleDayChange(index, 'end', e.target.value)}
                                            className="px-2 py-1 border rounded text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        <Save size={20} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactManager;
