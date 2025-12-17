import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone } from 'lucide-react';

const NoticeManager = () => {
    const [formData, setFormData] = useState({ noticeText: '', showNotice: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            if (res.data) {
                setFormData({
                    noticeText: res.data.noticeText || '',
                    showNotice: res.data.showNotice || false
                });
            }
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/contact', formData);
            alert('Notice settings updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update notice settings');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Megaphone size={24} />
                </div>
                <h2 className="text-xl font-bold">Manage Special Notice</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.showNotice}
                            onChange={e => setFormData({ ...formData, showNotice: e.target.checked })}
                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                        />
                        <span className="font-medium text-slate-700">Display Notice on Website</span>
                    </label>
                    <p className="text-sm text-slate-500 mt-2 ml-8">
                        When enabled, a banner will appear at the top of the home page with your message.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Notice Message</label>
                    <textarea
                        rows="4"
                        placeholder="e.g., Shop closed on Friday due to public holiday..."
                        value={formData.noticeText}
                        onChange={e => setFormData({ ...formData, noticeText: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                        Save Notice
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoticeManager;
