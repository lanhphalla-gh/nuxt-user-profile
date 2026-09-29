import { ref, onMounted } from 'vue'

import {
    roleService,
    type Role
} from '~/services/role.service'

import {
    permissionService,
    type Permission
} from '~/services/permission.service'

import {
    rolePermissionService
} from '~/services/role-permission.service'


export const useRolePermission = () => {

    // =========================================================
    // Data
    // =========================================================

    const roles = ref<Role[]>([])

    const permissions =
        ref<Permission[]>([])


    const selectedRoleId =
        ref('')


    const selectedPermissionIds =
        ref<string[]>([])


    // =========================================================
    // UI State
    // =========================================================

    const loading = ref(false)

    const saving = ref(false)

    const errorMessage = ref('')

    const successMessage = ref('')


    // =========================================================
    // Load Roles
    // =========================================================

    const loadRoles = async () => {

        try {

            const response =
                await roleService.getAll()

            roles.value =
                response?.data ?? []

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load roles.'

        }
    }


    // =========================================================
    // Load Permissions
    // =========================================================

    const loadPermissions = async () => {

        try {

            const response =
                await permissionService.getAll()

            permissions.value =
                response?.data ?? []

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load permissions.'

        }
    }


    // =========================================================
    // Load Role Permissions
    // =========================================================

    const loadRolePermissions = async () => {

        if (!selectedRoleId.value) {

            selectedPermissionIds.value = []

            return
        }


        loading.value = true

        errorMessage.value = ''

        try {

            const response =
                await rolePermissionService.getByRoleId(
                    selectedRoleId.value
                )


            selectedPermissionIds.value =
                response?.data ?? []

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load role permissions.'

        } finally {

            loading.value = false
        }
    }


    // =========================================================
    // Role Changed
    // =========================================================

    const onRoleChange = async () => {

        successMessage.value = ''

        await loadRolePermissions()
    }


    // =========================================================
    // Permission Toggle
    // =========================================================

    const togglePermission = (
        permissionId: string
    ) => {

        const index =
            selectedPermissionIds.value.indexOf(
                permissionId
            )


        if (index === -1) {

            selectedPermissionIds.value.push(
                permissionId
            )

        } else {

            selectedPermissionIds.value.splice(
                index,
                1
            )
        }
    }


    // =========================================================
    // Check Permission
    // =========================================================

    const hasPermission = (
        permissionId: string
    ) => {

        return selectedPermissionIds.value.includes(
            permissionId
        )
    }


    // =========================================================
    // Save
    // =========================================================

    const save = async () => {

        if (!selectedRoleId.value) {

            errorMessage.value =
                'Please select a role.'

            return
        }


        saving.value = true

        errorMessage.value = ''

        successMessage.value = ''


        try {

            await rolePermissionService.update({

                roleId:
                    selectedRoleId.value,

                permissionIds:
                    selectedPermissionIds.value

            })


            successMessage.value =
                'Role permissions saved successfully.'

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to save role permissions.'

        } finally {

            saving.value = false
        }
    }


    // =========================================================
    // Initialize
    // =========================================================

    const initialize = async () => {

        loading.value = true

        errorMessage.value = ''

        try {

            await Promise.all([
                loadRoles(),
                loadPermissions()
            ])

        } finally {

            loading.value = false
        }
    }


    onMounted(() => {
        initialize()
    })


    // =========================================================
    // Return
    // =========================================================

    return {

        roles,

        permissions,

        selectedRoleId,

        selectedPermissionIds,

        loading,

        saving,

        errorMessage,

        successMessage,

        onRoleChange,

        togglePermission,

        hasPermission,

        save
    }
}