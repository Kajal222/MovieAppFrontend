// src/components/PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const navigate = useNavigate();
    const tokenStr = sessionStorage.getItem("authToken") || localStorage.getItem("authToken")

    useEffect(() => {
        if (!tokenStr || tokenStr?.length === 0) {
            navigate("/login")
        }
    }, [tokenStr])

    return (
        tokenStr ? <Component /> : <Component />
    );
};

export default PrivateRoute;
