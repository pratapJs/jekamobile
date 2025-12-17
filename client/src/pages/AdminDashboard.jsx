import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ProductManager from '../components/admin/ProductManager';
import FAQManager from '../components/admin/FAQManager';
import ServiceManager from '../components/admin/ServiceManager';
import ContactManager from '../components/admin/ContactManager';
import ProfileManager from '../components/admin/ProfileManager';
import NoticeManager from '../components/admin/NoticeManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) navigate('/login');
    }, []);

    const tabs = [
        { id: 'products', label: 'Products' },
        { id: 'faq', label: 'FAQ' },
        { id: 'services', label: 'Repair Services' },
        { id: 'contact', label: 'Contact Details' },
        { id: 'notice', label: 'Special Notice' },
        { id: 'profile', label: 'Admin Profile' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Package /> Admin Dashboard
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-4 font-medium transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'faq' && <FAQManager />}
                {activeTab === 'services' && <ServiceManager />}
                {activeTab === 'contact' && <ContactManager />}
                {activeTab === 'notice' && <NoticeManager />}
                {activeTab === 'profile' && <ProfileManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
