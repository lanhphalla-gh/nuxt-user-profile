export interface User {
  id?: string
  username: string
  role?: string
  permissions?: string[]
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  confirmPassword: string
}

export interface LoginResponse {
  status?: string
  code?: number | string
  message?: string

  data?: {
    user?: User
    role?: string
    permissions?: string[]
  }

  user?: User
  role?: string
  permissions?: string[]
}