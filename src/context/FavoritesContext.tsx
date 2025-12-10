// src/context/FavoritesContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { favorite } from "../services/api/favorite"
import { Favorite } from "../interfaces/Favorite";

interface FavoritesContextType {
    favorites: Favorite[];
    addFavorite: (songId: string) => void;
    removeFavorite: (songId: string) => void;
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
    const addFavorite = async (songId: string) => {
        const response = await favorite.addFavorite({ songId, userId: user?.id })
        setFavorites(prev => [...prev, response as Favorite])
    };
    const removeFavorite = async (songId: string) => {
        try {
            await favorite.removeFavorite({ songId, userId: user?.id })
            setFavorites(prev => prev.filter(f => f.songId !== songId))
        } catch (error) {
            console.error(error)
        }
    };

    const getFavorites = async () => {
        if(user){
        const response = await favorite.getFavorites(user?.id)
        setFavorites(response as Favorite[])
        return response as Favorite[]
        }else{
            setFavorites([])
        }
        return []
    }
    useEffect(() => {
        getFavorites();
    }, [user]);
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
