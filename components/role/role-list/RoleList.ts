import { ref, onMounted } from 'vue'

export interface Role {
    id?: string
    name: string
    description?: string
}

export const useRoleList = () => {

    const roles = ref<Role[]>([])

    const loading = ref(false)

    const errorMessage = ref('')


    const loadRoles = async () => {

        loading.value = true
        errorMessage.value = ''

        try {

            const response = await $fetch<any>(
                '/api/roles'
            )

            roles.value =
                response?.data ?? []

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load roles.'

        } finally {

            loading.value = false
        }
    }


    onMounted(() => {
        loadRoles()
    })


    return {
        roles,
        loading,
        errorMessage,
        loadRoles
    }
}