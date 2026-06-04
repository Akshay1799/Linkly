import { createContext, useState, useEffect } from "react";
import authApi from "../api/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const value = {
        user,
        isAuthenticated,
        loading,
    };

    const restoreSession = async () => {
        try {
            const data = await authApi.refreshSession();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};