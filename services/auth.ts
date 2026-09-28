import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest
} from '~/types/auth'
import { useApi } from './api'

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const api = useApi()

    return await api<LoginResponse>('/auth/login', {
      method: 'POST',
      body: data
    })
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const api = useApi()

    return await api<LoginResponse>('/auth/register', {
      method: 'POST',
      body: data
    })
  },

  async forgotPassword(username: string): Promise<LoginResponse> {
    const api = useApi()

    return await api<LoginResponse>('/auth/forgot-password', {
      method: 'POST',
      body: {
        username
      }
    })
  },

  async logout(): Promise<LoginResponse> {
    const api = useApi()

    return await api<LoginResponse>('/auth/logout', {
      method: 'POST'
    })
  },

  async me(): Promise<LoginResponse> {
    const api = useApi()

    return await api<LoginResponse>('/auth/me')
  }
}