import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        return <Navigate to="/admin-portal" replace />;
    }
    return children;
};

export default AdminRoute;
