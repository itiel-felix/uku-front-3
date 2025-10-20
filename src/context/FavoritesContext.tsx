// src/context/FavoritesContext.tsx
import { createContext, useState, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth"
import { favorite } from "../services/api/favorite"
import { Favorite } from "../interfaces/Favorite";

interface FavoritesContextType {
    favorites: Favorite[];
    addFavorite: (song_id: string) => void;
    removeFavorite: (song_id: string) => void;
    getFavorites: () => Promise<Favorite[]>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    addFavorite: () => { },
    removeFavorite: () => { },
    getFavorites: () => Promise.resolve([] as Favorite[]),
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const { user } = useAuth()
    const addFavorite = async (song_id: string) => {
        const response = await favorite.addFavorite({ song_id, user_id: user?.id })
        setFavorites(prev => [...prev, response as Favorite])
    };
    const removeFavorite = async (song_id: string) => {
        try {
            await favorite.removeFavorite({ song_id, user_id: user?.id as string })
            setFavorites(prev => prev.filter(f => f.song_id !== song_id))
        } catch (error) {
            console.error(error)
        }
    };

    const getFavorites = async () => {
        const response = await favorite.getFavorites(user?.id)
        setFavorites(response as Favorite[])
        return response as Favorite[]
    }
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
