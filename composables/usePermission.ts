import { computed } from 'vue'

export function usePermission() {
    const { user } = useAuth()

    const permissions = computed<string[]>(() => {
        return user.value?.permissions ?? []
    })

    const hasPermission = (permission: string): boolean => {
        return permissions.value.includes(permission)
    }

    return {
        permissions,
        hasPermission
    }
}