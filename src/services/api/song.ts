import { api } from "./client"


const getSongs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/song/${id ?? ''}`, { query })
    return response
}
const getPopularSongs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/song/get_popular_songs`, { query })
    return response
}

const createSong = async (body: unknown | undefined) => {
    const response = await api.post(`/song`, { body })
    return response
}

const getSongTabs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/song/${id ?? ''}/tabs`, { query })
    return response
}


export const song = {
    getSongs,
    getSongTabs,
    getPopularSongs,
    createSong
}