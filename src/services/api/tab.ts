import { api } from "./client"


const getTabs = async (id: string | undefined, query: Record<string, string> | undefined) => {
    const response = await api.get(`/tab/${id ?? ''}`, { query })
    return response
}

const createTab = async (body: unknown | undefined) => {
    const response = await api.post(`/tab`, { body })
    return response
}

const generatePreview = async (body: unknown | undefined) => {
    const response = await api.post(`/tab/generate_preview`, { body })
    return response
}


export const tab = {
    getTabs,
    createTab,
    generatePreview
}