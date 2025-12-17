import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Loader } from 'lucide-react';

const FIXED_SERVICES = [
    "Phone screen replacement",
    "Battery replacement",
    "Water Damage repair",
    "Unlock phone",
    "Software repair",
    "Charging port repair",
    "Camera repair",
    "Speaker repair"
];

const ServiceManager = () => {
    const [dbServices, setDbServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prices, setPrices] = useState({}); // Local state for inputs: { "Service Name": "price" }
    const [saving, setSaving] = useState({}); // { "Service Name": boolean }

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('/api/services');
            setDbServices(res.data);

            // Initialize local price state from DB
            const initialPrices = {};
            FIXED_SERVICES.forEach(serviceName => {
                const found = res.data.find(s => s.title === serviceName);
                if (found) initialPrices[serviceName] = found.price;
            });
            setPrices(initialPrices);
        } catch (err) {
            console.error("Failed to fetch services", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePriceChange = (serviceName, value) => {
        setPrices(prev => ({ ...prev, [serviceName]: value }));
    };

    const handleSave = async (serviceName) => {
        setSaving(prev => ({ ...prev, [serviceName]: true }));
        const currentPrice = prices[serviceName];

        // Find if it already exists in DB
        const existingService = dbServices.find(s => s.title === serviceName);

        try {
            if (existingService) {
                // Update
                await axios.put(`/api/services/${existingService.id}`, {
                    title: serviceName,
                    price: currentPrice
                });
            } else {
                // Create
                await axios.post('/api/services', {
                    title: serviceName,
                    price: currentPrice,
                    description: "Standard Repair Service", // Default description
                    category: "General",
                    device: "General"
                });
            }
            // Refresh to get new IDs etc
            await fetchServices();
            alert(`Price for ${serviceName} updated!`);
        } catch (err) {
            console.error(err);
            alert("Failed to save price. Please try again.");
        } finally {
            setSaving(prev => ({ ...prev, [serviceName]: false }));
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading services...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Manage Repair Prices</h2>
                <p className="text-slate-500 mb-8">Set the starting price for the 8 core services. These will reflect immediately on the Services page.</p>

                <div className="space-y-4">
                    {FIXED_SERVICES.map((serviceName, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-lg">{serviceName}</h3>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="text"
                                        placeholder="Start Price"
                                        value={prices[serviceName] || ''}
                                        onChange={(e) => handlePriceChange(serviceName, e.target.value)}
                                        className="pl-7 pr-4 py-2 border rounded-lg w-32 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-bold text-slate-900"
                                    />
                                </div>
                                <button
                                    onClick={() => handleSave(serviceName)}
                                    disabled={saving[serviceName]}
                                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 min-w-[100px] justify-center"
                                >
                                    {saving[serviceName] ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                                    {saving[serviceName] ? 'Saving' : 'Save'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
