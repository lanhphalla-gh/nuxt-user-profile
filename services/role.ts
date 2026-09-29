import type { RoleRequest } from "~/types/role"

export const roleService = {

    /**
     * Get all roles
     */
    getAll() {
        return $fetch<any>('/api/roles')
    },


    /**
     * Get role by ID
     */
    getById(id: string) {
        return $fetch<any>(
            `/api/roles/${id}`
        )
    },


    /**
     * Create role
     */
    create(data: RoleRequest) {
        return $fetch<any>(
            '/api/roles',
            {
                method: 'POST',
                body: data
            }
        )
    },


    /**
     * Update role
     */
    update(
        id: string,
        data: RoleRequest
    ) {
        return $fetch<any>(
            `/api/roles/${id}`,
            {
                method: 'PUT',
                body: data
            }
        )
    },


    /**
     * Delete role
     */
    delete(id: string) {
        return $fetch<any>(
            `/api/roles/${id}`,
            {
                method: 'DELETE'
            }
        )
    }
}