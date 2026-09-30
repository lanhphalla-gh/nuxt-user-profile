import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import type { Role } from './RoleList'


export const useRoleView = () => {

    const route = useRoute()


    const role = ref<Role | null>(null)

    const loading = ref(false)

    const errorMessage = ref('')


    const loadRole = async () => {

        const id = route.query.id

        if (!id) {

            errorMessage.value =
                'Role ID is required.'

            return
        }


        loading.value = true

        try {

            const response = await $fetch<any>(
                `/api/roles/${id}`
            )

            role.value =
                response?.data ?? null

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load role.'

        } finally {

            loading.value = false
        }
    }


    onMounted(() => {
        loadRole()
    })


    return {
        role,
        loading,
        errorMessage,
        loadRole
    }
}