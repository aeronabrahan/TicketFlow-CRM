import api from "./api";

interface LoginRequest {
    username: string;
    password: string;
}

export async function login(credentials: LoginRequest) {
    const formData = new URLSearchParams();

    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
}

export async function getCurrentUser() {
    const response = await api.get("/auth/me");

    return response.data;
}