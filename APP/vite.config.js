import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url';
import path from "path";

// Get __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@routers": path.resolve(__dirname, "./src/routers"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
});