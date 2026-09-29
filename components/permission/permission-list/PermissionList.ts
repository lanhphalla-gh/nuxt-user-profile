import { ref, onMounted } from 'vue'

import {
    permissionService,
    type Permission
} from '~/services/permission.service'


export const usePermissionList = () => {

    const permissions =
        ref<Permission[]>([])

    const loading = ref(false)

    const errorMessage = ref('')


    const loadPermissions = async () => {

        loading.value = true

        errorMessage.value = ''

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

        } finally {

            loading.value = false
        }
    }


    onMounted(loadPermissions)


    return {
        permissions,
        loading,
        errorMessage,
        loadPermissions
    }
}