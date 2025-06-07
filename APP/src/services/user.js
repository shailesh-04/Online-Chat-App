import axiosInstance from "@services/axios";

export const login = async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
};
export const getMe = async () => {
    const response = await axiosInstance.get("/user/me");
    return response.data;
};

export const register = async (registerData) => {
    const response = await axiosInstance.post("/auth/register",registerData);
    return response.data;
};
