import { createContext, useState, useEffect } from "react";
import { User } from "../interfaces/User";
import { login as loginService, autoLogin as autoLoginService } from "../services/api/user";

export const AuthContext = createContext<{
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}>({
    user: null,
    isLoggedIn: false,
    login: () => Promise.resolve(),
    logout: () => { },
    loading: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // datos del usuario loggeado
    const [loading, setLoading] = useState(false);

    // 🔹 Login
    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await loginService({ email, password });
            const { user, access_token, refresh_token } = response;


            localStorage.setItem("token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            // Aquí puedes guardar info básica del usuario
            setUser(user);
        } finally {
            setLoading(false)
        }
    };

    // 🔹 Logout
    const logout = () => {
        setLoading(true);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setLoading(false);
    };

    const autoLogin = async () => {
        setLoading(true);
        const localToken = localStorage.getItem("refresh_token");
        if (localToken) {
            const response = await autoLoginService({ refresh_token: localToken });
            const { user, access_token, refresh_token } = response as { user: User, access_token: string, refresh_token: string };
            setUser(user as User);
            localStorage.setItem("token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
        }
        setLoading(false);
    }
    useEffect(() => {
        autoLogin();
    }, []);
    // 🔹 Verificar sesión
    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
