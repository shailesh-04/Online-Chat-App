// axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            alert("Request Timeout: Server took too long to respond.");
        } else if (!error.response) {
            alert("Network Error: Server is unreachable.");
        }
        console.error(error.response.data.message || error.response.data);
        console.error(error.response.data || error.response);
        return Promise.reject(error.response);
    }
);
export const testApi = async () => {
    try {
        const response = await axiosInstance.get("/");
        console.log("API Response:", response.data);
        return true;
    } catch (error) {
        console.error("API Error:", error);
        return false;
    }
};

export default axiosInstance;
