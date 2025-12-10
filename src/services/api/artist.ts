import { api } from "./client"


const getArtists = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/artists${id ? '/'+id : '' }`, { query: query ?? {} })
    return response
}
const getArtistPage = async (id: string | undefined) => {
    const response = await api.get(`/artists/page/${id ?? ''}`, { query: undefined })
    return response
}

const createArtist = async (body: unknown | undefined) => {
    const response = await api.post(`/artists`, { body })
    return response
}



export const artist = {
    getArtists,
    createArtist,
    getArtistPage
}