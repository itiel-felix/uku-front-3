export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
/**
 * Options for the API client
 * @param Body - The body of the request
 * @param Query - The query of the request
 * @param Headers - The headers of the request
 */
export interface RequestOptions<TBody = unknown | undefined, TQuery = unknown | undefined> {
    body?: TBody
    query?: TQuery
    headers?: Record<string, string>
}
const buildQueryString = (query: Record<string, string>) => {
    return Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}

/**
 * API client
 * @param url - The url of the request
 * @param options - The options of the request
 * @returns The response of the request
 */
export async function apiClient<TResponse = unknown, Tbody = unknown, Tquery = unknown | undefined>
    (
        url: string,
        method: HttpMethod,
        options: RequestOptions<Tbody | undefined, Tquery | undefined>
    ): Promise<TResponse> {
    const { query, body, headers } = options;
    const queryString = query ? '?' + buildQueryString(query as Record<string, string>) : ''
    const fullUrl = BASE_URL + url + queryString
    console.log(`Fetching to  ${fullUrl}`)
    let response;
    try{
    response = await fetch(fullUrl, {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
    }catch (e){
        console.log(e)
    }
    return response.json()
}

export const api = {
    get: (url: string, options: RequestOptions<unknown | undefined, unknown | undefined>) => apiClient(url, 'GET', options),
    post: (url: string, options: RequestOptions<unknown | undefined, unknown | undefined>) => apiClient(url, 'POST', options),
    put: (url: string, options: RequestOptions<unknown | undefined, unknown | undefined>) => apiClient(url, 'PUT', options),
    delete: (url: string, options: RequestOptions<unknown | undefined, unknown | undefined>) => apiClient(url, 'DELETE', options),
}