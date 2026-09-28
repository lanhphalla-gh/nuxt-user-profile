import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const store = useAuthStore()

  const {
    user,
    loading,
    initialized
  } = storeToRefs(store)

  const isAuthenticated = computed(
    () => store.isAuthenticated
  )

  const role = computed(
    () => store.role
  )

  const permissions = computed(
    () => store.permissions
  )

  const login = (
    username: string,
    password: string
  ) => {
    return store.login(
      username,
      password
    )
  }

  const logout = () => {
    return store.logout()
  }

  const can = (
    permission: string
  ) => {
    return permissions.value.includes(
      permission
    )
  }

  return {
    user,
    loading,
    initialized,
    isAuthenticated,
    role,
    permissions,
    login,
    logout,
    can
  }
}