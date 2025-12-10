import { api } from "./client"


const getSongs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/songs${id ? '/'+id : ''}`, { query })
    return response
}
// const getPopularSongs = async (id: string | undefined, query: Record<string, string> | undefined) => {
//     const response = await api.get(`/songs/get_popular_songs`, { query })
//     return response
// }

const createSong = async (body: unknown | undefined) => {
    const response = await api.post(`/songs`, { body })
    return response
}

const getSongTabs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/songs/${id ?? ''}/tabs`, { query })
    return response
}

const getFavoriteSongs = async (userId: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/songs/favorites/${userId}`, { query })
    return response
}


export const song = {
    getSongs,
    getSongTabs,
    getFavoriteSongs,
    createSong
}