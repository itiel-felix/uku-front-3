import { api } from "./client"


const getFavorites = async (UserId: string | undefined) => {
    const response = await api.get(`/likeSongs/${UserId}`, { query: { UserId } })
    return response
}


const addFavorite = async (body: unknown | undefined) => {
    const response = await api.post(`/likeSongs`, { body })
    return response
}

const removeFavorite = async (body: Record<string, string>) => {
    const response = await api.delete(`/likeSongs`, { body })
    return response
}


export const favorite = {
    getFavorites,
    addFavorite,
    removeFavorite
}