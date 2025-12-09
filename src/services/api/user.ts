import { User } from "../../interfaces/User"
import { api } from "./client"


const login = async (body: unknown | undefined): Promise<{ user: User, token: string, refresh_token: string }> => {
    const response = await api.post(`/auth/login`, { body })
    return response as { user: User, token: string, refresh_token: string }
}
const register = async (body: unknown | undefined): Promise<{ user: User, token: string, refresh_token: string }> => {
    const response = await api.post(`/auth/register`, { body })
    return response as { user: User, token: string, refresh_token: string }
}
const autoLogin = async (body: unknown | undefined): Promise<{ user: User, token: string, refresh_token: string }> => {
    const response = await api.post(`/auth/auto_login`, { body })
    return response as { user: User, token: string, refresh_token: string }
}
export { login, register, autoLogin }