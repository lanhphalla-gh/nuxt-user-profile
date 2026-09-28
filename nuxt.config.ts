export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://spring-boot-user-profile-11.onrender.com/api'
    }
  },

  typescript: {
    strict: true
  },

  css: [
    '~/styles/login-form.css',
    '~/styles/register.css'
  ]
})