import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShoppingBag, Wrench, Calendar, Check, X, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, services: 0, appointments: 0 });
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [statsRes, apptRes] = await Promise.all([
                axios.get('/api/stats'),
                axios.get('/api/appointments')
            ]);
            setStats(statsRes.data);
            setAppointments(apptRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`/api/appointments/${id}`, { status });
            fetchData(); // Refresh to update stats and list
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
                <button onClick={fetchData} className="p-2 bg-white border rounded-full hover:bg-slate-50 transition-colors">
                    <RefreshCw size={20} className="text-slate-600" />
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Products</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.products}</h3>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                        <Wrench size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Active Services</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.services}</h3>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Pending Bookings</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.appointments}</h3>
                    </div>
                </motion.div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Recent Appointments</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Device / Issue</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {appointments.length > 0 ? (
                                appointments.map((appt) => (
                                    <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900">{appt.name}</p>
                                            <p className="text-xs text-slate-500">{appt.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-800">{appt.deviceModel}</p>
                                            <p className="text-xs text-slate-500 truncate max-w-xs">{appt.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(appt.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    appt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {appt.status === 'Pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => updateStatus(appt._id, 'Completed')}
                                                        className="p-1 hover:bg-green-100 text-green-600 rounded"
                                                        title="Mark Completed"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(appt._id, 'Cancelled')}
                                                        className="p-1 hover:bg-red-100 text-red-600 rounded"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        No appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
