import { api } from "./client"


const getTabs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/tabs/${id ?? ''}`, { query })
    return response
}

const submitTab = async (body: unknown | undefined) => {
    const response = await api.post(`/tabs`, { body })
    return response
}

const generatePreview = async (body: unknown | undefined) => {
    const response = await api.post(`/tabs/generate_preview`, { body })
    return response
}


export const tab = {
    getTabs,
    submitTab,
    generatePreview
}