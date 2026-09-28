import { defineStore } from 'pinia'
import { authService } from '~/services/auth'
import type { User } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => {
      return state.user !== null
    },

    role: (state) => {
      return state.user?.role ?? ''
    },

    permissions: (state) => {
      return state.user?.permissions ?? []
    }
  },

  actions: {
    setUser(user: User | null) {
      this.user = user
    },

    async login(
      username: string,
      password: string
    ) {
      this.loading = true

      try {
        const response =
          await authService.login({
            username,
            password
          })

        const data =
          response.data ?? response

        const user =
          data.user ?? {
            username,
            role: data.role,
            permissions:
              data.permissions ?? []
          }

        this.setUser(user)

        return response
      } finally {
        this.loading = false
      }
    },

    async initialize() {
      if (this.initialized) {
        return
      }

      this.loading = true

      try {
        const response =
          await authService.me()

        const data =
          response.data ?? response

        if (data.user) {
          this.setUser({
            ...data.user,
            role:
              data.role ??
              data.user.role,

            permissions:
              data.permissions ??
              data.user.permissions ??
              []
          })
        }
      } catch {
        this.setUser(null)
      } finally {
        this.initialized = true
        this.loading = false
      }
    },

    async logout() {
      try {
        await authService.logout()
      } finally {
        this.setUser(null)

        await navigateTo('/login')
      }
    }
  }
})