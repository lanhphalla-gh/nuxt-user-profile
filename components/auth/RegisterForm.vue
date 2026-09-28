<template>

  <form
    @submit.prevent="submit"
  >

    <div class="form-group">

      <label>Username</label>

      <input
        v-model.trim="form.username"
        type="text"
        required
      />

    </div>

    <div class="form-group">

      <label>Password</label>

      <input
        v-model="form.password"
        type="password"
        required
      />

    </div>

    <div class="form-group">

      <label>
        Confirm Password
      </label>

      <input
        v-model="form.confirmPassword"
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

    <p
      v-if="successMessage"
      class="success"
    >
      {{ successMessage }}
    </p>

    <button
      type="submit"
      :disabled="loading"
    >
      {{ loading
        ? 'Registering...'
        : 'Register'
      }}
    </button>

    <p>
      <NuxtLink to="/login">
        Back to Login
      </NuxtLink>
    </p>

  </form>

</template>

<script setup lang="ts">

import { authService } from '~/services/auth'

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const submit = async () => {

  errorMessage.value = ''
  successMessage.value = ''

  if (
    form.password !==
    form.confirmPassword
  ) {

    errorMessage.value =
      'Passwords do not match.'

    return
  }

  loading.value = true

  try {

    await authService.register(form)

    successMessage.value =
      'Registration successful. Please login.'

    form.username = ''
    form.password = ''
    form.confirmPassword = ''

  } catch (error: any) {

    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Registration failed.'

  } finally {

    loading.value = false

  }

}

</script>