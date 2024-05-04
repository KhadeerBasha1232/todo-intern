import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LoginRoute = () => {
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !localStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/" />;
}
export default LoginRoute