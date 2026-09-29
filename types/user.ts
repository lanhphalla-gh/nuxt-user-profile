export interface User {
    id: string
    username: string
    email: string
    roleId: string
    roleName: string
}

export interface UserRequest {
    username: string
    email: string
    password?: string
    roleId: string
}

export interface UserResponse {
    id: string
    username: string
    email: string
    roleId: string
    roleName: string
}