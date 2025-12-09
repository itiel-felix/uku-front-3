import { api } from "./client"


const getChords = async (chords: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/chords?list=${chords}`, { query })
    return response
}

export const chords = {
    getChords
}