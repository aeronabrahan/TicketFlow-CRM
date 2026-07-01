import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { login: saveToken } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            const data = await login({
                username: email,
                password,
            });

            await saveToken(data.access_token);

            navigate("/dashboard");
            
        } catch (error: any) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert(JSON.stringify(error.response?.data));

        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

                <h1 className="text-4xl font-bold text-center">

                    TicketFlow

                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">

                    Customer Support CRM

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
                    >

                        Sign In

                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;