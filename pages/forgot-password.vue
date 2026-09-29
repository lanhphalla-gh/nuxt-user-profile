<template>

  <div class="auth-card">

    <h1>Forgot Password</h1>

    <ForgotPasswordForm />

  </div>

</template>

<script setup lang="ts">
import ForgotPasswordForm from '~/components/auth/forgotpasword/ForgotPasswordForm.vue';


definePageMeta({
  layout: 'auth'
})

</script>

<style scoped>
.auth-card {
  width: 400px;
  max-width: 100%;

  padding: 30px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>