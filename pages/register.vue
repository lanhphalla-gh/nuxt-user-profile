<template>

  <div class="auth-card">

    <h1>Register</h1>

    <RegisterForm />

  </div>

</template>

<script setup lang="ts">
import RegisterForm from '~/components/auth/register/RegisterForm.vue';


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