import { api } from "./client"


const getFavorites = async (user_id: string | undefined) => {
    const response = await api.get(`/favorites/get_favorites`, { query: { user_id } })
    return response
}


const addFavorite = async (body: unknown | undefined) => {
    const response = await api.post(`/favorites/add_favorite`, { body })
    return response
}

const removeFavorite = async (body: Record<string, string>) => {
    const response = await api.delete(`/favorites/remove_favorite`, { body })
    return response
}


export const favorite = {
    getFavorites,
    addFavorite,
    removeFavorite
}