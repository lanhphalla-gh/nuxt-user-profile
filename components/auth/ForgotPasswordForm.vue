<template>

  <form
    @submit.prevent="submit"
  >

    <div class="form-group">

      <label>
        Username
      </label>

      <input
        v-model.trim="username"
        type="text"
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
        ? 'Sending...'
        : 'Reset Password'
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

import {
  authService
} from '~/services/auth'

const username = ref('')

const loading = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const submit = async () => {

  errorMessage.value = ''
  successMessage.value = ''

  loading.value = true

  try {

    await authService.forgotPassword(
      username.value
    )

    successMessage.value =
      'Password recovery request submitted.'

  } catch (error: any) {

    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Request failed.'

  } finally {

    loading.value = false

  }

}

</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 10px;
}

button {
  width: 100%;
  padding: 10px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>