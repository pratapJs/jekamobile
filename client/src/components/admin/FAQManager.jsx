import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2 } from 'lucide-react';

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [formData, setFormData] = useState({ q: '', a: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchFaqs(); }, []);

    const fetchFaqs = async () => {
        const res = await axios.get('/api/faqs');
        setFaqs(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`/api/faqs/${editingId}`, formData);
        } else {
            await axios.post('/api/faqs', formData);
        }
        setFormData({ q: '', a: '' });
        setEditingId(null);
        fetchFaqs();
    };

    const handleEdit = (faq) => {
        setFormData({ q: faq.q, a: faq.a });
        setEditingId(faq.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this FAQ?')) {
            await axios.delete(`/api/faqs/${id}`);
            fetchFaqs();
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit FAQ' : 'Add FAQ'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Question" value={formData.q} onChange={e => setFormData({ ...formData, q: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <textarea placeholder="Answer" rows="4" value={formData.a} onChange={e => setFormData({ ...formData, a: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-bold">{editingId ? 'Update' : 'Add'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ q: '', a: '' }); }} className="px-4 border rounded-lg">Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start group">
                        <div>
                            <h3 className="font-bold text-slate-900">{faq.q}</h3>
                            <p className="text-slate-600 mt-1">{faq.a}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(faq)} title="Edit" className="p-2 text-slate-400 hover:text-primary"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(faq.id)} title="Delete" className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQManager;
