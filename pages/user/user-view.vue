<template>
    <UserView />
</template>

<script setup lang="ts">
import UserView from '~/components/user/UserView.vue';


definePageMeta({
    middleware: 'auth'
})

</script>