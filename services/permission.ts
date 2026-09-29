import type { PermissionRequest } from "~/types/permission"

export const permissionService = {

    /**
     * Get all permissions
     */
    getAll() {
        return $fetch<any>(
            '/api/permissions'
        )
    },


    /**
     * Get permission by ID
     */
    getById(id: string) {
        return $fetch<any>(
            `/api/permissions/${id}`
        )
    },


    /**
     * Create permission
     */
    create(data: PermissionRequest) {
        return $fetch<any>(
            '/api/permissions',
            {
                method: 'POST',
                body: data
            }
        )
    },


    /**
     * Update permission
     */
    update(
        id: string,
        data: PermissionRequest
    ) {
        return $fetch<any>(
            `/api/permissions/${id}`,
            {
                method: 'PUT',
                body: data
            }
        )
    },


    /**
     * Delete permission
     */
    delete(id: string) {
        return $fetch<any>(
            `/api/permissions/${id}`,
            {
                method: 'DELETE'
            }
        )
    }
}