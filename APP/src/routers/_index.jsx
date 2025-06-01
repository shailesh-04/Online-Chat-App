import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Auth from "./Auth";

export default function Index() {
    return (
        <Routes>
            <Route path="/*" element={<Chat />} />
            <Route path="/auth/*" element={<Auth />} />
        </Routes>
    );
}
