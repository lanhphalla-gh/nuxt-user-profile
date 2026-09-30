<template>
    <UserForm />
</template>

<script setup lang="ts">
import UserForm from '~/components/user/UserForm.vue';


definePageMeta({
    middleware: 'auth'
})

</script>