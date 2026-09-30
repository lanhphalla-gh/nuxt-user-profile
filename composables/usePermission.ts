import { computed } from 'vue'

export function usePermission() {

    const { user } = useAuth()

    const permissions = computed(() => {

        return user.value?.permissions ?? []
    })

    const hasPermission = (permission: string): boolean => {

        const result = permissions.value.some(
            item => item.name === permission
        )

        return result
    }

    return {
        permissions,
        hasPermission
    }
}