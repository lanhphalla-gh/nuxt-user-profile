<template>

  <form class="forgot-password-form" @submit.prevent="submit">

    <!-- Username -->
    <div class="form-group">

      <label for="username">
        Username
      </label>

      <input id="username" v-model.trim="username" type="text" placeholder="Enter your username" autocomplete="username"
        required />

    </div>


    <!-- Error -->
    <div v-if="errorMessage" class="message error-message" role="alert">

      <span class="message-icon">
        !
      </span>

      <span>
        {{ errorMessage }}
      </span>

    </div>


    <!-- Success -->
    <div v-if="successMessage" class="message success-message" role="status">

      <span class="message-icon">
        ✓
      </span>

      <span>
        {{ successMessage }}
      </span>

    </div>


    <!-- Submit Button -->
    <button type="submit" class="reset-button" :disabled="loading">

      <span v-if="loading" class="loading-spinner"></span>

      <span>
        {{
          loading
            ? 'Sending...'
            : 'Reset Password'
        }}
      </span>

    </button>


    <!-- Back to Login -->
    <div class="login-link">

      <NuxtLink to="/login">
        Back to Login
      </NuxtLink>

    </div>

  </form>

</template>


<script setup lang="ts">

import { useForgotPassword } from '../../composables/auth/ForgotPasswordForm'

const {
  username,
  loading,
  errorMessage,
  successMessage,
  submit
} = useForgotPassword()

</script>