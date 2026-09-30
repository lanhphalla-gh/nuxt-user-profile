import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import type { Permission }
    from './PermissionList'


export const usePermissionView = () => {

    const route = useRoute()


    const permission =
        ref<Permission | null>(null)

    const loading = ref(false)

    const errorMessage = ref('')


    const loadPermission = async () => {

        const id = route.query.id

        if (!id) {

            errorMessage.value =
                'Permission ID is required.'

            return
        }


        loading.value = true

        try {

            const response = await $fetch<any>(
                `/api/permissions/${id}`
            )

            permission.value =
                response?.data ?? null

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load permission.'

        } finally {

            loading.value = false
        }
    }


    onMounted(() => {
        loadPermission()
    })


    return {
        permission,
        loading,
        errorMessage,
        loadPermission
    }
}