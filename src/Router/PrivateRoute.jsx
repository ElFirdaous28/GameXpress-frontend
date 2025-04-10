// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ roles }) => {
    const { isAuthenticated, hasRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && !hasRole(roles)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
