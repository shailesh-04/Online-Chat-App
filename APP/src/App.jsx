import React from "react";
import { BrowserRouter } from "react-router-dom";
import Index from "./routers/_index";

export default function App() {
    return (
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    );
}
