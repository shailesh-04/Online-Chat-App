import React from "react";
import { BrowserRouter } from "react-router-dom";
import Index from "./routers/_index";
import { Toaster } from "react-hot-toast";
import "./App.css";
import BgBubble from "@components/BgBubble";
import { AuthProvider } from "@context/Auth";
export default function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />
            <AuthProvider>
                <Index />
                <BgBubble />
            </AuthProvider>
        </BrowserRouter>
    );
}
