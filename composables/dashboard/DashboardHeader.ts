export function useDashboardHeader() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return {
        user,
        handleLogout
    }
}