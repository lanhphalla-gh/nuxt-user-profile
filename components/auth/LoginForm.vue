<template>

  <!-- =======================================================
       Login Form
       -------------------------------------------------------
       Provides the user interface for logging into the system.
       ======================================================= -->

  <form class="login-form" @submit.prevent="submit">

    <!-- =====================================================
         Username
         -----------------------------------------------------
         Allows the user to enter their username.
         ===================================================== -->

    <div class="form-group">

      <label for="username">
        Username
      </label>

      <input id="username" v-model="username" type="text" placeholder="Enter your username" autocomplete="username"
        required />

    </div>


    <!-- =====================================================
         Password
         -----------------------------------------------------
         Allows the user to enter their password.
         Includes Show / Hide password functionality.
         ===================================================== -->

    <div class="form-group">

      <!-- Password Label -->
      <div class="password-label">

        <label for="password">
          Password
        </label>

      </div>


      <!-- Password Input -->
      <div class="password-input">

        <input id="password" v-model="password" :type="showPassword
            ? 'text'
            : 'password'
          " placeholder="Enter your password" autocomplete="current-password" required />


        <!-- Show / Hide Password -->
        <button type="button" class="password-toggle" :aria-label="showPassword
            ? 'Hide password'
            : 'Show password'
          " @click="showPassword = !showPassword">
          {{
            showPassword
              ? 'Hide'
              : 'Show'
          }}
        </button>

      </div>

    </div>


    <!-- =====================================================
         Error Message
         -----------------------------------------------------
         Displays an error when login fails.
         ===================================================== -->

    <div v-if="errorMessage" class="error-message" role="alert">

      <!-- Error Icon -->
      <span class="error-icon">
        !
      </span>

      <!-- Error Text -->
      <span>
        {{ errorMessage }}
      </span>

    </div>


    <!-- =====================================================
         Login Button
         -----------------------------------------------------
         Submits the login form.
         Shows a loading state while the request is processing.
         ===================================================== -->

    <button type="submit" class="login-button" :disabled="loading">

      <!-- Loading Spinner -->
      <span v-if="loading" class="loading-spinner"></span>


      <!-- Button Text -->
      <span>
        {{
          loading
            ? 'Logging in...'
            : 'Login'
        }}
      </span>

    </button>


    <!-- =====================================================
         Authentication Links
         -----------------------------------------------------
         Provides navigation to other authentication pages.
         ===================================================== -->

    <div class="links">

      <!-- Register -->
      <NuxtLink to="/auth/register">
        Create account
      </NuxtLink>


      <!-- Forgot Password -->
      <NuxtLink to="/auth/forgot-password">
        Forgot password?
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
  useLoginForm
} from '../../composables/auth/LoginForm'


// ===========================================================
// Login Form Logic
// ===========================================================

/**
 * Login form state and actions.
 *
 * Handles:
 * - Username
 * - Password
 * - Login request
 * - Loading state
 * - Error message
 * - Dashboard redirect
 */
const {
  username,
  password,
  errorMessage,
  loading,
  submit
} = useLoginForm()


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

</script>