import type {
    User,
    UserRequest
} from '~/types/user'

interface ApiResponse<T> {
    status?: string
    code?: number
    message?: string
    data?: T
}

export const userService = {

    async list(): Promise<User[]> {
        const config = useRuntimeConfig()

        const response = await $fetch<
            ApiResponse<User[]> | User[]
        >(`${config.public.apiBaseUrl}/users`, {
            method: 'GET',
            credentials: 'include'
        })

        if (Array.isArray(response)) {
            return response
        }

        return response.data ?? []
    },

    async getById(id: string): Promise<User> {
        const config = useRuntimeConfig()

        const response = await $fetch<
            ApiResponse<User> | User
        >(`${config.public.apiBaseUrl}/users/${id}`, {
            method: 'GET',
            credentials: 'include'
        })

        if ('data' in response && response.data) {
            return response.data
        }

        return response as User
    },

    async create(
        request: UserRequest
    ) {
        const config = useRuntimeConfig()

        return await $fetch<
            ApiResponse<User> | User
        >(`${config.public.apiBaseUrl}/users`, {
            method: 'POST',
            credentials: 'include',
            body: request
        })
    },

    async update(
        id: string,
        request: UserRequest
    ) {
        const config = useRuntimeConfig()

        return await $fetch<
            ApiResponse<User> | User
        >(`${config.public.apiBaseUrl}/users/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: request
        })
    },

    async delete(id: string) {
        const config = useRuntimeConfig()

        return await $fetch(
            `${config.public.apiBaseUrl}/users/${id}`,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        )
    }
}