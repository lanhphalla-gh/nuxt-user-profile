import type { Permission } from './permission'
import type { Role } from './role'

export interface User {
    id?: string
    username: string
    role?: Role
    permissions?: Permission[]
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
    username?: string
    role?: Role
    permissions?: Permission[]
}