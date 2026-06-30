import api from "./api";

export async function getDashboardStats() {
    const response = await api.get("/tickets/dashboard");
    return response.data;
}