import { computed } from 'vue'

export function useDashboardContent() {
    const { user } = useAuth()

    const statistics = [
        {
            title: 'Total Users',
            value: 28,
            change: '+12%',
            description: 'vs. last month',
            icon: 'user',
            type: 'blue'
        },
        {
            title: 'Total Roles',
            value: 5,
            change: '0%',
            description: 'vs. last month',
            icon: 'role',
            type: 'purple'
        },
        {
            title: 'Total Permissions',
            value: 24,
            change: '+4%',
            description: 'vs. last month',
            icon: 'permission',
            type: 'green'
        },
        {
            title: 'Role Assignments',
            value: 42,
            change: '+9%',
            description: 'vs. last month',
            icon: 'assignment',
            type: 'orange'
        }
    ]

    const activityData = [
        { month: 'Apr', users: 6, assignments: 14 },
        { month: 'May', users: 10, assignments: 19 },
        { month: 'Jun', users: 13, assignments: 22 },
        { month: 'Jul', users: 17, assignments: 26 },
        { month: 'Aug', users: 20, assignments: 32 },
        { month: 'Sep', users: 25, assignments: 42 }
    ]

    const roleDistribution = [
        {
            name: 'Admin',
            count: 8,
            percentage: 29,
            type: 'admin'
        },
        {
            name: 'Manager',
            count: 6,
            percentage: 21,
            type: 'manager'
        },
        {
            name: 'Staff',
            count: 7,
            percentage: 25,
            type: 'staff'
        },
        {
            name: 'Member',
            count: 5,
            percentage: 18,
            type: 'member'
        },
        {
            name: 'Guest',
            count: 2,
            percentage: 7,
            type: 'guest'
        }
    ]

    const recentUsers = [
        {
            id: 'U001',
            username: 'sokpheak',
            role: 'Admin',
            status: 'Active',
            createdAt: '17 Sep 2026'
        },
        {
            id: 'U002',
            username: 'chandara',
            role: 'Manager',
            status: 'Active',
            createdAt: '16 Sep 2026'
        },
        {
            id: 'U003',
            username: 'thea.vannak',
            role: 'Staff',
            status: 'Inactive',
            createdAt: '15 Sep 2026'
        },
        {
            id: 'U004',
            username: 'khemara',
            role: 'Member',
            status: 'Active',
            createdAt: '14 Sep 2026'
        },
        {
            id: 'U005',
            username: 'sreyneang',
            role: 'Guest',
            status: 'Active',
            createdAt: '12 Sep 2026'
        }
    ]

    const recentActivities = [
        {
            title: 'New user created',
            description: 'sokpheak was added to the system',
            time: '10 minutes ago',
            type: 'user'
        },
        {
            title: 'Role updated',
            description: 'Manager role permissions were updated',
            time: '1 hour ago',
            type: 'role'
        },
        {
            title: 'Permission added',
            description: 'VIEW_ROLE_PERMISSION was created',
            time: '3 hours ago',
            type: 'permission'
        },
        {
            title: 'Role assigned',
            description: 'chandara received Manager role',
            time: '5 hours ago',
            type: 'assignment'
        }
    ]

    const quickActions = [
        {
            label: 'Add User',
            description: 'Create a new user', 
            path: '/users/user-list',
            icon: 'user',
            type: 'blue'
        },
        {
            label: 'Manage Roles',
            description: 'Create or update roles',
            path: '/roles/role-list',
            icon: 'role',
            type: 'purple'
        },
        {
            label: 'Manage Permissions',
            description: 'Configure permissions',
            path: '/permissions/permission-list',
            icon: 'permission',
            type: 'green'
        },
        {
            label: 'Role Permission',
            description: 'Assign permissions to roles',
            path: '/role-permissions/role-permission',
            icon: 'assignment',
            type: 'orange'
        }
    ]

    const maxActivityValue = computed(() => {
        return Math.max(
            ...activityData.map(item => item.assignments)
        )
    })

    const greeting = computed(() => {
        const hour = new Date().getHours()

        if (hour < 12) {
            return 'Good morning'
        }

        if (hour < 18) {
            return 'Good afternoon'
        }

        return 'Good evening'
    })

    return {
        user,
        statistics,
        activityData,
        roleDistribution,
        recentUsers,
        recentActivities,
        quickActions,
        maxActivityValue,
        greeting
    }
}