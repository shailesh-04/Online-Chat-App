// Updated AuthContext.js
import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import axiosInstance from "@services/axios";
import { getMe, login } from "@services/user";
import LoadingSpinner from "@components/LoadingSpinner";
import toast from "react-hot-toast";
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    const loginUser = async (userData) => {
        try {
            const data = await login(userData);
            setUser(data.user);
            setToken(data.tokenChat);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                "Login failed. Please try again.";
            throw new Error(message);
        } finally {
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.delete("/auth/logout");
            setUser(null);
            setIsAuthenticated(false);
            setToken(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const getAuth = useCallback(async () => {
        const toastId = toast.loading("Checking authentication...");
        try {
            const data = await getMe();
            if (data.user) {
                setUser(data.user);
                setToken(data.token);
                setIsAuthenticated(true);
                toast.success("Authenticated successfully!", { id: toastId });
            }
        } catch (error) {
            toast.error(error?.data?.message || "Auth sessoin is expire!", {
                id: toastId,
            });
            console.log(error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);
    const didRun = useRef(false);
    useEffect(() => {
        if (!didRun.current) {
            getAuth();
            didRun.current = true;
        }
    }, [getAuth]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                login: loginUser,
                logout,
                getAuth,
                token,
            }}
        >
            {loading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
