import { User } from "../../interfaces/User"
import { api } from "./client"


const login = async (body: unknown | undefined): Promise<{ user: User, access_token: string, refresh_token: string }> => {
    const response = await api.post(`/user/login`, { body })
    return response as { user: User, access_token: string, refresh_token: string }
}
const register = async (body: unknown | undefined): Promise<{ user: User, access_token: string, refresh_token: string }> => {
    const response = await api.post(`/user/register`, { body })
    return response as { user: User, access_token: string, refresh_token: string }
}
const autoLogin = async (body: unknown | undefined): Promise<{ user: User, access_token: string, refresh_token: string }> => {
    const response = await api.post(`/user/auto_login`, { body })
    return response as { user: User, access_token: string, refresh_token: string }
}
export { login, register, autoLogin }