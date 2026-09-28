<template>

  <form
    @submit.prevent="submit"
  >

    <div class="form-group">

      <label>
        Username
      </label>

      <input
        v-model="username"
        type="text"
        required
      />

    </div>

    <div class="form-group">

      <label>
        Password
      </label>

      <input
        v-model="password"
        type="password"
        required
      />

    </div>

    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>

    <button
      type="submit"
      :disabled="loading"
    >
      {{ loading
        ? 'Logging in...'
        : 'Login'
      }}
    </button>

    <div class="links">

      <NuxtLink to="/register">
        Register
      </NuxtLink>

      <NuxtLink to="/forgot-password">
        Forgot Password?
      </NuxtLink>

    </div>

  </form>

</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'


const username = ref('')
const password = ref('')

const errorMessage = ref('')

const {
  login,
  loading
} = useAuth()

const submit = async () => {

  errorMessage.value = ''

  try {

    await login(
      username.value,
      password.value
    )

    await navigateTo('/')

  } catch (error: any) {

    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Login failed.'

  }

}

</script>