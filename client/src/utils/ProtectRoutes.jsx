import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router';

const ProtectRoutes = ({ children, setPage }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate(setPage);
        }
    }, [auth.isAuthenticated, setPage]);
    
    return auth.isAuthenticated ? <Outlet /> : null;
};


export default ProtectRoutes