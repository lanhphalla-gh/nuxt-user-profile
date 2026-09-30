import { defineStore } from 'pinia'

import { authService } from '~/services/auth'

import type { User } from '~/types/auth'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: null as User | null,

    loading: false
  }),

  getters: {

    isAuthenticated: (state) => {
      return state.user !== null
    },

    role: (state) => {
      return state.user?.role ?? null
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

        const user: User = {

          username:
            response.username ?? username,

          role:
            response.role,

          permissions:
            response.permissions ?? []
        }

        this.setUser(user)

        return response

      } finally {

        this.loading = false

      }
    },

    async logout() {

      try {

        await authService.logout()

      } finally {

        this.setUser(null)

        await navigateTo(
          '/auth/login'
        )
      }
    }
  }
})