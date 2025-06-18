import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/Auth";
import LoadingSpinner from "@components/LoadingSpinner";
const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
