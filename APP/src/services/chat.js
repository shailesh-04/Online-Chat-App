import axios from "./axios";

export const getConversations = async () => {
    const response = await axios.get("/chat/conversations");
    return response.data;
};

export const getMessage = async (id) => {
    const responce = await axios.get(`chat/messages/${id}`);
    return responce.data;
};
