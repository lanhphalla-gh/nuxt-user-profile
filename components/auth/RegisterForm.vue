<template>

  <!-- =======================================================
       Register Form
       ======================================================= -->

  <form class="register-form" @submit.prevent="submit">

    <!-- =====================================================
         Username
         ===================================================== -->

    <div class="form-group">

      <label for="username">
        Username
      </label>

      <input id="username" v-model.trim="form.username" type="text" placeholder="Enter your username"
        autocomplete="username" required />

    </div>


    <!-- =====================================================
         Password
         ===================================================== -->

    <div class="form-group">

      <label for="password">
        Password
      </label>

      <div class="password-input">

        <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password" autocomplete="new-password" required />

        <!-- Show / Hide Password -->
        <button type="button" class="password-toggle" @click="showPassword = !showPassword">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>

      </div>

    </div>


    <!-- =====================================================
         Confirm Password
         ===================================================== -->

    <div class="form-group">

      <label for="confirmPassword">
        Confirm Password
      </label>

      <div class="password-input">

        <input id="confirmPassword" v-model="form.confirmPassword" :type="showConfirmPassword
            ? 'text'
            : 'password'
          " placeholder="Confirm your password" autocomplete="new-password" required />

        <!-- Show / Hide Confirm Password -->
        <button type="button" class="password-toggle" @click="
          showConfirmPassword =
          !showConfirmPassword
          ">
          {{
            showConfirmPassword
              ? 'Hide'
              : 'Show'
          }}
        </button>

      </div>

    </div>


    <!-- =====================================================
         Password Validation
         ===================================================== -->

    <p v-if="
      form.confirmPassword &&
      form.password !== form.confirmPassword
    " class="password-hint error-text">
      Passwords do not match.
    </p>


    <!-- =====================================================
         Error Message
         ===================================================== -->

    <div v-if="errorMessage" class="message error-message" role="alert">

      <span class="message-icon">
        !
      </span>

      <span>
        {{ errorMessage }}
      </span>

    </div>


    <!-- =====================================================
         Success Message
         ===================================================== -->

    <div v-if="successMessage" class="message success-message" role="status">

      <span class="message-icon">
        ✓
      </span>

      <span>
        {{ successMessage }}
      </span>

    </div>


    <!-- =====================================================
         Register Button
         ===================================================== -->

    <button type="submit" class="register-button" :disabled="loading">

      <!-- Loading Spinner -->
      <span v-if="loading" class="loading-spinner"></span>

      <!-- Button Text -->
      <span>
        {{
          loading
            ? 'Registering...'
            : 'Create Account'
        }}
      </span>

    </button>


    <!-- =====================================================
         Login Link
         ===================================================== -->

    <div class="login-link">

      <span>
        Already have an account?
      </span>

      <NuxtLink to="/login">
        Login
      </NuxtLink>

    </div>

  </form>

</template>


<script setup lang="ts">

// ===========================================================
// Imports
// ===========================================================

import { ref } from 'vue'

import {
  useRegisterForm
} from '../../composables/auth/RegisterForm'


// ===========================================================
// Register Form Logic
// ===========================================================

/**
 * Registration form state and actions.
 *
 * Handles:
 * - Form data
 * - Form validation
 * - Registration request
 * - Loading state
 * - Error message
 * - Success message
 */
const {
  form,
  loading,
  errorMessage,
  successMessage,
  submit
} = useRegisterForm()


// ===========================================================
// Password Visibility
// ===========================================================

/**
 * Controls whether the password is visible.
 *
 * false = password hidden
 * true  = password visible
 */
const showPassword = ref(false)


/**
 * Controls whether the confirm password is visible.
 *
 * false = password hidden
 * true  = password visible
 */
const showConfirmPassword = ref(false)

</script>