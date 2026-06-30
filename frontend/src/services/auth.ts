import api from "./api";

interface LoginData {
    username: string;
    password: string;
}

export async function login(data: LoginData) {

    const form = new URLSearchParams();

    form.append("username", data.username);
    form.append("password", data.password);

    const response = await api.post(
        "/auth/login",
        form,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
}