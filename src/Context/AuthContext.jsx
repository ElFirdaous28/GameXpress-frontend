import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication when token changes
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const { data } = await api.get('v1/admin/user');
                    setUser(data);
                    setIsAuthenticated(true);
                } catch (err) {
                    logout();
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [token]); // Only runs when token changes

    // API headers setup (no need to fetch data here, just update headers)
    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    // Login action
    const login = async (email, password) => {
        const response = await api.post("v1/admin/login", { email, password });
        const token = response.data.data.token;

        localStorage.setItem("token", token);
        setToken(token); // Set the token here
        setIsAuthenticated(true);
        mergeCart();
        navigate("/dashboard");
    };

    // Register action
    const register = async ({ name, email, password, password_confirmation }) => {
        const response = await api.post("/v1/admin/register", {
            name,
            email,
            password,
            password_confirmation,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token); // Set the token here
        setUser(response.data.user);
        setIsAuthenticated(true);
        mergeCart();
        navigate("/dashboard");
    };

    // Logout action
    const logout = async () => {
        await api.post("v1/admin/logout");
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    const hasRole = (requiredRoles) => {
        if (!requiredRoles || requiredRoles.length === 0) return true;
        if (!user?.roles) return false;
        return requiredRoles.some(role => user.roles.includes(role));
    };

    const mergeCart = async () => {
        const cartData = JSON.parse(localStorage.getItem("cart"));

        if (cartData) {
            try {
                const response = await api.post("merge", { cart: cartData.items });
                console.log(response.data);
                localStorage.removeItem('cart')
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    console.log('Internal server error:', error.response.data);
                } else {
                    console.log("API error:", error);
                }
            }
        }
    };

    // Use useMemo to optimize context value, preventing unnecessary re-renders
    const contextValue = useMemo(() => ({
        login,
        register,
        logout,
        user,
        token,
        isAuthenticated,
        hasRole,
        loading
    }), [user, token, isAuthenticated, loading]); // Only recompute when dependencies change



    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
