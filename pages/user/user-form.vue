<template>
    <UserForm />
</template>

<script setup lang="ts">
import UserForm from '~/components/user/user-form/UserForm.vue';


definePageMeta({
    middleware: 'auth'
})

</script>