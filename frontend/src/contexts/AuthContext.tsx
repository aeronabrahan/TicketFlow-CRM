import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUser } from "../services/auth";

import type { User } from "../types/user";

interface AuthContextType {
    token: string | null;
    user: User | null;
    loading: boolean;

    login: (token: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;

    isAdmin: boolean;
    isAgent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        if (!localStorage.getItem("token")) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshUser();
    }, []);

    async function login(token: string) {
        localStorage.setItem("token", token);

        setToken(token);

        await refreshUser();
    }

    function logout() {
        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,

                login,
                logout,
                refreshUser,

                isAdmin: user?.role === "Admin",
                isAgent: user?.role === "Agent",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}