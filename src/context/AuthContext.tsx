import { createContext, useState, useEffect } from "react";
import { User } from "../interfaces/User";
import { login as loginService } from "../services/api/user";

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
    const [loading, setLoading] = useState(true);

    // Leer tokens del localStorage
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            // Opcional: podrías verificarlo llamando a /me o /profile
            setUser(null);
        }
        setLoading(false);
    }, []);

    // 🔹 Login
    const login = async (email: string, password: string) => {
        const response = await loginService({ email, password });
        const { user, access_token, refresh_token } = response;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Aquí puedes guardar info básica del usuario
        setUser(user);
    };

    // 🔹 Logout
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    };

    // 🔹 Verificar sesión
    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
