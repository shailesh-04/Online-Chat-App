import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context/Auth";
import LoadingSpinner from "@components/LoadingSpinner";
import AuthRoutes from "./Auth";
import ChatRoutes from "./Chat";
import NotFound from "@pages/NotFound";

export default function AppRoutes() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <Routes>
            <Route
                path="/*"
                element={isAuthenticated ? <ChatRoutes /> : <AuthRoutes />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
    