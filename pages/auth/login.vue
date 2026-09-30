<template>

  <div class="auth-card">

    <h1>Login</h1>

    <p>
      Login to your account.
    </p>

    <LoginForm />

  </div>

</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';


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