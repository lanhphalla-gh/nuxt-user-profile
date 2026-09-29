import { computed } from 'vue'

export function useDashboardSidebar() {
    const { hasPermission } = usePermission()

    const menuItems = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            icon: '⌂',
            permission: null
        },
        {
            label: 'Users',
            path: '/user/user-list',
            icon: '👤',
            permission: 'VIEW_USER'
        },
        {
            label: 'Roles',
            path: '/role/role-list',
            icon: '🛡',
            permission: 'VIEW_ROLE'
        },
        {
            label: 'Permissions',
            path: '/permission/permission-list',
            icon: '🔐',
            permission: 'VIEW_PERMISSION'
        },
        {
            label: 'Role Permission',
            path: '/role-permission/role-permission',
            icon: '⚙',
            permission: 'VIEW_ROLE_PERMISSION'
        }
    ]

    const visibleMenuItems = computed(() => {
        return menuItems.filter(item => {
            if (!item.permission) {
                return true
            }

            return hasPermission(item.permission)
        })
    })

    return {
        visibleMenuItems
    }
}