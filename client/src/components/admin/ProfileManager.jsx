import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import axios from 'axios';

const ProfileManager = () => {
    const navigate = useNavigate();

    // Profile Update Form Logic
    const [profileData, setProfileData] = useState({ username: '', password: '', newPassword: '', confirmPassword: '' });

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin-portal');
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        try {
            await axios.put('/api/admin/profile', profileData);
            alert('Profile updated successfully! Please login with new credentials.');
            handleLogout();
        } catch (err) {
            alert(err.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Update Admin Profile</h2>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Username</label>
                    <input type="text" value={profileData.username} onChange={e => setProfileData({ ...profileData, username: e.target.value })} className="w-full px-4 py-3 border rounded-lg" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <input type="password" value={profileData.password} onChange={e => setProfileData({ ...profileData, password: e.target.value })} className="w-full px-4 py-3 border rounded-lg" required />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input type="password" placeholder="Leave empty to keep current" value={profileData.newPassword} onChange={e => setProfileData({ ...profileData, newPassword: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" value={profileData.confirmPassword} onChange={e => setProfileData({ ...profileData, confirmPassword: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                    Update Credentials
                </button>
            </form>
        </div>
    );
};

export default ProfileManager;
