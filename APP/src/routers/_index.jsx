import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/Auth";
import LoadingSpinner from "@components/LoadingSpinner";
import AuthRoutes from "./Auth";
import ChatRoutes from "./Chat";
import NotFound from "@pages/NotFound";
import { SocketProvider } from "@context/Socket";

export default function AppRoutes() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    isAuthenticated ? (
                        <SocketProvider>
                            <ChatRoutes />
                        </SocketProvider>
                    ) : (
                        <AuthRoutes />
                    )
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
