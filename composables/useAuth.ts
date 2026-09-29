import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {

  // Pinia is accessed when the composable is actually used
  const store = useAuthStore()

  const {
    user,
    loading,
    initialized
  } = storeToRefs(store)

  const isAuthenticated = computed(
    () => store.isAuthenticated
  )

  const login = async (
    username: string,
    password: string
  ) => {

    await store.login(
      username,
      password
    )
  }

  const logout = async () => {
    await store.logout()
  }

  return {
    user,
    loading,
    initialized,
    isAuthenticated,
    login,
    logout
  }
}