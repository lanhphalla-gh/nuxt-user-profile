import type { RolePermissionRequest } from "~/types/role-permission"

export const rolePermissionService = {

    /**
     * Get permissions assigned to a role.
     */
    getByRoleId(roleId: string) {
        return $fetch<any>(
            `/api/role-permissions/role/${roleId}`
        )
    },


    /**
     * Assign permissions to a role.
     */
    assign(data: RolePermissionRequest) {
        return $fetch<any>(
            '/api/role-permissions',
            {
                method: 'POST',
                body: data
            }
        )
    },


    /**
     * Update permissions assigned to a role.
     */
    update(data: RolePermissionRequest) {
        return $fetch<any>(
            '/api/role-permissions',
            {
                method: 'PUT',
                body: data
            }
        )
    }
}