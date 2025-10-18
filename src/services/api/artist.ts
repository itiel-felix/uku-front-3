import { api } from "./client"


const getArtists = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/artist/${id ?? ''}`, { query: query ?? {} })
    return response
}
const getArtistPage = async (id: string | undefined) => {
    const response = await api.get(`/artist/get_artist_page?id=${id ?? ''}`, { query: undefined })
    return response
}

const createArtist = async (body: unknown | undefined) => {
    const response = await api.post(`/artist`, { body })
    return response
}



export const artist = {
    getArtists,
    createArtist,
    getArtistPage
}